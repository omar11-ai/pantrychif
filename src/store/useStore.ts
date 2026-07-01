import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RecipeCardData } from "../types";

export type DietPreference = "regular" | "diet";

interface StoreState {
  selectedIngredients: string[];
  toggleIngredient: (ingredient: string) => void;
  clearIngredients: () => void;

  favorites: RecipeCardData[];
  toggleFavorite: (recipe: RecipeCardData) => void;
  isFavorite: (id: string) => boolean;

  cookedRecipes: string[];
  markAsCooked: (id: string) => void;
  isCooked: (id: string) => boolean;

  dietPreference: DietPreference;
  setDietPreference: (pref: DietPreference) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedIngredients: [],
      toggleIngredient: (ingredient) =>
        set((state) => ({
          selectedIngredients: state.selectedIngredients.includes(ingredient)
            ? state.selectedIngredients.filter((i) => i !== ingredient)
            : [...state.selectedIngredients, ingredient],
        })),
      clearIngredients: () => set({ selectedIngredients: [] }),

      favorites: [],
      toggleFavorite: (recipe) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.id === recipe.id);
          if (exists) {
            return {
              favorites: state.favorites.filter((f) => f.id !== recipe.id),
            };
          } else {
            return { favorites: [...state.favorites, recipe] };
          }
        }),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      cookedRecipes: [],
      markAsCooked: (id) => set((state) => {
        if (!state.cookedRecipes.includes(id)) {
          return { cookedRecipes: [...state.cookedRecipes, id] };
        }
        return state;
      }),
      isCooked: (id) => get().cookedRecipes.includes(id),

      dietPreference: "regular",
      setDietPreference: (pref) => set({ dietPreference: pref }),
    }),
    {
      name: "pantrychef-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        cookedRecipes: state.cookedRecipes,
        dietPreference: state.dietPreference,
      }),
    },
  ),
);
