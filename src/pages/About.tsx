import React from 'react';
import { motion } from 'motion/react';
import { Music2, Github, Twitter, Mail } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 text-center"
      >
        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <span className="text-black font-display font-black text-3xl tracking-tighter">M-M</span>
        </div>
        
        <h1 className="text-5xl font-black mb-6">About Mood To Music</h1>
        <p className="text-xl text-white/60 mb-12 leading-relaxed">
          Mood To Music is a modern discovery platform designed to soundtrack your life's activities. 
          Whether you're hitting the gym, focusing on work, or embarking on a road trip, we curate the perfect auditory experience for every moment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Feature 
            title="Dynamic Themes" 
            description="The entire interface adapts its colors and gradients to match your selected mood."
          />
          <Feature 
            title="Curated Lists" 
            description="Hand-picked tracks for every vibe, from high-energy workouts to late-night study sessions."
          />
          <Feature 
            title="Seamless UI" 
            description="Built with modern technologies for a smooth, app-like experience on any device."
          />
        </div>

        <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/10">
          <SocialLink icon={<Github />} href="#" />
          <SocialLink icon={<Twitter />} href="#" />
          <SocialLink icon={<Mail />} href="#" />
        </div>
      </motion.div>
    </div>
  );
};

const Feature: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="text-left p-6 bg-white/5 rounded-2xl border border-white/5">
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-sm text-white/40 leading-relaxed">{description}</p>
  </div>
);

const SocialLink: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <a 
    href={href} 
    className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white/60 hover:text-white"
  >
    {icon}
  </a>
);
