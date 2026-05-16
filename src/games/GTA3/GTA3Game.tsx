import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/Button";

export default function GTA3Game() {
  return (
    <div className="w-full h-[calc(100vh-80px)] bg-black flex items-center justify-center relative overflow-hidden font-mono">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3a3a3a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="max-w-2xl text-center glass-panel p-12 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] relative z-10">
          <h2 className="font-display text-5xl text-white font-bold mb-4 tracking-tight">Coming Soon</h2>
          <p className="text-white/70 text-lg font-medium">
             GTA 3 / Liberty City Stories is currently under development. Please check back later!
          </p>
      </div>
    </div>
  );
}
