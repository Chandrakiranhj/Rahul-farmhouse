
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, CloudFog, Flame, Trees, Play, X } from 'lucide-react';
import { Magnetic } from './Magnetic';

const panels = [
    {
        id: 'coffee',
        title: 'The Plantation',
        subtitle: 'Organic Heritage',
        description: 'Walk through acres of shade-grown Arabica and Robusta. The air here is thick with the scent of roasting beans and damp earth.',
        icon: Coffee,
        image: 'https://images.unsplash.com/photo-1611558428687-5e63cb023d67?q=80&w=1974&auto=format&fit=crop'
    },
    {
        id: 'areca',
        title: 'The Grove',
        subtitle: 'Areca & Pepper',
        description: 'Tall palms sway in the Coorg breeze, creating a natural cathedral of green. This is where the silence lives.',
        icon: Trees,
        image: 'https://images.unsplash.com/photo-1596825205489-97169f8ec8d4?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'mist',
        title: 'The Mist',
        subtitle: 'Morning Rituals',
        description: 'Wake up before the sun to watch the fog roll over the hills. A daily spectacle that turns the world soft and white.',
        icon: CloudFog,
        image: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=2069&auto=format&fit=crop'
    },
    {
        id: 'fire',
        title: 'The Warmth',
        subtitle: 'Evenings by Fire',
        description: 'As night falls, gather around the fire camp. Stories are shared, marshmallows are roasted, and memories are forged.',
        icon: Flame,
        image: 'https://images.unsplash.com/photo-1470246973918-29a53221c195?q=80&w=2070&auto=format&fit=crop'
    }
];

export const Gallery: React.FC = () => {
    const [activePanel, setActivePanel] = useState<string>('coffee');
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section id="gallery" className="py-32 bg-stone-950 relative overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-6">
                
                {/* Header with Video Trigger */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-emerald-500 text-[10px] tracking-[0.3em] uppercase block mb-4 font-bold"
                        >
                            ESTATE
                        </motion.span>
                        <motion.h2 
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.1 }}
                             className="text-4xl md:text-6xl font-serif text-stone-200"
                        >
                            Living off the Land
                        </motion.h2>
                    </div>
                    <Magnetic>
                        <button 
                            onClick={() => setIsVideoOpen(true)}
                            className="flex items-center gap-4 group"
                        >
                            <span className="w-16 h-16 rounded-full border border-stone-700 flex items-center justify-center text-stone-300 group-hover:bg-emerald-900 group-hover:border-emerald-800 group-hover:text-white transition-all">
                                <Play size={24} className="fill-current" />
                            </span>
                            <span className="text-xs uppercase tracking-widest text-stone-500 group-hover:text-stone-300 transition-colors">
                                Play Estate Film
                            </span>
                        </button>
                    </Magnetic>
                </div>

                {/* Interactive Accordion */}
                <div className="h-[70vh] flex flex-col md:flex-row gap-2 md:gap-4">
                    {panels.map((panel) => (
                        <Panel 
                            key={panel.id} 
                            panel={panel} 
                            isActive={activePanel === panel.id} 
                            onClick={() => setActivePanel(panel.id)} 
                        />
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
                    >
                        <button 
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-8 right-8 text-stone-400 hover:text-white transition-colors z-50"
                        >
                            <X size={32} />
                        </button>
                        <div className="w-full max-w-6xl aspect-video bg-stone-900 rounded-lg overflow-hidden relative shadow-2xl">
                            {/* Simulated Video Player */}
                            <video 
                                src="https://cdn.pixabay.com/video/2020/05/03/37978-417521308_large.mp4" 
                                className="w-full h-full object-cover"
                                autoPlay 
                                controls
                                loop
                            />
                            <div className="absolute bottom-8 left-8 text-white/80 pointer-events-none mix-blend-difference">
                                <p className="text-sm uppercase tracking-widest">Drone Footage • 2025</p>
                                <p className="font-serif text-2xl">Aerial View of SR Retreat</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

const Panel: React.FC<{ panel: typeof panels[0], isActive: boolean, onClick: () => void }> = ({ panel, isActive, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isActive ? 'flex-[3] grayscale-0' : 'flex-[1] grayscale hover:grayscale-0'
            }`}
        >
            {/* Background Image */}
            <img 
                src={panel.image} 
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent transition-opacity duration-500 ${
                isActive ? 'opacity-90' : 'opacity-60 group-hover:opacity-80'
            }`} />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div layout="position" className="flex items-center gap-3 mb-3">
                    <panel.icon size={18} className={isActive ? 'text-emerald-400' : 'text-stone-300'} />
                    <span className="text-[10px] uppercase tracking-widest text-stone-300">{panel.subtitle}</span>
                </motion.div>
                
                <motion.h3 
                    layout="position"
                    className={`font-serif text-stone-100 leading-tight mb-4 transition-all duration-500 ${
                        isActive ? 'text-4xl md:text-5xl' : 'text-xl opacity-80'
                    }`}
                >
                    {panel.title}
                </motion.h3>

                <AnimatePresence mode="wait">
                    {isActive && (
                        <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-stone-400 font-light leading-relaxed max-w-md overflow-hidden text-sm md:text-base"
                        >
                            {panel.description}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
