import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Search, Utensils, PiggyBank, Globe, Sparkles, ChefHat } from "lucide-react";

const features = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Smart Discovery",
    description: "Tell us what's in your pantry, we find the magic.",
    color: "from-primary/20 to-primary/5"
  },
  {
    icon: <Utensils className="w-8 h-8 text-secondary" />,
    title: "Zero Waste",
    description: "Use it before you lose it. Earth will thank you.",
    color: "from-secondary/20 to-secondary/5"
  },
  {
    icon: <PiggyBank className="w-8 h-8 text-accent" />,
    title: "Save Money",
    description: "Stop buying duplicates. Cook with what you have.",
    color: "from-accent/20 to-accent/5"
  },
  {
    icon: <Globe className="w-8 h-8 text-orange-500" />,
    title: "Global Cuisines",
    description: "Travel the world from your kitchen counter.",
    color: "from-orange-500/20 to-orange-500/5"
  },
];

export const Home = () => {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Playful Ambient Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px] mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-secondary/10 blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-accent/10 blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
          className="max-w-5xl mx-auto z-10 pt-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-wide text-slate-800">
              PANTRYCHEF AI 2.0 IS HERE
            </span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
            Cook amazing meals <br className="hidden md:block" />
            with what you <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent blur-2xl opacity-20 rounded-full" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                already have.
              </span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop staring at an empty fridge. Discover delicious recipes using the ingredients you already own. Play with your food again.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ingredients"
                className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-3">
                  <ChefHat className="w-6 h-6" />
                  Start Cooking
                </span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ingredients"
                className="flex items-center justify-center px-10 py-5 bg-white/80 backdrop-blur-xl border-2 border-slate-200 text-slate-900 rounded-[2rem] font-bold text-xl shadow-lg transition-all hover:bg-white"
              >
                Browse Library
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:flex absolute top-[20%] left-[10%] w-24 h-24 bg-white rounded-3xl shadow-2xl items-center justify-center border border-slate-100"
        >
          <span className="text-4xl">🥑</span>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden lg:flex absolute top-[30%] right-[10%] w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl items-center justify-center border border-slate-100"
        >
          <span className="text-6xl">🥩</span>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full relative z-10 pb-32 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", bounce: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} rounded-bl-[100px] -z-10 transition-transform group-hover:scale-150 duration-500`} />
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-6 border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
