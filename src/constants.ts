import { Category, Song } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'party',
    label: 'Party',
    emoji: '🥳',
    gradient: 'from-purple-600 via-pink-500 to-red-500',
    color: '#9333ea',
    description: 'High-energy bangers to get the dance floor moving.',
    bannerUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'travelling',
    label: 'Travelling',
    emoji: '✈️',
    gradient: 'from-blue-400 via-cyan-400 to-teal-400',
    color: '#22d3ee',
    description: 'Perfect companions for your next big adventure.',
    bannerUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'workout',
    label: 'Workout',
    emoji: '💪',
    gradient: 'from-orange-600 via-red-500 to-yellow-500',
    color: '#ea580c',
    description: 'Powerful beats to push your limits and stay motivated.',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'study',
    label: 'Study / Focus',
    emoji: '📚',
    gradient: 'from-indigo-600 via-blue-500 to-cyan-500',
    color: '#4f46e5',
    description: 'Deep, atmospheric sounds to help you stay in the zone.',
    bannerUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'chill',
    label: 'Chill Out',
    emoji: '🌊',
    gradient: 'from-emerald-500 via-teal-400 to-blue-500',
    color: '#10b981',
    description: 'Lofi and acoustic tracks for ultimate relaxation.',
    bannerUrl: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'roadtrip',
    label: 'Road Trip',
    emoji: '🚗',
    gradient: 'from-slate-900 via-zinc-800 to-black',
    color: '#18181b',
    description: 'Classic anthems for the open road and endless horizons.',
    bannerUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=2000'
  }
];

export const SONGS: Song[] = [
  // Party
  { id: 'p1', title: 'Don\'t Stop The Music', artist: 'Rihanna', coverUrl: 'https://picsum.photos/seed/party1/400/400', youtubeId: 'yd8jh9QYfEs', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'party' },
  { id: 'p2', title: 'Titanium', artist: 'David Guetta ft. Sia', coverUrl: 'https://picsum.photos/seed/party2/400/400', youtubeId: 'JRfuAukYTKg', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'party' },
  { id: 'p3', title: 'Levitating', artist: 'Dua Lipa', coverUrl: 'https://picsum.photos/seed/party3/400/400', youtubeId: 'TUVcZfQe-Kw', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'party' },
  { id: 'p4', title: 'Starboy', artist: 'The Weeknd', coverUrl: 'https://picsum.photos/seed/party4/400/400', youtubeId: '34Na4j8AVgA', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'party' },
  { id: 'p5', title: 'Blinding Lights', artist: 'The Weeknd', coverUrl: 'https://picsum.photos/seed/party5/400/400', youtubeId: '4NRXx6U8ABQ', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'party' },
  
  // Travelling
  { id: 't1', title: 'Paradise', artist: 'Coldplay', coverUrl: 'https://picsum.photos/seed/travel1/400/400', youtubeId: '1G4isv_Fylg', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'travelling' },
  { id: 't2', title: 'A Sky Full Of Stars', artist: 'Coldplay', coverUrl: 'https://picsum.photos/seed/travel2/400/400', youtubeId: 'VPRjCeLqMEw', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'travelling' },
  { id: 't3', title: 'Budapest', artist: 'George Ezra', coverUrl: 'https://picsum.photos/seed/travel3/400/400', youtubeId: 'VHrLPs3_1Fs', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'travelling' },
  { id: 't4', title: 'Riptide', artist: 'Vance Joy', coverUrl: 'https://picsum.photos/seed/travel4/400/400', youtubeId: 'uJ_1HMAGw4k', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'travelling' },
  { id: 't5', title: 'Shotgun', artist: 'George Ezra', coverUrl: 'https://picsum.photos/seed/travel5/400/400', youtubeId: 'v_B3qkp4nO4', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'travelling' },

  // Workout
  { id: 'w1', title: 'Till I Collapse', artist: 'Eminem', coverUrl: 'https://picsum.photos/seed/workout1/400/400', youtubeId: 'ytWz0qVvBZ0', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'workout' },
  { id: 'w2', title: 'Stronger', artist: 'Kanye West', coverUrl: 'https://picsum.photos/seed/workout2/400/400', youtubeId: 'PsO6ZnUZI0g', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'workout' },
  { id: 'w3', title: 'POWER', artist: 'Kanye West', coverUrl: 'https://picsum.photos/seed/workout3/400/400', youtubeId: 'L53gjP972MM', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'workout' },
  { id: 'w4', title: 'Can\'t Hold Us', artist: 'Macklemore & Ryan Lewis', coverUrl: 'https://picsum.photos/seed/workout4/400/400', youtubeId: '2zNSgSzhBfM', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'workout' },
  { id: 'w5', title: 'Remember The Name', artist: 'Fort Minor', coverUrl: 'https://picsum.photos/seed/workout5/400/400', youtubeId: 'VDvr08sCPOc', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'workout' },

  // Study
  { id: 'st1', title: 'Lofi Hip Hop Radio', artist: 'Lofi Girl', coverUrl: 'https://picsum.photos/seed/study1/400/400', youtubeId: 'jfKfPfyJRdk', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'study' },
  { id: 'st2', title: 'Weightless', artist: 'Marconi Union', coverUrl: 'https://picsum.photos/seed/study2/400/400', youtubeId: 'UfcAVejslrU', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'study' },
  { id: 'st3', title: 'River Flows In You', artist: 'Yiruma', coverUrl: 'https://picsum.photos/seed/study3/400/400', youtubeId: '7maJOI3QMu0', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'study' },
  { id: 'st4', title: 'Clair de Lune', artist: 'Claude Debussy', coverUrl: 'https://picsum.photos/seed/study4/400/400', youtubeId: 'WNcsANYHIkE', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'study' },
  { id: 'st5', title: 'Experience', artist: 'Ludovico Einaudi', coverUrl: 'https://picsum.photos/seed/study5/400/400', youtubeId: 'hN_q-_nGv4U', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'study' },

  // Chill
  { id: 'c1', title: 'Sunflower', artist: 'Post Malone & Swae Lee', coverUrl: 'https://picsum.photos/seed/chill1/400/400', youtubeId: 'ApXoWvfEYKu', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'chill' },
  { id: 'c2', title: 'Better Together', artist: 'Jack Johnson', coverUrl: 'https://picsum.photos/seed/chill2/400/400', youtubeId: 'u57d4_b_YgI', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'chill' },
  { id: 'c3', title: 'Sunday Best', artist: 'Surfaces', coverUrl: 'https://picsum.photos/seed/chill3/400/400', youtubeId: 'O71fetlkCZo', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'chill' },
  { id: 'c4', title: 'Location', artist: 'Khalid', coverUrl: 'https://picsum.photos/seed/chill4/400/400', youtubeId: '7hJp_K_p_o0', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'chill' },
  { id: 'c5', title: 'Coffee', artist: 'Beabadoobee', coverUrl: 'https://picsum.photos/seed/chill5/400/400', youtubeId: '273eS9jN6CI', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'chill' },

  // Road Trip
  { id: 'rt1', title: 'Life is a Highway', artist: 'Rascal Flatts', coverUrl: 'https://picsum.photos/seed/road1/400/400', youtubeId: '5tXh_M40E84', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'roadtrip' },
  { id: 'rt2', title: 'Hotel California', artist: 'Eagles', coverUrl: 'https://picsum.photos/seed/road2/400/400', youtubeId: '09839DpTctU', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'roadtrip' },
  { id: 'rt3', title: 'Dreams', artist: 'Fleetwood Mac', coverUrl: 'https://picsum.photos/seed/road3/400/400', youtubeId: 'Y3ywicffOj4', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'roadtrip' },
  { id: 'rt4', title: 'Go Your Own Way', artist: 'Fleetwood Mac', coverUrl: 'https://picsum.photos/seed/road4/400/400', youtubeId: '6ul-cZredsY', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'roadtrip' },
  { id: 'rt5', title: 'Fast Car', artist: 'Tracy Chapman', coverUrl: 'https://picsum.photos/seed/road5/400/400', youtubeId: 'AIOAlaac_wc', spotifyUrl: 'https://open.spotify.com/track/0S8fS999_BXs', category: 'roadtrip' },
];
