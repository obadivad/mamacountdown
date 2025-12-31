
import React, { useMemo } from 'react';

interface Props {
  isOverdrive?: boolean;
}

const DiscoBall: React.FC<Props> = ({ isOverdrive = false }) => {
  const facets = useMemo(() => {
    return [...Array(144)].map((_, i) => ({
      delay: Math.random() * 12,
      duration: 3 + Math.random() * 7,
      shimmerSpeed: 4 + Math.random() * 6,
      opacity: 0.15 + Math.random() * 0.6,
      shineColor: Math.random() > 0.85 ? 'rgba(255,255,255,0.95)' : 'rgba(200,200,255,0.35)',
    }));
  }, []);

  return (
    <div className={`relative w-[30vh] h-[30vh] max-w-[300px] max-h-[300px] flex items-center justify-center transition-all duration-1000 ${isOverdrive ? 'scale-150' : 'scale-100'}`}>
      {/* Dynamic Light Rays */}
      <div className={`absolute w-[400%] h-[400%] opacity-40 pointer-events-none transition-all duration-[2000ms] ${isOverdrive ? 'animate-spin-fast opacity-100 scale-150 mix-blend-screen' : 'animate-spin-slow'}`}>
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className={`absolute top-1/2 left-1/2 w-full h-[1px] md:h-[2px] origin-left transition-colors duration-500 ${isOverdrive ? 'bg-gradient-to-r from-white via-white to-transparent' : 'bg-gradient-to-r from-white/30 via-pink-400/10 to-transparent'}`}
            style={{ transform: `translate(-50%, -50%) rotate(${i * 10}deg)` }}
          />
        ))}
      </div>

      {/* The Disco Ball */}
      <div 
        className={`relative w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center group transition-all duration-500 
          ${isOverdrive 
            ? 'border-[1vh] border-white shadow-[0_0_20vw_rgba(255,255,255,1)] brightness-150 animate-shake' 
            : 'border-[0.5vh] border-white/10 shadow-[0_0_10vw_rgba(255,255,255,0.15)]'
          }`}
      >
        
        {/* Mirror Tiles Grid */}
        <div className={`absolute inset-0 grid grid-cols-12 grid-rows-12 ${isOverdrive ? 'animate-spin-fast' : ''}`}>
          {facets.map((f, i) => (
            <div
              key={i}
              className="relative border-[0.1px] border-black/40 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${f.shineColor} 0%, rgba(40,40,60,1) 100%)`,
                animation: isOverdrive ? 'none' : `pulse ${f.duration}s infinite ease-in-out`,
                backgroundColor: isOverdrive ? '#fff' : undefined,
                animationDelay: `${f.delay}s`,
              }}
            >
              {!isOverdrive && (
                <div 
                  className="absolute inset-0 bg-white/10 transform -translate-x-full -translate-y-full rotate-45"
                  style={{ 
                    animation: `shimmer ${f.shimmerSpeed}s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
                    animationDelay: `${f.delay}s` 
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Moving Refraction */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-40 pointer-events-none" 
          style={{ animation: 'pulse 8s infinite ease-in-out' }} 
        />
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8vh_rgba(0,0,0,1)] pointer-events-none" />
        
        {/* Highlight - Blinds out during overdrive */}
        <div className={`absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-white/20 blur-[3vh] rounded-full pointer-events-none transition-all duration-300 ${isOverdrive ? 'opacity-100 scale-150 bg-white' : ''}`} />
      </div>

      {/* Hanging Chain - Hides during explosion/overdrive */}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300 ${isOverdrive ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-[0.5vh] h-[50vh] bg-gradient-to-t from-gray-500 via-gray-800 to-transparent opacity-50" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translate(-100%, -100%) rotate(45deg); opacity: 0; }
          20% { opacity: 1; }
          50%, 100% { transform: translate(100%, 100%) rotate(45deg); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; filter: brightness(1.3); }
        }
      `}} />
    </div>
  );
};

export default DiscoBall;
