import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, Heart, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../AppContext';
import { cn } from '../utils';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const MusicPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, nextSong, favorites, toggleFavorite, playbackSource } = useApp();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (!currentSong || !window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        try {
          playerRef.current.loadVideoById(currentSong.youtubeId);
          if (isPlaying && playbackSource === 'youtube') {
            playerRef.current.playVideo();
          } else {
            playerRef.current.pauseVideo();
          }
          return;
        } catch (e) {
          console.error('Error loading video by ID, recreating player:', e);
          playerRef.current.destroy();
        }
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: currentSong.youtubeId,
        playerVars: {
          autoplay: isPlaying && playbackSource === 'youtube' ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              nextSong();
            }
          },
          onReady: (event: any) => {
            if (isPlaying && playbackSource === 'youtube') {
              event.target.playVideo();
            }
          },
          onError: (event: any) => {
            console.error('YouTube Player Error:', event.data);
            // Fallback: if YouTube fails, maybe open Spotify URL as a last resort
            // or just skip to next
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          initPlayer();
          clearInterval(checkYT);
        }
      }, 100);
      return () => clearInterval(checkYT);
    }
  }, [currentSong?.id]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      if (isPlaying && playbackSource === 'youtube') {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, playbackSource]);

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-0 right-0 z-50 px-6"
    >
      <div className="max-w-4xl mx-auto bg-ink/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex items-center justify-between gap-6 shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
        {/* Song Info */}
        <div className="flex items-center gap-5 min-w-0 flex-1">
          <div className="relative group">
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className={cn(
                "w-16 h-16 rounded-xl object-cover shadow-2xl transition-all duration-1000",
                isPlaying ? "scale-105" : "scale-100 grayscale"
              )}
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center shadow-lg">
                <div className="w-1.5 h-1.5 bg-ink rounded-full animate-pulse" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-sans font-bold tracking-[0.4em] uppercase text-gold">Now Playing</span>
            </div>
            <h4 className="font-display font-bold text-lg tracking-tight truncate">{currentSong.title}</h4>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-sans font-medium text-white/30 uppercase tracking-[0.2em] truncate italic">{currentSong.artist}</p>
              <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 uppercase tracking-tighter">
                {playbackSource}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8">
          <button
            onClick={togglePlay}
            className="w-14 h-14 bg-gold text-ink rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)]"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button
            onClick={nextSong}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-4 flex-1 justify-end">
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all"
          >
            <Heart className={cn("w-4 h-4 transition-colors", favorites.includes(currentSong.id) ? "fill-gold text-gold" : "text-white/40")} />
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${currentSong.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all text-white/40"
            title="Play on YouTube"
          >
            <div className="relative">
              <ExternalLink className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 text-[6px] font-bold text-red-500">YT</span>
            </div>
          </a>
          <a
            href={currentSong.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-all text-white/40"
            title="Open on Spotify"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hidden YouTube Player Container */}
      <div className="fixed bottom-0 right-0 w-1 h-1 opacity-0 pointer-events-none">
        <div id="youtube-player" />
      </div>
    </motion.div>
  );
};
