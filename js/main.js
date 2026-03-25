/* ============================================================
   RECIPEZ - main.js
   Lab 03: JS Basics - variables, DOM, alert, console.log
   Lab 04: Operators, if/else/nested-if/if-else-if ladder
   Lab 05: Loops (for, while, do-while), Functions
   Lab 06: Arrays, Objects, Strings
   Project: Dynamic Content, Slider with Images, Form Validation,
            Smooth Scrolling, Event Handling, Animations, View Counter
   ============================================================ */

// ── LAB 03: Variables ──
const APP_NAME   = "RECIPEZ";
let   currentSlide = 0;
var   searchOpen   = false;
var   autoPlayTimer = null;

console.log("App loaded: " + APP_NAME);

// ── LAB 06: ALL 100 Recipes Array ──
const recipes = [
  {id:101,name:"Pancakes",category:"Breakfast",time:"20 min",views:990,emoji:"🥞",ingredients:[["Flour","1.5 cups"],["Milk","1 cup"],["Eggs","2"],["Baking Powder","2 tsp"],["Butter","2 tbsp"]],steps:["Mix dry ingredients.","Whisk in milk, eggs and butter.","Heat pan on medium.","Pour ¼ cup batter per pancake.","Cook until bubbles form then flip."],youtube:"https://www.youtube.com/embed/NCMKedZvnyI",img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80"},
  {id:102,name:"Waffles",category:"Breakfast",time:"25 min",views:870,emoji:"🧇",ingredients:[["Flour","2 cups"],["Milk","1.5 cups"],["Eggs","2"],["Butter","4 tbsp"],["Sugar","2 tbsp"]],steps:["Mix all into smooth batter.","Preheat waffle iron.","Pour batter and close.","Cook until golden.","Serve with maple syrup."],youtube:"https://www.youtube.com/embed/6KiZ_u_CkzU",img:"https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=600&q=80"},
  {id:103,name:"Soft Boiled Eggs",category:"Breakfast",time:"8 min",views:750,emoji:"🥚",ingredients:[["Eggs","2"],["Water","enough to cover"],["Salt","pinch"]],steps:["Bring water to boil.","Gently lower eggs.","Cook 6 minutes.","Ice cold water bath.","Peel and serve."],youtube:"https://www.youtube.com/embed/rVZc9uT8qsI",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80"},
  {id:104,name:"Hoppers",category:"Breakfast",time:"30 min",views:680,emoji:"🫓",ingredients:[["Rice Flour","2 cups"],["Coconut Milk","1 cup"],["Yeast","1 tsp"],["Salt","1 tsp"],["Eggs","2"]],steps:["Mix flour and coconut milk.","Add yeast, ferment 2 hours.","Heat hopper pan.","Pour batter and swirl.","Add egg, cover and cook."],youtube:"https://www.youtube.com/embed/4Lpxq2nbgAQ",img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80"},
  {id:105,name:"French Toast",category:"Breakfast",time:"15 min",views:820,emoji:"🍞",ingredients:[["Bread","4 slices"],["Eggs","2"],["Milk","¼ cup"],["Cinnamon","½ tsp"],["Butter","1 tbsp"]],steps:["Whisk eggs, milk, cinnamon.","Dip bread slices.","Melt butter in pan.","Fry until golden both sides.","Serve with powdered sugar."],youtube:"https://www.youtube.com/embed/sdgroNuyKdI",img:"https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80"},
  {id:106,name:"Omelette",category:"Breakfast",time:"10 min",views:760,emoji:"🍳",ingredients:[["Eggs","3"],["Cheese","50g"],["Butter","1 tbsp"],["Salt","pinch"],["Pepper","pinch"]],steps:["Beat eggs with seasoning.","Melt butter in pan.","Pour eggs on medium heat.","Add cheese on one side.","Fold and serve."],youtube:"https://www.youtube.com/embed/5rBZ9S0b2Tc",img:"https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80"},
  {id:107,name:"Avocado Toast",category:"Breakfast",time:"10 min",views:870,emoji:"🥑",ingredients:[["Bread","2 slices"],["Avocado","1"],["Lemon","½"],["Salt","pinch"],["Chili Flakes","pinch"]],steps:["Toast bread until golden.","Mash avocado with lemon.","Spread onto toast.","Sprinkle chili flakes.","Serve fresh."],youtube:"https://www.youtube.com/embed/dP6btliLGy4",img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"},
  {id:108,name:"Smoothie Bowl",category:"Breakfast",time:"10 min",views:640,emoji:"🫐",ingredients:[["Frozen Berries","1 cup"],["Banana","1"],["Yoghurt","½ cup"],["Granola","¼ cup"],["Honey","1 tbsp"]],steps:["Blend berries and banana.","Pour into bowl.","Top with granola.","Add fresh fruit.","Drizzle honey."],youtube:"https://www.youtube.com/embed/fXLYqqxB2wc",img:"https://images.unsplash.com/photo-1511690743698-d9d4be4bda99?w=600&q=80"},
  {id:109,name:"Idli",category:"Breakfast",time:"30 min",views:520,emoji:"🫓",ingredients:[["Rice Flour","2 cups"],["Urad Dal","½ cup"],["Salt","1 tsp"],["Water","as needed"]],steps:["Soak and grind ingredients.","Ferment batter 8 hours.","Fill idli moulds.","Steam 10 minutes.","Serve with sambar."],youtube:"https://www.youtube.com/embed/Ayo80PIb-Qg",img:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&q=80"},
  {id:110,name:"String Hoppers",category:"Breakfast",time:"25 min",views:480,emoji:"🍝",ingredients:[["Rice Flour","2 cups"],["Hot Water","1 cup"],["Salt","1 tsp"]],steps:["Mix flour and salt.","Add hot water, knead.","Press through mould onto mats.","Steam 5 minutes.","Serve with sambol."],youtube:"https://www.youtube.com/embed/9Lizj4h5XC8",img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80"},
  {id:201,name:"Rice and Curry",category:"Lunch",time:"45 min",views:1150,emoji:"🍛",ingredients:[["Rice","2 cups"],["Chicken","300g"],["Coconut Milk","1 cup"],["Curry Leaves","handful"],["Spices","to taste"]],steps:["Cook rice until fluffy.","Prepare chicken curry.","Cook dhal.","Serve with sambol.","Garnish with fried onions."],youtube:"https://www.youtube.com/embed/7xvjmIyfXN0",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80"},
  {id:202,name:"Caesar Salad",category:"Lunch",time:"15 min",views:640,emoji:"🥗",ingredients:[["Romaine Lettuce","1 head"],["Caesar Dressing","3 tbsp"],["Parmesan","50g"],["Croutons","1 cup"],["Lemon","½"]],steps:["Wash and dry lettuce.","Toss with dressing.","Add croutons and parmesan.","Squeeze lemon.","Serve chilled."],youtube:"https://www.youtube.com/embed/iA7vjDuL1FY",img:"https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80"},
  {id:203,name:"Club Sandwich",category:"Lunch",time:"15 min",views:580,emoji:"🥪",ingredients:[["Bread","3 slices"],["Chicken","100g"],["Bacon","2 strips"],["Lettuce","2 leaves"],["Mayo","2 tbsp"]],steps:["Toast all bread.","Layer chicken and bacon.","Add lettuce and tomato.","Stack and repeat.","Cut diagonally."],youtube:"https://www.youtube.com/embed/S_1_ZSMxRfg",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80"},
  {id:204,name:"Fried Rice",category:"Lunch",time:"20 min",views:1050,emoji:"🍚",ingredients:[["Cooked Rice","2 cups"],["Eggs","2"],["Soy Sauce","3 tbsp"],["Mixed Veg","1 cup"],["Garlic","3 cloves"]],steps:["Fry garlic in wok.","Add veg and stir-fry.","Scramble eggs.","Add rice and soy sauce.","Toss on high heat."],youtube:"https://www.youtube.com/embed/iv1frVobFeQ",img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80"},
  {id:205,name:"Noodles",category:"Lunch",time:"20 min",views:890,emoji:"🍜",ingredients:[["Noodles","200g"],["Vegetables","1 cup"],["Soy Sauce","2 tbsp"],["Sesame Oil","1 tsp"],["Garlic","2 cloves"]],steps:["Cook noodles al dente.","Stir-fry garlic and veg.","Add noodles.","Season with soy.","Toss and serve."],youtube:"https://www.youtube.com/embed/Rbpby8YObA4",img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"},
  {id:206,name:"Kottu Roti",category:"Lunch",time:"25 min",views:980,emoji:"🫓",ingredients:[["Roti","4 pieces"],["Eggs","2"],["Vegetables","1 cup"],["Chicken","150g"],["Spices","to taste"]],steps:["Chop roti into strips.","Fry chicken and veg.","Add eggs and scramble.","Add roti strips.","Season on high heat."],youtube:"https://www.youtube.com/embed/K3WF9dh0UJ8",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80"},
  {id:207,name:"Grilled Chicken",category:"Lunch",time:"30 min",views:760,emoji:"🍗",ingredients:[["Chicken Breast","2"],["Lemon","1"],["Garlic","3 cloves"],["Olive Oil","2 tbsp"],["Herbs","to taste"]],steps:["Marinate with lemon.","Rest 30 minutes.","Grill medium-high.","6 minutes each side.","Rest before slicing."],youtube:"https://www.youtube.com/embed/oWXlmAeqoUE",img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80"},
  {id:208,name:"Pasta Salad",category:"Lunch",time:"20 min",views:520,emoji:"🍝",ingredients:[["Pasta","200g"],["Olives","½ cup"],["Feta","100g"],["Cherry Tomatoes","1 cup"],["Olive Oil","3 tbsp"]],steps:["Cook and cool pasta.","Add olives and feta.","Dress with oil and herbs.","Toss together.","Chill before serving."],youtube:"https://www.youtube.com/embed/Fb_IljnhwTo",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"},
  {id:209,name:"Chicken Wrap",category:"Lunch",time:"15 min",views:680,emoji:"🌯",ingredients:[["Tortilla","2"],["Chicken","150g"],["Avocado","1"],["Lettuce","handful"],["Sour Cream","2 tbsp"]],steps:["Grill chicken.","Warm tortilla.","Spread sour cream.","Layer fillings.","Roll and serve."],youtube:"https://www.youtube.com/embed/UJi0fS1SxHg",img:"https://images.unsplash.com/photo-1623428187425-b6dbaad6e7e6?w=600&q=80"},
  {id:210,name:"Tomato Soup",category:"Lunch",time:"30 min",views:430,emoji:"🍲",ingredients:[["Tomatoes","6"],["Onion","1"],["Garlic","3 cloves"],["Cream","¼ cup"],["Basil","handful"]],steps:["Roast tomatoes.","Sauté onion.","Blend everything.","Add cream.","Simmer and serve."],youtube:"https://www.youtube.com/embed/n1DRR31z6_U",img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80"},
  {id:301,name:"Pizza",category:"Dinner",time:"30 min",views:1240,emoji:"🍕",ingredients:[["Pizza Dough","1"],["Tomato Sauce","½ cup"],["Mozzarella","200g"],["Basil","handful"],["Olive Oil","2 tbsp"]],steps:["Preheat to 220°C.","Roll dough.","Spread sauce.","Add toppings.","Bake 15 minutes."],youtube:"https://www.youtube.com/embed/-AuK92Jq4yQ",img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"},
  {id:302,name:"Butter Chicken",category:"Dinner",time:"45 min",views:1320,emoji:"🍛",ingredients:[["Chicken","500g"],["Butter","3 tbsp"],["Tomato Puree","1 cup"],["Cream","½ cup"],["Spices","to taste"]],steps:["Marinate chicken.","Cook in butter.","Add tomato puree.","Stir in cream.","Garnish with coriander."],youtube:"https://www.youtube.com/embed/a03U45jFxOI",img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80"},
  {id:303,name:"Lasagna",category:"Dinner",time:"90 min",views:830,emoji:"🫕",ingredients:[["Lasagna Sheets","12"],["Beef Mince","400g"],["Bechamel","2 cups"],["Tomato Sauce","2 cups"],["Mozzarella","200g"]],steps:["Brown mince.","Make bechamel.","Layer sheets and sauces.","Top with mozzarella.","Bake 45 min at 180°C."],youtube:"https://www.youtube.com/embed/fVDsTP-pTXs",img:"https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80"},
  {id:304,name:"Steak",category:"Dinner",time:"20 min",views:1100,emoji:"🥩",ingredients:[["Ribeye Steak","2"],["Butter","2 tbsp"],["Garlic","3 cloves"],["Rosemary","2 sprigs"],["Salt and Pepper","to taste"]],steps:["Season steak well.","Heat pan until smoking.","Sear 3 minutes each side.","Baste with butter.","Rest 5 minutes."],youtube:"https://www.youtube.com/embed/cF46oV53ZvE",img:"https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80"},
  {id:305,name:"Fish Curry",category:"Dinner",time:"35 min",views:720,emoji:"🐟",ingredients:[["Fish","500g"],["Coconut Milk","1 cup"],["Tomato","2"],["Onion","1"],["Curry Leaves","handful"]],steps:["Fry spices.","Add onion and tomato.","Add fish.","Pour coconut milk.","Simmer and garnish."],youtube:"https://www.youtube.com/embed/aROKVWwp43U",img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80"},
  {id:306,name:"Spaghetti",category:"Dinner",time:"35 min",views:960,emoji:"🍝",ingredients:[["Spaghetti","300g"],["Beef Mince","400g"],["Tomato Sauce","2 cups"],["Garlic","3 cloves"],["Parmesan","50g"]],steps:["Cook spaghetti.","Brown mince.","Add sauce.","Toss with pasta.","Top with parmesan."],youtube:"https://www.youtube.com/embed/YXYjwALuA7c",img:"https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80"},
  {id:307,name:"Biryani",category:"Dinner",time:"60 min",views:1200,emoji:"🍚",ingredients:[["Basmati Rice","2 cups"],["Chicken","500g"],["Yoghurt","1 cup"],["Saffron","pinch"],["Spices","to taste"]],steps:["Marinate chicken.","Par-cook rice.","Layer in pot.","Dum cook 20 min.","Serve with raita."],youtube:"https://www.youtube.com/embed/95BCU1n268w",img:"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"},
  {id:308,name:"Ramen",category:"Dinner",time:"40 min",views:1180,emoji:"🍜",ingredients:[["Ramen Noodles","2 packs"],["Chicken Broth","4 cups"],["Soy Sauce","2 tbsp"],["Boiled Egg","2"],["Spring Onions","2"]],steps:["Boil broth with soy.","Cook noodles.","Combine both.","Add toppings.","Serve hot."],youtube:"https://www.youtube.com/embed/TGHbePXG7Oo",img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"},
  {id:309,name:"Tacos",category:"Dinner",time:"20 min",views:760,emoji:"🌮",ingredients:[["Tortillas","6"],["Beef Mince","250g"],["Taco Spice","1 tbsp"],["Lettuce","1 cup"],["Salsa","½ cup"]],steps:["Cook mince with spice.","Warm tortillas.","Fill with mince.","Add toppings.","Serve with lime."],youtube:"https://www.youtube.com/embed/IUCN2eFEJfU",img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"},
  {id:310,name:"Kebab",category:"Dinner",time:"30 min",views:690,emoji:"🍢",ingredients:[["Lamb Mince","400g"],["Onion","1"],["Garlic","3 cloves"],["Spices","to taste"],["Parsley","handful"]],steps:["Mix mince with spices.","Shape onto skewers.","Grill on high heat.","Turn every 3 min.","Serve with flatbread."],youtube:"https://www.youtube.com/embed/6No7g2GptXY",img:"https://images.unsplash.com/photo-1529565214-56e9c7e4f7f4?w=600&q=80"},
  {id:401,name:"Chocolate Cake",category:"Desserts",time:"60 min",views:1050,emoji:"🎂",ingredients:[["Flour","2 cups"],["Cocoa","½ cup"],["Sugar","1.5 cups"],["Eggs","3"],["Butter","½ cup"]],steps:["Mix dry ingredients.","Beat eggs and butter.","Combine all.","Bake 35 min at 180°C.","Frost with ganache."],youtube:"https://www.youtube.com/embed/vI5w-fK25w4",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80"},
  {id:402,name:"Ice Cream",category:"Desserts",time:"20 min",views:950,emoji:"🍨",ingredients:[["Heavy Cream","2 cups"],["Milk","1 cup"],["Sugar","¾ cup"],["Vanilla","1 tsp"],["Egg Yolks","4"]],steps:["Make custard.","Cool completely.","Churn in maker.","Freeze 4 hours.","Scoop and serve."],youtube:"https://www.youtube.com/embed/_c8WbWgkkS8",img:"https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80"},
  {id:403,name:"Cheesecake",category:"Desserts",time:"90 min",views:850,emoji:"🍰",ingredients:[["Cream Cheese","500g"],["Sugar","¾ cup"],["Eggs","3"],["Sour Cream","½ cup"],["Graham Crackers","200g"]],steps:["Make biscuit crust.","Beat cream cheese.","Add eggs.","Pour over crust.","Bake 1 hr at 160°C."],youtube:"https://www.youtube.com/embed/Mfig-pIyh-g",img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"},
  {id:404,name:"Brownies",category:"Desserts",time:"40 min",views:920,emoji:"🍫",ingredients:[["Dark Chocolate","200g"],["Butter","100g"],["Sugar","200g"],["Eggs","3"],["Flour","100g"]],steps:["Melt chocolate and butter.","Beat sugar and eggs.","Fold in flour.","Pour into tin.","Bake 25 min."],youtube:"https://www.youtube.com/embed/72WSqlUXWJU",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80"},
  {id:405,name:"Creme Brulee",category:"Desserts",time:"60 min",views:650,emoji:"🍮",ingredients:[["Heavy Cream","2 cups"],["Egg Yolks","5"],["Sugar","½ cup"],["Vanilla","1 tsp"],["Extra Sugar","for top"]],steps:["Heat cream.","Whisk yolks and sugar.","Combine and strain.","Bake in water bath.","Caramelise sugar."],youtube:"https://www.youtube.com/embed/6tSdlo0r0Io",img:"https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80"},
  {id:406,name:"Tiramisu",category:"Desserts",time:"30 min",views:780,emoji:"🍰",ingredients:[["Mascarpone","500g"],["Eggs","4"],["Sugar","½ cup"],["Espresso","1 cup"],["Ladyfingers","24"]],steps:["Beat yolks and sugar.","Fold in mascarpone.","Dip ladyfingers in coffee.","Layer in dish.","Chill overnight."],youtube:"https://www.youtube.com/embed/zmSWPBbej84",img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80"},
  {id:407,name:"Apple Pie",category:"Desserts",time:"90 min",views:720,emoji:"🥧",ingredients:[["Pastry Dough","2 sheets"],["Apples","6 large"],["Sugar","¾ cup"],["Cinnamon","2 tsp"],["Butter","2 tbsp"]],steps:["Make pastry.","Slice apples.","Mix with sugar.","Fill pastry case.","Bake 45 minutes."],youtube:"https://www.youtube.com/embed/KbyahTnzbKA",img:"https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=80"},
  {id:408,name:"Mango Pudding",category:"Desserts",time:"20 min",views:540,emoji:"🥭",ingredients:[["Mango","2 large"],["Sugar","¼ cup"],["Gelatin","2 tsp"],["Cream","½ cup"],["Milk","½ cup"]],steps:["Blend mango.","Heat with sugar.","Dissolve gelatin.","Pour into moulds.","Chill 4 hours."],youtube:"https://www.youtube.com/embed/OHlFBpplYNA",img:"https://images.unsplash.com/photo-1605990335689-72df7f4d7bf6?w=600&q=80"},
  {id:409,name:"Faluda",category:"Desserts",time:"15 min",views:610,emoji:"🥤",ingredients:[["Milk","2 cups"],["Rose Syrup","3 tbsp"],["Basil Seeds","2 tbsp"],["Vermicelli","½ cup"],["Ice Cream","2 scoops"]],steps:["Soak basil seeds.","Cook vermicelli.","Layer with syrup.","Add milk.","Top with ice cream."],youtube:"https://www.youtube.com/embed/c1yqmGtsOv0",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80"},
  {id:410,name:"Donuts",category:"Desserts",time:"60 min",views:870,emoji:"🍩",ingredients:[["Flour","3 cups"],["Yeast","2 tsp"],["Milk","1 cup"],["Sugar","¼ cup"],["Glaze","as needed"]],steps:["Make yeast dough.","Let rise 1 hour.","Cut into rings.","Deep fry until golden.","Dip in glaze."],youtube:"https://www.youtube.com/embed/Ws0XeEBhVrQ",img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80"},
  {id:501,name:"Lemonade",category:"Drinks",time:"10 min",views:760,emoji:"🍋",ingredients:[["Lemons","4"],["Sugar","½ cup"],["Water","4 cups"],["Ice","as needed"],["Mint","few leaves"]],steps:["Make simple syrup.","Squeeze lemons.","Combine and stir.","Add ice.","Serve with mint."],youtube:"https://www.youtube.com/embed/COx5Bf0PsQs",img:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80"},
  {id:502,name:"Mango Lassi",category:"Drinks",time:"5 min",views:760,emoji:"🥭",ingredients:[["Mango","1 large"],["Yoghurt","1 cup"],["Milk","½ cup"],["Sugar","2 tbsp"],["Cardamom","pinch"]],steps:["Chop mango.","Blend all ingredients.","Adjust sweetness.","Pour over ice.","Garnish with cardamom."],youtube:"https://www.youtube.com/embed/xqir4h6rYJw",img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80"},
  {id:503,name:"Mojito",category:"Drinks",time:"5 min",views:690,emoji:"🍹",ingredients:[["Lime","2"],["Mint","10 leaves"],["Sugar","2 tbsp"],["Soda Water","200ml"],["Ice","as needed"]],steps:["Muddle lime and mint.","Add sugar.","Fill with ice.","Pour soda water.","Stir and garnish."],youtube:"https://www.youtube.com/embed/BC6uOm9PtxY",img:"https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80"},
  {id:504,name:"Iced Coffee",category:"Drinks",time:"5 min",views:820,emoji:"☕",ingredients:[["Espresso","2 shots"],["Milk","1 cup"],["Ice","as needed"],["Sugar","to taste"],["Cream","optional"]],steps:["Brew espresso.","Let cool.","Fill glass with ice.","Pour over ice.","Add milk."],youtube:"https://www.youtube.com/embed/QeS30EnYuks",img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80"},
  {id:505,name:"Strawberry Smoothie",category:"Drinks",time:"5 min",views:650,emoji:"🍓",ingredients:[["Strawberries","1 cup"],["Banana","1"],["Yoghurt","½ cup"],["Milk","½ cup"],["Honey","1 tbsp"]],steps:["Add all to blender.","Blend until smooth.","Adjust sweetness.","Pour into glass.","Serve immediately."],youtube:"https://www.youtube.com/embed/vwO7nPaAWvs",img:"https://images.unsplash.com/photo-1553484771-371a816b9cc8?w=600&q=80"},
  {id:506,name:"Pina Colada",category:"Drinks",time:"5 min",views:580,emoji:"🍍",ingredients:[["Pineapple","1 cup"],["Coconut Cream","½ cup"],["Ice","1 cup"],["Lime","1"]],steps:["Add to blender.","Add ice.","Blend smooth.","Pour into glass.","Garnish with pineapple."],youtube:"https://www.youtube.com/embed/hCrsC2FHPf0",img:"https://images.unsplash.com/photo-1551024559-d6b0bbb10ef3?w=600&q=80"},
  {id:507,name:"Chai Tea",category:"Drinks",time:"15 min",views:520,emoji:"🍵",ingredients:[["Tea","2 tsp"],["Milk","1 cup"],["Ginger","1 inch"],["Cardamom","3 pods"],["Sugar","to taste"]],steps:["Boil water with spices.","Add tea and simmer.","Pour in milk.","Add sugar.","Strain and serve."],youtube:"https://www.youtube.com/embed/JuK-RtjLOfc",img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80"},
  {id:508,name:"Orange Juice",category:"Drinks",time:"5 min",views:480,emoji:"🍊",ingredients:[["Oranges","6"],["Ice","as needed"]],steps:["Halve all oranges.","Press through juicer.","Strain if desired.","Pour over ice.","Serve fresh."],youtube:"https://www.youtube.com/embed/w6IjwKOB_t8",img:"https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80"},
  {id:509,name:"Watermelon Juice",category:"Drinks",time:"5 min",views:420,emoji:"🍉",ingredients:[["Watermelon","½ small"],["Lime","1"],["Mint","handful"],["Salt","pinch"]],steps:["Remove rind and seeds.","Blend watermelon.","Add lime and mint.","Pour over ice.","Serve immediately."],youtube:"https://www.youtube.com/embed/tn-fqm5nMUA",img:"https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=600&q=80"},
  {id:510,name:"Hot Chocolate",category:"Drinks",time:"10 min",views:680,emoji:"🍫",ingredients:[["Milk","2 cups"],["Dark Chocolate","100g"],["Sugar","2 tbsp"],["Vanilla","½ tsp"],["Whipped Cream","for top"]],steps:["Heat milk gently.","Melt chocolate in.","Add sugar and vanilla.","Whisk frothy.","Top with cream."],youtube:"https://www.youtube.com/embed/6nXv-Np-Bc4",img:"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80"},
  {id:601,name:"Garlic Bread",category:"Side Dish",time:"15 min",views:880,emoji:"🥖",ingredients:[["Baguette","1"],["Butter","100g"],["Garlic","4 cloves"],["Parsley","handful"]],steps:["Mix butter and garlic.","Slice baguette.","Spread butter mix.","Wrap in foil.","Bake 15 min at 200°C."],youtube:"https://www.youtube.com/embed/FkV_fU5GoXM",img:"https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80"},
  {id:602,name:"Coleslaw",category:"Side Dish",time:"15 min",views:560,emoji:"🥗",ingredients:[["Cabbage","½ head"],["Carrot","2"],["Mayo","3 tbsp"],["Vinegar","1 tbsp"],["Sugar","1 tbsp"]],steps:["Shred cabbage.","Grate carrot.","Mix dressing.","Toss together.","Refrigerate before serving."],youtube:"https://www.youtube.com/embed/soH0AcJkUNw",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"},
  {id:603,name:"Mashed Potatoes",category:"Side Dish",time:"25 min",views:720,emoji:"🥔",ingredients:[["Potatoes","1kg"],["Butter","80g"],["Cream","½ cup"],["Salt","to taste"],["Pepper","to taste"]],steps:["Boil potatoes.","Drain and mash.","Add butter and cream.","Season well.","Mix until fluffy."],youtube:"https://www.youtube.com/embed/gsI8wGi7ONo",img:"https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=80"},
  {id:604,name:"Onion Rings",category:"Side Dish",time:"20 min",views:640,emoji:"🧅",ingredients:[["Onion","2 large"],["Flour","1 cup"],["Beer","½ cup"],["Egg","1"],["Oil","for frying"]],steps:["Slice into rings.","Make batter.","Dip rings.","Deep fry until golden.","Season and serve."],youtube:"https://www.youtube.com/embed/9DleMdJKFvw",img:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80"},
  {id:605,name:"Greek Salad",category:"Side Dish",time:"10 min",views:490,emoji:"🥗",ingredients:[["Tomatoes","3"],["Cucumber","1"],["Olives","½ cup"],["Feta","150g"],["Olive Oil","3 tbsp"]],steps:["Chop vegetables.","Add olives and feta.","Drizzle oil.","Season with oregano.","Serve fresh."],youtube:"https://www.youtube.com/embed/j7rU-1-s7NM",img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80"},
  {id:606,name:"Corn on the Cob",category:"Side Dish",time:"15 min",views:380,emoji:"🌽",ingredients:[["Corn","4 cobs"],["Butter","4 tbsp"],["Salt","to taste"],["Chili","½ tsp"],["Lime","1"]],steps:["Grill corn on flame.","Turn every 2 min.","Brush with butter.","Squeeze lime.","Serve immediately."],youtube:"https://www.youtube.com/embed/kwxdbNBOros",img:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80"},
  {id:607,name:"Hummus",category:"Side Dish",time:"10 min",views:560,emoji:"🫘",ingredients:[["Chickpeas","400g"],["Tahini","3 tbsp"],["Lemon","1"],["Garlic","2 cloves"],["Olive Oil","3 tbsp"]],steps:["Blend chickpeas.","Add tahini and lemon.","Add garlic.","Season with salt.","Drizzle oil to serve."],youtube:"https://www.youtube.com/embed/gbTN9CXDZrI",img:"https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=600&q=80"},
  {id:608,name:"Rice Pilaf",category:"Side Dish",time:"25 min",views:420,emoji:"🍚",ingredients:[["Rice","1.5 cups"],["Broth","3 cups"],["Onion","1"],["Butter","2 tbsp"],["Herbs","to taste"]],steps:["Sauté onion.","Toast rice 2 min.","Pour broth.","Cover, cook 18 min.","Fluff with fork."],youtube:"https://www.youtube.com/embed/ILADSVOx_QI",img:"https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80"},
  {id:609,name:"Roasted Veg",category:"Side Dish",time:"35 min",views:490,emoji:"🥦",ingredients:[["Mixed Veg","500g"],["Olive Oil","3 tbsp"],["Garlic","3 cloves"],["Herbs","to taste"],["Salt","to taste"]],steps:["Chop vegetables.","Toss with oil.","Spread on tray.","Roast 25 min at 200°C.","Season and serve."],youtube:"https://www.youtube.com/embed/opMsfLXZn74",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"},
  {id:610,name:"Stir-fry Greens",category:"Side Dish",time:"10 min",views:320,emoji:"🥬",ingredients:[["Bok Choy","4 heads"],["Garlic","3 cloves"],["Oyster Sauce","2 tbsp"],["Sesame Oil","1 tsp"]],steps:["Heat wok.","Fry garlic.","Add bok choy.","Toss 2 minutes.","Add sauces and serve."],youtube:"https://www.youtube.com/embed/Qb5Amsjdw5Q",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"},
  {id:701,name:"BBQ Ribs",category:"BBQ",time:"3 hrs",views:920,emoji:"🍖",ingredients:[["Pork Ribs","1 rack"],["BBQ Sauce","1 cup"],["Garlic Powder","1 tsp"],["Paprika","1 tsp"],["Brown Sugar","2 tbsp"]],steps:["Rub ribs with spices.","Marinate overnight.","Slow cook 2.5 hrs.","Brush with sauce.","Grill 5 min each side."],youtube:"https://www.youtube.com/embed/-vlXUeivyRo",img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"},
  {id:702,name:"BBQ Chicken",category:"BBQ",time:"40 min",views:850,emoji:"🍗",ingredients:[["Chicken","1kg"],["BBQ Sauce","1 cup"],["Garlic","3 cloves"],["Paprika","1 tsp"],["Olive Oil","2 tbsp"]],steps:["Marinate overnight.","Heat BBQ.","Grill medium heat.","Baste with sauce.","Cook until done."],youtube:"https://www.youtube.com/embed/17xoow4PelY",img:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80"},
  {id:703,name:"Burgers",category:"BBQ",time:"25 min",views:980,emoji:"🍔",ingredients:[["Beef Mince","300g"],["Burger Buns","2"],["Lettuce","2 leaves"],["Tomato","1"],["Cheddar","2 slices"]],steps:["Shape patties.","Grill 4 min each side.","Toast buns.","Add cheese last.","Assemble and serve."],youtube:"https://www.youtube.com/embed/BIG1h2vG-Qg",img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"},
  {id:704,name:"Lamb Chops",category:"BBQ",time:"30 min",views:720,emoji:"🍖",ingredients:[["Lamb Chops","4"],["Garlic","3 cloves"],["Rosemary","2 sprigs"],["Olive Oil","2 tbsp"],["Lemon","1"]],steps:["Marinate with garlic.","Heat BBQ high.","Grill 3 min each side.","Rest 5 minutes.","Serve with lemon."],youtube:"https://www.youtube.com/embed/SHket6wQ0bU",img:"https://images.unsplash.com/photo-1529565214-56e9c7e4f7f4?w=600&q=80"},
  {id:705,name:"BBQ Prawns",category:"BBQ",time:"15 min",views:680,emoji:"🦐",ingredients:[["Prawns","500g"],["Garlic","4 cloves"],["Butter","3 tbsp"],["Lemon","1"],["Parsley","handful"]],steps:["Skewer prawns.","Mix garlic butter.","Brush prawns.","Grill 3 min each side.","Squeeze lemon."],youtube:"https://www.youtube.com/embed/vLlShHvZzN8",img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80"},
  {id:706,name:"Smoked Brisket",category:"BBQ",time:"12 hrs",views:560,emoji:"🥩",ingredients:[["Beef Brisket","2kg"],["Salt","3 tbsp"],["Black Pepper","2 tbsp"],["Garlic Powder","1 tbsp"],["Wood Chips","as needed"]],steps:["Rub with seasoning.","Smoke at 110°C.","Cook 12 hours.","Wrap and continue.","Rest 2 hours before slicing."],youtube:"https://www.youtube.com/embed/PVycYj_PKgk",img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"},
  {id:707,name:"Grilled Veg",category:"BBQ",time:"20 min",views:420,emoji:"🥦",ingredients:[["Zucchini","2"],["Capsicum","2"],["Mushrooms","200g"],["Olive Oil","3 tbsp"],["Herbs","to taste"]],steps:["Slice thickly.","Brush with oil.","Grill high heat.","5 min each side.","Season and serve."],youtube:"https://www.youtube.com/embed/7EBBDMSgz_s",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"},
  {id:708,name:"BBQ Salmon",category:"BBQ",time:"20 min",views:580,emoji:"🐟",ingredients:[["Salmon Fillets","4"],["Lemon","1"],["Dill","handful"],["Olive Oil","2 tbsp"],["Salt and Pepper","to taste"]],steps:["Season salmon.","Brush with oil.","Grill skin down.","4 min each side.","Serve with lemon."],youtube:"https://www.youtube.com/embed/vKkQYakXJJY",img:"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"},
  {id:709,name:"BBQ Sausages",category:"BBQ",time:"15 min",views:760,emoji:"🌭",ingredients:[["Sausages","8"],["Mustard","3 tbsp"],["Bread Rolls","8"],["Onion","2"]],steps:["Grill on medium heat.","Turn every 3 min.","Caramelise onions.","Toast rolls.","Serve with mustard."],youtube:"https://www.youtube.com/embed/3Ycn6Rv93J8",img:"https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&q=80"},
  {id:710,name:"Grilled Corn",category:"BBQ",time:"15 min",views:450,emoji:"🌽",ingredients:[["Corn","4 cobs"],["Butter","4 tbsp"],["Chili","½ tsp"],["Lime","1"],["Salt","to taste"]],steps:["Grill on BBQ.","Rotate every 2 min.","Cook 10 minutes.","Brush with butter.","Squeeze lime."],youtube:"https://www.youtube.com/embed/3YAMFn64VS4",img:"https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80"},
  {id:801,name:"Scrambled Eggs",category:"Quick & Easy",time:"8 min",views:920,emoji:"🍳",ingredients:[["Eggs","3"],["Butter","1 tbsp"],["Cream","1 tbsp"],["Salt","pinch"],["Pepper","pinch"]],steps:["Beat eggs with cream.","Melt butter on low.","Add eggs and stir.","Remove before set.","Season and serve."],youtube:"https://www.youtube.com/embed/yyi55ZrpJ0E",img:"https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&q=80"},
  {id:802,name:"Instant Noodles",category:"Quick & Easy",time:"5 min",views:1100,emoji:"🍜",ingredients:[["Instant Noodles","1 pack"],["Egg","1"],["Soy Sauce","1 tbsp"],["Spring Onion","1"],["Chili","optional"]],steps:["Boil water.","Cook noodles 3 min.","Add egg and stir.","Season with soy.","Top with spring onion."],youtube:"https://www.youtube.com/embed/hQV50DsLTv4",img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"},
  {id:803,name:"Quesadilla",category:"Quick & Easy",time:"10 min",views:780,emoji:"🫓",ingredients:[["Tortilla","2"],["Cheese","100g"],["Salsa","3 tbsp"],["Sour Cream","2 tbsp"]],steps:["Add cheese to tortilla.","Fold in half.","Pan fry medium.","2 min each side.","Serve with salsa."],youtube:"https://www.youtube.com/embed/wTYD1dt7omk",img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"},
  {id:804,name:"BLT Sandwich",category:"Quick & Easy",time:"10 min",views:650,emoji:"🥪",ingredients:[["Bread","2 slices"],["Bacon","3 strips"],["Lettuce","2 leaves"],["Tomato","1"],["Mayo","2 tbsp"]],steps:["Toast bread.","Cook bacon crispy.","Spread mayo.","Layer fillings.","Slice and serve."],youtube:"https://www.youtube.com/embed/qaHWDmFtBl0",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80"},
  {id:805,name:"Cheese Toast",category:"Quick & Easy",time:"5 min",views:560,emoji:"🧀",ingredients:[["Bread","2 slices"],["Cheddar","100g"],["Butter","1 tbsp"],["Mustard","1 tsp"]],steps:["Butter the bread.","Spread mustard.","Add thick cheese.","Grill until bubbling.","Serve hot."],youtube:"https://www.youtube.com/embed/kY7gi9jSrl8",img:"https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80"},
  {id:806,name:"Fried Egg",category:"Quick & Easy",time:"5 min",views:480,emoji:"🍳",ingredients:[["Eggs","2"],["Butter","1 tsp"],["Salt","pinch"],["Pepper","pinch"]],steps:["Melt butter.","Crack eggs in.","Cook on low.","Season.","Serve on toast."],youtube:"https://www.youtube.com/embed/kY7gi9jSrl8",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80"},
  {id:807,name:"Tuna Sandwich",category:"Quick & Easy",time:"5 min",views:440,emoji:"🥪",ingredients:[["Tuna","1 can"],["Mayo","2 tbsp"],["Bread","2 slices"],["Lettuce","2 leaves"],["Cucumber","½"]],steps:["Mix tuna with mayo.","Slice cucumber.","Spread on bread.","Layer fillings.","Close and serve."],youtube:"https://www.youtube.com/embed/YV08vhZbhDU",img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80"},
  {id:808,name:"Mug Cake",category:"Quick & Easy",time:"3 min",views:880,emoji:"☕",ingredients:[["Flour","4 tbsp"],["Cocoa","2 tbsp"],["Sugar","3 tbsp"],["Egg","1"],["Milk","3 tbsp"]],steps:["Mix dry in mug.","Add egg and milk.","Stir smooth.","Microwave 90 seconds.","Serve immediately."],youtube:"https://www.youtube.com/embed/JPx2M6FzdqQ",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80"},
  {id:809,name:"Caprese Salad",category:"Quick & Easy",time:"5 min",views:520,emoji:"🍅",ingredients:[["Mozzarella","200g"],["Tomatoes","3"],["Basil","handful"],["Olive Oil","2 tbsp"],["Balsamic","1 tbsp"]],steps:["Slice mozzarella and tomatoes.","Alternate on plate.","Add basil.","Drizzle oil and balsamic.","Season and serve."],youtube:"https://www.youtube.com/embed/gOcfUgd4ekA",img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80"},
  {id:810,name:"Banana Milkshake",category:"Quick & Easy",time:"5 min",views:640,emoji:"🍌",ingredients:[["Banana","2"],["Milk","1.5 cups"],["Ice Cream","2 scoops"],["Honey","1 tbsp"],["Vanilla","½ tsp"]],steps:["Slice bananas.","Blend all together.","Until smooth.","Pour into glasses.","Serve cold."],youtube:"https://www.youtube.com/embed/_dtXSFDbm0U",img:"https://images.unsplash.com/photo-1553484771-371a816b9cc8?w=600&q=80"},
  {id:901,name:"Bruschetta",category:"Appetizers",time:"15 min",views:680,emoji:"🍞",ingredients:[["Baguette","½"],["Tomatoes","3"],["Garlic","2 cloves"],["Basil","handful"],["Olive Oil","2 tbsp"]],steps:["Slice and toast baguette.","Rub with garlic.","Chop tomatoes with basil.","Drizzle oil.","Top and serve."],youtube:"https://www.youtube.com/embed/Q3xg35pcLyo",img:"https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80"},
  {id:902,name:"Spring Rolls",category:"Appetizers",time:"30 min",views:750,emoji:"🥢",ingredients:[["Spring Roll Wrappers","12"],["Cabbage","2 cups"],["Carrot","2"],["Noodles","100g"],["Soy Sauce","2 tbsp"]],steps:["Prepare filling.","Let cool.","Place on wrapper.","Roll tightly.","Deep fry golden."],youtube:"https://www.youtube.com/embed/HJPRPEJY2WM",img:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80"},
  {id:903,name:"Chicken Wings",category:"Appetizers",time:"45 min",views:1100,emoji:"🍗",ingredients:[["Chicken Wings","1kg"],["Hot Sauce","½ cup"],["Butter","3 tbsp"],["Garlic Powder","1 tsp"],["Salt","to taste"]],steps:["Bake at 220°C 40 min.","Make hot sauce.","Toss wings.","Grill 5 more min.","Serve with dip."],youtube:"https://www.youtube.com/embed/nbIwmixBIxk",img:"https://images.unsplash.com/photo-1567620832872-bc7adf79e498?w=600&q=80"},
  {id:904,name:"Stuffed Mushrooms",category:"Appetizers",time:"25 min",views:480,emoji:"🍄",ingredients:[["Button Mushrooms","500g"],["Cream Cheese","150g"],["Garlic","2 cloves"],["Herbs","to taste"],["Breadcrumbs","¼ cup"]],steps:["Remove stems.","Mix cream cheese.","Fill caps.","Top with breadcrumbs.","Bake 20 min."],youtube:"https://www.youtube.com/embed/bdQvspNy6BA",img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80"},
  {id:905,name:"Deviled Eggs",category:"Appetizers",time:"20 min",views:560,emoji:"🥚",ingredients:[["Eggs","6"],["Mayo","3 tbsp"],["Mustard","1 tsp"],["Paprika","for garnish"],["Salt","pinch"]],steps:["Hard boil eggs.","Halve and scoop yolks.","Mash with mayo.","Pipe back in.","Dust with paprika."],youtube:"https://www.youtube.com/embed/hqkkwIVEE00",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80"},
  {id:906,name:"Nachos",category:"Appetizers",time:"15 min",views:840,emoji:"🫘",ingredients:[["Tortilla Chips","200g"],["Cheese","200g"],["Jalapenos","½ cup"],["Salsa","½ cup"],["Guacamole","½ cup"]],steps:["Spread chips on tray.","Cover with cheese.","Add jalapenos.","Bake 10 min.","Top with salsa."],youtube:"https://www.youtube.com/embed/5RoWxdsF5Wc",img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"},
  {id:907,name:"Samosas",category:"Appetizers",time:"45 min",views:720,emoji:"🥟",ingredients:[["Pastry Sheets","12"],["Potato","3"],["Peas","½ cup"],["Spices","to taste"],["Oil","for frying"]],steps:["Boil and mash potato.","Cut pastry.","Fill and seal.","Deep fry.","Serve with chutney."],youtube:"https://www.youtube.com/embed/3OZn-iCGf5s",img:"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&q=80"},
  {id:908,name:"Cheese Dip",category:"Appetizers",time:"10 min",views:660,emoji:"🧀",ingredients:[["Cream Cheese","200g"],["Cheddar","100g"],["Jalapenos","2 tbsp"],["Garlic","1 clove"],["Milk","¼ cup"]],steps:["Soften cream cheese.","Add all to pot.","Heat and stir.","Add milk.","Serve warm with chips."],youtube:"https://www.youtube.com/embed/6pqUlXED0m4",img:"https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=600&q=80"},
  {id:909,name:"Calamari",category:"Appetizers",time:"20 min",views:580,emoji:"🦑",ingredients:[["Squid","500g"],["Flour","1 cup"],["Egg","2"],["Breadcrumbs","1 cup"],["Oil","for frying"]],steps:["Slice into rings.","Coat in flour, egg, crumbs.","Heat oil to 180°C.","Fry 3 minutes.","Serve with aioli."],youtube:"https://www.youtube.com/embed/tNsGfXdjiRY",img:"https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80"},
  {id:910,name:"Mini Pizzas",category:"Appetizers",time:"20 min",views:740,emoji:"🍕",ingredients:[["Pita Bread","4"],["Tomato Paste","4 tbsp"],["Mozzarella","200g"],["Olives","½ cup"],["Herbs","to taste"]],steps:["Spread paste on pitas.","Add cheese.","Add toppings.","Bake 10 min.","Slice and serve."],youtube:"https://www.youtube.com/embed/DtxTsBwtK0s",img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"},
  {id:1001,name:"Boiled Egg",category:"Shortiest",time:"6 min",views:800,emoji:"🥚",ingredients:[["Eggs","2"],["Water","as needed"],["Salt","optional"]],steps:["Bring water to boil.","Add eggs.","Cook 6 minutes.","Cold water bath.","Peel and eat."],youtube:"https://www.youtube.com/embed/RB6edDwNEgg",img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80"},
  {id:1002,name:"Buttered Toast",category:"Shortiest",time:"3 min",views:700,emoji:"🍞",ingredients:[["Bread","2 slices"],["Butter","2 tbsp"]],steps:["Put bread in toaster.","Toast until golden.","Spread butter.","Eat while hot."],youtube:"https://www.youtube.com/embed/YFoGGwCOC64",img:"https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=600&q=80"},
  {id:1003,name:"Banana Snack",category:"Shortiest",time:"1 min",views:600,emoji:"🍌",ingredients:[["Banana","1"],["Peanut Butter","2 tbsp"]],steps:["Peel banana.","Add peanut butter.","Eat immediately."],youtube:"https://www.youtube.com/embed/uBhKEz5apcU",img:"https://images.unsplash.com/photo-1605990335689-72df7f4d7bf6?w=600&q=80"},
  {id:1004,name:"Glass of Milk",category:"Shortiest",time:"1 min",views:500,emoji:"🥛",ingredients:[["Milk","1 glass"],["Ice","optional"]],steps:["Pour cold milk.","Add ice if desired.","Drink immediately."],youtube:"https://www.youtube.com/embed/5IwmuaKE7tA",img:"https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&q=80"},
  {id:1005,name:"Cereal Bowl",category:"Shortiest",time:"2 min",views:420,emoji:"🥣",ingredients:[["Cereal","1 cup"],["Milk","1 cup"],["Berries","handful"]],steps:["Pour cereal.","Add cold milk.","Top with berries.","Eat immediately."],youtube:"https://www.youtube.com/embed/WIkXniZN9X0",img:"https://images.unsplash.com/photo-1511690743698-d9d4be4bda99?w=600&q=80"},
  {id:1006,name:"Fruit Salad",category:"Shortiest",time:"5 min",views:540,emoji:"🍓",ingredients:[["Seasonal Fruits","2 cups"],["Honey","1 tbsp"],["Lemon","½"]],steps:["Wash and chop fruits.","Place in bowl.","Squeeze lemon.","Drizzle honey.","Toss and serve."],youtube:"https://www.youtube.com/embed/nTm-_KujooY",img:"https://images.unsplash.com/photo-1605990335689-72df7f4d7bf6?w=600&q=80"},
  {id:1007,name:"Cucumber Snack",category:"Shortiest",time:"2 min",views:380,emoji:"🥒",ingredients:[["Cucumber","1"],["Salt","pinch"],["Chili","pinch"],["Lime","½"]],steps:["Slice cucumber.","Sprinkle salt.","Add chili.","Squeeze lime.","Serve immediately."],youtube:"https://www.youtube.com/embed/SpI3QF_Iauc",img:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80"},
  {id:1008,name:"PB Toast",category:"Shortiest",time:"3 min",views:460,emoji:"🥜",ingredients:[["Bread","2 slices"],["Peanut Butter","3 tbsp"]],steps:["Toast bread.","Spread peanut butter.","Slice in half.","Eat warm."],youtube:"https://www.youtube.com/embed/hOZs8keM_Y4",img:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"},
  {id:1009,name:"Apple Slices",category:"Shortiest",time:"3 min",views:340,emoji:"🍎",ingredients:[["Apple","1"],["Peanut Butter","2 tbsp"],["Cinnamon","pinch"]],steps:["Wash and core apple.","Slice into wedges.","Arrange on plate.","Serve with peanut butter."],youtube:"https://www.youtube.com/embed/-e63NYVB_LM",img:"https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=80"},
  {id:1010,name:"Yoghurt Bowl",category:"Shortiest",time:"3 min",views:420,emoji:"🫙",ingredients:[["Greek Yoghurt","1 cup"],["Honey","1 tbsp"],["Berries","¼ cup"],["Granola","2 tbsp"]],steps:["Scoop yoghurt.","Drizzle honey.","Add berries.","Top with granola.","Serve immediately."],youtube:"https://www.youtube.com/embed/KnQAP7_erto",img:"https://images.unsplash.com/photo-1511690743698-d9d4be4bda99?w=600&q=80"}
];

console.log("Total recipes: " + recipes.length);
console.log("App: " + APP_NAME.toUpperCase());

// ── LAB 06: User accounts ──
const users = {
  "mithilaumayantha@gmail.com": "Mithila1234",
  "dulhanhansaja@gmail.com":    "Dulhan1234"
};

// ── LAB 06: Array helpers ──
function getByCategory(cat) {
  return recipes.filter(r => r.category === cat).slice(0, 10);
}
function getPopular() {
  return [...recipes].sort((a,b) => b.views - a.views).slice(0, 12);
}
function getLatest() {
  // Lab 05: for loop - get last 8 recipes
  let latest = [];
  for (let i = recipes.length - 1; i >= recipes.length - 8 && i >= 0; i--) {
    latest.push(recipes[i]);
  }
  return latest;
}

// ── LAB 05: Render recipe cards ──
function renderCards(list, containerId, showBadge) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  // Lab 05: for loop
  for (let i = 0; i < list.length; i++) {
    const r    = list[i];
    const wrap = document.createElement("div");
    wrap.className = "recipe-card-wrap";
    // Lab 04: if-else-if ladder
    let badge = "";
    if      (showBadge && r.views > 1000) badge = `<span class="popular-badge">🔥 ${r.views}</span>`;
    else if (showBadge && r.views > 700)  badge = `<span class="popular-badge">⭐ ${r.views}</span>`;
    else if (showBadge)                   badge = `<span class="popular-badge">👍 ${r.views}</span>`;
    // Pastel bg for offline fallback (Lab 04: array)
    const pBg = ["#e8f5e9","#e3f2fd","#fce4ec","#fff8e1","#e8eaf6","#e0f2f1","#fbe9e7","#f3e5f5"];
    wrap.innerHTML = `${badge}<a class="recipe-card" href="recipe.html?id=${r.id}">
      <div style="position:relative;width:100%;height:190px;background:${pBg[i%pBg.length]};overflow:hidden;">
        <img src="${r.img}" alt="${r.name}"
             style="width:100%;height:190px;object-fit:cover;display:block;"
             onerror="this.style.display='none';">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:60px;pointer-events:none;opacity:0.7;">${r.emoji}</div>
      </div>
      <div class="card-body">
        <span class="card-tag">${r.category}</span>
        <h3>${r.emoji} ${r.name}</h3>
        <div class="card-meta"><span>⏱ ${r.time}</span><span>👁 ${r.views}</span></div>
      </div></a>`;
    container.appendChild(wrap);
  }
}

// ── PROJECT: Hero Slider WITH RECIPE IMAGES ──
function initSlider() {
  const hero = document.getElementById("heroSlider");
  if (!hero) return;
  hero.innerHTML = "";
  const slideRecipes = getLatest();

  // 8 fallback gradient colours if images don't load (Lab 04: array)
  const grads = [
    "linear-gradient(135deg,#1b5e20,#2e7d32)",
    "linear-gradient(135deg,#b71c1c,#c62828)",
    "linear-gradient(135deg,#0d47a1,#1565c0)",
    "linear-gradient(135deg,#880e4f,#ad1457)",
    "linear-gradient(135deg,#4a148c,#6a1b9a)",
    "linear-gradient(135deg,#004d40,#00695c)",
    "linear-gradient(135deg,#e65100,#ef6c00)",
    "linear-gradient(135deg,#37474f,#546e7a)"
  ];

  // Lab 05: for loop
  for (let i = 0; i < slideRecipes.length; i++) {
    const r   = slideRecipes[i];
    const div = document.createElement("div");
    div.className = "slide" + (i === 0 ? " active" : "");

    // Set gradient as base, then load image on top
    div.style.background = grads[i % grads.length];

    // Create background image element so we can handle load errors
    const bgImg = new Image();
    bgImg.onload = (function(el, url) {
      return function() {
        el.style.backgroundImage =
          "linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.55)),url('" + url + "')";
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      };
    })(div, r.img);
    bgImg.src = r.img; // start loading

    div.innerHTML = `<div class="slide-content">
      <div style="font-size:64px;margin-bottom:8px;line-height:1;">${r.emoji}</div>
      <h1>${r.name}</h1>
      <p>${r.category} &nbsp;·&nbsp; ⏱ ${r.time} &nbsp;·&nbsp; 👁 ${r.views} views</p>
      <a href="recipe.html?id=${r.id}" class="btn btn-primary" style="margin-right:12px;">View Recipe</a>
      <a href="categories.html" class="btn btn-outline">Browse All</a>
    </div>`;
    hero.appendChild(div);
  }

  // Build dots
  const dotsWrap = document.getElementById("sliderDots");
  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < slideRecipes.length; i++) {
      const dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.onclick = (function(idx){ return function(){ goToSlide(idx); }; })(i);
      dotsWrap.appendChild(dot);
    }
  }
}

function goToSlide(n) {
  const allSlides = document.querySelectorAll(".slide");
  const allDots   = document.querySelectorAll(".dot");
  const total     = allSlides.length;
  // Lab 04: if-else
  if      (n >= total) currentSlide = 0;
  else if (n < 0)      currentSlide = total - 1;
  else                 currentSlide = n;
  // Lab 05: for loop
  for (let i = 0; i < allSlides.length; i++) {
    allSlides[i].classList.remove("active");
    if (allDots[i]) allDots[i].classList.remove("active");
  }
  allSlides[currentSlide].classList.add("active");
  if (allDots[currentSlide]) allDots[currentSlide].classList.add("active");
}

function startAutoPlay() {
  autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
}

// ── PROJECT: View Counter ──
function updateViewCount(id) {
  const key   = "views_" + id;
  const views = parseInt(sessionStorage.getItem(key) || "0") + 1;
  sessionStorage.setItem(key, views);
  const el = document.getElementById("viewCount");
  if (el) el.textContent = "👁 " + views + " views this session";
}

// ── PROJECT: Search ──
function openSearch() {
  searchOpen = true;
  const ov = document.getElementById("searchOverlay");
  if (ov) ov.classList.add("open");
  setTimeout(() => { const i = document.getElementById("searchInput"); if(i) i.focus(); }, 100);
}
function closeSearch() {
  searchOpen = false;
  const ov = document.getElementById("searchOverlay");
  if (ov) ov.classList.remove("open");
}
// ── PROJECT: Search (queries database via API) ──
async function doSearch() {
  const input = document.getElementById("searchInput");
  const list  = document.getElementById("searchResultsList");
  if (!input || !list) return;
  const q = input.value.trim();
  if (q.length < 2) {
    list.innerHTML = "<li style='color:#aaa;padding:12px'>Type to search...</li>";
    return;
  }
  list.innerHTML = "<li style='color:#aaa;padding:12px'>Searching...</li>";
  try {
    const results = await apiSearch(q);
    if (!results.length) {
      list.innerHTML = `<li style='padding:12px;color:#aaa;'>No results for "${q}"</li>`;
      return;
    }
    list.innerHTML = "";
    results.slice(0, 8).forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `${r.emoji} <strong>${r.name}</strong> <span style='color:#5a7a5a;font-size:12px;'>${r.category}</span>`;
      li.addEventListener("click", () => {
        window.location.href = "recipe.html?id=" + r.id;
        closeSearch();
      });
      list.appendChild(li);
    });
  } catch(e) {
    list.innerHTML = "<li style='color:#aaa;padding:12px'>Search unavailable.</li>";
  }
}

// ── PAGE: Recipe Detail ──
// Disabled — handled by api.js + recipe.html inline script
function loadRecipeDetail() {
  return;
}

// ── PAGE: Comments ──
const commentsArray = [];
function submitComment() {
  const input = document.getElementById("commentBox");
  const name  = document.getElementById("commenterName");
  if (!input || !name) return;
  const text    = input.value.trim();
  const nameVal = name.value.trim() || "Anonymous";
  if (text.length === 0) { window.alert("⚠️ Please type a comment first."); return; }
  commentsArray.push({ name: nameVal, text, time: new Date().toLocaleTimeString() });
  input.value = "";
  renderComments();
}
function renderComments() {
  const container = document.getElementById("commentsList");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < commentsArray.length; i++) {
    const c   = commentsArray[i];
    const div = document.createElement("div");
    div.className = "comment-item fade-in";
    div.innerHTML = `<strong>${c.name}</strong> <small style='color:#5a7a5a;'>${c.time}</small><br>${c.text}`;
    container.appendChild(div);
  }
}

// ── PAGE: Category ──
function loadCategoryPage() {
  const cat = new URLSearchParams(window.location.search).get("cat");
  if (!cat) return;
  document.title = cat + " Recipes | RECIPEZ";
  const heading = document.getElementById("catHeading");
  if (heading) heading.textContent = cat + " Recipes";
  renderCards(getByCategory(cat), "catRecipes", false);
}

// ── Back to Top ──
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => { btn.style.display = window.scrollY > 300 ? "block" : "none"; });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// ── Hamburger ──
function toggleMenu() {
  const links = document.getElementById("navLinks");
  if (links) links.classList.toggle("open");
}

// ── Fade on Scroll ──
function initFadeOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("fade-in"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".recipe-card, .cat-card, .q-card").forEach(el => observer.observe(el));
}

// ── Login ──
function togglePassword() {
  const input = document.getElementById("loginPass");
  const btn   = document.getElementById("togglePwdBtn");
  if (!input) return;
  if (input.type === "password") { input.type = "text"; if(btn) btn.textContent = "🙈"; }
  else                           { input.type = "password"; if(btn) btn.textContent = "👁"; }
}
function validateLogin() {
  const email = (document.getElementById("loginUser") || {}).value || "";
  const pass  = (document.getElementById("loginPass")  || {}).value || "";
  const errEl = document.getElementById("loginError");
  if (!email || !pass) { window.alert("⚠️ Please fill in all fields."); return; }
  if (email.toLowerCase() === "guest") { window.location.href = "index.html"; return; }
  if (users[email] && users[email] === pass) {
    window.alert("✅ Welcome back, " + email + "!");
    window.location.href = "index.html";
  } else {
    window.alert("❌ Incorrect email or password.");
    if (errEl) { errEl.textContent = "Incorrect email or password."; errEl.style.display = "block"; }
  }
}

// ── Add Recipe Form Validation ──
function validateAddRecipeForm() {
  const name = document.getElementById("recipeName");
  const cat  = document.getElementById("recipeCategory");
  const cont = document.getElementById("recipeContent");
  // Lab 04: if-else-if
  if (!name || name.value.trim() === "") {
    showFieldError("nameError"); window.alert("⚠️ Please enter the recipe name."); return false;
  }
  if (!cat || cat.value === "") {
    showFieldError("categoryError"); window.alert("⚠️ Please select a category."); return false;
  }
  if (!cont || cont.value.trim().length < 20) {
    showFieldError("contentError"); window.alert("⚠️ Please enter the recipe content (at least 20 characters)."); return false;
  }
  window.alert("✅ Recipe submitted successfully!\n(Database connection added in Phase 03)");
  window.location.href = "index.html";
  return true;
}
function showFieldError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("show");
}
function hideError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("show");
}
function updateCharCount() {
  const ta = document.getElementById("recipeContent");
  const cc = document.getElementById("charCount");
  if (ta && cc) cc.textContent = ta.value.length;
}

// ── INIT ──
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;

  // Lab 04: if-else-if ladder - exact page matching
  if (page.endsWith("category.html")) {
    loadCategoryPage();
  } else if (page.endsWith("recipe.html") && !page.endsWith("add-recipe.html")) {
    // Handled by api.js inline script in recipe.html
  } else if (page.endsWith("popular.html")) {
    renderCards(getPopular(), "popularRecipes", true);
  } else if (!page.endsWith("add-recipe.html") && !page.endsWith("login.html") && !page.endsWith("register.html") && !page.endsWith("categories.html")) {
    // Home page - slider is built from database in index.html inline script
    startAutoPlay();
    renderCards(getLatest(), "latestRecipes", false);
  }

  initBackToTop();
  initFadeOnScroll();

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSearch(); });

  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => { if (link.href === window.location.href) link.classList.add("active"); });

  // ── AUTH NAVBAR: update login button based on session ──
  if (typeof apiMe === 'function') {
    apiMe().then(me => {
      const navList = document.querySelector('.nav-links');
      if (!navList) return;
      const loginLi = document.getElementById('navLoginBtn')?.closest('li');
      if (!loginLi) return;

      if (me.loggedIn) {
        // Replace login button with username + logout
        loginLi.innerHTML = '<a href="#" onclick="apiLogout();return false;" style="color:#fff;">👤 ' + me.user.username + ' | Logout</a>';
      }
    });
  }

  console.log("RECIPEZ ✅ — " + recipes.length + " recipes loaded");
});
