
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CloudFog, Wind } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.15]);

  const handleScrollDown = () => {
      const nextSection = document.getElementById('philosophy');
      nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-950">
      
      {/* Weather Widget (Mocked for Demo) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-32 left-6 md:left-12 z-30 flex items-center gap-4 text-stone-400 font-sans text-xs tracking-widest uppercase border-l border-stone-700 pl-4 mix-blend-difference"
      >
        <div className="flex flex-col">
            <span className="text-emerald-500 font-semibold">Muthur, Coorg Border</span>
            <div className="flex items-center gap-2 mt-1">
                <CloudFog size={14} />
                <span>22°C • Mist</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-stone-600">
                <Wind size={14} />
                <span>Light Breeze</span>
            </div>
        </div>
      </motion.div>

      {/* Background Layer */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/20 to-stone-950/90 z-10" />
        <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop" 
            alt="Misty Forest Morning"
            className="w-full h-full object-cover opacity-80"
        />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 select-none">
        <motion.div 
          style={{ y: y1, opacity }}
          className="overflow-hidden relative"
        >
          <motion.h1 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[15vw] md:text-[13vw] leading-[0.85] font-serif text-stone-200 tracking-tighter mix-blend-overlay"
          >
            SR
          </motion.h1>
        </motion.div>

        <motion.div 
          style={{ y: y2, opacity }}
          className="overflow-hidden"
        >
          <motion.h1 
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[15vw] md:text-[13vw] leading-[0.85] font-serif text-stone-100 tracking-tighter relative"
          >
            RETREAT
            <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute -right-4 md:-right-12 top-4 md:top-12 h-[1px] bg-emerald-500 hidden md:block" 
            />
          </motion.h1>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mt-12 max-w-md mx-auto"
        >
             <p className="text-stone-400 text-sm uppercase tracking-[0.3em] backdrop-blur-sm py-2 px-4 rounded-full border border-stone-800/50 bg-stone-950/30">
                Sanctuary for the Soul
             </p>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <span className="text-[10px] uppercase tracking-widest text-stone-500">Scroll to Enter</span>
        <div className="w-[1px] h-16 bg-stone-800 overflow-hidden relative">
            <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-500 to-transparent absolute top-0 left-0"
            />
        </div>
      </motion.div>
    </section>
  );
};
