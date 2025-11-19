
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Room } from '../types';
import { X, Wifi, Coffee, Tv, Bed, User, Sparkles, ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

const rooms: Room[] = [
  {
    id: '1bhk',
    title: 'The Manor House',
    type: 'Entire House',
    capacity: '4 Guests',
    price: 'Seasonal',
    description: 'A full 1 BHK residence designed for families. Features a spacious hall, full kitchen with appliances, private kettle, and sweeping garden views. Perfect for those who want the comfort of a home in the wild.',
    amenities: ['King Bed', 'Kitchen', 'WiFi', 'Private Entrance', 'TV', 'Kettle', 'Living Area'],
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'suite1',
    title: 'Garden Suite I',
    type: 'Private Suite',
    capacity: '2 Guests',
    price: 'Seasonal',
    description: 'An intimate space for couples. Attached modern bathroom, premium linens, and direct access to the Areca farm. The morning sun hits this room first.',
    amenities: ['Queen Bed', 'Attached Bath', 'WiFi', 'Garden View', 'Private Sit-out'],
    image: 'https://images.unsplash.com/photo-1590490360182-137d62341a1d?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 'suite2',
    title: 'Garden Suite II',
    type: 'Private Suite',
    capacity: '2 Guests',
    price: 'Seasonal',
    description: 'Twin to Suite I, offering seclusion and peace. Perfect for solo travelers or friends seeking a quiet getaway. Features a dedicated work desk for digital nomads.',
    amenities: ['Queen Bed', 'Attached Bath', 'WiFi', 'Work Desk', 'Coffee Maker'],
    image: 'https://images.unsplash.com/photo-1512918760532-3edbedaa97e5?q=80&w=2067&auto=format&fit=crop'
  }
];

interface RoomsProps {
    onBookRoom: (roomName: string) => void;
}

export const Rooms: React.FC<RoomsProps> = ({ onBookRoom }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Map vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <>
    <section id="rooms" ref={targetRef} className="relative h-[300vh] bg-stone-900">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="absolute top-12 left-6 md:left-24 z-10 pointer-events-none">
            <h2 className="text-6xl md:text-8xl font-serif text-stone-800/30 uppercase tracking-tighter">
                Sanctuaries
            </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-24 items-center">
          {/* Intro Card */}
          <div className="flex-shrink-0 w-[80vw] md:w-[30vw] h-[60vh] flex flex-col justify-center gap-8 pl-4">
            <h3 className="text-4xl font-serif text-stone-200">Rest in Nature's Lap</h3>
            <p className="text-stone-400 leading-relaxed">
                Our accommodations are designed to blur the lines between indoors and outdoors. 
                Featuring modern amenities wrapped in rustic charm.
            </p>
            <div className="flex gap-4 flex-wrap">
                <span className="px-4 py-2 border border-stone-700 rounded-full text-xs text-stone-400 flex items-center gap-2"><Wifi size={12}/> WiFi Enabled</span>
                <span className="px-4 py-2 border border-stone-700 rounded-full text-xs text-stone-400 flex items-center gap-2"><Sparkles size={12}/> 24/7 Power</span>
            </div>
            <p className="text-xs text-stone-600 uppercase tracking-widest mt-8">→ Drag to explore</p>
          </div>

          {/* Room Cards */}
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onSelect={() => setSelectedRoom(room)} />
          ))}
        </motion.div>
      </div>
    </section>

    {/* Full Screen Room Detail Modal */}
    <AnimatePresence>
        {selectedRoom && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 backdrop-blur-xl p-4 md:p-12"
            >
                <motion.div 
                    layoutId={`room-container-${selectedRoom.id}`}
                    className="bg-stone-900 w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden relative flex flex-col md:flex-row shadow-2xl border border-stone-800"
                >
                    <button 
                        onClick={() => setSelectedRoom(null)}
                        className="absolute top-6 right-6 z-50 w-10 h-10 bg-stone-950/50 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Image Side */}
                    <motion.div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                        <motion.img 
                            layoutId={`room-image-${selectedRoom.id}`}
                            src={selectedRoom.image}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent md:bg-gradient-to-r" />
                    </motion.div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                         <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-emerald-500 text-xs tracking-[0.2em] uppercase mb-4 block"
                        >
                            {selectedRoom.type}
                         </motion.span>
                         
                         <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-serif text-stone-100 mb-6"
                         >
                            {selectedRoom.title}
                         </motion.h2>

                         <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-stone-400 text-lg font-light leading-relaxed mb-8"
                        >
                            {selectedRoom.description}
                         </motion.p>

                         <div className="grid grid-cols-2 gap-4 mb-12">
                            {selectedRoom.amenities.map((amenity, idx) => (
                                <motion.div 
                                    key={amenity}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (idx * 0.1) }}
                                    className="flex items-center gap-3 text-stone-300 p-3 bg-stone-800/50 rounded-lg"
                                >
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                    <span className="text-sm">{amenity}</span>
                                </motion.div>
                            ))}
                         </div>

                         <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-auto pt-8 border-t border-stone-800"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-stone-500 text-xs uppercase mb-1">Starting from</p>
                                    <p className="text-xl text-white font-serif">Seasonal Rates</p>
                                </div>
                                <Magnetic>
                                    <button 
                                        onClick={() => {
                                            onBookRoom(selectedRoom.title);
                                            setSelectedRoom(null);
                                        }} 
                                        className="px-8 py-3 bg-emerald-800 hover:bg-emerald-700 text-white rounded-full transition-colors uppercase text-xs tracking-widest flex items-center gap-2"
                                    >
                                        Reserve Sanctuary <ArrowRight size={14} />
                                    </button>
                                </Magnetic>
                            </div>
                         </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

const RoomCard: React.FC<{ room: Room; onSelect: () => void }> = ({ room, onSelect }) => {
    return (
        <Magnetic>
            <motion.div 
                layoutId={`room-container-${room.id}`}
                onClick={onSelect}
                className="flex-shrink-0 w-[85vw] md:w-[45vw] h-[60vh] relative group cursor-pointer overflow-hidden bg-stone-800 rounded-xl shadow-lg"
            >
                <motion.img 
                    layoutId={`room-image-${room.id}`}
                    src={room.image} 
                    alt={room.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-emerald-400 text-[10px] tracking-widest uppercase mb-2">{room.type}</p>
                            <h3 className="text-3xl font-serif text-stone-100 mb-2">{room.title}</h3>
                            <div className="flex gap-3 text-stone-400 text-sm">
                                <span className="flex items-center gap-1"><User size={14}/> {room.capacity}</span>
                                <span className="w-[1px] h-4 bg-stone-700"></span>
                                <span className="flex items-center gap-1"><Bed size={14}/> {room.amenities[0]}</span>
                            </div>
                        </div>
                        <div 
                            className="w-12 h-12 rounded-full border border-stone-500 flex items-center justify-center text-stone-300 bg-stone-950/50 backdrop-blur-sm group-hover:bg-emerald-800 group-hover:border-emerald-800 group-hover:text-white transition-all"
                        >
                            <span className="text-xl mb-1">↗</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Magnetic>
    )
}
