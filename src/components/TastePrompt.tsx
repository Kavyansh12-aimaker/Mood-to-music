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
        <div className="max-w-md w-full glass rounded-[3rem] p-10 relative shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-[80px]" />

          <button 
            onClick={resetTrackCount}
            className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/40" />
          </button>

          <div className="relative text-center">
            <div className="w-20 h-20 bg-white text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
              <Sparkles className="w-10 h-10" />
            </div>

            <h2 className="text-3xl font-display font-bold tracking-tight mb-4">
              Switch it up?
            </h2>
            
            <p className="text-white/60 leading-relaxed mb-10">
              You've been vibing for a while! Want to explore music for a different activity?
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleReset}
                className="w-full py-5 bg-white text-black rounded-2xl font-display font-bold text-sm tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Music2 className="w-4 h-4" />
                Change Music Taste
              </button>
              
              <button
                onClick={resetTrackCount}
                className="w-full py-5 glass text-white/60 rounded-2xl font-display font-bold text-sm tracking-widest uppercase hover:bg-white/5 transition-all"
              >
                Keep Listening
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
