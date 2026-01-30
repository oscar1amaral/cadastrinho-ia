import React, { useState, useEffect } from "react";
import FormContainer from "./components/FormContainer";
import Notification from "./components/Notification";

const App: React.FC = () => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info",
  ) => {
    setNotification({ message, type });
    const timeout = type === "error" ? 10000 : 6000;
    setTimeout(() => setNotification(null), timeout);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cosmic py-16 px-4 overflow-hidden">
      {/* Decorative Cosmic Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Stars */}
        <div className="star w-1 h-1 top-[10%] left-[20%] animate-star-blink"></div>
        <div
          className="star w-2 h-2 top-[30%] left-[80%] animate-star-blink"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="star w-1 h-1 top-[70%] left-[15%] animate-star-blink"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="star w-1 h-1 top-[85%] left-[60%] animate-star-blink"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="star w-2 h-2 top-[15%] left-[50%] animate-star-blink"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Large Planet Left */}
        <div
          className="absolute top-[10%] -left-20 w-[300px] h-[300px] planet-gradient rounded-full shadow-[0_0_80px_rgba(255,0,128,0.3)] animate-float opacity-80"
          style={{ animationDuration: "15s" }}
        ></div>

        {/* Planet Right with Rings */}
        <div
          className="absolute top-[40%] -right-16 w-48 h-48 bg-gradient-to-br from-purple-500 to-indigo-900 rounded-full shadow-2xl animate-float opacity-70"
          style={{ animationDuration: "18s", animationDelay: "2s" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[20%] border-[8px] border-white/10 rounded-[100%] rotate-[25deg]"></div>
        </div>

        {/* Floating Pink Clouds Bottom */}
        <div className="absolute -bottom-10 -left-20 w-[400px] h-[300px] bg-space-pink/30 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div
          className="absolute -bottom-10 -right-20 w-[500px] h-[350px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center">
        <header className="text-center mb-12 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Pigz IA
            </h3>
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
              Crie o cardápio com auxilio da{" "}
              <span className="text-white font-medium">
                Inteligência Artificial
              </span>
              .
            </p>
          </div>
        </header>

        <FormContainer onNotify={showNotification} />
      </main>

      <footer className="relative z-10 mt-16 text-white/20 text-xs tracking-widest uppercase font-bold">
        Exploration @ Oscar Amaral
      </footer>
    </div>
  );
};

export default App;
