import { SvgIcons } from "@/components/icons";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { EMAIL_CONTACT, PHONE_MOBILE, WHATSAPP_RAW } from "@/data/business";

const PROFILES = [
  { title: "Éducatrices de la petite enfance", icon: SvgIcons.AcademicCap },
  { title: "Auxiliaires de puériculture", icon: SvgIcons.Heart },
  { title: "Stagiaires en formation petite enfance", icon: SvgIcons.BookOpen },
];

const QUALITIES = ["Patience", "Amour des enfants", "Travail d'équipe", "Sens des responsabilités"];

const OFFERS = [
  { title: "Éducatrice de la petite enfance", contract: "CDI — Temps plein", desc: "Encadrement d'une section (bébés ou moyens), suivi individuel du développement de chaque enfant." },
  { title: "Auxiliaire de puériculture", contract: "CDI — Temps plein", desc: "Soins quotidiens, hygiène et accompagnement des enfants en collaboration avec l'équipe éducative." },
  { title: "Stagiaire petite enfance", contract: "Stage conventionné", desc: "Immersion pédagogique encadrée, idéal pour étudiant(e) en formation petite enfance." },
];

export default function Careers() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -left-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">Recrutement</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            Rejoignez{" "}
            <span className="relative inline-block italic text-[#F4B23E] font-medium">
              notre équipe
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#C86446" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            La Centrale recrute régulièrement des professionnel(le)s de la petite enfance : éducatrices, auxiliaires,
            stagiaires...
          </p>
        </div>
      </section>

      {/* ─── PROFILS RECHERCHÉS ───────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker className="justify-center">Profils recherchés</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Des talents passionnés par la petite enfance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {PROFILES.map((p, i) => (
              <div key={i} className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#ECE5DA] hover:border-[#C86446]/40 hover:shadow-lg transition text-center space-y-3">
                <div className="w-11 h-11 mx-auto rounded-xl bg-white border border-[#E8DFC9] flex items-center justify-center shadow-xs">
                  <p.icon className="w-5 h-5 text-[#C86446]" />
                </div>
                <h3 className="font-serif-heading font-semibold text-sm text-[#301353]">{p.title}</h3>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {QUALITIES.map((q, i) => (
              <span key={i} className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF6EE] border border-[#D0EBD8] text-[#256F46] text-xs font-medium">
                <SvgIcons.Check className="w-3.5 h-3.5" />
                <span>{q}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFRES EN COURS ──────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0] border-y border-[#ECE5DA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker className="justify-center">Offres en cours</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Postes ouverts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFERS.map((o, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 border-2 border-[#301353] hover:shadow-[6px_6px_0px_0px_#301353] transition-shadow space-y-3 flex flex-col justify-between ${i === 0 ? "-rotate-1" : i === 2 ? "rotate-1" : ""}`}>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#C86446] uppercase tracking-wider">{o.contract}</span>
                  <h3 className="font-serif-heading font-semibold text-base text-[#301353]">{o.title}</h3>
                  <p className="text-xs text-[#5D4E72] leading-relaxed">{o.desc}</p>
                </div>
                <a
                  href={`mailto:${EMAIL_CONTACT}?subject=Candidature - ${encodeURIComponent(o.title)}`}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-[#301353] hover:bg-[#200B3A] text-white text-xs font-bold shadow-md transition"
                >
                  <span>Postuler</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMENT POSTULER ──────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <Kicker className="justify-center">Comment postuler ?</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Envoyez votre candidature
            </h2>
            <p className="text-sm text-[#5D4E72]">
              Pour plus d'informations, appelez-nous ou envoyez-nous un message sur WhatsApp. Vous pouvez aussi
              envoyer votre CV par email à{" "}
              <a href={`mailto:${EMAIL_CONTACT}`} className="text-[#C86446] font-semibold hover:underline">
                {EMAIL_CONTACT}
              </a>{" "}
              ou le déposer directement à la crèche.
            </p>
          </div>

          <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-10 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`tel:${PHONE_MOBILE.replace(/\s/g, "")}`}
              className="flex flex-col items-center justify-center text-center gap-2 bg-[#301353] hover:bg-[#200B3A] text-white font-bold py-8 px-4 rounded-2xl shadow-md transition"
            >
              <SvgIcons.Phone className="w-7 h-7" />
              <span className="text-sm">Appelez-nous</span>
              <span className="text-xs font-normal text-white/80">{PHONE_MOBILE}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-center gap-2 bg-[#256F46] hover:bg-[#1c5535] text-white font-bold py-8 px-4 rounded-2xl shadow-md transition"
            >
              <SvgIcons.WhatsApp className="w-7 h-7" />
              <span className="text-sm">WhatsApp</span>
              <span className="text-xs font-normal text-white/80">{PHONE_MOBILE}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
