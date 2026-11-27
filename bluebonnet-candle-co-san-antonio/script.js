const PIXABAY_KEY = "navegaid-images";
const EMAIL = "hi@bluebonnetcandle.test";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const money = n => "$" + (Number.isInteger(n) ? n : n.toFixed(2));

/* ---------- Catalogue ---------- */
const CATS = [
  { slug: "candles", name: "Candles", desc: "Jar candles poured in soy wax with cotton wicks, in four Texas-inspired scents." },
  { slug: "gifts", name: "Gifts", desc: "Sets, wax melts and a workshop voucher, packed by hand for giving." },
  { slug: "wedding-favors", name: "Wedding favors", desc: "Tins and jar candles with custom labels, made to order for weddings and events." }
];
const SIZES = [{ l: "8 oz", add: 0 }, { l: "12 oz", add: 8 }];
const PRODUCTS = [
  { slug: "lavender-soy-candle", name: "Lavender Soy Candle", price: 18, cat: "candles", badge: "New", q: "lavender candle jar", sizes: true,
    desc: "Hill Country lavender with a thread of cedar and a soft vanilla finish. Poured in soy wax with a cotton wick in an amber glass jar.",
    hl: ["Soy wax, cotton wick", "Up to 50 hours in the 12 oz jar", "Poured by hand in San Antonio"] },
  { slug: "cedar-smoke-candle", name: "Cedar & Smoke Candle", price: 22, cat: "candles", badge: "", q: "cedar candle wood", sizes: true,
    desc: "Texas cedar, a little campfire smoke and warm amber. A candle for cool evenings and a clear head.",
    hl: ["Soy wax, cotton wick", "Smoky, woody, warm", "Poured by hand in San Antonio"] },
  { slug: "bluebonnet-honey-candle", name: "Bluebonnet Honey Candle", price: 20, cat: "candles", badge: "", q: "honey candle flowers", sizes: true,
    desc: "Wildflower honey, soft petals and a touch of vanilla bean. The scent of a Hill Country spring in a jar.",
    hl: ["Soy wax, cotton wick", "Sweet, floral, light", "Seasonal favorite"] },
  { slug: "prickly-pear-candle", name: "Prickly Pear Candle", price: 24, cat: "candles", badge: "", q: "pink candle cactus", sizes: true,
    desc: "Bright prickly pear, watermelon rind and a hint of lime. Fresh and a little sunny, even in January.",
    hl: ["Soy wax, cotton wick", "Fruity, fresh, bright", "Fills a small room in minutes"] },
  { slug: "wax-melt-trio", name: "Wax Melt Trio", price: 15, cat: "gifts", badge: "", q: "wax melts", sizes: false,
    desc: "Three snap-bar wax melts in lavender, cedar and honey. Flame-free, for warmers and small rooms.",
    hl: ["Three 2 oz bars", "Flame-free scent", "Packed in a kraft sleeve"] },
  { slug: "texas-sampler-set", name: "Texas Sampler Set", price: 36, cat: "gifts", badge: "Gift", q: "candle gift set", sizes: false,
    desc: "Three 4 oz jars in our favorite scents, packed in a kraft box with a handwritten note.",
    hl: ["Three 4 oz jars", "Handwritten note included", "Gift-ready box"] },
  { slug: "matchbox-snuffer-set", name: "Matchbox & Snuffer Set", price: 14, cat: "gifts", badge: "", q: "candle snuffer matches", sizes: false,
    desc: "A brass snuffer and a long matchbox, for lighting and putting out a candle without smoke.",
    hl: ["Brass snuffer", "Long safety matches", "Fits every jar we make"] },
  { slug: "candle-workshop-voucher", name: "Candle-Making Workshop Voucher", price: 65, cat: "gifts", badge: "", q: "candle workshop", sizes: false,
    desc: "One seat at a candle-making workshop in our South Alamo studio. Pour and take home your own two jars.",
    hl: ["Two hours, all materials", "Take home two candles", "Valid for 12 months"] },
  { slug: "mini-favor-tins-12", name: "Mini Favor Tins, 12 pack", price: 54, cat: "wedding-favors", badge: "", q: "candle tins wedding", sizes: false,
    desc: "Twelve 2 oz travel tins with a plain kraft label. Choose a scent when you order, ready in about two weeks.",
    hl: ["Twelve 2 oz tins", "Choose one scent", "Ready in about two weeks"] },
  { slug: "custom-label-favor-candles", name: "Custom Label Favor Candles, 24 pack", price: 96, cat: "wedding-favors", badge: "", q: "custom label candles", sizes: false,
    desc: "Twenty-four 4 oz jar candles with a label carrying your names and date. We send a proof before we pour.",
    hl: ["Twenty-four 4 oz jars", "Names and date on the label", "Proof before pouring"] }
];
const INFO = {
  candles: { facts: [["Wax", "Soy blend"], ["Wick", "Cotton"], ["Jar", "Recyclable glass"], ["Burn", "Up to 50 h"], ["Poured", "San Antonio"], ["Cure", "One week"]],
    specs: [["Wax", "100% soy blend, no paraffin"], ["Wick", "Lead-free cotton"], ["Fragrance", "Skin-safe fragrance oils"], ["Jar", "Recyclable glass, metal lid"], ["Care", "Trim the wick to ¼ inch"]] },
  gifts: { facts: [["Packed", "By hand"], ["Wrap", "Kraft and twine"], ["Note", "Handwritten"], ["Pickup", "Alamo St"], ["Ships", "In 2 days"], ["Made", "In Texas"]],
    specs: [["Materials", "Soy wax, cotton, brass or kraft"], ["Packaging", "Recyclable kraft"], ["Made", "In our San Antonio studio"], ["Care", "Keep away from heat and drafts"], ["Gift note", "Ask at checkout by email"]] },
  "wedding-favors": { facts: [["Label", "Custom"], ["Lead time", "2 weeks"], ["Minimum", "12 favors"], ["Proof", "Before pouring"], ["Pickup", "Alamo St"], ["Made", "In Texas"]],
    specs: [["Wax", "100% soy blend"], ["Containers", "Tins or glass jars"], ["Labels", "Printed with your names and date"], ["Lead time", "About two weeks, longer in peak season"], ["Order", "Email or call to confirm details"]] }
};
const bySlug = s => PRODUCTS.find(p => p.slug === s);
const catName = s => (CATS.find(c => c.slug === s) || { name: "All" }).name;
const price = (p, i = 0) => p.price + (p.sizes ? SIZES[i].add : 0);

/* ---------- Images (Pixabay) ---------- */
const imgCache = {}, imgUse = {};
function ph(q, ori, alt, w, h, cls = "r45") {
  return `<div class="ph ${cls}"><img data-pixabay="${q}" data-orientation="${ori}" alt="${alt}" width="${w}" height="${h}"></div>`;
}
function fail(img) {
  img.onload = null;
  const box = img.closest(".ph"); if (box) box.classList.add("is-ph");
}
async function resolveImages(root) {
  $$("img[data-pixabay]:not([data-done])", root).forEach(async img => {
    img.dataset.done = "1";
    if (!PIXABAY_KEY) return fail(img);
    const q = img.dataset.pixabay, ori = img.dataset.orientation || "all";
    const k = q + "|" + ori;
    try {
      if (!imgCache[k]) {
        const url = `https://www.navegaid.com/api/outreach/images?key=${PIXABAY_KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${ori}&safesearch=true&per_page=10`;
        imgCache[k] = fetch(url).then(r => { if (!r.ok) throw 0; return r.json(); }).then(d => d.hits || []);
      }
      const hits = await imgCache[k];
      if (!hits.length) return fail(img);
      imgUse[k] = (imgUse[k] || 0);
      const hit = hits[imgUse[k]++ % hits.length];
      const big = img.closest(".slide, .page-hero, .quote, .studio, .spot-media");
      img.onerror = () => fail(img);
      img.onload = () => {
        const box = img.closest(".ph");
        if (box && !$(".credit", box)) { const c = document.createElement("span"); c.className = "credit"; c.textContent = "Image: Pixabay"; box.appendChild(c); }
      };
      img.src = big ? (hit.largeImageURL || hit.webformatURL) : hit.webformatURL;
    } catch (e) { fail(img); }
  });
}

/* ---------- Cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("bb-cart") || "[]"); } catch (e) { cart = []; }
const saveCart = () => { localStorage.setItem("bb-cart", JSON.stringify(cart)); $$("[data-cart-count]").forEach(n => n.textContent = cart.reduce((a, i) => a + i.qty, 0)); };
function toast(msg) { const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }
function addCart(slug, size = 0, qty = 1) {
  const f = cart.find(i => i.slug === slug && i.size === size);
  f ? f.qty += qty : cart.push({ slug, size, qty });
  saveCart(); toast("Added to cart.");
}

/* ---------- Templates ---------- */
function card(p) {
  return `<article class="pcard">${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
    <a class="cover" href="#product/${p.slug}" aria-label="${p.name}">${ph(p.q, "vertical", p.name + " by Bluebonnet Candle Co.", 400, 500)}</a>
    <h3><a href="#product/${p.slug}">${p.name}</a></h3>
    <span class="price">${p.sizes ? "From " : ""}${money(p.price)}</span>
    <span class="brand">Bluebonnet</span>
    <button class="quick" data-add="${p.slug}">Add to cart</button></article>`;
}
const USP = `<section class="usp"><div><b>Local pickup</b><span>1420 S Alamo St, Tue–Sat</span></div><div><b>Custom favors</b><span>Labels made to order</span></div><div><b>Handmade in Texas</b><span>Poured in small batches</span></div><div><b>Talk to a person</b><span>(210) 555-0178</span></div></section>`;

/* ---------- Pages ---------- */
function renderCollection(slug, qs) {
  const el = $("#dyn");
  const cat = CATS.find(c => c.slug === slug);
  const sort = qs.get("sort") || "featured", pr = qs.get("price") || "any", q = (qs.get("q") || "").toLowerCase();
  let list = PRODUCTS.filter(p => slug === "all" || p.cat === slug);
  if (q) list = list.filter(p => (p.name + " " + p.desc).toLowerCase().includes(q));
  if (pr === "u25") list = list.filter(p => p.price < 25);
  if (pr === "m") list = list.filter(p => p.price >= 25 && p.price <= 50);
  if (pr === "o50") list = list.filter(p => p.price > 50);
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  const title = q ? `Search: ${qs.get("q")}` : cat ? cat.name : "All products";
  const desc = cat ? cat.desc : "Every candle, gift and wedding favor we make, poured by hand in San Antonio.";
  const items = list.map(card);
  if (items.length >= 3) items.splice(3, 0, `<div class="promo-tile"><p class="label">Featured offer</p><h3>Texas Sampler Set</h3><p>Three 4 oz jars in a gift box, $36.</p><a class="pill" href="#product/texas-sampler-set">Shop now</a></div>`);
  const sel = (n, v, t) => `<option value="${v}" ${n === v ? "selected" : ""}>${t}</option>`;
  el.innerHTML = `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a> / <a href="#collections">Collections</a> / <span aria-current="page">${title}</span></nav>
  <header class="page-head"><h1 class="h-display">${title}</h1><p class="muted">${desc}</p></header>
  <div class="filters"><label class="sr" for="f-price">Price</label><select id="f-price" data-f="price">${sel(pr, "any", "Price: any")}${sel(pr, "u25", "Under $25")}${sel(pr, "m", "$25–$50")}${sel(pr, "o50", "Over $50")}</select>
  <label class="sr" for="f-sort">Sort</label><select id="f-sort" data-f="sort">${sel(sort, "featured", "Sort: featured")}${sel(sort, "low", "Price, low to high")}${sel(sort, "high", "Price, high to low")}${sel(sort, "name", "Name")}</select>
  <span class="count">${list.length} products</span></div>
  ${list.length ? `<div class="grid">${items.join("")}</div>` : `<p>Nothing found. Try another price range or <a href="#collection/all">see all products</a>.</p>`}
  <div class="seo"><h2 class="h-sub">About this collection</h2><p class="muted">${desc} Pick up at 1420 S Alamo St, Tue–Sat 10:00–18:00 and Sun 12:00–16:00, or ask us about shipping.</p></div></div>${USP}`;
  $$("[data-f]", el).forEach(s => s.onchange = () => {
    const n = new URLSearchParams(qs); n.set(s.dataset.f, s.value); location.hash = `collection/${slug}?${n}`;
  });
  document.title = `${title} — Bluebonnet Candle Co.`;
}

function renderProduct(slug) {
  const p = bySlug(slug), el = $("#dyn"), info = INFO[p.cat];
  let size = 0, qty = 1;
  const others = PRODUCTS.filter(x => x.slug !== slug);
  const related = [...others.filter(x => x.cat === p.cat), ...others.filter(x => x.cat !== p.cat)].slice(0, 4);
  const bund = related.slice(0, 2);
  const reviews = [["Marisol R.", "San Antonio", `The ${p.name} filled our living room without being loud.`], ["Dan T.", "Alamo Heights", "Burned evenly to the last half inch. Packed beautifully."], ["Priya K.", "Southtown", "Picked it up at the studio and the team wrapped it on the spot."]];
  const thumbs = [p.q, p.q + " closeup", p.q + " table"];
  el.innerHTML = `<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Home</a> / <a href="#collection/${p.cat}">${catName(p.cat)}</a> / <span aria-current="page">${p.name}</span></nav>
  <div class="pdp"><div class="gal"><div class="gal-main" data-main>${ph(thumbs[0], "vertical", p.name + " in the studio", 800, 1000)}</div>
    <div class="gal-thumbs">${thumbs.map((t, i) => `<button aria-current="${i === 0}" data-th="${i}" aria-label="View image ${i + 1}">${ph(t, "vertical", p.name + " view " + (i + 1), 200, 250)}</button>`).join("")}</div></div>
  <div class="pinfo"><p class="label">${catName(p.cat)}</p><h1>${p.name}</h1>
    <p class="rating">★ 4.9 · 38 Google reviews for Bluebonnet Candle Co.</p>
    <p class="price-big" data-price>${money(price(p))}</p><p class="muted">${p.desc}</p>
    <ul class="claims">${p.hl.map(h => `<li>${h}</li>`).join("")}</ul>
    ${p.sizes ? `<div><p class="label" style="margin-bottom:8px">Size</p><div class="opt" data-sizes>${SIZES.map((s, i) => `<button aria-pressed="${i === 0}" data-sz="${i}">${s.l}${s.add ? ` · +${money(s.add)}` : ""}</button>`).join("")}</div></div>` : ""}
    <div class="buy"><div class="qty"><button data-q="-1" aria-label="Decrease quantity">–</button><span data-qty>1</span><button data-q="1" aria-label="Increase quantity">+</button></div><button class="pill" data-addp>Add to cart</button></div>
    <details class="acc" open><summary>Details</summary><p>${p.desc} Made by hand at 1420 S Alamo St in San Antonio.</p></details>
    <details class="acc"><summary>How to use</summary><p>Trim the wick to ¼ inch. Burn for 2–3 hours on the first light so the wax melts edge to edge. Keep away from drafts and never leave a flame unattended.</p></details>
    <details class="acc"><summary>Pickup and delivery</summary><p>Free pickup at 1420 S Alamo St: Tue–Sat 10:00–18:00, Sun 12:00–16:00. Shipping details are confirmed by email or phone at (210) 555-0178.</p></details>
  </div></div></div>
  <section class="wrap pdp-sec"><p class="label center">Details</p><h2 class="h-display center">What makes it special</h2>
    <div class="notes">${info.facts.map(f => `<div><i>${f[0].slice(0, 2)}</i><b>${f[0]}</b><span>${f[1]}</span></div>`).join("")}</div></section>
  <section class="wrap pdp-split"><div>${ph(p.q + " studio", "vertical", "Candles being made in the Bluebonnet studio", 800, 900)}</div><div class="pdp-sec"><p class="label">Our story</p><h2 class="h-display">Made on South Alamo</h2><p class="muted">Every ${p.name.toLowerCase()} is made in small batches in our studio, a few jars at a time, with the radio on. If you want to see where it comes from, stop by during opening hours.</p><a class="arrow-link" href="#about">Read our story ↗</a></div></section>
  <section class="wrap pdp-sec"><p class="label">Materials</p><h2 class="h-display">What goes into it</h2><ul class="specs">${info.specs.map(s => `<li><b>${s[0]}</b><span>${s[1]}</span></li>`).join("")}</ul></section>
  <section class="wrap pdp-sec"><h2 class="h-sub">Pairs well with</h2><div class="bundle"><div class="bundle-row" data-bundle>
    ${[p, ...bund].map((b, i) => `<label class="b-item">${ph(b.q, "vertical", b.name, 160, 200)}<span style="flex:1"><b>${b.name}</b><br>${money(b.price)}</span><input type="checkbox" checked data-bs="${b.slug}" aria-label="Include ${b.name}"></label>`).join("")}
    <div class="b-total"><span data-bcount></span><b data-btotal></b><button class="pill" data-badd>Add selected</button></div></div></div></section>
  <section class="wrap pdp-sec" id="reviews"><h2 class="h-sub">Reviews</h2><p class="rating">★ 4.9 average · 38 Google reviews</p>${reviews.map(r => `<div class="rev"><b>${r[0]}, ${r[1]}</b><span>★★★★★</span><p class="muted">${r[2]}</p></div>`).join("")}</section>
  <section class="wrap pdp-sec"><div class="sec-head"><h2 class="h-sub">You may also like ↗</h2><a class="arrow-link" href="#collection/all">Shop all ↗</a></div><div class="grid">${related.map(card).join("")}</div></section>${USP}`;
  const upd = () => { $("[data-price]", el).textContent = money(price(p, size)); };
  $$("[data-sz]", el).forEach(b => b.onclick = () => { size = +b.dataset.sz; $$("[data-sz]", el).forEach(x => x.setAttribute("aria-pressed", x === b)); upd(); });
  $$("[data-q]", el).forEach(b => b.onclick = () => { qty = Math.max(1, qty + +b.dataset.q); $("[data-qty]", el).textContent = qty; });
  $("[data-addp]", el).onclick = () => addCart(p.slug, size, qty);
  $$("[data-th]", el).forEach(b => b.onclick = () => {
    const i = +b.dataset.th; $$("[data-th]", el).forEach(x => x.setAttribute("aria-current", x === b));
    $("[data-main]", el).innerHTML = ph(thumbs[i], "vertical", p.name + " view " + (i + 1), 800, 1000); resolveImages(el);
  });
  const bsum = () => {
    const on = $$("[data-bs]", el).filter(c => c.checked).map(c => bySlug(c.dataset.bs));
    $("[data-bcount]", el).textContent = `${on.length} item${on.length === 1 ? "" : "s"} selected`;
    $("[data-btotal]", el).textContent = money(on.reduce((a, b) => a + b.price, 0));
    return on;
  };
  $$("[data-bs]", el).forEach(c => c.onchange = bsum); bsum();
  $("[data-badd]", el).onclick = () => { bsum().forEach(b => addCart(b.slug, 0, 1)); };
  document.title = `${p.name} — Bluebonnet Candle Co.`;
}

function renderCart() {
  const body = $("[data-cart-body]");
  if (!cart.length) { body.innerHTML = `<div class="empty"><h2 class="h-sub">Your cart is empty.</h2><a class="pill" href="#collection/all">Shop</a></div>`; return; }
  let sub = 0;
  const lines = cart.map((i, idx) => {
    const p = bySlug(i.slug), u = price(p, i.size); sub += u * i.qty;
    return `<div class="cart-line">${ph(p.q, "vertical", p.name, 160, 200)}<div><a href="#product/${p.slug}"><b>${p.name}</b></a><p class="muted">${p.sizes ? SIZES[i.size].l + " · " : ""}${money(u)}</p><button class="linkbtn" data-rm="${idx}">Remove</button></div>
    <div class="qty"><button data-cq="${idx}" data-d="-1" aria-label="Decrease quantity">–</button><span>${i.qty}</span><button data-cq="${idx}" data-d="1" aria-label="Increase quantity">+</button></div></div>`;
  }).join("");
  const summary = cart.map(i => `${i.qty} x ${bySlug(i.slug).name}${bySlug(i.slug).sizes ? " (" + SIZES[i.size].l + ")" : ""} - ${money(price(bySlug(i.slug), i.size) * i.qty)}`).join("\n");
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent("Order from the website")}&body=${encodeURIComponent("Hello Bluebonnet Candle Co.,\n\nI would like to order:\n" + summary + "\n\nSubtotal: " + money(sub) + "\n\nName:\nPhone:\nPickup or shipping:\n")}`;
  body.innerHTML = `${lines}<div class="cart-sum"><div class="tot"><span>Subtotal</span><span>${money(sub)}</span></div><p class="fine">No payment is taken online. Send your order and we confirm it by email or phone, or call (210) 555-0178.</p><a class="pill" href="${href}">Send order by email</a><a class="pill pill-ghost" href="tel:2105550178">Call to order</a></div>`;
  $$("[data-rm]", body).forEach(b => b.onclick = () => { cart.splice(+b.dataset.rm, 1); saveCart(); renderCart(); });
  $$("[data-cq]", body).forEach(b => b.onclick = () => { const i = cart[+b.dataset.cq]; i.qty += +b.dataset.d; if (i.qty < 1) cart.splice(+b.dataset.cq, 1); saveCart(); renderCart(); });
  resolveImages(body);
}

/* ---------- Router ---------- */
const TITLES = { home: "Bluebonnet Candle Co. — Handmade soy candles in San Antonio", about: "About us — Bluebonnet Candle Co.", collections: "Collections — Bluebonnet Candle Co.", contact: "Contact — Bluebonnet Candle Co.", cart: "Cart — Bluebonnet Candle Co.", 404: "Page not found — Bluebonnet Candle Co." };
function route() {
  const raw = location.hash.replace(/^#/, "") || "home";
  const [path, qs] = raw.split("?"), parts = path.split("/");
  let el, key = path;
  if (TITLES[path] && path !== "404") el = $(`.page[data-page="${path}"]`);
  else if (parts[0] === "collection" && (parts[1] === "all" || CATS.some(c => c.slug === parts[1]))) { el = $("#dyn"); renderCollection(parts[1], new URLSearchParams(qs || "")); }
  else if (parts[0] === "product" && bySlug(parts[1])) { el = $("#dyn"); renderProduct(parts[1]); }
  else { el = $('.page[data-page="404"]'); key = "404"; }
  $$(".page").forEach(s => s.hidden = true);
  if (el.id === "dyn") el.dataset.page = path;
  el.hidden = false;
  if (TITLES[key]) document.title = TITLES[key];
  if (key === "cart") renderCart();
  if (key === "collections") renderCats();
  $("[data-nav]").classList.remove("open"); $("[data-menu-btn]").setAttribute("aria-expanded", "false");
  $("[data-hs-card]").hidden = true;
  window.scrollTo(0, 0);
  resolveImages(el);
}
function renderCats() {
  $("[data-coll-count]").textContent = `${CATS.length + 1} collections`;
  const all = [{ slug: "all", name: "All products", n: PRODUCTS.length, q: "candles shop" }, ...CATS.map(c => ({ ...c, n: PRODUCTS.filter(p => p.cat === c.slug).length, q: bySlug(PRODUCTS.find(p => p.cat === c.slug).slug).q }))];
  $("[data-cat-grid]").innerHTML = all.map(c => `<a class="cat-card" href="#collection/${c.slug}">${ph(c.q, "vertical", c.name + " collection", 600, 800, "r34")}<h3>${c.name}</h3><span class="muted">${c.n} products</span></a>`).join("");
}

/* ---------- Home widgets ---------- */
function initTabs() {
  $$("[data-tabs]").forEach(sec => {
    const set = sec.dataset.tabs === "cats"
      ? [["All", () => PRODUCTS], ...CATS.map(c => [c.name, () => PRODUCTS.filter(p => p.cat === c.slug)])]
      : [["New arrivals", () => PRODUCTS.filter(p => p.badge || p.cat === "candles").slice(0, 6)], ["Under $25", () => PRODUCTS.filter(p => p.price < 25)]];
    const pills = $("[data-pills]", sec), rail = $("[data-rail]", sec);
    const show = i => {
      rail.innerHTML = set[i][1]().map(card).join(""); resolveImages(rail);
      $$("button", pills).forEach((b, j) => b.setAttribute("aria-pressed", j === i));
    };
    pills.innerHTML = set.map((s, i) => `<button aria-pressed="false">${s[0]}</button>`).join("");
    $$("button", pills).forEach((b, i) => b.onclick = () => show(i));
    show(0);
  });
  $("[data-spot-grid]").innerHTML = PRODUCTS.filter(p => p.cat === "candles").map(card).join("");
}
function initSlides() {
  const hero = $("[data-slides]"), slides = $$(".slide", hero), bars = $("[data-bars]");
  let i = 0, t;
  bars.innerHTML = slides.map((s, n) => `<button aria-label="Show slide ${n + 1}"></button>`).join("");
  const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("is-on", k === i)); $$("button", bars).forEach((b, k) => b.setAttribute("aria-current", k === i)); };
  $$("button", bars).forEach((b, k) => b.onclick = () => go(k));
  $("[data-prev]").onclick = () => go(i - 1); $("[data-next]").onclick = () => go(i + 1);
  go(0);
  const start = () => { if (!reduce) t = setInterval(() => go(i + 1), 6000); };
  hero.onmouseenter = () => clearInterval(t); hero.onmouseleave = start; start();
  // announcement
  const ps = $$("[data-announce] p"); let a = 0;
  if (!reduce && ps.length > 1) setInterval(() => { ps[a].classList.remove("is-on"); a = (a + 1) % ps.length; ps[a].classList.add("is-on"); }, 5000);
}
function initMisc() {
  $$("[data-marquee]").forEach(m => { const t = $(".track", m), c = t.cloneNode(true); c.setAttribute("aria-hidden", "true"); m.appendChild(c); });
  // panels
  const panels = $$(".panel"); let pi = 0;
  const pg = n => { pi = (n + panels.length) % panels.length; panels.forEach((p, k) => p.classList.toggle("is-on", k === pi)); $("[data-panel-count]").textContent = `0${pi + 1} / 0${panels.length}`; };
  $$("[data-panel]").forEach((b, k) => b.onclick = () => pg(k));
  $("[data-pprev]").onclick = () => pg(pi - 1); $("[data-pnext]").onclick = () => pg(pi + 1);
  // before/after
  const ba = $("[data-ba]"); $("[data-ba-range]").oninput = e => ba.style.setProperty("--pos", e.target.value + "%");
  // videos
  const vt = $("[data-vtrack]");
  $("[data-vprev]").onclick = () => vt.scrollBy({ left: -380, behavior: reduce ? "auto" : "smooth" });
  $("[data-vnext]").onclick = () => vt.scrollBy({ left: 380, behavior: reduce ? "auto" : "smooth" });
  // hotspots
  const card_ = $("[data-hs-card]");
  $$("[data-hs]").forEach(d => d.onclick = e => {
    e.stopPropagation();
    const p = bySlug(d.dataset.hs);
    card_.innerHTML = `<b>${p.name}</b><span>${money(p.price)}</span><button class="quick" data-add="${p.slug}">Add to cart</button><a class="arrow-link" href="#product/${p.slug}">View product ↗</a>`;
    card_.style.left = `calc(${d.style.getPropertyValue("--x")} + 20px)`; card_.style.top = `calc(${d.style.getPropertyValue("--y")} - 10px)`;
    if (parseFloat(d.style.getPropertyValue("--x")) > 60) card_.style.left = `calc(${d.style.getPropertyValue("--x")} - 280px)`;
    card_.hidden = false;
  });
  document.addEventListener("click", e => { if (!e.target.closest(".hs-card")) card_.hidden = true; });
  document.addEventListener("keydown", e => { if (e.key === "Escape") card_.hidden = true; });
  // menu, search
  const mb = $("[data-menu-btn]"), nav = $("[data-nav]");
  mb.onclick = () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); };
  $("[data-search]").onsubmit = e => { e.preventDefault(); const v = $("#q").value.trim(); if (v) location.hash = `collection/all?q=${encodeURIComponent(v)}`; };
  // add to cart (delegated)
  document.addEventListener("click", e => { const b = e.target.closest("[data-add]"); if (b) { e.preventDefault(); addCart(b.dataset.add, 0, 1); } });
  $("[data-year]").textContent = new Date().getFullYear();
}
const okEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function initForms() {
  const cf = $("[data-contact-form]");
  cf.onsubmit = e => {
    e.preventDefault();
    const n = cf.name.value.trim(), m = cf.email.value.trim(), msg = cf.message.value.trim(), err = $("[data-err]", cf);
    if (!n) return err.textContent = "— Enter your name.";
    if (!okEmail(m)) return err.textContent = "— Enter a valid email address.";
    if (!msg) return err.textContent = "— Write a short message.";
    err.textContent = "";
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Message from " + n)}&body=${encodeURIComponent(msg + "\n\n" + n + " <" + m + ">")}`;
    toast("Thank you. Your email app will open to send it.");
  };
  const nf = $("[data-news]");
  nf.onsubmit = e => {
    e.preventDefault(); const v = $("#nl").value.trim(), err = $("[data-news-err]");
    if (!okEmail(v)) return err.textContent = "— Enter a valid email address.";
    err.textContent = ""; location.href = `mailto:${EMAIL}?subject=Newsletter&body=${encodeURIComponent("Please add " + v + " to the newsletter.")}`;
  };
  const pop = $("[data-popup]"), pf = $("[data-pop-form]");
  $("[data-pop-send]").onclick = () => {
    const v = $("input", pf).value.trim(), err = $("[data-pop-err]");
    if (!okEmail(v)) return err.textContent = "— Enter a valid email address.";
    localStorage.setItem("bb-pop", Date.now()); pop.close();
    location.href = `mailto:${EMAIL}?subject=Newsletter&body=${encodeURIComponent("Please add " + v + " to the newsletter.")}`;
  };
  pop.addEventListener("close", () => localStorage.setItem("bb-pop", Date.now()));
  const last = +localStorage.getItem("bb-pop") || 0;
  if (Date.now() - last > 30 * 864e5) setTimeout(() => { if (!pop.open && pop.showModal) { pop.showModal(); resolveImages(pop); } }, 6000);
}

/* ---------- Boot ---------- */
initTabs(); initSlides(); initMisc(); initForms(); saveCart();
addEventListener("hashchange", route);
route();
