import React, { useState, useEffect, useMemo } from "react";
import { LeadRecord, LeadType, leadsDb } from "../lib/leadsDb";

interface AdminDashboardProps {
  onBackToSite: () => void;
  logoSrc?: string;
}

export default function AdminDashboard({ onBackToSite, logoSrc }: AdminDashboardProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(() => leadsDb.getLeads());
  const [activeTab, setActiveTab] = useState<"inscriptions" | "visites" | "abonnes">("inscriptions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Form state for creating a new manual daycare entry
  const [newLeadForm, setNewLeadForm] = useState({
    parentName: "",
    childAge: "",
    email: "",
    phone: "",
    type: "CRÈCHE" as LeadType,
    sector: "MARCHÉ CENTRAL",
    solutions: "Temps plein continu (7h30–18h), Cuisine bio maison, Motricité libre",
    formula: "Temps plein continu",
    startDate: "Immédiat",
    message: "",
  });

  // Listen to live database updates
  useEffect(() => {
    const handleDbUpdate = () => {
      setLeads(leadsDb.getLeads());
    };

    window.addEventListener("lacentrale_db_updated", handleDbUpdate);
    window.addEventListener("storage", handleDbUpdate);

    return () => {
      window.removeEventListener("lacentrale_db_updated", handleDbUpdate);
      window.removeEventListener("storage", handleDbUpdate);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3200);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Supprimer définitivement le dossier de "${name}" ?`)) {
      leadsDb.deleteLead(id);
      triggerToast(`Dossier "${name}" retiré de la base.`);
      if (selectedLead?.id === id) setSelectedLead(null);
    }
  };

  const handleCreateNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.parentName.trim() || !newLeadForm.phone.trim()) {
      alert("Veuillez renseigner le nom du parent et un numéro de téléphone joignable.");
      return;
    }

    const solutionsArray = newLeadForm.solutions
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    leadsDb.addLead({
      parentName: newLeadForm.parentName.trim(),
      childAge: newLeadForm.childAge.trim() || "Enfant (Section à définir)",
      email: newLeadForm.email.trim(),
      phone: newLeadForm.phone.trim(),
      type: newLeadForm.type,
      sector: newLeadForm.sector,
      solutions: solutionsArray.length > 0 ? solutionsArray : ["Accueil Standard"],
      formula: newLeadForm.formula,
      startDate: newLeadForm.startDate,
      message: newLeadForm.message.trim(),
      status: "Nouveau",
      source: "Admin Direct",
    });

    setIsNewLeadModalOpen(false);
    triggerToast("Dossier d'inscription enregistré avec succès !");
    setNewLeadForm({
      parentName: "",
      childAge: "",
      email: "",
      phone: "",
      type: "CRÈCHE",
      sector: "MARCHÉ CENTRAL",
      solutions: "Temps plein continu (7h30–18h), Cuisine bio maison, Motricité libre",
      formula: "Temps plein continu",
      startDate: "Immédiat",
      message: "",
    });
  };

  // Tab counts
  const countInscriptions = leads.filter((l) => l.type !== "NEWSLETTER").length;
  const countVisites = leads.filter(
    (l) => l.type === "VISITE" || l.source === "Formulaire Hero" || l.status === "Visite programmée"
  ).length;
  const countAbonnes = leads.filter(
    (l) => l.type === "NEWSLETTER" || l.source === "Newsletter"
  ).length;

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    let result = leads;

    if (activeTab === "inscriptions") {
      result = result.filter((l) => l.type !== "NEWSLETTER");
    } else if (activeTab === "visites") {
      result = result.filter(
        (l) => l.type === "VISITE" || l.source === "Formulaire Hero" || l.status === "Visite programmée"
      );
    } else if (activeTab === "abonnes") {
      result = result.filter((l) => l.type === "NEWSLETTER" || l.source === "Newsletter");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.parentName.toLowerCase().includes(q) ||
          (l.childAge && l.childAge.toLowerCase().includes(q)) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          l.phone.includes(q) ||
          (l.sector && l.sector.toLowerCase().includes(q)) ||
          (l.message && l.message.toLowerCase().includes(q)) ||
          l.solutions.some((s) => s.toLowerCase().includes(q))
      );
    }

    return result;
  }, [leads, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#301353] font-sans antialiased selection:bg-[#C86446] selection:text-white flex flex-col">
      {/* ─── TOAST NOTIFICATION ────────────────────────────────────────────── */}
      {actionToast && (
        <div className="fixed top-6 right-6 z-60 bg-[#301353] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs font-semibold border border-white/20 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C86446] animate-pulse"></span>
          <span>{actionToast}</span>
        </div>
      )}

      {/* ─── OFFICIAL WEBSITE STYLED HEADER BAR ─────────────────────────────── */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#ECE5DA] px-6 sm:px-10 py-5 sticky top-0 z-40 shadow-xs">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-5">
          {/* Brand Identity with Noticeably Larger Logo */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="p-2 rounded-2xl bg-white border border-[#E8DFC9] shadow-sm flex items-center justify-center shrink-0">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="La Centrale Crèche"
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              ) : (
                <span className="font-serif-heading font-black text-[#301353] text-2xl">LC</span>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <span className="font-serif-heading font-bold text-[#301353] text-2xl sm:text-3xl tracking-tight">
                  La Centrale Crèche
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E8DFC9] text-[#C86446] text-[11px] font-bold uppercase tracking-wider hidden sm:inline-block">
                  Direction Casablanca
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-[#736387] font-medium mt-0.5">
                Panneau de gestion & admissions • 125, Rue Allal Ben Abdallah (Marché Central)
              </p>
            </div>
          </div>

          {/* Right Live Indicator & Exit Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FAF6F0] border border-[#E8DFC9] text-[#4A3B5E] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C86446]"></span>
              <span>Base en direct</span>
            </div>

            {/* Exit Button Styled with Official Aesthetic */}
            <button
              onClick={onBackToSite}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF6F0] border border-[#D9C8B5] text-[#301353] hover:border-[#301353] transition cursor-pointer text-xs sm:text-sm font-bold tracking-wide shadow-xs"
              title="Quitter et revenir au site public"
            >
              <svg className="w-4 h-4 text-[#C86446]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour au site public</span>
            </button>
          </div>
        </div>

        {/* ─── BIGGER & PROMINENT TOP TABS ─────────────────────────────────── */}
        <div className="max-w-[1700px] mx-auto mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
          {/* Tab 1 */}
          <button
            onClick={() => setActiveTab("inscriptions")}
            className={`flex items-center space-x-3 px-5 sm:px-6 py-3 rounded-2xl text-sm sm:text-[15px] font-bold transition cursor-pointer whitespace-nowrap shadow-xs ${
              activeTab === "inscriptions"
                ? "bg-[#301353] text-white shadow-md shadow-[#301353]/25 ring-2 ring-[#301353]/30"
                : "bg-[#FAF6F0] text-[#4A3B5E] hover:bg-[#F3EDE2] hover:text-[#301353] border border-[#E8DFC9]"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Demandes d'inscription</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                activeTab === "inscriptions" ? "bg-[#C86446] text-white" : "bg-[#E8DFC9] text-[#301353]"
              }`}
            >
              {countInscriptions}
            </span>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => setActiveTab("visites")}
            className={`flex items-center space-x-3 px-5 sm:px-6 py-3 rounded-2xl text-sm sm:text-[15px] font-bold transition cursor-pointer whitespace-nowrap shadow-xs ${
              activeTab === "visites"
                ? "bg-[#301353] text-white shadow-md shadow-[#301353]/25 ring-2 ring-[#301353]/30"
                : "bg-[#FAF6F0] text-[#4A3B5E] hover:bg-[#F3EDE2] hover:text-[#301353] border border-[#E8DFC9]"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Visites & Rendez-vous</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                activeTab === "visites" ? "bg-[#C86446] text-white" : "bg-[#E8DFC9] text-[#301353]"
              }`}
            >
              {countVisites}
            </span>
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => setActiveTab("abonnes")}
            className={`flex items-center space-x-3 px-5 sm:px-6 py-3 rounded-2xl text-sm sm:text-[15px] font-bold transition cursor-pointer whitespace-nowrap shadow-xs ${
              activeTab === "abonnes"
                ? "bg-[#301353] text-white shadow-md shadow-[#301353]/25 ring-2 ring-[#301353]/30"
                : "bg-[#FAF6F0] text-[#4A3B5E] hover:bg-[#F3EDE2] hover:text-[#301353] border border-[#E8DFC9]"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Abonnés au Journal</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                activeTab === "abonnes" ? "bg-[#C86446] text-white" : "bg-[#E8DFC9] text-[#301353]"
              }`}
            >
              {countAbonnes}
            </span>
          </button>
        </div>
      </header>

      {/* ─── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 sm:p-7 space-y-4">
        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-[#ECE5DA] shadow-sm overflow-hidden flex flex-col">
          {/* Controls Bar (Search & Action Buttons, Status Filter Fully Removed) */}
          <div className="p-4 sm:px-7 py-4 border-b border-[#ECE5DA] bg-[#FAF8F5] flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par nom, téléphone, enfant, quartier..."
                  className="w-full bg-white border border-[#DCD4C7] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-[#301353] placeholder:text-[#736387]/70 focus:outline-none focus:ring-2 focus:ring-[#C86446]/40 focus:border-[#C86446] shadow-2xs"
                />
                <svg
                  className="w-4 h-4 text-[#736387] absolute left-3 top-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2.5 shrink-0">
              <button
                onClick={() => setIsNewLeadModalOpen(true)}
                className="px-4.5 py-2.5 rounded-xl bg-[#C86446] hover:bg-[#B55539] text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <span className="text-sm font-black">+</span>
                <span>Nouvelle Inscription</span>
              </button>

              <button
                onClick={() => leadsDb.exportToCSV(filteredLeads)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF6F0] border border-[#DCD4C7] text-[#301353] text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                title="Exporter au format Excel / CSV"
              >
                <svg className="w-3.5 h-3.5 text-[#736387]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Exporter</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Réinitialiser avec les dossiers de démonstration ?")) {
                    leadsDb.resetToDemo();
                    triggerToast("Dossiers réinitialisés.");
                  }
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-[#FAF6F0] border border-[#DCD4C7] text-[#736387] hover:text-[#301353] transition cursor-pointer shadow-2xs"
                title="Actualiser les données"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>

          {/* Table Container (Statut Column Fully Removed) */}
          <div className="w-full overflow-x-auto">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-20 text-[#736387] bg-white">
                <div className="w-12 h-12 rounded-full bg-[#FAF6F0] mx-auto flex items-center justify-center text-[#736387] mb-2.5 border border-[#ECE5DA]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-[#301353]">Aucun dossier trouvé.</p>
                <p className="text-xs text-[#736387] mt-1">
                  Les demandes envoyées depuis le site s'afficheront automatiquement ici.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse min-w-[950px]">
                <thead>
                  <tr className="border-b border-[#ECE5DA] text-[11px] font-bold text-[#736387] uppercase tracking-wider bg-[#F9F7F4]">
                    <th className="py-3.5 px-4 w-[120px]">Date</th>
                    <th className="py-3.5 px-4 w-[220px]">Parent & Contact</th>
                    <th className="py-3.5 px-4 w-[180px]">Enfant & Section</th>
                    <th className="py-3.5 px-4 min-w-[240px]">Formule & Options</th>
                    <th className="py-3.5 px-4 w-[140px]">Zone</th>
                    <th className="py-3.5 px-4 min-w-[150px]">Remarques</th>
                    <th className="py-3.5 px-4 w-[150px] text-right sticky right-0 bg-[#F9F7F4] shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.03)]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE4] bg-white">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#FAF8F5] transition duration-100 group">
                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[#736387] font-mono text-[11px]">
                        <div className="font-semibold text-[#301353]">{lead.createdAt.split(" ")[0]}</div>
                        <div className="text-[10.5px] text-[#736387]">{lead.createdAt.split(" ")[1]}</div>
                      </td>

                      {/* Parent & Contact */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#301353] text-[12.5px] leading-tight">
                          {lead.parentName}
                        </div>
                        <div className="mt-0.5 flex items-center space-x-2 text-[11px]">
                          <a
                            href={`tel:${lead.phone.replace(/\s/g, "")}`}
                            className="text-[#C86446] hover:underline font-bold"
                          >
                            {lead.phone}
                          </a>
                          {lead.email && (
                            <span className="text-[#736387] truncate max-w-[120px]" title={lead.email}>
                              • {lead.email}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Child & Section */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#301353] text-[12px]">
                          {lead.childAge ? lead.childAge.split("•")[0].trim() : "—"}
                        </div>
                        {lead.childAge && lead.childAge.includes("•") && (
                          <div className="text-[11px] text-[#736387] font-medium mt-0.5">
                            {lead.childAge.split("•")[1].trim()}
                          </div>
                        )}
                      </td>

                      {/* Formulas & Options */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[280px]">
                          {lead.solutions && lead.solutions.length > 0 ? (
                            lead.solutions.map((sol, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-2.5 py-0.5 rounded-lg bg-[#FAF6F0] text-[#7A4030] text-[10px] font-semibold border border-[#E8DEC8]"
                              >
                                {sol}
                              </span>
                            ))
                          ) : (
                            <span className="text-[#736387] text-[10.5px]">Accueil Standard</span>
                          )}
                        </div>
                      </td>

                      {/* Sector */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-[#FAF6F0] text-[#301353] text-[10.5px] font-bold border border-[#E8DEC8]">
                          {lead.sector || "Marché Central"}
                        </span>
                      </td>

                      {/* Notes / Message */}
                      <td className="py-3.5 px-4 text-[#736387] text-[11px] max-w-[160px] truncate" title={lead.message}>
                        {lead.message || "—"}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap sticky right-0 bg-white group-hover:bg-[#FAF8F5] transition shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-2.5 py-1 rounded-lg bg-[#FAF6F0] hover:bg-[#F3EDE2] text-[#301353] border border-[#E8DFC9] text-[11px] font-bold transition cursor-pointer"
                            title="Ouvrir la fiche complète"
                          >
                            Fiche
                          </button>

                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(lead.parentName)},%20ici%20la%20direction%20de%20La%20Centrale%20Cr%C3%A8che%20Casablanca.`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                            title="Contacter par WhatsApp"
                          >
                            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.28 4.95L2 22l5.22-1.37A9.95 9.95 0 0012.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.82 14.22c-.24.68-1.2 1.25-1.78 1.3-.54.05-1.25.07-3.6-1.02-3-1.4-4.94-4.45-5.09-4.65-.15-.2-1.2-1.6-1.2-3.05s.76-2.16 1.03-2.45c.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.18.01.43-.07.67.51.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.78.84 2.16 1.53.28.14.47.21.54.32.07.11.07.64-.17 1.32z" />
                            </svg>
                          </a>

                          <button
                            onClick={() => handleDelete(lead.id, lead.parentName)}
                            className="p-1.5 rounded-lg text-[#736387] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Supprimer définitivement"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer Ribbon */}
          <div className="p-4 bg-[#FAF8F5] border-t border-[#ECE5DA] flex items-center justify-between text-xs text-[#736387]">
            <div>
              Affichage de <strong>{filteredLeads.length}</strong> dossiers sur <strong>{leads.length}</strong> au total
            </div>
            <div className="text-[11px] text-[#736387]">
              Mise à jour en direct • La Centrale Crèche Casablanca
            </div>
          </div>
        </div>
      </main>

      {/* ─── MODAL : LEAD INSPECTION DRAWER ─────────────────────────────────── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#ECE5DA] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#ECE5DA] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-[#FAF6F0] text-[#7A4030] border border-[#E8DEC8]">
                  {selectedLead.type}
                </span>
                <h3 className="font-serif-heading font-bold text-xl text-[#301353] mt-1.5">
                  {selectedLead.parentName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-[#FAF6F0] hover:bg-[#F3EDE2] text-[#301353] border border-[#E8DEC8] flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE5DA]">
                <div className="text-[#736387] text-[10px] uppercase font-bold">Téléphone</div>
                <div className="font-bold text-[#301353] mt-0.5">{selectedLead.phone}</div>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE5DA]">
                <div className="text-[#736387] text-[10px] uppercase font-bold">Email</div>
                <div className="font-bold text-[#301353] mt-0.5 truncate">{selectedLead.email || "Non communiqué"}</div>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE5DA]">
                <div className="text-[#736387] text-[10px] uppercase font-bold">Enfant & Section</div>
                <div className="font-bold text-[#301353] mt-0.5">{selectedLead.childAge || "—"}</div>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#ECE5DA]">
                <div className="text-[#736387] text-[10px] uppercase font-bold">Quartier</div>
                <div className="font-bold text-[#301353] mt-0.5">{selectedLead.sector || "Marché Central"}</div>
              </div>
            </div>

            {/* Options */}
            <div>
              <div className="text-[#736387] text-[10px] uppercase font-bold mb-1.5">Formules & Besoins :</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedLead.solutions?.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF6F0] text-[#7A4030] text-[11px] font-semibold border border-[#E8DEC8]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Parent Note */}
            <div>
              <div className="text-[#736387] text-[10px] uppercase font-bold mb-1">Message du parent :</div>
              <p className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#ECE5DA] text-xs text-[#301353] italic leading-relaxed">
                {selectedLead.message || "Aucune précision spécifique transmise."}
              </p>
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-[#ECE5DA] flex items-center justify-between">
              <span className="text-[11px] text-[#736387] font-medium">
                Enregistré le {selectedLead.createdAt}
              </span>

              <div className="flex items-center space-x-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(selectedLead.parentName)},%20ici%20la%20direction%20de%20La%20Centrale%20Cr%C3%A8che%20Casablanca.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.28 4.95L2 22l5.22-1.37A9.95 9.95 0 0012.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.82 14.22c-.24.68-1.2 1.25-1.78 1.3-.54.05-1.25.07-3.6-1.02-3-1.4-4.94-4.45-5.09-4.65-.15-.2-1.2-1.6-1.2-3.05s.76-2.16 1.03-2.45c.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.18.01.43-.07.67.51.24.58.82 2.01.89 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.31.4-.44.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.78.84 2.16 1.53.28.14.47.21.54.32.07.11.07.64-.17 1.32z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#301353] hover:bg-[#230C3E] text-white text-xs font-bold cursor-pointer transition shadow-xs"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL : NEW ADMISSION ENTRY ──────────────────────────────────── */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#ECE5DA] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ECE5DA] pb-3">
              <h3 className="font-serif-heading font-bold text-lg text-[#301353]">
                Enregistrer un dossier d'inscription
              </h3>
              <button
                onClick={() => setIsNewLeadModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#FAF6F0] hover:bg-[#F3EDE2] text-[#301353] border border-[#E8DEC8] flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                    Nom du parent *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Leila Bennani"
                    value={newLeadForm.parentName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, parentName: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] font-medium focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06 61 00 00 00"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] font-medium focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="parent@gmail.com"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                    Prénom & Âge de l'enfant *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Lina (15 mois)"
                    value={newLeadForm.childAge}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, childAge: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] font-medium focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                    Section / Type
                  </label>
                  <select
                    value={newLeadForm.type}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, type: e.target.value as LeadType })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] font-medium focus:outline-none"
                  >
                    <option value="CRÈCHE">Crèche (3 mois – 4 ans)</option>
                    <option value="VISITE">Visite & Rendez-vous</option>
                    <option value="HALTE-GARDERIE">Halte-Garderie & Mercredis</option>
                    <option value="NEWSLETTER">Journal des Petits Pas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                    Quartier Casablanca
                  </label>
                  <select
                    value={newLeadForm.sector}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, sector: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] font-medium focus:outline-none"
                  >
                    <option value="MARCHÉ CENTRAL">Marché Central</option>
                    <option value="CENTRE-VILLE">Centre-Ville</option>
                    <option value="BD MOHAMMED V">Bd Mohammed V</option>
                    <option value="GAUTHIER">Gauthier</option>
                    <option value="MAÂRIF">Maârif</option>
                    <option value="SIDI BELYOUT">Sidi Belyout</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                  Formules & Options (séparées par des virgules)
                </label>
                <input
                  type="text"
                  placeholder="Temps plein (7h30–18h), Cuisine bio maison, Motricité libre"
                  value={newLeadForm.solutions}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, solutions: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#4A3B5E] mb-1">
                  Remarques particulières
                </label>
                <textarea
                  rows={2}
                  placeholder="Date de début souhaitée, allergies ou besoins particuliers..."
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#DCD4C7] rounded-xl px-3 py-2 text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#C86446]"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-[#ECE5DA] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3EDE2] text-[#4A3B5E] font-bold border border-[#E8DEC8] cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C86446] hover:bg-[#B55539] text-white font-bold cursor-pointer shadow-sm"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
