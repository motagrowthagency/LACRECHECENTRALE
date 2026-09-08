<?php
/**
 * La Centrale Crèche — Couche de données PDO MySQL & JSON Redondant
 */

$GLOBALS['db_status'] = 'Non initialisé';

function getDbConnection() {
    static $pdo = null;
    static $hasTried = false;
    if ($pdo !== null) {
        return $pdo;
    }
    if ($hasTried) {
        return null;
    }
    $hasTried = true;

    $config = require __DIR__ . '/config.php';

    if (empty($config['db_pass']) && empty($config['db_host'])) {
        $GLOBALS['db_status'] = 'Stockage JSON (MySQL non configuré)';
        return null;
    }

    // Fast check: if MySQL connection failed within the last 60 seconds, don't wait for timeout again
    $cacheFile = sys_get_temp_dir() . '/lacentrale_db_offline.flag';
    if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 60) {
        $GLOBALS['db_status'] = 'Stockage JSON (MySQL hors ligne)';
        return null;
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
        $config['db_host'],
        $config['db_port'],
        $config['db_name']
    );

    try {
        $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 1,
        ]);

        if (file_exists($cacheFile)) {
            @unlink($cacheFile);
        }

        initTables($pdo);
        $GLOBALS['db_status'] = 'MySQL Connecté (' . $config['db_name'] . ')';
        return $pdo;
    } catch (Exception $e) {
        @touch($cacheFile);
        $GLOBALS['db_status'] = 'Stockage JSON (MySQL hors ligne)';
        error_log('Erreur MySQL La Centrale Crèche: ' . $e->getMessage());
        return null;
    }
}

function initTables(PDO $pdo) {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS `leads` (
            `id` VARCHAR(64) NOT NULL PRIMARY KEY,
            `created_at` VARCHAR(32) NOT NULL,
            `type` VARCHAR(32) NOT NULL DEFAULT 'VISITE',
            `parent_name` VARCHAR(255) NOT NULL,
            `child_age` VARCHAR(255) DEFAULT NULL,
            `email` VARCHAR(255) DEFAULT NULL,
            `phone` VARCHAR(64) NOT NULL,
            `solutions` JSON DEFAULT NULL,
            `sector` VARCHAR(255) DEFAULT NULL,
            `message` TEXT DEFAULT NULL,
            `status` VARCHAR(32) NOT NULL DEFAULT 'Nouveau',
            `source` VARCHAR(64) NOT NULL DEFAULT 'Admin Direct',
            `formula` VARCHAR(255) DEFAULT NULL,
            `start_date` VARCHAR(255) DEFAULT NULL,
            `notes` TEXT DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
    } catch (Exception $e) {
        error_log('Erreur initTables: ' . $e->getMessage());
    }
}

// ── JSON Helpers ────────────────────────────────────────────────────
// Protect a data directory from direct HTTP access (defense in depth in
// case it ends up inside the public web root on this host).
function protectDataDir($dir) {
    $htaccess = $dir . '/.htaccess';
    if (!file_exists($htaccess)) {
        @file_put_contents($htaccess, "Require all denied\nDeny from all\n");
    }
}

function getDataFilePath($filename) {
    // Prefer a directory ONE LEVEL ABOVE the web root (outside public_html)
    // so data files are never directly downloadable over HTTP. Falls back
    // to a directory inside the web root only if that's not writable.
    $dirs = [
        __DIR__ . '/../../data',
        __DIR__ . '/../data',
    ];
    foreach ($dirs as $d) {
        if (!is_dir($d)) {
            @mkdir($d, 0777, true);
        }
        if (is_dir($d) && is_writable($d)) {
            protectDataDir($d);
            return $d . '/' . $filename;
        }
    }
    $fallbackDir = __DIR__ . '/../../data';
    if (!is_dir($fallbackDir)) {
        @mkdir($fallbackDir, 0777, true);
    }
    protectDataDir($fallbackDir);
    return $fallbackDir . '/' . $filename;
}

function readJsonFile($filename) {
    $path = getDataFilePath($filename);
    if (file_exists($path)) {
        $content = @file_get_contents($path);
        $data = json_decode($content, true);
        if (is_array($data)) return $data;
    }
    return [];
}

function writeJsonFile($filename, array $data) {
    $path = getDataFilePath($filename);
    $dir = dirname($path);
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    @file_put_contents($path, $json);
    @chmod($path, 0666);
}

// ── Leads: normalize row shapes between MySQL and JSON storage ──────
function leadRowToApi($row) {
    $sol = $row['solutions'] ?? [];
    if (is_string($sol)) $sol = json_decode($sol, true) ?: [];
    return [
        'id' => $row['id'],
        'createdAt' => $row['createdAt'] ?? ($row['created_at'] ?? ''),
        'type' => $row['type'] ?? 'VISITE',
        'parentName' => $row['parentName'] ?? ($row['parent_name'] ?? ''),
        'childAge' => $row['childAge'] ?? ($row['child_age'] ?? ''),
        'email' => $row['email'] ?? '',
        'phone' => $row['phone'] ?? '',
        'solutions' => is_array($sol) ? $sol : [],
        'sector' => $row['sector'] ?? '',
        'message' => $row['message'] ?? '',
        'status' => $row['status'] ?? 'Nouveau',
        'source' => $row['source'] ?? 'Admin Direct',
        'formula' => $row['formula'] ?? '',
        'startDate' => $row['startDate'] ?? ($row['start_date'] ?? ''),
        'notes' => $row['notes'] ?? '',
    ];
}

function getAllLeads() {
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM `leads` ORDER BY `id` DESC");
            $rows = $stmt->fetchAll();
            return array_map('leadRowToApi', $rows);
        } catch (Exception $e) {
            error_log('Erreur getAllLeads MySQL: ' . $e->getMessage());
        }
    }
    $leads = readJsonFile('leads.json');
    return array_map('leadRowToApi', $leads);
}

function insertLead(array $entry) {
    // 1. Save to JSON (always, as a redundant record)
    $leads = readJsonFile('leads.json');
    array_unshift($leads, $entry);
    writeJsonFile('leads.json', $leads);

    // 2. Save to MySQL if available
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO `leads` (`id`, `created_at`, `type`, `parent_name`, `child_age`, `email`, `phone`, `solutions`, `sector`, `message`, `status`, `source`, `formula`, `start_date`, `notes`)
                VALUES (:id, :created_at, :type, :parent_name, :child_age, :email, :phone, :solutions, :sector, :message, :status, :source, :formula, :start_date, :notes)");
            $stmt->execute([
                ':id' => $entry['id'],
                ':created_at' => $entry['createdAt'],
                ':type' => $entry['type'],
                ':parent_name' => $entry['parentName'],
                ':child_age' => $entry['childAge'] ?? null,
                ':email' => $entry['email'] ?? null,
                ':phone' => $entry['phone'],
                ':solutions' => json_encode($entry['solutions'] ?? []),
                ':sector' => $entry['sector'] ?? null,
                ':message' => $entry['message'] ?? null,
                ':status' => $entry['status'] ?? 'Nouveau',
                ':source' => $entry['source'] ?? 'Admin Direct',
                ':formula' => $entry['formula'] ?? null,
                ':start_date' => $entry['startDate'] ?? null,
                ':notes' => $entry['notes'] ?? null,
            ]);
        } catch (Exception $e) {
            error_log('Erreur insertLead MySQL: ' . $e->getMessage());
        }
    }

    return $entry;
}

function updateLeadById($id, array $updates) {
    // 1. Update JSON
    $leads = readJsonFile('leads.json');
    $updated = null;
    foreach ($leads as $k => $l) {
        if (($l['id'] ?? '') === $id) {
            $leads[$k] = array_merge($l, $updates);
            $updated = $leads[$k];
            break;
        }
    }
    if ($updated !== null) {
        writeJsonFile('leads.json', $leads);
    }

    // 2. Update MySQL if available
    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $fields = [];
            $params = [':id' => $id];
            $map = [
                'status' => 'status', 'notes' => 'notes', 'message' => 'message',
                'formula' => 'formula', 'startDate' => 'start_date', 'sector' => 'sector',
            ];
            foreach ($map as $apiKey => $col) {
                if (array_key_exists($apiKey, $updates)) {
                    $fields[] = "`$col` = :$col";
                    $params[":$col"] = $updates[$apiKey];
                }
            }
            if (!empty($fields)) {
                $stmt = $pdo->prepare("UPDATE `leads` SET " . implode(', ', $fields) . " WHERE `id` = :id");
                $stmt->execute($params);
            }
            if ($updated === null) {
                $stmt = $pdo->prepare("SELECT * FROM `leads` WHERE `id` = :id LIMIT 1");
                $stmt->execute([':id' => $id]);
                $row = $stmt->fetch();
                if ($row) $updated = leadRowToApi($row);
            }
        } catch (Exception $e) {
            error_log('Erreur updateLeadById MySQL: ' . $e->getMessage());
        }
    }

    return $updated ? leadRowToApi($updated) : null;
}

function deleteLeadById($id) {
    $leads = readJsonFile('leads.json');
    $filtered = array_values(array_filter($leads, function ($l) use ($id) {
        return ($l['id'] ?? '') !== $id;
    }));
    $found = count($filtered) !== count($leads);
    writeJsonFile('leads.json', $filtered);

    $pdo = getDbConnection();
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM `leads` WHERE `id` = :id");
            $stmt->execute([':id' => $id]);
            if ($stmt->rowCount() > 0) $found = true;
        } catch (Exception $e) {
            error_log('Erreur deleteLeadById MySQL: ' . $e->getMessage());
        }
    }

    return $found;
}

// ── Secret Management ───────────────────────────────────────────────
// Reads a secret from an env var if set; otherwise auto-generates a
// strong random one on first run and persists it in the protected data
// directory, so no secret ever needs to be hardcoded in source.
function getOrCreatePersistentSecret($envName, $filename) {
    $envVal = getenv($envName);
    if (!empty($envVal)) return $envVal;

    $path = getDataFilePath($filename);
    if (file_exists($path)) {
        $val = trim((string)@file_get_contents($path));
        if (!empty($val)) return $val;
    }
    $val = bin2hex(random_bytes(32));
    @file_put_contents($path, $val);
    @chmod($path, 0600);
    return $val;
}

// ── Admin Session Tokens ────────────────────────────────────────────
// Signed, expiring tokens (HMAC-SHA256) instead of a static/forgeable
// cookie value. Stored client-side as the lacentrale_admin_session cookie.
function getAdminSecret() {
    return getOrCreatePersistentSecret('ADMIN_SESSION_SECRET', '.admin_session.key');
}

function generateAdminSessionToken() {
    $secret = getAdminSecret();
    $payload = json_encode(['role' => 'admin', 'iat' => time(), 'exp' => time() + (7 * 24 * 60 * 60)]);
    $b64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $sig = hash_hmac('sha256', $b64Payload, $secret, true);
    $b64Sig = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($sig));
    return $b64Payload . '.' . $b64Sig;
}

function verifyAdminSessionToken($token) {
    if (empty($token) || strpos($token, '.') === false) return false;
    list($b64Payload, $b64Sig) = explode('.', $token, 2);
    $secret = getAdminSecret();
    $expectedSig = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(hash_hmac('sha256', $b64Payload, $secret, true)));
    if (!hash_equals($expectedSig, $b64Sig)) return false;
    $payload = json_decode(base64_decode(strtr($b64Payload, '-_', '+/')), true);
    if (!$payload || ($payload['role'] ?? '') !== 'admin') return false;
    if (isset($payload['exp']) && $payload['exp'] < time()) return false;
    return true;
}

function isAdminAuthenticated() {
    $token = $_COOKIE['lacentrale_admin_session'] ?? '';
    return verifyAdminSessionToken($token);
}

// ── Simple File-Based Rate Limiting ─────────────────────────────────
// Shared hosting has no Redis/memcached available, so we use a small
// locked JSON counter file. Fails OPEN (allows the request) if the
// filesystem is unavailable, so it never itself takes the site down.
function checkRateLimit($key, $maxAttempts, $windowSeconds) {
    $path = getDataFilePath('.rate_limits.json');
    $fp = @fopen($path, 'c+');
    if (!$fp) return true;

    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $data = json_decode($raw, true);
    if (!is_array($data)) $data = [];

    $now = time();
    $attempts = array_values(array_filter($data[$key] ?? [], function ($t) use ($now, $windowSeconds) {
        return ($now - $t) < $windowSeconds;
    }));

    $allowed = count($attempts) < $maxAttempts;
    if ($allowed) {
        $attempts[] = $now;
    }
    $data[$key] = $attempts;

    foreach ($data as $k => $times) {
        if (empty($times)) unset($data[$k]);
    }

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    return $allowed;
}

function rateLimitKey($prefix, $extra = '') {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $ip = trim(explode(',', $ip)[0]);
    return $prefix . ':' . $ip . ($extra ? ':' . strtolower($extra) : '');
}
