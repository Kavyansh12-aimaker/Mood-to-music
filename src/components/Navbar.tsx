import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Home, Info, Music2, LogOut, User, LogIn } from 'lucide-react';
import { useApp } from '../AppContext';
import { cn } from '../utils';

export const Navbar: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    isSpotifyConnected, 
    spotifyUser, 
    connectSpotify, 
    logoutSpotify,
    user,
    loginWithGoogle,
    logout,
    isAuthLoading
  } = useApp();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl group-hover:rotate-6 transition-transform duration-500 shadow-xl">
            <span className="text-black font-display font-black text-lg tracking-tighter">M-M</span>
          </div>
          <span className="text-xl font-display font-bold tracking-tight uppercase">Mood To Music</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 p-1 glass rounded-full">
          <NavLink to="/" label="Discover" active={location.pathname === '/'} />
          <NavLink to="/favorites" label="Library" active={location.pathname === '/favorites'} />
          <NavLink to="/about" label="About" active={location.pathname === '/about'} />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] rounded-full py-2.5 pl-11 pr-6 w-48 focus:w-64 focus:bg-white/[0.08] focus:outline-none transition-all duration-500 placeholder:text-white/20"
            />
          </div>

          {isSpotifyConnected ? (
            <div className="flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1">
              {spotifyUser?.images?.[0]?.url ? (
                <img src={spotifyUser.images[0].url} alt="Profile" className="w-8 h-8 rounded-full border border-white/20" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
              <span className="text-sm font-medium hidden lg:block">{spotifyUser?.display_name}</span>
              <button 
                onClick={logoutSpotify}
                className="ml-2 p-1 hover:text-red-400 transition-colors"
                title="Logout from Spotify"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={connectSpotify}
              className="px-6 py-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-sm rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.3)] hover:shadow-[0_0_25px_rgba(29,185,84,0.5)]"
            >
              <Music2 className="w-4 h-4" />
              <span className="hidden lg:inline">Connect Spotify</span>
            </button>
          )}

          <div className="w-px h-8 bg-white/10 mx-2" />

          {isAuthLoading ? (
            <div className="w-10 h-10 glass rounded-full animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
              <span className="text-sm font-medium hidden lg:block">{user.displayName}</span>
              <button 
                onClick={logout}
                className="ml-2 p-1 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={loginWithGoogle}
              className="px-6 py-2.5 bg-white hover:bg-white/90 text-black font-bold text-sm rounded-full transition-all duration-300 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}

          <button className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; label: string; active: boolean }> = ({ to, label, active }) => (
  <Link
    to={to}
    className={cn(
      "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
      active ? "bg-white text-black" : "text-white/50 hover:text-white"
    )}
  >
    {label}
  </Link>
);
