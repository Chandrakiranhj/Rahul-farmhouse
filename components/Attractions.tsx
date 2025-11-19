
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Car, Navigation } from 'lucide-react';
import { Attraction } from '../types';
import { Magnetic } from './Magnetic';

const attractions: Attraction[] = [
  {
    name: "Golden Temple",
    distance: "9 km",
    time: "15 min",
    description: "Namdroling Monastery. A spiritual masterpiece of Tibetan architecture featuring 40ft tall golden statues.",
    image: "https://images.unsplash.com/photo-1584806786886-58578856d8e0?q=80&w=2070&auto=format&fit=crop",
    coordinates: { x: 10, y: 20 }
  },
  {
    name: "Dubare Elephant Camp",
    distance: "20 km",
    time: "40 min",
    description: "A project dedicated to elephants on the banks of River Kaveri. Participate in bathing and feeding sessions.",
    image: "https://images.unsplash.com/photo-1585066354384-31e659372200?q=80&w=2070&auto=format&fit=crop",
    coordinates: { x: 80, y: 10 }
  },
  {
    name: "Raja's Seat",
    distance: "30 km",
    time: "1 hr",
    description: "A historic garden perched on a cliff face offering breathtaking views of the green valleys and sunsets.",
    image: "https://images.unsplash.com/photo-1596427028927-e33207c6630e?q=80&w=2070&auto=format&fit=crop",
    coordinates: { x: 50, y: 80 }
  },
   {
    name: "Kaveri Nisargadhama",
    distance: "8 km",
    time: "20 min",
    description: "A 64-acre island formed by the Kaveri river, accessible via a hanging rope bridge. Lush with bamboo groves.",
    image: "https://images.unsplash.com/photo-1590756254933-241a83cd96a8?q=80&w=2070&auto=format&fit=crop",
    coordinates: { x: 30, y: 60 }
  }
];

export const Attractions: React.FC = () => {
    const [activeAttraction, setActiveAttraction] = useState<number>(0);

    return (
        <section id="attractions" className="py-32 bg-stone-950 px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Standardized Header */}
                <div className="mb-24 border-b border-stone-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-emerald-500 text-[10px] tracking-[0.3em] uppercase block mb-4 font-bold"
                        >
                            EXPERIENCES
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif text-stone-200"
                        >
                            Nearby Journeys
                        </motion.h2>
                        <p className="text-stone-500 mt-4 max-w-md">
                            Mysuru and Coorg offer a tapestry of culture and nature. We are centrally located to the best of both worlds.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-stone-600 text-xs uppercase tracking-widest">
                        <Navigation size={14} />
                        Hover to Navigate
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Interactive List */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        {attractions.map((attr, idx) => (
                            <AttractionItem 
                                key={idx} 
                                attr={attr} 
                                isActive={activeAttraction === idx} 
                                onHover={() => setActiveAttraction(idx)} 
                            />
                        ))}
                    </div>

                    {/* Visual Display */}
                    <div className="lg:col-span-8 relative h-[60vh] rounded-sm overflow-hidden group">
                         {/* Compass UI Overlay */}
                         <div className="absolute top-6 right-6 z-20 w-24 h-24 border border-stone-100/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <div className="w-full h-[1px] bg-stone-100/20 absolute" />
                            <div className="h-full w-[1px] bg-stone-100/20 absolute" />
                            <motion.div 
                                animate={{ rotate: activeAttraction * 90 }}
                                transition={{ type: "spring", stiffness: 50 }}
                                className="w-16 h-16 border-t-2 border-r-2 border-emerald-500 rounded-full"
                            />
                            <div className="absolute text-[10px] text-stone-300 font-mono">N</div>
                         </div>

                        <motion.img
                            key={activeAttraction}
                            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8 }}
                            src={attractions[activeAttraction].image}
                            alt={attractions[activeAttraction].name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                        
                        <motion.div 
                             key={`text-${activeAttraction}`}
                             initial={{ y: 30, opacity: 0 }}
                             animate={{ y: 0, opacity: 1 }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                             className="absolute bottom-12 left-6 md:left-12 max-w-md"
                        >
                            <div className="flex items-center gap-2 text-emerald-400 mb-4">
                                <MapPin size={16} />
                                <span className="text-xs uppercase tracking-widest">Featured Location</span>
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-4">{attractions[activeAttraction].name}</h3>
                            <p className="text-stone-200 text-lg font-light leading-relaxed backdrop-blur-md bg-stone-950/30 p-4 rounded-lg border border-stone-800/50">
                                {attractions[activeAttraction].description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AttractionItem: React.FC<{ attr: Attraction; isActive: boolean; onHover: () => void }> = ({ attr, isActive, onHover }) => {
    return (
        <Magnetic strength={20}>
            <motion.div 
                onMouseEnter={onHover}
                whileHover={{ x: 10 }}
                className={`p-6 cursor-pointer border-l-2 transition-all duration-500 relative overflow-hidden group ${
                    isActive 
                    ? 'border-emerald-500 bg-stone-900' 
                    : 'border-stone-800 hover:border-stone-600'
                }`}
            >
                <div className="relative z-10">
                    <h3 className={`text-xl font-serif mb-2 transition-colors ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'}`}>
                        {attr.name}
                    </h3>
                    <div className="flex gap-4 text-xs text-stone-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><Car size={12}/> {attr.distance}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {attr.time}</span>
                    </div>
                </div>
                {isActive && (
                    <motion.div 
                        layoutId="active-bg"
                        className="absolute inset-0 bg-stone-800/50 z-0"
                        transition={{ duration: 0.3 }}
                    />
                )}
            </motion.div>
        </Magnetic>
    )
}
