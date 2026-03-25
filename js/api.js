// ============================================================
//  RECIPEZ – js/api.js
//  All fetch calls to the PHP backend.
//  Include this BEFORE main.js in every HTML page.
// ============================================================

const API_BASE = '/recipez/api';

// ── Auth helpers ─────────────────────────────────────────────

// Return the current session user, or null.
async function apiMe() {
    const r = await fetch(`${API_BASE}/auth.php?action=me`);
    return r.json();
}

// Register a new account. Returns { success, message } or { error }.
async function apiRegister(username, email, password) {
    const r = await fetch(`${API_BASE}/auth.php?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    return r.json();
}

// Log in. Returns { success, user } or { error }.
async function apiLogin(username, password) {
    const r = await fetch(`${API_BASE}/auth.php?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    return r.json();
}

// Log out.
async function apiLogout() {
    await fetch(`${API_BASE}/auth.php?action=logout`, { method: 'POST' });
    sessionStorage.removeItem('user');
    window.location.href = 'login.html';
}

// ── Recipe helpers ───────────────────────────────────────────

// Fetch all recipes (lightweight list).
async function apiFetchRecipes() {
    const r = await fetch(`${API_BASE}/recipes.php`);
    return r.json();
}

// Fetch a single full recipe by id.
async function apiFetchRecipe(id) {
    const r = await fetch(`${API_BASE}/recipes.php?id=${id}`);
    return r.json();
}

// Fetch recipes by category.
async function apiFetchByCategory(category) {
    const r = await fetch(`${API_BASE}/recipes.php?category=${encodeURIComponent(category)}`);
    return r.json();
}

// Search recipes by name or category — searches the DATABASE.
async function apiSearch(query) {
    const r = await fetch(`${API_BASE}/recipes.php?search=${encodeURIComponent(query)}`);
    return r.json();
}

// Fetch most-viewed recipes.
async function apiFetchPopular(limit = 20) {
    const r = await fetch(`${API_BASE}/recipes.php?popular=1&limit=${limit}`);
    return r.json();
}

// Increment the view counter for a recipe (fire and forget).
function apiIncrementView(id) {
    fetch(`${API_BASE}/recipes.php?action=view&id=${id}`, { method: 'POST' });
}

// Submit a new recipe. Returns { success, recipe_id } or { error }.
async function apiAddRecipe(data) {
    const r = await fetch(`${API_BASE}/recipes.php?action=add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return r.json();
}

// ── Comment helpers ──────────────────────────────────────────

// Fetch comments for a recipe.
async function apiFetchComments(recipeId) {
    const r = await fetch(`${API_BASE}/comments.php?recipe_id=${recipeId}`);
    return r.json();
}

// Post a comment. Returns { success, comment } or { error }.
async function apiPostComment(recipeId, body) {
    const r = await fetch(`${API_BASE}/comments.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe_id: recipeId, body }),
    });
    return r.json();
}
// Contact form submission
async function apiSendMessage(name, email, subject, message) {
    const r = await fetch(`${API_BASE}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
    });
    return r.json();
}