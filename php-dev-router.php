<?php
/**
 * Router used only by `php -S` for local development, so /api/* behaves
 * the same way it will in production under the Apache .htaccess rewrite.
 * Not used in production and not part of the built site.
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if (strpos($uri, '/api') === 0) {
    require __DIR__ . '/public/api/index.php';
    return true;
}

$filePath = __DIR__ . '/public' . $uri;
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    return false;
}

http_response_code(404);
echo 'Not found (this dev router only serves /api — the site itself is served by Vite).';
