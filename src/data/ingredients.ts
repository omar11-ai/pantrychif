export const INGREDIENT_CATEGORIES: Record<string, string[]> = {
  Vegetables: [
    "Garlic", "Onion", "Tomato", "Potato", "Carrot", "Spinach", "Mushroom", 
    "Broccoli", "Bell Pepper", "Cucumber", "Zucchini", "Cauliflower", "Lettuce", 
    "Avocado", "Peas", "Corn", "Asparagus", "Celery", "Green Beans"
  ],
  Meats: [
    "Chicken", "Beef", "Pork", "Lamb", "Turkey", "Duck", "Bacon", "Sausage",
    "Salmon", "Tuna", "Shrimp", "Fish", "Cod", "Crab", "Lobster"
  ],
  Starches: [
    "Rice", "Pasta", "Noodles", "Quinoa", "Oats", "Couscous", "Bread", "Flour",
    "Tortillas", "Pita", "Lentils", "Chickpeas", "Beans"
  ],
  Dairy_Eggs: [
    "Eggs", "Milk", "Cheese", "Butter", "Yogurt", "Cream", "Mozzarella", 
    "Parmesan", "Cheddar", "Cream Cheese", "Sour Cream"
  ],
  Sauces_Oils: [
    "Olive Oil", "Soy Sauce", "Honey", "Mayonnaise", "Mustard", "Ketchup", 
    "Hot Sauce", "Vinegar", "Worcestershire Sauce", "Peanut Butter", "Sesame Oil", "Vegetable Oil"
  ],
  Spices_Herbs: [
    "Salt", "Black Pepper", "Ginger", "Cinnamon", "Nutmeg", "Paprika", "Cumin", 
    "Oregano", "Basil", "Thyme", "Rosemary", "Chili Powder", "Curry Powder", "Coriander", "Parsley"
  ],
  Fruits_Nuts: [
    "Apple", "Banana", "Orange", "Strawberry", "Lemon", "Lime", "Almonds", 
    "Walnuts", "Peanuts", "Cashews", "Pecans", "Blueberry", "Pineapple", "Mango"
  ]
};

export const ALL_INGREDIENTS = Object.values(INGREDIENT_CATEGORIES).flat().sort();

export const INGREDIENT_ALTERNATIVES: Record<string, string> = {
  "Butter": "Olive Oil or Coconut Oil",
  "Milk": "Almond Milk or Oat Milk",
  "Sugar": "Honey or Maple Syrup",
  "Eggs": "Flaxseed meal + water",
  "Soy Sauce": "Tamari or Coconut Aminos",
  "Sour Cream": "Plain Greek Yogurt",
  "Breadcrumbs": "Rolled Oats or Almond Flour",
  "Mayonnaise": "Mashed Avocado or Hummus",
  "White Rice": "Quinoa or Cauliflower Rice",
  "Pasta": "Zucchini Noodles or Spaghetti Squash",
  "Cheese": "Nutritional Yeast",
  "Heavy Cream": "Coconut Milk"
};
