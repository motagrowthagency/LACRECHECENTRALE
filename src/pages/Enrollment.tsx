import { SvgIcons } from "@/components/icons";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { PHONE_MOBILE, WHATSAPP_RAW } from "@/data/business";

const STEPS = [
  { title: "Prendre contact", text: "Par téléphone ou sur WhatsApp." },
  { title: "Visiter la crèche", text: "Rencontrer l'équipe et découvrir nos espaces." },
  { title: "Vérifier la disponibilité", text: "Confirmation des places selon la section." },
  { title: "Compléter le dossier", text: "Rassembler les pièces nécessaires à l'inscription." },
  { title: "Signature du contrat", text: "Contrat et premier versement pour valider la place." },
  { title: "Période d'adaptation", text: "Quelques jours avec le parent, puis progressivement sans." },
];

const DOCUMENTS = [
  "Copie du carnet de vaccination de l'enfant",
  "Copie de l'acte de naissance",
  "Copie des CIN des parents / tuteurs",
  "Certificat médical d'aptitude à la vie en collectivité (si demandé)",
  "Photos d'identité de l'enfant",
  "RIB / informations bancaires (si prélèvement)",
];

export default function Enrollment() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-24 bg-[#19042E]">
        <Blob color="#F4B23E" className="absolute -top-20 -left-20 w-80 h-80 opacity-[0.14] pointer-events-none" />
        <Blob color="#C86446" className="absolute bottom-0 -right-24 w-96 h-96 opacity-[0.12] pointer-events-none" animate={false} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative">
          <Kicker light className="justify-center">Inscription & tarifs</Kicker>
          <h1 className="font-serif-heading text-4xl sm:text-6xl text-white leading-[1.05] font-normal">
            Une procédure{" "}
            <span className="relative inline-block italic text-[#F4B23E] font-medium">
              simple et rassurante
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,6 Q50,-2 100,6 T200,6" fill="none" stroke="#C86446" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Découvrez les étapes pour inscrire votre enfant, les documents à fournir et nos modalités tarifaires.
          </p>
        </div>
      </section>

      {/* ─── PROCÉDURE D'INSCRIPTION ──────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Kicker className="justify-center">Étape par étape</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Procédure d'inscription
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#ECE5DA] hover:border-[#C86446]/40 hover:shadow-lg transition space-y-3">
                <div className="w-9 h-9 rounded-full bg-[#301353] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {i + 1}
                </div>
                <h3 className="font-serif-heading font-semibold text-base text-[#301353]">{step.title}</h3>
                <p className="text-xs text-[#5D4E72] leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOCUMENTS & TARIFS ───────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-y border-[#ECE5DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#301353] space-y-4">
              <Kicker>Dossier d'inscription</Kicker>
              <h2 className="font-serif-heading text-2xl text-[#301353] font-semibold">Pièces à fournir</h2>
              <div className="space-y-2.5 pt-1">
                {DOCUMENTS.map((doc, i) => (
                  <div key={i} className="flex items-start space-x-2.5">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#EBF6EE] flex items-center justify-center shrink-0">
                      <SvgIcons.Check className="w-3 h-3 text-[#256F46]" />
                    </div>
                    <span className="text-sm text-[#4A3B5E] leading-relaxed">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FAF6F0] rounded-2xl p-6 sm:p-8 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] space-y-4">
              <Kicker>Modalités</Kicker>
              <h2 className="font-serif-heading text-2xl text-[#301353] font-semibold">Tarifs</h2>
              <div className="space-y-3 pt-1">
                {[
                  { icon: SvgIcons.Calendar, text: "Crèche régulière : tarif mensuel selon le nombre de jours par semaine." },
                  { icon: SvgIcons.ShieldCheck, text: "Frais d'inscription / dossier (si applicable)." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3 bg-white rounded-xl p-4 border border-[#ECE5DA]">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#E8DFC9] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#C86446]" />
                    </div>
                    <span className="text-sm text-[#4A3B5E] leading-relaxed pt-1">{item.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#5D4E72] leading-relaxed italic pt-2 border-t border-[#F2ECE1]">
                Les tarifs exacts vous seront communiqués lors de votre visite, en fonction de l'âge de l'enfant et du
                rythme d'accueil. Paiement mensuel, par virement ou espèces.
              </p>
            </div>
          </div>

          <div className="mt-8 relative overflow-hidden bg-[#19042E] rounded-2xl p-6 sm:p-8 text-center space-y-2">
            <Blob color="#F4B23E" className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.15] pointer-events-none" />
            <h3 className="relative font-serif-heading text-xl text-white font-semibold">
              Seulement <span className="text-[#F4B23E]">30 places</span> disponibles
            </h3>
            <p className="relative text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              La capacité d'accueil est limitée à 30 enfants pour garantir un suivi personnalisé. En cas de places
              complètes, nous vous proposons de rejoindre notre liste d'attente.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DEMANDE D'INSCRIPTION ─────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <Kicker className="justify-center">Demande d'inscription</Kicker>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#301353] leading-tight font-normal">
              Demander une place
            </h2>
            <p className="text-sm text-[#5D4E72] leading-relaxed max-w-lg mx-auto">
              Pour plus d'informations, appelez-nous ou envoyez-nous un message sur WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={`tel:${PHONE_MOBILE.replace(/\s/g, "")}`}
              className="flex flex-col items-center justify-center text-center gap-2 bg-[#301353] hover:bg-[#200B3A] text-white font-bold py-8 px-4 rounded-2xl shadow-md transition"
            >
              <SvgIcons.Phone className="w-7 h-7" />
              <span className="text-sm">Appelez-nous</span>
              <span className="text-xs font-normal text-white/80">{PHONE_MOBILE}</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-center gap-2 bg-[#256F46] hover:bg-[#1c5535] text-white font-bold py-8 px-4 rounded-2xl shadow-md transition"
            >
              <SvgIcons.WhatsApp className="w-7 h-7" />
              <span className="text-sm">WhatsApp</span>
              <span className="text-xs font-normal text-white/80">{PHONE_MOBILE}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
