import { GenericPage } from "../GenericPage";
import { Button } from "@/src/components/ui/Button";

export function Contact() {
  return (
    <GenericPage title="Contact" subtitle="Hulp nodig of een briljant idee?">
      <h2>Neem contact op</h2>
      <p>
        Heb je een bug gevonden? Een geweldig idee voor een nieuwe Bupplo game? Of wil je gewoon even hallo zeggen? Stuur ons een bericht en ons team neemt zo snel mogelijk contact met je op.
      </p>
      
      <form className="mt-8 flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Bericht verzonden! (Demo)"); }}>
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-white/50 mb-2">Naam</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bupplo-purple transition-colors" placeholder="Jouw naam" required />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-white/50 mb-2">Email</label>
          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bupplo-purple transition-colors" placeholder="jouw@email.com" required />
        </div>
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-white/50 mb-2">Bericht</label>
          <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bupplo-purple transition-colors resize-none" placeholder="Wat is er aan de hand?" required></textarea>
        </div>
        <Button variant="purple" size="lg" className="w-full sm:w-auto self-start mt-2">
          Verstuur Bericht
        </Button>
      </form>
    </GenericPage>
  );
}
