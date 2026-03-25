<?php
// ============================================================
//  RECIPEZ – api/comments.php
//
//  GET  /api/comments.php?recipe_id=101   → list comments
//  POST /api/comments.php                 → add comment
//       body: { recipe_id, body }
//       (author taken from session if logged in, else "Guest")
// ============================================================

require_once __DIR__ . '/../includes/helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$db     = getDB();

// ── GET: list comments for a recipe ─────────────────────────
if ($method === 'GET') {
    $recipeId = (int) ($_GET['recipe_id'] ?? 0);
    if (!$recipeId) respond(['error' => 'recipe_id is required.'], 422);

    $stmt = $db->prepare(
        'SELECT c.id, c.author, c.body,
                DATE_FORMAT(c.created_at, "%d %b %Y") AS date
         FROM comments c
         WHERE c.recipe_id = ?
         ORDER BY c.created_at DESC'
    );
    $stmt->execute([$recipeId]);
    respond($stmt->fetchAll());
}

// ── POST: add a comment ──────────────────────────────────────
if ($method === 'POST') {
    $body     = json_decode(file_get_contents('php://input'), true) ?? [];
    $recipeId = (int) ($body['recipe_id'] ?? 0);
    $text     = clean($body['body'] ?? '');

    if (!$recipeId)          respond(['error' => 'recipe_id is required.'], 422);
    if (strlen($text) < 2)   respond(['error' => 'Comment is too short.'],  422);
    if (strlen($text) > 1000) respond(['error' => 'Comment is too long.'],   422);

    // Confirm recipe exists
    $chk = $db->prepare('SELECT id FROM recipes WHERE id = ?');
    $chk->execute([$recipeId]);
    if (!$chk->fetch()) respond(['error' => 'Recipe not found.'], 404);

    $userId = currentUserId();
    $author = currentUsername() ?? 'Guest';

    $stmt = $db->prepare(
        'INSERT INTO comments (recipe_id, user_id, author, body) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$recipeId, $userId, $author, $text]);

    respond([
        'success' => true,
        'comment' => [
            'id'     => (int) $db->lastInsertId(),
            'author' => $author,
            'body'   => $text,
            'date'   => date('d M Y'),
        ],
    ], 201);
}

respond(['error' => 'Method not allowed.'], 405);
