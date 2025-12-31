
import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSend: (msg: string) => void;
}

const MessageModal: React.FC<Props> = ({ isOpen, onClose, onSend }) => {
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-zinc-900/90 border border-pink-500/30 rounded-2xl shadow-[0_0_50px_rgba(255,105,180,0.3)] p-6 transform animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-pink-500/20 rounded-full mb-3">
            <Sparkles className="text-pink-500" size={32} />
          </div>
          <h2 className="text-2xl font-black italic uppercase text-white tracking-wider" style={{ fontFamily: "'Bungee', cursive" }}>
            Share the Love
          </h2>
          <p className="text-gray-400 text-sm text-center mt-2">
            Your message will appear on the big screen!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={40}
              placeholder="HELLO 2026..."
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-bold tracking-wider uppercase"
              autoFocus
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-500">
              {text.length}/40
            </div>
          </div>

          <button
            type="submit"
            disabled={!text.trim()}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black uppercase py-4 rounded-xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Send to Screen</span>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;
