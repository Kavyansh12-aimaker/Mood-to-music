import React from 'react';
import { motion } from 'motion/react';
import { Play, Heart, Share2 } from 'lucide-react';
import { Song } from '../types';
import { useApp } from '../AppContext';
import { cn } from '../utils';

export const SongCard: React.FC<{ song: Song }> = ({ song }) => {
  const { currentSong, isPlaying, playSong, toggleFavorite, favorites } = useApp();
  const isCurrent = currentSong?.id === song.id;

  const handleShare = () => {
    const url = `https://www.youtube.com/watch?v=${song.youtubeId}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-[2rem] glass group-hover:border-white/20 transition-all duration-500">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => playSong(song)}
            className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
          >
            {isCurrent && isPlaying ? (
              <div className="flex gap-1 items-end h-5">
                {[0, 150, 300].map(delay => (
                  <div key={delay} className="w-1 bg-black animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => toggleFavorite(song.id)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Heart className={cn("w-4 h-4", favorites.includes(song.id) ? "fill-red-500 text-red-500" : "text-white")} />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-display font-bold tracking-[0.2em] uppercase text-white/30">Track</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <h3 className="font-display font-bold text-xl tracking-tight truncate group-hover:text-glow transition-all">{song.title}</h3>
        <p className="text-sm text-white/30 font-medium">{song.artist}</p>
      </div>
    </motion.div>
  );
};
