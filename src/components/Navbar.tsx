import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Home, Info, Music2, LogOut, User, LogIn, Archive, ScrollText, Compass } from 'lucide-react';
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
    isAuthLoading,
    setCategory,
    currentCategory
  } = useApp();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-ink/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-20 h-24 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link 
            to="/" 
            onClick={() => setCategory(null)}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gold text-ink rounded-xl flex items-center justify-center font-display font-bold text-xl group-hover:scale-110 transition-transform">
              M
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter group-hover:text-gold transition-colors">
              MUSE<span className="italic font-normal text-white/40">SONIC</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/"
              onClick={() => setCategory(null)}
              className={cn(
                "text-[10px] font-sans font-bold tracking-[0.3em] uppercase transition-all hover:text-gold flex items-center gap-2",
                location.pathname === '/' && !currentCategory ? "text-gold" : "text-white/40"
              )}
            >
              <Compass className="w-3 h-3" />
              Exhibition
            </Link>
            <Link 
              to="/favorites"
              className={cn(
                "text-[10px] font-sans font-bold tracking-[0.3em] uppercase transition-all hover:text-gold flex items-center gap-2",
                location.pathname === '/favorites' ? "text-gold" : "text-white/40"
              )}
            >
              <Archive className="w-3 h-3" />
              Archive
            </Link>
            <Link 
              to="/about"
              className={cn(
                "text-[10px] font-sans font-bold tracking-[0.3em] uppercase transition-all hover:text-gold flex items-center gap-2",
                location.pathname === '/about' ? "text-gold" : "text-white/40"
              )}
            >
              <ScrollText className="w-3 h-3" />
              Manifesto
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30 group-focus-within:text-gold transition-colors" />
            <input
              type="text"
              placeholder="Search Archive..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/[0.03] border border-white/[0.08] rounded-full py-2 pl-10 pr-6 w-40 focus:w-56 focus:bg-white/[0.05] focus:border-gold/30 focus:outline-none transition-all duration-700 placeholder:text-white/10 text-[10px] font-sans tracking-widest uppercase"
            />
          </div>

          <div className="h-8 w-px bg-white/10 mx-2" />

          {isSpotifyConnected ? (
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 border border-gold/20 rounded-full bg-gold/5">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-gold">Spotify Linked</span>
              <button 
                onClick={logoutSpotify}
                className="ml-1 text-white/20 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectSpotify}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-gold text-ink rounded-full font-sans font-bold text-[10px] tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Connect Spotify
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-sans font-bold tracking-widest uppercase text-white/80">{user.displayName}</p>
                <button 
                  onClick={logout}
                  className="text-[9px] font-sans font-bold tracking-widest uppercase text-white/30 hover:text-gold transition-colors"
                >
                  Sign Out
                </button>
              </div>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                alt={user.displayName || ''} 
                className="w-10 h-10 rounded-xl border border-gold/30 p-0.5"
              />
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              disabled={isAuthLoading}
              className="flex items-center gap-2 px-6 py-2.5 border border-white/10 hover:border-gold/30 rounded-full font-sans font-bold text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-gold/5"
            >
              {isAuthLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
