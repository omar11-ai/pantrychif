import { Meal, MealDetails } from "../types";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMealsByIngredient = async (
  ingredient: string,
): Promise<Meal[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/filter.php?i=${ingredient.toLowerCase().replace(" ", "_")}`,
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error(`Error fetching meals for ${ingredient}:`, error);
    return [];
  }
};

export const fetchMealDetails = async (
  id: string,
): Promise<MealDetails | null> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error(`Error fetching meal details for ${id}:`, error);
    return null;
  }
};

export const fetchRecipesByIngredients = async (
  ingredients: string[],
): Promise<{ id: string; title: string; image: string }[]> => {
  if (ingredients.length === 0) return [];
  
  try {
    // TheMealDB free tier only supports filtering by a single ingredient.
    // So we fetch for the first few ingredients and combine the results.
    // To get a broad set of results, we'll fetch the top 3 ingredients and combine.
    const searchIngredients = ingredients.slice(0, 3);
    
    const fetchPromises = searchIngredients.map(ing => 
      fetch(`${BASE_URL}/filter.php?i=${ing.toLowerCase().replace(" ", "_")}`)
        .then(res => res.json())
        .then(data => data.meals || [])
    );
    
    const resultsArray = await Promise.all(fetchPromises);
    
    // Flatten and remove duplicates
    const allMeals = resultsArray.flat();
    const uniqueMeals = Array.from(new Map(allMeals.map(m => [m.idMeal, m])).values());
    
    return uniqueMeals.map(meal => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
    }));
  } catch (error) {
    console.error("Error fetching recipes by ingredients:", error);
    return [];
  }
};
