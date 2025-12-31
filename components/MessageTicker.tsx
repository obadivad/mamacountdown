
import React from 'react';

interface Props {
  messages: string[];
}

const MessageTicker: React.FC<Props> = ({ messages }) => {
  // If no messages, show default branding
  const displayMessages = messages.length > 0 
    ? messages 
    : ["WELCOME TO MAMA SHELTER LISBOA", "SHARE YOUR LOVE", "FLASHBACK TO 2026", "KISS SOMEONE AT MIDNIGHT"];

  return (
    <div className="fixed bottom-0 left-0 w-full h-[6vh] bg-black/80 border-t border-pink-500/30 backdrop-blur-sm z-40 overflow-hidden flex items-center">
      <div className="whitespace-nowrap animate-scroll flex items-center">
        {displayMessages.map((msg, i) => (
          <div key={i} className="inline-flex items-center mx-[4vw]">
            <span className="text-pink-500 text-[1.5vh] mr-4 animate-pulse">●</span>
            <span 
              className="text-[2.5vh] font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
              style={{ fontFamily: "'Bungee', cursive", textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
            >
              {msg}
            </span>
          </div>
        ))}
        {/* Duplicate for seamless loop effect (optional, though logic handles standard repetition) */}
        {displayMessages.map((msg, i) => (
          <div key={`dup-${i}`} className="inline-flex items-center mx-[4vw]">
            <span className="text-pink-500 text-[1.5vh] mr-4 animate-pulse">●</span>
            <span 
              className="text-[2.5vh] font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
              style={{ fontFamily: "'Bungee', cursive", textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}
            >
              {msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageTicker;
