import React from "react";
import { ChefHat, Heart, Utensils, Globe2 } from "lucide-react";

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-6">
          <ChefHat className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          About PantryChef AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          We believe that the best meals are the ones you can cook right now,
          without needing to run to the grocery store.
        </p>
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-dark-border mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Our Mission
        </h2>
        <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          <p>
            PantryChef AI was born from a simple problem: staring into a fridge
            full of ingredients and having no idea what to cook. We often end up
            throwing away good food or ordering takeout because it's easier.
          </p>
          <p>
            Our mission is to help you reduce food waste, save money on
            groceries, and discover new, exciting cuisines using the ingredients
            you already have in your kitchen.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-50 dark:bg-dark-surface p-8 rounded-3xl text-center">
          <div className="w-12 h-12 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-accent">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
            Reduce Waste
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Make the most out of every ingredient and contribute to a healthier
            planet.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-dark-surface p-8 rounded-3xl text-center">
          <div className="w-12 h-12 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
            Eat Better
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Cook delicious home meals instead of relying on expensive takeout.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-dark-surface p-8 rounded-3xl text-center">
          <div className="w-12 h-12 bg-white dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-secondary">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
            Discover
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Find amazing recipes from all around the world, completely free.
          </p>
        </div>
      </div>
    </div>
  );
};
