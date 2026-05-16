import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import NeonRacerGame from "../games/NeonRacer/NeonRacerGame";
import ShadowNinjaGame from "../games/ShadowNinja/ShadowNinjaGame";
import FlappyBirdGame from "../games/FlappyBird/FlappyBirdGame";
import ClassicChessGame from "../games/ClassicChess/ClassicChessGame";

export function PlayGame() {
  const { id } = useParams();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-0 flex flex-col">
      <div className="px-6 md:px-12 py-4 flex justify-between items-center border-b border-white/10 glass-panel z-50">
        <Link to={`/games/${id}`} className="inline-flex items-center text-white/50 hover:text-white font-medium uppercase tracking-widest text-xs transition-colors">
          <MoveLeft className="mr-2" size={16} /> Exit Game
        </Link>
        <div className="font-display font-bold text-lg uppercase tracking-widest text-white/80">
          {id?.replace("-", " ")}
        </div>
      </div>
      
      <div className="flex-1 w-full relative bg-black">
        {id === "neon-racer" ? (
          <NeonRacerGame />
        ) : id === "shadow-ninja" ? (
          <ShadowNinjaGame />
        ) : id === "flappy-bird" ? (
          <FlappyBirdGame />
        ) : id === "classic-chess" ? (
          <ClassicChessGame />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            Game {id} is nog niet geïmplementeerd. (Coming soon)
          </div>
        )}
      </div>
    </main>
  );
}
