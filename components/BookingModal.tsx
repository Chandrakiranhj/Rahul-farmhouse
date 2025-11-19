
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MessageSquare, Check } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, preselectedRoom }) => {
  const [formData, setFormData] = useState({
    name: '',
    dates: '',
    guests: '2',
    room: preselectedRoom || 'Undecided',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const text = `Namaste! I would like to inquire about a stay at SR Retreat.%0A%0AName: ${formData.name}%0ADates: ${formData.dates}%0AGuests: ${formData.guests}%0APreferred Room: ${formData.room}%0A%0ANote: ${formData.message}`;
    window.open(`https://wa.me/916362859209?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/60 backdrop-blur-xl p-4"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-stone-900 w-full max-w-lg rounded-2xl border border-stone-800 shadow-2xl overflow-hidden relative"
            >
                {/* Header */}
                <div className="p-8 border-b border-stone-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-serif text-stone-100">Reserve Your Sanctuary</h2>
                        <p className="text-stone-400 text-sm mt-2">Begin your journey to stillness.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-stone-500">Your Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-stone-950/50 border border-stone-800 rounded-lg p-4 text-stone-200 focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-2"><Calendar size={12} /> Dates</label>
                            <input 
                                type="text" 
                                name="dates"
                                value={formData.dates}
                                onChange={handleChange}
                                placeholder="Oct 12 - 14"
                                className="w-full bg-stone-950/50 border border-stone-800 rounded-lg p-4 text-stone-200 focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs uppercase tracking-widest text-stone-500 flex items-center gap-2"><Users size={12} /> Guests</label>
                             <select 
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                                className="w-full bg-stone-950/50 border border-stone-800 rounded-lg p-4 text-stone-200 focus:border-emerald-500 focus:outline-none transition-colors appearance-none"
                             >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4+</option>
                             </select>
                        </div>
                    </div>

                     <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-stone-500">Preferred Sanctuary</label>
                        <select 
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                            className="w-full bg-stone-950/50 border border-stone-800 rounded-lg p-4 text-stone-200 focus:border-emerald-500 focus:outline-none transition-colors appearance-none"
                        >
                            <option value="Undecided">I'm not sure yet</option>
                            <option value="The Manor House (1BHK)">The Manor House (1BHK)</option>
                            <option value="Garden Suite I">Garden Suite I</option>
                            <option value="Garden Suite II">Garden Suite II</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-8 pt-0">
                    <Magnetic>
                        <button 
                            onClick={handleWhatsApp}
                            className="w-full bg-emerald-900 hover:bg-emerald-800 text-emerald-100 py-4 rounded-xl flex items-center justify-center gap-3 font-medium transition-colors group"
                        >
                            <span>Inquire via WhatsApp</span>
                            <MessageSquare size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Magnetic>
                    <p className="text-center text-[10px] text-stone-600 mt-4 uppercase tracking-widest">
                        Best rates guaranteed when booking directly
                    </p>
                </div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
