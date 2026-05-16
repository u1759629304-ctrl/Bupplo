import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { GAMES, CATEGORIES } from "@/src/data/games";
import { GameCard } from "@/src/components/ui/GameCard";
import { Button } from "@/src/components/ui/Button";

export function GamesList() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGames = activeCategory === "All" 
    ? GAMES 
    : GAMES.filter(g => g.category === activeCategory);

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Popular / GTA Section */}
        <div className="mb-12">
          <div className="glass-panel rounded-[2.5rem] overflow-hidden relative group">
            <div className="absolute inset-0">
              <img src="https://play-lh.googleusercontent.com/ujih8zF9R2ghF-qx2-gfu9hzDybab_hkmbTcelcS_lipXzbN0Yq9uSjXXNhfMucNqW84=w526-h296-rw" alt="GTA III Vice City" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 p-12 md:p-20 flex flex-col items-start border border-white/10 rounded-[2.5rem]">
              <span className="text-bupplo-yellow font-bold uppercase tracking-widest text-sm mb-4 bg-yellow-500/20 px-4 py-1 rounded-full text-yellow-400">Populair!</span>
              <span className="text-white/70 font-medium text-xl md:text-2xl mb-2">De originele</span>
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 text-white drop-shadow-lg">GTA III Vice City</h2>
              <Link to="/games/gta-vice-city">
                <Button size="lg" variant="yellow" className="text-lg px-12 group-hover:scale-105 transition-transform flex items-center">
                  <Play className="mr-3 fill-black text-black" size={20} /> Speel Nu
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4"
            >
              Alle Spellen
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-lg font-medium"
            >
              Ontdek 20+ exclusieve next-gen ervaringen.
            </motion.p>
          </div>
          
          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-white text-bupplo-black shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
        
        {filteredGames.length === 0 && (
          <div className="py-20 text-center text-white/50 font-medium">
            Geen spellen gevonden in deze categorie.
          </div>
        )}

      </div>
    </main>
  );
}
