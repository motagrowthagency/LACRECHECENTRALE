<?php
/**
 * La Centrale Crèche — API (Leads & Authentification Admin)
 */

require_once __DIR__ . '/db.php';

// ── CORS (only needed when the API is called from a different origin,
// e.g. the Vite dev server during local development) ─────────────────
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

function jsonBody() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function respond($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requireAdmin() {
    if (!isAdminAuthenticated()) {
        respond(['error' => 'Non autorisé.'], 401);
    }
}

$config = require __DIR__ . '/config.php';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = preg_replace('#^/api#', '', $uri);
$uri = rtrim($uri, '/');
if ($uri === '') $uri = '/';
$method = $_SERVER['REQUEST_METHOD'];
$isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

function setAdminCookie($token, $expires) {
    global $isHttps;
    setcookie('lacentrale_admin_session', $token, [
        'expires' => $expires,
        'path' => '/',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
}

// ── POST /api/login ────────────────────────────────────────────────
if ($uri === '/login' && $method === 'POST') {
    $body = jsonBody();
    $password = trim((string)($body['password'] ?? ''));

    if (!checkRateLimit(rateLimitKey('admin-login'), 5, 900)) {
        respond(['error' => 'Trop de tentatives. Veuillez réessayer dans quelques minutes.'], 429);
    }
    if (empty($config['admin_password'])) {
        respond(['error' => "Mot de passe administrateur non configuré côté serveur."], 500);
    }
    if (!hash_equals($config['admin_password'], $password)) {
        respond(['error' => 'Mot de passe incorrect.'], 401);
    }

    $token = generateAdminSessionToken();
    setAdminCookie($token, time() + (86400 * 7));
    respond(['ok' => true]);
}

// ── POST /api/logout ───────────────────────────────────────────────
if ($uri === '/logout' && $method === 'POST') {
    setAdminCookie('', time() - 3600);
    respond(['ok' => true]);
}

// ── GET /api/session ───────────────────────────────────────────────
if ($uri === '/session' && $method === 'GET') {
    respond(['authenticated' => isAdminAuthenticated()]);
}

// ── /api/leads and /api/leads/{id} ─────────────────────────────────
if (preg_match('#^/leads(?:/([a-zA-Z0-9_\-]+))?$#', $uri, $m)) {
    $leadId = $m[1] ?? null;

    if ($method === 'POST' && $leadId === null) {
        // Public endpoint: any visitor's form submission lands here.
        if (!checkRateLimit(rateLimitKey('lead-submit'), 20, 3600)) {
            respond(['error' => 'Trop de demandes envoyées. Merci de réessayer plus tard.'], 429);
        }

        $body = jsonBody();
        $parentName = trim((string)($body['parentName'] ?? ''));
        $phone = trim((string)($body['phone'] ?? ''));
        if ($parentName === '' || $phone === '') {
            respond(['error' => 'Le nom et le téléphone sont requis.'], 400);
        }

        $entry = [
            'id' => 'lead-' . time() . '-' . bin2hex(random_bytes(3)),
            'createdAt' => date('d/m/Y H:i'),
            'type' => (string)($body['type'] ?? 'VISITE'),
            'parentName' => $parentName,
            'childAge' => (string)($body['childAge'] ?? ''),
            'email' => (string)($body['email'] ?? ''),
            'phone' => $phone,
            'solutions' => is_array($body['solutions'] ?? null) ? $body['solutions'] : [],
            'sector' => (string)($body['sector'] ?? ''),
            'message' => (string)($body['message'] ?? ''),
            'status' => 'Nouveau',
            'source' => (string)($body['source'] ?? 'Site Web'),
            'formula' => (string)($body['formula'] ?? ''),
            'startDate' => (string)($body['startDate'] ?? ''),
            'notes' => '',
        ];

        $saved = insertLead($entry);
        respond(['lead' => leadRowToApi($saved)], 201);
    }

    if ($method === 'GET' && $leadId === null) {
        requireAdmin();
        respond(['leads' => getAllLeads()]);
    }

    if ($method === 'PATCH' && $leadId !== null) {
        requireAdmin();
        $body = jsonBody();
        $updated = updateLeadById($leadId, $body);
        if (!$updated) respond(['error' => 'Dossier introuvable.'], 404);
        respond(['lead' => $updated]);
    }

    if ($method === 'DELETE' && $leadId !== null) {
        requireAdmin();
        $ok = deleteLeadById($leadId);
        if (!$ok) respond(['error' => 'Dossier introuvable.'], 404);
        respond(['ok' => true]);
    }
}

respond(['error' => 'Route introuvable.'], 404);
