import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { cn } from '../utils';

export const Home: React.FC = () => {
  const { setCategory } = useApp();

  return (
    <div className="min-h-screen bg-ink text-white selection:bg-gold/30">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=2000" 
            alt="Classical Art" 
            className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold font-mono text-xs tracking-[0.5em] uppercase mb-6 block">Est. 2026 / Curated Sound</span>
            <h1 className="text-[15vw] md:text-[10vw] font-display leading-[0.8] mb-12 italic">
              Mood <br />
              <span className="ml-[10vw] md:ml-[15vw] not-italic">To Music</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col md:flex-row items-end justify-between gap-12"
          >
            <p className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed">
              A modern discovery platform designed to soundtrack your life's activities. 
              We curate the perfect auditory experience for every moment, from high-energy bangers to deep atmospheric sounds.
            </p>
            <div className="flex flex-col items-end">
              <span className="text-gold font-display text-6xl mb-2">06</span>
              <span className="text-xs tracking-widest-editorial uppercase text-white/40">Curated Moods</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex items-center justify-between mb-20 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-6xl font-display italic">Select Your Vibe</h2>
          <span className="text-xs tracking-widest-editorial uppercase text-white/40">Scroll to Explore</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {CATEGORIES.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category} 
              index={index} 
              onClick={() => setCategory(category.id)} 
            />
          ))}
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-40 px-6 text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-gold text-4xl mb-8 block">“</span>
          <p className="text-3xl md:text-5xl font-display italic leading-tight mb-12">
            Music is the shorthand of emotion.
          </p>
          <span className="text-xs tracking-widest-editorial uppercase text-white/40">— Leo Tolstoy</span>
        </motion.div>
      </section>
    </div>
  );
};

const CategoryCard: React.FC<{ category: Category; index: number; onClick: () => void }> = ({ category, index, onClick }) => {
  const gridClasses = [
    "md:col-span-7 md:row-span-2",
    "md:col-span-5 md:row-span-1",
    "md:col-span-5 md:row-span-2",
    "md:col-span-7 md:row-span-1",
    "md:col-span-6 md:row-span-1",
    "md:col-span-6 md:row-span-1",
  ];

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden text-left border border-white/10 aspect-[4/3] md:aspect-auto",
        gridClasses[index]
      )}
    >
      <div className="absolute inset-0 z-0">
        <img 
          src={category.bannerUrl} 
          alt={category.label} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-60" 
        />
        <div className="absolute inset-0 bg-ink/60 group-hover:bg-ink/20 transition-all duration-700" />
      </div>
      
      <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-gold font-mono text-sm">0{index + 1}</span>
          <div className="w-px h-12 bg-gold/30 group-hover:h-20 transition-all duration-700" />
        </div>
        
        <div>
          <h3 className="text-4xl md:text-5xl font-display mb-4 group-hover:italic transition-all duration-500">{category.label}</h3>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed group-hover:text-white/80 transition-colors">
            {category.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
};
