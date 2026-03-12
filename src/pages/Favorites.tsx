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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="p-3 bg-red-500/20 rounded-2xl">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
          </div>
          <h1 className="text-5xl font-black">Your Favorites</h1>
        </motion.div>
        <p className="text-xl text-white/60">All the tracks you've loved in one place.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {favoriteSongs.length > 0 ? (
            favoriteSongs.map(song => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-white/10"
            >
              <Music className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-xl text-white/40">You haven't added any favorites yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
