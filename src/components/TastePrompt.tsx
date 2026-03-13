import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Music2 } from 'lucide-react';
import { useApp } from '../AppContext';

export const TastePrompt: React.FC = () => {
  const { trackCount, resetTrackCount, setCategory } = useApp();

  if (trackCount < 5) return null;

  const handleReset = () => {
    resetTrackCount();
    setCategory(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      >
        <div className="max-w-md w-full bg-ink border border-white/10 rounded-[2rem] p-12 relative shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Background Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

          <button 
            onClick={resetTrackCount}
            className="absolute top-8 right-8 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative text-center">
            <div className="w-20 h-20 bg-gold text-ink rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(197,160,89,0.3)]">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold/30" />
              <span className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase text-gold">Curator's Note</span>
              <div className="h-px w-8 bg-gold/30" />
            </div>

            <h2 className="text-4xl font-display font-bold tracking-tight mb-6 leading-tight">
              Seek a <span className="italic font-normal text-white/40">New Perspective?</span>
            </h2>
            
            <p className="text-white/40 font-sans leading-relaxed mb-12 text-sm">
              You have explored this gallery extensively. Perhaps it is time to shift the atmosphere and discover a different sonic landscape?
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleReset}
                className="w-full py-5 bg-gold text-ink rounded-xl font-sans font-bold text-xs tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Music2 className="w-4 h-4" />
                Change Atmosphere
              </button>
              
              <button
                onClick={resetTrackCount}
                className="w-full py-5 border border-white/10 text-white/30 rounded-xl font-sans font-bold text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-all"
              >
                Remain Here
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
