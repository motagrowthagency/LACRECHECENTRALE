import { useState } from "react";
import { SvgIcons } from "@/components/icons";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";

export default function ParentSpace() {
  const { showToast } = useSite();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast("Veuillez renseigner une adresse email.");
      return;
    }
    showToast("Merci ! Vous serez informé(e) dès le lancement de l'Espace Parents.");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-[#19042E] min-h-[70vh] flex items-center">
      <Blob color="#F4B23E" className="absolute -top-24 -left-24 w-96 h-96 opacity-[0.14] pointer-events-none" />
      <Blob color="#C86446" className="absolute -bottom-24 -right-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F4B23E]/10 border border-[#F4B23E]/30 flex items-center justify-center">
          <SvgIcons.Lock className="w-7 h-7 text-[#F4B23E]" />
        </div>
        <Kicker light className="justify-center">Espace parents</Kicker>
        <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
          Bientôt <span className="italic text-[#F4B23E] font-medium">disponible</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-lg mx-auto">
          Un espace dédié pour suivre le quotidien de votre enfant (repas, sieste, activités), consulter les factures
          et communiquer directement avec l'équipe pédagogique.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white rounded-2xl p-2 border-2 border-[#301353] shadow-[5px_5px_0px_0px_#C86446] flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="flex-1 bg-transparent px-3.5 py-2.5 text-xs sm:text-sm text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-[#301353] hover:bg-[#200B3A] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition cursor-pointer"
          >
            M'informer
          </button>
        </form>
      </div>
    </section>
  );
}
