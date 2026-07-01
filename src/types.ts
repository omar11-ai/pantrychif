export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetails extends Meal {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strYoutube: string;
  strSource: string;
  [key: string]: string | null;
}

export interface RecipeCardData {
  id: string;
  title: string;
  image: string;
  cuisine?: string;
  category?: string;
}
