(function () {
  "use strict";
  const PIXABAY_KEY = "navegaid-images";
  const PHONE = "(210) 577-5727", TEL = "tel:2105775727", EMAIL = "abdurrahman@navegaid.com";
  const NAME = "Mr. fix it Handyman Service Solutions DIY 911 !";

  /* ---------- Data ---------- */
  const SERVICES = [
    { slug: "handyman-services", title: "Handyman services", cat: "General repairs", short: "General household repairs and odd jobs, planned around one visit.", icon: "wrench", q: "handyman repair home",
      inc: ["On-site assessment", "Tools and fasteners", "Repairs on your list", "Cleanup and walkthrough"], ben: [["One visit for many jobs", "Bundle small repairs so you pay for a single trip."], ["Clear scope first", "You know what is being done and what it costs before we start."], ["Local and reachable", "Call the same number every time and reach the person doing the work."]] },
    { slug: "drywall-and-paint", title: "Drywall and paint touch-ups", cat: "Walls and finishes", short: "Patch holes, smooth cracks and repaint the spot so it disappears.", icon: "paint", q: "drywall patch painting wall",
      inc: ["Hole and crack patching", "Sanding and priming", "Color-matched paint", "Floor protection"], ben: [["Seamless finish", "Patches are blended so the wall looks untouched."], ["Fast turnaround", "Small repairs are usually dry and painted within a day."], ["Mess kept small", "Drop cloths and careful sanding keep dust in check."]] },
    { slug: "doors-windows-locks", title: "Doors, windows and locks", cat: "Doors and openings", short: "Sticking doors, loose hinges, worn seals and lock changes.", icon: "door", q: "door hinge lock repair",
      inc: ["Hinge and latch adjustment", "Weather-stripping", "Lock and handle swaps", "Window sash checks"], ben: [["Doors that close properly", "We trim, shim and rehang so they swing freely."], ["Better draft control", "New seals keep air conditioning inside."], ["Security upgrades", "Replace worn locks and handles in a single visit."]] },
    { slug: "assembly-mounting", title: "Assembly and mounting", cat: "Furniture and walls", short: "Furniture assembly, TV mounts, shelves and wall art hung level.", icon: "box", q: "furniture assembly mounting shelf",
      inc: ["Furniture assembly", "TV and shelf mounting", "Stud and anchor selection", "Packaging removal"], ben: [["Level and secure", "Mounts are fixed to studs or proper anchors."], ["Hours back to you", "Skip the instruction sheets and the missing screws."], ["Tidy room afterward", "Boxes and packaging are taken away on request."]] },
    { slug: "fixtures-installation", title: "Fixture and hardware installation", cat: "Installs", short: "Light fixtures, ceiling fans, cabinet hardware and curtain rods.", icon: "bulb", q: "light fixture installation ceiling",
      inc: ["Fixture swaps", "Cabinet handles and pulls", "Curtain rods and blinds", "Safe power-off checks"], ben: [["Neat, even results", "Hardware is measured and marked before drilling."], ["Right fit for the job", "We tell you when a task needs a licensed electrician."], ["Old parts removed", "Replaced fixtures leave with us."]] },
    { slug: "leaks-small-plumbing", title: "Faucet and small leak repairs", cat: "Small plumbing", short: "Dripping faucets, running toilets and small leaks under the sink.", icon: "drop", q: "faucet leak repair sink",
      inc: ["Faucet cartridge and washer swaps", "Toilet flapper and fill valves", "Supply line replacement", "Leak check after the fix"], ben: [["Stop the drip", "Small leaks are fixed before they stain the cabinet."], ["Honest about limits", "Larger plumbing work is passed to licensed trades."], ["Water bill relief", "A running toilet can waste gallons a day."]] }
  ];
  const STEPS = [
    ["01", "Call us", "Ring (210) 577-5727 and tell us what needs fixing.", "phone call customer service"],
    ["02", "Plan the visit", "We agree on a time that suits you and the scope of work.", "calendar planning notebook"],
    ["03", "Fix on site", "We bring the tools, fix the list and explain what we did.", "handyman fixing door"],
    ["04", "Tidy and finish", "We clean up, check the work with you and confirm the price.", "clean home finished room"]
  ];
  const FAQ = [
    ["How do I book a visit?", "Call (210) 577-5727, or send a message from the contact page. We confirm a time that suits you."],
    ["Where do you work?", "We are based at 10507 Tally Ho Ln in San Antonio, TX 78216, and travel to homes across the city."],
    ["What are your opening hours?", "We do not publish fixed hours. Call or email and we will confirm a time that works for both of us."],
    ["Do you give a price before the work?", "Yes. You get a quote for the scope first, and we tell you if anything changes."],
    ["Can you handle larger electrical or plumbing jobs?", "We cover small repairs and installs. Larger electrical and plumbing work goes to licensed trades, and we will say so up front."]
  ];
  const QUOTES = [
    ["I called in the morning and the job was done by the afternoon. Clear price and clean work.", "Rosa Medina, homeowner"],
    ["He shows up when he says, and the whole repair list gets finished without chasing.", "Kevin Brooks, landlord"]
  ];
  const ICONS = {
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L10 21l-3-3 9.7-9.7z"/><path d="m14.5 6.5 3-3"/>',
    paint: '<rect x="4" y="4" width="14" height="6" rx="1"/><path d="M18 7h2v5h-8v3"/><rect x="10" y="15" width="4" height="6" rx="1"/>',
    door: '<rect x="6" y="3" width="12" height="18" rx="1"/><circle cx="15" cy="12" r=".8"/>',
    box: '<path d="m3 7 9-4 9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.5.5 1.1.5 2.1h6c0-1 0-1.6.5-2.1A6 6 0 0 0 12 3z"/>',
    drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',
    plus: '<path class="plus" d="M12 5v14M5 12h14"/><path class="minus" d="M5 12h14"/>'
  };
  function ico(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || "") + "</svg>"; }
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const img = (q, o, alt, w, h, large) => '<img data-pixabay="' + q + '" data-orientation="' + o + '"' + (large ? ' data-large="1"' : "") + ' alt="' + alt + '" width="' + w + '" height="' + h + '">';

  /* ---------- Render repeated parts ---------- */
  function renderHomeServices() {
    const el = $("#homeServices");
    el.innerHTML = SERVICES.slice(0, 4).map(function (s) {
      return '<a class="sv-item" href="#service/' + s.slug + '" data-anim="up"><span class="ico circle">' + ico(s.icon) + '</span><div><h3 class="h6">' + s.title + "</h3><p>" + s.short + "</p></div></a>";
    }).join("");
  }
  function cardHTML(s) {
    return '<a class="svc-card" href="#service/' + s.slug + '" data-anim="up"><div class="svc-text"><div><span class="tag">' + s.cat + "</span><h3>" + s.title + "</h3><p>" + s.short + '</p></div><span class="btn-out">Learn more <span class="ico">' + ico("check").replace("m5 12 5 5 9-10", "M5 12h14m-5-5 5 5-5 5") + '</span></span></div><div class="svc-img">' + img(s.q, "horizontal", s.title + " in a San Antonio home", 268, 272) + "</div></a>";
  }
  function renderGrids() {
    $$("[data-service-grid]").forEach(function (g) { g.innerHTML = SERVICES.map(cardHTML).join(""); });
    $$("[data-workflow]").forEach(function (w) {
      w.innerHTML = STEPS.map(function (s) {
        return '<div class="wf-card" data-anim="rise"><div class="curtain">' + img(s[3], "horizontal", "Step " + s[0] + ": " + s[1], 285, 220) + '</div><div><h3 class="h6">' + s[0] + " - " + s[1] + "</h3><p>" + s[2] + "</p></div></div>";
      }).join("");
    });
    $$("[data-faq-list]").forEach(function (l) {
      l.innerHTML = FAQ.map(function (f) {
        return '<div class="faq-item" data-anim="rise"><button class="faq-q" aria-expanded="false"><h3 class="h6">' + f[0] + '</h3><span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS.plus + '</svg></span></button><div class="faq-a"><p>' + f[1] + "</p></div></div>";
      }).join("");
    });
    $$("[data-ico]").forEach(function (e) { e.innerHTML = ico(e.getAttribute("data-ico")); });
  }
  function buildServicePages() {
    const main = $("#main");
    SERVICES.forEach(function (s) {
      const others = SERVICES.filter(function (o) { return o !== s; }).slice(0, 4);
      const sec = document.createElement("section");
      sec.className = "page"; sec.setAttribute("data-page", "service/" + s.slug); sec.id = "service-" + s.slug;
      sec.innerHTML =
        '<section class="top" data-section="page-top"><div class="container"><div class="top-head"><h1 class="center">' + s.title + '</h1></div><div class="top-img curtain">' + img(s.q, "horizontal", s.title + " by a San Antonio handyman", 1265, 480) + "</div></div></section>" +
        '<section class="sd" data-section="service-detail"><div class="container sd-in"><div class="sd-body"><div class="sd-rich" data-anim="up"><h4>About this service</h4><p>' + s.short + '</p><p>We handle ' + s.title.toLowerCase() + " for homes across San Antonio. Describe the job on the phone, agree the scope and price, and we arrive with the tools and parts to finish it properly.</p><h4>Why choose this service</h4><ul>" +
        s.ben.map(function (b) { return "<li><strong>" + b[0] + "</strong> – " + b[1] + "</li>"; }).join("") + '</ul></div><div class="included"><h2 class="h4" data-anim="up">What is included</h2><div class="inc-grid">' +
        s.inc.map(function (i) { return '<div class="inc" data-anim="rise"><p>' + i + "</p></div>"; }).join("") + '</div></div></div><div class="sd-test">' +
        QUOTES.map(function (q, i) { return '<div class="sq' + (i === 0 ? " line-r" : "") + '"><h2>“' + q[0] + '”</h2><div class="nm"><h3 class="h6">' + q[1].split(", ")[0] + "</h3><p>" + q[1].split(", ")[1] + "</p></div></div>"; }).join("") +
        '</div></div></section><section class="sec" data-section="services-grid"><div class="container"><div class="head center"><span class="pill dot">Our services</span><h2>Explore our other services</h2><p>Every service is booked the same way: one call to ' + PHONE + ".</p></div><div class=\"svc-grid rail\">" + others.map(cardHTML).join("") + '</div></div></section>' +
        '<section class="cta-ban" data-section="cta-banner"><img class="cta-bg" ' + 'data-pixabay="' + s.q + ' tools" data-orientation="horizontal" data-large="1" alt="Tools used for ' + s.title.toLowerCase() + '" width="1440" height="648"><div class="cta-in"><h2>Ready to take the next step?</h2><p>Call us today and we will plan your ' + s.title.toLowerCase() + ' visit.</p><div><a class="btn btn-light" href="' + TEL + '"><span>Call ' + PHONE + '</span><b class="arr">→</b></a></div></div></section>';
      main.appendChild(sec);
    });
  }

  /* ---------- Pixabay ---------- */
  const cache = {}, used = new Set();
  const BLANK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='3'/%3E";
  function fetchHits(q, o) {
    const k = q + "|" + o;
    if (!cache[k]) {
      cache[k] = PIXABAY_KEY && PIXABAY_KEY.indexOf("__") !== 0
        ? fetch("https://www.navegaid.com/api/outreach/images?key=" + PIXABAY_KEY + "&q=" + encodeURIComponent(q) + "&image_type=photo&orientation=" + o + "&safesearch=true&per_page=10").then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) { return d.hits || []; })
        : Promise.reject();
    }
    return cache[k];
  }
  function placeholder(im) {
    im.onload = null; im.onerror = null;
    im.classList.add("ph"); im.src = BLANK;
    const w = im.getAttribute("width"), h = im.getAttribute("height");
    if (w && h) im.style.aspectRatio = w + " / " + h;
  }
  function resolve(im) {
    if (im.dataset.done) return; im.dataset.done = "1";
    const q = im.dataset.pixabay, o = im.dataset.orientation || "all";
    fetchHits(q, o).then(function (hits) {
      const hit = hits.find(function (x) { return !used.has(x.id); }) || hits[0];
      if (!hit) throw 0;
      used.add(hit.id);
      im.onload = function () {
        im.onload = null;
        const p = im.parentElement;
        if (p && !p.querySelector(".credit") && !/avatars/.test(p.className) && im.width > 120) {
          if (getComputedStyle(p).position === "static") p.style.position = "relative";
          const c = document.createElement("span"); c.className = "credit"; c.textContent = "Image: Pixabay"; p.appendChild(c);
        }
      };
      im.onerror = function () { placeholder(im); };
      im.src = im.dataset.large ? (hit.largeImageURL || hit.webformatURL) : hit.webformatURL;
    }).catch(function () { placeholder(im); });
  }
  function resolveIn(root) { $$("img[data-pixabay]", root).forEach(resolve); }

  /* ---------- Router ---------- */
  const TITLES = { home: "Handyman in San Antonio, TX", about: "About us", services: "Services", contact: "Contact", "404": "Page not found" };
  function route() {
    let h = decodeURIComponent((location.hash || "#home").slice(1)) || "home";
    let page = $('.page[data-page="' + h + '"]');
    if (!page) { h = "404"; page = $('.page[data-page="404"]'); }
    $$(".page").forEach(function (p) { p.classList.remove("active"); });
    page.classList.add("active");
    window.scrollTo(0, 0);
    let t = TITLES[h];
    if (!t && h.indexOf("service/") === 0) { const s = SERVICES.find(function (x) { return "service/" + x.slug === h; }); t = s ? s.title : "Service"; }
    document.title = t + " | " + NAME;
    const top = h.indexOf("service/") === 0 ? "services" : h;
    $$("[data-nav]").forEach(function (a) { a.classList.toggle("active", a.dataset.nav === top); a.toggleAttribute("aria-current", a.dataset.nav === top); });
    closeMenu();
    resolveIn(page); resolveIn($(".site-header")); resolveIn($(".site-footer"));
    observe(page);
    if (h === "home") initSlider();
  }

  /* ---------- Menu ---------- */
  function closeMenu() { $("#menu").classList.remove("open"); const b = $("#burger"); b.classList.remove("open"); b.setAttribute("aria-expanded", "false"); b.setAttribute("aria-label", "Open menu"); }
  function initMenu() {
    $("#burger").addEventListener("click", function () {
      const open = $("#menu").classList.toggle("open");
      this.classList.toggle("open", open); this.setAttribute("aria-expanded", open); this.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* ---------- Reveal ---------- */
  let io;
  function observe(root) {
    const els = $$("[data-anim], .curtain", root);
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (e, i) { if (!e.classList.contains("in")) { e.style.transitionDelay = (i % 4) * 0.08 + "s"; io.observe(e); } });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    document.addEventListener("click", function (e) {
      const q = e.target.closest(".faq-q"); if (!q) return;
      const item = q.parentElement, a = $(".faq-a", item), open = !item.classList.contains("open");
      item.classList.toggle("open", open); q.setAttribute("aria-expanded", open);
      a.style.height = open ? a.scrollHeight + "px" : "0px";
    });
  }

  /* ---------- Slider ---------- */
  let slideInit = false, idx = 0;
  function initSlider() {
    const sl = $("#slider"); if (!sl) return;
    const slides = $$(".slide", sl), dots = $("#slDots");
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("active", i === idx); });
      $$("button", dots).forEach(function (d, i) { d.classList.toggle("on", i === idx); });
      resolveIn(slides[idx]);
    }
    if (!slideInit) {
      slideInit = true;
      dots.innerHTML = slides.map(function (_, i) { return '<button aria-label="Go to project ' + (i + 1) + '"></button>'; }).join("");
      $$("button", dots).forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
      $("#slPrev").addEventListener("click", function () { go(idx - 1); });
      $("#slNext").addEventListener("click", function () { go(idx + 1); });
    }
    go(idx);
  }

  /* ---------- Timeline progress ---------- */
  function initTimeline() {
    function upd() {
      $$(".tl-item").forEach(function (it) {
        const l = $(".line", it); if (!l) return;
        const r = it.getBoundingClientRect(), p = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height));
        l.style.setProperty("--prog", p * 100 + "%");
      });
    }
    window.addEventListener("scroll", upd, { passive: true });
  }

  /* ---------- Forms ---------- */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function initForms() {
    const cf = $("#contactForm"), msg = $("#cfMsg");
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      const em = $("#cf-email"), name = $("#cf-name").value.trim(), ph = $("#cf-phone").value.trim(), sub = $("#cf-subject").value, m = $("#cf-msg").value.trim();
      em.classList.remove("err");
      if (!validEmail(em.value.trim())) { em.classList.add("err"); msg.textContent = "— Please enter a valid email address so we can reply."; em.focus(); return; }
      const body = "Name: " + name + "\nEmail: " + em.value.trim() + "\nPhone: " + ph + "\nSubject: " + sub + "\n\n" + m;
      msg.textContent = "Thank you. Your email app will open so you can send the message.";
      location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Website enquiry: " + (sub && sub.indexOf("Select") !== 0 ? sub : "Handyman job")) + "&body=" + encodeURIComponent(body);
    });
    const nf = $("#newsForm"), nm = $("#nlMsg");
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      const v = $("#nl-email").value.trim();
      if (!validEmail(v)) { nm.textContent = "— Please enter a valid email address."; return; }
      nm.textContent = "Thank you for subscribing.";
      location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Booking updates signup") + "&body=" + encodeURIComponent("Please add me to your updates: " + v);
    });
  }

  /* ---------- Init ---------- */
  function init() {
    renderHomeServices(); renderGrids(); buildServicePages();
    $$("[data-ico]").forEach(function (e) { if (!e.innerHTML) e.innerHTML = ico(e.getAttribute("data-ico")); });
    $("#year").textContent = new Date().getFullYear();
    initMenu(); initFaq(); initForms(); initTimeline();
    window.addEventListener("hashchange", route);
    route();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
