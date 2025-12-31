
import React from 'react';

const Glint: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
  <div className={`absolute pointer-events-none animate-glint ${className}`} style={style}>
    <svg width="40" height="40" viewBox="0 0 100 100" fill="white">
      <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    </svg>
  </div>
);

const MamaLogo: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center scale-[0.6] md:scale-90 lg:scale-110 select-none py-10">
      
      {/* Background Glow behind logo */}
      <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full -z-10" />

      {/* MAMA Block Text Container */}
      <div className="relative flex items-end -space-x-1 md:-space-x-2 z-10">
        {['M', 'A', 'M', 'A'].map((char, i) => {
          const isA = char === 'A';
          return (
            <div key={i} className="relative mama-extrusion">
              {/* Main Letter Shell */}
              <div 
                className="relative text-[18vh] md:text-[22vh] font-black leading-none italic tracking-tighter overflow-hidden border-2 border-white/20"
                style={{ 
                  fontFamily: "'Bungee', cursive",
                  color: 'white' // Simplify to plain white for testing
                }}
              >
                {char}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lisboa Script - Positioned exactly like the image (overlapping) */}
      <div className="relative -mt-[10vh] md:-mt-[12vh] z-30 lisboa-slant group">
        <div 
          className="text-[12vh] md:text-[15vh] italic leading-none drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
          style={{ 
            fontFamily: "'Pacifico', cursive",
            color: 'white',
            textShadow: '0 4px 15px rgba(0,0,0,0.8)',
          }}
        >
          Lisboa
          {/* Tile texture for Lisboa script */}
          <div className="absolute inset-0 mirror-tiles-logo opacity-30 pointer-events-none" />
        </div>
        
        {/* Animated Glitter/Glints on Lisboa */}
        <Glint style={{ top: '20%', left: '10%', animationDelay: '0.5s' }} className="scale-50" />
        <Glint style={{ bottom: '10%', right: '20%', animationDelay: '1.2s' }} className="scale-75" />
      </div>

      {/* Strategic Glints to match image style */}
      <Glint style={{ top: '5%', left: '25%', animationDelay: '0s' }} className="scale-90" />
      <Glint style={{ top: '15%', right: '15%', animationDelay: '2s' }} className="scale-110" />
      <Glint style={{ bottom: '40%', left: '10%', animationDelay: '3.5s' }} className="scale-75" />
      <Glint style={{ top: '50%', right: '5%', animationDelay: '1.5s' }} className="scale-50" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-logo {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
    </div>
  );
};

export default MamaLogo;
