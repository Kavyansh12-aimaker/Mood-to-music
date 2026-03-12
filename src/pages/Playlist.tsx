import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Music, ExternalLink } from 'lucide-react';
import { useApp } from '../AppContext';
import { CATEGORIES, SONGS } from '../constants';
import { SongCard } from '../components/SongCard';
import { cn } from '../utils';

export const Playlist: React.FC = () => {
  const { currentCategory, setCategory, searchQuery, spotifyPlaylists, isSpotifyConnected } = useApp();
  const activeCategory = CATEGORIES.find(c => c.id === currentCategory);

  const filteredSongs = SONGS.filter(song => {
    const matchesCategory = song.category === currentCategory;
    const matchesSearch = 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setCategory(null)}
        className="flex items-center gap-3 text-white/40 hover:text-white mb-12 group transition-colors"
      >
        <div className="w-8 h-8 glass rounded-full flex items-center justify-center group-hover:-translate-x-1 transition-transform">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="text-xs font-display font-bold tracking-widest uppercase">Back to Activities</span>
      </motion.button>

      <div className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden glass shadow-2xl group"
        >
          <img 
            src={activeCategory?.bannerUrl} 
            alt={activeCategory?.label}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className={cn("absolute inset-0 opacity-70 bg-gradient-to-t from-black via-black/40 to-transparent")} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-white/20" />
              <span className="text-xs font-display font-bold tracking-[0.4em] uppercase text-white/60">Curated Playlist</span>
              <div className="h-px w-8 bg-white/20" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold leading-none tracking-tighter uppercase mb-6"
            >
              {activeCategory?.label}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed mb-10"
            >
              {activeCategory?.description}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl px-10 py-5 rounded-3xl"
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-display font-bold tracking-widest uppercase text-white/40 mb-1">Tracks</span>
                <span className="text-2xl font-display font-bold">{filteredSongs.length}</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-display font-bold tracking-widest uppercase text-white/40 mb-1">Duration</span>
                <span className="text-2xl font-display font-bold">~45m</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
          <Music className="w-6 h-6 text-white/40" />
          Featured Tracks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSongs.length > 0 ? (
              filteredSongs.map(song => (
                <SongCard key={song.id} song={song} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center glass rounded-[3rem]"
              >
                <Music className="w-16 h-16 text-white/10 mx-auto mb-6" />
                <p className="text-xl font-display font-medium text-white/30">No matches found for your search.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isSpotifyConnected && spotifyPlaylists.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Spotify Playlists</h2>
              <p className="text-white/40">Real-time recommendations from Spotify for "{activeCategory?.label}"</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {spotifyPlaylists.map((playlist: any) => (
              <motion.a
                key={playlist.id}
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8 }}
                className="group block"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 glass">
                  <img 
                    src={playlist.images?.[0]?.url} 
                    alt={playlist.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <ExternalLink className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-sm line-clamp-1 group-hover:text-[#1DB954] transition-colors">{playlist.name}</h3>
                <p className="text-xs text-white/40 line-clamp-1">{playlist.owner.display_name}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
