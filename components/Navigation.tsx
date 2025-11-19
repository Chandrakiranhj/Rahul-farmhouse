
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Magnetic';

interface NavigationProps {
  isZenMode: boolean;
  toggleZenMode: () => void;
  onBookClick: () => void;
  onInfoClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isZenMode, toggleZenMode, onBookClick, onInfoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Philosophy', id: 'philosophy' },
    { name: 'Estate', id: 'gallery' },
    { name: 'Sanctuaries', id: 'rooms' },
    { name: 'Experiences', id: 'attractions' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-stone-950/80 backdrop-blur-md border-b border-stone-800/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 h-24 flex justify-between items-center relative">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 z-50">
            <Magnetic>
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="relative group py-2"
                >
                    <span className="font-display text-2xl tracking-[0.15em] text-stone-100 whitespace-nowrap font-medium">
                        SR RETREAT
                    </span>
                </button>
            </Magnetic>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-[11px] uppercase tracking-[0.25em] text-stone-400 hover:text-white transition-colors py-2 px-2"
                >
                  {link.name}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Magnetic>
                <button
                onClick={toggleZenMode}
                className="flex items-center gap-2 px-4 py-2 border border-stone-800 rounded-full hover:bg-stone-800 hover:border-stone-700 transition-all bg-stone-950/30 backdrop-blur-sm"
                >
                <span className="text-[10px] uppercase tracking-widest text-stone-400 w-12 text-center">
                    {isZenMode ? 'Zen On' : 'Zen Off'}
                </span>
                {isZenMode ? <Volume2 size={12} className="text-emerald-400" /> : <VolumeX size={12} className="text-stone-500" />}
                </button>
            </Magnetic>

            <Magnetic>
                <button
                onClick={onInfoClick}
                className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:bg-stone-800 hover:border-stone-700 transition-all text-stone-400 bg-stone-950/30 backdrop-blur-sm"
                title="Property Details & Rules"
                >
                    <Info size={16} />
                </button>
            </Magnetic>

             <Magnetic>
                <button
                onClick={onBookClick}
                className="px-6 py-2.5 bg-stone-100 text-stone-950 rounded-full hover:bg-emerald-400 hover:text-emerald-950 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                <span className="text-[10px] uppercase tracking-widest font-bold">
                    Book Stay
                </span>
                </button>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-white z-50 relative p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950 z-40 flex items-center justify-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-3xl font-serif text-stone-200"
                >
                  {link.name}
                </button>
              ))}
              <div className="w-12 h-[1px] bg-stone-800 my-4" />
              <button 
                  onClick={() => {
                      setIsMobileMenuOpen(false);
                      onInfoClick();
                  }}
                  className="text-sm uppercase tracking-widest text-stone-400 flex items-center gap-2"
              >
                  <Info size={16} /> Property Info
              </button>
              <button
                onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookClick();
                }}
                className="px-8 py-3 bg-white text-black rounded-full text-sm uppercase tracking-widest font-bold mt-4"
              >
                  Book Now
              </button>
              <button
              onClick={toggleZenMode}
              className="mt-4 flex items-center gap-2 text-stone-500 text-xs uppercase tracking-widest"
            >
              {isZenMode ? <Volume2 size={14} className="text-emerald-400" /> : <VolumeX size={14} />}
              <span>{isZenMode ? 'Sound On' : 'Sound Off'}</span>
            </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
