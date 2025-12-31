
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
            <div key={i} className="relative mama-extrusion transform transition-transform hover:scale-105 duration-300">
              {/* Main Letter Shell */}
              <div 
                className="relative text-[18vh] md:text-[22vh] font-black leading-none italic tracking-tighter overflow-hidden border-2 border-white/20"
                style={{ 
                  fontFamily: "'Bungee', cursive",
                  background: 'linear-gradient(to bottom, #4ade80 0%, #4ade80 75%, #ff69b4 75%, #ff69b4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                }}
              >
                {char}
                {/* Internal Tiles overlay for the text */}
                <div className="absolute inset-0 mirror-tiles-logo opacity-40 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Tiled Heart for 'A's */}
              {isA && (
                <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative w-[3.5vw] h-[3.5vw] md:w-[4vw] md:h-[4vw] flex items-center justify-center">
                     <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,105,180,1)]">
                        <defs>
                          <pattern id={`heart-tiles-${i}`} x="0" y="0" width="0.2" height="0.2">
                            <rect width="10" height="10" fill="#ff69b4" stroke="white" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={`url(#heart-tiles-${i})`} stroke="white" strokeWidth="1"/>
                      </svg>
                  </div>
                </div>
              )}
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
          <div className="absolute inset-0 mirror-tiles-logo opacity-30 mix-blend-overlay pointer-events-none" />
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
