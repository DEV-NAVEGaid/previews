(function () {
  "use strict";
  var PIXABAY_KEY = "navegaid-images";
  var BIZ = "Sonny's Son Handyman Service";
  var PHONE = "(210) 396-1149";
  document.documentElement.classList.add("js");

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Services data ---------- */
  var SERVICES = [
    { slug: "handyman-services", title: "Handyman services", tag: "General repairs",
      short: "General repairs and odd jobs around the house, handled in one visit.",
      kw: "handyman repair home", alt: "Handyman repairing a fixture in a home",
      intro: "A general handyman visit covers the small jobs that pile up: a dripping fixture, a loose handle, a wobbling railing. You give us the list and we work through it in order.",
      benefits: [["One visit, many tasks", "Bundle several small jobs into a single appointment."], ["Tools on the truck", "We arrive prepared for the common repairs."], ["Clear price first", "You approve the quote before work begins."]],
      included: ["Written quote", "Tools and fasteners", "Cleanup after work", "Workmanship warranty"] },
    { slug: "minor-home-repairs", title: "Minor home repairs", tag: "Repairs",
      short: "Leaky fixtures, loose fittings, squeaks and small fixes that cannot wait.",
      kw: "home repair fixing faucet", alt: "Repairing a kitchen faucet",
      intro: "Small defects turn into larger ones when they are left alone. We repair cabinet hinges, towel bars, caulking, loose tiles and similar problems quickly and neatly.",
      benefits: [["Fast response", "Urgent repairs are taken any hour of the day."], ["Fixed properly", "We find the cause rather than patching the symptom."], ["Tidy finish", "Surfaces are cleaned and sealed where needed."]],
      included: ["Diagnosis on site", "Parts for standard repairs", "Caulking and sealing", "Debris removal"] },
    { slug: "furniture-assembly", title: "Furniture assembly", tag: "Assembly",
      short: "Beds, desks, shelving and outdoor sets built, leveled and anchored.",
      kw: "furniture assembly screwdriver", alt: "Assembling flat-pack furniture with a screwdriver",
      intro: "Flat-pack furniture takes hours and a lot of patience. We assemble it correctly, check every fastener and anchor tall pieces to the wall for safety.",
      benefits: [["Built to last", "Every joint is tightened and checked at the end."], ["Wall anchoring", "Tall units are secured to prevent tipping."], ["Packaging removed", "We take boxes and offcuts away."]],
      included: ["Full assembly", "Leveling and alignment", "Wall anchoring", "Packaging removal"] },
    { slug: "mounting-and-installation", title: "Mounting and installation", tag: "Installation",
      short: "TVs, shelves, mirrors and fixtures fixed to the wall and secured.",
      kw: "tv wall mount installation", alt: "Installer mounting a television on a wall",
      intro: "A mounted item is only as safe as its fixings. We locate studs, choose the right anchors for the wall type and mount at the height and level you want.",
      benefits: [["Right anchors for the wall", "Drywall, plaster, brick and concrete each get the correct fixing."], ["Level and centered", "We measure and mark before drilling."], ["Cables handled", "Cords are routed and tidied where possible."]],
      included: ["Stud and wall check", "Mounting hardware", "Leveling", "Cable tidying"] },
    { slug: "door-and-window-fixes", title: "Door and window fixes", tag: "Doors and windows",
      short: "Sticking doors, loose hinges, worn locks and drafty frames repaired.",
      kw: "door hinge repair", alt: "Fixing a door hinge with a screwdriver",
      intro: "Doors that stick, windows that rattle and locks that jam are daily annoyances. We adjust, repair or replace the worn parts so everything opens, closes and locks properly.",
      benefits: [["Smooth operation", "Hinges, latches and tracks are adjusted and lubricated."], ["Better security", "Worn locks and strike plates are replaced."], ["Less draft", "Weatherstripping and sealant close the gaps."]],
      included: ["Hinge and latch adjustment", "Lock repair or swap", "Weatherstripping", "Trim touch-up"] },
    { slug: "drywall-and-paint-touch-ups", title: "Drywall and paint touch-ups", tag: "Walls and paint",
      short: "Patching, sanding and paint touch-ups that make walls look untouched.",
      kw: "drywall patch paint wall", alt: "Patching a hole in a drywall wall",
      intro: "Holes from old mounts, door-handle dents and scuffs are easy to fix when the patch is blended well. We repair, sand, prime and match the paint on small areas.",
      benefits: [["Seamless patches", "Repairs are feathered so they disappear under paint."], ["Color matching", "Bring a spare can or we match from the wall."], ["Floors protected", "Drop cloths cover everything in the work area."]],
      included: ["Hole and crack repair", "Sanding and priming", "Paint touch-up", "Drop cloths and cleanup"] }
  ];
  var QUOTES = [
    ["“Called on a Sunday evening and the repair was done that night. Neat work and a fair price.”", "Maria G.", "Homeowner, Alamo Heights"],
    ["“Clear quote, on-time arrival and everything left clean. We have booked a second visit.”", "Tom R.", "Landlord, Southtown"]
  ];
  var icons = {};

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  /* ---------- Build services grid + detail pages ---------- */
  function card(s) {
    return '<a class="svc-card" href="#service/' + s.slug + '" data-anim><div class="svc-text"><div><p class="tag">' + esc(s.tag) + '</p><h3 class="h5">' + esc(s.title) + '</h3><p>' + esc(s.short) + '</p></div><span class="btn btn-outline">Learn more →</span></div><div class="media svc-img reveal"><img data-pixabay="' + s.kw + '" data-orientation="all" alt="' + esc(s.alt) + '" width="268" height="272"></div></a>';
  }
  $("#services-grid").innerHTML = SERVICES.map(card).join("");

  var host = $("#service-pages");
  SERVICES.forEach(function (s) {
    var others = SERVICES.filter(function (o) { return o.slug !== s.slug; }).slice(0, 4);
    var sec = document.createElement("section");
    sec.className = "page"; sec.setAttribute("data-page", "service/" + s.slug); sec.hidden = true;
    sec.innerHTML =
      '<section class="top" data-section="page-top"><div class="container"><div class="top-head"><h1 class="h1 center">' + esc(s.title) + '</h1></div><div class="media top-img reveal"><img data-pixabay="' + s.kw + '" data-orientation="horizontal" data-large="1" alt="' + esc(s.alt) + '" width="1265" height="480"></div></div></section>' +
      '<section class="sec" data-section="service-detail"><div class="container"><div class="sd-wrap">' +
        '<div class="sd-rich" data-anim><h4 class="h4">About this service</h4><p>' + esc(s.intro) + '</p><h4 class="h4">Why book it with us</h4><ul>' +
          s.benefits.map(function (b) { return "<li><strong>" + esc(b[0]) + "</strong> – " + esc(b[1]) + "</li>"; }).join("") + '</ul></div>' +
        '<div class="sd-incl"><h2 class="h4">What\'s included</h2><div class="sd-list">' + s.included.map(function (i) { return "<div data-anim><p>" + esc(i) + "</p></div>"; }).join("") + '</div></div>' +
        '<div class="sd-test" data-anim>' + QUOTES.map(function (q) { return "<blockquote><q>" + q[0].slice(1, -1) + "</q><div><h3 class=\"h6\">" + q[1] + "</h3><p>" + q[2] + "</p></div></blockquote>"; }).join("") + '</div>' +
      '</div></div></section>' +
      '<section class="sec" data-section="services-grid"><div class="container"><div class="center-head"><div class="label"><i></i>Our services</div><h2 class="h2">Explore our other services</h2><p>More ways we can help around your home.</p></div><div class="svc-grid">' + others.map(card).join("") + '</div></div></section>' +
      '<section class="cta-banner" data-section="cta-banner"><div class="media bgimg"><img data-pixabay="bright home interior" data-orientation="horizontal" data-large="1" alt="Bright, tidy home interior" width="1440" height="540"></div><div class="container cta-in"><div class="cta-card" data-anim><h2 class="h2">Ready to book ' + esc(s.title.toLowerCase()) + '?</h2><p>Call any hour of the day and we will set up a time that suits you.</p><a class="btn btn-light" href="tel:2103961149">Call ' + PHONE + '</a></div></div></section>';
    host.appendChild(sec);
  });

  /* ---------- Images (Pixabay) ---------- */
  var cache = {};
  function setPlaceholder(img) {
    img.onload = null; img.removeAttribute("src");
    var c = img.parentNode.querySelector(".credit"); if (c) c.remove();
  }
  function fetchHits(q, o) {
    var k = q + "|" + o;
    if (!cache[k]) {
      var url = "https://www.navegaid.com/api/outreach/images?key=" + encodeURIComponent(PIXABAY_KEY) + "&q=" + encodeURIComponent(q) + "&image_type=photo&orientation=" + o + "&safesearch=true&per_page=10";
      cache[k] = fetch(url).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) { return d.hits || []; });
    }
    return cache[k];
  }
  function resolveImages(page) {
    var used = {};
    $$("img[data-pixabay]", page).forEach(function (img) {
      if (img.getAttribute("data-done")) return;
      img.setAttribute("data-done", "1");
      if (!PIXABAY_KEY) { setPlaceholder(img); return; }
      var q = img.getAttribute("data-pixabay"), o = img.getAttribute("data-orientation") || "all";
      fetchHits(q, o).then(function (hits) {
        var h = hits.filter(function (x) { return !used[x.id]; })[0] || hits[0];
        if (!h) throw 0;
        used[h.id] = 1;
        img.onerror = function () { setPlaceholder(img); };
        img.onload = function () {
          if (!img.parentNode.querySelector(".credit")) {
            var c = document.createElement("span"); c.className = "credit"; c.textContent = "Image: Pixabay";
            img.parentNode.appendChild(c);
          }
        };
        img.src = img.getAttribute("data-large") ? (h.largeImageURL || h.webformatURL) : h.webformatURL;
      }).catch(function () { setPlaceholder(img); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var io = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  function observe(page) {
    $$("[data-anim], .reveal, .tl-item", page).forEach(function (el) {
      if (el.classList.contains("in")) return;
      if (io) io.observe(el); else el.classList.add("in");
    });
  }

  /* ---------- Router ---------- */
  var pages = $$(".page");
  var titles = { home: "Handyman in San Antonio, TX", about: "About us", services: "Services", contact: "Contact", "404": "Page not found" };
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#/, "")) || "home";
    var page = pages.filter(function (p) { return p.getAttribute("data-page") === h; })[0];
    if (!page) { h = "404"; page = pages.filter(function (p) { return p.getAttribute("data-page") === "404"; })[0]; }
    pages.forEach(function (p) { p.hidden = p !== page; });
    var t = titles[h];
    if (!t && h.indexOf("service/") === 0) {
      var s = SERVICES.filter(function (x) { return "service/" + x.slug === h; })[0]; t = s ? s.title : "Services";
    }
    document.title = t + " — " + BIZ;
    var section = h.indexOf("service/") === 0 ? "services" : h;
    $$("[data-nav]").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === section); });
    closeMenu();
    window.scrollTo(0, 0);
    resolveImages(page); observe(page);
    if (page.querySelector(".slider")) sliderGo(0, true);
    $$(".faq-a", page).forEach(function (a) { if (!a.parentNode.classList.contains("open")) a.style.height = "0px"; });
  }
  window.addEventListener("hashchange", route);

  /* ---------- Mobile menu ---------- */
  var nav = $("#nav"), burger = $("#burger");
  function closeMenu() { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 991) closeMenu(); });

  /* ---------- FAQ accordion ---------- */
  document.addEventListener("click", function (e) {
    var q = e.target.closest(".faq-q"); if (!q) return;
    var item = q.parentNode, a = $(".faq-a", item), open = item.classList.toggle("open");
    q.setAttribute("aria-expanded", open);
    a.style.height = open ? a.scrollHeight + "px" : "0px";
  });

  /* ---------- Project slider ---------- */
  var sl = $("#projects"), slides = $(".slides", sl), n = $$(".slide", sl).length, idx = 0, dotsBox = $(".dots", sl), timer;
  for (var i = 0; i < n; i++) { var b = document.createElement("button"); b.setAttribute("aria-label", "Go to job " + (i + 1)); (function (k) { b.addEventListener("click", function () { sliderGo(k); }); })(i); dotsBox.appendChild(b); }
  function sliderGo(k) {
    idx = (k + n) % n; slides.style.transform = "translateX(-" + idx * 100 + "%)";
    $$("button", dotsBox).forEach(function (d, j) { d.classList.toggle("on", j === idx); });
    $(".prev", sl).style.opacity = idx === 0 ? ".6" : "1";
  }
  $(".prev", sl).addEventListener("click", function () { sliderGo(idx - 1); });
  $(".next", sl).addEventListener("click", function () { sliderGo(idx + 1); });
  var tx = 0;
  sl.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  sl.addEventListener("touchend", function (e) { var d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 40) sliderGo(idx + (d < 0 ? 1 : -1)); });
  sliderGo(0);

  /* ---------- Forms (mailto, no backend) ---------- */
  $$("form[data-mailto]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = $(".form-msg", f), bad = false;
      $$("[required]", f).forEach(function (inp) {
        var ok = inp.value.trim() && (inp.type !== "email" || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inp.value));
        inp.setAttribute("aria-invalid", ok ? "false" : "true"); if (!ok) bad = true;
      });
      if (bad) { msg.textContent = "— Please check the highlighted fields and try again."; return; }
      var body = [];
      new FormData(f).forEach(function (v, k) { if (String(v).trim()) body.push(k + ": " + v); });
      var subj = f.getAttribute("data-subject");
      var sel = $("select", f); if (sel) subj += " — " + sel.value;
      location.href = "mailto:" + f.getAttribute("data-mailto") + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body.join("\n"));
      msg.textContent = "Thank you. Your email app is opening so you can send this to us. You can also call " + PHONE + ".";
      f.reset();
    });
  });

  /* ---------- Misc ---------- */
  $$(".year").forEach(function (y) { y.textContent = new Date().getFullYear(); });
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { clearInterval(timer); }

  route();
})();
