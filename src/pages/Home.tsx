import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { cn } from '../utils';

export const Home: React.FC = () => {
  const { setCategory } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <header className="mb-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-display font-semibold tracking-[0.3em] uppercase text-white/40">The Experience</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[12vw] md:text-[8vw] font-display font-bold leading-[0.85] tracking-tighter text-center uppercase mb-12"
        >
          Soundtrack <br />
          <span className="text-white/20">Your Life</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left"
        >
          <p className="text-lg text-white/40 max-w-md leading-relaxed">
            A curated auditory journey designed for every moment. Select what you're doing to begin.
          </p>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="flex -space-x-3">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-zinc-800 flex items-center justify-center text-lg overflow-hidden">
                <img src={c.bannerUrl} alt={c.label} className="w-full h-full object-cover opacity-50" />
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[240px]">
        {CATEGORIES.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} onClick={() => setCategory(category.id)} />
        ))}
      </div>
    </div>
  );
};

const CategoryCard: React.FC<{ category: Category; index: number; onClick: () => void }> = ({ category, index, onClick }) => {
  const gridClasses = [
    "md:col-span-8 md:row-span-2",
    "md:col-span-4 md:row-span-1",
    "md:col-span-4 md:row-span-2",
    "md:col-span-4 md:row-span-1",
    "md:col-span-4 md:row-span-1",
    "md:col-span-4 md:row-span-1",
  ];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative rounded-[2rem] overflow-hidden text-left glass transition-all duration-500",
        gridClasses[index]
      )}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
      
      <div className="relative h-full p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-display font-bold tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors">
            0{index + 1} / Activity
          </span>
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-700">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${category.gradient}`} />
          </div>
        </div>
        
        <div>
          <h3 className="text-4xl font-display font-bold mb-3 tracking-tight">{category.label}</h3>
          <p className="text-white/30 text-sm max-w-[240px] leading-relaxed group-hover:text-white/60 transition-colors">
            {category.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
};
