import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { CATEGORIES } from '../constants';
import { TastePrompt } from './TastePrompt';
import { cn } from '../utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentCategory } = useApp();
  const activeCategory = CATEGORIES.find(c => c.id === currentCategory);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white selection:bg-white/30">
      <TastePrompt />
      
      {/* Dynamic Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory || 'default'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 -z-10 bg-[#050505]"
        >
          <div className={cn(
            "absolute inset-0 opacity-20 blur-[120px] transition-all duration-1000",
            activeCategory?.id === 'party' && "bg-gradient-to-tr from-purple-600/40 via-pink-600/20 to-transparent",
            activeCategory?.id === 'travelling' && "bg-gradient-to-tr from-blue-500/40 via-cyan-500/20 to-transparent",
            activeCategory?.id === 'workout' && "bg-gradient-to-tr from-red-600/40 via-orange-600/20 to-transparent",
            activeCategory?.id === 'study' && "bg-gradient-to-tr from-emerald-500/40 via-teal-500/20 to-transparent",
            activeCategory?.id === 'chill' && "bg-gradient-to-tr from-indigo-500/40 via-blue-500/20 to-transparent",
            activeCategory?.id === 'roadtrip' && "bg-gradient-to-tr from-violet-600/40 via-fuchsia-600/20 to-transparent",
            !currentCategory && "bg-gradient-to-tr from-gold/20 via-zinc-900/20 to-transparent"
          )} />
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[100px]" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: '110vh', 
              x: `${Math.random() * 100}vw`,
              opacity: 0,
            }}
            animate={{ 
              y: '-20vh',
              opacity: [0, 0.15, 0.15, 0],
            }}
            transition={{ 
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          />
        ))}
      </div>

      <main className="relative z-10 pb-32">
        {children}
      </main>
    </div>
  );
};
