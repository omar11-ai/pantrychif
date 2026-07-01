import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChefHat, Sparkles, Leaf } from "lucide-react";
import { INGREDIENT_CATEGORIES } from "../data/ingredients";
import { useStore, DietPreference } from "../store/useStore";
import { cn } from "../lib/utils";

export const IngredientsPicker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedIngredients, toggleIngredient, clearIngredients, dietPreference, setDietPreference } = useStore();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (selectedIngredients.length > 0) {
      navigate("/results");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl shadow-primary/10 mb-6 border border-white">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Select Your Inventory
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Tap the ingredients you have. We'll craft the perfect recipe.
        </p>
      </div>

      {/* Sticky Header with Search, Diet Toggle, and Action Buttons */}
      <div className="bg-white/80 backdrop-blur-2xl p-4 md:p-6 rounded-[2.5rem] shadow-xl border border-slate-200 mb-10 relative z-40 flex flex-col gap-6">
        
        {/* Diet Preference Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-full border border-slate-200">
            <button
              onClick={() => setDietPreference("regular")}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                dietPreference === "regular" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              🍽️ Regular Food
            </button>
            <button
              onClick={() => setDietPreference("diet")}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                dietPreference === "diet" 
                  ? "bg-accent text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Leaf className="w-4 h-4" />
              Diet Food
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-4 py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 text-lg font-medium text-slate-900 transition-all shadow-sm placeholder:text-slate-400"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            {selectedIngredients.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={clearIngredients}
                className="px-6 py-5 rounded-[2rem] text-slate-600 hover:bg-slate-100 transition-colors font-bold whitespace-nowrap shadow-sm border border-transparent hover:border-slate-200"
              >
                Clear
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              disabled={selectedIngredients.length === 0}
              className="flex-grow md:flex-grow-0 flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-primary to-secondary disabled:from-slate-300 disabled:to-slate-400 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-primary/25 disabled:shadow-none transition-all whitespace-nowrap relative overflow-hidden"
            >
              <ChefHat className="w-6 h-6" />
              Craft Recipe ({selectedIngredients.length})
            </motion.button>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {Object.entries(INGREDIENT_CATEGORIES).map(([category, items]) => {
          const filteredItems = items.filter(i => 
            i.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-black text-slate-800 border-b border-slate-200 pb-2">
                {category.replace("_", " & ")}
              </h2>
              <div className="flex flex-wrap gap-4">
                {filteredItems.map((ingredient) => {
                  const isSelected = selectedIngredients.includes(ingredient);
                  return (
                    <motion.button
                      layout
                      key={ingredient}
                      onClick={() => toggleIngredient(ingredient)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.92 }}
                      className={cn(
                        "px-6 py-3.5 rounded-[1.5rem] text-base font-bold transition-all duration-300 shadow-sm border-2",
                        isSelected
                          ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-lg shadow-primary/30"
                          : "bg-white text-slate-700 border-slate-200 hover:border-primary/30 hover:shadow-md"
                      )}
                    >
                      {ingredient}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {Object.values(INGREDIENT_CATEGORIES).flat().filter(i => i.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center py-20 text-slate-500 font-medium text-lg"
        >
          No items found matching "{searchQuery}"
        </motion.div>
      )}
    </div>
  );
};
