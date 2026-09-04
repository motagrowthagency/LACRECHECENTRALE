import { useState } from "react";
import logo from "@/imports/logo_creche_centrale.png";

const PHONE_1 = "05 22 44 64 74";
const PHONE_2 = "06 61 67 23 83";
const WHATSAPP = "212661672383";

const PURPLE = "#6B21A8";
const PURPLE_DARK = "#3B0764";
const GOLD = "#F5C030";
const CREAM = "#FDFBF7";

const SCHEDULE = [
  { time: "7h30", label: "Accueil échelonné", note: "Jeux libres, échanges avec les familles" },
  { time: "9h00", label: "Collation & change", note: "Transition vers les activités" },
  { time: "9h30", label: "Activités dirigées", note: "Éveil, motricité, langage — par groupes d'âge" },
  { time: "11h30", label: "Jeux libres & sortie", note: "Extérieur selon la météo" },
  { time: "12h30", label: "Déjeuner", note: "Repas fourni quotidiennement" },
  { time: "13h30", label: "Sieste & repos", note: "Ambiance calme, musique douce" },
  { time: "15h30", label: "Réveil & collation", note: "Goûter de l'après-midi" },
  { time: "16h00", label: "Activités & sorties", note: "Ateliers, jeux, plein air" },
  { time: "17h30", label: "Retour calme", note: "Temps doux avant les départs" },
];

const FAQS = [
  { q: "À partir de quel âge accueillez-vous les enfants ?", a: "Dès 2 mois et jusqu'à 5 ans, en crèche régulière ou en halte-garderie ponctuelle." },
  { q: "Quels sont vos horaires d'ouverture ?", a: "Lundi au vendredi, 7h30 à 18h, sauf jours fériés. Fermeture deux semaines en fin d'année." },
  { q: "Comment fonctionne la halte-garderie ?", a: "Accueil à l'heure ou à la demi-journée, sans engagement. Idéal pour un rendez-vous, des courses, ou une adaptation progressive." },
  { q: "Comment se passe la période d'adaptation ?", a: "Progressivement sur plusieurs jours : le parent reste présent les premières heures, puis les séparations s'allongent jusqu'à ce que l'enfant soit pleinement à l'aise." },
  { q: "Quels sont les tarifs ?", a: "Communiqués lors de la visite selon l'âge et le rythme d'accueil. Tarif mensuel pour la crèche, tarif horaire ou demi-journée pour la halte-garderie." },
  { q: "Que se passe-t-il si mon enfant est malade ?", a: "Un enfant fiévreux (au-delà de 38,5 °C) ne peut pas être accueilli. Nous contactons les parents immédiatement en cas de problème dans la journée." },
  { q: "Qui peut récupérer mon enfant ?", a: "Uniquement les personnes autorisées dans le dossier d'inscription. Une pièce d'identité peut être demandée." },
  { q: "Fournissez-vous les repas ?", a: "Oui — repas et collations fournis chaque jour. Les allergies font l'objet d'un suivi individualisé." },
  { q: "Comment communiquez-vous avec les parents ?", a: "Via le cahier de liaison quotidien. Nous sommes disponibles par téléphone, et un espace parents en ligne est en développement." },
  { q: "Combien d'enfants accueillez-vous ?", a: "30 enfants au maximum pour garantir un encadrement personnalisé et une atmosphère apaisée." },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[4.25rem]">
        <a href="#" aria-label="Accueil">
          <img src={logo} alt="La Centrale Crèche & Halte Garderie" className="h-9 w-auto" />
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-500">
          {[
            ["#services", "Nos services"],
            ["#inscription", "Inscription"],
            ["#apropos", "À propos"],
            ["#faq", "FAQ"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="hover:text-purple-900 transition-colors">{label}</a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-5">
          <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="text-sm font-semibold text-gray-800 hover:text-purple-800 transition-colors">
            {PHONE_1}
          </a>
          <a href="#contact" className="text-sm font-bold text-white px-5 py-2 rounded-full transition-opacity hover:opacity-80" style={{ background: PURPLE }}>
            Prendre RDV
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 flex flex-col gap-1.5" aria-label="Menu">
          <span className="block w-5 h-0.5 rounded bg-gray-700" />
          <span className="block w-5 h-0.5 rounded bg-gray-700" />
          <span className="block w-5 h-0.5 rounded bg-gray-700" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 py-5 space-y-3">
          {[["#services","Nos services"],["#inscription","Inscription"],["#apropos","À propos"],["#faq","FAQ"],["#contact","Contact"]].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block text-sm font-medium text-gray-700 py-1">{label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block text-center py-2.5 rounded-full text-white text-sm font-bold" style={{ background: PURPLE }}>
            Prendre rendez-vous
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-white min-h-screen flex flex-col lg:flex-row">
      {/* Left — text */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-16 lg:py-0 max-w-2xl">
        <img src={logo} alt="La Centrale Crèche & Halte Garderie" className="h-16 w-auto mb-10 self-start" />
        <p className="text-xs tracking-[0.22em] font-bold uppercase mb-4" style={{ color: GOLD }}>
          Casablanca · Depuis 2000
        </p>
        <h1 className="font-heading font-black leading-[1.05] mb-6" style={{ fontSize: "clamp(3rem,6vw,4.75rem)", color: PURPLE_DARK }}>
          Un lieu où<br />votre enfant<br /><span style={{ color: PURPLE }}>grandit heureux.</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
          Accueil bienveillant des tout-petits de 2 mois à 5 ans, du lundi au vendredi de 7h30 à 18h, face au Marché Central.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <a href="#contact" className="px-7 py-3 rounded-full font-bold text-white text-sm hover:opacity-85 transition-opacity" style={{ background: PURPLE }}>
            Demander une visite
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-full font-semibold text-sm border-2 transition-colors hover:bg-purple-50"
            style={{ borderColor: PURPLE, color: PURPLE }}>
            WhatsApp
          </a>
        </div>
        <div className="flex gap-10 pt-8 border-t border-gray-100">
          {[["25 ans", "d'expérience"],["30 places", "maximum"],["2 mois", "dès cet âge"]].map(([v, l]) => (
            <div key={l}>
              <div className="font-heading font-black text-xl" style={{ color: PURPLE_DARK }}>{v}</div>
              <div className="text-xs text-gray-400 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — full-bleed photo */}
      <div className="lg:w-[45%] h-72 lg:h-auto relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1786292949404-084cbd10c7b1?w=900&h=1200&fit=crop&auto=format&q=80"
          alt="Éducatrice de La Centrale accompagnant un enfant"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Address card floated over the photo */}
        <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-xl max-w-[220px]">
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: PURPLE }}>Adresse</p>
          <p className="text-sm font-semibold text-gray-900 leading-snug">125, rue Allal Ben Abdallah</p>
          <p className="text-xs text-gray-400 mt-0.5">Face au Marché Central</p>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">

        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.22em] font-bold uppercase mb-3" style={{ color: PURPLE }}>Modes d'accueil</p>
          <h2 className="font-heading font-black text-5xl lg:text-6xl leading-tight" style={{ color: PURPLE_DARK }}>
            Nos services
          </h2>
        </div>

        {/* Two-column prose — no cards */}
        <div className="grid lg:grid-cols-2 gap-0 mb-20 border border-gray-200 rounded-3xl overflow-hidden">
          <div className="p-10 lg:p-14">
            <p className="text-xs tracking-[0.2em] font-bold uppercase mb-4" style={{ color: PURPLE }}>Accueil régulier</p>
            <h3 className="font-heading font-black text-3xl mb-4" style={{ color: PURPLE_DARK }}>Crèche régulière</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Pour les enfants de 2 mois à 5 ans, à temps plein ou partiel. Un cadre stable et stimulant où chaque enfant est connu, reconnu, et accompagné selon son rythme propre.
            </p>
            <div className="space-y-4">
              {[
                ["2 – 12 mois", "Sécurité affective, éveil sensoriel, motricité globale"],
                ["1 – 2 ans", "Marche, premiers mots, autonomie au repas et au sommeil"],
                ["2 – 3 ans", "Socialisation, jeux symboliques, pré-langage écrit"],
                ["3 – 5 ans", "Préparation à la maternelle, règles de vie collective"],
              ].map(([age, desc]) => (
                <div key={age} className="flex gap-4">
                  <span className="text-xs font-bold shrink-0 mt-0.5 w-20" style={{ color: PURPLE }}>{age}</span>
                  <span className="text-sm text-gray-500 leading-snug">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-gray-200">
            <p className="text-xs tracking-[0.2em] font-bold uppercase mb-4" style={{ color: GOLD }}>Accueil ponctuel</p>
            <h3 className="font-heading font-black text-3xl mb-4" style={{ color: PURPLE_DARK }}>Halte-garderie</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              À l'heure ou à la demi-journée, sans engagement. Même équipe, même environnement sécurisant — pour quelques heures quand vous en avez besoin.
            </p>
            <div className="space-y-3 mb-8">
              {["Un rendez-vous médical ou administratif","Des courses ou démarches imprévues","Une adaptation progressive à la vie en collectivité","Un simple besoin de souffler"].map(u => (
                <div key={u} className="flex items-start gap-3 text-sm text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: GOLD }} />
                  {u}
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold" style={{ color: PURPLE }}>
              Même cadre. Même équipe. Même bienveillance.
            </p>
          </div>
        </div>

        {/* Activities — horizontal tag list, no grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="lg:w-64 shrink-0">
            <h3 className="font-heading font-bold text-xl mb-2" style={{ color: PURPLE_DARK }}>Activités proposées</h3>
            <p className="text-sm text-gray-400 leading-relaxed">Chaque atelier nourrit le développement global de l'enfant.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Motricité globale","Motricité fine","Éveil sensoriel","Musique & comptines","Histoires & langage","Arts plastiques","Pâte à modeler","Jeux de rôle","Sorties extérieures"].map(a => (
              <span key={a} className="text-sm px-4 py-2 rounded-full border font-medium" style={{ borderColor: "#E9D5FF", color: PURPLE, background: "white" }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

function Schedule() {
  return (
    <section className="py-24" style={{ background: PURPLE_DARK }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <p className="text-xs tracking-[0.22em] font-bold uppercase mb-3" style={{ color: GOLD }}>Rythme de la journée</p>
            <h2 className="font-heading font-black text-4xl text-white leading-tight mb-4">
              Une journée à La Centrale
            </h2>
            <p className="text-purple-300 text-sm leading-relaxed">
              Le rythme alterne éveil, jeu libre et repos — toujours adapté à l'âge, jamais rigide.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="relative pl-6 border-l border-purple-700">
              {SCHEDULE.map((slot, i) => (
                <div key={i} className="relative pb-7 last:pb-0">
                  <div
                    className="absolute -left-[1.4375rem] top-1 w-3 h-3 rounded-full border-2"
                    style={{
                      background: i === 0 || i === SCHEDULE.length - 1 ? GOLD : PURPLE_DARK,
                      borderColor: i === 0 || i === SCHEDULE.length - 1 ? GOLD : "#7C3AED",
                    }}
                  />
                  <div className="flex items-baseline gap-5">
                    <span className="text-xs font-bold font-mono w-10 shrink-0" style={{ color: GOLD }}>{slot.time}</span>
                    <div>
                      <span className="font-semibold text-white text-sm">{slot.label}</span>
                      <span className="text-purple-400 text-sm"> — {slot.note}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Inscription ──────────────────────────────────────────────────────────────

function Inscription() {
  return (
    <section id="inscription" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <p className="text-xs tracking-[0.22em] font-bold uppercase mb-3" style={{ color: PURPLE }}>Inscription</p>
            <h2 className="font-heading font-black text-5xl leading-tight mb-6" style={{ color: PURPLE_DARK }}>
              Inscrire<br />votre enfant
            </h2>
            <p className="text-gray-500 leading-relaxed mb-12 max-w-md">
              La capacité est limitée à 30 places. Nous recommandons de prendre contact dès que possible pour vérifier les disponibilités.
            </p>
            <ol className="space-y-8">
              {[
                ["Prendre contact", "Appelez, écrivez sur WhatsApp ou remplissez le formulaire."],
                ["Visiter la crèche", "Rencontrez l'équipe, découvrez les espaces, posez vos questions."],
                ["Confirmer la place", "Nous vérifions ensemble les disponibilités et le rythme adapté."],
                ["Compléter le dossier", "Documents, contrat et premier versement."],
                ["Période d'adaptation", "Quelques jours progressifs, à votre rythme et à celui de l'enfant."],
              ].map(([title, desc], i) => (
                <li key={title} className="flex gap-6 items-start">
                  <span className="font-heading font-black text-4xl leading-none shrink-0 tabular-nums" style={{ color: PURPLE, opacity: 0.2 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <p className="font-bold text-gray-900">{title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-10">
            <div>
              <p className="text-xs tracking-[0.22em] font-bold uppercase mb-5" style={{ color: PURPLE }}>Tarifs</p>
              <div className="space-y-5">
                {[
                  ["Crèche régulière", "Tarif mensuel selon le nombre de jours/semaine"],
                  ["Halte-garderie", "Tarif à l'heure ou à la demi-journée"],
                  ["Frais de dossier", "Précisés lors de la visite"],
                ].map(([type, detail]) => (
                  <div key={type} className="flex gap-6 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{type}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed italic">
                Les tarifs exacts sont communiqués lors de la visite, selon l'âge et le rythme choisi.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-[0.22em] font-bold uppercase mb-5" style={{ color: PURPLE }}>Pièces à fournir</p>
              <ul className="space-y-3">
                {["Carnet de vaccination","Acte de naissance","Copies des CIN des parents / tuteurs","Photos d'identité de l'enfant","Certificat médical si requis","Coordonnées bancaires"].map(doc => (
                  <li key={doc} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: GOLD }} />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a href="#contact" className="px-6 py-3 rounded-full text-white text-sm font-bold hover:opacity-85 transition-opacity" style={{ background: PURPLE }}>
                Demander une visite
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-semibold border-2 hover:bg-purple-50 transition-colors"
                style={{ borderColor: PURPLE, color: PURPLE }}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── À propos ─────────────────────────────────────────────────────────────────

function Apropos() {
  return (
    <section id="apropos" style={{ background: CREAM }}>

      {/* Pull quote — full width */}
      <div className="py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-8 sm:px-14 text-center">
          <div className="font-heading font-black text-8xl leading-none mb-4 select-none" style={{ color: PURPLE, opacity: 0.15 }}>&ldquo;</div>
          <p className="font-heading font-bold text-2xl lg:text-3xl leading-snug -mt-8" style={{ color: PURPLE_DARK }}>
            Chaque enfant mérite d'être accueilli comme s'il était le seul.
          </p>
          <p className="text-sm text-gray-400 mt-5">— Philosophie de La Centrale, depuis 2000</p>
        </div>
      </div>

      {/* Story + image */}
      <div className="max-w-7xl mx-auto px-8 sm:px-14 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.22em] font-bold uppercase mb-4" style={{ color: PURPLE }}>Notre histoire</p>
            <h2 className="font-heading font-black text-4xl lg:text-5xl leading-tight mb-8" style={{ color: PURPLE_DARK }}>
              25 ans au service<br />des familles<br />casablancaises
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                La Centrale Crèche &amp; Halte Garderie a ouvert ses portes en 2000 avec une conviction simple : les tout-petits ont besoin d'un endroit qui ressemble à une maison — pas à une institution.
              </p>
              <p>
                Vingt-cinq ans plus tard, cette conviction guide chaque décision. Nos 30 places ne sont pas une contrainte, elles sont un choix. Parce qu'au-delà de 30 enfants, on ne peut plus vraiment connaître chacun par son prénom, son rythme, ses petites habitudes.
              </p>
              <p>
                Les parents ne sont pas des visiteurs ici. Ils sont des partenaires. Le cahier de liaison quotidien, les échanges en fin de journée, la disponibilité de l'équipe — tout est pensé pour que vous ne vous sentiez jamais tenu à l'écart de la vie de votre enfant.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-8">
              {["Normes en vigueur au Maroc","Personnel formé aux premiers secours","Cahier de liaison quotidien"].map(b => (
                <span key={b} className="text-xs font-semibold px-3 py-1.5 rounded-full border" style={{ color: PURPLE, borderColor: "#DDD6FE", background: "white" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden h-80 bg-purple-100">
              <img
                src="https://images.unsplash.com/photo-1772419130717-e0630e3e4f28?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Éducatrice et enfants en activité d'éveil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden h-44 bg-purple-100">
                <img
                  src="https://images.unsplash.com/photo-1777056491418-d4ff81a4ad92?w=500&h=400&fit=crop&auto=format&q=80"
                  alt="Enfants en classe"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-44 bg-amber-50 flex items-center justify-center p-6" style={{ background: PURPLE_DARK }}>
                <div className="text-center text-white">
                  <div className="font-heading font-black text-5xl" style={{ color: GOLD }}>2000</div>
                  <div className="text-purple-300 text-xs mt-1 font-medium uppercase tracking-widest">Fondée en</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-14 pt-16 pb-6">
        <p className="text-xs tracking-[0.22em] font-bold uppercase mb-1" style={{ color: PURPLE }}>Galerie</p>
        <h2 className="font-heading font-black text-4xl" style={{ color: PURPLE_DARK }}>La vie ici</h2>
      </div>
      {/* Edge-to-edge, no rounded containers on outer edges */}
      <div className="grid grid-cols-12 gap-2 px-2 pb-2">
        <div className="col-span-7 row-span-2 rounded-2xl overflow-hidden h-96 bg-purple-100">
          <img src="https://images.unsplash.com/photo-1770096679916-2cd9c720d400?w=900&h=700&fit=crop&auto=format&q=80" alt="Adulte et enfant dessinant ensemble" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-5 rounded-2xl overflow-hidden h-[11.5rem] bg-fuchsia-100">
          <img src="https://images.unsplash.com/photo-1761208663763-c4d30657c910?w=600&h=380&fit=crop&auto=format&q=80" alt="Enfants jouant" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-5 rounded-2xl overflow-hidden h-[11.5rem] bg-purple-100">
          <img src="https://images.unsplash.com/photo-1649386525679-214da4fa6676?w=600&h=380&fit=crop&auto=format&q=80" alt="Enfant avec un livre" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-4 rounded-2xl overflow-hidden h-48 bg-purple-100">
          <img src="https://images.unsplash.com/photo-1554119332-086f48919aca?w=500&h=380&fit=crop&auto=format&q=80" alt="Bébé et puzzle" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="col-span-8 rounded-2xl overflow-hidden h-48 bg-fuchsia-100">
          <img src="https://images.unsplash.com/photo-1777056481869-feac70afe522?w=900&h=380&fit=crop&auto=format&q=80" alt="Groupe d'enfants en classe" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
    </section>
  );
}

// ─── Témoignages ──────────────────────────────────────────────────────────────

function Temoignages() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <p className="text-xs tracking-[0.22em] font-bold uppercase mb-16" style={{ color: PURPLE }}>
          Ce que disent les parents
        </p>
        {/* Stacked quotes — no cards, no grid, just typography */}
        <div className="divide-y divide-gray-100">
          {[
            {
              q: "Une équipe attentionnée et professionnelle. Mon enfant s'y sent vraiment bien — et ça se voit dès le matin à l'heure de la déposer.",
              name: "Sarah B.", note: "Maman de Lina, 2 ans",
            },
            {
              q: "La flexibilité de la halte-garderie est parfaite pour mon emploi du temps. Je savais que ma fille était entre de bonnes mains, même pour quelques heures.",
              name: "Karim T.", note: "Papa de Nadia, 18 mois",
            },
            {
              q: "Ce qui m'a convaincue dès la visite, c'est la façon dont l'équipe parlait des enfants — par leur prénom, avec des détails, avec affection. Ce n'était pas un discours formaté.",
              name: "Imane R.", note: "Maman de Youssef, 3 ans",
            },
          ].map((t) => (
            <div key={t.name} className="py-12 grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-1 font-heading font-black text-6xl leading-none select-none hidden lg:block" style={{ color: GOLD }}>
                &ldquo;
              </div>
              <p className="lg:col-span-8 font-heading font-bold text-2xl lg:text-3xl leading-snug" style={{ color: PURPLE_DARK }}>
                {t.q}
              </p>
              <div className="lg:col-span-3 lg:text-right lg:pt-1">
                <p className="font-semibold text-sm text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ background: CREAM }} className="py-24">
      <div className="max-w-4xl mx-auto px-8 sm:px-14">
        <p className="text-xs tracking-[0.22em] font-bold uppercase mb-3" style={{ color: PURPLE }}>FAQ</p>
        <h2 className="font-heading font-black text-4xl mb-14" style={{ color: PURPLE_DARK }}>
          Questions fréquentes
        </h2>
        <div className="space-y-px">
          {FAQS.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 first:rounded-t-2xl last:rounded-b-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-7 py-5 text-left transition-colors hover:bg-purple-50"
              >
                <span className="font-medium text-gray-900 pr-8 text-sm leading-snug">{item.q}</span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                  style={{ background: open === i ? PURPLE : "#EDE9FE", color: open === i ? "white" : PURPLE }}
                >
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-7 pb-6 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* Info */}
          <div>
            <p className="text-xs tracking-[0.22em] font-bold uppercase mb-3" style={{ color: PURPLE }}>Contact</p>
            <h2 className="font-heading font-black text-5xl leading-tight mb-6" style={{ color: PURPLE_DARK }}>
              On vous attend<br />à la crèche.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-12 max-w-md">
              Venez visiter, appelez-nous, ou laissez un message. Nous revenons vers vous dans la journée pour organiser une rencontre.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { label: "Adresse", lines: ["125, rue Allal Ben Abdallah", "Face au Marché Central, Casablanca"] },
                { label: "Téléphone", lines: [PHONE_1, PHONE_2] },
                { label: "Horaires", lines: ["Lundi – Vendredi · 7h30 – 18h", "Fermé les jours fériés"] },
              ].map(({ label, lines }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1.5 text-gray-400">{label}</p>
                  {lines.map((line, i) => (
                    label === "Téléphone" ? (
                      <a key={i} href={`tel:${line.replace(/\s/g, "")}`} className="block font-semibold text-gray-900 hover:text-purple-700 transition-colors">{line}</a>
                    ) : (
                      <p key={i} className={`${i === 0 ? "font-semibold text-gray-900" : "text-sm text-gray-400"}`}>{line}</p>
                    )
                  ))}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold border-2 hover:bg-purple-50 transition-colors" style={{ borderColor: PURPLE, color: PURPLE }}>
                Appeler maintenant
              </a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-3 rounded-full text-white text-sm font-bold hover:opacity-90 transition-opacity" style={{ background: "#25D366" }}>
                WhatsApp
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden h-52 bg-purple-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.9!2d-7.6114!3d33.5953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2938a9c51d3%3A0xd82c71f6b5dc25d!2sCentral%20Market%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1620000000000!5m2!1sfr!2sma"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Centrale Crèche — face au Marché Central, Casablanca"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-24 px-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 text-white font-bold text-lg" style={{ background: PURPLE }}>✓</div>
                <h3 className="font-heading font-bold text-2xl mb-3" style={{ color: PURPLE_DARK }}>Message reçu !</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">Nous vous recontactons dans la journée pour organiser votre visite. À très bientôt.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                <h3 className="font-heading font-bold text-xl mb-1" style={{ color: PURPLE_DARK }}>Demande de visite ou renseignement</h3>
                <p className="text-xs text-gray-400 mb-6">Réponse garantie en jours ouvrés.</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[["Prénom","text","Votre prénom"],["Nom","text","Votre nom"]].map(([label, type, placeholder]) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">{label}</label>
                      <input type={type} required placeholder={placeholder} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Téléphone</label>
                  <input type="tel" required placeholder="06 XX XX XX XX" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Âge de l'enfant</label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition">
                      <option>2 – 12 mois</option>
                      <option>1 – 2 ans</option>
                      <option>2 – 3 ans</option>
                      <option>3 – 5 ans</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Type d'accueil</label>
                    <select className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition">
                      <option>Crèche régulière</option>
                      <option>Halte-garderie</option>
                      <option>Pas encore décidé</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1.5">Message</label>
                  <textarea rows={4} placeholder="Vos questions, vos disponibilités pour une visite..." className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition resize-none" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full text-white font-bold text-sm hover:opacity-85 transition-opacity" style={{ background: PURPLE }}>
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-14" style={{ background: PURPLE_DARK }}>
      <div className="max-w-7xl mx-auto px-8 sm:px-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="La Centrale Crèche" className="h-10 w-auto mb-4 brightness-200 saturate-0 opacity-70" />
            <p className="text-purple-400 text-sm leading-relaxed">
              Accueil bienveillant des tout-petits depuis 2000, face au Marché Central de Casablanca.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 mb-4">Navigation</p>
            <ul className="space-y-2.5 text-sm text-purple-400">
              {[["#services","Nos services"],["#inscription","Inscription & Tarifs"],["#apropos","À propos"],["#faq","FAQ"],["#contact","Contact"]].map(([href, label]) => (
                <li key={href}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 mb-4">Contact</p>
            <address className="not-italic space-y-2 text-sm text-purple-400">
              <p>125, rue Allal Ben Abdallah</p>
              <p>Casablanca, Maroc</p>
              <p><a href={`tel:${PHONE_1.replace(/\s/g,"")}`} className="hover:text-white transition-colors">{PHONE_1}</a></p>
              <p><a href={`tel:${PHONE_2.replace(/\s/g,"")}`} className="hover:text-white transition-colors">{PHONE_2}</a></p>
            </address>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 mb-4">Horaires</p>
            <p className="text-purple-400 text-sm">Lundi – Vendredi</p>
            <p className="text-white font-bold text-xl font-heading">7h30 – 18h</p>
            <p className="text-purple-600 text-xs mt-1">Fermé les jours fériés</p>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: GOLD }}>
              Écrire sur WhatsApp →
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-purple-900 flex flex-col sm:flex-row justify-between gap-3 text-xs text-purple-700">
          <p>© 2024 La Centrale Crèche &amp; Halte Garderie · Casablanca</p>
          <p>Mentions légales · Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen font-body bg-white">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Schedule />
        <Inscription />
        <Apropos />
        <Gallery />
        <Temoignages />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
