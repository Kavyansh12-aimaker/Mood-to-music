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
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-[1.5rem] bg-paper/5 border border-white/5 group-hover:border-gold/30 transition-all duration-700">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-8 group-hover:translate-y-0">
          <button
            onClick={() => playSong(song)}
            className="w-16 h-16 bg-gold text-ink rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(197,160,89,0.3)]"
          >
            {isCurrent && isPlaying ? (
              <div className="flex gap-1 items-end h-5">
                {[0, 150, 300].map(delay => (
                  <div key={delay} className="w-1 bg-ink animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>
        </div>

        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => toggleFavorite(song.id)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all"
          >
            <Heart className={cn("w-4 h-4 transition-colors", favorites.includes(song.id) ? "fill-gold text-gold" : "text-white")} />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[9px] font-sans font-bold tracking-[0.3em] uppercase text-gold/60">Opus {song.id.slice(-2)}</span>
          <div className="h-px flex-1 bg-gold/10" />
        </div>
        <h3 className="font-display font-bold text-xl tracking-tight truncate group-hover:text-gold transition-colors duration-500">{song.title}</h3>
        <p className="text-sm text-white/30 font-sans mt-1 italic">{song.artist}</p>
      </div>
    </motion.div>
  );
};
