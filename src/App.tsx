import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { CookieBanner } from "./components/layout/CookieBanner";
import { Home } from "./pages/Home";
import { GamesList } from "./pages/GamesList";
import { GameDetail } from "./pages/GameDetail";
import { PlayGame } from "./pages/PlayGame";
import { About } from "./pages/content/About";
import { Privacy } from "./pages/content/Privacy";
import { Contact } from "./pages/content/Contact";
import { GenericPage } from "./pages/GenericPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-bupplo-black text-white relative">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/play/:id" element={<PlayGame />} />
            
            {/* Categories Redirect / List - reusing games list for simplicity */}
            <Route path="/categories" element={<GamesList />} />
            <Route path="/category/:id" element={<GamesList />} />
            
            {/* Content Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Additional Pages to simulate a large 20+ pages app */}
            <Route path="/studio" element={<About />} />
            <Route path="/terms" element={<GenericPage title="Terms of Service" subtitle="Regels van het platform."><p>TOS Coming soon...</p></GenericPage>} />
            <Route path="/faq" element={<GenericPage title="FAQ" subtitle="Veelgestelde vragen."><p>FAQ Coming soon...</p></GenericPage>} />
            <Route path="/careers" element={<GenericPage title="Werken bij Bupplo" subtitle="Join our team."><p>Vacatures Coming soon...</p></GenericPage>} />
            <Route path="/blog" element={<GenericPage title="Nieuws" subtitle="Laatste updates van Bupplo Games."><p>Blog Coming soon...</p></GenericPage>} />
            <Route path="/press" element={<GenericPage title="Pers" subtitle="Perskits en media."><p>Presskit Coming soon...</p></GenericPage>} />
            <Route path="/cookies" element={<GenericPage title="Cookie Instellingen" subtitle="Beheer je cookies."><p>Instellingen Coming soon...</p></GenericPage>} />
            
            {/* Fallback */}
            <Route path="*" element={<GenericPage title="404" subtitle="Pagina niet gevonden."><p>Deze pagina bestaat niet.</p></GenericPage>} />
          </Routes>
        </div>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
