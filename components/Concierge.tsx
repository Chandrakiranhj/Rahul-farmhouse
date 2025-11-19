
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, ChevronRight, Calendar } from 'lucide-react';
import { sendMessageToConcierge } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Magnetic } from './Magnetic';

interface ConciergeProps {
    onBookClick: () => void;
}

const QUICK_PROMPTS = [
    "What is the price for 1BHK?",
    "Is food available?",
    "How far is the Golden Temple?",
    "Are pets allowed?"
];

export const Concierge: React.FC<ConciergeProps> = ({ onBookClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste. I am the Virtual Concierge for SR Retreat. How may I assist you in planning your sanctuary?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToConcierge(messages, text);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Magnetic>
        <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-emerald-900 text-emerald-100 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-900/50 border border-emerald-700/50 group overflow-hidden"
        >
            <div className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity" />
            <Sparkles size={20} />
        </motion.button>
      </Magnetic>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 md:right-8 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-stone-900/95 backdrop-blur-xl border border-stone-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-stone-800 flex justify-between items-center bg-stone-950/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center border border-emerald-700">
                    <Bot size={16} className="text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-stone-200 font-serif text-sm">Concierge AI</h3>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider">Online</span>
                    </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-stone-900 to-stone-950/50">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-emerald-900 text-emerald-100 rounded-tr-none'
                        : 'bg-stone-800 text-stone-300 rounded-tl-none border border-stone-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                 <div className="flex justify-start">
                    <div className="bg-stone-800 p-3 rounded-2xl rounded-tl-none flex gap-1 border border-stone-700">
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce delay-150" />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Actions Bar */}
            <div className="px-4 pb-2 bg-stone-950 border-t border-stone-800 pt-3 flex justify-between items-center">
                <button 
                    onClick={onBookClick}
                    className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
                >
                    <Calendar size={12} /> Book A Stay
                </button>
            </div>

            {/* Quick Prompts */}
            {messages.length < 3 && !loading && (
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto custom-scrollbar bg-stone-950">
                    {QUICK_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            onClick={() => handleSend(prompt)}
                            className="flex-shrink-0 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded-full text-xs text-stone-400 whitespace-nowrap transition-colors"
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="p-4 bg-stone-950 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask anything..."
                className="flex-1 bg-stone-900 border border-stone-700 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-stone-600"
              />
              <button 
                onClick={() => handleSend(input)}
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
