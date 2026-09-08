import { Link } from "react-router-dom";
import { SvgIcons } from "@/components/icons";
import Photo from "@/components/Photo";
import entree from "@/imports/photos/creche-entree.jpeg";
import salleActivites from "@/imports/photos/creche-salle-activites.jpeg";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";

export default function About() {
  const { openRdv } = useSite();

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -right-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">À propos de nous</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            Une histoire de confiance,
            <br />
            depuis{" "}
            <span className="relative inline-block italic text-[#F4B23E] font-medium">
              plus de 35 ans
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#C86446" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Découvrez la mission, les valeurs et l'équipe qui font de La Centrale Crèche & Halte Garderie un cocon
            bienveillant pour les tout-petits de Casablanca.
          </p>
        </div>
      </section>

      {/* ─── NOTRE HISTOIRE ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-6 relative order-2 lg:order-1">
              <div className="relative max-w-[420px] mx-auto lg:mx-0">
                <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-[#C86446]/30 -z-10" />
                <div className="rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <Photo
                    src={entree}
                    alt="Entrée de La Centrale Crèche, 125 Rue Allal Ben Abdallah, Casablanca"
                    ratio="aspect-[4/3]"
                    rounded="rounded-[1.75rem]"
                    className="border-4 border-white shadow-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 sm:w-36 rotate-[5deg] z-10">
                  <div className="bg-white rounded-2xl p-3 border-2 border-[#301353] shadow-[5px_5px_0px_0px_#301353] text-center">
                    <div className="font-serif-heading text-2xl text-[#301353] font-semibold leading-none">35+</div>
                    <div className="text-[9px] font-bold text-[#C86446] uppercase tracking-wide mt-1">ans d'expérience</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <Kicker>Notre histoire</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
                Accompagner les familles casablancaises depuis des décennies
              </h2>
              <p className="text-sm sm:text-base text-[#5D4E72] leading-relaxed">
                Forte de plus de 35 ans d'expérience, La Centrale Crèche & Halte Garderie accompagne les familles du
                centre-ville de Casablanca dans l'éveil de leurs tout-petits. Installée face au Marché Central, notre
                structure a grandi au fil des années tout en gardant sa mission d'origine intacte : offrir un cadre
                sûr, chaleureux et stimulant pour le développement des enfants de 3 mois à 5 ans.
              </p>
              <p className="text-sm sm:text-base text-[#5D4E72] leading-relaxed">
                Génération après génération, des centaines d'enfants ont grandi entre nos murs, encadrés par une
                équipe d'éducatrices chevronnées appliquant notre programme pédagogique de type mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NOTRE PHILOSOPHIE (SECTION INVERSÉE) ─────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute top-0 -right-20 w-96 h-96 opacity-[0.1] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div className="space-y-3 max-w-2xl">
              <Kicker light>Notre approche</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-white leading-tight font-normal">
                Notre philosophie éducative
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Une pédagogie active, bienveillante et respectueuse du rythme de chaque enfant.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: SvgIcons.Heart,
                title: "Motricité Libre & Pikler",
                text: "Nous respectons le rythme naturel de chaque enfant, en le laissant expérimenter et découvrir son corps librement.",
              },
              {
                icon: SvgIcons.Utensils,
                title: "Cuisine Saine & Faite Maison",
                text: "Repas et goûters bio préparés sur place chaque matin, adaptés aux besoins nutritionnels de chaque tranche d'âge.",
              },
              {
                icon: SvgIcons.ShieldCheck,
                title: "Hygiène & Sécurité Maximale",
                text: "Protocoles stricts de nettoyage, de change et de repas, dans le respect des normes en vigueur au Maroc.",
              },
              {
                icon: SvgIcons.AcademicCap,
                title: "Éveil Linguistique Bilingue",
                text: "Initiation douce au français et à l'arabe à travers comptines, histoires illustrées et rituels doux avant l'entrée à l'école.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.04] backdrop-blur rounded-2xl p-6 border border-white/10 hover:border-[#F4B23E]/40 transition space-y-3"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F4B23E]/10 border border-[#F4B23E]/30 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#F4B23E]" />
                </div>
                <h3 className="font-serif-heading font-semibold text-base text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white/[0.04] backdrop-blur rounded-2xl border border-white/10 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Bienveillance et respect du rythme de l'enfant",
              "Éveil global : moteur, cognitif, social, émotionnel",
              "Importance du jeu, de la découverte et de la socialisation",
              "Collaboration étroite avec les parents au quotidien",
            ].map((point, i) => (
              <div key={i} className="flex items-start space-x-2.5">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#F4B23E]/15 flex items-center justify-center shrink-0">
                  <SvgIcons.Check className="w-3 h-3 text-[#F4B23E]" />
                </div>
                <span className="text-sm text-slate-300 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SÉCURITÉ & HYGIÈNE ───────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0] border-y border-[#ECE5DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rotate-[-1deg]">
                <Photo
                  src={salleActivites}
                  alt="Espace sécurisé et rangé de La Centrale Crèche"
                  ratio="aspect-[4/5]"
                  rounded="rounded-[1.75rem]"
                  className="border-4 border-white shadow-2xl"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <Kicker>Rassurer au quotidien</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
                Sécurité et hygiène
              </h2>
              <div className="space-y-3 pt-2">
                {[
                  { icon: SvgIcons.ShieldCheck, text: "Respect strict des normes en vigueur au Maroc pour l'accueil de la petite enfance." },
                  { icon: SvgIcons.Check, text: "Protocoles d'hygiène quotidiens rigoureux : nettoyage, changes, préparation des repas." },
                  { icon: SvgIcons.Lock, text: "Procédures d'arrivée et de départ sécurisées, avec autorisations de récupération vérifiées." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 bg-white rounded-xl p-4 border border-[#ECE5DA]">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#C86446]" />
                    </div>
                    <span className="text-sm text-[#4A3B5E] leading-relaxed pt-1">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to="/faq"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[#301353] hover:text-[#C86446] transition group"
                >
                  <span>En savoir plus sur nos règles d'hygiène</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES — SPOTLIGHT ──────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative">
              <span className="font-serif-heading text-[8rem] leading-none text-[#F4B23E]/25 absolute -top-10 -left-4 select-none pointer-events-none">
                "
              </span>
              <Kicker className="mb-4">Confiance & partage</Kicker>
              <p className="relative font-serif-heading text-2xl sm:text-3xl text-[#301353] italic leading-snug">
                Travaillant au centre de Casablanca, l'emplacement face au Marché Central est idéal. Mais ce qui fait
                la différence, c'est la chaleur humaine et l'attention de l'équipe avec notre petit Yassine.
              </p>
              <div className="flex items-center space-x-3 pt-6">
                <div className="w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-xs" style={{ backgroundColor: "#E87A5D" }}>
                  SB
                </div>
                <div>
                  <div className="text-sm font-bold text-[#301353]">Sarah B.</div>
                  <div className="text-xs text-[#78698C]">Parent d'Yassine (16 mois)</div>
                </div>
                <div className="flex text-amber-400 pl-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SvgIcons.Star key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {[
                { quote: "Nous cherchions une structure à taille humaine loin de l'anonymat des grandes crèches. Notre fille a fait d'immenses progrès !", name: "Karim T.", child: "Parent de Lina (2 ans et demi)", color: "#ECA52B" },
                { quote: "La direction est d'une écoute et d'une transparence exemplaires. Un grand merci à toute l'équipe !", name: "Kenza & Mehdi T.", child: "Parents de Ghali (3 ans)", color: "#7E3FAF" },
              ].map((t, i) => (
                <div key={i} className={`bg-[#FAF6F0] rounded-2xl p-5 border border-[#ECE5DA] ${i === 0 ? "rotate-1" : "-rotate-1"}`}>
                  <p className="text-xs text-[#4A3B5E] italic leading-relaxed mb-3">« {t.quote} »</p>
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-[10px] shrink-0" style={{ backgroundColor: t.color }}>
                      {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#301353]">{t.name}</div>
                      <div className="text-[10px] text-[#78698C]">{t.child}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#301353] bg-[#FAF6F0] px-4 py-2 rounded-full border border-[#ECE5DA] shadow-xs">
                <span>4.9 / 5 — Témoignages certifiés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-[#C86446]">
        <Blob color="#ffffff" className="absolute -top-16 -left-16 w-72 h-72 opacity-10 pointer-events-none" animate={false} />
        <Blob color="#301353" className="absolute -bottom-20 -right-10 w-80 h-80 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <h2 className="font-serif-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
            Rencontrez notre <span className="italic">équipe en personne</span>
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
            Venez visiter nos espaces, échanger avec la direction et poser toutes vos questions au 125 Rue Allal Ben
            Abdallah, Casablanca.
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
