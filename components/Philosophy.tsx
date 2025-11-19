import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const content = [
    {
        id: 0,
        number: "01",
        title: "The Sanctuary",
        text: "Nestled in the heart of a thriving coffee and areca nut plantation, SR Retreat is not just a stay; it is a pause button for the soul. Built in 2025, our architecture dissolves into the landscape, offering 1-BHK homes and private suites.",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 1,
        number: "02",
        title: "Sensory Silence",
        text: "We believe in the luxury of silence. Far from the city clamor (yet only 6km from the center), the only notifications you'll receive here are the rustle of leaves and the call of distant birds.",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop"
    },
    {
        id: 2,
        number: "03",
        title: "Slow Living",
        text: "Wake up to misty mornings. Walk through the farm. Sit by the fire camp. Use our modern kitchen to brew fresh coffee. Here, time is not measured in hours, but in moments of pure presence.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
    }
]

export const Philosophy: React.FC = () => {
  const [activeId, setActiveId] = useState(0);

  return (
    <section id="philosophy" className="relative bg-stone-950 py-32 min-h-[150vh]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Sticky Image Side */}
        <div className="relative h-full hidden md:block">
          <div className="sticky top-32 h-[80vh] w-full overflow-hidden rounded-sm bg-stone-900">
             {content.map((item) => (
                 <motion.img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ 
                        opacity: activeId === item.id ? 0.8 : 0,
                        scale: activeId === item.id ? 1 : 1.1
                    }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 />
             ))}
             <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
             
             <div className="absolute bottom-8 left-8 z-10">
                <motion.p 
                    key={activeId}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white font-serif text-3xl italic"
                >
                    {content[activeId].title}
                </motion.p>
             </div>
          </div>
        </div>

        {/* Scrolling Text Side */}
        <div className="flex flex-col gap-48 py-12 md:py-32">
            {content.map((item) => (
                <div key={item.id}>
                     <ContentBlock 
                        item={item} 
                        onInView={() => setActiveId(item.id)} 
                    />
                     {/* Mobile Only Image */}
                     <div className="md:hidden h-[60vh] w-full overflow-hidden rounded-sm my-8">
                        <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

const ContentBlock: React.FC<{ item: typeof content[0], onInView: () => void }> = ({ item, onInView }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) onInView();
    }, [isInView, onInView]);

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
        >
            <span className="text-emerald-700 font-serif text-lg flex items-center gap-4">
                {item.number} <span className="w-12 h-[1px] bg-emerald-900"></span>
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-200 leading-tight">{item.title}</h2>
            <p className="text-stone-400 leading-relaxed text-lg font-light max-w-md">
                {item.text}
            </p>
        </motion.div>
    );
};