import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music } from 'lucide-react';
import { useApp } from '../AppContext';
import { SONGS } from '../constants';
import { SongCard } from '../components/SongCard';

export const Favorites: React.FC = () => {
  const { favorites, searchQuery } = useApp();
  
  const favoriteSongs = SONGS.filter(song => {
    const isFavorite = favorites.includes(song.id);
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return isFavorite && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-20 py-24">
      <header className="mb-20 relative">
        <div className="absolute -left-12 top-0 text-[12rem] font-display font-black text-white/[0.02] select-none pointer-events-none leading-none">
          02
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-gold">Collection</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-[0.9]">
            Your <span className="italic font-normal text-white/40">Favorites</span>
          </h1>
          <p className="text-xl text-white/40 max-w-xl font-sans leading-relaxed">
            A curated selection of tracks that resonate with your spirit. All your loved melodies, preserved in one place.
          </p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        <AnimatePresence mode="popLayout">
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map(song => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center border border-white/5 rounded-[3rem] bg-white/[0.02]"
            >
              <Music className="w-12 h-12 text-gold/20 mx-auto mb-6" />
              <p className="text-2xl font-display italic text-white/20">Your gallery is currently empty.</p>
              <p className="text-sm text-white/10 mt-2 uppercase tracking-widest">Explore and heart tracks to see them here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
