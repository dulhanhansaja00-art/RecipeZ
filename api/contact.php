<?php
// ============================================================
//  RECIPEZ – api/contact.php
//  Handles contact form submissions
//
//  POST /api/contact.php         → store a message
//  GET  /api/contact.php         → list messages (admin use)
// ============================================================

require_once __DIR__ . '/../includes/helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── POST: store a new message ────────────────────────────────
if ($method === 'POST') {
    $body    = json_decode(file_get_contents('php://input'), true) ?? [];

    $name    = clean($body['name']    ?? '');
    $email   = clean($body['email']   ?? '');
    $message = clean($body['message'] ?? '');

    // Validation
    if (strlen($name) < 2) {
        respond(['error' => 'Name must be at least 2 characters.'], 422);
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(['error' => 'Invalid email address.'], 422);
    }
    if (strlen($message) < 10) {
        respond(['error' => 'Message must be at least 10 characters.'], 422);
    }
    if (strlen($message) > 2000) {
        respond(['error' => 'Message is too long (max 2000 characters).'], 422);
    }

    $stmt = $db->prepare(
        'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)'
    );
    $stmt->execute([$name, $email, $message]);

    respond([
        'success' => true,
        'message' => 'Thank you! Your message has been received.',
    ], 201);
}

// ── GET: list all messages ───────────────────────────────────
if ($method === 'GET') {
    $stmt = $db->query(
        'SELECT id, name, email, message,
                DATE_FORMAT(created_at, "%d %b %Y %H:%i") AS sent_at
         FROM messages ORDER BY created_at DESC'
    );
    respond($stmt->fetchAll());
}

respond(['error' => 'Method not allowed.'], 405);
