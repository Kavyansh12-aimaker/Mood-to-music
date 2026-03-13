import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Mail } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-ink text-white selection:bg-gold/30">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="md:col-span-5 relative"
          >
            <div className="sticky top-32">
              <div className="aspect-[3/4] overflow-hidden border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000" 
                  alt="Classical Sculpture" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="mt-8 flex gap-6">
                <SocialLink icon={<Github className="w-5 h-5" />} href="#" />
                <SocialLink icon={<Twitter className="w-5 h-5" />} href="#" />
                <SocialLink icon={<Mail className="w-5 h-5" />} href="#" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-7"
          >
            <span className="text-gold font-mono text-xs tracking-[0.5em] uppercase mb-6 block">Our Philosophy</span>
            <h1 className="text-[10vw] md:text-[8vw] font-display leading-none mb-12 italic">
              About <br />
              <span className="ml-[4vw] not-italic">Us</span>
            </h1>

            <div className="space-y-12 text-lg text-white/60 font-light leading-relaxed">
              <p>
                Mood To Music is a modern discovery platform designed to soundtrack your life's activities. 
                Whether you're hitting the gym, focusing on work, or embarking on a road trip, we curate the perfect auditory experience for every moment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                <Feature 
                  num="01"
                  title="Dynamic Themes" 
                  description="The entire interface adapts its colors and gradients to match your selected mood, creating an immersive sensory experience."
                />
                <Feature 
                  num="02"
                  title="Curated Lists" 
                  description="Hand-picked tracks for every vibe, from high-energy workouts to late-night study sessions, ensuring quality over quantity."
                />
              </div>

              <div className="pt-12">
                <h3 className="text-3xl font-display italic mb-6 text-white">The Sound of Culture</h3>
                <p>
                  We believe that music is not just background noise, but a vital part of the human experience. 
                  Our mission is to bridge the gap between historic culture and modern digital presentation, 
                  providing a gallery-like experience for your ears.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Feature: React.FC<{ num: string; title: string; description: string }> = ({ num, title, description }) => (
  <div className="space-y-4">
    <span className="text-gold font-display text-4xl">{num}</span>
    <h3 className="font-display text-2xl text-white italic">{title}</h3>
    <p className="text-sm text-white/40 leading-relaxed">{description}</p>
  </div>
);

const SocialLink: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <a 
    href={href} 
    className="p-4 border border-white/10 hover:border-gold/50 hover:text-gold transition-all duration-300"
  >
    {icon}
  </a>
);
