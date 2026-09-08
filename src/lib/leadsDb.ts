// ─── Leads API client for La Centrale Crèche ──────────────────────────────
// Every form on the public site posts here, and the admin dashboard reads
// from the same backend — so submissions from any visitor, on any device,
// show up live in /admin.

import { apiFetch } from "./api";

export type LeadType = "CRÈCHE" | "HALTE-GARDERIE" | "VISITE" | "NEWSLETTER" | "RECRUTEMENT";
export type LeadStatus = "Nouveau" | "Contacté" | "Visite programmée" | "Inscrit" | "Archivé";

export interface LeadRecord {
  id: string;
  createdAt: string;
  type: LeadType;
  parentName: string;
  childAge: string;
  email: string;
  phone: string;
  solutions: string[];
  sector: string;
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
    | "Formulaire Inscription"
    | "Formulaire Recrutement"
    | "Espace Parents";
  formula?: string;
  startDate?: string;
  notes?: string;
}

export const leadsDb = {
  async getLeads(): Promise<LeadRecord[]> {
    const data = await apiFetch<{ leads: LeadRecord[] }>("/leads");
    return data.leads;
  },

  async addLead(newLead: Omit<LeadRecord, "id" | "createdAt" | "status"> & { status?: LeadStatus }): Promise<LeadRecord> {
    const data = await apiFetch<{ lead: LeadRecord }>("/leads", {
      method: "POST",
      body: JSON.stringify(newLead),
    });
    return data.lead;
  },

  async updateLead(id: string, updates: Partial<LeadRecord>): Promise<LeadRecord> {
    const data = await apiFetch<{ lead: LeadRecord }>(`/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return data.lead;
  },

  async deleteLead(id: string): Promise<boolean> {
    await apiFetch<{ ok: true }>(`/leads/${id}`, { method: "DELETE" });
    return true;
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

    const csvContent = "﻿" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
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
