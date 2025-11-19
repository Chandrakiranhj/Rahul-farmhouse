
import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface ContactProps {
    onBookClick: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onBookClick }) => {
  return (
    <footer id="contact" className="bg-stone-900 pt-32 pb-12 px-6 border-t border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="text-6xl md:text-8xl font-serif text-stone-200 mb-12">
            Stay with us.
          </h2>
          <p className="text-stone-400 max-w-md text-lg font-light mb-12">
            We invite you to disconnect from the world and reconnect with yourself. 
            Book your sanctuary today.
          </p>
          
          <div className="mb-12">
              <Magnetic>
                <button 
                    onClick={onBookClick}
                    className="px-8 py-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full transition-all text-sm tracking-widest uppercase flex items-center gap-4 group"
                >
                    Book Your Stay <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Magnetic>
          </div>

          <div className="flex flex-col gap-6">
            <Magnetic strength={10}>
                <a href="tel:+916362859209" className="flex items-center gap-4 text-stone-300 hover:text-emerald-400 transition-colors group">
                    <span className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-emerald-400">
                        <Phone size={20} />
                    </span>
                    <div>
                        <p className="text-xs uppercase text-stone-500 mb-1">Call Us</p>
                        <p className="font-serif text-xl">+91 6362859209</p>
                    </div>
                </a>
            </Magnetic>
            <Magnetic strength={10}>
                <a href="mailto:s.r.retreat.queries@gmail.com" className="flex items-center gap-4 text-stone-300 hover:text-emerald-400 transition-colors group">
                    <span className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-emerald-400">
                        <Mail size={20} />
                    </span>
                    <div>
                        <p className="text-xs uppercase text-stone-500 mb-1">Email Us</p>
                        <p className="font-serif text-xl">s.r.retreat.queries@gmail.com</p>
                    </div>
                </a>
            </Magnetic>
            <div className="flex items-center gap-4 text-stone-300 group">
                <span className="w-12 h-12 rounded-full border border-stone-700 flex items-center justify-center">
                    <MapPin size={20} />
                </span>
                <div>
                    <p className="text-xs uppercase text-stone-500 mb-1">Visit Us</p>
                    <p className="font-serif text-lg">SR Retreat, Muthur, Periyapatna, Mysuru</p>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between">
             <div className="p-8 border border-stone-800 bg-stone-950/50 backdrop-blur-sm">
                <h3 className="text-stone-200 font-serif text-2xl mb-6">House Rules</h3>
                <ul className="space-y-4 text-stone-400 font-light text-sm">
                    <li className="flex justify-between border-b border-stone-800 pb-2">
                        <span>Check-in</span>
                        <span>12:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-800 pb-2">
                        <span>Check-out</span>
                        <span>10:00 AM</span>
                    </li>
                    <li className="flex justify-between border-b border-stone-800 pb-2">
                        <span>Quiet Hours</span>
                        <span>10:00 PM - 6:00 AM</span>
                    </li>
                     <li className="flex justify-between border-b border-stone-800 pb-2">
                        <span>Pets</span>
                        <span>Not Allowed</span>
                    </li>
                </ul>
             </div>
             
             <div className="mt-12 text-stone-600 text-sm flex flex-col md:flex-row justify-between items-end">
                <p>© 2025 SR Retreat. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Designed with strict viral intentions.</p>
             </div>
        </div>
      </div>
    </footer>
  );
};
