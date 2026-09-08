import { Link } from "react-router-dom";
import { SvgIcons } from "@/components/icons";
import Photo from "@/components/Photo";
import groupeTableRouge from "@/imports/photos/creche-groupe-table-rouge.jpeg";
import salleJeux from "@/imports/photos/creche-salle-jeux.jpeg";
import salleActivites from "@/imports/photos/creche-salle-activites.jpeg";
import atelierTable from "@/imports/photos/creche-atelier-table.jpeg";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";

const AGE_GROUPS = [
  { age: "2 – 12 mois", label: "Section Bébés", focus: "Sécurité affective, éveil sensoriel, motricité globale." },
  { age: "12 – 24 mois", label: "Section Moyens", focus: "Marche, langage, autonomie (repas, sommeil)." },
  { age: "24 – 36 mois", label: "Petite Section", focus: "Socialisation, jeux symboliques, pré-langage écrit." },
  { age: "3 – 5 ans", label: "Moyenne / Grande Section", focus: "Préparation à la maternelle, langage, règles de vie collective." },
];

const ACTIVITIES = [
  { icon: SvgIcons.Users, title: "Motricité globale et fine" },
  { icon: SvgIcons.Sparkles, title: "Jeux d'éveil sensoriel" },
  { icon: SvgIcons.Heart, title: "Activités musicales et comptines" },
  { icon: SvgIcons.BookOpen, title: "Histoires et langage" },
  { icon: SvgIcons.Star, title: "Jeux de rôle et socialisation" },
  { icon: SvgIcons.AcademicCap, title: "Activités manuelles (peinture, pâte à modeler)" },
];

const TIMELINE = [
  { time: "7h30 – 9h00", title: "Accueil échelonné", text: "Arrivée en douceur et jeux libres." },
  { time: "9h00 – 9h30", title: "Collation / change", text: "Moment calme avant les activités." },
  { time: "9h30 – 11h30", title: "Activités dirigées", text: "Éveil, motricité, langage encadrés par l'équipe." },
  { time: "11h30 – 12h30", title: "Jeux libres / extérieur", text: "Selon la météo, temps de jeu en plein air." },
  { time: "12h30 – 13h30", title: "Repas", text: "Cuisine bio faite maison chaque matin." },
  { time: "13h30 – 15h30", title: "Sieste / repos", text: "Respect du rythme de sommeil de chaque enfant." },
  { time: "15h30 – 16h00", title: "Réveil, collation", text: "Réveil en douceur et goûter." },
  { time: "16h00 – 17h30", title: "Activités, jeux, sorties", text: "Ateliers créatifs et temps de jeu." },
  { time: "17h30 – 18h00", title: "Retour calme, départ", text: "Transmission aux parents, départ échelonné." },
];

export default function Services() {
  const { openRdv } = useSite();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -right-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -left-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">Nos services</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            Des modes d'accueil{" "}
            <span className="relative inline-block italic text-[#F4B23E] font-medium">
              adaptés à chaque famille
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#C86446" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Nous accueillons les enfants de 2 mois à 5 ans, en crèche régulière ou en halte-garderie ponctuelle, avec
            des activités adaptées à chaque âge.
          </p>
        </div>
      </section>

      {/* ─── CRÈCHE RÉGULIÈRE ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center mb-14">
            <div className="lg:col-span-6 relative">
              <div className="relative max-w-[420px]">
                <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-[#C86446]/30 -z-10" />
                <div className="rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <Photo
                    src={groupeTableRouge}
                    alt="Enfants en activité, section crèche régulière"
                    ratio="aspect-[4/3]"
                    rounded="rounded-[1.75rem]"
                    className="border-4 border-white shadow-2xl"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-5">
              <Kicker>2 mois – 5 ans</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
                Crèche régulière
              </h2>
              <p className="text-sm sm:text-base text-[#5D4E72] leading-relaxed">
                Accueil quotidien du lundi au vendredi, de 7h30 à 18h (garde possible jusqu'à 19h), avec un suivi
                personnalisé du développement de votre enfant à chaque étape de sa croissance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AGE_GROUPS.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#ECE5DA] hover:border-[#C86446]/40 hover:shadow-lg transition space-y-2">
                <div className="text-[11px] font-bold text-[#C86446] uppercase tracking-wider">{g.age}</div>
                <h3 className="font-serif-heading font-semibold text-base text-[#301353]">{g.label}</h3>
                <p className="text-xs text-[#5D4E72] leading-relaxed">{g.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HALTE-GARDERIE ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-y border-[#ECE5DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
              <Kicker>Tout âge, quelques heures</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
                Halte-garderie
              </h2>
              <p className="text-sm sm:text-base text-[#5D4E72] leading-relaxed">
                Accueil ponctuel, à l'heure ou à la demi-journée, selon vos besoins. Idéal pour un rendez-vous, des
                courses, un besoin ponctuel ou une adaptation progressive avant une inscription régulière.
              </p>
              <div className="space-y-2.5 pt-2">
                {["Même cadre sécurisant que la crèche régulière", "Activités adaptées à l'âge de votre enfant", "Réservation flexible selon vos disponibilités"].map((point, i) => (
                  <div key={i} className="flex items-start space-x-2.5">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#EBF6EE] flex items-center justify-center shrink-0">
                      <SvgIcons.Check className="w-3 h-3 text-[#256F46]" />
                    </div>
                    <span className="text-sm text-[#4A3B5E] leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative max-w-[420px] ml-auto">
                <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-[#301353]/20 -z-10" />
                <div className="rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                  <Photo
                    src={salleJeux}
                    alt="Halte-garderie, accueil ponctuel des enfants"
                    ratio="aspect-[4/3]"
                    rounded="rounded-[1.75rem]"
                    className="border-4 border-white shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ACTIVITÉS D'ÉVEIL ────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <Kicker className="justify-center">Ateliers & éveil</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Activités proposées
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Salle de motricité", rot: "-rotate-1", img: salleJeux },
              { label: "Coin lecture & langage", rot: "rotate-0", img: salleActivites },
              { label: "Atelier créatif", rot: "rotate-1", img: atelierTable },
            ].map((item, i) => (
              <div key={i} className={`bg-white rounded-2xl overflow-hidden border-2 border-[#301353] hover:shadow-[6px_6px_0px_0px_#301353] transition-shadow ${item.rot}`}>
                <Photo src={item.img} alt={item.label} ratio="aspect-[4/3]" rounded="rounded-none" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white rounded-xl p-4 border border-[#ECE5DA]">
                <div className="w-9 h-9 rounded-lg bg-[#FAF6F0] border border-[#E8DFC9] flex items-center justify-center shrink-0">
                  <a.icon className="w-4 h-4 text-[#C86446]" />
                </div>
                <span className="text-sm font-medium text-[#301353]">{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOURNÉE TYPE (SECTION INVERSÉE) ──────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute top-1/3 -right-20 w-96 h-96 opacity-[0.1] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker light className="justify-center">Emploi du temps</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-white leading-tight font-normal">
              Une journée à <span className="italic text-[#F4B23E]">La Centrale</span>
            </h2>
          </div>

          <div className="relative pl-8 sm:pl-10 space-y-6 before:absolute before:left-[11px] sm:before:left-[13px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15">
            {TIMELINE.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-8 sm:-left-10 top-0.5 w-6 h-6 rounded-full bg-[#F4B23E] border-4 border-[#19042E] shadow-sm flex items-center justify-center text-[#19042E] text-[10px] font-black">
                  {i + 1}
                </div>
                <div className="bg-white/[0.04] backdrop-blur rounded-xl p-4 sm:p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <div className="text-xs font-bold text-[#F4B23E] uppercase tracking-wider shrink-0 sm:w-36">{step.time}</div>
                  <div>
                    <div className="font-serif-heading font-semibold text-sm text-white">{step.title}</div>
                    <div className="text-xs text-slate-400">{step.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-[#C86446]">
        <Blob color="#ffffff" className="absolute -top-16 -right-16 w-72 h-72 opacity-10 pointer-events-none" animate={false} />
        <Blob color="#301353" className="absolute -bottom-20 -left-10 w-80 h-80 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <h2 className="font-serif-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
            Prêt à <span className="italic">inscrire votre enfant</span> ?
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
            Découvrez notre procédure d'inscription simple et nos tarifs adaptés à chaque formule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/inscription-tarifs"
              className="px-7 py-3.5 rounded-full bg-[#301353] hover:bg-[#200B3A] text-white text-sm font-bold shadow-lg transition"
            >
              Voir l'inscription & les tarifs
            </Link>
            <button
              onClick={() => openRdv("Prendre rendez-vous pour visiter La Centrale Crèche")}
              className="px-7 py-3.5 rounded-full border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-[#C86446] transition"
            >
              Demander une visite
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
