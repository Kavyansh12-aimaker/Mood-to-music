import React, { createContext, useContext, useState, useEffect } from 'react';
import { CategoryId, Song, AppState, UserProfile } from './types';
import { SONGS } from './constants';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AppContextType extends AppState {
  setCategory: (category: CategoryId | null) => void;
  toggleFavorite: (songId: string) => void;
  playSong: (song: Song) => Promise<void>;
  togglePlay: () => Promise<void>;
  nextSong: () => Promise<void>;
  resetTrackCount: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  connectSpotify: () => Promise<void>;
  logoutSpotify: () => Promise<void>;
  fetchPlaylists: (query: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user: UserProfile | null;
  isAuthLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentCategory: null,
    favorites: JSON.parse(localStorage.getItem('moodtomusic_favorites') || '[]'),
    currentSong: null,
    isPlaying: false,
    trackCount: 0,
    isSpotifyConnected: false,
    spotifyUser: null,
    spotifyPlaylists: [],
    playbackSource: 'youtube',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsAuthLoading(true);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserProfile);
        } else {
          const newUser: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            createdAt: new Date().toISOString(),
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            ...newUser,
            createdAt: serverTimestamp(),
          });
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('moodtomusic_favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    checkSpotifyStatus();
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SPOTIFY_AUTH_SUCCESS') {
        checkSpotifyStatus();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const checkSpotifyStatus = async () => {
    try {
      const res = await fetch('/api/auth/spotify/status');
      const { connected } = await res.json();
      if (connected) {
        const userRes = await fetch('/api/spotify/me');
        const user = await userRes.json();
        setState(prev => ({ ...prev, isSpotifyConnected: true, spotifyUser: user }));
      } else {
        setState(prev => ({ ...prev, isSpotifyConnected: false, spotifyUser: null }));
      }
    } catch (error) {
      console.error('Failed to check Spotify status:', error);
    }
  };

  const connectSpotify = async () => {
    try {
      const res = await fetch('/api/auth/spotify/url');
      const { url } = await res.json();
      window.open(url, 'spotify_auth', 'width=600,height=700');
    } catch (error) {
      console.error('Failed to get Spotify auth URL:', error);
    }
  };

  const logoutSpotify = async () => {
    try {
      await fetch('/api/auth/spotify/logout', { method: 'POST' });
      setState(prev => ({ ...prev, isSpotifyConnected: false, spotifyUser: null }));
    } catch (error) {
      console.error('Failed to logout from Spotify:', error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const setCategory = (category: CategoryId | null) => {
    setState(prev => ({ ...prev, currentCategory: category }));
    if (category) {
      fetchPlaylists(category);
    }
  };

  const fetchPlaylists = async (query: string) => {
    if (!state.isSpotifyConnected) return;
    
    try {
      const res = await fetch(`/api/spotify/playlists?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setState(prev => ({ ...prev, spotifyPlaylists: data.items }));
      }
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    }
  };

  const toggleFavorite = (songId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(songId)
        ? prev.favorites.filter(id => id !== songId)
        : [...prev.favorites, songId]
    }));
  };

  const playSong = async (song: Song) => {
    let source: 'youtube' | 'spotify' = 'youtube';

    // 1. Try to play via Spotify API if connected
    if (state.isSpotifyConnected) {
      try {
        const trackId = song.spotifyUrl.split('/track/')[1]?.split('?')[0];
        if (trackId) {
          const res = await fetch('/api/spotify/play', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uri: `spotify:track:${trackId}` })
          });
          
          if (res.ok) {
            source = 'spotify';
          } else {
            // If failed (e.g. no active device), fallback to YouTube in-app
            source = 'youtube';
          }
        } else {
          source = 'youtube';
        }
      } catch (error) {
        console.error('Failed to play via Spotify API:', error);
        source = 'youtube';
      }
    } else {
      // Not connected to Spotify, use YouTube in-app
      source = 'youtube';
    }
    
    setState(prev => ({ 
      ...prev, 
      currentSong: song, 
      isPlaying: true,
      trackCount: prev.trackCount + 1,
      playbackSource: source
    }));
  };

  const togglePlay = async () => {
    const newIsPlaying = !state.isPlaying;
    
    if (state.playbackSource === 'spotify' && state.isSpotifyConnected) {
      try {
        const endpoint = newIsPlaying ? '/api/spotify/resume' : '/api/spotify/pause';
        await fetch(endpoint, { method: 'PUT' });
      } catch (error) {
        console.error('Failed to toggle Spotify playback:', error);
      }
    }

    setState(prev => ({ ...prev, isPlaying: newIsPlaying }));
  };

  const nextSong = async () => {
    if (!state.currentSong) return;
    const currentPlaylist = SONGS.filter(s => s.category === state.currentCategory);
    if (currentPlaylist.length === 0) return;
    
    const currentIndex = currentPlaylist.findIndex(s => s.id === state.currentSong?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    const nextSongObj = currentPlaylist[nextIndex];
    
    await playSong(nextSongObj);
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
      setSearchQuery,
      connectSpotify,
      logoutSpotify,
      fetchPlaylists,
      loginWithGoogle,
      logout,
      user,
      isAuthLoading
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
