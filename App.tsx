
import React, { useState, useRef, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Rooms } from './components/Rooms';
import { Attractions } from './components/Attractions';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Concierge } from './components/Concierge';
import { BookingModal } from './components/BookingModal';
import { AmenitiesModal } from './components/AmenitiesModal';

// Zen Audio Component
const ZenAudio: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <audio 
            ref={audioRef} 
            loop 
            src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=forest-birds-chirping-nature-sounds-10819.mp3" 
        />
    );
};

export default function App() {
  const [isZenMode, setIsZenMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const openBooking = (roomName?: string) => {
      if (roomName) setSelectedRoom(roomName);
      setIsBookingOpen(true);
  }

  useEffect(() => {
    // Simulate assets loading for the "viral" reveal
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
      return (
          <div className="h-screen w-full bg-stone-950 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="flex flex-col items-center gap-6 z-10">
                  <span className="text-stone-200 font-serif text-6xl tracking-tighter animate-pulse mix-blend-difference">SR</span>
                  <div className="flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-widest text-stone-600">Loading Sanctuary</span>
                      <div className="w-24 h-[1px] bg-stone-800 overflow-hidden">
                          <div className="w-full h-full bg-emerald-700 animate-loading-bar" />
                      </div>
                  </div>
              </div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          </div>
      )
  }

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-emerald-900 selection:text-white">
      <ZenAudio isPlaying={isZenMode} />
      
      <Navigation 
        isZenMode={isZenMode} 
        toggleZenMode={() => setIsZenMode(!isZenMode)} 
        onBookClick={() => openBooking()}
        onInfoClick={() => setIsInfoOpen(true)}
      />
      
      <main>
        <Hero />
        <Philosophy />
        <Gallery />
        <Rooms onBookRoom={openBooking} />
        <Attractions />
        <Contact onBookClick={() => openBooking()} />
      </main>

      <Concierge onBookClick={() => openBooking()} />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedRoom={selectedRoom}
      />

      <AmenitiesModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
      
      {/* Noise Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[50]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`}} 
      />
    </div>
  );
}
