(function () {
  'use strict';

  const PIXABAY_KEY = "navegaid-images";
  const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const STORE = {
    name: 'Rosen Atelier',
    email: 'hallo@rosenatelier.test',
    phone: '+43 1 234 5678',
    phoneHref: 'tel:+4312345678',
    address: 'Praterstraße 12, 1020 Wien',
    maps: 'https://maps.google.com/?cid=3003',
    hours: ['Mo–Fr 9:00–18:00', 'Sa 9:00–14:00'],
    rating: 4.8,
    reviews: 61,
    deliveryFee: 9,
    freeFrom: 60
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Catalogue (single source) ---------- */
  const CATEGORIES = [
    { slug: 'strausse', name: 'Sträuße', q: 'flower bouquets florist', alt: 'Mehrere frisch gebundene Sträuße auf einem Arbeitstisch',
      desc: 'Frisch gebundene Sträuße aus saisonalen Blumen — in ganz Wien geliefert oder im Atelier abgeholt.',
      seo: 'Unsere Sträuße binden wir jeden Tag frisch in der Praterstraße 12 im 2. Bezirk. Wir arbeiten mit saisonalen Blumen, verpacken in Papier statt Folie und liefern in alle Wiener Bezirke — bei Bestellung bis 12:00 noch am selben Tag.',
      promo: { eyebrow: 'Im Abo', heading: 'Jede Woche Blumen', text: 'Vier Saisonsträuße für 149,00 €, Lieferung in Wien inklusive.', label: 'Zum Abo', href: '#product/blumen-abo' } },
    { slug: 'pflanzen', name: 'Pflanzen', q: 'green houseplants pots', alt: 'Zimmerpflanzen in Töpfen auf einem Holzregal',
      desc: 'Zimmer- und Terrassenpflanzen, die bleiben. Ausgewählt in Gärtnereien rund um Wien.',
      seo: 'Unsere Pflanzen stammen aus Gärtnereien in Wien und Niederösterreich. Im Atelier in der Leopoldstadt beraten wir Sie gerne zu Standort, Licht und Pflege — und liefern gut verpackt in ganz Wien.',
      promo: { eyebrow: 'Beratung', heading: 'Welche Pflanze passt?', text: 'Rufen Sie uns an — wir helfen Ihnen gerne bei der Auswahl.', label: '+43 1 234 5678', href: 'tel:+4312345678' } },
    { slug: 'trockenblumen', name: 'Trockenblumen', q: 'dried flowers arrangement', alt: 'Getrocknete Gräser und Blüten in Naturtönen',
      desc: 'Getrocknete Gräser und Blüten für Räume, die das ganze Jahr gleich schön aussehen.',
      seo: 'Trockenblumen von Rosen Atelier binden wir von Hand aus Gräsern, Lavendel, Hafer und Strohblumen. Sie brauchen kein Wasser und halten bei trockener Lagerung ein bis zwei Jahre.',
      promo: { eyebrow: 'Hochzeiten', heading: 'Trockenblumen für Ihren Tag', text: 'Auch als Brautstrauß und Tischschmuck.', label: 'Beratung anfragen', href: '#contact' } }
  ];
  const ALL = { slug: 'alle', name: 'Alle Produkte', q: 'flower shop interior', alt: 'Blick in das Atelier mit Sträußen und Pflanzen',
    desc: 'Sträuße, Pflanzen und Trockenblumen aus unserem Atelier in der Praterstraße.',
    seo: 'Rosen Atelier ist ein Blumengeschäft in der Praterstraße 12, 1020 Wien. Hier finden Sie unser ganzes Sortiment — und für Hochzeitsfloristik beraten wir Sie gerne persönlich im Atelier.',
    promo: { eyebrow: 'Hochzeitsfloristik', heading: 'Blumen für Ihre Hochzeit', text: 'Persönliche Beratung im Atelier, nach Termin.', label: 'Beratung anfragen', href: '#contact' } };

  const CAT = {
    strausse: {
      variantName: 'Größe', variants: [{ label: 'Klassisch', add: 0 }, { label: 'Groß', add: 15 }],
      notesHeading: 'Was den Strauß ausmacht.',
      notes: [
        { name: 'Saisonale Blüten', feel: 'Was gerade blüht', q: 'fresh flowers market' },
        { name: 'Frisches Grün', feel: 'Eukalyptus und Gräser', q: 'eucalyptus leaves' },
        { name: 'Von Hand', feel: 'Im Atelier gebunden', q: 'florist hands bouquet' },
        { name: 'Papier', feel: 'Statt Plastikfolie', q: 'bouquet paper wrapping' },
        { name: 'Frischhaltung', feel: 'Pulver liegt bei', q: 'flowers glass vase' },
        { name: 'Grußkarte', feel: 'Ihre Worte, von Hand', q: 'greeting card flowers' }
      ],
      story: { eyebrow: 'Aus dem Atelier', heading: 'Jeder Strauß ein Einzelstück.', text: 'Wir binden jeden Strauß erst, wenn Ihre Bestellung bei uns ist. So passt er zur Saison und zum Anlass und hält länger in Ihrer Vase.', q: 'florist workshop roses' },
      specIntro: 'Was in einem Strauß von Rosen Atelier steckt — und warum.',
      specQ: 'flower bouquet close up',
      specs: [
        { name: 'Blüten', text: 'Saisonale Schnittblumen, wo möglich aus österreichischen Gärtnereien.', q: 'roses close up' },
        { name: 'Grün', text: 'Eukalyptus, Pistazie oder Gräser, je nach Saison.', q: 'eucalyptus branch' },
        { name: 'Höhe', text: 'Ca. 40–50 cm, je nach gewählter Größe.', q: 'tall flower bouquet' },
        { name: 'Verpackung', text: 'Recyclingpapier und Bast, ganz ohne Plastikfolie.', q: 'kraft paper flowers' },
        { name: 'Beigabe', text: 'Frischhaltepulver und eine Pflegekarte in jedem Strauß.', q: 'flowers card gift' }
      ],
      care: 'Stiele schräg anschneiden und die Vase täglich mit frischem, lauwarmem Wasser auffüllen. Hell, aber ohne direkte Sonne und Zugluft aufstellen.',
      topics: ['Frische', 'Beratung', 'Lieferung'],
      reviews: [
        { title: 'Lange frisch und liebevoll gebunden', text: 'Der Strauß kam pünktlich zu meiner Mutter und hat über eine Woche gehalten. Sehr liebevoll gebunden.', author: 'Katharina M., Leopoldstadt', date: 'März 2025' },
        { title: 'Ruhige Beratung am Telefon', text: 'Ich wusste nicht genau, was ich möchte. Am Telefon wurde ich in Ruhe beraten, das Ergebnis war genau richtig.', author: 'Thomas R., Wieden', date: 'Februar 2025' },
        { title: 'Papier statt Plastik', text: 'Papier und Bast statt Folie — das gefällt mir sehr. Die Blumen waren frisch und die Farben zart.', author: 'Anna L., Mariahilf', date: 'Jänner 2025' }
      ]
    },
    pflanzen: {
      variantName: 'Topf', variants: [{ label: 'Kulturtopf', add: 0 }, { label: 'Mit Keramik-Übertopf', add: 18 }],
      notesHeading: 'Was die Pflanze mitbringt.',
      notes: [
        { name: 'Gesunde Wurzeln', feel: 'Frisch umgetopft', q: 'plant roots soil' },
        { name: 'Aus der Region', feel: 'Gärtnereien um Wien', q: 'plant nursery greenhouse' },
        { name: 'Passender Topf', feel: 'Auf Wunsch Keramik', q: 'ceramic plant pot' },
        { name: 'Pflegekarte', feel: 'Licht, Wasser, Standort', q: 'watering can plants' },
        { name: 'Sicher geliefert', feel: 'Gut verpackt', q: 'plant delivery box' },
        { name: 'Nachfragen', feel: 'Auch nach dem Kauf', q: 'florist shop counter' }
      ],
      story: { eyebrow: 'Pflanzen', heading: 'Grün, das bleibt.', text: 'Unsere Pflanzen kommen aus Gärtnereien rund um Wien. Wir topfen sie im Atelier um und erklären Ihnen gerne, was sie brauchen.', q: 'plants greenhouse vienna' },
      specIntro: 'Woher unsere Pflanzen kommen und was sie brauchen.',
      specQ: 'houseplants window light',
      specs: [
        { name: 'Herkunft', text: 'Gärtnereien im Raum Wien und Niederösterreich.', q: 'plant nursery' },
        { name: 'Topf', text: 'Kulturtopf, auf Wunsch mit Keramik-Übertopf.', q: 'terracotta pot plant' },
        { name: 'Licht', text: 'Hell bis halbschattig, ohne pralle Mittagssonne.', q: 'plant sunlight window' },
        { name: 'Wasser', text: 'Gießen, wenn die obere Erdschicht trocken ist.', q: 'watering plant' },
        { name: 'Lieferung', text: 'Gut verpackt im Karton, in ganz Wien.', q: 'cardboard box plant' }
      ],
      care: 'Gießen Sie, wenn die obere Erdschicht trocken ist, und vermeiden Sie Staunässe. Im Winter etwas weniger Wasser geben.',
      topics: ['Qualität', 'Beratung', 'Verpackung'],
      reviews: [
        { title: 'Gesund und gut verpackt', text: 'Die Pflanze kam sicher im Karton an und hat sofort neue Blätter getrieben. Die Pflegekarte ist hilfreich.', author: 'Daniel P., Josefstadt', date: 'März 2025' },
        { title: 'Gute Tipps im Atelier', text: 'Beim Abholen bekam ich ehrliche Hinweise zum Standort. Man merkt, dass hier jemand Pflanzen mag.', author: 'Sabine W., Leopoldstadt', date: 'Februar 2025' },
        { title: 'Schöner Topf dazu', text: 'Mit dem Keramik-Übertopf sieht sie im Wohnzimmer wunderbar aus. Gerne wieder.', author: 'Markus F., Döbling', date: 'Dezember 2024' }
      ]
    },
    trockenblumen: {
      variantName: 'Farbe', variants: [{ label: 'Natur', add: 0 }, { label: 'Altrosa', add: 0 }],
      notesHeading: 'Was ihn besonders macht.',
      notes: [
        { name: 'Gräser', feel: 'Weich und leicht', q: 'dried grass pampas' },
        { name: 'Lavendel', feel: 'Ein zarter Duft', q: 'dried lavender' },
        { name: 'Hafer', feel: 'Natürliche Struktur', q: 'oat stalks dried' },
        { name: 'Ohne Wasser', feel: 'Keine Pflege nötig', q: 'dried flowers vase' },
        { name: 'Haltbar', feel: 'Ein bis zwei Jahre', q: 'dried flowers home' },
        { name: 'Von Hand', feel: 'Im Atelier gebunden', q: 'dried flowers crafting' }
      ],
      story: { eyebrow: 'Trockenblumen', heading: 'Blumen, die bleiben.', text: 'Wir trocknen Gräser und Blüten langsam und binden sie zu Kränzen und Sträußen, die das ganze Jahr bei Ihnen bleiben.', q: 'dried flowers wreath making' },
      specIntro: 'Woraus unsere Trockenblumen bestehen.',
      specQ: 'dried flowers natural',
      specs: [
        { name: 'Material', text: 'Getrocknete Gräser, Lavendel, Hafer und Strohblumen.', q: 'strawflowers dried' },
        { name: 'Haltbarkeit', text: 'Ein bis zwei Jahre bei trockener Lagerung.', q: 'dried bouquet shelf' },
        { name: 'Pflege', text: 'Kein Wasser, keine direkte Sonne.', q: 'dried flowers room' },
        { name: 'Staub', text: 'Mit einem Föhn auf kalter Stufe entfernen.', q: 'dried grass close' },
        { name: 'Verpackung', text: 'Seidenpapier im Karton, sicher geliefert.', q: 'tissue paper gift box' }
      ],
      care: 'Trocken und ohne direkte Sonne aufstellen. Staub vorsichtig mit einem Föhn auf kalter Stufe entfernen.',
      topics: ['Haltbarkeit', 'Farben', 'Verpackung'],
      reviews: [
        { title: 'Sieht nach Monaten noch gleich aus', text: 'Der Kranz hängt seit dem Herbst an unserer Tür und sieht immer noch aus wie am ersten Tag.', author: 'Julia S., Alsergrund', date: 'März 2025' },
        { title: 'Zarte Farben', text: 'Die Altrosa-Variante ist sehr fein. Duftet leicht nach Lavendel, ohne aufdringlich zu sein.', author: 'Petra K., Margareten', date: 'Februar 2025' },
        { title: 'Sorgfältig verpackt', text: 'Kam in Seidenpapier ohne ein einziges abgebrochenes Halmchen. Danke für die Mühe.', author: 'Florian B., Hernals', date: 'November 2024' }
      ]
    }
  };

  const PRODUCTS = [
    { slug: 'rosenstrauss', name: 'Rosenstrauß', price: 39, category: 'strausse', badge: 'Bestseller', q: 'rose bouquet', g: ['pink roses vase', 'roses petals close up'],
      alt: 'Strauß aus cremefarbenen und altrosa Rosen mit Eukalyptus', subtitle: 'Gartenrosen, Eukalyptus und Schleierkraut',
      desc: 'Cremefarbene und altrosa Gartenrosen, locker gebunden mit Eukalyptus und etwas Schleierkraut. Ein ruhiger Strauß für Geburtstage, Dank oder einfach so.',
      claims: ['Rund 15 Stiele, ca. 45 cm hoch', 'Von Hand im Atelier gebunden', 'Mit Frischhaltepulver und Pflegekarte'],
      tip: 'Schneiden Sie die Stiele alle zwei Tage frisch an — so halten die Rosen länger.' },
    { slug: 'tulpenstrauss', name: 'Tulpenstrauß', price: 24.5, category: 'strausse', badge: 'Saison', q: 'tulip bouquet', g: ['tulips vase table', 'colorful tulips'],
      alt: 'Strauß aus bunten Tulpen in Papier gewickelt', subtitle: 'Tulpen der Saison, locker gebunden',
      desc: 'Zwanzig Tulpen in den Farben der Saison, mit etwas frischem Grün. Tulpen wachsen in der Vase weiter und öffnen sich von Tag zu Tag.',
      claims: ['20 Tulpen, ca. 40 cm hoch', 'Farben je nach Saison', 'Schön zu Frühling und Ostern'],
      tip: 'Tulpen mögen kaltes Wasser — und davon nur wenig.' },
    { slug: 'saisonstrauss-prater', name: 'Saisonstrauß „Prater“', price: 45, category: 'strausse', badge: 'Neu', q: 'wildflower bouquet', g: ['seasonal flowers vase', 'meadow flowers bouquet'],
      alt: 'Lockerer Wiesenstrauß aus Saisonblumen und Gräsern', subtitle: 'Was diese Woche blüht',
      desc: 'Unser Strauß der Woche: Wir wählen am Großmarkt, was gerade am schönsten blüht, und binden es mit Gräsern zu einem lockeren Wiesenstrauß. Kein Strauß gleicht dem anderen.',
      claims: ['Wechselt jede Woche', 'Ca. 50 cm hoch', 'Benannt nach unserer Nachbarschaft'],
      tip: 'Entfernen Sie welke Blüten einzeln — der Rest des Straußes bleibt so länger frisch.' },
    { slug: 'pfingstrosenstrauss', name: 'Pfingstrosenstrauß', price: 52, category: 'strausse', badge: 'Limitiert', q: 'peony bouquet', g: ['pink peonies vase', 'peony close up'],
      alt: 'Üppiger Strauß aus rosa und cremefarbenen Pfingstrosen', subtitle: 'Pfingstrosen, nur in der Saison',
      desc: 'Üppige Pfingstrosen in Rosa und Creme, mit wenig Grün gebunden. Sie öffnen sich langsam und füllen den Raum mit einem zarten Duft.',
      claims: ['7 Pfingstrosen, ca. 45 cm', 'Nur im Mai und Juni', 'Knospen öffnen sich in 2–3 Tagen'],
      tip: 'Geschlossene Knospen öffnen sich schneller in lauwarmem Wasser.' },
    { slug: 'blumen-abo', name: 'Blumen-Abo, 4 Wochen', price: 149, category: 'strausse', badge: 'Abo', q: 'flowers vase table home', g: ['flower bouquet kitchen', 'flowers office desk'],
      alt: 'Frischer Saisonstrauß auf einem Esstisch neben dem Fenster', subtitle: 'Jede Woche ein Saisonstrauß',
      desc: 'Vier Wochen lang bringen wir Ihnen jede Woche einen frischen Saisonstrauß nach Hause oder ins Büro. Die Lieferung innerhalb Wiens ist inklusive.',
      claims: ['4 Saisonsträuße, wöchentlich', 'Lieferung in Wien inklusive', 'Liefertag nach Absprache'],
      variants: [{ label: 'Klassisch', add: 0 }, { label: 'Groß', add: 40 }],
      tip: 'Nennen Sie uns bei der Bestellung Ihren Wunschtag — wir richten uns gerne danach.' },
    { slug: 'olivenbaum', name: 'Olivenbaum', price: 89, category: 'pflanzen', badge: 'Beliebt', q: 'olive tree pot', g: ['olive tree balcony', 'olive leaves'],
      alt: 'Olivenbaum mit silbriger Krone im Topf', subtitle: 'Olea europaea, ca. 110 cm',
      desc: 'Ein Olivenbaum mit dichter, silbriger Krone im Kulturtopf. Er fühlt sich auf hellen Balkonen und Terrassen wohl und überwintert hell und kühl.',
      claims: ['Ca. 110 cm hoch', 'Für Balkon und Terrasse', 'Überwintert hell und kühl'],
      tip: 'Im Winter bei 5–10 °C hell stellen und nur wenig gießen.' },
    { slug: 'monstera', name: 'Monstera', price: 35, category: 'pflanzen', badge: 'Pflegeleicht', q: 'monstera plant', g: ['monstera leaf', 'monstera living room'],
      alt: 'Monstera mit großen geschlitzten Blättern im Topf', subtitle: 'Monstera deliciosa, ca. 60 cm',
      desc: 'Die Fensterblattpflanze mit großen, geschlitzten Blättern. Pflegeleicht, schnellwüchsig und schön in hellen Räumen ohne direkte Sonne.',
      claims: ['Ca. 60 cm hoch, im 19-cm-Topf', 'Pflegeleicht', 'Für helle Innenräume'],
      tip: 'Wischen Sie die Blätter ab und zu mit einem feuchten Tuch ab.' },
    { slug: 'orchidee-weiss', name: 'Orchidee Weiß', price: 32, category: 'pflanzen', badge: 'Neu', q: 'white orchid', g: ['white orchid pot', 'orchid flowers close up'],
      alt: 'Weiße Schmetterlingsorchidee mit zwei Blütenrispen', subtitle: 'Phalaenopsis, zweitriebig',
      desc: 'Eine weiße Schmetterlingsorchidee mit zwei Blütenrispen. Sie blüht viele Wochen und braucht nur einmal pro Woche ein kurzes Tauchbad.',
      claims: ['Zwei Blütenrispen', 'Blüht mehrere Wochen', 'Tauchbad einmal pro Woche'],
      tip: 'Nach dem Tauchbad gut abtropfen lassen — Orchideen mögen keine nassen Füße.' },
    { slug: 'geigenfeige', name: 'Geigenfeige', price: 69, category: 'pflanzen', badge: '', q: 'fiddle leaf fig', g: ['fiddle leaf fig living room', 'ficus lyrata leaves'],
      alt: 'Geigenfeige mit großen, geigenförmigen Blättern', subtitle: 'Ficus lyrata, ca. 90 cm',
      desc: 'Große, geigenförmige Blätter an einem aufrechten Stamm. Die Geigenfeige mag einen festen, hellen Platz und möglichst wenige Umzüge.',
      claims: ['Ca. 90 cm hoch', 'Für helle Räume', 'Ruhiger, aufrechter Wuchs'],
      tip: 'Drehen Sie die Pflanze nicht — sie richtet sich nach ihrem Licht.' },
    { slug: 'trockenblumenkranz', name: 'Trockenblumenkranz', price: 48, category: 'trockenblumen', badge: 'Handgemacht', q: 'dried flower wreath', g: ['dried wreath wall', 'dried flowers close up'],
      alt: 'Kranz aus getrockneten Gräsern, Hafer und Strohblumen', subtitle: 'Hafer, Strohblumen und Gräser, Ø 30 cm',
      desc: 'Ein Kranz aus getrockneten Gräsern, Hafer und Strohblumen auf einem Weidenring. Für Tür, Wand oder Tisch — das ganze Jahr.',
      claims: ['Durchmesser ca. 30 cm', 'Auf Weidenring gebunden', 'Hält ein bis zwei Jahre'],
      tip: 'Hängen Sie den Kranz nicht in die pralle Sonne, dann bleiben die Farben länger.' },
    { slug: 'trockenstrauss-hafer-lavendel', name: 'Trockenstrauß „Hafer & Lavendel“', price: 34, category: 'trockenblumen', badge: '', q: 'dried lavender bouquet', g: ['dried flowers vase', 'lavender bunch'],
      alt: 'Kleiner Trockenstrauß aus Lavendel, Hafer und Pampasgras', subtitle: 'Lavendel, Hafer und Pampasgras',
      desc: 'Ein kleiner Trockenstrauß in Natur- und Lilatönen. Er braucht kein Wasser und duftet leicht nach Lavendel.',
      claims: ['Ca. 40 cm hoch', 'Duftet leicht nach Lavendel', 'Ohne Wasser haltbar'],
      tip: 'Ein paar Tropfen Lavendelöl frischen den Duft nach einigen Monaten wieder auf.' }
  ];

  const USP = [
    ['truck', 'Lieferung in Wien', 'Am selben Tag bei Bestellung bis 12:00'],
    ['heart', 'Hochzeitsfloristik', 'Persönliche Beratung nach Termin'],
    ['leaf', 'Frisch gebunden', 'Jeder Strauß von Hand im Atelier'],
    ['mail', 'Bestellung per E-Mail', 'Bezahlung bei Lieferung oder Abholung']
  ];

  /* ---------- Helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => Number(n).toLocaleString('de-AT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const bySlug = (s) => PRODUCTS.find((p) => p.slug === s);
  const catOf = (p) => CATEGORIES.find((c) => c.slug === p.category);
  const variantsOf = (p) => p.variants || CAT[p.category].variants;
  const icon = (n) => `<svg class="icon" aria-hidden="true"><use href="#i-${n}"></use></svg>`;
  const arrow = '<span class="alink__i" aria-hidden="true">↗</span>';
  const pad = (n) => String(n).padStart(2, '0');
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  function img(q, alt, w, h, o) {
    o = o || {};
    return `<img data-pixabay="${esc(q)}" data-orientation="${o.o || 'all'}"${o.key ? ` data-img-key="${esc(o.key)}"` : ''}${o.large ? ' data-size="large"' : ''} alt="${esc(alt)}" width="${w}" height="${h}"${o.cls ? ` class="${o.cls}"` : ''}>`;
  }

  /* ---------- Pixabay resolver ---------- */
  const queryCache = new Map();
  const keyUrls = new Map();
  const usedIds = new Set();
  function fetchHits(q, orientation) {
    const id = q + '|' + orientation;
    if (!queryCache.has(id)) {
      const url = `https://www.navegaid.com/api/outreach/images?key=${PIXABAY_KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${orientation}&safesearch=true&per_page=10`;
      queryCache.set(id, fetch(url).then((r) => (r.ok ? r.json() : { hits: [] })).then((d) => (d && d.hits) || []).catch(() => []));
    }
    return queryCache.get(id);
  }
  function addCredit(el) {
    if ((+el.getAttribute('width') || 0) < 200) return;
    const host = el.parentElement;
    if (!host || host.querySelector(':scope > .img-credit')) return;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    const s = document.createElement('span');
    s.className = 'img-credit';
    s.textContent = 'Bild: Pixabay';
    host.appendChild(s);
  }
  function resolveImage(el) {
    if (el.dataset.state) return;
    el.dataset.state = 'loading';
    const fail = () => { el.dataset.state = 'fallback'; el.classList.add('img--fallback'); el.src = BLANK; };
    if (!PIXABAY_KEY || /^__/.test(PIXABAY_KEY)) { fail(); return; }
    const key = el.dataset.imgKey;
    const apply = (u) => {
      if (!u) { fail(); return; }
      el.onerror = fail;
      el.onload = () => { el.dataset.state = 'done'; addCredit(el); };
      el.src = u;
    };
    if (key && keyUrls.has(key)) { keyUrls.get(key).then(apply); return; }
    const large = el.dataset.size === 'large';
    const pr = fetchHits(el.dataset.pixabay || 'flowers', el.dataset.orientation || 'all').then((hits) => {
      if (!hits.length) return null;
      const hit = hits.find((h) => !usedIds.has(h.id)) || hits[Math.floor(Math.random() * hits.length)];
      usedIds.add(hit.id);
      return large ? (hit.largeImageURL || hit.webformatURL) : hit.webformatURL;
    });
    if (key) keyUrls.set(key, pr);
    pr.then(apply);
  }
  const imgIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { imgIO.unobserve(e.target); resolveImage(e.target); } });
  }, { rootMargin: '600px 0px' }) : null;
  function observeImages(root) {
    $$('img[data-pixabay]', root).forEach((el) => {
      if (!el.getAttribute('src')) el.src = BLANK;
      if (el.dataset.observed) return;
      el.dataset.observed = '1';
      if (imgIO) imgIO.observe(el); else resolveImage(el);
    });
  }

  /* ---------- Render: cards & lists ---------- */
  function productCard(p, o) {
    o = o || {};
    return `<li><article class="pcard${o.square ? ' pcard--square' : ''}">
      <a class="pcard__link" href="#product/${p.slug}" aria-label="${esc(p.name)} ansehen"></a>
      <div class="pcard__media">${img(p.q, p.alt, 600, o.square ? 600 : 750, { key: p.slug + '-0', o: 'vertical' })}
        ${p.badge ? `<span class="badge pcard__badge">${esc(p.badge)}</span>` : ''}
        <button type="button" class="pcard__quick" data-add="${p.slug}" aria-label="${esc(p.name)} in den Warenkorb legen">In den Warenkorb</button>
      </div>
      ${o.eyebrow ? `<p class="eyebrow pcard__cat">${esc(catOf(p).name)}</p>` : ''}
      <div class="pcard__row"><h3 class="pcard__title">${esc(p.name)}</h3><p class="pcard__price">${money(p.price)}</p></div>
    </article></li>`;
  }
  function productsFor(spec) {
    if (!spec || spec === 'all') return PRODUCTS.slice();
    if (spec.indexOf('category:') === 0) return PRODUCTS.filter((p) => p.category === spec.slice(9));
    if (spec.indexOf('slugs:') === 0) return spec.slice(6).split(',').map(bySlug).filter(Boolean);
    return [];
  }
  function fillProductLists(root) {
    $$('[data-products]', root).forEach((el) => {
      const lim = +el.dataset.limit || 0;
      let list = productsFor(el.dataset.products);
      if (lim) list = list.slice(0, lim);
      const opts = el.dataset.card || '';
      el.innerHTML = list.map((p) => productCard(p, { square: opts.indexOf('square') > -1, eyebrow: opts.indexOf('eyebrow') > -1 })).join('');
    });
  }
  function uspHtml() {
    return `<div class="wrap usp__items">${USP.map((u) => `<div class="usp__item"><svg class="icon usp__icon" aria-hidden="true"><use href="#i-${u[0]}"></use></svg><div><p class="usp__title">${esc(u[1])}</p><p class="usp__detail">${esc(u[2])}</p></div></div>`).join('')}</div>`;
  }
  function renderUsp(root) { $$('[data-usp]', root).forEach((el) => { el.setAttribute('aria-label', 'Unsere Versprechen'); el.setAttribute('role', 'region'); el.innerHTML = uspHtml(); }); }

  /* ---------- Render: list collections ---------- */
  function renderListCollections() {
    const grid = $('[data-collection-cards]');
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map((c) => {
      const items = PRODUCTS.filter((p) => p.category === c.slug);
      return `<li><a class="ccard" href="#collection/${c.slug}">
        <span class="ccard__media">${img(c.q, c.alt, 600, 750, { o: 'vertical' })}
          <span class="ccard__slides" aria-hidden="true"><span class="ccard__track">${items.map((p) => img(p.q, p.alt, 600, 750, { key: p.slug + '-0', o: 'vertical' })).join('')}</span></span>
        </span>
        <span class="ccard__title">${esc(c.name)}</span>
        <span class="ccard__count eyebrow">${plural(items.length, 'Produkt', 'Produkte')}</span>
      </a></li>`;
    }).join('');
    const cnt = $('[data-lc-count]'); if (cnt) cnt.textContent = plural(CATEGORIES.length, 'Kollektion', 'Kollektionen');
    const tot = $('[data-lc-total]'); if (tot) tot.textContent = `${PRODUCTS.length} Produkte, von Hand ausgewählt — von Sträußen bis zu Trockenblumen.`;
  }
  function setupCollectionCards() {
    if (reduceMotion) return;
    $$('.ccard').forEach((card) => {
      const track = $('.ccard__track', card);
      if (!track) return;
      const n = track.children.length;
      let t = null, k = 0;
      card.addEventListener('mouseenter', () => {
        if (n < 2) return;
        card.classList.add('is-sliding');
        t = setInterval(() => { k = (k + 1) % n; track.style.transform = `translateX(-${k * 100}%)`; }, 1100);
      });
      card.addEventListener('mouseleave', () => { clearInterval(t); k = 0; track.style.transform = ''; card.classList.remove('is-sliding'); });
    });
  }

  /* ---------- Render: collection pages ---------- */
  function collectionPage(c) {
    const sec = document.createElement('section');
    sec.className = 'page';
    sec.hidden = true;
    sec.dataset.page = 'collection/' + c.slug;
    sec.id = 'collection-' + c.slug;
    sec.dataset.title = `${c.name} — Rosen Atelier, Wien`;
    const chips = [ALL].concat(CATEGORIES).map((x) => `<a class="chip${x.slug === c.slug ? ' is-active' : ''}" href="#collection/${x.slug}"${x.slug === c.slug ? ' aria-current="page"' : ''}>${esc(x.slug === 'alle' ? 'Alle' : x.name)}</a>`).join('');
    const checks = CATEGORIES.map((x) => `<li><label class="fval"><input type="checkbox" name="cat" value="${x.slug}"${x.slug === c.slug ? ' checked' : ''}><span class="fval__box">${icon('check')}</span><span class="fval__name">${esc(x.name)}</span><span class="fval__count">${PRODUCTS.filter((p) => p.category === x.slug).length}</span></label></li>`).join('');
    sec.innerHTML = `
    <div class="sec" data-section="main-collection" style="--pt:16px;--pb:88px"><div class="wrap">
      <nav class="crumbs" aria-label="Brotkrumen"><ol><li><a href="#home">Start</a></li><li><a href="#collections">Kollektionen</a></li><li aria-current="page">${esc(c.name)}</li></ol></nav>
      <div class="coll__media">${img(c.q, c.alt, 1376, 300, { o: 'horizontal', large: true })}</div>
      <div class="coll__header"><div class="coll__intro"><h1 class="t-h1">${esc(c.name)}</h1><p class="lead muted">${esc(c.desc)}</p></div><nav class="chips" aria-label="Kategorien">${chips}</nav></div>
      <div class="coll__body" data-coll>
        <div class="toolbar">
          <button class="toolbar__toggle" type="button" aria-expanded="true" aria-controls="filters-${c.slug}">${icon('filter')}<span>Filter</span><span class="toolbar__badge" data-fcount hidden></span></button>
          <p class="toolbar__count" data-count aria-live="polite"></p>
          <label class="toolbar__sort"><span>Sortieren</span><select data-sort><option value="featured">Empfohlen</option><option value="price-asc">Preis: aufsteigend</option><option value="price-desc">Preis: absteigend</option><option value="name">Name: A–Z</option></select></label>
        </div>
        <aside class="filters" id="filters-${c.slug}" aria-label="Filter">
          <div class="filters__head"><p class="t-h4">Filter</p><button class="icon-btn" type="button" data-fclose aria-label="Filter schließen">${icon('close')}</button></div>
          <details class="fgroup" open><summary>Kategorie ${icon('chevron')}</summary><ul class="fgroup__vals">${checks}</ul></details>
          <details class="fgroup" open><summary>Preis ${icon('chevron')}</summary><div class="fprice">
            <div class="field"><label class="field__label" for="min-${c.slug}">Von (€)</label><input class="field__input" id="min-${c.slug}" type="number" min="0" step="1" inputmode="numeric" placeholder="0" data-min></div>
            <div class="field"><label class="field__label" for="max-${c.slug}">Bis (€)</label><input class="field__input" id="max-${c.slug}" type="number" min="0" step="1" inputmode="numeric" placeholder="150" data-max></div>
          </div></details>
          <div class="filters__foot"><button class="btn" type="button" data-freset>Zurücksetzen</button><button class="btn" type="button" data-fclose>Ergebnisse anzeigen</button></div>
        </aside>
        <div class="coll__results">
          <ul class="pgrid" data-grid style="--cols:3"></ul>
          <div class="coll__empty" data-empty hidden><p class="t-h4">Hier ist noch nichts.</p><p class="muted">Bitte passen Sie die Filter an — oder rufen Sie uns an, wir binden gerne nach Ihrem Wunsch.</p><button class="alink" type="button" data-freset>${arrow}Filter zurücksetzen</button></div>
        </div>
      </div>
      <div class="coll__seo"><h2 class="t-h4">Über diese Kollektion</h2><p class="muted">${esc(c.seo)}</p></div>
    </div></div>
    <div class="usp sec" data-section="usp-strip" data-usp style="--pt:40px;--pb:40px"></div>`;
    return sec;
  }
  function setupCollection(sec, c) {
    const body = $('[data-coll]', sec), grid = $('[data-grid]', sec), filters = $('.filters', sec);
    const toggle = $('.toolbar__toggle', sec), sort = $('[data-sort]', sec);
    const minI = $('[data-min]', sec), maxI = $('[data-max]', sec);
    const mqDesk = window.matchMedia('(min-width: 990px)');
    const promoHtml = `<li class="promo-tile"><p class="eyebrow">${esc(c.promo.eyebrow)}</p><p class="promo-tile__h">${esc(c.promo.heading)}</p><p>${esc(c.promo.text)}</p><a class="alink alink--light" href="${c.promo.href}">${arrow}${esc(c.promo.label)}</a></li>`;
    function render() {
      const cats = $$('input[name="cat"]:checked', sec).map((i) => i.value);
      const min = minI.value === '' ? null : +minI.value;
      const max = maxI.value === '' ? null : +maxI.value;
      let list = PRODUCTS.filter((p) => (!cats.length || cats.indexOf(p.category) > -1) && (min == null || p.price >= min) && (max == null || p.price <= max));
      const s = sort.value;
      if (s === 'price-asc') list.sort((a, b) => a.price - b.price);
      else if (s === 'price-desc') list.sort((a, b) => b.price - a.price);
      else if (s === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'de'));
      const cards = list.map((p) => productCard(p));
      if (list.length) cards.splice(Math.min(3, cards.length), 0, promoHtml);
      grid.innerHTML = cards.join('');
      $('[data-empty]', sec).hidden = list.length > 0;
      grid.hidden = !list.length;
      $('[data-count]', sec).textContent = plural(list.length, 'Produkt', 'Produkte');
      const active = (c.slug === 'alle' ? cats.length : (cats.length === 1 && cats[0] === c.slug ? 0 : cats.length)) + (min != null ? 1 : 0) + (max != null ? 1 : 0);
      const fc = $('[data-fcount]', sec);
      fc.textContent = String(active);
      fc.hidden = !active;
      observeImages(grid);
    }
    $$('input', filters).forEach((i) => i.addEventListener('change', render));
    [minI, maxI].forEach((i) => i.addEventListener('input', render));
    sort.addEventListener('change', render);
    $$('[data-freset]', sec).forEach((b) => b.addEventListener('click', () => {
      $$('input[name="cat"]', sec).forEach((i) => { i.checked = i.value === c.slug; });
      minI.value = ''; maxI.value = ''; sort.value = 'featured'; render();
    }));
    const closeDrawer = () => { filters.classList.remove('is-open'); document.body.classList.remove('is-locked'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      if (mqDesk.matches) {
        const collapsed = body.classList.toggle('is-collapsed');
        toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      } else {
        filters.classList.add('is-open');
        document.body.classList.add('is-locked');
        toggle.setAttribute('aria-expanded', 'true');
        const f = $('input', filters); if (f) f.focus();
      }
    });
    $$('[data-fclose]', sec).forEach((b) => b.addEventListener('click', () => { closeDrawer(); toggle.focus(); }));
    filters.addEventListener('keydown', (e) => { if (e.key === 'Escape' && filters.classList.contains('is-open')) { closeDrawer(); toggle.focus(); } });
    sec.addEventListener('page:hide', closeDrawer);
    if (!mqDesk.matches) toggle.setAttribute('aria-expanded', 'false');
    render();
  }

  /* ---------- Render: product pages ---------- */
  function companionsOf(p) {
    const same = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug && x.slug !== 'blumen-abo');
    const other = PRODUCTS.filter((x) => x.category !== p.category);
    return same.concat(other).slice(0, 2);
  }
  function upsellOf(p) {
    const map = { strausse: 'trockenstrauss-hafer-lavendel', pflanzen: 'orchidee-weiss', trockenblumen: 'tulpenstrauss' };
    const s = map[p.category];
    return bySlug(s === p.slug ? 'rosenstrauss' : s);
  }
  function relatedOf(p) {
    const same = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug);
    const other = PRODUCTS.filter((x) => x.category !== p.category);
    return same.concat(other).slice(0, 4);
  }
  function productPage(p) {
    const c = catOf(p), cc = CAT[p.category], vs = variantsOf(p);
    const vname = cc.variantName;
    const gq = [p.q].concat(p.g);
    const sec = document.createElement('section');
    sec.className = 'page';
    sec.hidden = true;
    sec.dataset.page = 'product/' + p.slug;
    sec.id = 'product-' + p.slug;
    sec.dataset.title = `${p.name} — ${money(p.price)} — Rosen Atelier`;
    const slides = gq.map((q, k) => `<div class="pgal__slide${k ? '' : ' is-active'}">${img(q, k ? `${p.name}, Ansicht ${k + 1}` : p.alt, 900, 1100, { key: p.slug + '-' + k, o: 'vertical' })}</div>`).join('');
    const thumbs = gq.map((q, k) => `<button type="button" class="pgal__thumb" aria-label="Bild ${k + 1} anzeigen" aria-current="${k ? 'false' : 'true'}">${img(q, `${p.name}, Vorschau ${k + 1}`, 132, 160, { key: p.slug + '-' + k, o: 'vertical' })}</button>`).join('');
    const dots = gq.map((q, k) => `<button type="button" class="dot" aria-label="Bild ${k + 1}"${k ? '' : ' aria-current="true"'}></button>`).join('');
    const variantsHtml = vs.map((v, k) => `<label class="vpick__opt"><input type="radio" name="v-${p.slug}" value="${k}"${k ? '' : ' checked'}><span class="vpick__pill">${esc(v.label)}<small>${money(p.price + v.add)}</small></span></label>`).join('');
    const up = upsellOf(p);
    const comps = [p].concat(companionsOf(p));
    const rel = relatedOf(p);
    sec.innerHTML = `
    <nav class="crumbs wrap" data-section="breadcrumbs" aria-label="Brotkrumen" style="padding-block:20px 16px"><ol><li><a href="#home">Start</a></li><li><a href="#collection/${c.slug}">${esc(c.name)}</a></li><li aria-current="page">${esc(p.name)}</li></ol></nav>
    <div class="sec" data-section="product-information" style="--pb:100px"><div class="wrap pinfo">
      <div class="pgal">
        <div class="pgal__stage"><div class="pgal__track">${slides}</div>${p.badge ? `<span class="badge pgal__badge">${esc(p.badge)}</span>` : ''}<div class="pgal__dots">${dots}</div></div>
        <div class="pgal__thumbs">${thumbs}</div>
      </div>
      <div class="pdet">
        <p class="eyebrow">${esc(c.name)}</p>
        <h1 class="t-h1">${esc(p.name)}</h1>
        <p class="prating"><span class="prating__score">4,8 / 5</span><a href="#product/${p.slug}" data-scroll-to="reviews-${p.slug}">61 Google-Bewertungen für das Atelier</a></p>
        <p class="pdet__sub">${esc(p.subtitle)}</p>
        <div class="pprice"><p class="pprice__value" data-pprice>${money(p.price)}</p><p class="pprice__note">inkl. MwSt., zzgl. Lieferung</p></div>
        <p class="pdet__desc">${esc(p.desc)}</p>
        <ul class="ilist">${p.claims.map((t) => `<li>${icon('check')}<span>${esc(t)}</span></li>`).join('')}</ul>
        <div class="callout"><p class="eyebrow">Unser Tipp</p><p class="callout__text">${esc(p.tip)}</p></div>
        <fieldset class="vpick"><legend class="vpick__label">${esc(vname)}: <span data-vlabel>${esc(vs[0].label)}</span></legend><div class="vpick__values">${variantsHtml}</div></fieldset>
        <form class="buy" data-buy>
          <div class="qty"><button type="button" class="qty__btn" data-qty="-1" aria-label="Menge verringern">${icon('minus')}</button><input class="qty__input" type="number" name="qty" value="1" min="1" max="20" aria-label="Menge"><button type="button" class="qty__btn" data-qty="1" aria-label="Menge erhöhen">${icon('plus')}</button></div>
          <button type="submit" class="btn buy__btn">In den Warenkorb · <span data-pprice>${money(p.price)}</span></button>
        </form>
        <p class="pay-note">${icon('lock')}<span>Keine Online-Zahlung: Sie bestellen per E-Mail und bezahlen bei Lieferung oder Abholung.</span></p>
        <div class="bis" hidden><p class="t-h4">Benachrichtigen, sobald verfügbar</p><p class="muted">Wir schreiben Ihnen einmal, sobald es wieder da ist.</p></div>
        <div class="pickup">${icon('store')}<div><p class="pickup__title">Abholung im Atelier möglich</p><p class="pickup__note">Praterstraße 12, 1020 Wien — meist in 2 Stunden bereit</p><details><summary>Öffnungszeiten</summary><p class="pickup__note">${STORE.hours.map(esc).join('<br>')}</p></details></div></div>
        <ul class="ilist ilist--div"><li>${icon('truck')}<span>Lieferung in Wien: 9,00 €, ab 60,00 € kostenlos</span></li><li>${icon('clock')}<span>Am selben Tag bei Bestellung bis 12:00</span></li><li>${icon('gift')}<span>Grußkarte mit Ihren Worten, ohne Aufpreis</span></li></ul>
        <div class="upsell"><div class="upsell__media">${img(up.q, up.alt, 64, 80, { key: up.slug + '-0', o: 'vertical' })}</div><div class="upsell__text"><a class="upsell__title" href="#product/${up.slug}">Passt gut dazu: ${esc(up.name)}</a><p class="upsell__note">${money(up.price)} · ${esc(up.subtitle)}</p></div><button class="btn btn--sm" type="button" data-add="${up.slug}" aria-label="${esc(up.name)} hinzufügen">Hinzufügen</button></div>
        <div class="acc">
          <details class="acc__row" open><summary class="acc__sum">Details ${icon('plus')}</summary><div class="acc__body"><p>${esc(p.desc)} ${esc(p.claims.join(' · '))}.</p></div></details>
          <details class="acc__row"><summary class="acc__sum">Pflege ${icon('plus')}</summary><div class="acc__body"><p>${esc(cc.care)}</p></div></details>
          <details class="acc__row"><summary class="acc__sum">Lieferung und Abholung ${icon('plus')}</summary><div class="acc__body"><p>Lieferung in Wien in alle 23 Bezirke: 9,00 €, ab 60,00 € kostenlos. Abholung im Atelier, Praterstraße 12, 1020 Wien — ${esc(STORE.hours.join(', '))}. Fragen beantworten wir gerne unter <a href="${STORE.phoneHref}">${esc(STORE.phone)}</a>.</p></div></details>
        </div>
      </div>
    </div></div>
    <div class="satc" data-satc hidden><div class="satc__text"><p class="satc__title">${esc(p.name)}</p><p class="satc__price" data-pprice>${money(p.price)}</p></div><button class="btn" type="button" data-satc-btn>In den Warenkorb</button></div>
    <div class="sec" data-section="notes-grid" style="--pt:112px;--pb:112px"><div class="wrap">
      <div class="notes__head"><p class="eyebrow">Details</p><h2 class="t-h2">${esc(cc.notesHeading)}</h2></div>
      <ul class="notes__list">${cc.notes.map((n) => `<li class="nitem"><span class="nitem__swatch">${img(n.q, n.name, 120, 120, { o: 'all' })}</span><h3 class="nitem__name">${esc(n.name)}</h3><p class="nitem__feel">${esc(n.feel)}</p></li>`).join('')}</ul>
    </div></div>
    <div class="sec" data-section="image-with-text" style="--pt:112px;--pb:112px"><div class="wrap iwt iwt--left">
      <div class="iwt__copy"><p class="eyebrow">${esc(cc.story.eyebrow)}</p><h2 class="t-h2">${esc(cc.story.heading)}</h2><p class="lead muted">${esc(cc.story.text)}</p><a class="alink" href="#about">${arrow}Mehr über uns</a></div>
      <div class="iwt__media">${img(cc.story.q, cc.story.heading, 600, 520, { o: 'horizontal' })}</div>
    </div></div>
    <div class="spec" data-section="ingredients-explorer" data-explorer style="--pt:32px;--pb:32px">
      <div class="spec__media">${img(cc.specQ, 'Nahaufnahme der Materialien', 640, 820, { o: 'vertical' })}</div>
      <div class="spec__content">
        <p class="eyebrow">Zusammensetzung</p>
        <p class="spec__intro">${esc(cc.specIntro)}</p>
        <div class="spec__thumbs">${cc.specs.map((s, k) => `<button type="button" class="spec__thumb" data-ing="${k}" aria-pressed="${k ? 'false' : 'true'}"><span class="spec__idx">${pad(k + 1)}</span><span class="spec__photo">${img(s.q, s.name, 128, 167, { o: 'vertical' })}</span></button>`).join('')}</div>
        <div class="spec__detail">
          <ul class="spec__list">${cc.specs.map((s, k) => `<li><button type="button" class="spec__item" data-ing="${k}" aria-pressed="${k ? 'false' : 'true'}"><span class="spec__idx">${pad(k + 1)}</span><span class="spec__name">${esc(s.name)}</span></button></li>`).join('')}</ul>
          <p class="spec__desc" data-ing-desc aria-live="polite">${esc(cc.specs[0].text)}</p>
        </div>
      </div>
    </div>
    <div class="sec" data-section="product-bundle" style="--pt:112px;--pb:112px"><div class="wrap" data-bundle>
      <h2 class="t-h3 bundle__h">Passt gut zusammen.</h2>
      <div class="bundle__form">
        ${comps.map((x, k) => `<label class="bitem"><input type="checkbox" value="${x.slug}" checked><span class="bitem__box">${icon('check')}</span><span class="bitem__media">${img(x.q, x.alt, 80, 100, { key: x.slug + '-0', o: 'vertical' })}</span><span class="bitem__text"><span>${k ? '' : 'Dieser Artikel: '}${esc(x.name)}</span><span class="bitem__price">${money(x.price)}</span></span></label>`).join('')}
        <div class="bundle__total on-dark"><p class="bundle__count" data-bcount></p><p class="bundle__price" data-btotal></p><button class="btn btn--light btn--block" type="button" data-badd>Alle in den Warenkorb</button></div>
      </div>
    </div></div>
    <div class="sec" data-section="product-reviews" id="reviews-${p.slug}" style="--pt:112px;--pb:112px"><div class="wrap prev">
      <div class="prev__summary">
        <h2 class="t-h3">Bewertungen</h2>
        <div class="prev__score"><span class="prev__avg">4,8</span><span class="eyebrow">von 5</span></div>
        <p class="prev__meta">61 Bewertungen auf Google für Rosen Atelier</p>
        <ul class="prev__topics">${cc.topics.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <a class="alink" href="${STORE.maps}" target="_blank" rel="noopener">${arrow}Bewertung schreiben</a>
      </div>
      <div class="prev__list">${cc.reviews.map((r) => `<article class="review"><div class="review__meta"><p class="review__author">${esc(r.author)} <span class="review__verified">Bestätigter Kauf</span></p><p class="review__date">${esc(r.date)}</p></div><p class="eyebrow tcard__rating">5 / 5</p><h3 class="review__title">${esc(r.title)}</h3><p class="review__text">${esc(r.text)}</p></article>`).join('')}</div>
    </div></div>
    <div class="sec" data-section="product-recommendations" style="--pt:112px;--pb:112px"><div class="wrap rel">
      <div class="rel__head"><h2 class="t-h3">Das könnte Ihnen auch gefallen.</h2><a class="alink" href="#collection/alle">${arrow}Alle Produkte</a></div>
      <ul class="pgrid rel__grid" style="--cols:4">${rel.map((x) => productCard(x)).join('')}</ul>
    </div></div>
    <div class="usp sec" data-section="usp-strip" data-usp style="--pt:40px;--pb:40px"></div>`;
    return sec;
  }
  function setupProduct(sec, p) {
    const vs = variantsOf(p);
    let vi = 0;
    const update = () => {
      const pr = p.price + vs[vi].add;
      $$('[data-pprice]', sec).forEach((e) => { e.textContent = money(pr); });
      const l = $('[data-vlabel]', sec); if (l) l.textContent = vs[vi].label;
    };
    $$(`input[name="v-${p.slug}"]`, sec).forEach((r) => r.addEventListener('change', () => { vi = +r.value || 0; update(); }));

    const slides = $$('.pgal__slide', sec), thumbs = $$('.pgal__thumb', sec), dots = $$('.pgal__dots .dot', sec), track = $('.pgal__track', sec);
    const mark = (k) => {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === k));
      thumbs.forEach((t, i) => t.setAttribute('aria-current', i === k ? 'true' : 'false'));
      dots.forEach((d, i) => { if (i === k) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    };
    thumbs.forEach((t, i) => t.addEventListener('click', () => mark(i)));
    dots.forEach((d, i) => d.addEventListener('click', () => track.scrollTo({ left: track.clientWidth * i, behavior: reduceMotion ? 'auto' : 'smooth' })));
    track.addEventListener('scroll', () => {
      if (track.scrollWidth <= track.clientWidth + 2) return;
      const k = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, i) => { if (i === k) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }, { passive: true });

    const form = $('[data-buy]', sec), qty = $('.qty__input', sec);
    $$('[data-qty]', sec).forEach((b) => b.addEventListener('click', () => {
      qty.value = Math.min(20, Math.max(1, (parseInt(qty.value, 10) || 1) + (+b.dataset.qty)));
    }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addToCart(p.slug, vi, Math.min(20, Math.max(1, parseInt(qty.value, 10) || 1)));
    });
    const satc = $('[data-satc]', sec), buyBtn = $('.buy__btn', sec);
    $('[data-satc-btn]', sec).addEventListener('click', () => addToCart(p.slug, vi, Math.min(20, Math.max(1, parseInt(qty.value, 10) || 1))));
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        const e = entries[0];
        satc.hidden = e.isIntersecting || e.boundingClientRect.top > 0 || sec.hidden;
      }).observe(buyBtn);
    }

    const ex = $('[data-explorer]', sec), cc = CAT[p.category];
    $$('[data-ing]', ex).forEach((b) => b.addEventListener('click', () => {
      const k = +b.dataset.ing;
      $$('[data-ing]', ex).forEach((x) => x.setAttribute('aria-pressed', +x.dataset.ing === k ? 'true' : 'false'));
      $('[data-ing-desc]', ex).textContent = cc.specs[k].text;
    }));

    const bundle = $('[data-bundle]', sec), boxes = $$('input[type="checkbox"]', bundle);
    const recalc = () => {
      const on = boxes.filter((i) => i.checked);
      $('[data-btotal]', bundle).textContent = money(on.reduce((s, i) => s + bySlug(i.value).price, 0));
      $('[data-bcount]', bundle).textContent = `${on.length} von ${boxes.length} ausgewählt`;
      $('[data-badd]', bundle).disabled = !on.length;
    };
    boxes.forEach((b) => b.addEventListener('change', recalc));
    $('[data-badd]', bundle).addEventListener('click', () => {
      const on = boxes.filter((i) => i.checked);
      on.forEach((i) => addToCart(i.value, 0, 1, true));
      if (on.length) toast(`${plural(on.length, 'Artikel liegt', 'Artikel liegen')} jetzt im Warenkorb.`);
    });
    recalc();
  }

  /* ---------- Hotspots ---------- */
  function renderHotspots() {
    $$('[data-hotspot]').forEach((h) => {
      const p = bySlug(h.dataset.hotspot);
      if (!p) return;
      const x = +h.dataset.x, y = +h.dataset.y;
      h.classList.add(x > 60 ? 'hotspot--left' : 'hotspot--right', y > 55 ? 'hotspot--above' : 'hotspot--below');
      h.innerHTML = `<button class="hotspot__dot" type="button" aria-expanded="false" aria-label="${esc(p.name)} anzeigen"></button>
        <div class="hotspot__card" hidden><div class="hotspot__media">${img(p.q, p.alt, 84, 84, { key: p.slug + '-0', o: 'vertical' })}</div>
        <div class="hotspot__body"><a class="hotspot__title" href="#product/${p.slug}">${esc(p.name)}</a><p class="hotspot__price">${money(p.price)}</p><button class="btn btn--sm" type="button" data-add="${p.slug}">Hinzufügen</button></div></div>`;
    });
    const closeAll = (except) => $$('.hotspot').forEach((h) => {
      if (h === except) return;
      h.classList.remove('is-open');
      const card = $('.hotspot__card', h); if (card) card.hidden = true;
      const d = $('.hotspot__dot', h); if (d) d.setAttribute('aria-expanded', 'false');
    });
    $$('.hotspot').forEach((h) => {
      const dot = $('.hotspot__dot', h);
      if (!dot) return;
      dot.addEventListener('click', () => {
        const open = !h.classList.contains('is-open');
        closeAll(h);
        h.classList.toggle('is-open', open);
        $('.hotspot__card', h).hidden = !open;
        dot.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.hotspot')) closeAll(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
  }

  /* ---------- Cart ---------- */
  const CART_KEY = 'rosenatelier-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  cart = Array.isArray(cart) ? cart.filter((i) => i && bySlug(i.slug)).map((i) => ({ slug: i.slug, v: Math.max(0, Math.min(variantsOf(bySlug(i.slug)).length - 1, i.v | 0)), qty: Math.max(1, Math.min(20, i.qty | 0)) })) : [];
  let cartMode = 'delivery';
  let cartNote = '';
  const unitPrice = (i) => { const p = bySlug(i.slug); return p.price + variantsOf(p)[i.v].add; };
  function totals() {
    const sub = cart.reduce((s, i) => s + unitPrice(i) * i.qty, 0);
    const del = cartMode === 'pickup' ? 0 : (sub >= STORE.freeFrom ? 0 : STORE.deliveryFee);
    return { sub, del, total: sub + del, count: cart.reduce((s, i) => s + i.qty, 0) };
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
    updateBadge();
    renderCart();
  }
  function addToCart(slug, v, qty, silent) {
    const p = bySlug(slug);
    if (!p) return;
    const vs = variantsOf(p);
    v = Math.max(0, Math.min(vs.length - 1, v | 0));
    qty = Math.max(1, Math.min(20, qty | 0));
    const ex = cart.find((i) => i.slug === slug && i.v === v);
    if (ex) ex.qty = Math.min(20, ex.qty + qty); else cart.push({ slug, v, qty });
    saveCart();
    if (!silent) toast(`${p.name} liegt jetzt im Warenkorb.`);
  }
  function updateBadge() {
    const n = totals().count;
    $$('[data-cart-count]').forEach((b) => { b.textContent = String(n); b.hidden = !n; });
    const link = $('.cart-link'); if (link) link.setAttribute('aria-label', `Warenkorb, ${plural(n, 'Artikel', 'Artikel')}`);
    const lbl = $('[data-cart-label]'); if (lbl) lbl.textContent = plural(n, 'Artikel', 'Artikel');
  }
  function checkoutMail() {
    const t = totals();
    const lines = cart.map((i) => { const p = bySlug(i.slug); return `${i.qty} × ${p.name} (${variantsOf(p)[i.v].label}) — ${money(unitPrice(i) * i.qty)}`; });
    const body = ['Guten Tag,', '', 'ich möchte bei Rosen Atelier folgende Bestellung aufgeben:', '']
      .concat(lines, ['', `Zwischensumme: ${money(t.sub)}`,
        cartMode === 'pickup' ? 'Abholung im Atelier, Praterstraße 12, 1020 Wien: 0,00 €' : `Lieferung in Wien: ${money(t.del)}`,
        `Gesamt: ${money(t.total)}`, '', `Grußkarte: ${cartNote || '—'}`, '', 'Name:',
        cartMode === 'pickup' ? 'Gewünschte Abholzeit:' : 'Lieferadresse:', 'Wunschtermin:', 'Telefon:', '',
        'Ich bezahle bei Lieferung bzw. Abholung.', '', 'Vielen Dank.']).join('\n');
    return `mailto:${STORE.email}?subject=${encodeURIComponent('Bestellung — Rosen Atelier')}&body=${encodeURIComponent(body)}`;
  }
  function renderCart() {
    const root = $('[data-cart-root]');
    if (!root) return;
    if (!cart.length) {
      root.innerHTML = `<div class="empty">
        <p class="t-h3">Ihr Warenkorb ist noch leer.</p>
        <p class="lead muted">Ihr erster Strauß wartet schon im Atelier.</p>
        <div class="btn-row"><a class="btn" href="#collection/strausse"><span aria-hidden="true">↗</span>Sträuße ansehen</a><a class="alink" href="${STORE.phoneHref}">${arrow}Telefonisch bestellen</a></div>
        <div class="empty__suggest"><h2 class="t-h4">Beliebt im Atelier</h2><ul class="pgrid" style="--cols:4">${['rosenstrauss', 'tulpenstrauss', 'monstera', 'trockenblumenkranz'].map((s) => productCard(bySlug(s))).join('')}</ul></div>
      </div>`;
      observeImages(root);
      return;
    }
    const t = totals();
    const missing = Math.max(0, STORE.freeFrom - t.sub);
    const progress = Math.min(100, Math.round((t.sub / STORE.freeFrom) * 100));
    root.innerHTML = `
      <div class="ship"><p class="ship__msg">${icon('truck')}<span>${missing > 0 ? `Noch ${money(missing)} bis zur kostenlosen Lieferung in Wien.` : 'Ihre Lieferung in Wien ist kostenlos.'}</span></p><div class="ship__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" aria-label="Fortschritt bis zur kostenlosen Lieferung"><div class="ship__fill" style="--progress:${progress}%"></div></div></div>
      <div class="cart-layout">
        <div>
          <div class="cart-table-head"><span>Produkt</span><span>Menge</span><span>Summe</span></div>
          <ul class="cart-lines">${cart.map((i, idx) => {
            const p = bySlug(i.slug), v = variantsOf(p)[i.v];
            return `<li class="cline">
              <a class="cline__media" href="#product/${p.slug}" aria-label="${esc(p.name)} ansehen">${img(p.q, p.alt, 112, 140, { key: p.slug + '-0', o: 'vertical' })}</a>
              <div class="cline__details"><p class="eyebrow">${esc(catOf(p).name)}</p><a class="cline__title" href="#product/${p.slug}">${esc(p.name)}</a><p class="cline__variant">${esc(CAT[p.category].variantName)}: ${esc(v.label)}</p><p class="cline__unit">${money(unitPrice(i))} pro Stück</p><button class="cline__remove" type="button" data-remove="${idx}">Entfernen</button></div>
              <div class="cline__qty"><div class="qty"><button type="button" class="qty__btn" data-cqty="${idx}" data-d="-1" aria-label="Menge von ${esc(p.name)} verringern">${icon('minus')}</button><input class="qty__input" type="number" min="1" max="20" value="${i.qty}" data-cinput="${idx}" aria-label="Menge ${esc(p.name)}"><button type="button" class="qty__btn" data-cqty="${idx}" data-d="1" aria-label="Menge von ${esc(p.name)} erhöhen">${icon('plus')}</button></div></div>
              <p class="cline__total">${money(unitPrice(i) * i.qty)}</p>
            </li>`;
          }).join('')}</ul>
          <div class="cart-note field"><label class="field__label" for="cart-note">Grußkarte</label><textarea class="field__input" id="cart-note" rows="3" placeholder="Ihre Worte für die Karte — wir schreiben sie von Hand.">${esc(cartNote)}</textarea></div>
        </div>
        <aside class="csum" aria-label="Bestellübersicht">
          <h2 class="t-h4">Übersicht</h2>
          <fieldset class="csum__mode"><legend class="eyebrow">Lieferung oder Abholung</legend>
            <label><input type="radio" name="cart-mode" value="delivery"${cartMode === 'delivery' ? ' checked' : ''}>Lieferung in Wien</label>
            <label><input type="radio" name="cart-mode" value="pickup"${cartMode === 'pickup' ? ' checked' : ''}>Abholung, Praterstraße 12</label>
          </fieldset>
          <dl class="csum__rows">
            <div class="csum__row"><dt>Zwischensumme</dt><dd>${money(t.sub)}</dd></div>
            <div class="csum__row"><dt>${cartMode === 'pickup' ? 'Abholung' : 'Lieferung in Wien'}</dt><dd>${t.del ? money(t.del) : 'kostenlos'}</dd></div>
          </dl>
          <div class="csum__total"><span class="eyebrow">Gesamt</span><strong>${money(t.total)}</strong></div>
          <p class="csum__hint">Keine Online-Zahlung. Ihre Bestellung wird als E-Mail vorbereitet; Sie bezahlen bei Lieferung oder Abholung.</p>
          <button class="btn btn--block" type="button" data-checkout><span aria-hidden="true">↗</span>Bestellung per E-Mail senden</button>
          <a class="alink" href="${STORE.phoneHref}">${arrow}Oder anrufen: ${esc(STORE.phone)}</a>
          <ul class="ilist"><li>${icon('lock')}<span>Keine Zahlungsdaten im Shop</span></li><li>${icon('sparkle')}<span>Frisch gebunden am Liefertag</span></li><li>${icon('truck')}<span>Lieferung in alle 23 Bezirke</span></li></ul>
        </aside>
      </div>`;
    observeImages(root);
    $$('[data-remove]', root).forEach((b) => b.addEventListener('click', () => { cart.splice(+b.dataset.remove, 1); saveCart(); }));
    $$('[data-cqty]', root).forEach((b) => b.addEventListener('click', () => {
      const it = cart[+b.dataset.cqty]; if (!it) return;
      it.qty = Math.max(1, Math.min(20, it.qty + (+b.dataset.d))); saveCart();
    }));
    $$('[data-cinput]', root).forEach((inp) => inp.addEventListener('change', () => {
      const it = cart[+inp.dataset.cinput]; if (!it) return;
      it.qty = Math.max(1, Math.min(20, parseInt(inp.value, 10) || 1)); saveCart();
    }));
    $$('input[name="cart-mode"]', root).forEach((r) => r.addEventListener('change', () => { cartMode = r.value; renderCart(); }));
    const note = $('#cart-note', root); if (note) note.addEventListener('input', () => { cartNote = note.value; });
    $('[data-checkout]', root).addEventListener('click', () => { window.location.href = checkoutMail(); toast('Ihr E-Mail-Programm öffnet sich mit der Bestellung.'); });
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $('#toast'); if (!t) return;
    $('[data-toast-msg]', t).textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 4500);
  }

  /* ---------- Forms ---------- */
  function setupForm(form, onValid) {
    form.noValidate = true;
    const fields = $$('[data-validate]', form);
    const check = (f) => {
      const v = f.value.trim();
      let msg = '';
      if (f.required && !v) msg = f.dataset.msgEmpty || '— Bitte füllen Sie dieses Feld aus';
      else if (f.dataset.validate === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = '— Diese E-Mail-Adresse wirkt unvollständig';
      else if (f.dataset.validate === 'min' && v.length < 10) msg = '— Bitte schreiben Sie uns ein paar Worte mehr';
      f.setAttribute('aria-invalid', msg ? 'true' : 'false');
      const err = form.querySelector(`[data-error-for="${f.id}"]`);
      if (err) { err.textContent = msg; err.hidden = !msg; }
      return !msg;
    };
    fields.forEach((f) => f.addEventListener('blur', () => { if (f.value.trim() || f.getAttribute('aria-invalid') === 'true') check(f); }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = fields.map(check).every(Boolean);
      if (!ok) { const first = fields.find((f) => f.getAttribute('aria-invalid') === 'true'); if (first) first.focus(); return; }
      onValid(form);
    });
  }
  function setupForms() {
    const cf = $('[data-contact-form]');
    if (cf) setupForm(cf, (form) => {
      const name = $('#c-name').value.trim(), email = $('#c-email').value.trim(), msg = $('#c-msg').value.trim();
      const body = `${msg}\n\n—\n${name}\n${email}`;
      window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent('Anfrage von ' + name + ' — Rosen Atelier')}&body=${encodeURIComponent(body)}`;
      $('[data-success]', form).hidden = false;
      form.reset();
    });
    $$('[data-newsletter]').forEach((nf) => setupForm(nf, (form) => {
      const email = $('input[type="email"]', form).value.trim();
      window.location.href = `mailto:${STORE.email}?subject=${encodeURIComponent('Newsletter-Anmeldung')}&body=${encodeURIComponent('Bitte nehmen Sie mich in den Newsletter von Rosen Atelier auf: ' + email)}`;
      $('[data-success]', form).hidden = false;
      form.reset();
      try { localStorage.setItem('ra-popup', String(Date.now())); } catch (e) { /* ignore */ }
    }));
  }

  /* ---------- Interactions ---------- */
  function setupAnnouncement() {
    const bar = $('[data-announce]'); if (!bar) return;
    const items = $$('.announce__item', bar);
    let i = 0, paused = false;
    const go = (n) => { i = (n + items.length) % items.length; items.forEach((it, k) => it.classList.toggle('is-active', k === i)); };
    $('[data-ann-prev]', bar).addEventListener('click', () => go(i - 1));
    $('[data-ann-next]', bar).addEventListener('click', () => go(i + 1));
    bar.addEventListener('mouseenter', () => { paused = true; });
    bar.addEventListener('mouseleave', () => { paused = false; });
    bar.addEventListener('focusin', () => { paused = true; });
    bar.addEventListener('focusout', () => { paused = false; });
    if (!reduceMotion) setInterval(() => { if (!paused) go(i + 1); }, 5000);
  }
  function setupHero() {
    const hero = $('[data-hero]'); if (!hero) return;
    const slides = $$('.hero__slide', hero), bars = $$('.hero__bar', hero), cur = $('[data-hero-current]', hero);
    let i = 0, paused = false;
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.setAttribute('aria-hidden', k === i ? 'false' : 'true'); s.inert = k !== i; });
      bars.forEach((b, k) => b.setAttribute('aria-current', k === i ? 'true' : 'false'));
      if (cur) cur.textContent = pad(i + 1);
    };
    bars.forEach((b, k) => b.addEventListener('click', () => go(k)));
    $('[data-hero-prev]', hero).addEventListener('click', () => go(i - 1));
    $('[data-hero-next]', hero).addEventListener('click', () => go(i + 1));
    hero.addEventListener('mouseenter', () => { paused = true; });
    hero.addEventListener('mouseleave', () => { paused = false; });
    hero.addEventListener('focusin', () => { paused = true; });
    hero.addEventListener('focusout', () => { paused = false; });
    go(0);
    if (!reduceMotion) setInterval(() => { if (!paused && !hero.closest('.page').hidden) go(i + 1); }, 6000);
  }
  function setupTabs() {
    $$('[data-ptabs]').forEach((sec) => {
      const tabs = $$('[data-tab]', sec), panels = $$('[data-panel]', sec);
      const go = (k, focus) => {
        tabs.forEach((t, i) => { t.setAttribute('aria-selected', i === k ? 'true' : 'false'); t.tabIndex = i === k ? 0 : -1; });
        panels.forEach((p, i) => { p.hidden = i !== k; });
        if (focus) tabs[k].focus();
      };
      tabs.forEach((t, k) => {
        t.addEventListener('click', () => go(k));
        t.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go((k + 1) % tabs.length, true); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go((k - 1 + tabs.length) % tabs.length, true); }
        });
      });
      const scroll = (dir) => {
        const panel = panels.find((p) => !p.hidden); if (!panel) return;
        const row = $('.ptabs__row', panel), first = row && row.firstElementChild; if (!first) return;
        row.scrollBy({ left: dir * (first.getBoundingClientRect().width + 24), behavior: reduceMotion ? 'auto' : 'smooth' });
      };
      const prev = $('[data-row-prev]', sec), next = $('[data-row-next]', sec);
      if (prev) prev.addEventListener('click', () => scroll(-1));
      if (next) next.addEventListener('click', () => scroll(1));
    });
  }
  function setupPanels() {
    $$('[data-panels]').forEach((root) => {
      const panels = $$('.panel', root), bars = $$('.xp__bar', root), cur = $('[data-xp-current]', root);
      let i = 0;
      const go = (n) => {
        i = (n + panels.length) % panels.length;
        panels.forEach((p, k) => {
          p.classList.toggle('is-active', k === i);
          $('.panel__toggle', p).setAttribute('aria-expanded', k === i ? 'true' : 'false');
          $('.panel__content', p).inert = k !== i;
        });
        bars.forEach((b, k) => b.setAttribute('aria-current', k === i ? 'true' : 'false'));
        if (cur) cur.textContent = pad(i + 1);
      };
      panels.forEach((p, k) => $('.panel__toggle', p).addEventListener('click', () => go(k)));
      bars.forEach((b, k) => b.addEventListener('click', () => go(k)));
      $('[data-xp-prev]', root).addEventListener('click', () => go(i - 1));
      $('[data-xp-next]', root).addEventListener('click', () => go(i + 1));
      go(0);
    });
  }
  function setupBeforeAfter() {
    $$('[data-ba]').forEach((root) => {
      const comps = $$('.comp', root);
      $$('.comp__range', root).forEach((r) => r.addEventListener('input', () => r.closest('.comp__stage').style.setProperty('--pos', r.value + '%')));
      comps.forEach((c, k) => $('.comp__thumb', c).addEventListener('click', () => {
        comps.forEach((x, i) => { x.classList.toggle('is-active', i === k); $('.comp__thumb', x).setAttribute('aria-pressed', i === k ? 'true' : 'false'); });
      }));
    });
  }
  function setupDots() {
    $$('[data-dots-for]').forEach((wrap) => {
      const row = document.getElementById(wrap.dataset.dotsFor); if (!row) return;
      const dots = $$('.dot', wrap), items = Array.from(row.children);
      dots.forEach((d, k) => d.addEventListener('click', () => row.scrollTo({ left: items[k].offsetLeft - row.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' })));
      row.addEventListener('scroll', () => {
        const w = items[0] ? items[0].getBoundingClientRect().width + 12 : 1;
        const k = Math.round(row.scrollLeft / w);
        dots.forEach((d, i) => { if (i === k) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      }, { passive: true });
    });
  }
  function setupVideoCarousel() {
    $$('[data-vc]').forEach((root) => {
      const track = $('.vc__track', root), cards = $$('.vcard', track), count = $('[data-vc-count]', root);
      const step = () => (cards[0] ? cards[0].getBoundingClientRect().width + 10 : 300);
      const upd = () => { const k = Math.min(cards.length - 1, Math.round(track.scrollLeft / step())); if (count) count.textContent = `${pad(k + 1)} / ${pad(cards.length)}`; };
      $('[data-vc-prev]', root).addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
      $('[data-vc-next]', root).addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
      track.addEventListener('scroll', upd, { passive: true });
      upd();
    });
  }
  function setupMore() {
    $$('[data-more]').forEach((b) => {
      const target = document.getElementById(b.getAttribute('aria-controls'));
      b.addEventListener('click', () => {
        const open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (target) target.hidden = !open;
        const l = $('[data-more-label]', b); if (l) l.textContent = open ? 'Weniger anzeigen' : 'Weiterlesen';
      });
    });
  }
  function setupMenu() {
    const menu = $('#mobile-menu'), openBtn = $('[data-menu-open]');
    if (!menu || !openBtn) return;
    const open = () => { menu.hidden = false; document.body.classList.add('is-locked'); openBtn.setAttribute('aria-expanded', 'true'); const f = $('a', menu); if (f) f.focus(); };
    const close = () => { if (menu.hidden) return; menu.hidden = true; document.body.classList.remove('is-locked'); openBtn.setAttribute('aria-expanded', 'false'); };
    openBtn.addEventListener('click', open);
    $('[data-menu-close]', menu).addEventListener('click', () => { close(); openBtn.focus(); });
    menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); openBtn.focus(); } });
    $$('a', menu).forEach((a) => a.addEventListener('click', close));
    window.__closeMenu = close;
  }
  function norm(s) { return String(s).toLowerCase().replace(/ß/g, 'ss').normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function setupSearch() {
    const dlg = $('#search'), input = $('#search-input'), out = $('[data-search-results]'), label = $('[data-search-label]');
    if (!dlg) return;
    const item = (p) => `<li><a class="sresult" href="#product/${p.slug}">${img(p.q, p.alt, 64, 80, { key: p.slug + '-0', o: 'vertical' })}<span><span class="sresult__name">${esc(p.name)}</span><span class="sresult__price">${money(p.price)} · ${esc(catOf(p).name)}</span></span></a></li>`;
    const render = () => {
      const q = norm(input.value.trim());
      if (!q) { label.textContent = 'Beliebt im Atelier'; out.innerHTML = ['rosenstrauss', 'tulpenstrauss', 'olivenbaum', 'trockenblumenkranz'].map((s) => item(bySlug(s))).join(''); }
      else {
        const hits = PRODUCTS.filter((p) => norm(`${p.name} ${catOf(p).name} ${p.subtitle}`).indexOf(q) > -1).slice(0, 8);
        label.textContent = hits.length ? plural(hits.length, 'Ergebnis', 'Ergebnisse') : `Nichts gefunden für „${input.value.trim()}“. Versuchen Sie es mit „Rosen“ oder „Pflanzen“.`;
        out.innerHTML = hits.map(item).join('');
      }
      observeImages(out);
    };
    const open = () => { render(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); input.focus(); };
    const close = () => { if (dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); } };
    $$('[data-search-open]').forEach((b) => b.addEventListener('click', open));
    $('[data-search-close]', dlg).addEventListener('click', close);
    input.addEventListener('input', render);
    $('[data-search-form]', dlg).addEventListener('submit', (e) => { e.preventDefault(); const a = $('a', out); if (a) { location.hash = a.getAttribute('href'); close(); } });
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); if (e.target.closest('a')) close(); });
    window.__closeSearch = close;
  }
  function setupPopup() {
    const dlg = $('#newsletter-popup'); if (!dlg) return;
    let last = 0;
    try { last = +localStorage.getItem('ra-popup') || 0; } catch (e) { last = 0; }
    const remember = () => { try { localStorage.setItem('ra-popup', String(Date.now())); } catch (e) { /* ignore */ } };
    const show = () => { if (dlg.open) return; observeImages(dlg); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); };
    const close = () => { remember(); if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); };
    $$('[data-popup-close]', dlg).forEach((b) => b.addEventListener('click', close));
    dlg.addEventListener('cancel', remember);
    dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
    $$('[data-popup-open]').forEach((b) => b.addEventListener('click', show));
    if (Date.now() - last > 30 * 864e5) setTimeout(() => { if (!document.querySelector('dialog[open]')) show(); }, 6000);
  }
  function setupReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    const sel = 'h2, .eyebrow, .lead, .pgrid > li, .mood-card, .tcard, .jcard, .value-card, .stat-card, .usp__item, .ritual-step, .ccard, .rstat, .nitem, .review';
    $$('.page').forEach((page) => {
      $$('[data-section]', page).slice(1).forEach((s) => {
        $$(sel, s).forEach((el, i) => {
          if (el.closest('.hero, .phero, .spot__frame')) return;
          el.classList.add('reveal');
          el.style.setProperty('--d', (i % 6) * 80 + 'ms');
          io.observe(el);
        });
      });
    });
  }

  /* ---------- Router ---------- */
  let firstRoute = true;
  function route() {
    const target = decodeURIComponent(location.hash.replace(/^#/, '')) || 'home';
    const pages = $$('.page');
    const page = pages.find((p) => p.dataset.page === target) || pages.find((p) => p.dataset.page === 'home');
    pages.forEach((p) => {
      const was = !p.hidden;
      p.hidden = p !== page;
      if (was && p !== page) p.dispatchEvent(new CustomEvent('page:hide'));
    });
    document.title = page.dataset.title || 'Rosen Atelier';
    const current = page.dataset.page;
    $$('[data-nav]').forEach((a) => {
      const on = current === a.dataset.nav;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (window.__closeMenu) window.__closeMenu();
    if (window.__closeSearch) window.__closeSearch();
    document.body.classList.remove('is-locked');
    if (current === 'cart') renderCart();
    try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
    if (!firstRoute) {
      const h1 = $('h1', page);
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
    firstRoute = false;
  }

  /* ---------- Init ---------- */
  function init() {
    const main = $('#main');
    [ALL].concat(CATEGORIES).forEach((c) => { const s = collectionPage(c); main.appendChild(s); setupCollection(s, c); });
    PRODUCTS.forEach((p) => { const s = productPage(p); main.appendChild(s); setupProduct(s, p); });
    fillProductLists(document);
    renderUsp(document);
    renderListCollections();
    renderHotspots();

    document.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]');
      if (add) { e.preventDefault(); addToCart(add.dataset.add, 0, 1); return; }
      const sc = e.target.closest('[data-scroll-to]');
      if (sc) { e.preventDefault(); const t = document.getElementById(sc.dataset.scrollTo); if (t) t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }
      const skip = e.target.closest('[data-skip]');
      if (skip) { e.preventDefault(); const page = $$('.page').find((p) => !p.hidden); const h = page && $('h1', page); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } }
    });

    setupAnnouncement();
    setupHero();
    setupTabs();
    setupPanels();
    setupBeforeAfter();
    setupDots();
    setupVideoCarousel();
    setupMore();
    setupMenu();
    setupSearch();
    setupForms();
    setupPopup();
    setupCollectionCards();

    const hdr = $('.site-header');
    const setH = () => document.body.style.setProperty('--header-h', hdr.offsetHeight + 'px');
    setH();
    if ('ResizeObserver' in window) new ResizeObserver(setH).observe(hdr); else window.addEventListener('resize', setH);
    $$('[data-fit]').forEach((el) => el.style.setProperty('--chars', Math.max(6, el.textContent.trim().length)));
    $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

    updateBadge();
    window.addEventListener('hashchange', route);
    route();
    observeImages(document);
    setupReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
