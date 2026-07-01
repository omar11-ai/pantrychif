import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, Filter, Info, ChefHat } from "lucide-react";
import { fetchRecipesByIngredients } from "../services/api";
import { useStore } from "../store/useStore";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeCardData } from "../types";
import { motion, AnimatePresence } from "motion/react";

export const Results = () => {
  const { selectedIngredients, dietPreference } = useStore();
  const [recipes, setRecipes] = useState<RecipeCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      if (selectedIngredients.length === 0) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await fetchRecipesByIngredients(selectedIngredients);
        if (data.length > 0) {
          setRecipes(data);
        } else {
          setError("No recipes found. Try different ingredients!");
        }
      } catch (err) {
        setError("Failed to fetch recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getRecipes();
  }, [selectedIngredients]);

  // If diet is selected, we filter out Desserts locally. (TheMealDB doesn't have a direct diet filter, so we approximate).
  // Wait, TheMealDB filter by ingredient doesn't return categories. We will just show a UI note about it, or filter out items with "Cake", "Sugar", "Chocolate" in title.
  const filteredRecipes = useMemo(() => {
    let result = recipes;
    if (dietPreference === "diet") {
      const forbiddenWords = ["cake", "chocolate", "sugar", "pudding", "tart", "pie", "donut", "ice cream"];
      result = result.filter(r => !forbiddenWords.some(fw => r.title.toLowerCase().includes(fw)));
    }
    return result;
  }, [recipes, dietPreference]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-slate-500 hover:text-primary transition-colors font-medium mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Inventory
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Your Recipes
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Based on {selectedIngredients.length} ingredients 
            {dietPreference === "diet" ? " (Diet Mode Active 🌱)" : ""}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Crafting your menu...</p>
        </div>
      ) : error || filteredRecipes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <ChefHat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-xl text-slate-500 font-medium mb-6">
            {error || (dietPreference === "diet" ? "No diet recipes found for these ingredients." : "No recipes found.")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          >
            Adjust Ingredients
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
