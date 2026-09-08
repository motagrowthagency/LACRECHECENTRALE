import { Link } from "react-router-dom";
import { SvgIcons } from "@/components/icons";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";

const GALLERY_LABELS = [
  "Espace de jeux principal",
  "Coin sieste",
  "Salle de motricité",
  "Espace extérieur",
  "Atelier peinture",
  "Séance musicale",
  "Jeux de construction",
  "Fête d'anniversaire",
];

const ARTICLES = [
  { title: "La rentrée à La Centrale : conseils pour une transition en douceur", tag: "Conseils parents" },
  { title: "L'importance du jeu libre dans le développement de l'enfant", tag: "Pédagogie" },
  { title: "Nos astuces pour un sommeil de qualité à la crèche", tag: "Bien-être" },
];

const EVENTS = [
  { title: "Fête de fin d'année", date: "Juin 2027", icon: SvgIcons.Star },
  { title: "Spectacle de Noël / Aïd", date: "Décembre / selon calendrier", icon: SvgIcons.Sparkles },
  { title: "Journée portes ouvertes", date: "Septembre 2026", icon: SvgIcons.Calendar },
];

export default function Life() {
  const { openRdv } = useSite();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -left-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">Vie à la crèche</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            La vie à La Centrale{" "}
            <span className="relative inline-block italic text-[#F4B23E] font-medium">
              en images
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#C86446" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Découvrez le quotidien de nos petits : espaces de jeux, ateliers créatifs et moments de complicité entre
            enfants et éducatrices.
          </p>
        </div>
      </section>

      {/* ─── GALERIE ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker className="justify-center">Galerie photo</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Nos espaces, jour après jour
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_LABELS.map((label, i) => (
              <div key={i} className={i % 3 === 0 ? "rotate-1" : i % 3 === 1 ? "-rotate-1" : "rotate-0"}>
                <PhotoPlaceholder label={`Photo — ${label}`} ratio="aspect-square" rounded="rounded-xl" className="border-2 border-white shadow-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTUALITÉS ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0] border-y border-[#ECE5DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker className="justify-center">Blog & conseils</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Actualités de la crèche
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((article, i) => (
              <div key={i} className={`bg-white rounded-2xl overflow-hidden border-2 border-[#301353] hover:shadow-[6px_6px_0px_0px_#301353] transition-shadow ${i === 0 ? "-rotate-1" : i === 2 ? "rotate-1" : ""}`}>
                <PhotoPlaceholder label="Illustration article" ratio="aspect-[4/3]" rounded="rounded-none" />
                <div className="p-6 space-y-2.5">
                  <span className="text-[11px] font-bold text-[#C86446] uppercase tracking-wider">{article.tag}</span>
                  <h3 className="font-serif-heading font-semibold text-base text-[#301353] leading-snug">
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ÉVÉNEMENTS À VENIR (SECTION INVERSÉE) ────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute top-0 -left-20 w-96 h-96 opacity-[0.1] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker light className="justify-center">À ne pas manquer</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white leading-tight font-normal">
              Prochains événements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {EVENTS.map((event, i) => (
              <div key={i} className="border-t-2 border-[#F4B23E]/40 pt-5 text-center">
                <div className="w-11 h-11 mx-auto rounded-xl bg-[#F4B23E]/10 border border-[#F4B23E]/30 flex items-center justify-center mb-3">
                  <event.icon className="w-5 h-5 text-[#F4B23E]" />
                </div>
                <h3 className="font-serif-heading font-semibold text-base text-white">{event.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-[#C86446]">
        <Blob color="#ffffff" className="absolute -top-16 -left-16 w-72 h-72 opacity-10 pointer-events-none" animate={false} />
        <Blob color="#301353" className="absolute -bottom-20 -right-10 w-80 h-80 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <h2 className="font-serif-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
            Envie de voir <span className="italic">nos espaces en vrai</span> ?
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
            Planifiez une visite et découvrez l'ambiance chaleureuse de La Centrale Crèche.
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
