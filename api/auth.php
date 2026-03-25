<?php
// ============================================================
//  RECIPEZ – api/auth.php
//  Handles: register, login, logout, session check
//
//  POST /api/auth.php?action=register
//  POST /api/auth.php?action=login
//  POST /api/auth.php?action=logout
//  GET  /api/auth.php?action=me
// ============================================================

require_once __DIR__ . '/../includes/helpers.php';

$action = $_GET['action'] ?? '';

switch ($action) {

    // ── REGISTER ─────────────────────────────────────────────
    case 'register':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            respond(['error' => 'POST required.'], 405);
        }

        $body     = json_decode(file_get_contents('php://input'), true) ?? [];
        $username = clean($body['username'] ?? '');
        $email    = clean($body['email']    ?? '');
        $password =       $body['password'] ?? '';

        // Validation
        if (strlen($username) < 3 || strlen($username) > 50) {
            respond(['error' => 'Username must be 3–50 characters.'], 422);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(['error' => 'Invalid email address.'], 422);
        }
        if (strlen($password) < 8) {
            respond(['error' => 'Password must be at least 8 characters.'], 422);
        }

        $db   = getDB();
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

        try {
            $stmt = $db->prepare(
                'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)'
            );
            $stmt->execute([$username, $email, $hash]);
            $userId = (int) $db->lastInsertId();
        } catch (PDOException $e) {
            // Duplicate entry
            if ($e->getCode() === '23000') {
                respond(['error' => 'Username or email already taken.'], 409);
            }
            respond(['error' => 'Registration failed. Please try again.'], 500);
        }

        // Auto-login after register
        $_SESSION['user_id']  = $userId;
        $_SESSION['username'] = $username;

        respond([
            'success'  => true,
            'message'  => 'Account created! Welcome to RECIPEZ.',
            'user'     => ['id' => $userId, 'username' => $username],
        ], 201);

    // ── LOGIN ────────────────────────────────────────────────
    case 'login':
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            respond(['error' => 'POST required.'], 405);
        }

        $body     = json_decode(file_get_contents('php://input'), true) ?? [];
        $username = clean($body['username'] ?? '');
        $password =       $body['password'] ?? '';

        if (!$username || !$password) {
            respond(['error' => 'Username and password are required.'], 422);
        }

        $db   = getDB();
        $stmt = $db->prepare('SELECT id, username, password_hash FROM users WHERE username = ?');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            respond(['error' => 'Incorrect username or password.'], 401);
        }

        $_SESSION['user_id']  = (int) $user['id'];
        $_SESSION['username'] = $user['username'];

        respond([
            'success' => true,
            'message' => 'Welcome back, ' . $user['username'] . '!',
            'user'    => ['id' => $user['id'], 'username' => $user['username']],
        ]);

    // ── LOGOUT ───────────────────────────────────────────────
    case 'logout':
        session_destroy();
        respond(['success' => true, 'message' => 'Logged out.']);

    // ── ME (session check) ───────────────────────────────────
    case 'me':
        $userId = currentUserId();
        if (!$userId) {
            respond(['loggedIn' => false, 'user' => null]);
        }
        respond([
            'loggedIn' => true,
            'user'     => ['id' => $userId, 'username' => currentUsername()],
        ]);

    default:
        respond(['error' => 'Unknown action.'], 400);
}
