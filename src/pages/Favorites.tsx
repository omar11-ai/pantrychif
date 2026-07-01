import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ChefHat } from "lucide-react";
import { useStore } from "../store/useStore";
import { RecipeCard } from "../components/RecipeCard";

export const Favorites = () => {
  const { favorites } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-2xl mb-4 border border-red-100">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Saved Recipes
          </h1>
          <p className="text-slate-600 mt-2 text-lg font-medium">
            Your personal cookbook ({favorites.length} items)
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-xl text-slate-500 font-medium mb-8">
            You haven't saved any recipes yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {favorites.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
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
