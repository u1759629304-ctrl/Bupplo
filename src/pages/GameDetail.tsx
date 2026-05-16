import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoveLeft, Play, Info, Trophy, Users, MonitorSmartphone } from "lucide-react";
import { GAMES } from "@/src/data/games";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

export function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!game) {
    return <div className="pt-40 text-center font-display text-4xl">Spel niet gevonden.</div>;
  }

  const handlePlayClick = () => {
    if (game.id === "neon-racer" || game.id === "shadow-ninja" || game.id === "gta-vice-city" || game.id === "flappy-bird" || game.id === "classic-chess") {
      navigate(`/play/${game.id}`);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <main className="min-h-screen relative pb-24">
      {/* Dynamic Background */}
      <div className={cn(
        "absolute inset-0 h-[60vh] bg-gradient-to-b opacity-20 pointer-events-none blur-[100px]",
        game.gradient
      )} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 relative z-10">
        <Link to="/games" className="inline-flex items-center text-white/50 hover:text-white font-medium uppercase tracking-widest text-xs mb-12 transition-colors">
          <MoveLeft className="mr-2" size={16} /> Terug naar overzicht
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column - Main Info */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className={cn("text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/20", `border-${game.color}-500/50 text-${game.color}-400`)}>
                  {game.category}
                </span>
                <div className="flex gap-2">
                  {game.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-white/60 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6">
                {game.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed mb-12">
                {game.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button 
                  size="lg" 
                  variant={game.color} 
                  className="text-xl px-12 py-8 group"
                  onClick={handlePlayClick}
                >
                  <Play className="mr-4 fill-white flex-shrink-0" size={24} /> 
                  Speel Nu
                </Button>
                <Button size="lg" variant="outline" className="text-xl px-8 py-8">
                  <Info className="mr-3" size={20} /> Details
                </Button>
              </div>

            </motion.div>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 md:p-10 rounded-3xl"
            >
              <h3 className="font-display text-2xl font-bold mb-8">Features</h3>
              <ul className="space-y-6">
                {game.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className={cn("mt-1 w-6 h-6 rounded-full flex items-center justify-center bg-white/10 text-white")}>
                      <Trophy size={12} />
                    </div>
                    <span className="text-lg font-medium text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Media / Details */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={cn(
                "aspect-[4/5] w-full rounded-[2.5rem] relative overflow-hidden flex flex-col justify-end p-8 border border-white/10",
                `glow-${game.color}`,
                !game.image && `bg-gradient-to-t ${game.gradient}`
              )}
            >
               {game.image && (
                 <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover" />
               )}
               {/* Abstract graphics instead of images as requested */}
               {!game.image && <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)' }} />}
               
               <div className="relative z-10 glass-panel rounded-2xl p-6 border border-white/20 bg-black/60 backdrop-blur-md">
                  <img src="https://imgur.com/87zSLZY.png" alt="Bupplo" className="h-6 mb-8 opacity-70" />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-white/50 text-sm font-medium">Ontwikkelaar</span>
                      <span className="font-bold">{game.developer || "Bupplo Studio"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span className="text-white/50 text-sm font-medium">Release</span>
                      <span className="font-bold">Binnenkort</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm font-medium">Platform</span>
                      <div className="flex gap-2 text-white">
                        <MonitorSmartphone size={18} />
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Coming Soon Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-1/2 z-50 rounded-full py-4 px-8 glass-panel border border-white/20 shadow-2xl flex items-center gap-4 bg-[#0a0a0a]/90 backdrop-blur-xl"
          >
            <div className={`w-3 h-3 rounded-full bg-${game.color}-500 animate-pulse`} />
            <span className="font-display font-bold text-lg">Coming soon..</span>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
