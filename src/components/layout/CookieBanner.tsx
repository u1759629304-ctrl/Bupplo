import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("bupplo-cookies");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("bupplo-cookies", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("bupplo-cookies", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 glass-panel p-6 rounded-3xl z-50 shadow-2xl border border-white/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <img src="https://imgur.com/q2VAwlz.png" alt="Bupplo Icon" className="h-6" />
            <h3 className="font-display font-bold text-lg">Cookie Melding</h3>
          </div>
          <p className="text-white/70 text-sm font-medium mb-6 leading-relaxed">
            Wij gebruiken cookies om de Bupplo ervaring te optimaliseren en personaliseren. Accepteer je onze cookies?
          </p>
          <div className="flex gap-3">
            <Button variant="purple" className="flex-1" onClick={handleAccept}>Accepteren</Button>
            <Button variant="outline" className="flex-1" onClick={handleDecline}>Weigeren</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
