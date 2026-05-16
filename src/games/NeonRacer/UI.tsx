import { useNeonRacerStore } from "./useNeonRacerStore";
import { Button } from "@/src/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";

export default function UI() {
  const gameState = useNeonRacerStore((state) => state.gameState);
  const score = useNeonRacerStore((state) => state.score);
  const reset = useNeonRacerStore((state) => state.reset);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
      {/* HUD */}
      {gameState === "playing" && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start"
        >
          <div className="glass-panel px-6 py-3 rounded-2xl pointer-events-auto flex gap-6">
            <div>
                <span className="text-white/50 text-sm font-bold uppercase tracking-widest mr-2">Score</span>
                <span className="text-3xl font-display font-bold text-bupplo-purple text-glow">{score}</span>
            </div>
            <div>
                <span className="text-white/50 text-sm font-bold uppercase tracking-widest mr-2">High</span>
                <span className="text-xl font-display font-bold text-white/80">{useNeonRacerStore.getState().highScore}</span>
            </div>
          </div>
          
          <div className="glass-panel px-6 py-3 rounded-2xl">
            <span className="text-white/50 text-sm font-bold uppercase tracking-widest block text-right">Controls</span>
            <div className="flex gap-2 mt-1">
              <kbd className="bg-white/10 px-2 rounded font-mono text-sm border border-white/20">A</kbd>
              <kbd className="bg-white/10 px-2 rounded font-mono text-sm border border-white/20">D</kbd>
              <span className="text-white/50 text-sm ml-2">or Arrows</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Start Screen */}
      <AnimatePresence>
        {gameState === "start" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            <div className="glass-panel p-12 rounded-3xl text-center max-w-lg glow-purple-strong border border-white/20">
              <h2 className="font-display text-5xl font-bold mb-4">Neon Racer</h2>
              <p className="text-white/70 mb-8 font-medium">
                Ontwijk de obstakels en zet de hoogste score neer.
              </p>
              <Button size="lg" variant="purple" onClick={reset} className="w-full text-lg">
                Start Game
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Screen */}
      <AnimatePresence>
        {gameState === "gameover" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 pointer-events-auto backdrop-blur-sm"
          >
            <div className="glass-panel p-12 rounded-3xl text-center max-w-lg glow-red border border-red-500/30">
              <h2 className="font-display text-5xl font-bold text-red-500 mb-2">CRASHED</h2>
              <p className="text-white/50 mb-8 font-bold uppercase tracking-widest text-sm">Game Over</p>
              
              <div className="flex justify-center gap-12 mb-8">
                  <div>
                    <span className="text-white/50 text-sm font-bold uppercase tracking-widest block mb-1">Score</span>
                    <span className="text-6xl font-display font-bold text-white text-glow">{score}</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-sm font-bold uppercase tracking-widest block mb-1">High Score</span>
                    <span className="text-4xl font-display font-bold text-white/70 mt-2 block">{useNeonRacerStore.getState().highScore}</span>
                  </div>
              </div>
              
              <Button size="lg" variant="purple" onClick={reset} className="w-full text-lg">
                Play Again
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
