import React, { useState, useEffect, useCallback } from "react";
import { CONFIG } from "./constants";
import { TimeLeft } from "./types";
import GlitterCanvas from "./components/GlitterCanvas";
import DiscoBall from "./components/DiscoBall";
import CountdownDisplay from "./components/CountdownDisplay";
import MamaLogo from "./components/MamaLogo";
import MessageTicker from "./components/MessageTicker";
import MessageModal from "./components/MessageModal";
import { MessageSquarePlus } from "lucide-react";

type AnimationStage = "countdown" | "overdrive" | "party";

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [stage, setStage] = useState<AnimationStage>("countdown");
  const [mounted, setMounted] = useState(false);

  // Message System State
  const [messages, setMessages] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const triggerMidnightSequence = useCallback(() => {
    // Stage 1: Overdrive (Buildup)
    setStage("overdrive");

    // Stage 2: The Explosion/Party (after 2.5 seconds of buildup)
    setTimeout(() => {
      setStage("party");
    }, 2500);
  }, []);

  const handleAddMessage = (msg: string) => {
    setMessages((prev) => [msg, ...prev].slice(0, 20)); // Keep last 20 messages
  };

  const calculateTimeLeft = useCallback((): TimeLeft | null => {
    const difference = +new Date(CONFIG.targetDate) - +new Date();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const initial = calculateTimeLeft();
    if (initial) {
      setTimeLeft(initial);
    } else {
      setStage("party");
    }

    const timer = setInterval(() => {
      if (stage !== "countdown") {
        clearInterval(timer);
        return;
      }

      const remaining = calculateTimeLeft();
      if (!remaining) {
        clearInterval(timer);
        triggerMidnightSequence();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, stage, triggerMidnightSequence]);

  if (!mounted) return null;

  return (
    <div
      className={`relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden select-none ${
        stage === "party" ? "animate-strobe" : "bg-black"
      }`}
    >
      {/* Background Ambience */}
      {stage !== "party" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,100,255,0.15)_0%,_rgba(0,0,0,1)_100%)]" />
      )}

      <GlitterCanvas />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative z-30 flex flex-col items-center justify-center w-full h-full pb-[5vh]">
        {/* 1. MAMA LOGO (Top) */}
        <div
          className={`relative z-20 transform-gpu transition-opacity duration-500 ${
            stage === "overdrive" ? "opacity-0" : "opacity-100"
          }`}
        >
          <MamaLogo />
        </div>

        {/* Sub Message */}
        {stage === "countdown" && (
          <p className="relative z-20 text-[1.2vw] md:text-[0.8vw] tracking-[1.5em] text-pink-500 font-black uppercase -mt-[2vh] mb-[2vh] opacity-80 animate-pulse">
            {CONFIG.subMessage}
          </p>
        )}

        {/* 2. DISCO BALL (Middle - Bigger & Between) */}
        <div
          className={`
            relative z-10 my-[2vh]
            transform-gpu transition-all duration-[2000ms] ease-in-out
            ${stage === "countdown" ? "scale-150 opacity-100" : ""}
            ${stage === "overdrive" ? "scale-[3] z-50" : ""}
            ${stage === "party" ? "scale-0 opacity-0 hidden" : ""}
          `}
        >
          <DiscoBall isOverdrive={stage === "overdrive"} />
        </div>

        {/* 3. COUNTDOWN (Bottom) */}
        {stage === "countdown" && (
          <div className="relative z-20 flex flex-col items-center animate-in fade-in zoom-in duration-1000 mt-[2vh]">
            <CountdownDisplay timeLeft={timeLeft} />
            <p
              onClick={triggerMidnightSequence}
              className="mt-[4vh] text-[1vw] font-black tracking-[1em] text-white/30 uppercase italic cursor-pointer hover:text-pink-500 hover:opacity-100 transition-all duration-300"
              title="Click to preview midnight animation"
            >
              Until the Flashback Begins
            </p>
          </div>
        )}

        {/* --- STAGE 3: THE PARTY --- */}
        {stage === "party" && (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-50">
            <div className="absolute inset-0 bg-white animate-flash-fade pointer-events-none z-50" />

            <div className="relative z-40 text-center flex flex-col items-center justify-center space-y-[2vh]">
              <div className="flex flex-col items-center leading-none">
                <span
                  className="text-[5vw] text-white font-black italic tracking-widest animate-slam"
                  style={{
                    animationDelay: "0.1s",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  MAMA
                </span>
                <span
                  className="text-[4vw] text-white font-bold tracking-[1em] animate-slam"
                  style={{
                    animationDelay: "0.2s",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  WISHES YOU A
                </span>

                <div className="flex items-center space-x-6 my-[2vh]">
                  <span
                    className="text-[8vw] text-emerald-400 font-black italic animate-slam animate-text-party"
                    style={{
                      animationDelay: "0.4s",
                      fontFamily: "'Bungee', cursive",
                      textShadow: "5px 5px 0px #000",
                    }}
                  >
                    HAPPY
                  </span>
                  <span
                    className="text-[4vw] text-white font-black animate-slam"
                    style={{ animationDelay: "0.5s" }}
                  >
                    &
                  </span>
                  <span
                    className="text-[8vw] text-pink-500 font-black italic animate-slam animate-text-party"
                    style={{
                      animationDelay: "0.6s",
                      fontFamily: "'Bungee', cursive",
                      textShadow: "5px 5px 0px #000",
                    }}
                  >
                    AMAZING
                  </span>
                </div>

                <span
                  className="text-[15vw] font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 animate-slam"
                  style={{
                    animationDelay: "0.8s",
                    fontFamily: "'Bungee', cursive",
                    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.8))",
                  }}
                >
                  2026
                </span>
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 1}vw`,
                    height: `${Math.random() * 1}vw`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: [
                      "#ff00cc",
                      "#3333ff",
                      "#00d4ff",
                      "#ff00cc",
                    ][Math.floor(Math.random() * 4)],
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- INTERACTIVE COMPONENTS --- */}

      {/* Ticker - Only shows during Countdown to avoid cluttering the Explosion */}
      {/* {stage === "countdown" && <MessageTicker messages={messages} />} */}

      {/* Message Input Trigger - Visible always unless in Overdrive */}
      {/* 
      {stage !== "overdrive" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-[8vh] right-[2vw] z-50 p-4 bg-pink-600 hover:bg-pink-500 text-white rounded-full shadow-[0_0_20px_rgba(255,20,147,0.5)] transition-all hover:scale-110 active:scale-95 group"
          title="Send a message"
        >
          <MessageSquarePlus size={24} className="group-hover:animate-bounce" />
        </button>
      )}
      */}

      {/* Modals */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSend={handleAddMessage}
      />

      {/* Footer - Only visible in countdown, adjust height to accommodate ticker */}
      {stage === "countdown" && (
        <footer className="absolute bottom-[2vh] w-full flex justify-between px-[5vw] text-white/20 text-[0.7vw] uppercase font-bold tracking-[0.5em] z-20 pointer-events-none">
          <div>MAMA SHELTER LISBOA</div>
          <div className="flex items-center space-x-2">
            <span>FLASHBACK</span>
            <span className="w-1 h-1 rounded-full bg-pink-500/50"></span>
            <span>PARTY 2026</span>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
