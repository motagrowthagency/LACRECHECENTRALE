import { useState } from "react";
import { Link } from "react-router-dom";
import infographicImg from "@/imports/infographie_creche.png";
import groupeTableRouge from "@/imports/photos/creche-groupe-table-rouge.jpeg";
import atelierTable from "@/imports/photos/creche-atelier-table.jpeg";
import salleClasse from "@/imports/photos/creche-salle-classe.jpeg";
import { SvgIcons } from "@/components/icons";
import Photo from "@/components/Photo";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import Marquee from "@/components/Marquee";
import { useSite } from "@/context/SiteContext";
import { leadsDb } from "@/lib/leadsDb";

export default function Home() {
  const { showToast } = useSite();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [heroForm, setHeroForm] = useState({
    parentName: "",
    childAge: "3 à 12 mois (Section Bébés)",
    phone: "",
    email: "",
  });

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroForm.parentName.trim() || !heroForm.phone.trim()) {
      showToast("Veuillez renseigner votre nom et votre numéro de téléphone.");
      return;
    }

    try {
      await leadsDb.addLead({
        parentName: heroForm.parentName.trim(),
        phone: heroForm.phone.trim(),
        email: heroForm.email.trim(),
        childAge: heroForm.childAge,
        type: "VISITE",
        solutions: [`SECTION : ${heroForm.childAge.toUpperCase()}`, "JOURNÉE CONTINUE (7H30–18H)"],
        sector: "MARCHÉ CENTRAL",
        formula: "Journée continue",
        startDate: "Rentrée 2026 / Immédiat",
        message: "Demande de place envoyée depuis le formulaire d'accueil.",
        source: "Formulaire Hero",
        status: "Nouveau",
      });
      showToast("Votre demande de place a bien été envoyée à la direction !");
      setHeroForm({ parentName: "", childAge: "3 à 12 mois (Section Bébés)", phone: "", email: "" });
    } catch {
      showToast("Une erreur est survenue. Merci de réessayer ou de nous contacter par téléphone.");
    }
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 bg-[#FAF6F0]">
        <Blob color="#F4B23E" className="absolute -top-16 -left-16 w-72 h-72 opacity-[0.35] pointer-events-none" />
        <Blob color="#C86446" className="absolute top-1/3 -right-24 w-96 h-96 opacity-[0.18] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-7">
              <Kicker>Établie depuis +35 ans · Face au Marché Central</Kicker>

              <h1 className="font-serif-heading text-[2.75rem] sm:text-6xl lg:text-[4.2rem] leading-[1.02] text-[#301353] font-normal tracking-tight">
                Le cocon joyeux où
                <br />
                votre enfant grandit{" "}
                <span className="relative inline-block text-[#C86446] italic font-medium">
                  à son rythme
                  <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#F4B23E" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-[#5D4E72] leading-relaxed max-w-xl">
                Face au Marché Central de Casablanca, nous accueillons vos tout-petits de 3 mois à 5 ans dans une
                atmosphère chaleureuse comme à la maison — programme type mission, motricité libre et cuisine bio
                mitonnée sur place chaque matin.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#demande-place"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#301353] hover:bg-[#200B3A] text-white text-sm font-bold shadow-[4px_4px_0px_0px_#C86446] hover:shadow-[2px_2px_0px_0px_#C86446] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                >
                  <span>Demander une place</span>
                  <span>→</span>
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full border-2 border-[#301353] text-[#301353] text-sm font-bold hover:bg-white transition"
                >
                  <span>Découvrir nos services</span>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-3">
                {[
                  { n: "35+", l: "ans d'expérience" },
                  { n: "1 : 3", l: "encadrant / bébés" },
                  { n: "100%", l: "bio & fait maison" },
                ].map((s, i) => (
                  <div key={i} className={i > 0 ? "pl-6 border-l border-[#DDD1C0]" : ""}>
                    <div className="font-serif-heading text-2xl sm:text-3xl text-[#301353] font-semibold leading-none">{s.n}</div>
                    <div className="text-[10px] sm:text-[11px] text-[#78698C] font-bold uppercase tracking-wide mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative max-w-[380px] mx-auto">
                <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-dashed border-[#C86446]/30 -z-10" />
                <div className="relative rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <Photo
                    src={groupeTableRouge}
                    alt="Enfants réunis autour de la table d'activités à La Centrale Crèche"
                    ratio="aspect-[4/5]"
                    rounded="rounded-[1.75rem]"
                    className="border-4 border-white shadow-2xl"
                  />
                </div>

                <div className="absolute -bottom-8 -left-2 sm:-left-8 w-40 sm:w-44 rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-10">
                  <div className="bg-white rounded-2xl p-3 border-2 border-[#301353] shadow-[5px_5px_0px_0px_#301353]">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <SvgIcons.TeddyBearWithHeart className="w-8 h-8" />
                      <div>
                        <div className="text-[9px] font-bold text-[#301353] uppercase leading-tight">Rentrée</div>
                        <div className="text-[9px] font-bold text-[#C86446] uppercase leading-tight">2026 ouverte</div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-[#F2ECE1] mb-1.5" />
                    <div className="flex items-center space-x-1 text-[9px] font-bold text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Places disponibles</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-2 sm:-right-6 w-16 h-16 rounded-full bg-[#F4B23E] border-2 border-white shadow-lg flex flex-col items-center justify-center rotate-6 z-10">
                  <SvgIcons.Star className="w-4 h-4 text-white" />
                  <span className="text-[8px] font-black text-white leading-none mt-0.5">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-y-2 border-[#301353] bg-[#301353] text-[#F4B23E] py-3">
          <Marquee
            items={[
              "PLUS DE 35 ANS D'EXPÉRIENCE",
              "FACE AU MARCHÉ CENTRAL",
              "CUISINE BIO FAITE MAISON",
              "HORAIRES 7H30 – 18H",
              "PROGRAMME BILINGUE TYPE MISSION",
              "30 PLACES SEULEMENT",
            ]}
          />
        </div>
      </section>

      {/* ─── FORMULAIRE DE DEMANDE (bande claire) ─────────────── */}
      <section id="demande-place" className="py-20 bg-white border-b border-[#ECE5DA] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <Kicker>Rentrée 2026 & toute l'année</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
                Réservez la place de votre enfant en 2 minutes
              </h2>
              <p className="text-sm text-[#5D4E72] leading-relaxed">
                Un membre de la direction vous recontacte sous 24h pour finaliser votre demande, sans engagement.
              </p>
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#301353]">
                  <SvgIcons.Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Réponse rapide sous 24h</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-[#301353]">
                  <SvgIcons.Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Aucun engagement de votre part</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-[#FAF6F0] rounded-3xl p-6 sm:p-8 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446]">
                <form onSubmit={handleHeroFormSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">
                        Nom & Prénom du parent *
                      </label>
                      <input
                        type="text"
                        required
                        value={heroForm.parentName}
                        onChange={(e) => setHeroForm({ ...heroForm, parentName: e.target.value })}
                        placeholder="Ex. Sarah Benjelloun"
                        className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">
                        Âge de l'enfant *
                      </label>
                      <div className="relative">
                        <select
                          value={heroForm.childAge}
                          onChange={(e) => setHeroForm({ ...heroForm, childAge: e.target.value })}
                          className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition cursor-pointer appearance-none pr-8"
                        >
                          <option value="3 à 12 mois (Section Bébés)">3 à 12 mois (Section Bébés)</option>
                          <option value="12 à 24 mois (Section Moyens)">12 à 24 mois (Section Moyens)</option>
                          <option value="2 à 3 ans (Petite Section)">2 à 3 ans (Petite Section)</option>
                          <option value="3 à 4 ans (Moyenne Section)">3 à 4 ans (Moyenne Section)</option>
                          <option value="4 à 5 ans (Grande Section)">4 à 5 ans (Grande Section)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#736387]">
                          <SvgIcons.ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">
                        Numéro de téléphone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={heroForm.phone}
                        onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                        placeholder="06 61 00 00 00"
                        className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">
                        Adresse Email
                      </label>
                      <input
                        type="email"
                        value={heroForm.email}
                        onChange={(e) => setHeroForm({ ...heroForm, email: e.target.value })}
                        placeholder="sarah@exemple.com"
                        className="w-full bg-white border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#301353] hover:bg-[#200B3A] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
                  >
                    <span>Envoyer ma demande de place</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POURQUOI CHOISIR (SECTION INVERSÉE) ──────────────── */}
      <section className="relative overflow-hidden py-20 bg-[#19042E]">
        <Blob color="#C86446" className="absolute -top-24 right-0 w-[420px] h-[420px] opacity-20 pointer-events-none" />
        <Blob color="#F4B23E" className="absolute bottom-0 -left-20 w-96 h-96 opacity-[0.1] pointer-events-none" animate={false} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-14">
            <Kicker light>Organisation & Engagements</Kicker>
            <div className="lg:text-right">
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-white leading-tight font-normal">
                Pourquoi choisir <span className="italic text-[#F4B23E]">La Centrale</span> ?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { n: "35+", l: "Années d'expérience", d: "Une équipe qui accueille les familles casablancaises depuis des décennies." },
              { n: "1:3", l: "Ratio encadrant / bébés", d: "Douceur, sécurité affective et repères stables pour chaque enfant." },
              { n: "100%", l: "Bio & fait maison", d: "Repas et goûters mitonnés sur place chaque matin, sans additifs." },
            ].map((stat, i) => (
              <div key={i} className="border-t-2 border-[#F4B23E]/40 pt-5">
                <div className="font-serif-heading text-5xl text-[#F4B23E] font-semibold leading-none mb-2">{stat.n}</div>
                <div className="text-sm font-bold text-white mb-1.5">{stat.l}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{stat.d}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/[0.04] backdrop-blur rounded-3xl p-6 sm:p-10 border border-white/10 mb-14">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
              <div>
                <h3 className="font-serif-heading text-xl sm:text-2xl text-white font-semibold">
                  Infographie officielle de l'établissement
                </h3>
                <p className="text-xs text-slate-400">
                  Consultez les détails de nos formules continues, nos repas et nos activités.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setLightboxImg(infographicImg)}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                >
                  <SvgIcons.ZoomIn className="w-3.5 h-3.5 text-[#F4B23E]" />
                  <span>Agrandir l'affiche</span>
                </button>
                <a
                  href={infographicImg}
                  download="infographie_la_centrale_creche.png"
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#F4B23E] text-[#301353] text-xs font-bold shadow-md hover:bg-[#EAA43A] transition"
                >
                  <SvgIcons.Download className="w-3.5 h-3.5" />
                  <span>Télécharger</span>
                </a>
              </div>
            </div>

            <div
              onClick={() => setLightboxImg(infographicImg)}
              className="relative rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg cursor-zoom-in group bg-white"
            >
              <img
                src={infographicImg}
                alt="Infographie 7 formules La Centrale Crèche Casablanca"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-[#19042E]/0 group-hover:bg-[#19042E]/20 transition flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition px-4 py-2 rounded-full bg-[#301353] text-white text-xs font-bold shadow-lg flex items-center space-x-2">
                  <SvgIcons.ZoomIn className="w-4 h-4 text-[#F4B23E]" />
                  <span>Cliquer pour zoomer en haute résolution</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: SvgIcons.Clock, title: "Horaires adaptés 7h30 – 18h", text: "Journée continue avec garde possible jusqu'à 19h pour les parents actifs." },
              { icon: SvgIcons.MapPin, title: "Centre-ville, face au Marché Central", text: "Un emplacement facile d'accès en plein cœur de Casablanca." },
              { icon: SvgIcons.AcademicCap, title: "Éveil bilingue Français / Arabe", text: "Programme type mission, comptines et histoires pour préparer la maternelle." },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3.5 p-5 rounded-2xl border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-[#F4B23E]/10 border border-[#F4B23E]/30 flex items-center justify-center shrink-0">
                  <item.icon className="w-4.5 h-4.5 text-[#F4B23E]" />
                </div>
                <div>
                  <h4 className="font-serif-heading font-semibold text-sm text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APERÇU DES SERVICES ─────────────────────────────── */}
      <section className="py-20 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div className="space-y-3">
              <Kicker>Nos modes d'accueil</Kicker>
              <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] font-normal">
                Une formule adaptée à chaque famille
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden sm:inline-flex items-center space-x-2 text-sm font-bold text-[#301353] hover:text-[#C86446] transition group shrink-0"
            >
              <span>Voir tous nos services</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Crèche régulière", sub: "2 mois – 5 ans", text: "Accueil quotidien, éveil global et suivi personnalisé du développement de votre enfant.", rot: "-rotate-1", img: atelierTable },
              { title: "Activités d'éveil", sub: "Motricité, langage, socialisation", text: "Ateliers sensoriels, comptines bilingues et jeux de rôle adaptés à chaque âge.", rot: "rotate-1", img: salleClasse },
            ].map((s, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl overflow-hidden border-2 border-[#301353] hover:shadow-[6px_6px_0px_0px_#301353] transition-shadow ${s.rot}`}
              >
                <Photo src={s.img} alt={s.title} ratio="aspect-[4/3]" rounded="rounded-none" />
                <div className="p-6 space-y-2">
                  <div className="text-[11px] font-bold text-[#C86446] uppercase tracking-wider">{s.sub}</div>
                  <h3 className="font-serif-heading font-semibold text-lg text-[#301353]">{s.title}</h3>
                  <p className="text-xs text-[#5D4E72] leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES — SPOTLIGHT ──────────────────────────── */}
      <section className="py-20 bg-white border-y border-[#ECE5DA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative">
              <span className="font-serif-heading text-[8rem] leading-none text-[#F4B23E]/25 absolute -top-10 -left-4 select-none pointer-events-none">
                "
              </span>
              <Kicker className="mb-4">Confiance & partage</Kicker>
              <p className="relative font-serif-heading text-2xl sm:text-3xl text-[#301353] italic leading-snug">
                Une équipe attentionnée et professionnelle. Les repas frais et l'éveil bilingue sont remarquables —
                notre fils s'y sent comme à la maison.
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
                { quote: "Les horaires flexibles jusqu'à 19h sont parfaits pour mon emploi du temps.", name: "Karim T.", child: "Parent de Lina (2 ans et demi)", color: "#ECA52B" },
                { quote: "La direction est d'une écoute et d'une transparence exemplaires. Merci à l'équipe !", name: "Kenza & Mehdi T.", child: "Parents de Ghali (3 ans)", color: "#7E3FAF" },
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
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#301353] bg-white px-4 py-2 rounded-full border border-[#ECE5DA] shadow-xs">
                <span>4.9 / 5 — Témoignages certifiés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 bg-[#C86446]">
        <Blob color="#ffffff" className="absolute -top-16 -left-16 w-72 h-72 opacity-10 pointer-events-none" animate={false} />
        <Blob color="#301353" className="absolute -bottom-20 -right-10 w-80 h-80 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <h2 className="font-serif-heading text-3xl sm:text-5xl text-white font-normal leading-tight">
            Envie de découvrir <span className="italic">La Centrale Crèche</span> ?
          </h2>
          <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto">
            Rencontrez l'équipe et posez toutes vos questions à la direction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#demande-place"
              className="px-7 py-3.5 rounded-full bg-[#301353] hover:bg-[#200B3A] text-white text-sm font-bold shadow-lg transition"
            >
              Demander une place
            </a>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-full border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-[#C86446] transition"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh] bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#301353] text-white flex items-center justify-center font-bold text-sm shadow-lg hover:bg-[#200B3A]"
            >
              ✕
            </button>
            <img
              src={lightboxImg}
              alt="Agrandissement Infographie La Centrale Crèche"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
