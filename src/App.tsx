import React, { useState, useEffect } from "react";
import logo from "@/imports/logo_creche_centrale.png";
import kidsHero from "@/imports/kids_hero.png";

// ─── Contact & Institution Details ──────────────────────────────────────────
const PHONE_1 = "05 22 44 64 74";
const PHONE_2 = "06 61 67 23 83";
const WHATSAPP = "212661672383";
const ADDRESS = "125, rue Allal Ben Abdallah, Casablanca";
const LANDMARK = "Face au Marché Central";
const HOURS = "Lundi au Vendredi : 7h30 – 18h00 (Garde jusqu'à 19h00)";

type Page = "accueil" | "services" | "pedagogie" | "journee" | "tarifs" | "galerie" | "contact";

// ─── Clean Vector SVG Icons (Zero Emojis) ────────────────────────────────────
const Icons = {
  Phone: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  WhatsApp: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.28 4.95L2 22l5.22-1.37A9.95 9.95 0 0012.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.82 14.22c-.24.68-1.2 1.25-1.78 1.3-.54.05-1.25.07-3.6-1.02-3-1.4-4.94-4.45-5.09-4.65-.15-.2-1.2-1.6-1.2-3.05s.76-2.16 1.03-2.45c.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.18.01.43-.07.67.51.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.78.84 2.16 1.53.28.14.47.21.54.32.07.11.07.64-.17 1.32z" />
    </svg>
  ),
  Calendar: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  MapPin: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Bell: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Search: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Menu: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  Check: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

// ─── Subtle Ambient Floating Balloons ────────────────────────────────────────
function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="absolute left-[8%] balloon-slot-1 bottom-0">
        <svg width="34" height="56" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="20" ry="24" fill="#8B5CF6" />
          <path d="M23 52 L27 52 L25 56 Z" fill="#6D28D9" />
          <path d="M25 56 Q22 66 26 76" stroke="#C4B5FD" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute left-[30%] balloon-slot-2 bottom-0">
        <svg width="30" height="50" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="18" ry="22" fill="#F59E0B" />
          <path d="M23 50 L27 50 L25 54 Z" fill="#D97706" />
          <path d="M25 54 Q28 64 23 74" stroke="#FDE68A" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute left-[52%] balloon-slot-3 bottom-0">
        <svg width="32" height="54" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="19" ry="23" fill="#A855F7" />
          <path d="M23 51 L27 51 L25 55 Z" fill="#7E22CE" />
          <path d="M25 55 Q21 65 27 75" stroke="#E9D5FF" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute left-[75%] balloon-slot-4 bottom-0">
        <svg width="36" height="60" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="21" ry="25" fill="#6366F1" />
          <path d="M23 53 L27 53 L25 57 Z" fill="#4338CA" />
          <path d="M25 57 Q28 67 23 77" stroke="#C7D2FE" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="absolute left-[90%] balloon-slot-5 bottom-0">
        <svg width="30" height="50" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="18" ry="22" fill="#EC4899" />
          <path d="M23 50 L27 50 L25 54 Z" fill="#BE185D" />
          <path d="M25 54 Q22 64 26 74" stroke="#FBCFE8" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
}

// ─── Header Navigation (Exact GWA Academy Reference Layout) ──────────────────
function GWAHeader({
  currentPage,
  setCurrentPage,
  onOpenVisitModal,
}: {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  onOpenVisitModal: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: Page; label: string }[] = [
    { id: "accueil", label: "ACCUEIL" },
    { id: "services", label: "NOS FORMULES" },
    { id: "pedagogie", label: "PÉDAGOGIE" },
    { id: "journee", label: "UNE JOURNÉE" },
    { id: "tarifs", label: "TARIFS & INSCRIPTION" },
    { id: "galerie", label: "GALERIE" },
    { id: "contact", label: "CONTACT" },
  ];

  const handleNavigate = (pageId: Page) => {
    setCurrentPage(pageId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="relative z-40 bg-[#0B2545] text-white select-none">
      {/* Top Utility Header Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Placeholder for Left Floating Brand Box Alignment */}
        <div className="hidden lg:block w-[360px] shrink-0" />

        {/* Center/Right Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-[11px] font-bold tracking-wider text-slate-200">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`py-1 transition-colors hover:text-white cursor-pointer uppercase ${
                  isActive ? "text-amber-400 border-b-2 border-amber-400" : ""
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Menu */}
        <div className="flex items-center space-x-4 ml-auto lg:ml-0">
          <a
            href={`tel:${PHONE_1.replace(/\s/g, "")}`}
            className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-slate-200 hover:text-white transition"
          >
            <Icons.Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{PHONE_1}</span>
          </a>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button
            onClick={() => handleNavigate("contact")}
            className="text-slate-300 hover:text-white transition p-1 cursor-pointer"
            title="Rechercher / Accès"
          >
            <Icons.Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center space-x-2 text-xs font-black tracking-widest uppercase px-3 py-1.5 bg-[#133E87] hover:bg-[#1A4B9C] transition rounded cursor-pointer"
          >
            <span>MENU</span>
            <Icons.Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#071930] border-t border-slate-800 px-5 py-4 space-y-2 shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded text-xs font-bold flex items-center justify-between ${
                  isActive
                    ? "bg-[#133E87] text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span>•</span>}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenVisitModal();
              }}
              className="w-full py-3 rounded text-center text-xs font-bold text-[#0B2545] bg-amber-400 shadow cursor-pointer"
            >
              RÉSERVER UNE VISITE
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Hero Banner (Exact GWA Reference Structure) ─────────────────────────────
function GWAHero({
  onOpenVisitModal,
  onNavigate,
}: {
  onOpenVisitModal: () => void;
  onNavigate: (p: Page) => void;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-[#071930]">
      {/* 📸 Full-Bleed Kids Picture */}
      <div className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px]">
        <img
          src={kidsHero}
          alt="Les enfants à La Centrale Crèche"
          className="w-full h-full object-cover object-center"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-[#0B2545]/30 pointer-events-none" />

        {/* 🏛️ Top-Left Floating White Brand Box (Exact Reference Style) */}
        <div className="absolute top-0 left-4 sm:left-8 lg:left-12 z-20 bg-white p-6 sm:p-7 shadow-2xl border-b-4 border-[#0B2545] max-w-[340px] sm:max-w-[420px]">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Logo La Centrale Crèche"
              className="h-14 sm:h-16 w-auto object-contain shrink-0"
            />
            <div>
              <h1 className="font-heading font-black text-xl sm:text-2xl text-[#0B2545] tracking-tight leading-none uppercase">
                LA CENTRALE CRÈCHE
              </h1>
              <p className="text-[10px] font-bold text-[#133E87] uppercase tracking-widest mt-1">
                Halte Garderie & Soutien Scolaire
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200">
            <p className="font-serif italic text-xs sm:text-[13px] text-[#0B2545] font-semibold leading-snug">
              « Le bien-être des enfants »
            </p>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Notre priorité · Votre confiance · Notre engagement
            </p>
          </div>
        </div>

        {/* 📌 Right-Edge Floating Vertical Action Tabs (Exact Reference Style: VISIT, INQUIRE, APPLY) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col shadow-2xl">
          {/* VISIT */}
          <button
            onClick={onOpenVisitModal}
            className="w-36 sm:w-44 py-3.5 sm:py-4 px-4 sm:px-6 bg-white hover:bg-[#0B2545] text-[#0B2545] hover:text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-colors border-b border-slate-200 text-center cursor-pointer"
          >
            VISITER
          </button>

          {/* INQUIRE */}
          <a
            href={`https://wa.me/${WHATSAPP}?text=Bonjour%20La%20Centrale%2C%20je%20souhaite%20des%20renseignements%20sur%20les%20inscriptions.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-36 sm:w-44 py-3.5 sm:py-4 px-4 sm:px-6 bg-white hover:bg-[#0B2545] text-[#0B2545] hover:text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-colors border-b border-slate-200 text-center"
          >
            RENSEIGNEMENTS
          </a>

          {/* APPLY */}
          <button
            onClick={() => onNavigate("tarifs")}
            className="w-36 sm:w-44 py-3.5 sm:py-4 px-4 sm:px-6 bg-white hover:bg-[#0B2545] text-[#0B2545] hover:text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-colors text-center cursor-pointer"
          >
            S'INSCRIRE
          </button>
        </div>

        {/* 🔔 Bottom Hero Controls Strip */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-20 flex items-center justify-between">
          
          {/* Bottom Left Alert Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-[#0B2545]/90 backdrop-blur text-white text-xs font-semibold rounded-sm shadow">
            <Icons.Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Inscriptions ouvertes 2026–2027 · De 3 mois à 5 ans</span>
          </div>

          {/* Bottom Center Playback controls */}
          <div className="hidden md:flex items-center space-x-4 px-3 py-1 bg-black/40 backdrop-blur text-white text-xs rounded">
            <button className="hover:text-amber-400 transition cursor-pointer">‹</button>
            <button className="hover:text-amber-400 transition cursor-pointer">❚❚</button>
            <button className="hover:text-amber-400 transition cursor-pointer">›</button>
          </div>

          {/* Bottom Right Language / Location Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-2 bg-[#0B2545]/90 backdrop-blur text-slate-200 text-xs font-semibold rounded-sm shadow">
            <Icons.MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Casablanca · Marché Central</span>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Quick Stats Bar ─────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { label: "Années d'Expérience", value: "+35 ans", sub: "Corps enseignant qualifié" },
    { label: "Âges Accueillis", value: "3 mois – 5 ans", sub: "Crèche, garderie & maternelle" },
    { label: "Horaires Continus", value: "7h30 – 18h00", sub: "Option garde jusqu'à 19h00" },
    { label: "Alimentation Fraîche", value: "100% Maison", sub: "Repas équilibrés sur place" },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-6 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((s, idx) => (
            <div key={idx} className="pt-4 lg:pt-0 lg:px-6 first:lg:pl-0 text-center lg:text-left">
              <p className="text-2xl sm:text-3xl font-heading font-black text-[#0B2545]">{s.value}</p>
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-1">{s.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE: ACCUEIL ────────────────────────────────────────────────────────────
function PageAccueil({
  onNavigate,
  onOpenVisitModal,
}: {
  onNavigate: (p: Page) => void;
  onOpenVisitModal: () => void;
}) {
  const pillars = [
    {
      num: "01",
      title: "Horaires Souples & Continues",
      desc: "Ouvert du lundi au vendredi de 7h30 à 18h00, avec possibilité de garde prolongée jusqu'à 19h00 selon les impératifs des parents.",
      detail: "Horaires continus · Garde 18h-19h",
    },
    {
      num: "02",
      title: "Ambiance Chaleureuse & Familiale",
      desc: "Un encadrement bienveillant à dimension humaine combinant discipline, rigueur pédagogique et respect du rythme individuel de chaque enfant.",
      detail: "Sécurité & Épanouissement",
    },
    {
      num: "03",
      title: "Corps Pédagogique de Plus de 35 Ans d'Expérience",
      desc: "Programme d'excellence de type mission dispensé par une équipe de professionnelles chevronnées et passionnées de la petite enfance.",
      detail: "Programme Type Mission",
    },
    {
      num: "04",
      title: "Repas Sains Préparés sur Place",
      desc: "Cuisine familiale fraîche préparée chaque matin avec des ingrédients de saison, garde des repas et comptines d'éveil au goût.",
      detail: "Alimentation équilibrée",
    },
    {
      num: "05",
      title: "Ouverture Pendant les Vacances",
      desc: "Accueil maintenu pendant les vacances scolaires, les mercredis après-midi ainsi que tout l'été (juillet et août).",
      detail: "Juillet & Août inclus",
    },
    {
      num: "06",
      title: "Formules Flexibles de 3 Mois à 5 Ans",
      desc: "Formules adaptées à votre emploi du temps : journée complète, demi-journée ou garde ponctuelle à l'heure.",
      detail: "Temps plein · Demi-journée · À l'heure",
    },
    {
      num: "07",
      title: "Cours de Soutien Scolaire Primaire",
      desc: "Accompagnement rigoureux du 1er au 6ème AP en Arabe, Français et Mathématiques pour consolider les acquis scolaires.",
      detail: "1er au 6ème AP · Arabe, Français, Maths",
    },
  ];

  return (
    <div className="space-y-16 pb-20 relative z-10">
      <StatsBar />

      {/* 🏛️ Editorial Intro / Welcome */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block bg-slate-100 text-[#0B2545] text-xs font-bold px-3 py-1 uppercase tracking-widest">
              Établissement Privé de Petite Enfance à Casablanca
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-[#0B2545] leading-tight">
              Un Cadre Sécurisant & Stimulant Pour Les Premières Années de Votre Enfant
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Située au cœur de Casablanca face au Marché Central, <strong>La Centrale Crèche</strong> accueille vos enfants dès l'âge de 3 mois jusqu'à 5 ans. Notre équipe expérimentée allie bienveillance, rigueur et créativité pour préparer chaque enfant aux étapes scolaires futures dans la sérénité.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onOpenVisitModal}
                className="px-6 py-3 bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Planifier une Visite
              </button>
              <button
                onClick={() => onNavigate("pedagogie")}
                className="px-6 py-3 bg-white hover:bg-slate-100 text-[#0B2545] border border-slate-300 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Découvrir Notre Pédagogie
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#0B2545] border-b border-slate-200 pb-3">
              Informations Clés
            </h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start space-x-3">
                <Icons.Clock className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Horaires d'Ouverture</p>
                  <p>7h30 à 18h00 (Option garde jusqu'à 19h00)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icons.MapPin className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Adresse</p>
                  <p>125, rue Allal Ben Abdallah, Casablanca (Face Marché Central)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icons.Phone className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Téléphones</p>
                  <p>{PHONE_1} / {PHONE_2}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icons.Calendar className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Périodes d'Accueil</p>
                  <p>Toute l'année scolaire, vacances, mercredis après-midi, juillet & août</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ 7 Founding Pillars (Structured Grid) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Nos Engagements Fondamentaux</p>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#0B2545]">
            Les 7 Piliers de La Centrale Crèche
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Un projet éducatif complet pensé pour le bien-être, l'éveil et la sécurité de chaque enfant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="bg-white p-6 border border-slate-200 hover:border-[#0B2545] transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-black text-[#133E87] tracking-widest">{p.num}</span>
                <h3 className="font-heading font-bold text-base text-[#0B2545] leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                {p.detail}
              </div>
            </div>
          ))}

          {/* Call to action card */}
          <div className="bg-[#0B2545] text-white p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">Inscriptions Ouvertes</span>
              <h3 className="font-heading font-bold text-lg text-white leading-snug">
                Venez Nous Rencontrer & Visiter les Locaux
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prenez rendez-vous pour échanger avec notre équipe pédagogique et découvrir notre environnement sécurisé.
              </p>
            </div>
            <button
              onClick={onOpenVisitModal}
              className="mt-6 w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-[#0B2545] text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Prendre Rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* 🏛️ Program Overview Sections */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Section 1</span>
              <h3 className="font-heading font-bold text-xl text-[#0B2545]">Crèche & Halte Garderie (3 mois – 3 ans)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Motricité libre, comptines, socialisation douce, éveil sensoriel et respect du rythme de sommeil dans un dortoir calme et surveillé.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Section 2</span>
              <h3 className="font-heading font-bold text-xl text-[#0B2545]">Maternelle & Éveil (3 ans – 5 ans)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Programme de type mission préparant à l'entrée au CP : langage (Français & Arabe), graphisme, numération, autonomie et créativité.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Section 3</span>
              <h3 className="font-heading font-bold text-xl text-[#0B2545]">Soutien Primaire (1er au 6ème AP)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aide aux devoirs, renforcement méthodique en Arabe, Français et Mathématiques dispensé après les heures d'école et les mercredis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: SERVICES & FORMULES ───────────────────────────────────────────────
function PageServices({ onOpenVisitModal, onNavigate }: { onOpenVisitModal: () => void; onNavigate: (p: Page) => void }) {
  const formules = [
    {
      title: "Temps Plein Continu",
      badge: "Formule Populaire",
      hours: "7h30 à 18h00 (ou 19h00)",
      desc: "Idéal pour les parents actifs : journée complète comprenant petit-déjeuner d'accueil, activités d'éveil, déjeuner frais, sieste encadrée et goûter.",
      features: [
        "Accueil continu dès 7h30",
        "Repas équilibrés & goûter inclus",
        "Sieste surveillée en dortoir calme",
        "Ateliers d'éveil & psychomotricité",
      ],
    },
    {
      title: "Demi-Journée (Matin ou Après-Midi)",
      badge: "Flexibilité",
      hours: "Matin (7h30-12h30) ou Après-Midi (13h30-18h00)",
      desc: "Une formule progressive pour habituer doucement l'enfant à la vie en collectivité tout en préservant son rythme familial.",
      features: [
        "Avec ou sans formule déjeuner",
        "Participation aux ateliers pédagogiques",
        "Socialisation progressive",
        "Idéal pour les plus petits (3 à 18 mois)",
      ],
    },
    {
      title: "Garde Ponctuelle & Halte Garderie",
      badge: "À la Demande",
      hours: "À l'heure selon vos besoins",
      desc: "Garde occasionnelle à l'heure ou par demi-journée pour vos rendez-vous, courses ou imprévus.",
      features: [
        "Réservation préalable par téléphone/WhatsApp",
        "Intégration bienveillante immédiate",
        "Environnement sécurisé et stimulant",
        "Disponible du lundi au vendredi",
      ],
    },
    {
      title: "Soutien Scolaire Primaire (1er au 6ème AP)",
      badge: "Réussite Scolaire",
      hours: "Après l'école & Mercredis après-midi",
      desc: "Accompagnement rigoureux dispensé par des enseignants qualifiés pour consolider les bases fondamentales en Arabe, Français et Mathématiques.",
      features: [
        "Aide méthodique aux devoirs",
        "Renforcement Arabe, Français, Maths",
        "Préparation aux contrôles continus",
        "Effectifs réduits par groupe",
      ],
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Nos Prestations</p>
        <h1 className="text-3xl font-heading font-black text-[#0B2545] mt-1">
          Formules d'Accueil & Services Éducatifs
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Des formules sur-mesure adaptées au rythme de chaque enfant et aux contraintes des familles casablancaises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {formules.map((f, idx) => (
          <div key={idx} className="bg-white p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-[#0B2545] uppercase tracking-wider">
                  {f.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">{f.hours}</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B2545]">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Comprend :</p>
                <ul className="space-y-2">
                  {f.features.map((feat, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-center space-x-2">
                      <Icons.Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => onNavigate("tarifs")}
                className="text-xs font-bold text-[#133E87] hover:underline cursor-pointer"
              >
                Consulter les tarifs & dossier →
              </button>
              <button
                onClick={onOpenVisitModal}
                className="px-4 py-2 bg-[#0B2545] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#133E87] transition cursor-pointer"
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: PÉDAGOGIE ─────────────────────────────────────────────────────────
function PagePedagogie({ onOpenVisitModal }: { onOpenVisitModal: () => void }) {
  const sections = [
    {
      title: "Section Bébés (3 à 12 mois)",
      desc: "Un espace cocon dédié à la sécurité affective, au respect des cycles de sommeil et aux premières découvertes sensorielles.",
      points: ["Tapis d'éveil & motricité libre", "Repas individualisés selon consignes des parents", "Dortoir séparé climatisé & silencieux"],
    },
    {
      title: "Section Petits & Moyens (1 à 3 ans)",
      desc: "L'âge de l'affirmation et du langage : motricité globale, jeux d'encastrement, comptines bilingues et apprentissage de la propreté.",
      points: ["Acquisition du langage en Français et Arabe", "Ateliers sensoriels et jeux d'imitation", "Accompagnement à l'autonomie et propreté"],
    },
    {
      title: "Grande Section & Maternelle (3 à 5 ans)",
      desc: "Préparation structurée à l'école élémentaire selon un programme d'excellence type mission.",
      points: ["Graphisme préparatoire à l'écriture", "Notions mathématiques et logique", "Expression orale, contes et activités théâtrales"],
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Projet Éducatif</p>
        <h1 className="text-3xl font-heading font-black text-[#0B2545] mt-1">
          Notre Pédagogie & Plus de 35 Ans d'Expérience
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Une méthode éprouvée combinant la rigueur du programme type mission et la chaleur d'un environnement familial protecteur.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((sec, idx) => (
          <div key={idx} className="bg-white p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Section 0{idx + 1}</span>
              <h3 className="font-heading font-bold text-xl text-[#0B2545] mt-1">{sec.title}</h3>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{sec.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {sec.points.map((pt, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-600">
                    <Icons.Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B2545] text-white p-8 text-center space-y-4">
        <h3 className="font-heading font-bold text-xl">Vous Souhaitez Échanger avec Notre Directrice Pédagogique ?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Venez visiter nos classes et discuter des besoins spécifiques de votre enfant.
        </p>
        <button
          onClick={onOpenVisitModal}
          className="px-6 py-3 bg-amber-400 text-[#0B2545] text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition cursor-pointer"
        >
          Prendre Rendez-vous
        </button>
      </div>
    </div>
  );
}

// ─── PAGE: UNE JOURNÉE ───────────────────────────────────────────────────────
function PageJournee() {
  const schedule = [
    { time: "07h30 – 09h00", title: "Accueil Chaleureux & Jeux Libres", desc: "Arrivée progressive des enfants, transmissions avec les parents, mise en confiance et réveil en douceur." },
    { time: "09h00 – 09h30", title: "Regroupement & Chants Bilingues", desc: "Comptines en Français et Arabe, rituel de la date et météo, appel du matin pour stimuler le sens du groupe." },
    { time: "09h30 – 10h45", title: "Ateliers Pédagogiques par Âge", desc: "Graphisme, manipulation, motricité fine, éveil musical, peinture et logique selon le programme pédagogique." },
    { time: "10h45 – 11h30", title: "Psychomotricité & Jeux Extérieurs", desc: "Parcours d'agilité, jeux de ballon, coordination et défoulement encadré." },
    { time: "11h30 – 12h30", title: "Déjeuner Frais Cuisiné sur Place", desc: "Repas équilibré et varié, apprentissage du goût, tenue des couverts et convivialité à table." },
    { time: "12h30 – 15h00", title: "Sieste & Temps Calme", desc: "Repos dans le dortoir calme et climatisé, musique douce et surveillance continue par les auxiliaires." },
    { time: "15h00 – 16h00", title: "Réveil Échelonné & Goûter Vitaminé", desc: "Hygiène, habillage autonome et goûter sain (fruits, produits laitiers et céréales)." },
    { time: "16h00 – 18h00", title: "Activités d'Éveil & Départs", desc: "Lecture de contes, jeux calmes, aide aux devoirs pour les grands et retours aux familles." },
    { time: "18h00 – 19h00", title: "Garde Prolongée (Sur Demande)", desc: "Pour les parents ayant des contraintes d'horaires étendues." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Organisation Quotidienne</p>
        <h1 className="text-3xl font-heading font-black text-[#0B2545] mt-1">
          Une Journée Type à La Centrale Crèche
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Un rythme structuré et sécurisant qui respecte les besoins physiologiques et d'éveil de l'enfant de 7h30 à 18h00.
        </p>
      </div>

      <div className="bg-white border border-slate-200 divide-y divide-slate-100 shadow-sm">
        {schedule.map((slot, idx) => (
          <div key={idx} className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="sm:w-48 shrink-0">
              <span className="font-heading font-black text-sm text-[#133E87] tracking-wider">{slot.time}</span>
            </div>
            <div className="sm:flex-1 space-y-1">
              <h3 className="font-heading font-bold text-base text-[#0B2545]">{slot.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{slot.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: TARIFS & INSCRIPTIONS ────────────────────────────────────────────
function PageTarifs({ onOpenVisitModal }: { onOpenVisitModal: () => void }) {
  const steps = [
    { num: "1", title: "Visite Découverte", desc: "Rencontrez la direction et visitez les installations de la crèche." },
    { num: "2", title: "Constitution du Dossier", desc: "Fiche d'inscription, carnet de santé à jour et pièces administratives." },
    { num: "3", title: "Période d'Adaptation", desc: "Intégration douce sur quelques heures les premiers jours pour un accueil serein." },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Modalités Pratiques</p>
        <h1 className="text-3xl font-heading font-black text-[#0B2545] mt-1">
          Inscriptions & Grille Tarifaire
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Inscriptions ouvertes toute l'année sous réserve de places disponibles dans chaque section.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((st) => (
          <div key={st.num} className="bg-white p-6 border border-slate-200 space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
              {st.num}
            </span>
            <h3 className="font-heading font-bold text-lg text-[#0B2545]">{st.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-heading font-bold text-xl text-[#0B2545]">Documents Requis pour l'Inscription</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="flex items-center space-x-2">
            <Icons.Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>2 photos d'identité récentes de l'enfant</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Copie du carnet de vaccination à jour</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Copie de la CIN des parents</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icons.Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Certificat médical d'aptitude à la collectivité</span>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-sm text-[#0B2545]">Consulter la grille tarifaire complète</p>
            <p className="text-xs text-slate-500">Tarifs adaptés selon la formule (plein temps, mi-temps, garderie, soutien scolaire).</p>
          </div>
          <button
            onClick={onOpenVisitModal}
            className="w-full sm:w-auto px-6 py-3 bg-[#0B2545] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#133E87] transition cursor-pointer"
          >
            Demander un Devis & Visite
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: GALERIE ───────────────────────────────────────────────────────────
function PageGalerie() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Nos Espaces</p>
        <h1 className="text-3xl font-heading font-black text-[#0B2545] mt-1">
          Galerie & Environnement de Vie
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Découvrez en images les salles de motricité, le dortoir et les espaces d'éveil de La Centrale Crèche.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border border-slate-200">
          <img src={kidsHero} alt="Espace de jeu" className="w-full h-72 object-cover" />
          <p className="text-xs font-bold text-[#0B2545] mt-3">Espace Motricité & Jeux</p>
          <p className="text-xs text-slate-500">Équipements sécurisés aux normes petite enfance.</p>
        </div>
        <div className="bg-white p-6 border border-slate-200 flex flex-col justify-center space-y-4">
          <h3 className="font-heading font-bold text-xl text-[#0B2545]">Des Locaux Clairs, Sécurisés et Aérés</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chaque espace est pensé pour la sécurité et l'autonomie des petits : sols amortissants, mobilier adapté à la taille des enfants, dortoir isolé du bruit, et cuisine aux normes d'hygiène les plus strictes.
          </p>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-center space-x-2">
              <Icons.Check className="w-4 h-4 text-emerald-600" />
              <span>Dortoir surveillé et climatisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icons.Check className="w-4 h-4 text-emerald-600" />
              <span>Salle de motricité spacieuse</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icons.Check className="w-4 h-4 text-emerald-600" />
              <span>Coin lecture et bibliothèque jeunesse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: CONTACT ───────────────────────────────────────────────────────────
function PageContact() {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    childAge: "1-2 ans",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour La Centrale Crèche,%0ANom: ${formData.parentName}%0ATéléphone: ${formData.phone}%0AÂge enfant: ${formData.childAge}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-[#133E87] uppercase tracking-widest">Nous Joindre</p>
        <h1 className="text-3xl font-heading font-black text-[#0B2545] mt-1">
          Contact & Accès à Casablanca
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Notre équipe est à votre disposition du lundi au vendredi pour répondre à toutes vos questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-slate-200 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#0B2545]">Coordonnées Directes</h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start space-x-3">
                <Icons.MapPin className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Adresse</p>
                  <p>{ADDRESS}</p>
                  <p className="text-[#133E87] font-semibold">({LANDMARK})</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icons.Phone className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Téléphones</p>
                  <p>{PHONE_1}</p>
                  <p>{PHONE_2}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Icons.Clock className="w-4 h-4 text-[#133E87] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Horaires</p>
                  <p>{HOURS}</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition"
          >
            <Icons.WhatsApp className="w-4 h-4" />
            <span>Contacter via WhatsApp</span>
          </a>
        </div>

        <div className="lg:col-span-7 bg-white p-8 border border-slate-200 shadow-sm">
          <h3 className="font-heading font-bold text-lg text-[#0B2545] mb-4">Envoyer un Message / Demande d'Inscription</h3>
          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold space-y-2">
              <p>Votre message a été transmis avec succès.</p>
              <p>Notre équipe vous recontactera dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nom et Prénom du Parent *</label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Ex: Mme Bennani"
                  className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Numéro de Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 XX XX XX XX"
                    className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Âge de l'Enfant</label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
                  >
                    <option>Moins de 1 an (Bébé)</option>
                    <option>1 à 2 ans</option>
                    <option>2 à 3 ans</option>
                    <option>3 à 5 ans (Maternelle)</option>
                    <option>Primaire (Soutien Scolaire)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Votre Message ou Questions</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Précisez vos souhaits (horaires, formule souhaitée, date de rentrée...)"
                  className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Envoyer ma Demande
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Visit Booking Modal ─────────────────────────────────────────
function VisitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [childAge, setChildAge] = useState("1-2 ans");

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour La Centrale Crèche,%0AJe souhaite réserver une visite découverte.%0ANom: ${parentName}%0ATéléphone: ${phone}%0ADate souhaitée: ${date}%0AÂge enfant: ${childAge}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full p-6 sm:p-8 shadow-2xl border-t-4 border-[#0B2545] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <h3 className="font-heading font-black text-xl text-[#0B2545]">
          Réserver une Visite Découverte
        </h3>
        <p className="text-xs text-slate-600 mt-1 mb-6">
          Venez découvrir notre cadre chaleureux à Casablanca (face au Marché Central).
        </p>

        <form onSubmit={handleConfirm} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nom du Parent *</label>
            <input
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="Ex: M. ou Mme El Alami"
              className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Téléphone de Contact *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06 XX XX XX XX"
              className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date Souhaitée</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Âge de l'Enfant</label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#0B2545]"
              >
                <option>3 à 12 mois</option>
                <option>1 à 2 ans</option>
                <option>2 à 3 ans</option>
                <option>3 à 5 ans</option>
                <option>Primaire</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#0B2545] hover:bg-[#133E87] text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Confirmer le Rendez-vous
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────────────────
function MainFooter({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#071930] text-slate-400 text-xs border-t border-slate-800 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-10 w-auto brightness-200" />
              <span className="font-heading font-black text-white text-base">LA CENTRALE CRÈCHE</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Établissement d'accueil de la petite enfance et soutien scolaire à Casablanca.
            </p>
            <p className="text-[11px] italic text-slate-500">
              « Le bien-être des enfants » · Notre priorité · Votre confiance · Notre engagement
            </p>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Navigation</p>
            <ul className="space-y-1.5 text-[11px]">
              <li><button onClick={() => onNavigate("accueil")} className="hover:text-white transition cursor-pointer">Accueil</button></li>
              <li><button onClick={() => onNavigate("services")} className="hover:text-white transition cursor-pointer">Nos Formules</button></li>
              <li><button onClick={() => onNavigate("pedagogie")} className="hover:text-white transition cursor-pointer">Projet Pédagogique</button></li>
              <li><button onClick={() => onNavigate("journee")} className="hover:text-white transition cursor-pointer">Une Journée Type</button></li>
              <li><button onClick={() => onNavigate("tarifs")} className="hover:text-white transition cursor-pointer">Tarifs & Inscription</button></li>
              <li><button onClick={() => onNavigate("contact")} className="hover:text-white transition cursor-pointer">Contact & Accès</button></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Horaires & Garde</p>
            <ul className="space-y-1.5 text-[11px]">
              <li>Lundi – Vendredi : 7h30 à 18h00</li>
              <li>Garde prolongée : 18h00 à 19h00</li>
              <li>Mercredis après-midi ouverts</li>
              <li>Vacances scolaires, Juillet & Août</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-3">Contact</p>
            <ul className="space-y-1.5 text-[11px]">
              <li>{ADDRESS}</li>
              <li>{LANDMARK}</li>
              <li>Tél : {PHONE_1}</li>
              <li>Gsm : {PHONE_2}</li>
              <li>WhatsApp : +{WHATSAPP}</li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} La Centrale Crèche & Halte Garderie Casablanca. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

// ─── Main Application Root ───────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("accueil");
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0B2545] selection:text-white relative">
      <BackgroundDecorations />

      {/* GWA Top Bar */}
      <GWAHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenVisitModal={() => setVisitModalOpen(true)}
      />

      {/* Full-Bleed Kids Hero Banner (on Accueil and everywhere as top masthead) */}
      <GWAHero
        onOpenVisitModal={() => setVisitModalOpen(true)}
        onNavigate={(p) => setCurrentPage(p)}
      />

      {/* Main Page Routing */}
      <main className="flex-grow">
        {currentPage === "accueil" && (
          <PageAccueil
            onNavigate={(p) => setCurrentPage(p)}
            onOpenVisitModal={() => setVisitModalOpen(true)}
          />
        )}
        {currentPage === "services" && (
          <PageServices
            onOpenVisitModal={() => setVisitModalOpen(true)}
            onNavigate={(p) => setCurrentPage(p)}
          />
        )}
        {currentPage === "pedagogie" && (
          <PagePedagogie onOpenVisitModal={() => setVisitModalOpen(true)} />
        )}
        {currentPage === "journee" && <PageJournee />}
        {currentPage === "tarifs" && (
          <PageTarifs onOpenVisitModal={() => setVisitModalOpen(true)} />
        )}
        {currentPage === "galerie" && <PageGalerie />}
        {currentPage === "contact" && <PageContact />}
      </main>

      {/* Main Footer */}
      <MainFooter onNavigate={(p) => setCurrentPage(p)} />

      {/* Visit Modal */}
      <VisitModal
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
      />
    </div>
  );
}
