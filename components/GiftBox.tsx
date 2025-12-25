import React, { useState, useRef, useEffect } from "react";

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shakeClass, setShakeClass] = useState("");
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  const HOLD_DURATION = 2500;

  const triggerShake = () => {
    if (isPressing) return;
    setShakeClass("animate-bounce-short");
    setTimeout(() => setShakeClass(""), 400);
  };

  const updateProgress = (timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const newProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);

    setProgress(newProgress);

    if (newProgress >= 100) {
      setIsPressing(false);
      onOpen();
    } else {
      requestRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const startPress = (e: React.SyntheticEvent) => {
    if (e.type === "touchstart") {
    }

    setIsPressing(true);
    startTimeRef.current = null;
    requestRef.current = requestAnimationFrame(updateProgress);
  };

  const endPress = () => {
    setIsPressing(false);
    setProgress(0);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-10 z-20 relative">
      <div
        className={`transition-all duration-500 ${
          isPressing ? "opacity-50 scale-95" : "opacity-100 scale-100"
        } text-center space-y-1`}
      >
        <h2 className="text-xl font-extrabold tracking-tight text-slate-700">
          A Gift For You
        </h2>
        <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest">
          Tap to shake • Hold to open
        </p>
      </div>

      <div
        className="relative w-56 h-56 select-none touch-none cursor-pointer group"
        onClick={triggerShake}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          className="absolute inset-0 rounded-3xl bg-amber-200/60 blur-xl transition-all duration-200"
          style={{
            opacity: isPressing ? 0.8 : 0,
            transform: `scale(${0.8 + progress / 100})`,
          }}
        ></div>

        <div
          className={`relative w-full h-full transition-transform duration-200 ease-out ${shakeClass}`}
          style={{
            transform: isPressing
              ? `scale(0.95) rotate(${Math.sin(Date.now() / 50) * 2}deg)`
              : "scale(1) rotate(0deg)",
          }}
        >
          <div className="absolute bottom-0 w-full h-5/6 bg-red-700 rounded-3xl shadow-[0_20px_40px_-10px_rgba(185,28,28,0.4)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent"></div>
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-10 bg-white/10 backdrop-blur-sm border-l border-r border-white/5"></div>
          </div>

          <div className="absolute top-5 -left-1 w-[105%] h-1/4 bg-red-600 rounded-2xl shadow-lg z-10 flex justify-center items-center transform transition-transform group-hover:-translate-y-1 border-b-4 border-red-800">
            <div className="h-full w-10 bg-white/10 backdrop-blur-sm border-l border-r border-white/5"></div>
          </div>

          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-emerald-700 rounded-full shadow-md scale-75"></div>
              <div className="absolute top-2 -left-4 w-12 h-10 bg-emerald-600 rounded-full rotate-[-30deg] border-2 border-emerald-700"></div>
              <div className="absolute top-2 -right-4 w-12 h-10 bg-emerald-600 rounded-full rotate-[30deg] border-2 border-emerald-700"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-emerald-500 rounded-full shadow-sm z-10 border border-emerald-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1.5 w-32 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-75 ease-linear rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style={{ width: `${progress}%`, opacity: isPressing ? 1 : 0 }}
        ></div>
      </div>

      <style>{`
        .animate-bounce-short {
          animation: bounceShort 0.4s;
        }
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
};

export default GiftBox;
