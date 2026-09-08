import { useState, useEffect } from "react";
import { NavLink, Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import logo from "@/imports/logo_creche_centrale.png";
import { SvgIcons } from "./icons";
import { useSite } from "@/context/SiteContext";
import {
  CRECHE_NAME,
  ADDRESS,
  PHONE_MOBILE,
  PHONE_LANDLINE,
  WHATSAPP_RAW,
  MAPS_URL,
  FACEBOOK_URL,
} from "@/data/business";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/vie-a-la-creche", label: "Vie à la crèche" },
  { to: "/inscription-tarifs", label: "Tarifs" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openRdv } = useSite();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-2.5 py-2 transition cursor-pointer whitespace-nowrap group ${
      isActive ? "text-[#301353]" : "text-[#5D4E72] hover:text-[#301353]"
    }`;

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2D144B] font-sans antialiased selection:bg-[#F3D7C6] selection:text-[#2D144B] flex flex-col">
      {/* ─── TOP ANNOUNCEMENT BAR ───────────────────────── */}
      <div className="bg-[#19042E] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2 font-medium text-slate-200 text-xs">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#F4B23E] animate-pulse shrink-0" />
            <span className="text-[#F4B23E] font-bold tracking-wide">Casablanca Centre-Ville :</span>
            <span className="text-slate-300 hidden sm:inline">
              Inscriptions ouvertes 2026–2027 • Accueil de 3 mois à 5 ans • Face au Marché Central
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs shrink-0">
            <a
              href={`tel:${PHONE_MOBILE.replace(/\s/g, "")}`}
              className="flex items-center space-x-1.5 text-slate-200 hover:text-[#F4B23E] transition font-semibold"
            >
              <SvgIcons.Phone className="w-3.5 h-3.5 text-[#F4B23E]" />
              <span>{PHONE_MOBILE}</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href={`https://wa.me/${WHATSAPP_RAW}?text=Bonjour%20La%20Centrale%20Cr%C3%A8che,%20je%20souhaite%20des%20informations%20sur%20les%20inscriptions.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition font-bold"
            >
              <SvgIcons.WhatsApp className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION HEADER ───────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b-2 border-[#301353]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0">
            <div className="relative p-1 rounded-full bg-white border-2 border-[#301353] shadow-[3px_3px_0px_0px_#301353] group-hover:shadow-[1px_1px_0px_0px_#301353] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-200 flex items-center justify-center shrink-0">
              <img
                src={logo}
                alt="La Centrale Crèche Casablanca Logo"
                className="h-9 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif-heading font-bold text-base sm:text-lg lg:text-xl text-[#301353] leading-tight tracking-tight">
                La Centrale <span className="italic text-[#C86446]">Crèche</span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.15em] text-[#736387] whitespace-nowrap">
                Halte Garderie · Casablanca
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 text-[13px] font-bold">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute left-2.5 right-2.5 -bottom-0.5 h-[2.5px] rounded-full bg-[#C86446] transition-transform origin-left ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              onClick={() => openRdv("Prendre rendez-vous pour visiter La Centrale Crèche")}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full border-2 border-[#301353] text-xs font-bold text-[#301353] hover:bg-[#301353] hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              <SvgIcons.Calendar className="w-3.5 h-3.5" />
              <span>Prendre RDV</span>
            </button>

            <button
              onClick={() => navigate("/inscription-tarifs")}
              className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#C86446] text-white text-xs font-bold shadow-[3px_3px_0px_0px_#301353] hover:shadow-[1px_1px_0px_0px_#301353] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 cursor-pointer whitespace-nowrap"
            >
              Demander une place
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-xl text-[#301353] hover:bg-[#301353]/10 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <SvgIcons.Close className="w-5 h-5 sm:w-6 sm:h-6" /> : <SvgIcons.Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF6F0] border-b-2 border-[#301353] px-6 py-5 space-y-1 shadow-xl">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block w-full text-left text-sm font-bold py-2.5 border-b border-[#E2D7C8] last:border-0 ${isActive ? "text-[#C86446]" : "text-[#301353]"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => openRdv("Prendre rendez-vous")}
                className="w-full py-2.5 text-center text-xs font-bold rounded-full border-2 border-[#301353] text-[#301353]"
              >
                Prendre RDV
              </button>
              <button
                onClick={() => navigate("/inscription-tarifs")}
                className="w-full py-2.5 text-center text-xs font-bold rounded-full bg-[#C86446] text-white"
              >
                Demander une place
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ─── FOOTER ───────────────────────────────── */}
      <footer className="w-full bg-[#19042E] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.1fr_0.8fr_0.8fr] gap-x-8 gap-y-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="La Centrale Crèche Casablanca" className="h-9 w-auto object-contain" />
                <div>
                  <div className="font-serif-heading font-bold text-lg text-white leading-tight">
                    La Centrale <span className="italic text-[#F4B23E]">Crèche</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    Halte Garderie · Casablanca
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Accueil et éveil bienveillant pour les enfants de 3 mois à 5 ans au centre-ville de Casablanca.
                Pédagogie active, repas bio faits maison et équipe expérimentée depuis plus de 35 ans.
              </p>
              <p className="text-[11px] text-slate-500">
                Agrément officiel · Cuisine 100% bio · +35 ans d'expérience
              </p>
            </div>

            {/* Horaires & contact */}
            <div className="space-y-3">
              <div className="font-serif-heading font-semibold text-sm text-white">Horaires & contact</div>
              <div>
                <div className="text-xs text-slate-500">Lundi – Vendredi</div>
                <div className="font-bold text-white text-sm">7h30 – 18h00 <span className="text-slate-500 font-normal text-xs">(garde jusqu'à 19h)</span></div>
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {ADDRESS}
                <br />
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-[#F4B23E] hover:underline">
                  Voir l'itinéraire
                </a>
              </div>
              <div className="text-xs pt-1 space-y-1.5">
                <a
                  href={`tel:${PHONE_MOBILE.replace(/\s/g, "")}`}
                  className="block font-bold text-white hover:text-[#F4B23E] transition"
                >
                  {PHONE_MOBILE} <span className="text-slate-500 font-normal">/ {PHONE_LANDLINE}</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_RAW}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block font-semibold text-emerald-400 hover:text-emerald-300 transition"
                >
                  WhatsApp direct
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <div className="font-serif-heading font-semibold text-sm text-white">Navigation</div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li><Link to="/a-propos" className="hover:text-white transition">À propos</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Nos Services</Link></li>
                <li><Link to="/vie-a-la-creche" className="hover:text-white transition">Vie à la crèche</Link></li>
                <li><Link to="/inscription-tarifs" className="hover:text-white transition">Inscription & Tarifs</Link></li>
                <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link to="/recrutement" className="hover:text-white transition">Recrutement</Link></li>
                <li><Link to="/espace-parents" className="hover:text-white transition">Espace Parents</Link></li>
                <li>
                  <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-white transition">
                    Page Facebook
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact rapide */}
            <div className="space-y-3">
              <div className="font-serif-heading font-semibold text-sm text-white">Contact rapide</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Une question ? Contactez directement la direction.
              </p>
              <button
                onClick={() => openRdv("Demande de place & Visite")}
                className="inline-flex items-center text-xs font-bold text-[#F4B23E] hover:text-[#EAA43A] transition cursor-pointer group"
              >
                <span>Prendre rendez-vous</span>
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </button>
              <div>
                <Link to="/admin" className="text-[11px] text-slate-500 hover:text-slate-300 transition">
                  Espace Gestionnaire
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div>© 2026 {CRECHE_NAME}. Tous droits réservés. Casablanca, Maroc.</div>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="hover:text-slate-300 transition">
              125 Rue Allal Ben Abdallah, Casablanca
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
