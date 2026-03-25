# RECIPEZ – Digital Recipe Sharing Web Application

**ICT 2204 / COM 2303 – Web Technologies & Web Design**  
Rajarata University of Sri Lanka | Department of Computing  
**Students:** ICT/2023/047 & ICT/2023/008

---

## Project Overview

RECIPEZ is a community-driven recipe sharing web platform where users can browse, discover, and submit recipes. It is organised into categories, features a popularity ranking section, and allows users to add their own recipes with video links. Phase 3 adds a full PHP/MySQL backend with a REST-style API, user authentication, and a live database replacing the original static JS arrays.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | index.html | Hero slider, quick cards, latest recipes |
| Categories | categories.html | 10 category cards + overview table |
| Inside Category | category.html | Filtered recipes by category |
| Popular | popular.html | Most-viewed recipes with filter buttons |
| Recipe Detail | recipe.html | YouTube embed, ingredients table, steps, comments |
| Add Recipe | add-recipe.html | Form with JS validation + lab demos |
| Login | login.html | JS + PHP session login |
| Register | register.html | New account creation |
| Contact | contact.html | Developer profiles — ICT/2023/047 & ICT/2023/008 |

---

## Lab Coverage

| Lab | Topic | Covered In |
|-----|-------|-----------|
| Lab 01 | HTML – tags, headings, paragraphs, images, hyperlinks, lists, tables | All HTML files |
| Lab 02 | CSS – inline, embedded, external; color, font-family, font-size, border, padding, margin | styles.css + HTML files |
| Lab 03 | JS Basics – variables (var/let/const), DOM, innerHTML, alert, console.log | main.js |
| Lab 04 | JS Operators – arithmetic, comparison, logical; if/else/nested-if/if-else-if ladder | main.js |
| Lab 05 | JS Loops (for/while/do-while), Functions | main.js |
| Lab 06 | JS Arrays, Objects, Strings | main.js |
| Lab 07 | PHP – PDO, sessions, password hashing, JSON responses, REST API | api/*.php, config/db.php, includes/helpers.php |

---

## JavaScript Features (Project Requirements)

1. ✅ Dynamic Content Updates – Live search, filter buttons, DB-powered recipe grids
2. ✅ Interactive Image Slider – Auto-play hero slider with manual controls
3. ✅ Form Validation – Add recipe + login/register validation with error messages
4. ✅ Smooth Scrolling – Back to Top button
5. ✅ Event Handling – Hover effects, click events, keyboard events (Escape to close search)
6. ✅ Custom Animations – Fade-in on scroll, slide transitions

---

## Phase 3 — Backend

### Database Tables

| Table | Purpose |
|-------|---------|
| `users` | Registered accounts (username, email, bcrypt password hash) |
| `recipes` | 100 seeded recipes + user-submitted ones (ingredients & steps stored as JSON) |
| `comments` | Per-recipe comments; supports guest or logged-in author |

### API Endpoints

| Method | Endpoint | Action |
|--------|----------|--------|
| GET | `/api/recipes.php` | All recipes (lightweight list) |
| GET | `/api/recipes.php?id=101` | Single recipe with full details |
| GET | `/api/recipes.php?category=Lunch` | Recipes filtered by category |
| GET | `/api/recipes.php?search=pasta` | Search by name or category |
| GET | `/api/recipes.php?popular=1&limit=10` | Top recipes by views |
| POST | `/api/recipes.php?action=add` | Add recipe (login required) |
| POST | `/api/recipes.php?action=view&id=101` | Increment view count |
| GET | `/api/comments.php?recipe_id=101` | List comments for a recipe |
| POST | `/api/comments.php` | Post a comment (guest or logged-in) |
| POST | `/api/auth.php?action=register` | Create a new account |
| POST | `/api/auth.php?action=login` | Login and start session |
| POST | `/api/auth.php?action=logout` | Destroy session |
| GET | `/api/auth.php?action=me` | Check current session status |

### Database Setup

**Requirements:** PHP 8.0+, MySQL 5.7+ or MariaDB 10.3+, local server (XAMPP / WAMP).

```bash
# Import via CLI
mysql -u root -p < recipez_db.sql

# Or open phpMyAdmin → Import → select recipez_db.sql
```

Edit `config/db.php` to match your local credentials:

```php
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3307');   // default MySQL port is 3306
define('DB_NAME', 'recipez_db');
define('DB_USER', 'root');
define('DB_PASS', '');
```

---

## Login Credentials (Demo)

| Username | Password |
|----------|----------|
| ICT047   | recipez  |
| ICT008   | recipez  |
| admin    | recipe123|

---

## File Structure

```
recipez/
├── index.html            ← Home Page
├── categories.html       ← Categories Page
├── category.html         ← Inside Category Page
├── popular.html          ← Popular Page
├── recipe.html           ← Recipe Detail Page
├── add-recipe.html       ← Add Recipe Form
├── login.html            ← Login Page
├── register.html         ← Register Page            ← NEW (Phase 3)
├── contact.html          ← Developer Contact Page   ← NEW (Phase 3)
├── css/
│   └── styles.css        ← External CSS (Lab 02)
├── js/
│   ├── main.js           ← All JavaScript (Lab 03–06)
│   └── api.js            ← Fetch helpers for PHP API ← NEW (Phase 3)
├── api/                                              ← NEW (Phase 3)
│   ├── recipes.php       ← Recipe CRUD + search
│   ├── auth.php          ← Register / login / logout
│   └── comments.php      ← Comments read/write
├── config/                                           ← NEW (Phase 3)
│   └── db.php            ← PDO connection settings
├── includes/                                         ← NEW (Phase 3)
│   └── helpers.php       ← respond(), clean(), auth guards
├── recipez_db.sql        ← Full DB schema + 100 recipes ← NEW (Phase 3)
└── README.md
```

---

## Tech Stack

- **HTML5** – Semantic structure (Lab 01)
- **CSS3** – External, embedded, inline (Lab 02)
- **JavaScript (Vanilla)** – DOM, arrays, objects, loops, functions (Lab 03–06)
- **PHP 8** – PDO, sessions, REST API, password hashing (Lab 07)
- **MySQL / MariaDB** – Relational database with JSON columns
- No frontend frameworks – pure HTML/CSS/JS as per lab requirements

---

## Contact & Developers

| Name | Student ID | Email | GitHub |
|------|-----------|-------|--------|
| Mithila Umayantha | ICT/2023/047 | mithilaumayantha115@gmail.com | [MBeBoB](https://github.com/MBeBoB) |
| Dulhan Hansaja | ICT/2023/008 | dulhanhansaja@gmail.com | [DulhanHansaja](https://github.com/DulhanHansaja) |

Full contact details and LinkedIn profiles are available on the [Contact page](contact.html).
