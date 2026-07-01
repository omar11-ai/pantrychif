import React from "react";
import { motion } from "motion/react";
import { User, Award, Flame, Star, CheckCircle2 } from "lucide-react";
import { useStore } from "../store/useStore";

export const Profile = () => {
  const { cookedRecipes, favorites } = useStore();

  const totalCooked = cookedRecipes.length;
  const totalFavorites = favorites.length;

  const getLevel = (cookedCount: number) => {
    if (cookedCount < 5) return { name: "Novice Cook", color: "text-slate-500", bg: "bg-slate-100" };
    if (cookedCount < 15) return { name: "Home Chef", color: "text-primary", bg: "bg-primary/10" };
    if (cookedCount < 30) return { name: "Culinary Artist", color: "text-secondary", bg: "bg-secondary/10" };
    return { name: "Master Chef", color: "text-accent", bg: "bg-accent/10" };
  };

  const level = getLevel(totalCooked);
  
  // Calculate progress to next level
  let nextTarget = 5;
  if (totalCooked >= 5) nextTarget = 15;
  if (totalCooked >= 15) nextTarget = 30;
  if (totalCooked >= 30) nextTarget = 50;

  const progressToNext = Math.min(100, Math.round((totalCooked / nextTarget) * 100));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        {/* Header Cover */}
        <div className="h-48 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-8 border-white bg-slate-100 flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-12 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Kitchen Hero</h1>
          <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${level.bg} ${level.color} text-sm font-bold tracking-wide uppercase mb-8`}>
            <Award className="w-4 h-4" />
            {level.name}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{totalCooked}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Meals Cooked</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{totalFavorites}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Saved Recipes</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{Math.round(totalCooked * 1.5)}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Hours Saved</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <Award className="w-8 h-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900">{level.name.split(' ')[0]}</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">Rank</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="max-w-2xl mx-auto text-left">
            <div className="flex justify-between text-sm font-bold text-slate-600 mb-3 px-1">
              <span>Next Rank: {nextTarget} Meals</span>
              <span className="text-primary">{progressToNext}%</span>
            </div>
            <div className="relative h-12 bg-slate-100 rounded-full overflow-hidden border-4 border-white shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
