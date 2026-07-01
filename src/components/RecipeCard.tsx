import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, Globe2, Clock, SignalHigh } from "lucide-react";
import { RecipeCardData } from "../types";
import { useStore } from "../store/useStore";
import { getRecipeMeta } from "../lib/utils";

interface RecipeCardProps {
  recipe: RecipeCardData;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { toggleFavorite, isFavorite, isCooked } = useStore();
  const favorite = isFavorite(recipe.id);
  const cooked = isCooked(recipe.id);
  const { difficulty, time } = getRecipeMeta(recipe.id);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {cooked && (
          <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Cooked
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe);
          }}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-lg border z-10 ${
            favorite
              ? "bg-white/90 text-red-500 border-white hover:bg-white scale-110"
              : "bg-black/30 text-white border-white/20 hover:bg-black/50 hover:scale-110"
          }`}
        >
          <Heart
            className={`w-5 h-5 ${favorite ? "fill-current" : ""}`}
            strokeWidth={2.5}
          />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 flex-wrap">
          {recipe.cuisine && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-wide uppercase border border-secondary/20">
              <Globe2 className="w-3 h-3" />
              {recipe.cuisine}
            </span>
          )}
          {recipe.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase border border-primary/20">
              {recipe.category}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 mb-2">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>{time} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <SignalHigh className={`w-4 h-4 ${difficulty === 'Easy' ? 'text-green-500' : difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`} />
            <span>{difficulty}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4">
          <Link
            to={`/recipe/${recipe.id}`}
            className="block w-full py-3.5 px-4 bg-slate-50 hover:bg-primary hover:text-white text-slate-700 text-center rounded-2xl font-bold transition-all duration-300 border border-slate-100 hover:border-primary shadow-sm"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};
