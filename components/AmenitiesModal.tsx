
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wifi, Coffee, Tv, Flame, Car, Ban, Clock, Shield, Users, Mountain, Home, Phone, HeartPulse } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-md overflow-y-auto custom-scrollbar"
        >
            <div className="min-h-screen max-w-5xl mx-auto p-6 md:p-12 flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-serif text-stone-100">Property Details</h2>
                        <p className="text-stone-500 mt-2">All you need to know before you arrive.</p>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:bg-stone-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-12">
                    
                    {/* Amenities Section */}
                    <section>
                        <h3 className="text-2xl font-serif text-emerald-400 mb-8 flex items-center gap-3">
                            <Home className="stroke-1" /> The Sanctuary
                        </h3>
                        
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-stone-200 uppercase tracking-widest text-xs mb-4">Accommodation</h4>
                                <p className="text-stone-400 font-light leading-relaxed">
                                    Built in 2025, SR Retreat features a primary 1 BHK Farmhouse (Capacity: 4) and two private individual suites (Capacity: 2 each).
                                    All units are designed with a minimalist aesthetic that frames the surrounding Areca nut and coffee plantation.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-stone-200 uppercase tracking-widest text-xs mb-4">Indoor Comforts</h4>
                                <ul className="grid grid-cols-2 gap-4">
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Wifi size={18} className="text-emerald-600" /> High-Speed WiFi
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Tv size={18} className="text-emerald-600" /> Smart TV
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Coffee size={18} className="text-emerald-600" /> Kettle & Coffee
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Home size={18} className="text-emerald-600" /> Full Kitchen (1BHK)
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-stone-200 uppercase tracking-widest text-xs mb-4">Outdoor Experience</h4>
                                <ul className="grid grid-cols-2 gap-4">
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Flame size={18} className="text-orange-500" /> Fire Camp Zone
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Car size={18} className="text-emerald-600" /> Free Private Parking
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Mountain size={18} className="text-emerald-600" /> Plantation Walks
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Users size={18} className="text-emerald-600" /> Garden Sit-outs
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Rules & Policies Section */}
                    <section className="border-l border-stone-800 pl-0 md:pl-16">
                        <h3 className="text-2xl font-serif text-emerald-400 mb-8 flex items-center gap-3">
                            <Shield className="stroke-1" /> Policies & Rules
                        </h3>

                        <div className="space-y-8">
                            <div className="bg-stone-900 p-6 rounded-lg border border-stone-800">
                                <div className="flex justify-between mb-4 border-b border-stone-800 pb-2">
                                    <span className="text-stone-300">Check-in</span>
                                    <span className="text-white font-mono">12:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-300">Check-out</span>
                                    <span className="text-white font-mono">10:00 AM</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-stone-200 uppercase tracking-widest text-xs mb-4">House Rules</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Ban size={16} className="text-red-400" /> No Pets Allowed
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Ban size={16} className="text-red-400" /> Smoking Outside Only
                                    </li>
                                    <li className="flex items-center gap-3 text-stone-400">
                                        <Clock size={16} className="text-stone-500" /> Quiet Hours (10 PM - 6 AM)
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-stone-200 uppercase tracking-widest text-xs mb-4">Pricing & Fees</h4>
                                <ul className="space-y-3 text-sm text-stone-400">
                                    <li className="flex justify-between">
                                        <span>Security Deposit</span>
                                        <span className="text-white">₹1000</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Extra Guest (w/ Bed)</span>
                                        <span className="text-white">₹600 / night</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Cancellation</span>
                                        <span className="text-white">Full refund if > 7 days</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="pt-8 border-t border-stone-800">
                                <h4 className="text-stone-200 uppercase tracking-widest text-xs mb-4">Important Numbers</h4>
                                <div className="flex flex-col gap-2">
                                    <a href="tel:+919972070151" className="flex items-center gap-3 text-stone-400 hover:text-emerald-500 transition-colors">
                                        <HeartPulse size={16} className="text-red-500" /> Emergency: +91 9972070151
                                    </a>
                                    <a href="tel:+916362859209" className="flex items-center gap-3 text-stone-400 hover:text-emerald-500 transition-colors">
                                        <Phone size={16} /> Manager: +91 6362859209
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
