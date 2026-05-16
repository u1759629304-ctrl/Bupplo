import { Link } from "react-router-dom";

export function Footer() {
  const links = {
    Play: [
      { name: "All Games", path: "/games" },
      { name: "New Releases", path: "/category/new" },
      { name: "Multiplayer", path: "/category/multiplayer" },
    ],
    Studio: [
      { name: "Over Ons", path: "/about" },
      { name: "Werken bij Bupplo", path: "/careers" },
      { name: "Nieuws & Blog", path: "/blog" },
      { name: "Pers", path: "/press" },
    ],
    Support: [
      { name: "Contact", path: "/contact" },
      { name: "FAQ", path: "/faq" },
      { name: "Cookie instellingen", path: "/cookies" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
    ]
  };

  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10 mt-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[400px] bg-bupplo-purple/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <img src="https://imgur.com/87zSLZY.png" alt="Bupplo Games" className="h-10 mb-6 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]" />
            <p className="text-white/50 text-sm font-medium leading-relaxed max-w-sm mb-8">
              Bupplo is een next-gen game studio gedreven door innovatie en design. 
              Wij creëren werelden waarin je jezelf kunt verliezen.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer text-white">X</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer text-white">In</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/20 transition-colors cursor-pointer text-white">Yt</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white/50 mb-6">Games</h4>
            <ul className="flex flex-col gap-4">
              {links.Play.map(l => (
                <li key={l.name}><Link to={l.path} className="text-white hover:text-bupplo-purple transition-colors font-medium text-sm">{l.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white/50 mb-6">Studio</h4>
            <ul className="flex flex-col gap-4">
              {links.Studio.map(l => (
                <li key={l.name}><Link to={l.path} className="text-white hover:text-bupplo-purple transition-colors font-medium text-sm">{l.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white/50 mb-6">Support & Legal</h4>
            <ul className="flex flex-col gap-4">
              {links.Support.map(l => (
                <li key={l.name}><Link to={l.path} className="text-white hover:text-bupplo-purple transition-colors font-medium text-sm">{l.name}</Link></li>
              ))}
              {links.Legal.map(l => (
                <li key={l.name}><Link to={l.path} className="text-white hover:text-bupplo-purple transition-colors font-medium text-sm">{l.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-medium">
          <p>&copy; {new Date().getFullYear()} Bupplo Games. Alle rechten voorbehouden.</p>
          <div className="flex gap-4">
            <span>Powered by Bupplo Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
