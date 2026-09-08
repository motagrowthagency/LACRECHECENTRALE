import { useState } from "react";
import { SvgIcons } from "@/components/icons";
import Photo from "@/components/Photo";
import facade from "@/imports/photos/creche-facade.jpeg";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { useSite } from "@/context/SiteContext";
import { leadsDb } from "@/lib/leadsDb";
import { ADDRESS, PHONE_MOBILE, PHONE_LANDLINE, WHATSAPP_RAW, EMAIL_CONTACT, MAPS_URL } from "@/data/business";

export default function Contact() {
  const { showToast, openRdv } = useSite();
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    childAge: "",
    accueil: "Crèche régulière",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.parentName.trim() || !form.phone.trim()) {
      showToast("Veuillez renseigner votre nom et votre numéro de téléphone.");
      return;
    }

    try {
      await leadsDb.addLead({
        parentName: form.parentName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        childAge: form.childAge || "Non précisé",
        type: "VISITE",
        solutions: [form.accueil.toUpperCase()],
        sector: "MARCHÉ CENTRAL",
        formula: form.accueil,
        startDate: "À définir",
        message: form.message || "Demande envoyée depuis le formulaire de contact.",
        source: "Formulaire Contact",
        status: "Nouveau",
      });
    } catch {
      showToast("Une erreur est survenue. Merci de réessayer ou de nous contacter par téléphone.");
      return;
    }

    showToast("Votre message a bien été envoyé à la direction !");
    setForm({ parentName: "", email: "", phone: "", childAge: "", accueil: "Crèche régulière", message: "" });
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -right-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">Contact</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            Contactez-<span className="italic text-[#F4B23E] font-medium">nous</span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Une question, une visite à planifier ? Notre équipe vous répond avec plaisir.
          </p>
        </div>
      </section>

      {/* ─── COORDONNÉES + FORMULAIRE ─────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Coordonnées */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-3">
                {[
                  { icon: SvgIcons.MapPin, label: "Adresse", value: ADDRESS, href: MAPS_URL },
                  { icon: SvgIcons.Phone, label: "Téléphone", value: `${PHONE_LANDLINE} / ${PHONE_MOBILE}`, href: `tel:${PHONE_MOBILE.replace(/\s/g, "")}` },
                  { icon: SvgIcons.WhatsApp, label: "WhatsApp", value: PHONE_MOBILE, href: `https://wa.me/${WHATSAPP_RAW}` },
                  { icon: SvgIcons.Sparkles, label: "Email", value: EMAIL_CONTACT, href: `mailto:${EMAIL_CONTACT}` },
                  { icon: SvgIcons.Clock, label: "Horaires", value: "Lun – Ven : 7h30 – 18h (sauf jours fériés)", href: undefined },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`flex items-start space-x-3 bg-white rounded-xl p-4 border border-[#ECE5DA] ${item.href ? "hover:border-[#C86446]/40 hover:shadow-md transition" : ""}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FAF6F0] border border-[#E8DFC9] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#C86446]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-[#C86446] uppercase tracking-wider">{item.label}</div>
                      <div className="text-sm text-[#301353] font-medium leading-snug">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <a
                  href={`tel:${PHONE_MOBILE.replace(/\s/g, "")}`}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-[#301353] hover:bg-[#200B3A] text-white text-xs font-bold shadow-md transition"
                >
                  <SvgIcons.Phone className="w-3.5 h-3.5" />
                  <span>Appeler</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_RAW}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-[#256F46] hover:bg-[#1c5535] text-white text-xs font-bold shadow-md transition"
                >
                  <SvgIcons.WhatsApp className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => openRdv("Prendre rendez-vous pour visiter La Centrale Crèche")}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-[#D9C8B5] text-xs font-bold text-[#301353] hover:bg-[#FAF6F0] transition cursor-pointer"
                >
                  <SvgIcons.Calendar className="w-3.5 h-3.5" />
                  <span>Visite</span>
                </button>
              </div>

              <Photo src={facade} alt="Façade de La Centrale Crèche, 125 Rue Allal Ben Abdallah, Casablanca" ratio="aspect-[4/3]" />
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] space-y-4">
                <Kicker>Formulaire de contact</Kicker>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Nom & Prénom *</label>
                    <input
                      type="text"
                      required
                      value={form.parentName}
                      onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                      placeholder="Ex. Sarah Benjelloun"
                      className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="06 61 00 00 00"
                      className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="sarah@exemple.com"
                      className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Âge de l'enfant</label>
                    <input
                      type="text"
                      value={form.childAge}
                      onChange={(e) => setForm({ ...form, childAge: e.target.value })}
                      placeholder="Ex. 18 mois"
                      className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Type d'accueil souhaité</label>
                    <div className="relative">
                      <select
                        value={form.accueil}
                        onChange={(e) => setForm({ ...form, accueil: e.target.value })}
                        className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-semibold text-[#301353] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition cursor-pointer appearance-none pr-8"
                      >
                        <option>Crèche régulière</option>
                        <option>Halte-garderie</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#736387]">
                        <SvgIcons.ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#736387] mb-1">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      placeholder="Votre message..."
                      className="w-full bg-[#FAF6F0] border border-[#E2D7C8] focus:border-[#301353] rounded-xl px-3.5 py-2.5 text-xs sm:text-[13px] font-medium text-[#301353] placeholder:text-[#9A8DAA] focus:outline-none focus:ring-2 focus:ring-[#301353]/10 transition resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#301353] hover:bg-[#200B3A] text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 group"
                >
                  <span>Envoyer ma demande</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
