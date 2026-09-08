// ─── Database & Reactive Storage Engine for La Centrale Crèche ───────────────

export type LeadType = "CRÈCHE" | "HALTE-GARDERIE" | "VISITE" | "NEWSLETTER";
export type LeadStatus = "Nouveau" | "Contacté" | "Visite programmée" | "Inscrit" | "Archivé";

export interface LeadRecord {
  id: string;
  createdAt: string;
  type: LeadType;
  parentName: string;
  childAge: string; // e.g. "Inès (18 mois) • Section Moyens"
  email: string;
  phone: string;
  solutions: string[]; // e.g. ["TEMPS PLEIN (7H30 - 18H)", "REPAS BIO MITONNÉ", "MOTRICITÉ LIBRE"]
  sector: string; // Casablanca neighborhood: "MARCHÉ CENTRAL", "CENTRE-VILLE", "BD MOHAMMED V", "GAUTHIER", "MAÂRIF"
  message?: string;
  status: LeadStatus;
  source:
    | "Formulaire Visite"
    | "Formulaire Hero"
    | "Modal Devis"
    | "Newsletter"
    | "Admin Direct"
    | "Inscription Rapide"
    | "Formulaire Contact"
    | "Formulaire Inscription";
  formula?: string;
  startDate?: string;
  notes?: string;
}

const STORAGE_KEY = "lacentrale_creche_leads_db_v3";

const INITIAL_DAYCARE_LEADS: LeadRecord[] = [
  {
    id: "lead-101",
    createdAt: "04/09/2026 19:13",
    type: "CRÈCHE",
    parentName: "Salma & Tariq Alami",
    childAge: "Inès (18 mois) • Section Moyens",
    email: "salma.alami@yahoo.fr",
    phone: "+212661433046",
    solutions: [
      "TEMPS PLEIN (7H30 - 18H)",
      "REPAS BIO MITONNÉS SUR PLACE",
      "ÉVEIL BILINGUE FRANÇAIS & ARABE",
    ],
    sector: "MARCHÉ CENTRAL",
    message: "Recherche une place immédiate. Nous habitons à 150m de la crèche face au Marché Central.",
    status: "Nouveau",
    source: "Formulaire Visite",
    formula: "Temps plein continu",
    startDate: "Immédiat",
    notes: "Visite souhaitée cette semaine avec la directrice Mme Nadia.",
  },
  {
    id: "lead-102",
    createdAt: "03/09/2026 14:29",
    type: "VISITE",
    parentName: "Meryem Benjelloun",
    childAge: "Yanis (8 mois) • Section Bébés",
    email: "meryem.benjelloun@gmail.com",
    phone: "+212662889900",
    solutions: [
      "SECTION NOURRISSONS (3-12 MOIS)",
      "MOTRICITÉ LIBRE & MONTESSORI",
      "ATELIERS SENSORIELS",
    ],
    sector: "CENTRE-VILLE / BD MOHAMMED V",
    message: "Première rentrée en crèche. Visite des installations et échange avec l'auxiliaire de puériculture.",
    status: "Visite programmée",
    source: "Formulaire Hero",
    formula: "1/2 Journée (Matinée + Repas)",
    startDate: "Octobre 2026",
    notes: "Visite confirmée pour mardi à 10h30.",
  },
  {
    id: "lead-103",
    createdAt: "02/09/2026 21:49",
    type: "CRÈCHE",
    parentName: "Kenza & Mehdi Tazi",
    childAge: "Adam (2 ans et demi) • Section Grands",
    email: "kenza.tazi@outlook.com",
    phone: "+212661672383",
    solutions: [
      "TEMPS PLEIN (7H30 - 18H)",
      "SOUTIEN SCOLAIRE & PRÉ-MATERNELLE",
      "REPAS BIO FRAIS CHAQUE MATIN",
    ],
    sector: "MARCHÉ CENTRAL",
    message: "Préparation pour l'entrée en maternelle type mission française. Besoin de garde jusqu'à 18h30.",
    status: "Contacté",
    source: "Modal Devis",
    formula: "Garde continue + Soutien scolaire",
    startDate: "Rentrée Septembre",
    notes: "Dossier de pré-inscription envoyé par email et WhatsApp.",
  },
  {
    id: "lead-104",
    createdAt: "01/09/2026 11:15",
    type: "HALTE-GARDERIE",
    parentName: "Driss Mansouri",
    childAge: "Nour (11 mois) • Section Bébés",
    email: "d.mansouri@gmail.com",
    phone: "+212663991122",
    solutions: [
      "HALTE-GARDERIE DU MERCREDI",
      "GARDE OCCASIONNELLE FLEXIBLE",
      "REPAS & GOÛTER BIO",
    ],
    sector: "GAUTHIER / MAÂRIF",
    message: "Besoin de garde pour 2 journées fixes par semaine (mercredi et vendredi).",
    status: "Nouveau",
    source: "Formulaire Visite",
    formula: "Halte-Garderie 2 jours/semaine",
    startDate: "Septembre 2026",
  },
  {
    id: "lead-105",
    createdAt: "31/08/2026 16:04",
    type: "NEWSLETTER",
    parentName: "Amina Chraibi",
    childAge: "Bébé attendu (Rentrée 2027)",
    email: "amina.chraibi@outlook.com",
    phone: "+212661224466",
    solutions: [
      "LE JOURNAL DES PETITS PAS",
      "CONSEILS ÉVEIL & NUTRITION BIO",
    ],
    sector: "CENTRE-VILLE",
    message: "Abonnement à la lettre d'information pédagogique et guide parentalité.",
    status: "Inscrit",
    source: "Newsletter",
  },
];

// Helper: Format current date like "04/09/2026 19:13"
export function formatNow(): string {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const leadsDb = {
  getLeads(): LeadRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    // Seed initial demo data
    this.saveLeads(INITIAL_DAYCARE_LEADS);
    return INITIAL_DAYCARE_LEADS;
  },

  saveLeads(leads: LeadRecord[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
      window.dispatchEvent(new CustomEvent("lacentrale_db_updated", { detail: leads }));
    } catch (e) {
      console.error("Failed to save leads in localStorage", e);
    }
  },

  addLead(newLead: Omit<LeadRecord, "id" | "createdAt" | "status"> & { status?: LeadStatus }): LeadRecord {
    const leads = this.getLeads();
    const record: LeadRecord = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: formatNow(),
      status: newLead.status || "Nouveau",
      ...newLead,
    };
    const updated = [record, ...leads];
    this.saveLeads(updated);
    return record;
  },

  updateLead(id: string, updates: Partial<LeadRecord>): LeadRecord | null {
    const leads = this.getLeads();
    let updatedRecord: LeadRecord | null = null;
    const updated = leads.map((l) => {
      if (l.id === id) {
        updatedRecord = { ...l, ...updates };
        return updatedRecord;
      }
      return l;
    });
    this.saveLeads(updated);
    return updatedRecord;
  },

  deleteLead(id: string): boolean {
    const leads = this.getLeads();
    const filtered = leads.filter((l) => l.id !== id);
    this.saveLeads(filtered);
    return filtered.length !== leads.length;
  },

  resetToDemo(): LeadRecord[] {
    this.saveLeads(INITIAL_DAYCARE_LEADS);
    return INITIAL_DAYCARE_LEADS;
  },

  exportToCSV(leads: LeadRecord[]) {
    const headers = [
      "ID",
      "Date",
      "Type",
      "Parent",
      "Enfant & Section",
      "Email",
      "Téléphone",
      "Formules & Options",
      "Quartier Casablanca",
      "Statut",
      "Formule Choisie",
      "Date Rentrée Souhaitée",
      "Message du Parent",
      "Notes Direction",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.createdAt}"`,
      `"${l.type}"`,
      `"${(l.parentName || "").replace(/"/g, '""')}"`,
      `"${(l.childAge || "").replace(/"/g, '""')}"`,
      `"${l.email || ""}"`,
      `"${l.phone || ""}"`,
      `"${(l.solutions || []).join(" | ")}"`,
      `"${l.sector || ""}"`,
      `"${l.status}"`,
      `"${l.formula || ""}"`,
      `"${l.startDate || ""}"`,
      `"${(l.message || "").replace(/"/g, '""')}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `LaCentraleCreche_Demandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
