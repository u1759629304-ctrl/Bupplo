import { Link, useLocation } from "react-router-dom";
import { Menu, X, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Games", path: "/games" },
    { name: "Categories", path: "/categories" },
    { name: "Studio", path: "/studio" },
    { name: "Nieuws", path: "/blog" },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-4 bg-bupplo-black/80 backdrop-blur-md border-b border-white/5" : "py-6 bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            {/* The prompt mentioned https://imgur.com/q2VAwlz & https://imgur.com/XCvIFdk. Since they are imgur links, we'll embed them directly if requested, or just use text if we want minimalism. It requested to use the full logo a lot. */}
            <img src="https://imgur.com/87zSLZY.png" alt="Bupplo Logo" className="h-8 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-transform group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="purple" size="sm">Mijn Account</Button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-white bg-white/10 p-2 rounded-full border border-white/5"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-bupplo-dark border-l border-white/10 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12 mt-2">
              <img src="https://imgur.com/q2VAwlz.png" alt="Bupplo Icon" className="h-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-white/10 p-2 rounded-full border border-white/5"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="font-display text-4xl font-bold tracking-tight"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pb-8">
              <Button variant="purple" className="w-full">Mijn Account</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
