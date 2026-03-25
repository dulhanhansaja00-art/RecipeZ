-- ============================================================
--  RECIPEZ – recipez_db.sql
--  ICT 2204 / COM 2303 – Web Technologies & Web Design
--  Rajarata University of Sri Lanka
--  Students: ICT/2023/047 & ICT/2023/008
--
--  Phase 3: Full backend (users, recipes, comments)
--  Compatible: MySQL 5.7+ / MariaDB 10.3+
--
--  Usage:
--    mysql -u root -p < recipez_db.sql
--  Or import via phpMyAdmin → Import tab.
-- ============================================================

CREATE DATABASE IF NOT EXISTS recipez_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE recipez_db;

-- ── users ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  username      VARCHAR(50)   NOT NULL,
  email         VARCHAR(120)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_username (username),
  UNIQUE KEY uq_email    (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── recipes ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS recipes (
  id          INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name        VARCHAR(120)  NOT NULL,
  category    VARCHAR(60)   NOT NULL,
  cook_time   VARCHAR(30)   NOT NULL DEFAULT '',
  youtube_url VARCHAR(300)  NOT NULL DEFAULT '',
  image_url   VARCHAR(500)  NOT NULL DEFAULT '',
  ingredients JSON          NOT NULL,
  steps       JSON          NOT NULL,
  emoji       VARCHAR(10)   NOT NULL DEFAULT '🍽️',
  views       INT UNSIGNED  NOT NULL DEFAULT 0,
  user_id     INT UNSIGNED           DEFAULT NULL,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_category (category),
  KEY idx_views    (views DESC),
  CONSTRAINT fk_recipe_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── comments ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  recipe_id  INT UNSIGNED NOT NULL,
  user_id    INT UNSIGNED          DEFAULT NULL,
  author     VARCHAR(80)  NOT NULL DEFAULT 'Guest',
  body       TEXT         NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_comment_recipe (recipe_id),
  CONSTRAINT fk_comment_recipe FOREIGN KEY (recipe_id)
    REFERENCES recipes (id) ON DELETE CASCADE,
  CONSTRAINT fk_comment_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── messages (contact form submissions) ──────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(120)  NOT NULL,
  message    TEXT          NOT NULL,
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  SEED: Demo users
--  ICT047 / ICT008  → password: recipez
--  admin            → password: recipe123
-- ============================================================
INSERT INTO users (username, email, password_hash) VALUES
('ICT047','mithilaumayantha115@gmail.com','$2y$12$rGpvAR3J1EomcgMKyaB7iubOY3s4u8vST5C0UbbALhf9lPIgIhEYe'),
('ICT008','dulhanhansaja@gmail.com',      '$2y$12$rGpvAR3J1EomcgMKyaB7iubOY3s4u8vST5C0UbbALhf9lPIgIhEYe'),
('admin', 'admin@recipez.local',          '$2y$12$EAHoZdq0Z4wKR1hTYJWXmeVvVMOBHTzrp8BQOLz.2fwFl.1xPv/Iy');

-- ============================================================
--  SEED: 100 Recipes
-- ============================================================

-- Breakfast (101-110)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(101,'Pancakes','Breakfast','20 min','https://www.youtube.com/embed/NCMKedZvnyI','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80','🥞',990,'[["Flour","1.5 cups"],["Milk","1 cup"],["Eggs","2"],["Baking Powder","2 tsp"],["Butter","2 tbsp"]]','["Mix dry ingredients.","Whisk in milk, eggs and butter.","Heat pan on medium.","Pour 1/4 cup batter per pancake.","Cook until bubbles form then flip."]'),
(102,'Waffles','Breakfast','25 min','https://www.youtube.com/embed/6KiZ_u_CkzU','https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80','🧇',870,'[["Flour","2 cups"],["Milk","1.5 cups"],["Eggs","2"],["Butter","4 tbsp"],["Sugar","2 tbsp"]]','["Mix all into smooth batter.","Preheat waffle iron.","Pour batter and close.","Cook until golden.","Serve with maple syrup."]'),
(103,'Soft Boiled Eggs','Breakfast','8 min','https://www.youtube.com/embed/rVZc9uT8qsI','https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80','🥚',750,'[["Eggs","2"],["Water","enough to cover"],["Salt","pinch"]]','["Bring water to boil.","Gently lower eggs.","Cook 6 minutes.","Ice cold water bath.","Peel and serve."]'),
(104,'Hoppers','Breakfast','30 min','https://www.youtube.com/embed/4Lpxq2nbgAQ','https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80','🫓',680,'[["Rice Flour","2 cups"],["Coconut Milk","1 cup"],["Yeast","1 tsp"],["Salt","1 tsp"],["Eggs","2"]]','["Mix flour and coconut milk.","Add yeast, ferment 2 hours.","Heat hopper pan.","Pour batter and swirl.","Add egg, cover and cook."]'),
(105,'French Toast','Breakfast','15 min','https://www.youtube.com/embed/sdgroNuyKdI','https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80','🍞',820,'[["Bread","4 slices"],["Eggs","2"],["Milk","1/4 cup"],["Cinnamon","1/2 tsp"],["Butter","1 tbsp"]]','["Whisk eggs, milk, cinnamon.","Dip bread slices.","Melt butter in pan.","Fry until golden both sides.","Serve with powdered sugar."]'),
(106,'Omelette','Breakfast','10 min','https://www.youtube.com/embed/5rBZ9S0b2Tc','https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80','🍳',760,'[["Eggs","3"],["Cheese","50g"],["Butter","1 tbsp"],["Salt","pinch"],["Pepper","pinch"]]','["Beat eggs with seasoning.","Melt butter in pan.","Pour eggs on medium heat.","Add cheese on one side.","Fold and serve."]'),
(107,'Avocado Toast','Breakfast','10 min','https://www.youtube.com/embed/dP6btliLGy4','https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80','🥑',870,'[["Bread","2 slices"],["Avocado","1"],["Lemon","1/2"],["Salt","pinch"],["Chili Flakes","pinch"]]','["Toast bread until golden.","Mash avocado with lemon.","Spread onto toast.","Sprinkle chili flakes.","Serve fresh."]'),
(108,'Smoothie Bowl','Breakfast','10 min','https://www.youtube.com/embed/fXLYqqxB2wc','https://images.unsplash.com/photo-1511690743698-d9d4be4bda99?w=600&q=80','🫐',640,'[["Frozen Berries","1 cup"],["Banana","1"],["Yoghurt","1/2 cup"],["Granola","1/4 cup"],["Honey","1 tbsp"]]','["Blend berries and banana.","Pour into bowl.","Top with granola.","Add fresh fruit.","Drizzle honey."]'),
(109,'Idli','Breakfast','30 min','https://www.youtube.com/embed/Ayo80PIb-Qg','https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80','🫓',520,'[["Rice Flour","2 cups"],["Urad Dal","1/2 cup"],["Salt","1 tsp"],["Water","as needed"]]','["Soak and grind ingredients.","Ferment batter 8 hours.","Fill idli moulds.","Steam 10 minutes.","Serve with sambar."]'),
(110,'String Hoppers','Breakfast','25 min','https://www.youtube.com/embed/9Lizj4h5XC8','https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80','🍝',480,'[["Rice Flour","2 cups"],["Hot Water","1 cup"],["Salt","1 tsp"]]','["Mix flour and salt.","Add hot water, knead.","Press through mould onto mats.","Steam 5 minutes.","Serve with sambol."]');

-- Lunch (201-210)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(201,'Rice and Curry','Lunch','45 min','https://www.youtube.com/embed/7xvjmIyfXN0','https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80','🍛',1150,'[["Rice","2 cups"],["Chicken","300g"],["Coconut Milk","1 cup"],["Curry Leaves","handful"],["Spices","to taste"]]','["Cook rice until fluffy.","Prepare chicken curry.","Cook dhal.","Serve with sambol.","Garnish with fried onions."]'),
(202,'Caesar Salad','Lunch','15 min','https://www.youtube.com/embed/iA7vjDuL1FY','https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80','🥗',640,'[["Romaine Lettuce","1 head"],["Caesar Dressing","3 tbsp"],["Parmesan","50g"],["Croutons","1 cup"],["Lemon","1/2"]]','["Wash and dry lettuce.","Toss with dressing.","Add croutons and parmesan.","Squeeze lemon.","Serve chilled."]'),
(203,'Club Sandwich','Lunch','15 min','https://www.youtube.com/embed/S_1_ZSMxRfg','https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80','🥪',580,'[["Bread","3 slices"],["Chicken","100g"],["Bacon","2 strips"],["Lettuce","2 leaves"],["Mayo","2 tbsp"]]','["Toast all bread.","Layer chicken and bacon.","Add lettuce and tomato.","Stack and repeat.","Cut diagonally."]'),
(204,'Fried Rice','Lunch','20 min','https://www.youtube.com/embed/iv1frVobFeQ','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80','🍚',1050,'[["Cooked Rice","2 cups"],["Eggs","2"],["Soy Sauce","3 tbsp"],["Mixed Veg","1 cup"],["Garlic","3 cloves"]]','["Fry garlic in wok.","Add veg and stir-fry.","Scramble eggs.","Add rice and soy sauce.","Toss on high heat."]'),
(205,'Noodles','Lunch','20 min','https://www.youtube.com/embed/Rbpby8YObA4','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80','🍜',890,'[["Noodles","200g"],["Vegetables","1 cup"],["Soy Sauce","2 tbsp"],["Sesame Oil","1 tsp"],["Garlic","2 cloves"]]','["Cook noodles al dente.","Stir-fry garlic and veg.","Add noodles.","Season with soy.","Toss and serve."]'),
(206,'Kottu Roti','Lunch','25 min','https://www.youtube.com/embed/K3WF9dh0UJ8','https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80','🫓',980,'[["Roti","4 pieces"],["Eggs","2"],["Vegetables","1 cup"],["Chicken","150g"],["Spices","to taste"]]','["Chop roti into strips.","Fry chicken and veg.","Add eggs and scramble.","Add roti strips.","Season on high heat."]'),
(207,'Grilled Chicken','Lunch','30 min','https://www.youtube.com/embed/oWXlmAeqoUE','https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80','🍗',760,'[["Chicken Breast","2"],["Lemon","1"],["Garlic","3 cloves"],["Olive Oil","2 tbsp"],["Herbs","to taste"]]','["Marinate with lemon.","Rest 30 minutes.","Grill medium-high.","6 minutes each side.","Rest before slicing."]'),
(208,'Pasta Salad','Lunch','20 min','https://www.youtube.com/embed/Fb_IljnhwTo','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80','🍝',520,'[["Pasta","200g"],["Olives","1/2 cup"],["Feta","100g"],["Cherry Tomatoes","1 cup"],["Olive Oil","3 tbsp"]]','["Cook and cool pasta.","Add olives and feta.","Dress with oil and herbs.","Toss together.","Chill before serving."]'),
(209,'Chicken Wrap','Lunch','15 min','https://www.youtube.com/embed/UJi0fS1SxHg','https://images.unsplash.com/photo-1623428187425-b6dbaad6e7e6?w=600&q=80','🌯',680,'[["Tortilla","2"],["Chicken","150g"],["Avocado","1"],["Lettuce","handful"],["Sour Cream","2 tbsp"]]','["Grill chicken.","Warm tortilla.","Spread sour cream.","Layer fillings.","Roll and serve."]'),
(210,'Tomato Soup','Lunch','30 min','https://www.youtube.com/embed/n1DRR31z6_U','https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80','🍲',430,'[["Tomatoes","6"],["Onion","1"],["Garlic","3 cloves"],["Cream","1/4 cup"],["Basil","handful"]]','["Roast tomatoes.","Saute onion.","Blend everything.","Add cream.","Simmer and serve."]');

-- Dinner (301-310)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(301,'Pizza','Dinner','30 min','https://www.youtube.com/embed/-AuK92Jq4yQ','https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80','🍕',1240,'[["Pizza Dough","1"],["Tomato Sauce","1/2 cup"],["Mozzarella","200g"],["Basil","handful"],["Olive Oil","2 tbsp"]]','["Preheat to 220C.","Roll dough.","Spread sauce.","Add toppings.","Bake 15 minutes."]'),
(302,'Butter Chicken','Dinner','45 min','https://www.youtube.com/embed/a03U45jFxOI','https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80','🍛',1320,'[["Chicken","500g"],["Butter","3 tbsp"],["Tomato Puree","1 cup"],["Cream","1/2 cup"],["Spices","to taste"]]','["Marinate chicken.","Cook in butter.","Add tomato puree.","Stir in cream.","Garnish with coriander."]'),
(303,'Lasagna','Dinner','90 min','https://www.youtube.com/embed/fVDsTP-pTXs','https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80','🫕',830,'[["Lasagna Sheets","12"],["Beef Mince","400g"],["Bechamel","2 cups"],["Tomato Sauce","2 cups"],["Mozzarella","200g"]]','["Brown mince.","Make bechamel.","Layer sheets and sauces.","Top with mozzarella.","Bake 45 min at 180C."]'),
(304,'Steak','Dinner','20 min','https://www.youtube.com/embed/cF46oV53ZvE','https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80','🥩',1100,'[["Ribeye Steak","2"],["Butter","2 tbsp"],["Garlic","3 cloves"],["Rosemary","2 sprigs"],["Salt and Pepper","to taste"]]','["Season steak well.","Heat pan until smoking.","Sear 3 minutes each side.","Baste with butter.","Rest 5 minutes."]'),
(305,'Fish Curry','Dinner','35 min','https://www.youtube.com/embed/aROKVWwp43U','https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80','🐟',720,'[["Fish","500g"],["Coconut Milk","1 cup"],["Tomato","2"],["Onion","1"],["Curry Leaves","handful"]]','["Fry spices.","Add onion and tomato.","Add fish.","Pour coconut milk.","Simmer and garnish."]'),
(306,'Spaghetti','Dinner','35 min','https://www.youtube.com/embed/YXYjwALuA7c','https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80','🍝',960,'[["Spaghetti","300g"],["Beef Mince","400g"],["Tomato Sauce","2 cups"],["Garlic","3 cloves"],["Parmesan","50g"]]','["Cook spaghetti.","Brown mince.","Add sauce.","Toss with pasta.","Top with parmesan."]'),
(307,'Biryani','Dinner','60 min','https://www.youtube.com/embed/95BCU1n268w','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80','🍚',1200,'[["Basmati Rice","2 cups"],["Chicken","500g"],["Yoghurt","1 cup"],["Saffron","pinch"],["Spices","to taste"]]','["Marinate chicken.","Par-cook rice.","Layer in pot.","Dum cook 20 min.","Serve with raita."]'),
(308,'Ramen','Dinner','40 min','https://www.youtube.com/embed/TGHbePXG7Oo','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80','🍜',1180,'[["Ramen Noodles","2 packs"],["Chicken Broth","4 cups"],["Soy Sauce","2 tbsp"],["Boiled Egg","2"],["Spring Onions","2"]]','["Boil broth with soy.","Cook noodles.","Combine both.","Add toppings.","Serve hot."]'),
(309,'Tacos','Dinner','20 min','https://www.youtube.com/embed/IUCN2eFEJfU','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80','🌮',760,'[["Tortillas","6"],["Beef Mince","250g"],["Taco Spice","1 tbsp"],["Lettuce","1 cup"],["Salsa","1/2 cup"]]','["Cook mince with spice.","Warm tortillas.","Fill with mince.","Add toppings.","Serve with lime."]'),
(310,'Kebab','Dinner','30 min','https://www.youtube.com/embed/6No7g2GptXY','https://images.unsplash.com/photo-1529565214-56e9c7e4f7f4?w=600&q=80','🍢',690,'[["Lamb Mince","400g"],["Onion","1"],["Garlic","3 cloves"],["Spices","to taste"],["Parsley","handful"]]','["Mix mince with spices.","Shape onto skewers.","Grill on high heat.","Turn every 3 min.","Serve with flatbread."]');

-- Desserts (401-410)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(401,'Chocolate Cake','Desserts','60 min','https://www.youtube.com/embed/vI5w-fK25w4','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80','🎂',1050,'[["Flour","2 cups"],["Cocoa","1/2 cup"],["Sugar","1.5 cups"],["Eggs","3"],["Butter","1/2 cup"]]','["Mix dry ingredients.","Beat eggs and butter.","Combine all.","Bake 35 min at 180C.","Frost with ganache."]'),
(402,'Ice Cream','Desserts','20 min','https://www.youtube.com/embed/_c8WbWgkkS8','https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80','🍨',950,'[["Heavy Cream","2 cups"],["Milk","1 cup"],["Sugar","3/4 cup"],["Vanilla","1 tsp"],["Egg Yolks","4"]]','["Make custard.","Cool completely.","Churn in maker.","Freeze 4 hours.","Scoop and serve."]'),
(403,'Cheesecake','Desserts','90 min','https://www.youtube.com/embed/Mfig-pIyh-g','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80','🍰',850,'[["Cream Cheese","500g"],["Sugar","3/4 cup"],["Eggs","3"],["Sour Cream","1/2 cup"],["Graham Crackers","200g"]]','["Make biscuit crust.","Beat cream cheese.","Add eggs.","Pour over crust.","Bake 1 hr at 160C."]'),
(404,'Brownies','Desserts','40 min','https://www.youtube.com/embed/72WSqlUXWJU','https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80','🍫',920,'[["Dark Chocolate","200g"],["Butter","100g"],["Sugar","200g"],["Eggs","3"],["Flour","100g"]]','["Melt chocolate and butter.","Beat sugar and eggs.","Fold in flour.","Pour into tin.","Bake 25 min."]'),
(405,'Creme Brulee','Desserts','60 min','https://www.youtube.com/embed/6tSdlo0r0Io','https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80','🍮',650,'[["Heavy Cream","2 cups"],["Egg Yolks","5"],["Sugar","1/2 cup"],["Vanilla","1 tsp"],["Extra Sugar","for top"]]','["Heat cream.","Whisk yolks and sugar.","Combine and strain.","Bake in water bath.","Caramelise sugar."]'),
(406,'Tiramisu','Desserts','30 min','https://www.youtube.com/embed/zmSWPBbej84','https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80','🍰',780,'[["Mascarpone","500g"],["Eggs","4"],["Sugar","1/2 cup"],["Espresso","1 cup"],["Ladyfingers","24"]]','["Beat yolks and sugar.","Fold in mascarpone.","Dip ladyfingers in coffee.","Layer in dish.","Chill overnight."]'),
(407,'Apple Pie','Desserts','90 min','https://www.youtube.com/embed/KbyahTnzbKA','https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=80','🥧',720,'[["Pastry Dough","2 sheets"],["Apples","6 large"],["Sugar","3/4 cup"],["Cinnamon","2 tsp"],["Butter","2 tbsp"]]','["Make pastry.","Slice apples.","Mix with sugar.","Fill pastry case.","Bake 45 minutes."]'),
(408,'Mango Pudding','Desserts','20 min','https://www.youtube.com/embed/OHlFBpplYNA','https://images.unsplash.com/photo-1605990335689-72df7f4d7bf6?w=600&q=80','🥭',540,'[["Mango","2 large"],["Sugar","1/4 cup"],["Gelatin","2 tsp"],["Cream","1/2 cup"],["Milk","1/2 cup"]]','["Blend mango.","Heat with sugar.","Dissolve gelatin.","Pour into moulds.","Chill 4 hours."]'),
(409,'Faluda','Desserts','15 min','https://www.youtube.com/embed/c1yqmGtsOv0','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80','🥤',610,'[["Milk","2 cups"],["Rose Syrup","3 tbsp"],["Basil Seeds","2 tbsp"],["Vermicelli","1/2 cup"],["Ice Cream","2 scoops"]]','["Soak basil seeds.","Cook vermicelli.","Layer with syrup.","Add milk.","Top with ice cream."]'),
(410,'Donuts','Desserts','60 min','https://www.youtube.com/embed/Ws0XeEBhVrQ','https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80','🍩',870,'[["Flour","3 cups"],["Yeast","2 tsp"],["Milk","1 cup"],["Sugar","1/4 cup"],["Glaze","as needed"]]','["Make yeast dough.","Let rise 1 hour.","Cut into rings.","Deep fry until golden.","Dip in glaze."]');

-- Drinks (501-510)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(501,'Lemonade','Drinks','10 min','https://www.youtube.com/embed/COx5Bf0PsQs','https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80','🍋',760,'[["Lemons","4"],["Sugar","1/2 cup"],["Water","4 cups"],["Ice","as needed"],["Mint","few leaves"]]','["Make simple syrup.","Squeeze lemons.","Combine and stir.","Add ice.","Serve with mint."]'),
(502,'Mango Lassi','Drinks','5 min','https://www.youtube.com/embed/xqir4h6rYJw','https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80','🥭',760,'[["Mango","1 large"],["Yoghurt","1 cup"],["Milk","1/2 cup"],["Sugar","2 tbsp"],["Cardamom","pinch"]]','["Chop mango.","Blend all ingredients.","Adjust sweetness.","Pour over ice.","Garnish with cardamom."]'),
(503,'Mojito','Drinks','5 min','https://www.youtube.com/embed/BC6uOm9PtxY','https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80','🍹',690,'[["Lime","2"],["Mint","10 leaves"],["Sugar","2 tbsp"],["Soda Water","200ml"],["Ice","as needed"]]','["Muddle lime and mint.","Add sugar.","Fill with ice.","Pour soda water.","Stir and garnish."]'),
(504,'Iced Coffee','Drinks','5 min','https://www.youtube.com/embed/QeS30EnYuks','https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80','☕',820,'[["Espresso","2 shots"],["Milk","1 cup"],["Ice","as needed"],["Sugar","to taste"],["Cream","optional"]]','["Brew espresso.","Let cool.","Fill glass with ice.","Pour over ice.","Add milk."]'),
(505,'Strawberry Smoothie','Drinks','5 min','https://www.youtube.com/embed/vwO7nPaAWvs','https://images.unsplash.com/photo-1553484771-371a816b9cc8?w=600&q=80','🍓',650,'[["Strawberries","1 cup"],["Banana","1"],["Yoghurt","1/2 cup"],["Milk","1/2 cup"],["Honey","1 tbsp"]]','["Add all to blender.","Blend until smooth.","Adjust sweetness.","Pour into glass.","Serve immediately."]'),
(506,'Pina Colada','Drinks','5 min','https://www.youtube.com/embed/hCrsC2FHPf0','https://images.unsplash.com/photo-1551024559-d6b0bbb10ef3?w=600&q=80','🍍',580,'[["Pineapple","1 cup"],["Coconut Cream","1/2 cup"],["Ice","1 cup"],["Lime","1"]]','["Add to blender.","Add ice.","Blend smooth.","Pour into glass.","Garnish with pineapple."]'),
(507,'Chai Tea','Drinks','15 min','https://www.youtube.com/embed/JuK-RtjLOfc','https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80','🍵',520,'[["Tea","2 tsp"],["Milk","1 cup"],["Ginger","1 inch"],["Cardamom","3 pods"],["Sugar","to taste"]]','["Boil water with spices.","Add tea and simmer.","Pour in milk.","Add sugar.","Strain and serve."]'),
(508,'Orange Juice','Drinks','5 min','https://www.youtube.com/embed/w6IjwKOB_t8','https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80','🍊',480,'[["Oranges","6"],["Ice","as needed"]]','["Halve all oranges.","Press through juicer.","Strain if desired.","Pour over ice.","Serve fresh."]'),
(509,'Watermelon Juice','Drinks','5 min','https://www.youtube.com/embed/tn-fqm5nMUA','https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&q=80','🍉',420,'[["Watermelon","1/2 small"],["Lime","1"],["Mint","handful"],["Salt","pinch"]]','["Remove rind and seeds.","Blend watermelon.","Add lime and mint.","Pour over ice.","Serve immediately."]'),
(510,'Hot Chocolate','Drinks','10 min','https://www.youtube.com/embed/6nXv-Np-Bc4','https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80','🍫',680,'[["Milk","2 cups"],["Dark Chocolate","100g"],["Sugar","2 tbsp"],["Vanilla","1/2 tsp"],["Whipped Cream","for top"]]','["Heat milk gently.","Melt chocolate in.","Add sugar and vanilla.","Whisk frothy.","Top with cream."]');

-- Side Dish (601-610)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(601,'Garlic Bread','Side Dish','15 min','https://www.youtube.com/embed/FkV_fU5GoXM','https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80','🥖',880,'[["Baguette","1"],["Butter","100g"],["Garlic","4 cloves"],["Parsley","handful"]]','["Mix butter and garlic.","Slice baguette.","Spread butter mix.","Wrap in foil.","Bake 15 min at 200C."]'),
(602,'Coleslaw','Side Dish','15 min','https://www.youtube.com/embed/soH0AcJkUNw','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80','🥗',560,'[["Cabbage","1/2 head"],["Carrot","2"],["Mayo","3 tbsp"],["Vinegar","1 tbsp"],["Sugar","1 tbsp"]]','["Shred cabbage.","Grate carrot.","Mix dressing.","Toss together.","Refrigerate before serving."]'),
(603,'Mashed Potatoes','Side Dish','25 min','https://www.youtube.com/embed/gsI8wGi7ONo','https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=80','🥔',720,'[["Potatoes","1kg"],["Butter","80g"],["Cream","1/2 cup"],["Salt","to taste"],["Pepper","to taste"]]','["Boil potatoes.","Drain and mash.","Add butter and cream.","Season well.","Mix until fluffy."]'),
(604,'Onion Rings','Side Dish','20 min','https://www.youtube.com/embed/9DleMdJKFvw','https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80','🧅',640,'[["Onion","2 large"],["Flour","1 cup"],["Beer","1/2 cup"],["Egg","1"],["Oil","for frying"]]','["Slice into rings.","Make batter.","Dip rings.","Deep fry until golden.","Season and serve."]'),
(605,'Greek Salad','Side Dish','10 min','https://www.youtube.com/embed/j7rU-1-s7NM','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80','🥗',490,'[["Tomatoes","3"],["Cucumber","1"],["Olives","1/2 cup"],["Feta","150g"],["Olive Oil","3 tbsp"]]','["Chop vegetables.","Add olives and feta.","Drizzle oil.","Season with oregano.","Serve fresh."]'),
(606,'Corn on the Cob','Side Dish','15 min','https://www.youtube.com/embed/kwxdbNBOros','https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80','🌽',380,'[["Corn","4 cobs"],["Butter","4 tbsp"],["Salt","to taste"],["Chili","1/2 tsp"],["Lime","1"]]','["Grill corn on flame.","Turn every 2 min.","Brush with butter.","Squeeze lime.","Serve immediately."]'),
(607,'Hummus','Side Dish','10 min','https://www.youtube.com/embed/gbTN9CXDZrI','https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=600&q=80','🫘',560,'[["Chickpeas","400g"],["Tahini","3 tbsp"],["Lemon","1"],["Garlic","2 cloves"],["Olive Oil","3 tbsp"]]','["Blend chickpeas.","Add tahini and lemon.","Add garlic.","Season with salt.","Drizzle oil to serve."]'),
(608,'Rice Pilaf','Side Dish','25 min','https://www.youtube.com/embed/ILADSVOx_QI','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80','🍚',420,'[["Rice","1.5 cups"],["Broth","3 cups"],["Onion","1"],["Butter","2 tbsp"],["Herbs","to taste"]]','["Saute onion.","Toast rice 2 min.","Pour broth.","Cover, cook 18 min.","Fluff with fork."]'),
(609,'Roasted Veg','Side Dish','35 min','https://www.youtube.com/embed/opMsfLXZn74','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80','🥦',490,'[["Mixed Veg","500g"],["Olive Oil","3 tbsp"],["Garlic","3 cloves"],["Herbs","to taste"],["Salt","to taste"]]','["Chop vegetables.","Toss with oil.","Spread on tray.","Roast 25 min at 200C.","Season and serve."]'),
(610,'Stir-fry Greens','Side Dish','10 min','https://www.youtube.com/embed/Qb5Amsjdw5Q','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80','🥬',320,'[["Bok Choy","4 heads"],["Garlic","3 cloves"],["Oyster Sauce","2 tbsp"],["Sesame Oil","1 tsp"]]','["Heat wok.","Fry garlic.","Add bok choy.","Toss 2 minutes.","Add sauces and serve."]');

-- BBQ (701-710)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(701,'BBQ Ribs','BBQ','3 hrs','https://www.youtube.com/embed/-vlXUeivyRo','https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80','🍖',920,'[["Pork Ribs","1 rack"],["BBQ Sauce","1 cup"],["Garlic Powder","1 tsp"],["Paprika","1 tsp"],["Brown Sugar","2 tbsp"]]','["Rub ribs with spices.","Marinate overnight.","Slow cook 2.5 hrs.","Brush with sauce.","Grill 5 min each side."]'),
(702,'BBQ Chicken','BBQ','40 min','https://www.youtube.com/embed/17xoow4PelY','https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80','🍗',850,'[["Chicken","1kg"],["BBQ Sauce","1 cup"],["Garlic","3 cloves"],["Paprika","1 tsp"],["Olive Oil","2 tbsp"]]','["Marinate overnight.","Heat BBQ.","Grill medium heat.","Baste with sauce.","Cook until done."]'),
(703,'Burgers','BBQ','25 min','https://www.youtube.com/embed/BIG1h2vG-Qg','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80','🍔',980,'[["Beef Mince","300g"],["Burger Buns","2"],["Lettuce","2 leaves"],["Tomato","1"],["Cheddar","2 slices"]]','["Shape patties.","Grill 4 min each side.","Toast buns.","Add cheese last.","Assemble and serve."]'),
(704,'Lamb Chops','BBQ','30 min','https://www.youtube.com/embed/SHket6wQ0bU','https://images.unsplash.com/photo-1529565214-56e9c7e4f7f4?w=600&q=80','🍖',720,'[["Lamb Chops","4"],["Garlic","3 cloves"],["Rosemary","2 sprigs"],["Olive Oil","2 tbsp"],["Lemon","1"]]','["Marinate with garlic.","Heat BBQ high.","Grill 3 min each side.","Rest 5 minutes.","Serve with lemon."]'),
(705,'BBQ Prawns','BBQ','15 min','https://www.youtube.com/embed/vLlShHvZzN8','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80','🦐',680,'[["Prawns","500g"],["Garlic","4 cloves"],["Butter","3 tbsp"],["Lemon","1"],["Parsley","handful"]]','["Skewer prawns.","Mix garlic butter.","Brush prawns.","Grill 3 min each side.","Squeeze lemon."]'),
(706,'Smoked Brisket','BBQ','12 hrs','https://www.youtube.com/embed/PVycYj_PKgk','https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80','🥩',560,'[["Beef Brisket","2kg"],["Salt","3 tbsp"],["Black Pepper","2 tbsp"],["Garlic Powder","1 tbsp"],["Wood Chips","as needed"]]','["Rub with seasoning.","Smoke at 110C.","Cook 12 hours.","Wrap and continue.","Rest 2 hours before slicing."]'),
(707,'Grilled Veg','BBQ','20 min','https://www.youtube.com/embed/7EBBDMSgz_s','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80','🥦',420,'[["Zucchini","2"],["Capsicum","2"],["Mushrooms","200g"],["Olive Oil","3 tbsp"],["Herbs","to taste"]]','["Slice thickly.","Brush with oil.","Grill high heat.","5 min each side.","Season and serve."]'),
(708,'BBQ Salmon','BBQ','20 min','https://www.youtube.com/embed/vKkQYakXJJY','https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80','🐟',580,'[["Salmon Fillets","4"],["Lemon","1"],["Dill","handful"],["Olive Oil","2 tbsp"],["Salt and Pepper","to taste"]]','["Season salmon.","Brush with oil.","Grill skin down.","4 min each side.","Serve with lemon."]'),
(709,'BBQ Sausages','BBQ','15 min','https://www.youtube.com/embed/3Ycn6Rv93J8','https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&q=80','🌭',760,'[["Sausages","8"],["Mustard","3 tbsp"],["Bread Rolls","8"],["Onion","2"]]','["Grill on medium heat.","Turn every 3 min.","Caramelise onions.","Toast rolls.","Serve with mustard."]'),
(710,'Grilled Corn','BBQ','15 min','https://www.youtube.com/embed/3YAMFn64VS4','https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80','🌽',450,'[["Corn","4 cobs"],["Butter","4 tbsp"],["Chili","1/2 tsp"],["Lime","1"],["Salt","to taste"]]','["Grill on BBQ.","Rotate every 2 min.","Cook 10 minutes.","Brush with butter.","Squeeze lime."]');

-- Quick & Easy (801-810)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(801,'Scrambled Eggs','Quick & Easy','8 min','https://www.youtube.com/embed/yyi55ZrpJ0E','https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80','🍳',920,'[["Eggs","3"],["Butter","1 tbsp"],["Cream","1 tbsp"],["Salt","pinch"],["Pepper","pinch"]]','["Beat eggs with cream.","Melt butter on low.","Add eggs and stir.","Remove before set.","Season and serve."]'),
(802,'Instant Noodles','Quick & Easy','5 min','https://www.youtube.com/embed/hQV50DsLTv4','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80','🍜',1100,'[["Instant Noodles","1 pack"],["Egg","1"],["Soy Sauce","1 tbsp"],["Spring Onion","1"],["Chili","optional"]]','["Boil water.","Cook noodles 3 min.","Add egg and stir.","Season with soy.","Top with spring onion."]'),
(803,'Quesadilla','Quick & Easy','10 min','https://www.youtube.com/embed/wTYD1dt7omk','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80','🫓',780,'[["Tortilla","2"],["Cheese","100g"],["Salsa","3 tbsp"],["Sour Cream","2 tbsp"]]','["Add cheese to tortilla.","Fold in half.","Pan fry medium.","2 min each side.","Serve with salsa."]'),
(804,'BLT Sandwich','Quick & Easy','10 min','https://www.youtube.com/embed/qaHWDmFtBl0','https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80','🥪',650,'[["Bread","2 slices"],["Bacon","3 strips"],["Lettuce","2 leaves"],["Tomato","1"],["Mayo","2 tbsp"]]','["Toast bread.","Cook bacon crispy.","Spread mayo.","Layer fillings.","Slice and serve."]'),
(805,'Cheese Toast','Quick & Easy','5 min','https://www.youtube.com/embed/kY7gi9jSrl8','https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80','🧀',560,'[["Bread","2 slices"],["Cheddar","100g"],["Butter","1 tbsp"],["Mustard","1 tsp"]]','["Butter the bread.","Spread mustard.","Add thick cheese.","Grill until bubbling.","Serve hot."]'),
(806,'Fried Egg','Quick & Easy','5 min','https://www.youtube.com/embed/kY7gi9jSrl8','https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80','🍳',480,'[["Eggs","2"],["Butter","1 tsp"],["Salt","pinch"],["Pepper","pinch"]]','["Melt butter.","Crack eggs in.","Cook on low.","Season.","Serve on toast."]'),
(807,'Tuna Sandwich','Quick & Easy','5 min','https://www.youtube.com/embed/YV08vhZbhDU','https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80','🥪',440,'[["Tuna","1 can"],["Mayo","2 tbsp"],["Bread","2 slices"],["Lettuce","2 leaves"],["Cucumber","1/2"]]','["Mix tuna with mayo.","Slice cucumber.","Spread on bread.","Layer fillings.","Close and serve."]'),
(808,'Mug Cake','Quick & Easy','3 min','https://www.youtube.com/embed/JPx2M6FzdqQ','https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80','☕',880,'[["Flour","4 tbsp"],["Cocoa","2 tbsp"],["Sugar","3 tbsp"],["Egg","1"],["Milk","3 tbsp"]]','["Mix dry in mug.","Add egg and milk.","Stir smooth.","Microwave 90 seconds.","Serve immediately."]'),
(809,'Caprese Salad','Quick & Easy','5 min','https://www.youtube.com/embed/gOcfUgd4ekA','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80','🍅',520,'[["Mozzarella","200g"],["Tomatoes","3"],["Basil","handful"],["Olive Oil","2 tbsp"],["Balsamic","1 tbsp"]]','["Slice mozzarella and tomatoes.","Alternate on plate.","Add basil.","Drizzle oil and balsamic.","Season and serve."]'),
(810,'Banana Milkshake','Quick & Easy','5 min','https://www.youtube.com/embed/_dtXSFDbm0U','https://images.unsplash.com/photo-1553484771-371a816b9cc8?w=600&q=80','🍌',640,'[["Banana","2"],["Milk","1.5 cups"],["Ice Cream","2 scoops"],["Honey","1 tbsp"],["Vanilla","1/2 tsp"]]','["Slice bananas.","Blend all together.","Until smooth.","Pour into glasses.","Serve cold."]');

-- Appetizers (901-910)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(901,'Bruschetta','Appetizers','15 min','https://www.youtube.com/embed/Q3xg35pcLyo','https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80','🍞',680,'[["Baguette","1/2"],["Tomatoes","3"],["Garlic","2 cloves"],["Basil","handful"],["Olive Oil","2 tbsp"]]','["Slice and toast baguette.","Rub with garlic.","Chop tomatoes with basil.","Drizzle oil.","Top and serve."]'),
(902,'Spring Rolls','Appetizers','30 min','https://www.youtube.com/embed/HJPRPEJY2WM','https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80','🥢',750,'[["Spring Roll Wrappers","12"],["Cabbage","2 cups"],["Carrot","2"],["Noodles","100g"],["Soy Sauce","2 tbsp"]]','["Prepare filling.","Let cool.","Place on wrapper.","Roll tightly.","Deep fry golden."]'),
(903,'Chicken Wings','Appetizers','45 min','https://www.youtube.com/embed/nbIwmixBIxk','https://images.unsplash.com/photo-1567620832872-bc7adf79e498?w=600&q=80','🍗',1100,'[["Chicken Wings","1kg"],["Hot Sauce","1/2 cup"],["Butter","3 tbsp"],["Garlic Powder","1 tsp"],["Salt","to taste"]]','["Bake at 220C 40 min.","Make hot sauce.","Toss wings.","Grill 5 more min.","Serve with dip."]'),
(904,'Stuffed Mushrooms','Appetizers','25 min','https://www.youtube.com/embed/bdQvspNy6BA','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80','🍄',480,'[["Button Mushrooms","500g"],["Cream Cheese","150g"],["Garlic","2 cloves"],["Herbs","to taste"],["Breadcrumbs","1/4 cup"]]','["Remove stems.","Mix cream cheese.","Fill caps.","Top with breadcrumbs.","Bake 20 min."]'),
(905,'Deviled Eggs','Appetizers','20 min','https://www.youtube.com/embed/hqkkwIVEE00','https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80','🥚',560,'[["Eggs","6"],["Mayo","3 tbsp"],["Mustard","1 tsp"],["Paprika","for garnish"],["Salt","pinch"]]','["Hard boil eggs.","Halve and scoop yolks.","Mash with mayo.","Pipe back in.","Dust with paprika."]'),
(906,'Nachos','Appetizers','15 min','https://www.youtube.com/embed/5RoWxdsF5Wc','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80','🫘',840,'[["Tortilla Chips","200g"],["Cheese","200g"],["Jalapenos","1/2 cup"],["Salsa","1/2 cup"],["Guacamole","1/2 cup"]]','["Spread chips on tray.","Cover with cheese.","Add jalapenos.","Bake 10 min.","Top with salsa."]'),
(907,'Samosas','Appetizers','45 min','https://www.youtube.com/embed/3OZn-iCGf5s','https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80','🥟',720,'[["Pastry Sheets","12"],["Potato","3"],["Peas","1/2 cup"],["Spices","to taste"],["Oil","for frying"]]','["Boil and mash potato.","Cut pastry.","Fill and seal.","Deep fry.","Serve with chutney."]'),
(908,'Cheese Dip','Appetizers','10 min','https://www.youtube.com/embed/6pqUlXED0m4','https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=600&q=80','🧀',660,'[["Cream Cheese","200g"],["Cheddar","100g"],["Jalapenos","2 tbsp"],["Garlic","1 clove"],["Milk","1/4 cup"]]','["Soften cream cheese.","Add all to pot.","Heat and stir.","Add milk.","Serve warm with chips."]'),
(909,'Calamari','Appetizers','20 min','https://www.youtube.com/embed/tNsGfXdjiRY','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80','🦑',580,'[["Squid","500g"],["Flour","1 cup"],["Egg","2"],["Breadcrumbs","1 cup"],["Oil","for frying"]]','["Slice into rings.","Coat in flour, egg, crumbs.","Heat oil to 180C.","Fry 3 minutes.","Serve with aioli."]'),
(910,'Mini Pizzas','Appetizers','20 min','https://www.youtube.com/embed/DtxTsBwtK0s','https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80','🍕',740,'[["Pita Bread","4"],["Tomato Paste","4 tbsp"],["Mozzarella","200g"],["Olives","1/2 cup"],["Herbs","to taste"]]','["Spread paste on pitas.","Add cheese.","Add toppings.","Bake 10 min.","Slice and serve."]');

-- Shortiest (1001-1010)
INSERT INTO recipes (id,name,category,cook_time,youtube_url,image_url,emoji,views,ingredients,steps) VALUES
(1001,'Boiled Egg','Shortiest','6 min','https://www.youtube.com/embed/RB6edDwNEgg','https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80','🥚',800,'[["Eggs","2"],["Water","as needed"],["Salt","optional"]]','["Bring water to boil.","Add eggs.","Cook 6 minutes.","Cold water bath.","Peel and eat."]'),
(1002,'Buttered Toast','Shortiest','3 min','https://www.youtube.com/embed/YFoGGwCOC64','https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80','🍞',700,'[["Bread","2 slices"],["Butter","2 tbsp"]]','["Put bread in toaster.","Toast until golden.","Spread butter.","Eat while hot."]'),
(1003,'Banana Snack','Shortiest','1 min','https://www.youtube.com/embed/uBhKEz5apcU','https://images.unsplash.com/photo-1605990335689-72df7f4d7bf6?w=600&q=80','🍌',600,'[["Banana","1"],["Peanut Butter","2 tbsp"]]','["Peel banana.","Add peanut butter.","Eat immediately."]'),
(1004,'Glass of Milk','Shortiest','1 min','https://www.youtube.com/embed/5IwmuaKE7tA','https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80','🥛',500,'[["Milk","1 glass"],["Ice","optional"]]','["Pour cold milk.","Add ice if desired.","Drink immediately."]'),
(1005,'Cereal Bowl','Shortiest','2 min','https://www.youtube.com/embed/WIkXniZN9X0','https://images.unsplash.com/photo-1511690743698-d9d4be4bda99?w=600&q=80','🥣',420,'[["Cereal","1 cup"],["Milk","1 cup"],["Berries","handful"]]','["Pour cereal.","Add cold milk.","Top with berries.","Eat immediately."]'),
(1006,'Fruit Salad','Shortiest','5 min','https://www.youtube.com/embed/nTm-_KujooY','https://images.unsplash.com/photo-1605990335689-72df7f4d7bf6?w=600&q=80','🍓',540,'[["Seasonal Fruits","2 cups"],["Honey","1 tbsp"],["Lemon","1/2"]]','["Wash and chop fruits.","Place in bowl.","Squeeze lemon.","Drizzle honey.","Toss and serve."]'),
(1007,'Cucumber Snack','Shortiest','2 min','https://www.youtube.com/embed/SpI3QF_Iauc','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80','🥒',380,'[["Cucumber","1"],["Salt","pinch"],["Chili","pinch"],["Lime","1/2"]]','["Slice cucumber.","Sprinkle salt.","Add chili.","Squeeze lime.","Serve immediately."]'),
(1008,'PB Toast','Shortiest','3 min','https://www.youtube.com/embed/hOZs8keM_Y4','https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80','🥜',460,'[["Bread","2 slices"],["Peanut Butter","3 tbsp"]]','["Toast bread.","Spread peanut butter.","Slice in half.","Eat warm."]'),
(1009,'Apple Slices','Shortiest','3 min','https://www.youtube.com/embed/-e63NYVB_LM','https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=80','🍎',340,'[["Apple","1"],["Peanut Butter","2 tbsp"],["Cinnamon","pinch"]]','["Wash and core apple.","Slice into wedges.","Arrange on plate.","Serve with peanut butter."]'),
(1010,'Yoghurt Bowl','Shortiest','3 min','https://www.youtube.com/embed/KnQAP7_erto','https://images.unsplash.com/photo-1511690743698-d9d4be4bda99?w=600&q=80','🫙',420,'[["Greek Yoghurt","1 cup"],["Honey","1 tbsp"],["Berries","1/4 cup"],["Granola","2 tbsp"]]','["Scoop yoghurt.","Drizzle honey.","Add berries.","Top with granola.","Serve immediately."]');

-- ============================================================
--  SEED: Sample comments
-- ============================================================
INSERT INTO comments (recipe_id, user_id, author, body) VALUES
(101, 1, 'ICT047', 'These pancakes are perfect for a lazy Sunday morning!'),
(101, 2, 'ICT008', 'I added blueberries to the batter — highly recommend.'),
(302, 1, 'ICT047', 'Best butter chicken recipe I have tried so far.'),
(302, NULL, 'Guest', 'Amazing flavour, the cream really makes it rich.'),
(703, 2, 'ICT008', 'Burgers came out juicy and perfectly charred.'),
(201, NULL, 'Guest', 'Nothing beats rice and curry on a weekday.'),
(401, 1, 'ICT047', 'The ganache on top takes this cake to another level.');

-- ============================================================
SELECT CONCAT(
  'recipez_db ready — ',
  (SELECT COUNT(*) FROM recipes),  ' recipes, ',
  (SELECT COUNT(*) FROM users),    ' users, ',
  (SELECT COUNT(*) FROM comments), ' comments.'
) AS status;
