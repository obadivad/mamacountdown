
import React from 'react';
import { TimeLeft } from '../types';

interface Props {
  timeLeft: TimeLeft;
}

const CountdownDisplay: React.FC<Props> = ({ timeLeft }) => {
  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center px-[1vw] md:px-[2vw]">
      <div 
        className="font-black font-mono tracking-tighter text-white glow-text leading-none"
        style={{ fontSize: '15vw' }}
      >
        {value.toString().padStart(2, '0')}
      </div>
      <div 
        className="font-bold tracking-[0.3em] text-pink-400 uppercase mt-[1vh]"
        style={{ fontSize: '1.5vw' }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center space-x-[0.5vw] md:space-x-[1vw]">
      {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="Days" />}
      {timeLeft.days > 0 && <span className="text-[5vw] text-gray-600 opacity-50 mb-[2vh]">:</span>}
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <span className="text-[5vw] text-gray-600 opacity-50 mb-[2vh]">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <span className="text-[5vw] text-gray-600 opacity-50 mb-[2vh]">:</span>
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownDisplay;
