import React, { useState, useEffect } from "react";
import logo from "@/imports/logo_creche_centrale.png";
import kidsHero from "@/imports/kids_hero.png";

// ─── Contact Constants ────────────────────────────────────────────────────────
const PHONE_1 = "05 22 44 64 74";
const PHONE_2 = "06 61 67 23 83";
const WHATSAPP = "212661672383";
const ADDRESS = "125, rue Allal Ben Abdallah, Casablanca (Face au Marché Central)";

type Page = "accueil" | "services" | "pedagogie" | "journee" | "tarifs" | "galerie" | "contact";

// ─── Clean SVG Icon Library (Zero Emojis) ────────────────────────────────────

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
  ShieldCheck: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
  ArrowRight: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  Star: ({ className = "w-4 h-4 fill-amber-400 text-amber-400" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Sun: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Moon: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  BookOpen: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Utensils: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2v18H3V3zm16 0h2v18h-2V3zM8 3v8a3 3 0 006 0V3M11 11v10" />
    </svg>
  ),
  Heart: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Sparkles: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

// ─── Background Ambient Elements (6 Balloons with 10s pause) ─────────────────

function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 6 Clean Balloons with staggered entries & 10s pause */}
      <div className="absolute left-[6%] balloon-slot-1 bottom-0">
        <svg width="40" height="66" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="22" ry="26" fill="url(#bgBall1)" />
          <path d="M23 54 L27 54 L25 58 Z" fill="#7E22CE" />
          <path d="M25 58 Q22 68 26 78 Q29 88 25 96" stroke="#C084FC" strokeWidth="1" fill="none" />
          <ellipse cx="18" cy="18" rx="5" ry="8" fill="white" opacity="0.3" transform="rotate(-20 18 18)" />
          <defs>
            <linearGradient id="bgBall1" x1="5" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C084FC" />
              <stop offset="1" stopColor="#6B21A8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[24%] balloon-slot-2 bottom-0">
        <svg width="34" height="58" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="19" ry="23" fill="url(#bgBall2)" />
          <path d="M23 51 L27 51 L25 55 Z" fill="#D97706" />
          <path d="M25 55 Q28 65 23 74" stroke="#FBBF24" strokeWidth="1" fill="none" />
          <ellipse cx="18" cy="18" rx="4" ry="7" fill="white" opacity="0.35" transform="rotate(-20 18 18)" />
          <defs>
            <linearGradient id="bgBall2" x1="5" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[42%] balloon-slot-3 bottom-0">
        <svg width="38" height="64" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="21" ry="25" fill="url(#bgBall3)" />
          <path d="M23 53 L27 53 L25 57 Z" fill="#9333EA" />
          <path d="M25 57 Q21 66 27 75" stroke="#DDD6FE" strokeWidth="1" fill="none" />
          <ellipse cx="18" cy="18" rx="4" ry="7" fill="white" opacity="0.3" transform="rotate(-20 18 18)" />
          <defs>
            <linearGradient id="bgBall3" x1="5" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E9D5FF" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[60%] balloon-slot-4 bottom-0">
        <svg width="42" height="70" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="22" ry="26" fill="url(#bgBall4)" />
          <path d="M23 54 L27 54 L25 58 Z" fill="#581C87" />
          <path d="M25 58 Q28 68 23 78" stroke="#7C3AED" strokeWidth="1" fill="none" />
          <ellipse cx="18" cy="18" rx="5" ry="8" fill="white" opacity="0.3" transform="rotate(-20 18 18)" />
          <defs>
            <linearGradient id="bgBall4" x1="5" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DDD6FE" />
              <stop offset="1" stopColor="#6B21A8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[78%] balloon-slot-5 bottom-0">
        <svg width="36" height="60" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="20" ry="24" fill="url(#bgBall5)" />
          <path d="M23 52 L27 52 L25 56 Z" fill="#D97706" />
          <path d="M25 56 Q28 66 23 75" stroke="#FBBF24" strokeWidth="1" fill="none" />
          <ellipse cx="18" cy="18" rx="4" ry="7" fill="white" opacity="0.35" transform="rotate(-20 18 18)" />
          <defs>
            <linearGradient id="bgBall5" x1="5" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute left-[92%] balloon-slot-6 bottom-0">
        <svg width="38" height="64" viewBox="0 0 50 80" fill="none">
          <ellipse cx="25" cy="28" rx="21" ry="25" fill="url(#bgBall6)" />
          <path d="M23 53 L27 53 L25 57 Z" fill="#7E22CE" />
          <path d="M25 57 Q21 66 26 76" stroke="#C084FC" strokeWidth="1" fill="none" />
          <ellipse cx="18" cy="18" rx="4" ry="7" fill="white" opacity="0.3" transform="rotate(-20 18 18)" />
          <defs>
            <linearGradient id="bgBall6" x1="5" y1="5" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#C084FC" />
              <stop offset="1" stopColor="#7E22CE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Subtle Toy Watermarks */}
      <div className="absolute top-32 left-4 lg:left-8 opacity-15 toy-float">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="45" width="40" height="40" rx="8" fill="#7C3AED" />
          <text x="30" y="73" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle">A</text>
          <rect x="52" y="45" width="40" height="40" rx="8" fill="#F59E0B" />
          <text x="72" y="73" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle">B</text>
          <rect x="31" y="8" width="40" height="40" rx="8" fill="#A855F7" />
          <text x="51" y="36" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle">C</text>
        </svg>
      </div>

      <div className="absolute top-40 right-4 lg:right-10 opacity-12 toy-float-reverse">
        <svg width="55" height="55" viewBox="0 0 100 100" fill="none">
          <circle cx="28" cy="28" r="14" fill="#6B21A8" />
          <circle cx="28" cy="28" r="7" fill="#C084FC" />
          <circle cx="72" cy="28" r="14" fill="#6B21A8" />
          <circle cx="72" cy="28" r="7" fill="#C084FC" />
          <circle cx="50" cy="52" r="32" fill="#7E22CE" />
          <ellipse cx="50" cy="58" rx="14" ry="10" fill="#E9D5FF" />
          <ellipse cx="50" cy="54" rx="4" ry="3" fill="#3B0764" />
          <circle cx="40" cy="46" r="3" fill="#3B0764" />
          <circle cx="60" cy="46" r="3" fill="#3B0764" />
        </svg>
      </div>

      <div className="absolute top-[50%] left-4 lg:left-8 opacity-12 toy-float">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
          <path d="M15 80 Q50 95 85 80" stroke="#7C3AED" strokeWidth="8" strokeLinecap="round" />
          <path d="M30 75 L45 45 L65 45 L75 75" stroke="#7C3AED" strokeWidth="6" strokeLinejoin="round" />
          <path d="M65 45 L72 25 L60 20 L50 35 Z" fill="#9333EA" />
        </svg>
      </div>

      <div className="absolute top-[70%] right-4 lg:right-8 opacity-12 toy-float-reverse">
        <svg width="60" height="42" viewBox="0 0 120 80" fill="none">
          <rect x="20" y="30" width="45" height="30" rx="4" fill="#7C3AED" />
          <rect x="65" y="15" width="35" height="45" rx="4" fill="#9333EA" />
          <rect x="72" y="22" width="20" height="16" rx="2" fill="#E9D5FF" />
          <circle cx="35" cy="65" r="9" fill="#3B0764" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="55" cy="65" r="9" fill="#3B0764" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="85" cy="65" r="9" fill="#3B0764" stroke="#FBBF24" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

// ─── Header & Navigation (GWA Style) ─────────────────────────────────────────

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

  const pages: { id: Page; label: string }[] = [
    { id: "accueil", label: "ACCUEIL" },
    { id: "services", label: "NOS FORMULES" },
    { id: "pedagogie", label: "PÉDAGOGIE & ÂGES" },
    { id: "journee", label: "UNE JOURNÉE" },
    { id: "tarifs", label: "INSCRIPTIONS & TARIFS" },
    { id: "galerie", label: "GALERIE" },
    { id: "contact", label: "CONTACT" },
  ];

  const handleNavigate = (pageId: Page) => {
    setCurrentPage(pageId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="relative z-40 bg-[#1e0a3c] text-white">
      {/* Top Utility Bar (Exact GWA Header Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Empty left placeholder so navigation links align to the right of the floating logo box */}
        <div className="hidden lg:block w-72 shrink-0" />

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-wider uppercase text-purple-200">
          {pages.map((p) => {
            const isActive = currentPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleNavigate(p.id)}
                className={`py-1 transition-colors hover:text-white cursor-pointer ${
                  isActive ? "text-amber-400 border-b-2 border-amber-400" : ""
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </nav>

        {/* Right Search & Menu Controls */}
        <div className="flex items-center gap-4 text-white ml-auto lg:ml-0">
          <a
            href={`tel:${PHONE_1.replace(/\s/g, "")}`}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-purple-200 hover:text-white transition"
          >
            <Icons.Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{PHONE_1}</span>
          </a>

          <div className="h-4 w-px bg-purple-800 hidden sm:block" />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2 text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 transition cursor-pointer"
          >
            <span>MENU</span>
            <Icons.Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#16062c] border-t border-purple-900 px-5 py-4 space-y-2 shadow-2xl">
          {pages.map((p) => {
            const isActive = currentPage === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleNavigate(p.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  isActive
                    ? "bg-purple-800 text-white"
                    : "text-purple-200 hover:bg-purple-900/60 hover:text-white"
                }`}
              >
                <span>{p.label}</span>
                {isActive && <span>✓</span>}
              </button>
            );
          })}
          <div className="pt-3 border-t border-purple-900">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenVisitModal();
              }}
              className="w-full py-3 rounded-xl text-center text-xs font-bold text-purple-950 bg-amber-400 shadow-md"
            >
              Planifier une visite découverte
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── GWA Hero Component with Kids Picture & Floating Action Tabs ─────────────

function GWAHero({
  onOpenVisitModal,
  onNavigate,
}: {
  onOpenVisitModal: () => void;
  onNavigate: (p: Page) => void;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-purple-950">
      
      {/* 📸 Full-Bleed Kids Picture Header */}
      <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[660px]">
        <img
          src={kidsHero}
          alt="Les enfants à La Centrale Crèche"
          className="w-full h-full object-cover object-center"
        />

        {/* Soft gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-purple-950/40 pointer-events-none" />

        {/* 🏛️ Floating White Brand Card on Top-Left (Exact GWA Academy Style) */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20 bg-white p-5 sm:p-7 rounded-2xl shadow-2xl border border-gray-100 max-w-[320px] sm:max-w-[380px]">
          <div className="flex items-center gap-3.5 mb-3">
            <img src={logo} alt="La Centrale Crèche" className="h-12 w-auto object-contain" />
            <div>
              <h2 className="font-heading font-black text-lg sm:text-xl text-purple-950 leading-tight">
                LA CENTRALE CRÈCHE
              </h2>
              <p className="text-[10px] font-bold text-purple-700 uppercase tracking-widest">
                ET HALTE GARDERIE
              </p>
            </div>
          </div>
          <div className="border-t border-purple-100 pt-3 space-y-1">
            <p className="font-heading font-bold text-sm text-purple-900 italic">
              « Le bien-être des enfants »
            </p>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
              Notre priorité · Votre confiance · Notre engagement
            </p>
          </div>
        </div>

        {/* 📌 Floating Vertical Action Tabs on Right Edge (Exact GWA Style: VISIT, INQUIRE, APPLY) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1 sm:gap-2 shadow-2xl">
          
          {/* VISIT */}
          <button
            onClick={onOpenVisitModal}
            className="group px-4 sm:px-6 py-3 sm:py-4 bg-white hover:bg-purple-900 text-purple-950 hover:text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md flex items-center justify-between gap-3 text-left cursor-pointer border-l-4 border-amber-400"
          >
            <span>VISITER</span>
            <Icons.Calendar className="w-4 h-4 text-amber-500 group-hover:text-amber-300 transition" />
          </button>

          {/* INQUIRE */}
          <a
            href={`https://wa.me/${WHATSAPP}?text=Bonjour%20La%20Centrale%2C%20je%20souhaite%20des%20renseignements.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-4 sm:px-6 py-3 sm:py-4 bg-white hover:bg-emerald-800 text-purple-950 hover:text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md flex items-center justify-between gap-3 text-left border-l-4 border-emerald-500"
          >
            <span>RENSEIGNEMENTS</span>
            <Icons.WhatsApp className="w-4 h-4 text-emerald-600 group-hover:text-emerald-300 transition" />
          </a>

          {/* APPLY */}
          <button
            onClick={() => onNavigate("tarifs")}
            className="group px-4 sm:px-6 py-3 sm:py-4 bg-white hover:bg-purple-950 text-purple-950 hover:text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all shadow-md flex items-center justify-between gap-3 text-left cursor-pointer border-l-4 border-purple-600"
          >
            <span>S'INSCRIRE</span>
            <Icons.ArrowRight className="w-4 h-4 text-purple-700 group-hover:text-purple-300 transition" />
          </button>
        </div>

        {/* 🔔 Bottom Alert & Controls Strip (Exact GWA Style) */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-20 flex flex-wrap items-center justify-between gap-3">
          
          {/* Alert pill on bottom-left */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-950/85 backdrop-blur-md border border-purple-700/60 text-white text-xs font-semibold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Icons.Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Inscriptions 2024-2025 Ouvertes · De 3 mois à 5 ans</span>
          </div>

          {/* Location on bottom-right */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/85 backdrop-blur-md border border-purple-700/60 text-amber-300 text-xs font-bold">
            <Icons.MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Casablanca · Face au Marché Central</span>
          </div>

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
  const brandPillars = [
    {
      num: "01",
      title: "Horaires Souples & Continues",
      desc: "Ouvert 5j/7 de 7h30 à 18h (possibilité de garde prolongée de 18h à 19h).",
      tag: "7h30 – 18h (ou 19h)",
    },
    {
      num: "02",
      title: "Ambiance Chaleureuse & Familiale",
      desc: "Un cadre sécurisant à taille humaine qui allie discipline, rigueur et grande bienveillance.",
      tag: "Discipline & Douceur",
    },
    {
      num: "03",
      title: "Corps Pédagogique de Plus de 35 Ans d'Expérience",
      desc: "Un programme d'excellence type mission dispensé par une équipe hautement qualifiée.",
      tag: "Programme Type Mission",
    },
    {
      num: "04",
      title: "Repas BIO Cuisinés sur Place",
      desc: "Garde, repas comptines et déjeuners équilibrés préparés chaque matin avec des produits frais.",
      tag: "Alimentation Saine",
    },
    {
      num: "05",
      title: "Ouverte Vacances & Mercredis",
      desc: "Accueil assuré pendant les vacances scolaires, en juillet, en août et les mercredis après-midi.",
      tag: "Toute l'Année",
    },
    {
      num: "06",
      title: "Formules Adaptées de 3 Mois à 5 Ans",
      desc: "Toute la journée (horaires continus), demi-journée ou à l'heure sans engagement.",
      tag: "De 3 mois à 5 ans",
    },
    {
      num: "07",
      title: "Cours de Soutien Scolaire",
      desc: "Accompagnement pédagogique du 1er AP au 6ème AP en Arabe, Français et Mathématiques.",
      tag: "Du 1er au 6ème AP",
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 🌟 Grand GWA Header Hero with Kids Image */}
      <GWAHero onOpenVisitModal={onOpenVisitModal} onNavigate={onNavigate} />

      {/* ─── The 7 Signature Commitments ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-4">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
            Nos 7 Engagements Fondamentaux
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-purple-950">
            Pourquoi choisir La Centrale Crèche ?
          </h2>
          <p className="text-gray-600 text-sm">
            Des formules adaptées aux besoins réels des parents casablancais.
          </p>
        </div>

        {/* 7 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandPillars.map((p, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-3xl bg-white border border-purple-100 shadow-sm flex flex-col justify-between hover:border-purple-300 transition ${
                idx === 6 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-black text-3xl text-purple-300">{p.num}</span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-100">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-purple-950 leading-snug">{p.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Callout Banner ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-purple-900 to-purple-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              Prenez rendez-vous dès aujourd'hui
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Offrez le meilleur à votre enfant dès aujourd'hui.
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
              Venez visiter nos espaces d'éveil face au Marché Central et rencontrez notre équipe pédagogique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenVisitModal}
              className="px-7 py-3.5 rounded-full text-xs font-bold bg-amber-400 text-purple-950 hover:bg-amber-300 transition cursor-pointer shadow-md"
            >
              Réserver une visite gratuite →
            </button>
            <a
              href={`tel:${PHONE_1.replace(/\s/g, "")}`}
              className="px-6 py-3.5 rounded-full text-xs font-bold text-white bg-purple-800 hover:bg-purple-700 transition"
            >
              📞 {PHONE_1}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── PAGE: NOS SERVICES ──────────────────────────────────────────────────────

function PageServices({ onOpenVisitModal }: { onOpenVisitModal: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Formules de Garde
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-purple-950">
          Nos Formules d'Accueil
        </h1>
        <p className="text-gray-600 text-base">
          Des formules souples pour les enfants de 3 mois à 5 ans, toute la journée en horaires continus, à la demi-journée ou à l'heure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="p-8 rounded-3xl bg-white border-2 border-purple-200 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-900">
              Accueil Régulier
            </span>
            <h2 className="font-heading font-black text-2xl text-purple-950">Crèche Régulière</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pour les enfants de 3 mois à 5 ans. Un cadre stable et stimulant où chaque enfant est connu, reconnu et accompagné selon son rythme propre.
            </p>
            <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs text-gray-700">
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Du lundi au vendredi de 7h30 à 18h00</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Garde de 18h à 19h possible sur demande</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Repas BIO faits maison et collations inclus</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Programme pédagogique d'excellence (type mission)</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Ouverte vacances scolaires, juillet et août</p>
            </div>
          </div>
          <button
            onClick={onOpenVisitModal}
            className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 transition cursor-pointer shadow-md"
          >
            Demander une inscription en crèche
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
              Accueil Ponctuel
            </span>
            <h2 className="font-heading font-black text-2xl text-purple-950">Halte-Garderie</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              À l'heure ou à la demi-journée sans engagement. Même équipe d'éducatrices de plus de 35 ans d'expérience dans un cadre sécurisé.
            </p>
            <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs text-gray-700">
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-amber-700" /> Accueil ponctuel à l'heure ou demi-journée</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-amber-700" /> Ouverte les mercredis après-midi</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-amber-700" /> Participation active aux ateliers d'éveil</p>
              <p className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-amber-700" /> Réservation facile et rapide sur WhatsApp</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20cr%C3%A9neau%20en%20halte-garderie.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full text-xs font-bold text-center block text-amber-950 bg-amber-300 hover:bg-amber-400 transition shadow-sm"
          >
            Réserver un créneau halte-garderie
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: PÉDAGOGIE & ÂGES ──────────────────────────────────────────────────

function PagePedagogie({ onOpenVisitModal }: { onOpenVisitModal: () => void }) {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  const groups = [
    {
      range: "3 à 12 mois",
      title: "Les Bébés & Nourrissons",
      focus: "Sécurité affective, motricité libre & éveil des sens",
      desc: "Un espace cocon feutré respectant le rythme biologique de chaque nourrisson (sommeil, biberons à la demande, éveil doux).",
      points: [
        "Espace cocon sur tapis d'éveil sécurisé",
        "Rythme de sommeil et biberons individualisé",
        "Éveil sensoriel doux (hochets bois, musique douce)",
        "Portage sécurisé et câlins rassurants",
      ],
      ratio: "1 encadrante pour 4 bébés",
    },
    {
      range: "1 à 2 ans",
      title: "Les Explorateurs",
      focus: "Premiers pas, motricité globale & autonomie",
      desc: "L'âge des premiers pas et de l'exploration active. Modules en mousse pour sécuriser la marche et jeux d'encastrement.",
      points: [
        "Parcours moteurs en mousse pour sécuriser la marche",
        "Jeux d'encastrement et développement de la motricité fine",
        "Comptines gestuelles et apprentissage des premiers mots",
        "Début de l'autonomie pour les repas",
      ],
      ratio: "1 encadrante pour 5 enfants",
    },
    {
      range: "2 à 3 ans",
      title: "Les Petits Curieux",
      focus: "Socialisation, créativité & langage enrichi",
      desc: "L'enfant interagit avec ses camarades, développe son imaginaire par la peinture, les jeux symboliques et gagne en propreté.",
      points: [
        "Ateliers peinture propre, pâte à modeler et gommettes",
        "Jeux symboliques (dinette, déguisements, poupées)",
        "Apprentissage du partage et des règles de vie en groupe",
        "Accompagnement bienveillant vers la propreté",
      ],
      ratio: "1 encadrante pour 6 enfants",
    },
    {
      range: "3 à 5 ans",
      title: "Les Grands Aventuriers (Pré-Maternelle)",
      focus: "Programme type mission & préparation à l'école",
      desc: "Passerelle idéale vers la grande école : pré-graphisme, tenue du crayon, reconnaissance des lettres et cours de soutien disponibles.",
      points: [
        "Pré-graphisme, tenue du crayon, reconnaissance des lettres",
        "Projets de découverte de la nature et histoires interactives",
        "Cours de soutien scolaire (1er au 6ème AP en Arabe, Français, Maths)",
        "Confiance en soi et expression orale",
      ],
      ratio: "1 encadrante pour 8 enfants",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Pédagogie & Développement
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-purple-950">
          Un programme pensé pour chaque âge
        </h1>
        <p className="text-gray-600 text-base">
          Programme type mission encadré par une équipe de plus de 35 ans d'expérience.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {groups.map((g, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedGroup(idx)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedGroup === idx
                ? "bg-purple-900 text-white shadow-sm"
                : "bg-white text-purple-950 border border-purple-100 hover:bg-purple-50"
            }`}
          >
            {g.range}
          </button>
        ))}
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-purple-100 shadow-md max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-purple-950">{groups[selectedGroup].title}</h2>
            <p className="text-xs sm:text-sm font-semibold text-purple-700 mt-1">{groups[selectedGroup].focus}</p>
          </div>
          <span className="self-start sm:self-center px-4 py-1.5 rounded-full text-xs font-bold bg-purple-50 text-purple-900 border border-purple-200">
            {groups[selectedGroup].ratio}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{groups[selectedGroup].desc}</p>

        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Activités clés :</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {groups[selectedGroup].points.map((pt, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 text-xs text-gray-800 flex items-start gap-2.5 border border-purple-100/50">
                <Icons.Check className="w-3.5 h-3.5 text-purple-700 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onOpenVisitModal}
            className="px-6 py-3 rounded-full text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 transition cursor-pointer"
          >
            Inscrire mon enfant dans ce groupe →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: UNE JOURNÉE ───────────────────────────────────────────────────────

function PageJournee({ onOpenVisitModal }: { onOpenVisitModal: () => void }) {
  const schedule = [
    { time: "7h30 – 9h00", title: "Accueil échelonné & Jeux libres", desc: "Arrivée douce des enfants, transmission matinale et échanges chaleureux avec les parents.", icon: <Icons.Sun className="w-5 h-5 text-purple-700" /> },
    { time: "9h00 – 9h30", title: "Collation matinale & Chansons", desc: "Fruits frais découpés, comptines de bienvenue et appel des prénoms en petit cercle.", icon: <Icons.Sparkles className="w-5 h-5 text-purple-700" /> },
    { time: "9h30 – 11h15", title: "Ateliers dirigés & Motricité", desc: "Ateliers par tranche d'âge : éveil sensoriel, peinture, manipulation, parcours moteur.", icon: <Icons.BookOpen className="w-5 h-5 text-purple-700" /> },
    { time: "11h15 – 12h00", title: "Plein air & Espace récréation", desc: "Sortie extérieure et jeux sous le soleil dans notre espace sécurisé (selon météo).", icon: <Icons.Sun className="w-5 h-5 text-purple-700" /> },
    { time: "12h00 – 13h15", title: "Déjeuner BIO complet & Soins", desc: "Repas équilibré cuisiné le jour même sur place, apprentissage de l'autonomie à table.", icon: <Icons.Utensils className="w-5 h-5 text-purple-700" /> },
    { time: "13h15 – 15h30", title: "Sieste & Temps calme", desc: "Dortoir obscurci, température régulée, respect strict du cycle de sommeil de chacun.", icon: <Icons.Moon className="w-5 h-5 text-purple-700" /> },
    { time: "15h30 – 16h15", title: "Réveil doux & Goûter", desc: "Collation saine de l'après-midi, change et transition tout en douceur.", icon: <Icons.Utensils className="w-5 h-5 text-purple-700" /> },
    { time: "16h15 – 17h30", title: "Activités calmes & Contes", desc: "Coin lecture, puzzles, jeux de construction et motricité fine.", icon: <Icons.BookOpen className="w-5 h-5 text-purple-700" /> },
    { time: "17h30 – 18h00", title: "Départs & Échanges familles", desc: "Transmission de la journée via le cahier de liaison personnalisé et au revoir bienveillant.", icon: <Icons.Heart className="w-5 h-5 text-purple-700" /> },
    { time: "18h00 – 19h00", title: "Garde prolongée (Optionnelle)", desc: "Pour les parents aux horaires décalés, accueil calme jusqu'à 19h.", icon: <Icons.Clock className="w-5 h-5 text-purple-700" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Rythme & Repères
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-purple-950">
          Une Journée à La Centrale
        </h1>
        <p className="text-gray-600 text-base">
          Des rituels stables et sécurisants qui respectent le rythme naturel et le bien-être des tout-petits.
        </p>
      </div>

      <div className="space-y-3">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-purple-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-purple-950">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-purple-100 text-purple-900 shrink-0 self-start sm:self-center">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: INCRIPTIONS & TARIFS ──────────────────────────────────────────────

function PageTarifs({ onOpenVisitModal }: { onOpenVisitModal: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Admission & Tarification
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-purple-950">
          Inscriptions & Tarifs
        </h1>
        <p className="text-gray-600 text-base">
          Un processus d'admission transparent et bienveillant pour accueillir chaque nouvelle famille en toute sérénité.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { step: "01", title: "Prise de contact", desc: "Contact téléphonique ou WhatsApp pour vérifier la disponibilité selon l'âge." },
          { step: "02", title: "Visite découverte", desc: "Rencontre avec la directrice, visite des locaux et remise de la grille tarifaire." },
          { step: "03", title: "Dossier d'inscription", desc: "Remise des pièces administratives et médicales de votre enfant." },
          { step: "04", title: "Adaptation douce", desc: "Période progressive de 3 à 5 jours pour une intégration en toute confiance." },
        ].map((s, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-2">
            <span className="font-heading font-black text-2xl text-purple-400">{s.step}</span>
            <h3 className="font-heading font-bold text-sm text-purple-950">{s.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="font-heading font-black text-xl text-purple-950">Modalités de Tarification</h3>
          <div className="space-y-2.5 pt-1 text-xs text-gray-700">
            <div className="p-3.5 rounded-2xl bg-purple-50/70 flex justify-between items-center">
              <span className="font-semibold">Crèche régulière (temps plein ou partiel)</span>
              <span className="font-bold text-purple-900">Forfait mensuel</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/70 flex justify-between items-center">
              <span className="font-semibold">Halte-garderie ponctuelle</span>
              <span className="font-bold text-purple-900">À l'heure / Demi-journée</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/70 flex justify-between items-center">
              <span className="font-semibold">Repas & goûters BIO faits maison</span>
              <span className="font-bold text-emerald-800">Inclus</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-50/70 flex justify-between items-center">
              <span className="font-semibold">Garde prolongée (18h à 19h)</span>
              <span className="font-bold text-purple-900">Sur demande</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
          <h3 className="font-heading font-black text-xl text-purple-950">Pièces à Fournir</h3>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Copie du carnet de vaccination à jour</li>
            <li className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Extrait d'acte de naissance de l'enfant</li>
            <li className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Copies des CIN des parents / tuteurs légaux</li>
            <li className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> 4 photos d'identité récentes de l'enfant</li>
            <li className="flex items-center gap-2"><Icons.Check className="w-3.5 h-3.5 text-purple-700" /> Certificat médical d'aptitude à la vie en collectivité</li>
          </ul>
          <div className="pt-2">
            <button
              onClick={onOpenVisitModal}
              className="w-full py-3 rounded-full text-xs font-bold text-white bg-purple-900 hover:bg-purple-950 transition cursor-pointer"
            >
              Planifier une visite découverte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: GALERIE ───────────────────────────────────────────────────────────

function PageGalerie() {
  const images = [
    { title: "Ateliers créatifs & éveil", src: "https://images.unsplash.com/photo-1770096679916-2cd9c720d400?w=800&h=600&fit=crop&auto=format&q=80" },
    { title: "Espace motricité & jeux sécurisés", src: "https://images.unsplash.com/photo-1761208663763-c4d30657c910?w=800&h=600&fit=crop&auto=format&q=80" },
    { title: "Coin lecture & éveil au langage", src: "https://images.unsplash.com/photo-1649386525679-214da4fa6676?w=800&h=600&fit=crop&auto=format&q=80" },
    { title: "Espace cocon des bébés", src: "https://images.unsplash.com/photo-1554119332-086f48919aca?w=800&h=600&fit=crop&auto=format&q=80" },
    { title: "Salle d'apprentissage pré-maternelle", src: "https://images.unsplash.com/photo-1777056491418-d4ff81a4ad92?w=800&h=600&fit=crop&auto=format&q=80" },
    { title: "Moments de partage et de convivialité", src: "https://images.unsplash.com/photo-1786292949404-084cbd10c7b1?w=800&h=600&fit=crop&auto=format&q=80" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Visite en Images
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-purple-950">
          Nos Espaces & Ambiance
        </h1>
        <p className="text-gray-600 text-base">
          Des lieux lumineux, propres et sécurisés spécialement aménagés pour l'éveil et l'épanouissement des tout-petits.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="group relative rounded-3xl overflow-hidden shadow-sm bg-white border border-purple-100 aspect-4/3"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-bold">{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: CONTACT & ACCÈS ───────────────────────────────────────────────────

function PageContact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
          Contact & Accès
        </span>
        <h1 className="font-heading font-black text-4xl sm:text-5xl text-purple-950">
          Nous Rencontrer à la Crèche
        </h1>
        <p className="text-gray-600 text-base">
          Une question ou besoin d'une visite ? Contactez notre équipe ou remplissez le formulaire de rendez-vous.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-lg text-purple-950">Coordonnées</h3>
            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <Icons.MapPin className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Adresse</p>
                  <p>{ADDRESS}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.Phone className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Téléphone</p>
                  <p><a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="hover:text-purple-700 font-semibold">{PHONE_1}</a></p>
                  <p><a href={`tel:${PHONE_2.replace(/\s/g, "")}`} className="hover:text-purple-700 font-semibold">{PHONE_2}</a></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.WhatsApp className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">WhatsApp direct</p>
                  <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                    +{WHATSAPP}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icons.Clock className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900">Horaires d'ouverture</p>
                  <p>Du Lundi au Vendredi : 7h30 – 18h00 (Garde jusqu'à 19h sur demande)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-purple-100 aspect-16/9 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9!2d-7.6114!3d33.5953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2938a9c51d3%3A0xd82c71f6b5dc25d!2sCentral%20Market%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1620000000000!5m2!1sfr!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Plan d'accès La Centrale"
            />
          </div>
        </div>

        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-purple-100 shadow-md">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 text-xl font-black flex items-center justify-center mx-auto">
                <Icons.Check className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-heading font-black text-2xl text-purple-950">Demande envoyée !</h3>
              <p className="text-xs text-gray-600 max-w-sm mx-auto">
                Merci ! Notre directrice pédagogique vous contactera par téléphone pour convenir de l'horaire de votre visite.
              </p>
              <button
                onClick={() => setSent(false)}
                className="px-5 py-2 rounded-full text-xs font-bold text-purple-900 bg-purple-100 cursor-pointer"
              >
                Envoyer un nouveau message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <h3 className="font-heading font-black text-2xl text-purple-950">
                Demande de visite ou renseignement
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Prénom & Nom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom complet"
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-purple-800 bg-purple-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Téléphone (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="06 XX XX XX XX"
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-purple-800 bg-purple-50/30"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Âge de l'enfant</label>
                  <select className="w-full p-3 rounded-xl border border-gray-200 text-xs bg-purple-50/30 font-medium">
                    <option>3 à 12 mois</option>
                    <option>1 à 2 ans</option>
                    <option>2 à 3 ans</option>
                    <option>3 à 5 ans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Formule souhaitée</label>
                  <select className="w-full p-3 rounded-xl border border-gray-200 text-xs bg-purple-50/30 font-medium">
                    <option>Crèche régulière</option>
                    <option>Halte-garderie</option>
                    <option>À définir lors de la visite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Votre message</label>
                <textarea
                  rows={3}
                  placeholder="Vos questions, vos disponibilités pour la visite..."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-purple-800 bg-purple-50/30 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-purple-900 hover:bg-purple-950 transition cursor-pointer shadow-md"
              >
                Envoyer ma demande de rendez-vous
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Modal Dialog: Rendez-vous Visite ────────────────────────────────────────

function VisitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold text-sm cursor-pointer"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Icons.Check className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-black text-xl text-purple-950">Rendez-vous réservé</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Nous vous recontactons rapidement pour confirmer l'heure exacte de votre visite.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-purple-900 cursor-pointer"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                Visite Découverte Offerte
              </span>
              <h3 className="font-heading font-black text-2xl text-purple-950">
                Planifier votre visite
              </h3>
              <p className="text-xs text-gray-500">
                Venez découvrir nos locaux face au Marché Central de Casablanca.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  placeholder="Votre nom"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:outline-purple-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Téléphone (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="06 XX XX XX XX"
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs focus:outline-purple-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Âge de l'enfant</label>
                  <select className="w-full p-2.5 rounded-xl border border-gray-200 text-xs">
                    <option>3 à 12 mois</option>
                    <option>1 à 2 ans</option>
                    <option>2 à 3 ans</option>
                    <option>3 à 5 ans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Date souhaitée</label>
                  <input type="date" className="w-full p-2.5 rounded-xl border border-gray-200 text-xs" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-purple-900 hover:bg-purple-950 transition cursor-pointer shadow-md"
            >
              Confirmer la demande de visite
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Clean Footer ────────────────────────────────────────────────────────────

function CleanFooter({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="bg-purple-950 text-purple-300 pt-12 pb-16 border-t border-purple-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-purple-900/80">
          
          <div className="space-y-3">
            <div className="bg-white p-2 rounded-xl inline-block">
              <img src={logo} alt="La Centrale Crèche" className="h-9 w-auto" />
            </div>
            <p className="text-xs text-purple-300 leading-relaxed">
              Crèche et Halte-garderie à Casablanca depuis 2000. Programme type mission avec un corps pédagogique de plus de 35 ans d'expérience.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-1.5">
              <li><button onClick={() => { onNavigate("accueil"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Accueil</button></li>
              <li><button onClick={() => { onNavigate("services"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Nos Formules</button></li>
              <li><button onClick={() => { onNavigate("pedagogie"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Pédagogie & Âges</button></li>
              <li><button onClick={() => { onNavigate("journee"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Une Journée</button></li>
              <li><button onClick={() => { onNavigate("tarifs"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Inscriptions & Tarifs</button></li>
              <li><button onClick={() => { onNavigate("galerie"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Galerie</button></li>
              <li><button onClick={() => { onNavigate("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white cursor-pointer">Contact & Accès</button></li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-white uppercase tracking-wider">Contact</p>
            <p>125, rue Allal Ben Abdallah</p>
            <p>Face au Marché Central, Casablanca</p>
            <p>Tél : {PHONE_1}</p>
            <p>Gsm : {PHONE_2}</p>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-white uppercase tracking-wider">Horaires</p>
            <p className="text-white font-bold text-base font-heading">7h30 – 18h00</p>
            <p>Garde de 18h à 19h possible sur demande</p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-emerald-400 font-bold hover:underline"
            >
              Écrire sur WhatsApp →
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-400">
          <p>© {new Date().getFullYear()} La Centrale Crèche & Halte Garderie · Casablanca</p>
          <p>Normes de sécurité agréées · Personnel certifié premiers secours</p>
        </div>

      </div>
    </footer>
  );
}

// ─── Main Multi-Page Application ─────────────────────────────────────────────

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("accueil");
  const [visitModalOpen, setVisitModalOpen] = useState(false);

  useEffect(() => {
    document.title = "La Centrale Crèche";
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-purple-200 selection:text-purple-900 bg-[#FAF5FF]">
      {/* Background Animated Balloons & Subdued Toys */}
      <BackgroundDecorations />

      {/* Clean Top Header */}
      <GWAHeader
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenVisitModal={() => setVisitModalOpen(true)}
      />

      {/* Dedicated Page Content */}
      <main className="flex-1 relative z-10">
        {currentPage === "accueil" && (
          <PageAccueil
            onNavigate={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenVisitModal={() => setVisitModalOpen(true)}
          />
        )}
        {currentPage === "services" && <PageServices onOpenVisitModal={() => setVisitModalOpen(true)} />}
        {currentPage === "pedagogie" && <PagePedagogie onOpenVisitModal={() => setVisitModalOpen(true)} />}
        {currentPage === "journee" && <PageJournee onOpenVisitModal={() => setVisitModalOpen(true)} />}
        {currentPage === "tarifs" && <PageTarifs onOpenVisitModal={() => setVisitModalOpen(true)} />}
        {currentPage === "galerie" && <PageGalerie />}
        {currentPage === "contact" && <PageContact />}
      </main>

      {/* Footer */}
      <CleanFooter
        onNavigate={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Visit Modal */}
      <VisitModal isOpen={visitModalOpen} onClose={() => setVisitModalOpen(false)} />
    </div>
  );
}
