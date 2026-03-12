import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryId, Song, AppState } from './types';
import { SONGS } from './constants';

interface AppContextType extends AppState {
  setCategory: (category: CategoryId | null) => void;
  toggleFavorite: (songId: string) => void;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  resetTrackCount: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentCategory: null,
    favorites: JSON.parse(localStorage.getItem('moodtomusic_favorites') || '[]'),
    currentSong: null,
    isPlaying: false,
    trackCount: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('moodtomusic_favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const setCategory = (category: CategoryId | null) => {
    setState(prev => ({ ...prev, currentCategory: category }));
  };

  const toggleFavorite = (songId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(songId)
        ? prev.favorites.filter(id => id !== songId)
        : [...prev.favorites, songId]
    }));
  };

  const playSong = (song: Song) => {
    // Redirect to Spotify
    window.open(song.spotifyUrl, '_blank');
    
    setState(prev => ({ 
      ...prev, 
      currentSong: song, 
      isPlaying: true,
      trackCount: prev.trackCount + 1
    }));
  };

  const togglePlay = () => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const nextSong = () => {
    if (!state.currentSong) return;
    const currentPlaylist = SONGS.filter(s => s.category === state.currentCategory);
    if (currentPlaylist.length === 0) return;
    
    const currentIndex = currentPlaylist.findIndex(s => s.id === state.currentSong?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    
    setState(prev => ({ 
      ...prev, 
      currentSong: currentPlaylist[nextIndex], 
      isPlaying: true,
      trackCount: prev.trackCount + 1
    }));
  };

  const resetTrackCount = () => {
    setState(prev => ({ ...prev, trackCount: 0 }));
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      setCategory, 
      toggleFavorite, 
      playSong, 
      togglePlay, 
      nextSong,
      resetTrackCount,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
