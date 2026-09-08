import { useState } from "react";
import { SvgIcons } from "@/components/icons";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";
import { EMAIL_CONTACT } from "@/data/business";
import { leadsDb } from "@/lib/leadsDb";

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
  const { showToast } = useSite();
  const [form, setForm] = useState({ name: "", email: "", phone: "", poste: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      showToast("Veuillez renseigner votre nom et votre email.");
      return;
    }

    try {
      await leadsDb.addLead({
        parentName: form.name.trim(),
        phone: form.phone.trim() || "Non renseigné",
        email: form.email.trim(),
        childAge: "—",
        type: "RECRUTEMENT",
        solutions: form.poste.trim() ? [form.poste.trim()] : [],
        sector: "",
        formula: form.poste.trim() || "Candidature spontanée",
        startDate: "",
        message: form.message || "Candidature envoyée depuis la page Recrutement.",
        source: "Formulaire Recrutement",
        status: "Nouveau",
      });
    } catch {
      showToast("Une erreur est survenue. Merci de réessayer ou de nous contacter par email.");
      return;
    }

    showToast("Votre candidature a bien été envoyée. Merci de votre intérêt pour La Centrale Crèche !");
    setForm({ name: "", email: "", phone: "", poste: "", message: "" });
  };

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

      {/* ─── COMMENT POSTULER / FORMULAIRE ────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <Kicker className="justify-center">Comment postuler ?</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Envoyez votre candidature
            </h2>
            <p className="text-sm text-[#5D4E72]">
              Envoyez votre CV et lettre de motivation par email à{" "}
              <a href={`mailto:${EMAIL_CONTACT}`} className="text-[#C86446] font-semibold hover:underline">
                {EMAIL_CONTACT}
              </a>{" "}
              ou déposez votre dossier directement à la crèche.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Poste souhaité</label>
                <input
                  type="text"
                  value={form.poste}
                  onChange={(e) => setForm({ ...form, poste: e.target.value })}
                  placeholder="Ex. Éducatrice petite enfance"
                  className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder="Présentez-vous en quelques lignes..."
                  className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition resize-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#301353] hover:bg-[#200B3A] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 group"
            >
              <span>Envoyer ma candidature</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
