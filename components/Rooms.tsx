
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, PanInfo } from 'framer-motion';
import { Room } from '../types';
import { X, Wind, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

const rooms: Room[] = [
  {
    id: '1bhk',
    title: 'The Farm House',
    type: 'Entire House',
    capacity: '4 Guests',
    price: 'Seasonal',
    description: 'A traditional 1 BHK residence with a sloping terracotta roof. Features a dedicated kitchen with black granite counters, gas stove, and dining area. The living room opens up to the farm breeze, perfect for families.',
    amenities: ['King Bed + Extra Beds', 'Full Kitchen', 'Gas Stove', 'Living Hall', 'Dining Area', 'Garden View'],
    images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', // Exterior with tiles
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop', // Kitchen black granite style
        'https://images.unsplash.com/photo-1616594039964-4083245a2b43?q=80&w=2070&auto=format&fit=crop'  // Bedroom
    ]
  },
  {
    id: 'suite1',
    title: 'Areca Suite I',
    type: 'Private Suite',
    capacity: '2 Guests',
    price: 'Seasonal',
    description: 'Nestled under a high wooden ceiling with Mangalore tiles, this room stays cool naturally. Features a modern bathroom with black tile accents and a geyser for hot showers after a misty morning walk.',
    amenities: ['Queen Bed', 'Terracotta Roof', 'Geyser', 'Modern Bath', 'Private Entrance'],
    images: [
        'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=2070&auto=format&fit=crop', // Bedroom wood ceiling
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2070&auto=format&fit=crop', // Bathroom
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop' // Exterior detail
    ]
  },
  {
    id: 'suite2',
    title: 'Areca Suite II',
    type: 'Private Suite',
    capacity: '2 Guests',
    price: 'Seasonal',
    description: 'A mirror to Suite I, offering solitude and silence. The window bars frame the lush green Areca palms outside. Includes all modern amenities wrapped in a rustic shell.',
    amenities: ['Queen Bed', 'Work Desk', 'WiFi', 'Hot Water', 'Farm View'],
    images: [
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2073&auto=format&fit=crop', // Bedroom
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop', // Green view
        'https://images.unsplash.com/photo-1516455590571-18256e5bb9af?q=80&w=2084&auto=format&fit=crop' // Interior
    ]
  }
];

interface RoomsProps {
    onBookRoom: (roomName: string) => void;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 1.1
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.9
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export const Rooms: React.FC<RoomsProps> = ({ onBookRoom }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [[page, direction], setPage] = useState([0, 0]);

  // We calculate the index based on the page number to support infinite pagination
  const imageIndex = selectedRoom 
    ? Math.abs(page % selectedRoom.images.length)
    : 0;

  // Reset image index when room opens
  React.useEffect(() => {
      if (selectedRoom) setPage([0, 0]);
  }, [selectedRoom]);

  const paginate = (newDirection: number) => {
      setPage([page + newDirection, newDirection]);
  };

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <>
    <section id="rooms" ref={targetRef} className="relative h-[300vh] bg-stone-900">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Standardized Header */}
        <div className="absolute top-12 left-6 md:left-24 z-10 pointer-events-none">
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-emerald-500 text-[10px] tracking-[0.3em] uppercase block mb-4 font-bold"
            >
                SANCTUARIES
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-serif text-stone-200"
            >
                Rest in Nature
            </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-24 items-center pt-24">
          {/* Intro Card */}
          <div className="flex-shrink-0 w-[80vw] md:w-[25vw] h-[60vh] flex flex-col justify-center gap-8 pl-4 border-l border-stone-800">
            <p className="text-stone-400 leading-relaxed text-lg font-light">
                Our accommodations blend traditional Kodagu architecture—terracotta roofs and high ceilings—with modern comforts like high-speed WiFi and hot water geysers.
            </p>
            <div className="flex gap-4 flex-wrap">
                <span className="px-4 py-2 border border-stone-700 rounded-full text-xs text-stone-400 flex items-center gap-2"><Wind size={12}/> Natural Cooling</span>
                <span className="px-4 py-2 border border-stone-700 rounded-full text-xs text-stone-400 flex items-center gap-2"><Flame size={12}/> Hot Water</span>
            </div>
            <p className="text-xs text-stone-600 uppercase tracking-widest mt-8 flex items-center gap-2">
                <span className="w-8 h-1px bg-stone-600"></span> Drag to explore
            </p>
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
                        className="absolute top-6 right-6 z-50 w-10 h-10 bg-stone-950/50 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors border border-stone-700/50 backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>

                    {/* Gallery Side */}
                    <motion.div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-stone-800 group overflow-hidden">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.img 
                                key={page}
                                src={selectedRoom.images[imageIndex]}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }: PanInfo) => {
                                    const swipe = swipePower(offset.x, velocity.x);

                                    if (swipe < -swipeConfidenceThreshold) {
                                        paginate(1);
                                    } else if (swipe > swipeConfidenceThreshold) {
                                        paginate(-1);
                                    }
                                }}
                                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
                            />
                        </AnimatePresence>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent md:bg-gradient-to-r pointer-events-none" />
                        
                        {/* Gallery Controls */}
                        <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                             <button 
                                onClick={() => paginate(-1)}
                                className="w-10 h-10 rounded-full bg-stone-950/50 border border-stone-700 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                             >
                                <ChevronLeft size={16} />
                             </button>
                             <button 
                                onClick={() => paginate(1)}
                                className="w-10 h-10 rounded-full bg-stone-950/50 border border-stone-700 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                             >
                                <ChevronRight size={16} />
                             </button>
                        </div>
                        <div className="absolute bottom-8 right-6 text-xs text-white/60 uppercase tracking-widest z-20 font-mono">
                            {imageIndex + 1} / {selectedRoom.images.length}
                        </div>
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
                                    className="flex items-center gap-3 text-stone-300 p-3 bg-stone-800/50 rounded-lg border border-stone-700/50 hover:border-emerald-500/30 transition-colors text-sm"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    {amenity}
                                </motion.div>
                            ))}
                         </div>

                         <div className="mt-auto">
                             <button 
                                onClick={() => onBookRoom(selectedRoom.id)}
                                className="w-full py-4 bg-white text-stone-950 rounded-lg font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors"
                             >
                                Book This Sanctuary
                             </button>
                         </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

const RoomCard: React.FC<{ room: Room, onSelect: () => void }> = ({ room, onSelect }) => {
    return (
        <div 
            className="flex-shrink-0 w-[85vw] md:w-[30vw] h-[65vh] relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={onSelect}
        >
             <motion.img 
                layoutId={`room-img-${room.id}`}
                src={room.images[0]} 
                alt={room.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
             
             <div className="absolute bottom-0 left-0 p-8 w-full">
                 <motion.span className="text-emerald-400 text-[10px] uppercase tracking-[0.2em] mb-2 block">
                    {room.type}
                 </motion.span>
                 <motion.h3 className="text-3xl font-serif text-white mb-4">{room.title}</motion.h3>
                 <div className="flex items-center justify-between border-t border-white/20 pt-4">
                     <span className="text-stone-300 text-sm font-light">{room.capacity}</span>
                     <span className="text-white uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform flex items-center gap-2">
                        View Details <ChevronRight size={14} />
                     </span>
                 </div>
             </div>
        </div>
    )
}
