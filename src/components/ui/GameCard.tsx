import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Game } from "@/src/data/games";
import { cn } from "@/src/lib/utils";

import React from "react";

interface GameCardProps {
  key?: React.Key;
  game: Game;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  const glowClass = `glow-${game.color}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      <Link to={`/games/${game.id}`} className="block">
        <div className={cn(
          "h-64 sm:h-80 w-full rounded-3xl overflow-hidden glass-panel relative p-6 flex flex-col justify-end transition-all duration-300",
          "group-hover:border-white/30",
          glowClass,
          !game.image && `bg-gradient-to-b ${game.gradient}`
        )}>
          {/* Main Image */}
          {game.image && (
            <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          )}

          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          
          <div className="relative z-20">
            <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
              {game.category}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
              {game.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              {game.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white font-medium border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
