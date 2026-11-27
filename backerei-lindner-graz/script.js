const PIXABAY_KEY = "navegaid-images";

(() => {
'use strict';
document.documentElement.classList.add('js');

const SHOP = { name: 'Bäckerei Lindner', email: 'info@baeckerei-lindner.test', address: 'Annenstraße 41, 8020 Graz', maps: 'https://maps.google.com/?cid=4005', rating: 4.7, reviews: 143 };
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toFixed(2).replace('.', ',') + ' €';
const MAIL = 'mailto:' + SHOP.email + '?subject=Vorbestellung';

/* ---------- Data (single source for cards, collections, product pages, cart) ---------- */
const CATS = [
  { slug: 'alle', name: 'Alle Produkte', desc: 'Unser gesamtes Sortiment aus der Backstube in der Annenstraße: Brot, Gebäck, Torten und Süßes.', q: 'bakery bread assortment', seo: 'Bei Bäckerei Lindner in Graz finden Sie Brot, Gebäck, Torten und Süßes aus eigener Backstube. Bestellen Sie vor und holen Sie ab, oder lassen Sie sich in Graz beliefern.' },
  { slug: 'brot-kaisersemmel', name: 'Brot Kaisersemmel', desc: 'Sauerteigbrot, Roggenvollkornbrot und Kaisersemmeln, jeden Morgen frisch gebacken.', q: 'bread rolls loaf', seo: 'Unser Brot reift langsam und wird im Ofen ausgebacken. Die Kaisersemmeln gibt es jeden Morgen ab 6:30 Uhr, auf Wunsch auch vorbestellt.',
    ing: [['Mehl', 'Weizen- und Roggenmehl, wenn möglich aus der Region.'], ['Wasser', 'Der Teig bekommt genug Wasser für eine saftige Krume.'], ['Salz', 'Nur so viel, dass das Aroma des Getreides durchkommt.'], ['Sauerteig', 'Lange geführt für Geschmack und Bekömmlichkeit.'], ['Zeit', 'Ruhezeiten, die man nicht abkürzen kann.']] },
  { slug: 'gebaeck', name: 'Gebäck', desc: 'Croissants, Golatschen und Nussschnecken: süßes Gebäck für die Kaffeejause.', q: 'croissant pastry', seo: 'Unser Gebäck wird morgens frisch gebacken. Am besten schmeckt es noch lauwarm zum Kaffee.',
    ing: [['Butter', 'Für zarte Blätterteigschichten.'], ['Mehl', 'Feines Weizenmehl für einen lockeren Teig.'], ['Topfen', 'Cremige Füllung für die Golatsche.'], ['Nüsse', 'Geröstet und fein gemahlen.'], ['Zucker', 'Sparsam dosiert für ein ausgewogenes Aroma.']] },
  { slug: 'torten', name: 'Torten', desc: 'Sachertorte und Topfentorte, auf Bestellung für Ihre Feier gebacken.', q: 'cake bakery', seo: 'Unsere Torten backen wir auf Bestellung. Bitte bestellen Sie rechtzeitig vor, damit wir Ihren Wunschtermin einplanen können. Lieferung in Graz ist möglich.',
    ing: [['Schokolade', 'Dunkle Kuvertüre für den saftigen Teig.'], ['Marillen', 'Feine Marmelade unter der Glasur.'], ['Topfen', 'Frisch und cremig für die Topfentorte.'], ['Eier', 'Für Struktur und Luftigkeit.'], ['Butter', 'Für einen zarten Biss.']] },
  { slug: 'suesses', name: 'Süßes', desc: 'Linzer Kekse und Vanillekipferl: kleine Freuden zum Verschenken.', q: 'cookies sweets', seo: 'Unsere Kekse backen wir in kleinen Mengen. Sie eignen sich als Mitbringsel und für die Jause zwischendurch.',
    ing: [['Mandeln', 'Fein gerieben für den mürben Teig.'], ['Vanille', 'Natürliches Aroma statt Zusätze.'], ['Ribiselmarmelade', 'Fruchtige Füllung für die Linzer Kekse.'], ['Butter', 'Macht die Kekse zart und mürbe.'], ['Staubzucker', 'Die letzte süße Schicht.']] }
];
const PRODUCTS = [
  { slug: 'sauerteigbrot', name: 'Sauerteigbrot', price: 5.90, cat: 'brot-kaisersemmel', badge: 'Beliebt', tags: ['Krosse Kruste', 'Mild-säuerlich', 'Saftige Krume'], sub: '750 g, im Steinofen gebacken', q: 'sourdough bread loaf', q2: 'sliced sourdough', q3: 'bread crust closeup', alt: 'Sauerteigbrot mit knuspriger Kruste',
    desc: 'Unser Sauerteigbrot reift lange und wird im Steinofen ausgebacken. Es hat eine kräftige Kruste, eine saftige Krume und bleibt tagelang frisch.', hl: ['Lange Teigführung', 'Im Steinofen gebacken', 'Schmeckt auch nach Tagen'], variants: { name: 'Schnitt', values: ['Ungeschnitten', 'Geschnitten'] } },
  { slug: 'kaisersemmeln', name: 'Kaisersemmeln', price: 3.60, cat: 'brot-kaisersemmel', tags: ['Knusprig', 'Zart', 'Frühstücksklassiker'], sub: '6 Stück', q: 'kaiser rolls bread', q2: 'bread rolls basket', q3: 'roll with butter', alt: 'Frische Kaisersemmeln in einem Korb',
    desc: 'Die klassische Kaisersemmel mit dünner, knuspriger Kruste und weichem Inneren. Ideal für das Frühstück oder die Jause.', hl: ['Täglich frisch', 'Handgeprägt', 'Ab 6:30 Uhr erhältlich'] },
  { slug: 'roggenvollkornbrot', name: 'Roggenvollkornbrot', price: 4.80, cat: 'brot-kaisersemmel', tags: ['Würzig', 'Dicht', 'Vollkorn'], sub: '500 g', q: 'rye bread whole grain', q2: 'dark bread slices', q3: 'whole grain flour', alt: 'Roggenvollkornbrot, aufgeschnitten',
    desc: 'Ein kräftiges Brot mit würzigem Roggenaroma. Es sättigt lange und passt zu herzhaftem Aufstrich genauso wie zu Käse.', hl: ['Mit Vollkornmehl', 'Würziger Geschmack', 'Lange haltbar'], variants: { name: 'Schnitt', values: ['Ungeschnitten', 'Geschnitten'] } },
  { slug: 'butter-croissant', name: 'Butter-Croissant', price: 1.90, cat: 'gebaeck', badge: 'Frisch', tags: ['Buttrig', 'Zart', 'Blättrig'], sub: 'Stück, täglich frisch', q: 'butter croissant', q2: 'croissant cut open', q3: 'croissants tray', alt: 'Goldbraunes Butter-Croissant',
    desc: 'Unser Croissant besteht aus vielen dünnen Teigschichten mit Butter. Außen knusprig, innen weich, am besten noch lauwarm.', hl: ['Mit echter Butter', 'Handgeformt', 'Morgens frisch gebacken'] },
  { slug: 'topfengolatsche', name: 'Topfengolatsche', price: 2.40, cat: 'gebaeck', tags: ['Cremig', 'Blätterteig', 'Mild-süß'], sub: 'Stück', q: 'danish pastry cheese', q2: 'cream cheese pastry', q3: 'pastry glaze', alt: 'Topfengolatsche aus Blätterteig',
    desc: 'Blätterteig mit einer cremigen Topfenfüllung. Ein Klassiker der österreichischen Backstube, der zu jedem Kaffee passt.', hl: ['Frische Topfenfüllung', 'Blätterteig', 'Zum Kaffee'] },
  { slug: 'nussschnecke', name: 'Nussschnecke', price: 2.60, cat: 'gebaeck', tags: ['Nussig', 'Saftig', 'Geröstet'], sub: 'Stück', q: 'nut roll pastry', q2: 'cinnamon swirl pastry', q3: 'hazelnut', alt: 'Nussschnecke mit Glasur',
    desc: 'Hefeteig mit einer Füllung aus gerösteten Nüssen, zu einer Schnecke gerollt. Saftig, aromatisch und nicht zu süß.', hl: ['Geröstete Nüsse', 'Hefeteig', 'Dünn glasiert'] },
  { slug: 'sachertorte', name: 'Sachertorte', price: 24.00, cat: 'torten', badge: 'Auf Bestellung', tags: ['Schokolade', 'Marille', 'Saftig'], sub: 'Ø 18 cm, auf Bestellung', q: 'sacher cake chocolate', q2: 'chocolate cake slice', q3: 'apricot jam cake', alt: 'Sachertorte mit Schokoladenglasur',
    desc: 'Saftiger Schokoladenteig, feine Marillenmarmelade und eine dünne Glasur. Wir backen sie nach altem Rezept und auf Ihre Bestellung.', hl: ['Mit Marillenmarmelade', 'Nach altem Rezept', 'Vorbestellung nötig'] },
  { slug: 'topfentorte', name: 'Topfentorte', price: 22.00, cat: 'torten', badge: 'Auf Bestellung', tags: ['Frisch', 'Cremig', 'Zitrone'], sub: 'Ø 18 cm, auf Bestellung', q: 'cheesecake whole', q2: 'cheesecake slice', q3: 'lemon zest cake', alt: 'Topfentorte mit cremiger Füllung',
    desc: 'Eine leichte Torte mit cremiger Topfenfüllung und einem Hauch Zitrone. Wir backen sie frisch für Ihre Feier.', hl: ['Mit Zitronenaroma', 'Leicht und cremig', 'Lieferung in Graz'] },
  { slug: 'linzer-kekse', name: 'Linzer Kekse', price: 6.50, cat: 'suesses', tags: ['Mürbe', 'Mandel', 'Ribisel'], sub: '250 g', q: 'linzer cookies jam', q2: 'cookies tin', q3: 'powdered sugar cookies', alt: 'Linzer Kekse mit Marmelade',
    desc: 'Mürbe Mandelkekse mit fruchtiger Ribiselmarmelade. In der Dose halten sie sich frisch und eignen sich gut als Geschenk.', hl: ['Mit Mandeln', 'Fruchtige Füllung', 'Schön zum Verschenken'] },
  { slug: 'vanillekipferl', name: 'Vanillekipferl', price: 7.20, cat: 'suesses', tags: ['Zart', 'Vanille', 'Mürb'], sub: '250 g', q: 'vanilla crescent cookies', q2: 'christmas cookies plate', q3: 'vanilla pods', alt: 'Vanillekipferl mit Staubzucker',
    desc: 'Zarte Kipferl mit feinem Vanillearoma, in Staubzucker gewälzt. Sie zergehen auf der Zunge und passen zu Tee und Kaffee.', hl: ['Mit Vanille', 'Kleine Mengen gebacken', 'In der Dose haltbar'] }
];
const NOTES = [['Früh', 'Wir starten, wenn Graz noch schläft'], ['Sauerteig', 'Mit Zeit und Geduld geführt'], ['Regional', 'Zutaten aus der Region, wo möglich'], ['Handarbeit', 'Geformt von erfahrenen Händen'], ['Frisch', 'Täglich aus dem Ofen'], ['Herzlich', 'Beratung mit Zeit für Sie']];
const REVIEWS = [['Maria K.', 'Geidorf', 'Schmeckt wie früher und hält sich gut.'], ['Thomas H.', 'Lend', 'Frisch, freundlich und immer pünktlich.'], ['Elisabeth R.', 'Gries', 'Das gehört seit Jahren zu unserem Wochenende.']];
const catOf = p => CATS.find(c => c.slug === p.cat);
const prod = s => PRODUCTS.find(p => p.slug === s);
const tagLine = p => p.tags.join(' · ');

/* ---------- Cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('lindner-cart') || '[]'); } catch (e) { cart = []; }
const saveCart = () => { localStorage.setItem('lindner-cart', JSON.stringify(cart)); $$('[data-cart-count]').forEach(el => el.textContent = cart.reduce((a, i) => a + i.qty, 0)); };
function toast(msg) { const t = $('[data-toast]'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2400); }
function addToCart(slug, qty = 1, variant = '', silent) {
  const it = cart.find(i => i.slug === slug && i.variant === variant);
  if (it) it.qty += qty; else cart.push({ slug, qty, variant });
  saveCart(); if (!silent) toast(prod(slug).name + ' liegt im Warenkorb.');
  if (activeName() === 'cart') renderCart();
}
const total = () => cart.reduce((a, i) => a + prod(i.slug).price * i.qty, 0);

/* ---------- Rendering helpers ---------- */
const img = (q, alt, w, h, o = 'all') => `<img data-pixabay="${q}" data-orientation="${o}" alt="${alt}" width="${w}" height="${h}" loading="lazy">`;
const card = p => `<article class="pcard" data-reveal><a class="pimg ph" href="#product/${p.slug}" aria-label="${p.name} ansehen">${img(p.q, p.alt, 600, 600)}</a>${p.badge ? `<span class="badge">${p.badge}</span>` : ''}<p class="label">${tagLine(p)}</p><h3><a href="#product/${p.slug}">${p.name}</a></h3><p class="fmt">${p.sub}</p><p class="price">${fmt(p.price)}</p><button class="btn" type="button" data-add="${p.slug}">In den Warenkorb</button></article>`;

function renderTabs(el, mode) {
  const cats = CATS.filter(c => c.slug !== 'alle');
  const panel = c => { const ps = PRODUCTS.filter(p => p.cat === c.slug); return mode === 'featured' ? `<div class="feat-grid">${ps.concat(PRODUCTS.filter(p => p.cat !== c.slug)).slice(0, 5).map(card).join('')}</div>` : `<div class="row-scroll">${ps.map(card).join('')}</div>`; };
  el.innerHTML = `<div class="tabs-bar"><div class="tabs-list" role="group" aria-label="Kategorien">${cats.map((c, i) => `<button type="button" class="tab" aria-pressed="${i === 0}" data-tab="${c.slug}">${c.name}</button>`).join('')}</div>${mode === 'carousel' ? '<div class="arrows"><button type="button" class="round" data-row-prev aria-label="Zurück">←</button><button type="button" class="round" data-row-next aria-label="Weiter">→</button></div>' : ''}</div><div data-tab-panel></div>`;
  const show = slug => { const c = cats.find(x => x.slug === slug); $('[data-tab-panel]', el).innerHTML = panel(c) + `<p class="btn-row"><a class="btn" href="#collection/${c.slug}">Alle ${c.name} ansehen</a></p>`; observeReveal($('[data-tab-panel]', el)); resolveImages($('[data-tab-panel]', el)); };
  el.addEventListener('click', e => {
    const t = e.target.closest('[data-tab]'); if (t) { $$('[data-tab]', el).forEach(b => b.setAttribute('aria-pressed', b === t)); show(t.dataset.tab); }
    const r = e.target.closest('[data-row-prev],[data-row-next]'); if (r) { const row = $('.row-scroll', el); row.scrollBy({ left: (r.hasAttribute('data-row-next') ? 1 : -1) * row.clientWidth / 2, behavior: 'smooth' }); }
  });
  show(cats[0].slug);
}

/* ---------- Dynamic pages ---------- */
const main = $('#main');
function mkPage(name, html) { const s = document.createElement('section'); s.className = 'page'; s.dataset.page = name; s.id = name.replace('/', '-'); s.innerHTML = html; main.appendChild(s); return s; }
const uspHtml = `<section data-section="usp-strip" class="usp"><div class="wrap usp-in"><div><p class="label">Lieferung</p><p>Lieferung in Graz</p></div><div><p class="label">Torten</p><p>Torten auf Bestellung</p></div><div><p class="label">Frisch</p><p>Täglich frisch gebacken</p></div><div><p class="label">Vorbestellung</p><p>Per E-Mail oder im Laden</p></div></div></section>`;

function collectionPage(c) {
  const list = c.slug === 'alle' ? PRODUCTS : PRODUCTS.filter(p => p.cat === c.slug);
  const s = mkPage('collection/' + c.slug, `<div class="wrap">
    <nav class="crumbs" aria-label="Brotkrumen"><a href="#home">Startseite</a> / <a href="#collections">Kategorien</a> / <span aria-current="page">${c.name}</span></nav>
    <div class="ph r" style="aspect-ratio:1376/300">${img(c.q, 'Backwaren der Kategorie ' + c.name, 1376, 300, 'horizontal')}</div>
    <header class="pagehead"><div><h1 class="d-xl">${c.name}</h1><p class="lead">${c.desc}</p></div></header>
    <div class="moodchips" aria-label="Kategorien"><a href="#collection/alle" class="${c.slug === 'alle' ? 'active' : ''}">Alle</a>${CATS.slice(1).map(x => `<a href="#collection/${x.slug}" class="${x.slug === c.slug ? 'active' : ''}">${x.name}</a>`).join('')}</div>
    <div class="coll-bar"><label>Preis bis <select data-filter><option value="999">Alle Preise</option><option value="5">5 €</option><option value="10">10 €</option><option value="25">25 €</option></select></label><label>Sortieren <select data-sort><option value="">Empfohlen</option><option value="p-asc">Preis aufsteigend</option><option value="p-desc">Preis absteigend</option><option value="name">Name</option></select></label><p class="count small" data-count></p></div>
    <div class="pgrid" data-grid></div>
    <div class="seo"><h2>Über diese Kategorie</h2><p>${c.seo}</p></div>
  </div>${uspHtml}`);
  const grid = $('[data-grid]', s);
  const draw = () => {
    const max = +$('[data-filter]', s).value, sort = $('[data-sort]', s).value;
    let items = list.filter(p => p.price <= max);
    if (sort === 'p-asc') items.sort((a, b) => a.price - b.price); else if (sort === 'p-desc') items.sort((a, b) => b.price - a.price); else if (sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name, 'de'));
    $('[data-count]', s).textContent = items.length + (items.length === 1 ? ' Produkt' : ' Produkte');
    const html = items.map(card); const promo = `<div class="promo-tile" data-reveal><p class="label">Zum Wochenende</p><p class="d">Frühstückskorb für zwei</p><p class="small">Sauerteigbrot, Kaisersemmeln und Croissants in einem Korb.</p><a class="btn" href="#home">Zum Angebot</a></div>`;
    html.splice(Math.min(3, html.length), 0, promo);
    grid.innerHTML = items.length ? html.join('') : '<p class="empty">Keine Produkte in diesem Preisrahmen.</p>';
    observeReveal(grid); resolveImages(grid);
  };
  s.addEventListener('change', e => { if (e.target.matches('[data-filter],[data-sort]')) draw(); });
  draw();
}

function productPage(p) {
  const c = catOf(p), others = PRODUCTS.filter(x => x.slug !== p.slug);
  const comp = others.filter(x => x.cat === p.cat).concat(others.filter(x => x.cat !== p.cat)).slice(0, 2);
  const s = mkPage('product/' + p.slug, `<div class="wrap">
    <nav class="crumbs" aria-label="Brotkrumen"><a href="#home">Startseite</a> / <a href="#collection/${c.slug}">${c.name}</a> / <span aria-current="page">${p.name}</span></nav>
    <div class="pdp">
      <div><div class="gal-main ph">${img(p.q, p.alt, 900, 900)}</div>
        <div class="gal-thumbs"><button type="button" class="active" aria-label="Bild 1"><span class="ph" style="display:block;height:100%">${img(p.q, p.alt, 200, 200)}</span></button><button type="button" aria-label="Bild 2"><span class="ph" style="display:block;height:100%">${img(p.q2, p.name + ', Detailansicht', 200, 200)}</span></button><button type="button" aria-label="Bild 3"><span class="ph" style="display:block;height:100%">${img(p.q3, p.name + ', Nahaufnahme', 200, 200)}</span></button></div></div>
      <div class="pdp-info">
        <p class="label">${c.name}</p>
        <h1>${p.name}</h1>
        <p class="small">★ ${String(SHOP.rating).replace('.', ',')} / 5 · ${SHOP.reviews} Google-Bewertungen für Bäckerei Lindner</p>
        <p class="d-num">${fmt(p.price)}</p><p class="small">${p.sub} · inkl. USt.</p>
        <p>${p.desc}</p>
        <ul class="claims">${p.hl.map(h => `<li>${h}</li>`).join('')}</ul>
        ${p.variants ? `<fieldset class="variants"><legend class="label">${p.variants.name}</legend>${p.variants.values.map((v, i) => `<label><input type="radio" name="v-${p.slug}" value="${v}" ${i === 0 ? 'checked' : ''}><span>${v}</span></label>`).join('')}</fieldset>` : ''}
        <div class="qty-row"><div class="qty"><button type="button" data-q="-1" aria-label="Weniger">–</button><input type="number" min="1" value="1" aria-label="Menge" data-qty><button type="button" data-q="1" aria-label="Mehr">+</button></div><button class="btn" type="button" data-add-page="${p.slug}">In den Warenkorb</button></div>
        <details class="acc" open><summary>Details</summary><div><p>${p.desc} ${p.sub}.</p></div></details>
        <details class="acc"><summary>Aufbewahrung und Genuss</summary><div><p>Bewahren Sie ${p.name} trocken und kühl auf, am besten im Brotkasten oder in einer Papiertüte. Frisch aus dem Ofen schmeckt es am besten.</p></div></details>
        <details class="acc"><summary>Lieferung und Abholung</summary><div><p>Sie können in der Annenstraße 41 abholen oder sich in Graz beliefern lassen. Vorbestellungen nehmen wir per E-Mail an: <a href="${MAIL}">${SHOP.email}</a>. Öffnungszeiten: Mo–Fr 6:30–18:00, Sa 7:00–12:00.</p></div></details>
      </div>
    </div>
    <section class="sec" data-section="notes-grid"><div class="center"><p class="label">Unser Anspruch</p><h2 class="d">Was uns ausmacht.</h2></div><div class="notes6">${NOTES.map(n => `<div><div class="sw" aria-hidden="true">${n[0][0]}</div><h3 style="font-size:20px">${n[0]}</h3><p class="small">${n[1]}</p></div>`).join('')}</div></section>
    <section class="sec split" data-section="image-with-text"><div class="ph r media-tall">${img('bakery morning light', 'Bäckerei am frühen Morgen', 800, 900, 'vertical')}</div><div class="copy"><p class="label">Aus unserer Backstube</p><h2 class="d">Gebacken mit Zeit.</h2><p>${p.name} entsteht in der Annenstraße in Graz, von Hand geformt und frisch gebacken. Wir nehmen uns die Zeit, die gutes Backwerk braucht.</p><a class="arrow-link" href="#about">Mehr über uns →</a></div></section>
    <section class="sec" data-section="ingredients-explorer"><p class="label">Zutaten</p><h2 class="d">Woraus es besteht.</h2><div class="ing"><div class="ph r media-tall">${img(c.q, 'Zutaten für ' + c.name, 700, 800, 'vertical')}</div><div><ul data-ing>${(c.ing || CATS[1].ing).map((x, i) => `<li><button type="button" aria-pressed="${i === 0}" data-i="${i}">${x[0]}</button></li>`).join('')}</ul><p class="lead" data-ing-text>${(c.ing || CATS[1].ing)[0][1]}</p></div></div></section>
    <section class="sec" data-section="product-bundle"><h2 class="d">Dazu passt.</h2><div class="bundle"><div class="bundle-items">${[p, ...comp].map((x, i) => `<label class="bitem"><input type="checkbox" checked data-b="${x.slug}" data-price="${x.price}" ${i === 0 ? '' : ''}><span class="ph">${img(x.q, x.alt, 150, 150)}</span><span class="t"><strong>${x.name}</strong><br><span class="small">${x.sub}</span></span><span>${fmt(x.price)}</span></label>`).join('')}</div><div class="soft-card btotal"><p class="small" data-bcount></p><p class="d-num" data-btotal></p><button class="btn" type="button" data-add-bundle-page>Alle in den Warenkorb</button></div></div></section>
    <section class="sec" data-section="product-reviews"><div class="runhead"><p class="label">Bewertungen</p><span class="small">4,7 / 5 · ${SHOP.reviews} Google-Bewertungen</span></div><div class="revs">${REVIEWS.map(r => `<article class="rev"><p class="label">★★★★★</p><h3 style="font-size:24px">${p.name}</h3><p>${r[2]}</p><p class="small">${r[0]}, ${r[1]}</p></article>`).join('')}</div></section>
    <section class="sec" data-section="product-recommendations"><div class="runhead"><p class="label">Das könnte Ihnen auch gefallen</p><a class="arrow-link" href="#collection/alle">Alle Produkte →</a></div><div class="pgrid">${others.filter(x => x.cat === p.cat).concat(others.filter(x => x.cat !== p.cat)).slice(0, 4).map(card).join('')}</div></section>
  </div>${uspHtml}`);
  const q = $('[data-qty]', s);
  const bundleUpdate = () => { const on = $$('[data-b]:checked', s); $('[data-bcount]', s).textContent = on.length + ' Produkte ausgewählt'; $('[data-btotal]', s).textContent = fmt(on.reduce((a, i) => a + +i.dataset.price, 0)); };
  s.addEventListener('click', e => {
    const qb = e.target.closest('[data-q]'); if (qb) q.value = Math.max(1, (+q.value || 1) + +qb.dataset.q);
    const th = e.target.closest('.gal-thumbs button'); if (th) { $$('.gal-thumbs button', s).forEach(b => b.classList.remove('active')); th.classList.add('active'); const src = $('img', th).src; if (src) $('.gal-main img', s).src = src; }
    const ig = e.target.closest('[data-i]'); if (ig) { $$('[data-i]', s).forEach(b => b.setAttribute('aria-pressed', b === ig)); $('[data-ing-text]', s).textContent = (c.ing || CATS[1].ing)[+ig.dataset.i][1]; }
    if (e.target.closest('[data-add-page]')) { const v = $('input[type=radio]:checked', s); addToCart(p.slug, Math.max(1, +q.value || 1), v ? v.value : ''); }
    if (e.target.closest('[data-add-bundle-page]')) { $$('[data-b]:checked', s).forEach(i => addToCart(i.dataset.b, 1, '', true)); saveCart(); toast('Die Auswahl liegt im Warenkorb.'); }
  });
  s.addEventListener('change', e => { if (e.target.matches('[data-b]')) bundleUpdate(); });
  bundleUpdate();
}

function fillCollectionsList() {
  $('[data-coll-count]').textContent = (CATS.length - 1) + ' Kategorien';
  $('[data-coll-grid]').innerHTML = CATS.slice(1).map(c => `<a class="ccard" href="#collection/${c.slug}"><span class="ph r">${img(c.q, 'Kategorie ' + c.name, 600, 750, 'vertical')}</span><h3>${c.name}</h3><span class="small">${PRODUCTS.filter(p => p.cat === c.slug).length} Produkte</span></a>`).join('');
}

/* ---------- Cart page ---------- */
function renderCart() {
  const box = $('[data-cart-items]'), sum = $('[data-cart-summary]');
  if (!cart.length) { box.innerHTML = '<div class="empty"><h2 class="d">Noch nichts im Korb.</h2><p>Ihr Warenkorb ist noch leer.</p><a class="arrow-link" href="#collection/alle">Sortiment ansehen →</a></div>'; sum.innerHTML = '<p>Sobald Sie etwas auswählen, erscheint hier Ihre Bestellung.</p>'; return; }
  box.innerHTML = cart.map((i, n) => { const p = prod(i.slug); return `<div class="citem"><a class="ph" href="#product/${p.slug}">${img(p.q, p.alt, 150, 150)}</a><div><h3 style="font-size:24px"><a href="#product/${p.slug}" style="text-decoration:none">${p.name}</a></h3><p class="small">${i.variant ? i.variant + ' · ' : ''}${fmt(p.price)}</p><div class="qty"><button type="button" data-cq="${n}" data-d="-1" aria-label="Weniger">–</button><input value="${i.qty}" readonly aria-label="Menge"><button type="button" data-cq="${n}" data-d="1" aria-label="Mehr">+</button></div> <button type="button" class="rm" data-rm="${n}">Entfernen</button></div><p>${fmt(p.price * i.qty)}</p></div>`; }).join('');
  sum.innerHTML = `<h2 style="font-size:30px">Zusammenfassung</h2><div class="sum-row"><span>Zwischensumme</span><strong>${fmt(total())}</strong></div><p class="small">Lieferung in Graz nach Vereinbarung, Bezahlung bei Abholung oder Lieferung.</p>
  <form data-checkout><label class="label" for="co-name">Name</label><input id="co-name" required><label class="label" for="co-mode">Abholung oder Lieferung</label><select id="co-mode"><option>Abholung in der Annenstraße 41</option><option>Lieferung in Graz</option></select><label class="label" for="co-date">Wunschtermin</label><input id="co-date" placeholder="z. B. Samstag, 8:00 Uhr"><label class="label" for="co-note">Anmerkung</label><textarea id="co-note" rows="3"></textarea><p class="error" data-co-err role="alert"></p><p class="btn-row"><button class="btn" type="submit">Vorbestellung senden</button></p></form>`;
}
document.addEventListener('submit', e => {
  const f = e.target.closest('[data-checkout]'); if (f) {
    e.preventDefault(); const name = $('#co-name').value.trim(); if (!name) { $('[data-co-err]').textContent = 'Bitte geben Sie Ihren Namen an.'; return; }
    const lines = cart.map(i => { const p = prod(i.slug); return `- ${i.qty} × ${p.name}${i.variant ? ' (' + i.variant + ')' : ''}: ${fmt(p.price * i.qty)}`; }).join('\n');
    const body = `Guten Tag,\n\nich möchte gerne vorbestellen:\n\n${lines}\n\nSumme: ${fmt(total())}\nName: ${name}\n${$('#co-mode').value}\nWunschtermin: ${$('#co-date').value || 'offen'}\nAnmerkung: ${$('#co-note').value || '-'}\n\nVielen Dank!`;
    location.href = 'mailto:' + SHOP.email + '?subject=' + encodeURIComponent('Vorbestellung von ' + name) + '&body=' + encodeURIComponent(body);
  }
  const cf = e.target.closest('[data-contact-form]'); if (cf) {
    e.preventDefault(); const n = $('#cf-name').value.trim(), m = $('#cf-mail').value.trim(), t = $('#cf-msg').value.trim(), er = $('[data-form-error]'), ok = $('[data-form-ok]'); ok.textContent = '';
    if (!n) { er.textContent = 'Bitte geben Sie Ihren Namen an.'; return; }
    if (!/^\S+@\S+\.\S+$/.test(m)) { er.textContent = 'Diese E-Mail-Adresse wirkt unvollständig.'; return; }
    if (!t) { er.textContent = 'Bitte schreiben Sie uns eine kurze Nachricht.'; return; }
    er.textContent = ''; ok.textContent = 'Danke. Ihr E-Mail-Programm öffnet sich, wir antworten innerhalb von zwei Werktagen.';
    location.href = 'mailto:' + SHOP.email + '?subject=' + encodeURIComponent('Nachricht von ' + n) + '&body=' + encodeURIComponent(t + '\n\n' + n + ' (' + m + ')');
  }
  const nf = e.target.closest('[data-news-form],[data-nl-form]'); if (nf) {
    e.preventDefault(); const mail = $('input', nf).value;
    location.href = 'mailto:' + SHOP.email + '?subject=' + encodeURIComponent('Newsletter-Anmeldung') + '&body=' + encodeURIComponent('Bitte tragen Sie ' + mail + ' in den Newsletter ein.');
    toast('Danke für Ihre Anmeldung.'); closeNl();
  }
});

/* ---------- Global click handling ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-add]'); if (a) addToCart(a.dataset.add);
  const ab = e.target.closest('[data-add-bundle]'); if (ab) { ab.dataset.addBundle.split(',').forEach(s => addToCart(s, 1, '', true)); saveCart(); toast('Der Frühstückskorb liegt im Warenkorb.'); }
  const cq = e.target.closest('[data-cq]'); if (cq) { const it = cart[+cq.dataset.cq]; it.qty += +cq.dataset.d; if (it.qty < 1) cart.splice(+cq.dataset.cq, 1); saveCart(); renderCart(); }
  const rm = e.target.closest('[data-rm]'); if (rm) { cart.splice(+rm.dataset.rm, 1); saveCart(); renderCart(); }
  const hs = e.target.closest('.hs-dot'); if (hs) { const h = hs.parentElement, was = h.classList.contains('open'); $$('.hs').forEach(x => x.classList.remove('open')); if (!was) h.classList.add('open'); } else if (!e.target.closest('.hs-card')) $$('.hs').forEach(x => x.classList.remove('open'));
  if (e.target.closest('[data-menu-toggle]')) { const n = $('#nav'), o = n.classList.toggle('open'); e.target.closest('[data-menu-toggle]').setAttribute('aria-expanded', o); }
  else if (e.target.closest('#nav a')) $('#nav').classList.remove('open');
  if (e.target.closest('[data-search-open]')) { $('[data-search]').showModal(); $('[data-search-input]').focus(); }
  if (e.target.closest('[data-nl-close]')) closeNl();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') $$('.hs').forEach(x => x.classList.remove('open')); });

/* ---------- Search ---------- */
$('[data-search-input]').addEventListener('input', e => {
  const v = e.target.value.trim().toLowerCase(), res = $('[data-search-res]');
  const hits = v ? PRODUCTS.filter(p => (p.name + ' ' + catOf(p).name + ' ' + p.tags.join(' ')).toLowerCase().includes(v)) : [];
  res.innerHTML = v ? (hits.length ? hits.map(p => `<li><a href="#product/${p.slug}"><span>${p.name}</span><span>${fmt(p.price)}</span></a></li>`).join('') : '<li class="small">Nichts gefunden. Versuchen Sie es mit Brot, Torte oder Kekse.</li>') : '';
});
$('[data-search-res]').addEventListener('click', e => { if (e.target.closest('a')) $('[data-search]').close(); });

/* ---------- Newsletter popup ---------- */
function closeNl() { const d = $('[data-nl]'); if (d.open) d.close(); localStorage.setItem('lindner-nl', Date.now() + 30 * 864e5); }
setTimeout(() => { if (+(localStorage.getItem('lindner-nl') || 0) < Date.now() && !$('dialog[open]')) { $('[data-nl]').showModal(); resolveImages($('[data-nl]')); } }, 6000);

/* ---------- Home components ---------- */
function slider(root, slideSel, barsEl, prev, next, auto) {
  const slides = $$(slideSel, root); let i = 0, timer;
  barsEl.innerHTML = slides.map((_, n) => `<button type="button" aria-label="Slide ${n + 1}"></button>`).join('');
  const set = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('active', k === i)); $$('button', barsEl).forEach((b, k) => b.classList.toggle('active', k === i)); };
  barsEl.addEventListener('click', e => { const b = e.target.closest('button'); if (b) set($$('button', barsEl).indexOf(b)); });
  prev.addEventListener('click', () => set(i - 1)); next.addEventListener('click', () => set(i + 1));
  const start = () => { if (auto && !REDUCED) timer = setInterval(() => set(i + 1), auto); };
  root.addEventListener('mouseenter', () => clearInterval(timer)); root.addEventListener('mouseleave', start); root.addEventListener('focusin', () => clearInterval(timer));
  set(0); start(); return set;
}
function initHome() {
  const hero = $('[data-hero]'); slider(hero, '.slide', $('[data-hero-bars]'), $('[data-hero-prev]'), $('[data-hero-next]'), 6000);
  const pan = $('[data-panels]'); const panSet = slider(pan.parentElement, '.panel', $('[data-panel-bars]'), $('[data-panel-prev]'), $('[data-panel-next]'), 0);
  $$('.panel-tab', pan).forEach((b, n) => b.addEventListener('click', () => panSet(n)));
  const ann = $('[data-announce]'), msgs = $$('.ann-msg', ann); let ai = 0; const aset = n => { ai = (n + msgs.length) % msgs.length; msgs.forEach((m, k) => m.classList.toggle('active', k === ai)); };
  $('[data-ann-prev]').onclick = () => aset(ai - 1); $('[data-ann-next]').onclick = () => aset(ai + 1); if (!REDUCED) setInterval(() => aset(ai + 1), 5000);
  $$('.marquee-track').forEach(t => { const c = t.cloneNode(true); c.setAttribute('aria-hidden', 'true'); t.parentElement.appendChild(c); });
  renderTabs($('[data-tabs="carousel"]'), 'carousel'); renderTabs($('[data-tabs="featured"]'), 'featured');
  $('[data-spot]').innerHTML = PRODUCTS.filter(p => p.cat === $('[data-spot]').dataset.spot).map(card).join('');
  $$('.hs').forEach(h => { const p = prod(h.dataset.hs); h.innerHTML = `<button class="hs-dot" type="button" aria-label="${p.name} anzeigen"></button><div class="hs-card"><p class="label">${catOf(p).name}</p><h3>${p.name}</h3><p class="small">${fmt(p.price)}</p><a class="arrow-link" href="#product/${p.slug}">Zum Produkt →</a></div>`; });
  const bt = $('[data-bundle-total]'); bt.textContent = fmt($('[data-add-bundle]').dataset.addBundle.split(',').reduce((a, s) => a + prod(s).price, 0));
  $$('[data-ba]').forEach(st => { const r = $('input', st); r.addEventListener('input', () => st.style.setProperty('--pos', r.value + '%')); });
  $$('[data-ba-thumb]').forEach(b => b.addEventListener('click', () => { $$('[data-ba-thumb]').forEach(x => x.classList.toggle('active', x === b)); $$('[data-ba]').forEach((s, k) => s.classList.toggle('active', k === +b.dataset.baThumb)); resolveImages($$('[data-ba]')[+b.dataset.baThumb]); }));
  const vc = $('[data-vc]'), cards = $$('.vcard', vc), cnt = $('[data-vc-count]');
  const step = d => vc.scrollBy({ left: d * (cards[0].offsetWidth + 10), behavior: 'smooth' });
  $('[data-vc-prev]').onclick = () => step(-1); $('[data-vc-next]').onclick = () => step(1);
  vc.addEventListener('scroll', () => { const n = Math.min(cards.length, Math.round(vc.scrollLeft / (cards[0].offsetWidth + 10)) + 1); cnt.textContent = String(n).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0'); }, { passive: true });
  const snap = $('[data-snap]'), dots = $('[data-dots]'), items = [...snap.children];
  dots.innerHTML = items.map((_, n) => `<button type="button" aria-label="Bewertung ${n + 1}"></button>`).join('');
  const dd = $$('button', dots); dd[0].classList.add('active');
  dots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) items[dd.indexOf(b)].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }); });
  snap.addEventListener('scroll', () => { const n = Math.round(snap.scrollLeft / (items[0].offsetWidth + 12)); dd.forEach((b, k) => b.classList.toggle('active', k === n)); }, { passive: true });
}

/* ---------- Reveal ---------- */
const io = 'IntersectionObserver' in window && !REDUCED ? new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .08 }) : null;
function observeReveal(root) { $$('[data-reveal]', root).forEach(el => io ? io.observe(el) : el.classList.add('in')); }

/* ---------- Pixabay images ---------- */
const used = new Set(), cacheQ = {};
function placeholder(im) { im.onload = null; im.onerror = null; im.removeAttribute('src'); im.classList.add('noimg'); const c = im.parentElement.querySelector('.credit'); if (c) c.remove(); }
async function fetchHits(q, o, key) {
  const k = q + '|' + o; if (cacheQ[k]) return cacheQ[k];
  const r = await fetch(`https://www.navegaid.com/api/outreach/images?key=${key}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${o}&safesearch=true&per_page=10`);
  if (!r.ok) throw new Error('pixabay'); const j = await r.json(); return cacheQ[k] = j.hits || [];
}
async function resolveImages(root = document) {
  const key = PIXABAY_KEY; const list = $$('img[data-pixabay]', root).filter(i => !i.dataset.done);
  for (const im of list) {
    im.dataset.done = '1';
    if (!key || key.indexOf('__PIXABAY') === 0) { placeholder(im); continue; }
    try {
      const hits = await fetchHits(im.dataset.pixabay, im.dataset.orientation || 'all', key);
      const hit = hits.find(h => !used.has(h.id)) || hits[0]; if (!hit) { placeholder(im); continue; }
      used.add(hit.id); const big = im.closest('.slide-media, .phero, .quote, .studio, .spot-media');
      im.onerror = () => placeholder(im);
      im.onload = () => { if (!im.parentElement.querySelector('.credit')) { const c = document.createElement('span'); c.className = 'credit'; c.textContent = 'Bild: Pixabay'; im.parentElement.appendChild(c); } };
      im.src = big ? hit.largeImageURL : hit.webformatURL;
    } catch (err) { placeholder(im); }
  }
}

/* ---------- Router ---------- */
const TITLES = { home: 'Bäckerei Lindner – Brot, Gebäck und Torten aus Graz', about: 'Über uns', collections: 'Kategorien', cart: 'Warenkorb', contact: 'Kontakt' };
const activeName = () => { const p = $('.page.active'); return p ? p.dataset.page : ''; };
function route() {
  let name = decodeURIComponent(location.hash.replace('#', '')) || 'home';
  let page = $$('.page').find(p => p.dataset.page === name);
  if (!page) { name = 'home'; page = $$('.page').find(p => p.dataset.page === 'home'); }
  $$('.page').forEach(p => p.classList.toggle('active', p === page));
  let t = TITLES[name];
  if (!t && name.startsWith('product/')) t = prod(name.split('/')[1]).name;
  if (!t && name.startsWith('collection/')) t = CATS.find(c => c.slug === name.split('/')[1]).name;
  document.title = (name === 'home' ? '' : t + ' – ') + (name === 'home' ? t : SHOP.name);
  $$('[data-nav]').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + name));
  window.scrollTo(0, 0);
  if (name === 'cart') { renderCart(); renderRecs(); }
  observeReveal(page); resolveImages(page);
}
function renderRecs() { const inCart = cart.map(i => i.slug); $('[data-recs]').innerHTML = PRODUCTS.filter(p => !inCart.includes(p.slug)).slice(0, 4).map(card).join(''); resolveImages($('[data-recs]')); }

/* ---------- Init ---------- */
CATS.forEach(collectionPage); PRODUCTS.forEach(productPage); fillCollectionsList(); initHome(); saveCart();
$('[data-year]').textContent = new Date().getFullYear();
resolveImages($('.site-footer')); resolveImages($('.site-header'));
window.addEventListener('hashchange', route); route();
})();
