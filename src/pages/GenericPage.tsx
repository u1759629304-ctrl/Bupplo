import { motion } from "motion/react";
import React from "react";

interface GenericPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function GenericPage({ title, subtitle, children }: GenericPageProps) {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4 text-glow">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-white/50 font-medium mb-16">
            {subtitle}
          </p>
        )}
        
        <div className="prose prose-invert prose-lg max-w-none mt-12 glass-panel p-8 md:p-12 rounded-3xl border border-white/10">
          {children}
        </div>
      </motion.div>
    </main>
  );
}
