import React, { createContext, useContext, useState } from "react";
import { leadsDb } from "@/lib/leadsDb";
import { SvgIcons } from "@/components/icons";

interface SiteContextValue {
  showToast: (msg: string) => void;
  openRdv: (title?: string) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}

export default function SiteProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRdvOpen, setIsRdvOpen] = useState(false);
  const [rdvTitle, setRdvTitle] = useState("Demande de place & Visite");
  const [heroAge] = useState("Moyen (12 – 24 mois)");
  const [heroRythme] = useState("Toute la journée (7h30 – 18h)");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openRdv = (title?: string) => {
    setRdvTitle(title || "Demande de place & Visite");
    setIsRdvOpen(true);
  };

  const handleRdvSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const parentName = formData.get("parentName") as string;
    const phone = formData.get("phone") as string;
    const age = (formData.get("childAge") as string) || heroAge;
    const availability = (formData.get("availability") as string) || "Septembre 2026";
    const email = (formData.get("email") as string) || "";

    leadsDb.addLead({
      parentName: parentName || "Parent Visiteur",
      phone: phone || "06 00 00 00 00",
      email,
      childAge: `Enfant (${age})`,
      type: "VISITE",
      solutions: [heroRythme.toUpperCase(), `SECTION : ${age.toUpperCase()}`, "VISITE GUIDÉE DES LOCAUX"],
      sector: "MARCHÉ CENTRAL",
      formula: heroRythme,
      startDate: availability,
      message: `Demande via modal (${rdvTitle})`,
      source: "Modal Devis",
      status: "Visite programmée",
    });

    setIsRdvOpen(false);
    showToast("Votre demande de rendez-vous a bien été envoyée à la direction !");
  };

  return (
    <SiteContext.Provider value={{ showToast, openRdv }}>
      {children}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[60] bg-[#301353] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#F4B23E]/40">
          <SvgIcons.Sparkles className="w-5 h-5 text-[#F4B23E]" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 text-slate-300 hover:text-white text-xs uppercase font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {isRdvOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#301353]/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#ECE5DA] space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-heading font-semibold text-xl text-[#301353]">{rdvTitle}</h3>
              <button
                onClick={() => setIsRdvOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#5D4E72]">
              Remplissez ce formulaire rapide pour être recontacté par la directrice de La Centrale Crèche Casablanca sous 24h.
            </p>

            <form onSubmit={handleRdvSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase text-[#736387] mb-1">Nom du parent *</label>
                <input
                  type="text"
                  name="parentName"
                  required
                  placeholder="Ex: Salma Alami"
                  className="w-full bg-[#FAF6F0] border border-[#E2D7C8] rounded-xl px-3.5 py-2.5 text-xs text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#736387] mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="06 .. .. .. .."
                    className="w-full bg-[#FAF6F0] border border-[#E2D7C8] rounded-xl px-3.5 py-2.5 text-xs text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#736387] mb-1">Âge de l'enfant</label>
                  <input
                    type="text"
                    name="childAge"
                    defaultValue={heroAge}
                    className="w-full bg-[#FAF6F0] border border-[#E2D7C8] rounded-xl px-3.5 py-2.5 text-xs text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-[#736387] mb-1">Disponibilité / Date souhaitée</label>
                <input
                  type="text"
                  name="availability"
                  placeholder="Ex: Dès la semaine prochaine en matinée"
                  className="w-full bg-[#FAF6F0] border border-[#E2D7C8] rounded-xl px-3.5 py-2.5 text-xs text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                />
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsRdvOpen(false)}
                  className="w-1/2 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#301353] hover:bg-[#200B3A] text-white text-xs font-bold shadow-md transition cursor-pointer"
                >
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SiteContext.Provider>
  );
}
