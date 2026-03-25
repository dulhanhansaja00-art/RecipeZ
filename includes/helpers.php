<?php
// ============================================================
//  RECIPEZ – includes/helpers.php
//  Shared utilities used by every API endpoint.
// ============================================================

require_once __DIR__ . '/../config/db.php';

// ── CORS headers (allow your frontend origin) ────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');          // restrict in production
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Pre-flight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Session ──────────────────────────────────────────────────
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ── Helpers ──────────────────────────────────────────────────

/** Send a JSON response and exit. */
function respond(array $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Return the current logged-in user id, or null. */
function currentUserId(): ?int {
    return $_SESSION['user_id'] ?? null;
}

/** Return the current logged-in username, or null. */
function currentUsername(): ?string {
    return $_SESSION['username'] ?? null;
}

/** Require the user to be logged in, or abort with 401. */
function requireAuth(): void {
    if (!currentUserId()) {
        respond(['error' => 'You must be logged in to do that.'], 401);
    }
}

/** Sanitise a string (trim + strip tags). */
function clean(string $val): string {
    return trim(strip_tags($val));
}
