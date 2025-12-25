import React, { useState } from "react";
import { FRIENDS_DATA } from "./constants";
import { FriendData } from "./types";
import Snow from "./components/Snow";
import GiftBox from "./components/GiftBox";
import { ArrowRight, Sparkles, X, ChevronDown } from "lucide-react";

type Phase = "login" | "gift" | "reveal";

const HangingOrnament = () => (
  <div className="relative w-24 h-32 mx-auto mb-2 ornament-sway z-20 pointer-events-none">
    <div className="absolute -top-32 left-1/2 w-[1px] h-32 bg-slate-400"></div>

    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-3 bg-gradient-to-b from-amber-300 to-amber-500 rounded-sm shadow-sm z-10"></div>
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-amber-400 rounded-full"></div>

    <div className="absolute top-2 left-0 w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-xl flex items-center justify-center overflow-hidden border-2 border-red-800/10">
      <div className="absolute top-4 left-4 w-8 h-4 rounded-[50%] bg-white opacity-30 rotate-[-45deg] blur-[2px]"></div>
      <div className="absolute bottom-2 w-full h-8 bg-amber-400/20 skew-y-6 blur-sm border-t border-amber-300/30"></div>

      <Sparkles
        className="text-amber-100 drop-shadow-md animate-pulse"
        size={32}
        strokeWidth={1.5}
      />
    </div>
  </div>
);

const App: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("login");
  const [selectedKey, setSelectedKey] = useState<string>(
    Object.keys(FRIENDS_DATA)[0]
  );
  const [passcodeInput, setPasscodeInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFriend, setActiveFriend] = useState<FriendData | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const friend = FRIENDS_DATA[selectedKey];

    if (friend.passcode === passcodeInput.trim()) {
      setActiveFriend(friend);
      setErrorMsg("");
      setPhase("gift");
    } else {
      setErrorMsg("Mali imo password, tangi.");
      setPasscodeInput("");
    }
  };

  const handleGiftOpen = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#dc2626", "#16a34a", "#facc15", "#ffffff"],
        disableForReducedMotion: true,
      });
    }
    setPhase("reveal");
  };

  const handleRestart = () => {
    setPhase("login");
    setPasscodeInput("");
    setActiveFriend(null);
    setSelectedKey(Object.keys(FRIENDS_DATA)[0]);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-6 overflow-hidden">
      <Snow />
      <div className="fixed inset-0 bg-[#fffcf5] -z-20"></div>

      <div className="fixed top-[-5%] left-[-5%] w-[30rem] h-[30rem] bg-red-200/30 rounded-full mix-blend-multiply filter blur-[80px] blob"></div>
      <div
        className="fixed bottom-[-5%] right-[-5%] w-[25rem] h-[25rem] bg-emerald-200/30 rounded-full mix-blend-multiply filter blur-[80px] blob"
        style={{ animationDelay: "5s" }}
      ></div>
      <div
        className="fixed top-[40%] left-[30%] w-[20rem] h-[20rem] bg-amber-100/40 rounded-full mix-blend-multiply filter blur-[60px] blob"
        style={{ animationDelay: "10s" }}
      ></div>

      <main className="w-full max-w-md z-10">
        {phase === "login" && (
          <div className="animate-fade-in-up relative">
            <div className="absolute -top-32 left-0 w-full pointer-events-none">
              <HangingOrnament />
            </div>

            <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(185,28,28,0.1)] border border-white/60">
              <div className="text-center mb-8 mt-4">
                <h1 className="text-4xl md:text-5xl text-slate-800 tracking-tight leading-tight">
                  The Best Christmas <br />
                  <span className="text-red-600 italic font-serif">
                    Exchange (ever)
                  </span>
                </h1>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4 text-lg md:text-xl font-medium text-slate-600 leading-relaxed text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span>Hello! Ako diay si</span>
                    <div className="relative w-full">
                      <select
                        value={selectedKey}
                        onChange={(e) => setSelectedKey(e.target.value)}
                        className="w-full appearance-none bg-white py-3 px-6 rounded-full text-center text-slate-800 font-serif font-bold cursor-pointer shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-200"
                      >
                        {Object.keys(FRIENDS_DATA).map((key) => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span>and ang akong Password kay</span>
                    <input
                      type="password"
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      placeholder="••••"
                      className="w-full bg-white py-3 px-6 rounded-full text-center text-slate-800 font-serif font-bold placeholder-slate-300 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="text-red-500 text-sm font-bold text-center italic animate-pulse">
                    * {errorMsg} *
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="group w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-3"
                  >
                    <span className="tracking-widest uppercase text-xs">
                      Unlock Gift
                    </span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {phase === "gift" && (
          <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[50vh]">
            <GiftBox onOpen={handleGiftOpen} />
          </div>
        )}

        {phase === "reveal" && activeFriend && (
          <div className="animate-scale-in">
            <div className="bg-white p-6 pb-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] text-center relative max-w-xs mx-auto mt-10">
              <div className="mb-6 space-y-3">
                <h2 className="font-hand text-4xl font-bold text-red-600">
                  Hi {activeFriend.realName},
                </h2>
                <p className="font-hand text-xl text-slate-600 leading-tight">
                  {activeFriend.note}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-3 mb-8 rotate-1 hover:rotate-0 transition-transform duration-500 shadow-inner">
                <img
                  src={activeFriend.giftImage}
                  alt="Gift"
                  className="w-full aspect-square object-cover rounded-xl shadow-sm"
                />
              </div>

              <button
                onClick={handleRestart}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 p-3 bg-white/60 hover:bg-white backdrop-blur-md rounded-full text-slate-400 hover:text-emerald-600 shadow-sm transition-all transform hover:scale-110"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-scale-in {
            animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default App;
