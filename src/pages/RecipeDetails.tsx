import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Circle,
  Youtube,
  ExternalLink,
  Globe2,
  Minus,
  Plus,
  Info,
  Clock,
  SignalHigh
} from "lucide-react";
import { fetchMealDetails } from "../services/api";
import { useStore } from "../store/useStore";
import { MealDetails as MealDetailsType } from "../types";
import { motion } from "motion/react";
import { INGREDIENT_ALTERNATIVES } from "../data/ingredients";
import { getRecipeMeta } from "../lib/utils";

const scaleMeasurement = (measure: string, servings: number, baseServings: number = 2) => {
  if (!measure) return "";
  
  const match = measure.match(/^([\d./\s]+)(.*)$/);
  if (!match) return measure;

  let [, numStr, rest] = match;
  numStr = numStr.trim();
  
  let num = 0;
  if (numStr.includes("/")) {
    const parts = numStr.split(" ");
    if (parts.length === 2) {
      const [whole, frac] = parts;
      const [n, d] = frac.split("/");
      num = parseInt(whole) + (parseInt(n) / parseInt(d));
    } else {
      const [n, d] = numStr.split("/");
      num = parseInt(n) / parseInt(d);
    }
  } else {
    num = parseFloat(numStr);
  }

  if (isNaN(num)) return measure;

  const scaledNum = (num * servings) / baseServings;
  const formattedNum = Number.isInteger(scaledNum) ? scaledNum.toString() : scaledNum.toFixed(1).replace(/\.0$/, "");

  return `${formattedNum} ${rest.trim()}`;
};

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedIngredients, toggleFavorite, isFavorite, markAsCooked, isCooked } = useStore();

  const [recipe, setRecipe] = useState<MealDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [servings, setServings] = useState(2);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadRecipe = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMealDetails(id);
        if (data) {
          setRecipe(data);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Failed to fetch recipe details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-xl text-red-500 mb-6">{error || "Something went wrong."}</p>
        <Link to="/results" className="text-primary hover:underline font-medium">&larr; Back to Results</Link>
      </div>
    );
  }

  const ingredients: { name: string; measure: string; owned: boolean; alternative?: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}` as keyof MealDetailsType] as string;
    const measure = recipe[`strMeasure${i}` as keyof MealDetailsType] as string;

    if (ing && ing.trim() !== "") {
      const name = ing.trim();
      const isOwned = selectedIngredients.some(
        (selected) => name.toLowerCase().includes(selected.toLowerCase()) || selected.toLowerCase().includes(name.toLowerCase())
      );
      const alternative = Object.entries(INGREDIENT_ALTERNATIVES).find(
        ([key]) => key.toLowerCase() === name.toLowerCase()
      )?.[1];

      ingredients.push({ name, measure: measure ? measure.trim() : "", owned: isOwned, alternative });
    }
  }

  const favorite = isFavorite(recipe.idMeal);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen relative">
      <div className="mb-12">
        <button onClick={() => window.history.back()} className="inline-flex items-center p-3 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:scale-105 transition-all text-slate-600 border border-slate-100">
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5 space-y-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-auto aspect-[4/5] object-cover hover:scale-110 transition-transform duration-700" />
            <button onClick={() => toggleFavorite({ id: recipe.idMeal, title: recipe.strMeal, image: recipe.strMealThumb, cuisine: recipe.strArea, category: recipe.strCategory })} className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-xl transition-all shadow-xl border ${favorite ? "bg-white/90 text-red-500 hover:bg-white border-white scale-110" : "bg-black/30 text-white hover:bg-black/50 border-white/20 hover:scale-110"}`}>
              <svg className={`w-6 h-6 ${favorite ? "fill-current" : ""}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </motion.div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {recipe.strYoutube && (
                <a href={recipe.strYoutube} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-600 rounded-2xl font-bold transition-all hover:scale-105">
                  <Youtube className="w-6 h-6" /> Video
                </a>
              )}
              {recipe.strSource && (
                <a href={recipe.strSource} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-2xl font-bold transition-all hover:scale-105">
                  <ExternalLink className="w-5 h-5" /> Source
                </a>
              )}
            </div>
            
            <motion.button whileHover={{ scale: isCooked(recipe.idMeal) ? 1 : 1.05 }} whileTap={{ scale: isCooked(recipe.idMeal) ? 1 : 0.95 }} onClick={() => { if (!isCooked(recipe.idMeal)) { markAsCooked(recipe.idMeal); setShowConfetti(true); setTimeout(() => setShowConfetti(false), 3000); } }} className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-[2rem] font-black text-xl shadow-xl transition-all border-2 ${isCooked(recipe.idMeal) ? "bg-green-500/10 text-green-600 border-green-500/30 cursor-default" : "bg-gradient-to-r from-accent to-green-400 text-white border-transparent hover:shadow-accent/30 cursor-pointer"}`}>
              {isCooked(recipe.idMeal) ? ( <><CheckCircle2 className="w-7 h-7" /> Chef Level Up: Cooked!</> ) : ( <><span className="text-2xl">👨‍🍳</span> I Cooked This!</> )}
            </motion.button>
          </div>
        </div>

        <div className="lg:col-span-7 pt-4">
          <div className="flex flex-wrap gap-3 mb-6">
            {recipe.strArea && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary rounded-full text-sm font-bold tracking-wide uppercase border border-secondary/20">
                <Globe2 className="w-4 h-4" /> {recipe.strArea}
              </span>
            )}
            {recipe.strCategory && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full text-sm font-bold tracking-wide uppercase border border-primary/20">
                {recipe.strCategory}
              </span>
            )}
            {recipe.idMeal && (() => {
              const { time, difficulty } = getRecipeMeta(recipe.idMeal);
              return (
                <>
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-bold tracking-wide border border-slate-200">
                    <Clock className="w-4 h-4" /> {time} min
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide border ${difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    <SignalHigh className="w-4 h-4" /> {difficulty}
                  </span>
                </>
              );
            })()}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-10 tracking-tight">
            {recipe.strMeal}
          </h1>

          <div className="flex items-center gap-6 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 inline-flex">
            <span className="font-bold text-slate-600">Servings:</span>
            <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
              <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-primary transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-black text-lg w-4 text-center">{servings}</span>
              <button onClick={() => setServings(servings + 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 hover:text-primary transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl border border-slate-100 mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">🥗</span>
              Required Ingredients
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ingredients.map((ing, idx) => (
                <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} key={idx} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${ing.owned ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-100 hover:border-slate-200"}`}>
                  {ing.owned ? ( <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" /> ) : ( <Circle className="w-6 h-6 text-slate-300 flex-shrink-0 mt-0.5" /> )}
                  <div className="flex flex-col flex-1">
                    <span className="font-bold text-slate-900">{ing.name}</span>
                    <span className="text-sm font-medium text-slate-500">{scaleMeasurement(ing.measure, servings)}</span>
                    {!ing.owned && ing.alternative && (
                      <div className="mt-2 flex items-start gap-1.5 p-2 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold">
                        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>Swap: {ing.alternative}</span>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">👨‍🍳</span>
              Instructions
            </h2>
            <div className="text-slate-700 text-lg font-medium space-y-6">
              {recipe.strInstructions.split("\n").filter((p) => p.trim() !== "").map((paragraph, idx) => (
                <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm border border-slate-200">{idx + 1}</span>
                  <p className="leading-relaxed mt-1">{paragraph}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
