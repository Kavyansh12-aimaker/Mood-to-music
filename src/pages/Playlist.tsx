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
    <div className="min-h-screen bg-ink text-white selection:bg-gold/30">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setCategory(null)}
          className="flex items-center gap-3 text-white/40 hover:text-gold mb-12 group transition-colors"
        >
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-gold/50 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-widest-editorial uppercase">Back to Gallery</span>
        </motion.button>

        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-8"
            >
              <span className="text-gold font-mono text-xs tracking-[0.5em] uppercase mb-6 block">Curated Collection</span>
              <h1 className="text-[12vw] md:text-[8vw] font-display leading-none italic mb-8">
                {activeCategory?.label}
              </h1>
              <p className="text-xl text-white/40 max-w-2xl font-light leading-relaxed">
                {activeCategory?.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-4 flex flex-col items-end border-l border-white/10 pl-12"
            >
              <div className="flex flex-col items-end mb-8">
                <span className="text-gold font-display text-6xl mb-2">{filteredSongs.length}</span>
                <span className="text-xs tracking-widest-editorial uppercase text-white/40">Selected Tracks</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-gold font-display text-6xl mb-2">~45</span>
                <span className="text-xs tracking-widest-editorial uppercase text-white/40">Minutes</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mt-20 aspect-[21/9] overflow-hidden border border-white/10"
          >
            <img 
              src={activeCategory?.bannerUrl} 
              alt={activeCategory?.label}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="mb-32">
          <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl font-display italic flex items-center gap-4">
              <Music className="w-8 h-8 text-gold" />
              The Soundtrack
            </h2>
            <span className="text-xs tracking-widest-editorial uppercase text-white/40">Exhibition</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredSongs.length > 0 ? (
                filteredSongs.map(song => (
                  <SongCard key={song.id} song={song} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-40 text-center border border-dashed border-white/10"
                >
                  <Music className="w-16 h-16 text-white/5 mx-auto mb-6" />
                  <p className="text-xl font-display italic text-white/20">No archives match your inquiry.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {isSpotifyConnected && spotifyPlaylists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-40"
          >
            <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
              <div>
                <h2 className="text-4xl font-display italic mb-2">Spotify Archives</h2>
                <p className="text-white/40 font-light">External recommendations for "{activeCategory?.label}"</p>
              </div>
              <span className="text-xs tracking-widest-editorial uppercase text-white/40">Collaborations</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {spotifyPlaylists.map((playlist: any) => (
                <motion.a
                  key={playlist.id}
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -10 }}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden mb-6 border border-white/10">
                    <img 
                      src={playlist.images?.[0]?.url} 
                      alt={playlist.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ExternalLink className="w-6 h-6 text-ink" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-lg italic line-clamp-1 group-hover:text-gold transition-colors">{playlist.name}</h3>
                  <p className="text-xs tracking-widest-editorial uppercase text-white/30 mt-2">{playlist.owner.display_name}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
