(function () {
  "use strict";
  var PIXABAY_KEY = "navegaid-images";
  var PHONE = "2104267660", EMAIL = "henry@navegaid.com";
  var NAMES = { "home": "Home", "about": "About", "services": "Services", "contact": "Contact", "404": "Page not found",
    "service/lawn-care": "Lawn care", "service/power-washing": "Power washing" };
  var BIZ = "Lee's lawncare services and powerwash";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Router ---------- */
  var pages = $$(".page");
  function currentKey() {
    var h = decodeURIComponent(location.hash.replace(/^#/, "")) || "home";
    return h;
  }
  function route() {
    var key = currentKey();
    var target = pages.filter(function (p) { return p.getAttribute("data-page") === key; })[0];
    if (!target) { key = "404"; target = pages.filter(function (p) { return p.getAttribute("data-page") === "404"; })[0]; }
    pages.forEach(function (p) { p.hidden = p !== target; });
    window.scrollTo(0, 0);
    document.title = (key === "home" ? BIZ + " | Lawn care and power washing in San Antonio" : NAMES[key] + " | " + BIZ);
    var navKey = key.indexOf("service/") === 0 ? "services" : key;
    $$("[data-nav]").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === navKey); });
    closeMenu();
    initPage(target);
    resolveImages(target);
  }
  window.addEventListener("hashchange", route);

  /* ---------- Mobile menu ---------- */
  var burger = $("#burger"), menu = $("#menu");
  function closeMenu() { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Open menu"); }
  burger.addEventListener("click", function () {
    var open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Entrance animations ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      var d = parseFloat(el.getAttribute("data-delay") || 0);
      setTimeout(function () { el.classList.add("in"); el.classList.remove("pre"); }, d);
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }) : null;

  function splitChars(el) {
    if (el.getAttribute("data-done")) return;
    el.setAttribute("data-done", "1");
    var text = el.textContent; el.setAttribute("aria-label", text); el.textContent = "";
    var n = text.length, mid = (n - 1) / 2;
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span");
      s.className = "ch"; s.setAttribute("aria-hidden", "true");
      s.textContent = text[i];
      s.style.transitionDelay = (Math.abs(i - mid) / Math.max(mid, 1) * 0.5 + 0.1).toFixed(2) + "s";
      el.appendChild(s);
    }
  }

  function initPage(page) {
    $$("[data-split]", page).forEach(function (el) { splitChars(el); });
    var items = $$(".reveal, [data-split], .curtain", page);
    items.forEach(function (el) {
      if (el.classList.contains("curtain") && !reduce) el.classList.add("pre");
      if (reduce || !io) { el.classList.add("in"); el.classList.remove("pre"); return; }
      el.classList.remove("in");
      if (el.classList.contains("curtain")) el.classList.add("pre");
      io.observe(el);
    });
    var tl = $$(".tl-item", page);
    if (tl.length) updateTimeline(page);
  }

  /* ---------- Timeline progress ---------- */
  function updateTimeline(page) {
    var items = $$(".tl-item", page);
    items.forEach(function (it) {
      var r = it.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      var line = $(".line", it); if (line) line.style.setProperty("--p", (p * 100) + "%");
    });
  }
  window.addEventListener("scroll", function () {
    var pg = pages.filter(function (p) { return !p.hidden; })[0];
    if (pg && pg.getAttribute("data-page") === "about") updateTimeline(pg);
  }, { passive: true });

  /* ---------- FAQ accordions ---------- */
  $$(".fq").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement, ans = $(".fa", item);
      var open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      $("use", btn).setAttribute("href", open ? "#i-minus" : "#i-plus");
      ans.style.height = open ? ans.scrollHeight + "px" : "0px";
    });
  });

  /* ---------- Project slider ---------- */
  (function () {
    var root = $("#projects"); if (!root) return;
    var slides = $$(".slide", root), dotsBox = $(".dots", root), idx = 0;
    slides.forEach(function (_, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Show project " + (i + 1));
      b.addEventListener("click", function () { go(i); });
      dotsBox.appendChild(b);
    });
    var dots = $$("button", dotsBox);
    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle("on", i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle("on", i === idx); });
    }
    $(".prev", root).addEventListener("click", function () { go(idx - 1); });
    $(".next", root).addEventListener("click", function () { go(idx + 1); });
    root.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") go(idx - 1); if (e.key === "ArrowRight") go(idx + 1); });
    var sx = 0;
    root.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener("touchend", function (e) { var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1)); });
    go(0);
  })();

  /* ---------- Forms (mailto only) ---------- */
  var cf = $("#contact-form");
  if (cf) cf.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = $("#form-ok"), err = $("#form-err");
    var email = cf.elements.email;
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    email.closest(".fw").classList.toggle("bad", !valid);
    ok.hidden = true; err.hidden = !valid ? false : true;
    if (!valid) { email.focus(); return; }
    var f = cf.elements;
    var body = "Name: " + f.name.value + "\nEmail: " + f.email.value + "\nPhone: " + f.phone.value + "\nSubject: " + f.subject.value + "\n\n" + f.message.value;
    ok.hidden = false;
    location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Website enquiry: " + f.subject.value) + "&body=" + encodeURIComponent(body);
    cf.reset();
  });
  var nf = $("#news-form");
  if (nf) nf.addEventListener("submit", function (e) {
    e.preventDefault();
    var inp = $("#news-email"), msg = $("#news-msg");
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
    msg.hidden = false;
    if (!valid) { msg.textContent = "— Enter a valid email address."; inp.focus(); return; }
    msg.textContent = "Thank you for subscribing.";
    location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Newsletter sign-up") + "&body=" + encodeURIComponent("Please add " + inp.value.trim() + " to your updates.");
    nf.reset();
  });

  var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Pixabay image resolver ---------- */
  var used = {};
  function placeholder(img) {
    img.onload = null; img.onerror = null;
    img.removeAttribute("src");
    img.style.background = "var(--role-color-surface-alt)";
    if (!img.getAttribute("width")) return;
    img.style.aspectRatio = img.getAttribute("width") + " / " + img.getAttribute("height");
  }
  function credit(img) {
    var host = img.parentElement;
    if (!host || host.querySelector(".pix-credit")) return;
    if (getComputedStyle(host).position === "static") host.classList.add("pxwrap");
    var c = document.createElement("span");
    c.className = "pix-credit"; c.textContent = "Image: Pixabay";
    host.appendChild(c);
  }
  function resolveImages(page) {
    $$("img[data-pixabay]", page).forEach(function (img) {
      if (img.getAttribute("data-resolved")) return;
      img.setAttribute("data-resolved", "1");
      img.setAttribute("loading", "lazy");
      if (!PIXABAY_KEY || PIXABAY_KEY.indexOf("__PIXABAY") === 0) { placeholder(img); return; }
      var q = encodeURIComponent(img.getAttribute("data-pixabay"));
      var o = img.getAttribute("data-orientation") || "all";
      var url = "https://www.navegaid.com/api/outreach/images?key=" + PIXABAY_KEY + "&q=" + q + "&image_type=photo&orientation=" + o + "&safesearch=true&per_page=10";
      fetch(url).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
        var hits = (d && d.hits) || [];
        var pick = hits.filter(function (h) { return !used[h.id]; })[0] || hits[0];
        if (!pick) throw 0;
        used[pick.id] = 1;
        img.onerror = function () { placeholder(img); };
        img.onload = function () { credit(img); };
        img.src = img.getAttribute("data-large") ? (pick.largeImageURL || pick.webformatURL) : pick.webformatURL;
      }).catch(function () { placeholder(img); });
    });
  }

  route();
})();
