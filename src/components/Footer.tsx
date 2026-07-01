import React from "react";
import { ChefHat, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-primary text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                PantryChef AI
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              Stop wasting food. Discover delicious recipes using ingredients
              you already have in your kitchen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ingredients"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Find Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border text-center text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} PantryChef AI. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
