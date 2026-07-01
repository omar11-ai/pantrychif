import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChefHat,
  Heart,
  Home,
  Menu,
  X,
  Utensils,
  User,
} from "lucide-react";
import { cn } from "../lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4 mr-2" /> },
    {
      name: "Recipes",
      path: "/ingredients",
      icon: <Utensils className="w-4 h-4 mr-2" />,
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: <Heart className="w-4 h-4 mr-2" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <nav className={cn(
      "fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none transition-transform duration-500",
      isVisible ? "translate-y-0" : "-translate-y-[150%]"
    )}>
      <div className={cn(
        "pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 shadow-2xl shadow-primary/10 border",
        scrolled 
          ? "bg-white/90 backdrop-blur-xl border-slate-200 w-full max-w-5xl"
          : "bg-white/60 backdrop-blur-md border-white/50 w-full max-w-7xl"
      )}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-primary to-secondary text-white p-2.5 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-primary/30">
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight">
            PantryChef
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                location.pathname === link.path
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50",
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-slate-100/80 text-slate-700"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-[110%] left-4 right-4 pointer-events-auto bg-white/95 backdrop-blur-xl shadow-2xl border border-slate-200 rounded-3xl p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center px-4 py-3.5 rounded-2xl text-base font-semibold transition-all",
                location.pathname === link.path
                  ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-50",
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
