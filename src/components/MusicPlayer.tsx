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
  const { currentSong, isPlaying, togglePlay, nextSong, favorites, toggleFavorite } = useApp();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (!currentSong || !window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: currentSong.youtubeId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              nextSong();
            }
          },
          onReady: (event: any) => {
            if (isPlaying) {
              event.target.playVideo();
            }
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [currentSong?.id]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.playVideo) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 left-0 right-0 z-50 px-6"
    >
      <div className="max-w-4xl mx-auto glass rounded-[2.5rem] p-4 flex items-center justify-between gap-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
        {/* Song Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="relative group">
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className={cn(
                "w-16 h-16 rounded-2xl object-cover shadow-xl transition-all duration-700",
                isPlaying ? "scale-105 rotate-3" : "scale-100 rotate-0"
              )}
              referrerPolicy="no-referrer"
            />
            {isPlaying && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-display font-bold text-lg tracking-tight truncate">{currentSong.title}</h4>
            <p className="text-xs font-medium text-white/30 uppercase tracking-widest truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={togglePlay}
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button
            onClick={nextSong}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3 flex-1 justify-end">
          <button
            onClick={() => toggleFavorite(currentSong.id)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Heart className={cn("w-4 h-4", favorites.includes(currentSong.id) ? "fill-red-500 text-red-500" : "text-white/40")} />
          </button>
          <a
            href={currentSong.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white/40"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Hidden YouTube Player Container */}
      <div id="youtube-player" className="hidden" />
    </motion.div>
  );
};
