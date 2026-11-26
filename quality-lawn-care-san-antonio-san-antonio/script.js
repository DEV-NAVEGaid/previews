(function () {
  "use strict";
  document.documentElement.classList.add("js");

  const PIXABAY_KEY = "navegaid-images";
  const PHONE = "(210) 907-4340", PHONE_HREF = "tel:2109074340", EMAIL = "sofi@navegaid.com";
  const BIZ = "Quality lawn care San Antonio";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- service data ---------- */
  const SERVICES = [
    { slug: "lawn-care", title: "Lawn care", tag: "Core service",
      text: "Regular visits that keep your whole lawn healthy, even and tidy all year.",
      img: "lawn care green grass mower", intro: "Our lawn care visits cover the full routine in one stop, so you never have to juggle separate jobs.",
      body: "We cut to the right height for Texas turf, trim edges, clear walkways and check for patches, pests and dry spots. If we see a problem, we tell you before it spreads and agree the fix with you first.",
      benefits: [["A healthier lawn", "regular, correct cutting builds thicker grass that resists heat and weeds."], ["Less work for you", "one crew handles mowing, edging and cleanup on a set day."], ["Clear communication", "we call or message if weather or access changes the plan."]],
      included: ["Mowing at the right height", "Edging and trimming", "Blowing off drives and paths", "Lawn health check"],
      quotes: [["Ray Gutierrez", "Homeowner, Bernard Dr", "The crew shows up when they say they will. My yard has never looked this even."], ["Maria Lopez", "Landlord, Southside", "They handle both my rentals on the same day. Easy to reach by phone and fair on price."]] },
    { slug: "mowing-and-edging", title: "Mowing and edging", tag: "Maintenance",
      text: "Clean cuts, sharp edges and tidy drives after every visit.",
      img: "lawn edging striped lawn", intro: "A sharp mow and crisp edges are the quickest way to make a yard look cared for.",
      body: "We adjust blade height to your grass type, mow in alternating directions to avoid ruts, and edge along walks, drives and beds. Every clipping is blown off hard surfaces before we leave.",
      benefits: [["Crisp curb appeal", "straight edges and even stripes make the whole property look sharper."], ["Healthy grass", "the right height shades roots and keeps moisture in."], ["Flexible timing", "weekly or every two weeks, depending on growth and budget."]],
      included: ["Mowing every visit", "String trimming", "Edging walks and drives", "Clippings blown clean"],
      quotes: [["Ray Gutierrez", "Homeowner, Bernard Dr", "Edges are sharp and the drive is always clean when they leave."], ["Tom Becker", "Retired homeowner", "Reliable every week. I have not had to chase them once."]] },
    { slug: "seasonal-cleanup", title: "Seasonal cleanup", tag: "Seasonal",
      text: "Leaves, brush and debris removed to reset your yard each season.",
      img: "raking leaves yard autumn", intro: "A seasonal cleanup clears what has built up so your lawn can start the next season fresh.",
      body: "We remove leaves, fallen branches and overgrowth from lawns and beds, cut back tired growth and haul everything away. It suits spring and fall resets, move-ins and rental turnovers.",
      benefits: [["A fresh start", "the yard is cleared in a day instead of a weekend of your own work."], ["Healthier turf", "removing debris lets light and air reach the grass."], ["Ready for tenants or guests", "ideal before a move, sale or rental turnover."]],
      included: ["Leaf and debris removal", "Bed and border clearing", "Brush cut-back", "Hauling and disposal"],
      quotes: [["Maria Lopez", "Landlord, Southside", "They cleared an overgrown rental yard in one day. It looked brand new."], ["Tom Becker", "Retired homeowner", "Everything was hauled away and the yard was spotless."]] },
    { slug: "fertilizing-and-weed-control", title: "Fertilizing and weed control", tag: "Lawn health",
      text: "Feeding and weed treatment timed for Texas heat and soil.",
      img: "lawn fertilizer weed treatment", intro: "Good feeding and weed control give thin or patchy lawns the support they need to recover.",
      body: "We apply fertilizer and targeted weed treatment on a schedule that fits San Antonio's seasons, and we explain what was applied and when to water. Treatments are matched to your grass and soil.",
      benefits: [["Thicker grass", "regular feeding fills in thin spots and builds root strength."], ["Fewer weeds", "targeted treatment stops weeds before they take over."], ["Simple schedule", "we plan the visits so you do not have to remember them."]],
      included: ["Seasonal fertilizer", "Targeted weed treatment", "Lawn condition notes", "Watering guidance"],
      quotes: [["Tom Becker", "Retired homeowner", "After a rough summer, the treatment brought my lawn back and they explained every step."], ["Ray Gutierrez", "Homeowner, Bernard Dr", "Weeds were gone and the grass came in thicker by summer."]] }
  ];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function buildServicePages() {
    const host = document.getElementById("service-pages");
    host.innerHTML = SERVICES.map(s => {
      const others = SERVICES.filter(o => o.slug !== s.slug);
      return `
<section class="page" data-page="service/${s.slug}" hidden>
  <section class="sec top" data-section="page-top"><div class="container">
    <div class="page-head"><h1 class="h1 center split">${esc(s.title)}</h1></div>
    <div class="banner curtain rv"><img data-pixabay="${esc(s.img)}" data-orientation="horizontal" alt="${esc(s.title)} at a San Antonio home" width="1265" height="480"></div>
  </div></section>
  <section class="sec" data-section="service-detail"><div class="container">
    <div class="rich">
      <div class="rich-text rv"><h4 class="h4">What is ${esc(s.title.toLowerCase())}?</h4><p class="p1">${esc(s.intro)}</p><p class="p1">${esc(s.body)}</p>
        <h4 class="h4">Why choose this service</h4>
        <ul>${s.benefits.map(b => `<li class="p1"><strong>${esc(b[0])}</strong> – ${esc(b[1])}</li>`).join("")}</ul></div>
      <div class="included"><h2 class="h4 rv">What's included</h2><div class="inc-grid">${s.included.map(i => `<div class="inc-item rv"><p class="p1">${esc(i)}</p></div>`).join("")}</div></div>
    </div>
    <div class="sd-testi rv">${s.quotes.map(q => `<div class="sd-q"><blockquote>“${esc(q[2])}”</blockquote><div><h3 class="h6 on-dark">${esc(q[0])}</h3><p class="p1 dim">${esc(q[1])}</p></div></div>`).join("")}</div>
  </div></section>
  <section class="sec" data-section="services-grid"><div class="container">
    <div class="center-head wide"><span class="label rv"><i></i>Our services</span><h2 class="h2 center split">Explore our other services</h2><p class="p1 center rv">Every service can be booked on its own or combined into a plan. Call ${PHONE}.</p></div>
    <div class="svc-grid">${others.map(o => `<a class="scard rv" href="#service/${o.slug}"><div class="scard-text"><p class="tag">${esc(o.tag)}</p><h3 class="h5">${esc(o.title)}</h3><p class="p1">${esc(o.text)}</p><span class="btn btn-outline">Learn more <span class="ico">↗</span></span></div><div class="scard-img curtain"><img data-pixabay="${esc(o.img)}" data-orientation="horizontal" alt="${esc(o.title)}" width="268" height="272"></div></a>`).join("")}</div>
  </div></section>
  <section class="cta-banner" data-section="cta-banner">
    <img class="cta-bg" data-pixabay="green lawn morning light" data-orientation="horizontal" alt="Green lawn in soft morning light" width="1440" height="540">
    <div class="cta-shade"></div>
    <div class="container cta-inner"><h2 class="h2 on-dark center split">Ready to book ${esc(s.title.toLowerCase())}?</h2><p class="p1 on-dark center rv">Call us today for a free quote. Mon–Fri 8:00–18:00, Sat 8:00–17:00.</p><a class="btn btn-light btn-lg rv" href="${PHONE_HREF}">Call ${PHONE} <span class="ico">→</span></a></div>
  </section>
</section>`;
    }).join("");
  }

  /* ---------- split letters ---------- */
  function splitHeadings(root) {
    (root || document).querySelectorAll(".split:not([data-done])").forEach(el => {
      el.dataset.done = "1";
      const text = el.textContent;
      el.setAttribute("aria-label", text);
      const nodes = [...el.childNodes];
      el.textContent = "";
      let i = 0;
      const total = text.length;
      const add = (node, parent) => {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { parent.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span"); w.className = "w"; w.setAttribute("aria-hidden", "true");
            [...part].forEach(c => {
              const s = document.createElement("span"); s.className = "ch"; s.textContent = c;
              const dist = Math.abs(i - total / 2) / (total / 2);
              s.style.transitionDelay = (0.3 + dist * 0.5) + "s"; i++;
              w.appendChild(s);
            });
            parent.appendChild(w);
          });
        } else {
          const clone = node.cloneNode(false); parent.appendChild(clone);
          node.childNodes.forEach(n => add(n, clone));
        }
      };
      nodes.forEach(n => add(n, el));
    });
  }

  /* ---------- reveal ---------- */
  let io;
  function observe(root) {
    if (!io) {
      io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    }
    (root || document).querySelectorAll(".rv:not(.in), .split:not(.in)").forEach(el => {
      if (REDUCED) el.classList.add("in"); else io.observe(el);
    });
  }

  /* ---------- Pixabay images ---------- */
  const used = new Set();
  function fail(img) {
    img.onload = null; img.onerror = null;
    img.removeAttribute("src");
    img.classList.add("ph");
  }
  function credit(img) {
    const p = img.parentElement;
    if (!p || p.querySelector(":scope > .credit")) return;
    const c = document.createElement("span"); c.className = "credit"; c.textContent = "Image: Pixabay";
    p.appendChild(c);
  }
  function loadImage(img) {
    if (img.dataset.loading) return;
    img.dataset.loading = "1";
    if (!PIXABAY_KEY) { fail(img); return; }
    const q = encodeURIComponent(img.dataset.pixabay || "lawn");
    const o = img.dataset.orientation || "all";
    const url = `https://www.navegaid.com/api/outreach/images?key=${PIXABAY_KEY}&q=${q}&image_type=photo&orientation=${o}&safesearch=true&per_page=10`;
    fetch(url).then(r => { if (!r.ok) throw new Error("bad"); return r.json(); }).then(d => {
      const hits = (d && d.hits) || [];
      if (!hits.length) throw new Error("none");
      const big = img.closest(".hero, .cta-banner, .slide, .banner");
      const pick = hits.find(h => !used.has(h.id)) || hits[0];
      used.add(pick.id);
      img.onload = () => { img.classList.remove("ph"); credit(img); };
      img.onerror = () => fail(img);
      img.src = big ? (pick.largeImageURL || pick.webformatURL) : pick.webformatURL;
    }).catch(() => fail(img));
  }
  function resolveImages(root) {
    (root || document).querySelectorAll("img[data-pixabay]").forEach(loadImage);
  }

  /* ---------- router ---------- */
  const TITLES = { home: "Lawn care in San Antonio, TX", about: "About us", services: "Lawn care services", contact: "Contact and free quote", "404": "Page not found" };
  function route() {
    let key = decodeURIComponent(location.hash.replace(/^#/, "")) || "home";
    let page = [...document.querySelectorAll(".page")].find(p => p.dataset.page === key);
    if (!page) { key = "404"; page = document.querySelector('.page[data-page="404"]'); }
    document.querySelectorAll(".page").forEach(p => { p.hidden = p !== page; });
    let t = TITLES[key];
    if (!t && key.startsWith("service/")) { const s = SERVICES.find(x => "service/" + x.slug === key); t = s ? s.title : "Services"; }
    document.title = (t ? t + " | " : "") + BIZ;
    const top = key.startsWith("service/") ? "services" : key;
    document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === top));
    closeMenu();
    window.scrollTo(0, 0);
    observe(page);
    resolveImages(page);
    if (key === "home") startSlider();
  }

  /* ---------- menu ---------- */
  const burger = document.getElementById("burger"), nav = document.getElementById("main-nav");
  function closeMenu() { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  /* ---------- slider ---------- */
  let cur = 0, sliderReady = false;
  function startSlider() {
    if (sliderReady) return; sliderReady = true;
    const slides = [...document.querySelectorAll("#slides .slide")];
    const dots = document.getElementById("dots");
    slides.forEach((_, i) => {
      const b = document.createElement("button"); b.setAttribute("aria-label", "Go to project " + (i + 1));
      b.addEventListener("click", () => show(i)); dots.appendChild(b);
    });
    function show(n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("active", i === cur));
      [...dots.children].forEach((d, i) => d.classList.toggle("active", i === cur));
    }
    document.getElementById("prev").addEventListener("click", () => show(cur - 1));
    document.getElementById("next").addEventListener("click", () => show(cur + 1));
    show(0);
  }

  /* ---------- FAQ ---------- */
  document.addEventListener("click", e => {
    const q = e.target.closest(".faq-q");
    if (!q) return;
    const item = q.parentElement, ans = item.querySelector(".faq-a");
    const open = item.classList.toggle("open");
    q.setAttribute("aria-expanded", open ? "true" : "false");
    q.querySelector(".faq-ico").textContent = open ? "−" : "+";
    ans.style.height = open ? ans.scrollHeight + "px" : "0px";
  });

  /* ---------- forms ---------- */
  const form = document.getElementById("contact-form"), msg = document.getElementById("form-msg");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(form);
    const email = (f.get("email") || "").toString().trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    form.querySelector("#f-email").parentElement.classList.toggle("err", !ok);
    if (!ok) { msg.textContent = "— Please enter a valid email address so we can reply."; return; }
    const body = `Name: ${f.get("name") || ""}\nEmail: ${email}\nPhone: ${f.get("phone") || ""}\n\n${f.get("message") || ""}`;
    msg.textContent = "Thank you! Your email app will open so you can send the message. You can also call " + PHONE + ".";
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(f.get("subject") || "Free quote")}&body=${encodeURIComponent(body)}`;
  });
  const nf = document.getElementById("news-form"), nm = document.getElementById("news-msg");
  nf.addEventListener("submit", e => {
    e.preventDefault();
    const v = document.getElementById("news-email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { nm.textContent = "Something went wrong. Please enter a valid email."; return; }
    nm.textContent = "Thank you for subscribing.";
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent("Please add me to the lawn tips list: " + v)}`;
  });

  /* ---------- init ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  buildServicePages();
  splitHeadings(document);
  window.addEventListener("hashchange", route);
  route();
})();
