import { useState } from "react";
import { Link } from "react-router-dom";
import { SvgIcons } from "@/components/icons";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";

const QUESTIONS = [
  {
    q: "À partir de quel âge pouvez-vous accueillir mon enfant ?",
    a: "Nous accueillons les enfants dès l'âge de 3 mois et jusqu'à 5 ans, répartis en sections adaptées à chaque tranche d'âge (bébés, moyens, petite, moyenne et grande section).",
  },
  {
    q: "Quels sont vos horaires d'ouverture ?",
    a: "La Centrale Crèche est ouverte du lundi au vendredi de 7h30 à 18h, avec une garde possible jusqu'à 19h pour les parents actifs. Fermeture les jours fériés.",
  },
  {
    q: "Proposez-vous la halte-garderie ? Comment ça fonctionne ?",
    a: "Oui, nous proposons un accueil ponctuel à l'heure ou à la demi-journée, idéal pour un rendez-vous, des courses ou une adaptation progressive avant une inscription régulière.",
  },
  {
    q: "Comment se passe la période d'adaptation ?",
    a: "L'adaptation se fait en douceur sur quelques jours : votre enfant est d'abord accompagné par vous, puis progressivement laissé seul avec l'équipe pour des durées croissantes.",
  },
  {
    q: "Quels sont les tarifs ?",
    a: "Les tarifs varient selon la formule choisie (crèche régulière au mois ou halte-garderie à l'heure) et l'âge de l'enfant. Ils vous seront communiqués précisément lors de votre visite.",
  },
  {
    q: "Mon enfant est-il assuré au sein de la crèche ?",
    a: "Oui, tous les enfants accueillis à La Centrale Crèche bénéficient d'une couverture assurance pendant leur présence dans l'établissement.",
  },
  {
    q: "Que se passe-t-il si mon enfant est malade ?",
    a: "En cas de fièvre ou de maladie contagieuse, nous contactons immédiatement les parents. Un certificat médical peut être demandé pour le retour de l'enfant à la crèche.",
  },
  {
    q: "Qui peut venir récupérer mon enfant ?",
    a: "Seules les personnes autorisées par écrit par les parents peuvent récupérer l'enfant. Une pièce d'identité est systématiquement vérifiée à chaque départ.",
  },
  {
    q: "Fournissez-vous les repas ou dois-je apporter un déjeuner ?",
    a: "Tous les repas et goûters sont préparés sur place chaque matin à base d'ingrédients bio et frais, inclus dans la formule d'accueil.",
  },
  {
    q: "Comment se passe la communication avec les parents (cahier de liaison, application, etc.) ?",
    a: "Un cahier de liaison quotidien vous informe des repas, siestes et activités de votre enfant. L'équipe reste également disponible par téléphone pour toute question.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openRdv } = useSite();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -right-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">FAQ</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            Vos questions,{" "}
            <span className="relative inline-block italic text-[#F4B23E] font-medium">
              nos réponses
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#C86446" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus fréquentes des parents.
          </p>
        </div>
      </section>

      {/* ─── ACCORDÉON ────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {QUESTIONS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition ${isOpen ? "border-2 border-[#301353] bg-white shadow-[5px_5px_0px_0px_#C86446]" : "border border-[#ECE5DA] bg-white"}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
                >
                  <span className="font-serif-heading font-semibold text-sm sm:text-base text-[#301353]">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? "rotate-180 bg-[#301353]" : "bg-[#FAF6F0] border border-[#E8DFC9]"}`}
                  >
                    <SvgIcons.ChevronDown className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-[#C86446]"}`} />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1">
                    <p className="text-xs sm:text-sm text-[#5D4E72] leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-[#C86446]">
        <Blob color="#ffffff" className="absolute -top-16 -left-16 w-72 h-72 opacity-10 pointer-events-none" animate={false} />
        <Blob color="#301353" className="absolute -bottom-20 -right-10 w-80 h-80 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <h2 className="font-serif-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
            Une <span className="italic">autre question</span> ?
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos interrogations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openRdv("Prendre rendez-vous pour visiter La Centrale Crèche")}
              className="px-7 py-3.5 rounded-full bg-[#301353] hover:bg-[#200B3A] text-white text-sm font-bold shadow-lg transition"
            >
              Prendre rendez-vous
            </button>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-[#C86446] transition"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
