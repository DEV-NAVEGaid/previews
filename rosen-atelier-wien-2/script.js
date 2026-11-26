(function () {
  'use strict';
  const PIXABAY_KEY = "navegaid-images";
  document.documentElement.classList.add('js');

  const fmt = n => new Intl.NumberFormat('de-AT', { style: 'currency', currency: 'EUR' }).format(n);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const MAIL = 'hallo@rosenatelier.test';

  /* ---------- Catalogue (single source) ---------- */
  const CATS = [
    { slug: 'strausse', name: 'Sträuße', desc: 'Handgebundene Sträuße nach Saison, in Wien geliefert.', kw: 'bouquet flowers', seo: 'Unsere Sträuße entstehen jeden Morgen frisch im Atelier in der Praterstraße. Wir wählen Blüten nach Saison, binden von Hand und liefern in ganz Wien.' },
    { slug: 'pflanzen', name: 'Pflanzen', desc: 'Zimmerpflanzen, die bei uns heranwachsen und lange bleiben.', kw: 'houseplant pot', seo: 'Unsere Pflanzen wachsen im Atelier heran und ziehen mit Pflegehinweisen zu Ihnen. Von robust bis anspruchsvoll ist alles dabei.' },
    { slug: 'geschenke', name: 'Geschenke', desc: 'Vasen, Boxen und kleine Aufmerksamkeiten mit Blüten.', kw: 'gift flowers box', seo: 'Geschenke aus dem Atelier: Vasen aus Steingut und Boxen mit handgeschriebener Karte, auf Wunsch fertig verpackt.' }
  ];
  const SIZES_B = [{ l: 'Klein', add: 0 }, { l: 'Mittel', add: 10 }, { l: 'Groß', add: 20 }];
  const SIZES_P = [{ l: 'Topf 17 cm', add: 0 }, { l: 'Topf 21 cm', add: 15 }];
  const PRODUCTS = [
    { slug: 'rosenstrauss', name: 'Rosenstrauß', price: 39, cat: 'strausse', badge: 'Neu', kw: 'red rose bouquet', v: SIZES_B, vn: 'Größe', sub: 'Rosen, Eukalyptus und Schleierkraut', desc: 'Ein runder Strauß aus zwölf Rosen in Rot und Altrosa. Die Blüten öffnen sich langsam, der Duft bleibt leise. Jeder Strauß wird am Liefertag gebunden.', hl: ['12 Rosen mit Eukalyptus', 'Haltbar 7–10 Tage', 'Mit handgeschriebener Karte'], care: 'Stiele schräg anschneiden, alle zwei Tage frisches Wasser, hell und ohne direkte Sonne.' },
    { slug: 'tulpenstrauss', name: 'Tulpenstrauß', price: 24.5, cat: 'strausse', badge: 'Saison', kw: 'tulips bouquet', v: SIZES_B, vn: 'Größe', sub: 'Tulpen in Rosa und Weiß', desc: 'Frühlingstulpen mit kurzem Stiel, locker gebunden. Sie wachsen im Wasser weiter und neigen sich mit der Zeit, das gehört dazu.', hl: ['15 Tulpen', 'Aus der Region', 'Kühl stellen für längere Frische'], care: 'Wenig Wasser einfüllen, kühl stellen und Stiele alle zwei Tage anschneiden.' },
    { slug: 'wildblumenstrauss', name: 'Wildblumenstrauß', price: 29, cat: 'strausse', badge: '', kw: 'wildflowers bouquet', v: SIZES_B, vn: 'Größe', sub: 'Kornblume, Margerite und Gräser', desc: 'Locker und sommerlich: Wiesenblumen und Gräser in Blau, Weiß und Gelb. Die Zusammenstellung wechselt mit dem Angebot der Gärtner.', hl: ['Saisonale Mischung', 'Mit Gräsern', 'Handgebunden'], care: 'Täglich Wasser prüfen, welke Blüten entfernen und nicht neben Obst stellen.' },
    { slug: 'trockenstrauss', name: 'Eukalyptus-Trockenstrauß', price: 34, cat: 'strausse', badge: '', kw: 'dried flowers eucalyptus', v: null, vn: '', sub: 'Eukalyptus, Gräser und Statice', desc: 'Ein Strauß, der bleibt: getrocknete Gräser, Eukalyptus und Statice in warmen Tönen. Kein Wasser nötig, kaum Pflege.', hl: ['Ohne Wasser', 'Hält mehrere Monate', 'Warme Naturtöne'], care: 'Trocken und vor direkter Sonne geschützt aufstellen, gelegentlich abstauben.' },
    { slug: 'olivenbaum', name: 'Olivenbaum', price: 89, cat: 'pflanzen', badge: '', kw: 'olive tree pot', v: SIZES_P, vn: 'Topf', sub: 'Olea europaea, ca. 120 cm', desc: 'Ein kräftiger Olivenbaum im Terrakottatopf. Er liebt Licht, wenig Wasser und einen Platz am Südfenster oder auf dem Balkon.', hl: ['Höhe ca. 120 cm', 'Für Balkon und Wohnung', 'Im Terrakottatopf'], care: 'Hell und sonnig stellen, erst gießen, wenn die oberste Erdschicht trocken ist.' },
    { slug: 'monstera', name: 'Monstera', price: 35, cat: 'pflanzen', badge: 'Beliebt', kw: 'monstera plant', v: SIZES_P, vn: 'Topf', sub: 'Monstera deliciosa, ca. 60 cm', desc: 'Große, eingeschnittene Blätter und ein unkomplizierter Charakter. Die Monstera wächst in hellen Räumen zügig und verzeiht Pausen beim Gießen.', hl: ['Höhe ca. 60 cm', 'Pflegeleicht', 'Mit Pflegekarte'], care: 'Hell, aber ohne pralle Sonne. Wöchentlich gießen, im Winter seltener.' },
    { slug: 'zimmerfarn', name: 'Zimmerfarn', price: 18, cat: 'pflanzen', badge: '', kw: 'fern plant pot', v: SIZES_P, vn: 'Topf', sub: 'Nephrolepis, ca. 35 cm', desc: 'Ein weicher Farn für helle Bäder und Küchen. Er mag gleichmäßige Feuchtigkeit und freut sich über gelegentliches Besprühen.', hl: ['Höhe ca. 35 cm', 'Für Bad und Küche', 'Mag Luftfeuchtigkeit'], care: 'Halbschattig stellen, Erde leicht feucht halten und regelmäßig besprühen.' },
    { slug: 'steingutvase', name: 'Steingutvase', price: 32, cat: 'geschenke', badge: '', kw: 'ceramic vase', v: null, vn: '', sub: 'Handgetöpfert, Höhe 22 cm', desc: 'Eine schlichte Vase aus Steingut mit mattweißer Glasur, gefertigt von einer Töpferei in Wien. Passt zu Sträußen aller Größen.', hl: ['Höhe 22 cm', 'Handgetöpfert in Wien', 'Wasserdicht glasiert'], care: 'Mit der Hand spülen, nicht in die Spülmaschine geben.' },
    { slug: 'geschenkbox-saison', name: 'Geschenkbox Saison', price: 45, cat: 'geschenke', badge: 'Limitiert', kw: 'gift box flowers', v: null, vn: '', sub: 'Kleiner Strauß, Kerze und Karte', desc: 'Ein kleiner Strauß der Saison, eine Duftkerze und eine handgeschriebene Karte in einer Box. Fertig verpackt, auf Wunsch geliefert.', hl: ['Strauß, Kerze und Karte', 'Fertig verpackt', 'Lieferung in Wien'], care: 'Strauß aus der Box nehmen, anschneiden und in eine Vase mit frischem Wasser stellen.' }
  ];
  const byslug = s => PRODUCTS.find(p => p.slug === s);
  const bycat = c => PRODUCTS.filter(p => p.cat === c);
  const catOf = s => CATS.find(c => c.slug === s);

  /* ---------- Cart ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('ra-cart') || '[]'); } catch (e) { cart = []; }
  const saveCart = () => { localStorage.setItem('ra-cart', JSON.stringify(cart)); updateBadge(); };
  const unit = (p, vi) => p.price + (p.v && p.v[vi] ? p.v[vi].add : 0);
  function addToCart(slug, vi, qty) {
    const f = cart.find(l => l.s === slug && l.v === vi);
    if (f) f.q += qty; else cart.push({ s: slug, v: vi, q: qty });
    saveCart();
  }
  function updateBadge() { const n = cart.reduce((a, l) => a + l.q, 0); $$('[data-cart-count]').forEach(e => e.textContent = n); }

  /* ---------- Rendering helpers ---------- */
  function card(p) {
    return `<article class="card"><div class="card__img">${p.badge ? `<span class="card__badge">${p.badge}</span>` : ''}<img data-pixabay="${p.kw}" data-orientation="vertical" alt="${p.name}, ${p.sub}" width="800" height="1000"></div>
    <div class="card__meta"><p class="label">${catOf(p.cat).name}</p><h3>${p.name}</h3><p class="card__price">${p.v ? 'ab ' : ''}${fmt(p.price)}</p></div>
    <a class="card__link" href="#product/${p.slug}" aria-label="${p.name} ansehen"></a>
    <button class="btn btn--sm card__add" data-add="${p.slug}">In den Warenkorb</button></article>`;
  }
  const grid = (list, cls = 'grid--4') => `<div class="grid ${cls}">${list.map(card).join('')}</div>`;

  function makePage(name, html) {
    const s = document.createElement('section');
    s.className = 'page'; s.dataset.page = name; s.id = name; s.hidden = true; s.innerHTML = html;
    $('#main').appendChild(s); return s;
  }

  /* ---------- Build dynamic pages ---------- */
  function buildCollections() {
    // list page
    $('#colCount').textContent = (CATS.length) + ' Kollektionen · ' + PRODUCTS.length + ' Produkte';
    $('#colList').innerHTML = CATS.map(c => `<a class="ccard" href="#collection/${c.slug}"><img data-pixabay="${c.kw}" data-orientation="vertical" alt="${c.name}" width="800" height="1000"><h3>${c.name}</h3><p class="label">${bycat(c.slug).length} Produkte</p><p>${c.desc}</p></a>`).join('')
      + `<a class="ccard" href="#collection/alle"><img data-pixabay="flower shop bouquets plants" data-orientation="vertical" alt="Alle Produkte" width="800" height="1000"><h3>Alle Produkte</h3><p class="label">${PRODUCTS.length} Produkte</p><p>Das gesamte Sortiment auf einen Blick.</p></a>`;

    const all = [{ slug: 'alle', name: 'Alle Produkte', desc: 'Sträuße, Pflanzen und Geschenke aus dem Atelier.', seo: 'Das gesamte Sortiment von Rosen Atelier: frische Sträuße, Zimmerpflanzen und Geschenke. Wir liefern in Wien und beraten Sie gern zur Hochzeitsfloristik.' }].concat(CATS);
    all.forEach(c => {
      const chips = `<div class="chips"><a href="#collection/alle" class="${c.slug === 'alle' ? 'on' : ''}">Alle</a>${CATS.map(k => `<a href="#collection/${k.slug}" class="${k.slug === c.slug ? 'on' : ''}">${k.name}</a>`).join('')}</div>`;
      const pg = makePage('collection/' + c.slug, `
        <header class="pagehead"><p class="label"><a href="#home">Start</a> / <a href="#collections">Kollektionen</a> / ${c.name}</p><h1>${c.name}.</h1><p>${c.desc}</p></header>
        ${chips}
        <div class="bar"><label>Preis <select data-f="price"><option value="">Alle</option><option value="30">bis 30 €</option><option value="60">30–60 €</option><option value="61">über 60 €</option></select></label>
        <label>Sortieren <select data-f="sort"><option value="">Empfohlen</option><option value="pa">Preis aufsteigend</option><option value="pd">Preis absteigend</option><option value="n">Name A–Z</option></select></label><span class="label count"></span></div>
        <section><div class="grid grid--3 cgrid"></div></section>
        <section class="seo"><h2>Über diese Kollektion</h2><p>${c.seo}</p></section>
        <section class="usp"><div><h3>Lieferung in Wien</h3><p>Am selben Tag</p></div><div><h3>Hochzeitsfloristik</h3><p>Persönlich beraten</p></div><div><h3>Täglich frisch</h3><p>Aus der Praterstraße</p></div><div><h3>Direkt erreichbar</h3><p>+43 1 234 5679</p></div></section>`);
      const render = () => {
        let list = c.slug === 'alle' ? PRODUCTS.slice() : bycat(c.slug);
        const pr = $('[data-f=price]', pg).value, so = $('[data-f=sort]', pg).value;
        if (pr === '30') list = list.filter(p => p.price <= 30);
        if (pr === '60') list = list.filter(p => p.price > 30 && p.price <= 60);
        if (pr === '61') list = list.filter(p => p.price > 60);
        if (so === 'pa') list.sort((a, b) => a.price - b.price);
        if (so === 'pd') list.sort((a, b) => b.price - a.price);
        if (so === 'n') list.sort((a, b) => a.name.localeCompare(b.name, 'de'));
        const g = $('.cgrid', pg);
        const cards = list.map(card);
        const promo = `<div class="promo-tile"><p class="label">Hochzeitsfloristik</p><h3>Ihr Tag in Blüte.</h3><p>Wir beraten Sie persönlich im Atelier.</p><a class="btn btn--inv" href="#contact">↗ Termin anfragen</a></div>`;
        if (cards.length >= 3) cards.splice(3, 0, promo);
        g.innerHTML = list.length ? cards.join('') : `<div class="empty" style="grid-column:1/-1"><h2>Nichts gefunden.</h2><p>Versuchen Sie einen anderen Preisfilter.</p></div>`;
        $('.count', pg).textContent = list.length + ' Produkte';
        resolveImages(pg);
      };
      $$('select', pg).forEach(s => s.addEventListener('change', render));
      pg._render = render; render();
    });
  }

  function buildProducts() {
    PRODUCTS.forEach(p => {
      const c = catOf(p.cat);
      const rel = bycat(p.cat).filter(x => x !== p).concat(PRODUCTS.filter(x => x.cat !== p.cat)).slice(0, 4);
      const pg = makePage('product/' + p.slug, `
        <nav class="crumbs label" aria-label="Brotkrumen"><a href="#home">Start</a> / <a href="#collection/${c.slug}">${c.name}</a> / ${p.name}</nav>
        <section class="pdp">
          <div class="pdp__gal"><img data-pixabay="${p.kw}" data-orientation="vertical" data-large="1" alt="${p.name}, ${p.sub}" width="1200" height="1500">
            <div class="pdp__thumbs"><img data-pixabay="${p.kw} closeup" data-orientation="vertical" alt="${p.name} in der Nahaufnahme" width="400" height="400"><img data-pixabay="${p.kw} interior" data-orientation="vertical" alt="${p.name} im Wohnraum" width="400" height="400"><img data-pixabay="${p.kw} hands" data-orientation="vertical" alt="${p.name} in den Händen" width="400" height="400"></div></div>
          <div class="pdp__info">
            <p class="label">${c.name}${p.badge ? ' · ' + p.badge : ''}</p>
            <h1>${p.name}</h1>
            <p class="label">4,9 ★ · 62 Google-Bewertungen</p>
            <p class="sub">${p.sub}</p>
            <p class="pdp__price" data-price>${fmt(p.price)}</p>
            <p>${p.desc}</p>
            <ul class="claims">${p.hl.map(h => `<li>${h}</li>`).join('')}</ul>
            ${p.v ? `<div><p class="label">${p.vn}</p><div class="opts" data-opts>${p.v.map((v, i) => `<button type="button" class="opt" data-vi="${i}" aria-pressed="${i === 0}">${v.l}</button>`).join('')}</div></div>` : ''}
            <div class="buy"><div class="qty"><button type="button" data-q="-1" aria-label="Menge verringern">−</button><span data-qv>1</span><button type="button" data-q="1" aria-label="Menge erhöhen">+</button></div><button class="btn btn--dark" type="button" data-buy="${p.slug}">In den Warenkorb</button></div>
            <p class="helper" data-msg></p>
            <details class="acc" open><summary>Details</summary><p>${p.desc}</p></details>
            <details class="acc"><summary>Pflege</summary><p>${p.care}</p></details>
            <details class="acc"><summary>Lieferung</summary><p>Lieferung in Wien am selben Tag bei Bestellung bis 14:00. Abholung in der Praterstraße 12, Mo–Fr 9:00–18:00, Sa 9:00–14:01.</p></details>
          </div>
        </section>
        <section><div class="section-head"><p class="label">Details</p><h2>Was es besonders macht.</h2></div>
          <ul class="notes">${p.hl.concat(['Frisch gebunden', 'Aus Wien', 'Mit Karte']).map((h, i) => `<li><span class="sw">${i + 1}</span><p class="label">${h}</p></li>`).join('')}</ul></section>
        <section class="diptych" style="margin-top:var(--section-gap)"><div class="diptych__img"><img data-pixabay="${p.kw} florist" data-orientation="vertical" alt="${p.name} im Atelier" width="1200" height="1500"></div><div class="panel"><p class="label">Die Geschichte</p><h2>Aus dem Atelier.</h2><p>${p.name} entsteht in der Praterstraße, von Hand und nach Saison. Wir wählen jede Blüte und jede Pflanze einzeln aus und legen eine Pflegekarte bei.</p></div></section>
        <section><div class="section-head"><p class="label">Angaben</p><h2>Auf einen Blick.</h2></div>
          <div class="spec"><div><span class="label">Produkt</span><span>${p.name}</span></div><div><span class="label">Kategorie</span><span>${c.name}</span></div><div><span class="label">Preis</span><span>ab ${fmt(p.price)}</span></div><div><span class="label">Herkunft</span><span>Wien und Umland</span></div><div><span class="label">Lieferung</span><span>In Wien, am selben Tag</span></div></div></section>
        <section class="reviews"><div><p class="label">Bewertungen</p><h2>4,9 von 5.</h2><p>62 Bewertungen auf Google.</p></div>
          <div><div class="review"><p class="label">★★★★★ · Katharina M.</p><p>Wunderschön gebunden und pünktlich geliefert.</p></div><div class="review"><p class="label">★★★★★ · Jonas P.</p><p>Hielt länger, als ich erwartet hatte. Danke für die Pflegekarte.</p></div><div class="review"><p class="label">★★★★★ · Sabine R.</p><p>Freundliche Beratung und ein sehr schöner Strauß.</p></div></div></section>
        <section><div class="tabs__head"><h2>Das könnte Ihnen gefallen.</h2><a class="arrow-link" href="#collection/${c.slug}"><span class="arrow-link__ic">↗</span>Alle ${c.name}</a></div>${grid(rel)}</section>
        <section class="usp"><div><h3>Lieferung in Wien</h3><p>Am selben Tag</p></div><div><h3>Hochzeitsfloristik</h3><p>Persönlich beraten</p></div><div><h3>Täglich frisch</h3><p>Aus der Praterstraße</p></div><div><h3>Direkt erreichbar</h3><p>+43 1 234 5679</p></div></section>`);
      let vi = 0, q = 1;
      const upd = () => { $('[data-price]', pg).textContent = fmt(unit(p, vi) * q); $('[data-qv]', pg).textContent = q; };
      $$('[data-vi]', pg).forEach(b => b.addEventListener('click', () => { vi = +b.dataset.vi; $$('[data-vi]', pg).forEach(x => x.setAttribute('aria-pressed', x === b)); upd(); }));
      $$('[data-q]', pg).forEach(b => b.addEventListener('click', () => { q = Math.max(1, Math.min(20, q + +b.dataset.q)); upd(); }));
      $('[data-buy]', pg).addEventListener('click', () => { addToCart(p.slug, vi, q); $('[data-msg]', pg).innerHTML = `${p.name} liegt im Warenkorb. <a href="#cart">Warenkorb ansehen</a>`; });
    });
  }

  /* ---------- Home dynamic bits ---------- */
  function buildHome() {
    const pills = $('#tabPills'), panels = $('#tabPanels');
    CATS.forEach((c, i) => {
      const b = document.createElement('button'); b.className = 'pill'; b.type = 'button'; b.role = 'tab'; b.textContent = c.name; b.setAttribute('aria-selected', i === 0); pills.appendChild(b);
      const d = document.createElement('div'); d.role = 'tabpanel'; d.hidden = i !== 0; d.innerHTML = grid(bycat(c.slug)); panels.appendChild(d);
      b.addEventListener('click', () => { $$('.pill', pills).forEach((x, k) => { x.setAttribute('aria-selected', x === b); panels.children[k].hidden = x !== b; }); resolveImages($('[data-page=home]')); });
    });
    $('#homeAll').innerHTML = PRODUCTS.slice(0, 8).map(card).join('');
    $('#spotLinks').innerHTML = bycat('pflanzen').map(p => `<a href="#product/${p.slug}">${p.name} · ${fmt(p.price)}</a>`).join('');
  }

  /* ---------- Cart page ---------- */
  function renderCart() {
    const body = $('#cartBody'); const free = $('#freeNote');
    if (!cart.length) { body.style.display = 'block'; body.innerHTML = `<div class="empty"><h2>Noch nichts im Warenkorb.</h2><p>Ihr Warenkorb wartet auf den ersten Strauß.</p><a class="btn btn--dark" href="#collection/alle">↗ Zum Sortiment</a></div>`; free.textContent = ''; return; }
    body.style.display = '';
    let sub = 0, lines = '';
    cart.forEach((l, i) => {
      const p = byslug(l.s); const u = unit(p, l.v); sub += u * l.q;
      lines += `<div class="line"><img data-pixabay="${p.kw}" data-orientation="vertical" alt="${p.name}" width="192" height="240"><div><h3>${p.name}</h3><p class="label">${p.v ? p.v[l.v].l : catOf(p.cat).name}</p><p>${fmt(u)}</p><button class="linkbtn" data-rm="${i}">Entfernen</button></div><div class="line__sum"><div class="qty"><button data-cq="${i}" data-d="-1" aria-label="Menge verringern">−</button><span>${l.q}</span><button data-cq="${i}" data-d="1" aria-label="Menge erhöhen">+</button></div><p>${fmt(u * l.q)}</p></div></div>`;
    });
    const body2 = cart.map(l => { const p = byslug(l.s); return `${l.q} × ${p.name}${p.v ? ' (' + p.v[l.v].l + ')' : ''} – ${fmt(unit(p, l.v) * l.q)}`; }).join('\n');
    const mail = `mailto:${MAIL}?subject=${encodeURIComponent('Bestellung Rosen Atelier')}&body=${encodeURIComponent('Guten Tag,\n\nich möchte gerne bestellen:\n\n' + body2 + '\n\nZwischensumme: ' + fmt(sub) + '\n\nLieferadresse in Wien:\nWunschtermin:\nName und Telefon:\n')}`;
    body.innerHTML = `<div>${lines}</div><div class="summary"><h3>Zusammenfassung</h3><div class="sum-row"><span>Zwischensumme</span><strong>${fmt(sub)}</strong></div><p class="helper">Lieferung in Wien wird bei der Bestätigung berechnet. Bezahlt wird nach Absprache, Abholung oder Lieferung.</p><a class="btn btn--dark" href="${mail}">Bestellung per E-Mail senden</a><a class="btn" href="tel:+4312345679">↗ Telefonisch bestellen</a></div>`;
    free.textContent = 'Lieferung in Wien · Bestellung per E-Mail oder Telefon';
    resolveImages($('[data-page=cart]'));
  }
  document.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    if (t.dataset.add) { addToCart(t.dataset.add, 0, 1); const o = t.textContent; t.textContent = 'Hinzugefügt'; setTimeout(() => t.textContent = o, 1400); }
    if (t.dataset.rm !== undefined) { cart.splice(+t.dataset.rm, 1); saveCart(); renderCart(); }
    if (t.dataset.cq !== undefined) { const l = cart[+t.dataset.cq]; l.q += +t.dataset.d; if (l.q < 1) cart.splice(+t.dataset.cq, 1); saveCart(); renderCart(); }
  });

  /* ---------- Router ---------- */
  function route() {
    let h = decodeURIComponent(location.hash.slice(1)) || 'home';
    let el = $(`.page[data-page="${h}"]`);
    if (!el) { h = '404'; el = $('.page[data-page="404"]'); }
    $$('.page').forEach(p => p.hidden = p !== el);
    if (h === 'cart') renderCart();
    const title = el.querySelector('h1');
    document.title = (title && h !== 'home' ? title.textContent.replace(/\.$/, '') + ' – ' : '') + 'Rosen Atelier – Blumengeschäft in Wien';
    $$('.nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + h));
    closeMenu(); window.scrollTo(0, 0);
    resolveImages(el); observe(el);
  }

  /* ---------- Menu ---------- */
  const menu = $('#menu'), mb = $('#menuBtn');
  function closeMenu() { menu.hidden = true; mb.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  mb.addEventListener('click', () => { menu.hidden = false; mb.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; });
  $('#menuClose').addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Announcement + hero + testimonials + expanding ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cycler(items, cls, cb) {
    let i = items.findIndex(x => x.classList.contains(cls)); if (i < 0) i = 0;
    return d => { items[i].classList.remove(cls); i = (i + d + items.length) % items.length; items[i].classList.add(cls); cb && cb(i); };
  }
  const ann = cycler($$('.announce__msg'), 'on');
  $$('[data-ann]').forEach(b => b.addEventListener('click', () => ann(+b.dataset.ann)));
  const hero = cycler($$('.hero__slide'), 'on', i => $('#heroNow').textContent = '0' + (i + 1));
  $$('[data-hero]').forEach(b => b.addEventListener('click', () => hero(+b.dataset.hero)));
  let timers = [];
  if (!reduce) { timers.push(setInterval(() => ann(1), 5000)); timers.push(setInterval(() => { if (!location.hash || location.hash === '#home') hero(1); }, 6000)); }
  const testi = cycler($$('#testi blockquote'), 'on', i => $('#testiNow').textContent = '0' + (i + 1));
  $$('[data-testi]').forEach(b => b.addEventListener('click', () => testi(+b.dataset.testi)));
  const xps = $$('.xp');
  const xpc = cycler(xps, 'on');
  xps.forEach(x => $('.xp__tog', x).addEventListener('click', () => { xps.forEach(y => y.classList.remove('on')); x.classList.add('on'); }));
  $$('[data-xp]').forEach(b => b.addEventListener('click', () => xpc(+b.dataset.xp)));

  /* marquee: duplicate track for seamless loop */
  $$('.marquee').forEach(m => { const t = $('.marquee__track', m); m.appendChild(t.cloneNode(true)); });

  /* hotspots */
  const hsCard = $('#hsCard');
  $$('[data-hs]').forEach(d => d.addEventListener('click', e => {
    e.stopPropagation();
    const p = byslug(d.dataset.hs);
    hsCard.innerHTML = `<img data-pixabay="${p.kw}" data-orientation="vertical" alt="${p.name}" width="160" height="200"><div><h3>${p.name}</h3><p>${fmt(p.price)}</p><a class="arrow-link" href="#product/${p.slug}"><span class="arrow-link__ic">↗</span>Ansehen</a></div>`;
    hsCard.hidden = false; resolveImages(hsCard);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.hs-card, .dot')) hsCard.hidden = true; });

  /* before / after */
  const baR = $('#baRange');
  baR.addEventListener('input', () => { $('.ba__before').style.clipPath = `inset(0 ${100 - baR.value}% 0 0)`; $('#baLine').style.left = baR.value + '%'; });

  /* ---------- Forms ---------- */
  const cf = $('#contactForm');
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const f = cf.elements; let ok = true;
    const chk = (id, bad, msg) => { const er = $(`[data-err=${id}]`); er.hidden = !bad; er.textContent = bad ? '— ' + msg : ''; if (bad) ok = false; };
    chk('cName', !f.name.value.trim(), 'Bitte nennen Sie uns Ihren Namen');
    chk('cMail', !/^\S+@\S+\.\S+$/.test(f.email.value), 'Bitte geben Sie eine vollständige E-Mail-Adresse an');
    chk('cMsg', !f.message.value.trim(), 'Bitte schreiben Sie uns eine kurze Nachricht');
    if (!ok) return;
    const body = `Name: ${f.name.value}\nE-Mail: ${f.email.value}\n\n${f.message.value}`;
    $('#contactOk').hidden = false;
    location.href = `mailto:${MAIL}?subject=${encodeURIComponent(f.subject.value)}&body=${encodeURIComponent(body)}`;
  });
  $('#nlForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#nlMail').value; if (v) location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Newsletter-Anmeldung')}&body=${encodeURIComponent('Bitte tragen Sie mich ein: ' + v)}`; });

  /* newsletter popup after 6 s */
  const pop = $('#popup');
  const popSeen = () => { try { return Date.now() - +localStorage.getItem('ra-pop') < 30 * 864e5; } catch (e) { return false; } };
  const popClose = () => { try { localStorage.setItem('ra-pop', Date.now()); } catch (e) {} pop.close(); };
  setTimeout(() => { if (!popSeen() && pop.showModal) { pop.showModal(); resolveImages(pop); } }, 6000);
  $('#popX').addEventListener('click', popClose); $('#popNo').addEventListener('click', popClose);
  $('#popForm').addEventListener('submit', e => { e.preventDefault(); const v = $('#popMail').value; popClose(); if (v) location.href = `mailto:${MAIL}?subject=${encodeURIComponent('Newsletter-Anmeldung')}&body=${encodeURIComponent('Bitte tragen Sie mich ein: ' + v)}`; });

  /* ---------- Reveal ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .08 }) : null;
  function observe(root) { $$('.rv:not(.in)', root).forEach(el => io ? io.observe(el) : el.classList.add('in')); }

  /* ---------- Pixabay images ---------- */
  const cache = new Map();
  function search(q, orient) {
    const key = q + '|' + orient;
    if (!cache.has(key)) {
      const url = `https://www.navegaid.com/api/outreach/images?key=${PIXABAY_KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${orient}&safesearch=true&per_page=10`;
      cache.set(key, fetch(url).then(r => r.ok ? r.json() : Promise.reject()).then(j => j.hits || []).catch(() => []));
    }
    return cache.get(key);
  }
  function placeholder(img) { img.onload = null; img.removeAttribute('src'); img.classList.add('ph'); }
  function resolveImages(root) {
    const used = new Set($$('img[data-done]', root.closest('.page') || document).map(i => i.src));
    $$('img[data-pixabay]:not([data-done])', root).forEach(img => {
      img.dataset.done = '1';
      if (!PIXABAY_KEY || PIXABAY_KEY.indexOf('__') === 0) { placeholder(img); return; }
      search(img.dataset.pixabay, img.dataset.orientation || 'all').then(hits => {
        const pick = hits.find(h => !used.has(h.webformatURL) && !used.has(h.largeImageURL)) || hits[0];
        if (!pick) { placeholder(img); return; }
        const src = img.dataset.large ? pick.largeImageURL : pick.webformatURL;
        used.add(src);
        img.onerror = () => placeholder(img);
        img.onload = () => { if (img.parentElement) img.parentElement.setAttribute('data-credit', 'Bild: Pixabay'); };
        img.src = src;
      });
    });
  }

  /* ---------- Init ---------- */
  $('#year').textContent = new Date().getFullYear();
  buildHome(); buildCollections(); buildProducts(); updateBadge();
  window.addEventListener('hashchange', route);
  route();
})();
