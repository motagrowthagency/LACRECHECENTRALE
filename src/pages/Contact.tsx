import { SvgIcons } from "@/components/icons";
import Photo from "@/components/Photo";
import facade from "@/imports/photos/creche-facade.jpeg";
import Blob from "@/components/Blob";
import Kicker from "@/components/Kicker";
import { ADDRESS, PHONE_MOBILE, PHONE_LANDLINE, WHATSAPP_RAW, EMAIL_CONTACT, MAPS_URL } from "@/data/business";

export default function Contact() {
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
            Pour plus d'informations, appelez-nous ou envoyez-nous un message sur WhatsApp. Notre équipe vous répond
            avec plaisir.
          </p>
        </div>
      </section>

      {/* ─── COORDONNÉES + CONTACT DIRECT ─────────────────────── */}
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

              <Photo src={facade} alt="Façade de La Centrale Crèche, 125 Rue Allal Ben Abdallah, Casablanca" ratio="aspect-[4/3]" />
            </div>

            {/* Contact direct */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#301353] shadow-[6px_6px_0px_0px_#C86446] h-full flex flex-col justify-center">
                <Kicker>Contact direct</Kicker>
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#301353] font-semibold mt-3 mb-2">
                  Une question ? Écrivez-nous.
                </h2>
                <p className="text-sm text-[#5D4E72] leading-relaxed mb-8">
                  Pour toute demande d'information ou d'inscription, appelez-nous directement ou envoyez-nous un
                  message sur WhatsApp — la direction vous répond en personne.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
