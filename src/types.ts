import { LucideIcon } from 'lucide-react';

export type CategoryId = 'party' | 'travelling' | 'study' | 'workout' | 'chill' | 'roadtrip';

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  gradient: string;
  color: string;
  description: string;
  bannerUrl: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  youtubeId: string;
  spotifyUrl: string;
  category: CategoryId;
}

export interface AppState {
  currentCategory: CategoryId | null;
  favorites: string[];
  currentSong: Song | null;
  isPlaying: boolean;
  trackCount: number;
  isSpotifyConnected: boolean;
  spotifyUser: any | null;
  spotifyPlaylists: any[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: string;
}
