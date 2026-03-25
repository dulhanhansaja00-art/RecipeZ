<?php
// ============================================================
//  RECIPEZ – api/recipes.php
//  Handles all recipe CRUD + search
//
//  GET  /api/recipes.php                  → all recipes
//  GET  /api/recipes.php?id=101           → single recipe
//  GET  /api/recipes.php?category=Lunch   → by category
//  GET  /api/recipes.php?search=pasta     → search
//  GET  /api/recipes.php?popular=1&limit=10 → top by views
//  POST /api/recipes.php?action=add       → add recipe (auth)
//  POST /api/recipes.php?action=view&id=101 → increment view
// ============================================================

require_once __DIR__ . '/../includes/helpers.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// ── POST routes ──────────────────────────────────────────────
if ($method === 'POST') {

    // ── Increment view count (no auth needed) ────────────────
    if ($action === 'view') {
        $id = (int) ($_GET['id'] ?? 0);
        if (!$id) respond(['error' => 'Recipe id required.'], 422);

        $db = getDB();
        $db->prepare('UPDATE recipes SET views = views + 1 WHERE id = ?')->execute([$id]);
        respond(['success' => true]);
    }

    // ── Add a new recipe (login required) ────────────────────
    if ($action === 'add') {
        requireAuth();

        $body     = json_decode(file_get_contents('php://input'), true) ?? [];
        $name     = clean($body['name']        ?? '');
        $category = clean($body['category']    ?? '');
        $cookTime = clean($body['cook_time']   ?? '');
        $youtube  = clean($body['youtube_url'] ?? '');
        $imageUrl = clean($body['image_url']   ?? '');
        $emoji    = clean($body['emoji']       ?? '🍽️');
        $content  =       $body['content']     ?? '';  // raw textarea from the form

        // ingredients & steps: accept either JSON array or plain text
        $ingredients = $body['ingredients'] ?? null;
        $steps       = $body['steps']       ?? null;

        // If the form sends the old single textarea 'content', split it
        if (!$ingredients && !$steps && $content) {
            $lines       = array_filter(array_map('trim', explode("\n", $content)));
            $ingredients = json_encode(array_map(fn($l) => [$l, ''], array_slice($lines, 0, 10)));
            $steps       = json_encode(array_slice($lines, 10));
        } else {
            $ingredients = is_array($ingredients) ? json_encode($ingredients) : ($ingredients ?? '[]');
            $steps       = is_array($steps)       ? json_encode($steps)       : ($steps       ?? '[]');
        }

        // Validation
        if (strlen($name) < 2)     respond(['error' => 'Recipe name is required.'], 422);
        if (!$category)            respond(['error' => 'Category is required.'],    422);
        if ($content === '' && $ingredients === '[]') {
            respond(['error' => 'Ingredients / content required.'], 422);
        }

        $db   = getDB();
        $stmt = $db->prepare(
            'INSERT INTO recipes
               (name, category, cook_time, youtube_url, image_url, ingredients, steps, emoji, user_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $name, $category, $cookTime, $youtube, $imageUrl,
            $ingredients, $steps, $emoji, currentUserId(),
        ]);
        $newId = (int) $db->lastInsertId();

        respond([
            'success'   => true,
            'message'   => 'Recipe added successfully!',
            'recipe_id' => $newId,
        ], 201);
    }

    respond(['error' => 'Unknown action.'], 400);
}

// ── GET routes ───────────────────────────────────────────────
$db = getDB();

// Single recipe by id
if (isset($_GET['id']) && !$action) {
    $id   = (int) $_GET['id'];
    $stmt = $db->prepare(
        'SELECT r.*, u.username AS added_by
         FROM recipes r
         LEFT JOIN users u ON u.id = r.user_id
         WHERE r.id = ?'
    );
    $stmt->execute([$id]);
    $recipe = $stmt->fetch();

    if (!$recipe) respond(['error' => 'Recipe not found.'], 404);

    $recipe['ingredients'] = json_decode($recipe['ingredients'], true);
    $recipe['steps']       = json_decode($recipe['steps'],       true);
    respond($recipe);
}

// Popular recipes
if (isset($_GET['popular'])) {
    $limit = min((int)($_GET['limit'] ?? 20), 100);
    $stmt  = $db->prepare(
        'SELECT id, name, category, cook_time, image_url, emoji, views
         FROM recipes ORDER BY views DESC LIMIT ?'
    );
    $stmt->execute([$limit]);
    respond($stmt->fetchAll());
}

// Search
if (isset($_GET['search'])) {
    $q    = '%' . clean($_GET['search']) . '%';
    $stmt = $db->prepare(
        'SELECT id, name, category, cook_time, image_url, emoji, views
         FROM recipes
         WHERE name LIKE ? OR category LIKE ?
         ORDER BY views DESC'
    );
    $stmt->execute([$q, $q]);
    respond($stmt->fetchAll());
}

// By category
if (isset($_GET['category'])) {
    $cat  = clean($_GET['category']);
    $stmt = $db->prepare(
        'SELECT id, name, category, cook_time, image_url, emoji, views
         FROM recipes WHERE category = ? ORDER BY views DESC'
    );
    $stmt->execute([$cat]);
    respond($stmt->fetchAll());
}

// All recipes (lightweight list)
$stmt = $db->query(
    'SELECT id, name, category, cook_time, image_url, emoji, views
     FROM recipes ORDER BY id ASC'
);
respond($stmt->fetchAll());
