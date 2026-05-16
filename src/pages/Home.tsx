import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MoveRight, Play } from "lucide-react";
import { GAMES } from "@/src/data/games";
import { GameCard } from "@/src/components/ui/GameCard";
import { Button } from "@/src/components/ui/Button";

export function Home() {
  const featuredGames = GAMES.slice(0, 4);
  const newReleases = GAMES.slice(4, 10);

  return (
    <main className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="relative w-full px-6 md:px-12 pb-24 md:pb-40 pt-10 md:pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bupplo-purple/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <img src="https://imgur.com/q2VAwlz.png" alt="Bupplo Icon" className="h-24 md:h-32 drop-shadow-[0_0_40px_rgba(139,92,246,0.8)] mx-auto" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]"
          >
            PLAY BEYOND <br className="hidden md:block" /> THE <span className="text-bupplo-purple text-glow">LIMITS</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl mb-10"
          >
            Bupplo is het premium gaming platform voor extreem hoge kwaliteit en meeslepende ervaringen.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/games">
              <Button size="lg" variant="purple" className="text-lg px-12 group">
                Ontdek Alle Spellen
                <MoveRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Games Grid */}
      <section className="px-6 md:px-12 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">Uitgelicht</h2>
              <p className="text-white/50 font-medium uppercase tracking-widest text-sm">Onze beste ervaringen</p>
            </div>
            <Link to="/games" className="hidden md:flex items-center text-bupplo-purple font-bold hover:underline underline-offset-4">
              Bekijk alles <MoveRight size={18} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredGames.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 bg-bupplo-purple text-white overflow-hidden -skew-y-3 my-20">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-12 font-display text-7xl font-bold uppercase tracking-tighter"
          >
            <span>JOIN THE REVOLUTION</span>
            <span>&bull;</span>
            <span>BUPPLO GAMES</span>
            <span>&bull;</span>
            <span>NEXT GEN EXPERIENCE</span>
            <span>&bull;</span>
            <span>JOIN THE REVOLUTION</span>
            <span>&bull;</span>
            <span>BUPPLO GAMES</span>
            <span>&bull;</span>
          </motion.div>
        </div>
      </section>

      {/* New Releases Slider/Grid */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">Nieuw</h2>
            <p className="text-white/50 font-medium uppercase tracking-widest text-sm">Ontdek onze nieuwste releases</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newReleases.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 py-32 relative text-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-tr from-bupplo-purple/20 to-bupplo-blue/20 blur-[100px] rounded-full pointer-events-none" />
         <div className="relative z-10 glass-panel max-w-4xl mx-auto rounded-[3rem] p-12 md:p-24 border border-white/20 shadow-2xl glow-blue">
            <img src="https://imgur.com/87zSLZY.png" alt="Bupplo" className="h-12 md:h-16 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Word onderdeel van Bupplo</h2>
            <p className="text-white/70 font-medium text-lg mb-10 max-w-xl mx-auto">Maak een gratis account aan om scores op te slaan, vrienden toe te voegen en exclusieve games te ontgrendelen.</p>
            <Button size="lg" variant="blue" className="text-lg px-12">Account Aanmaken</Button>
         </div>
      </section>
    </main>
  );
}
