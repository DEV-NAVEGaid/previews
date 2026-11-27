(function () {
  "use strict";

  const PIXABAY_KEY = "navegaid-images";

  const BIZ = {
    name: "Kirkstall Dental Care",
    tel: "tel:01134960456",
    phone: "0113 496 0456",
    email: "hello@kirkstalldental.test"
  };

  document.documentElement.classList.add("js");

  /* ---------------- Data ---------------- */
  const SERVICES = [
    {
      slug: "check-ups", name: "Check-ups", tag: "Preventive care",
      img: "dentist examination patient", alt: "Dentist carrying out a gentle check-up",
      short: "A thorough, gentle examination of your teeth, gums and mouth, with clear advice and no rush.",
      intro: "A regular check-up is the simplest way to keep problems small. We look closely at your teeth, gums and mouth, talk through anything we find and agree a plan that suits you.",
      benefits: [
        ["Problems caught early", "Small issues are far easier and gentler to treat when we see them early."],
        ["Clear, calm explanations", "We explain what we see in plain English and never rush your questions."],
        ["A plan that suits you", "You leave knowing what, if anything, needs doing and when."]
      ],
      included: ["Full examination", "Oral cancer screening", "X-rays when needed", "Personal care advice"],
      quotes: [
        ["I put off the dentist for years. One calm check-up here and I booked my next one before I left.", "Hannah R.", "Patient since 2021"],
        ["Everything was explained as we went along. No jargon, no pressure, just a clear plan.", "Chris T.", "Check-up patient"]
      ]
    },
    {
      slug: "hygienist-appointments", name: "Hygienist appointments", tag: "Gum health",
      img: "dental hygienist cleaning", alt: "Dental hygienist cleaning a patient's teeth",
      short: "Professional cleaning and practical advice to keep your gums healthy and your teeth feeling fresh.",
      intro: "Our hygienist removes plaque and stains you cannot reach at home and shows you simple habits that make a lasting difference. Appointments are unhurried and as comfortable as we can make them.",
      benefits: [
        ["Healthier gums", "Regular cleaning helps keep gums calm and teeth firmly supported."],
        ["A fresher feeling", "Removing build-up and stains leaves your mouth feeling clean for days."],
        ["Advice you can use", "Practical brushing and flossing tips that fit into a busy routine."]
      ],
      included: ["Scale and polish", "Plaque and stain removal", "Brushing and flossing guidance", "Gum health review"],
      quotes: [
        ["My gums feel so much healthier, and Josie showed me what I was getting wrong with flossing.", "Laura B.", "Hygiene patient"],
        ["Gentle and thorough. I always leave with my teeth feeling brand new.", "Mohammed A.", "Patient since 2022"]
      ]
    },
    {
      slug: "teeth-whitening", name: "Teeth whitening", tag: "Cosmetic care",
      img: "teeth whitening smile", alt: "Patient smiling after teeth whitening",
      short: "A safe, supervised whitening treatment for a brighter smile, planned around your teeth.",
      intro: "Whitening works best when your teeth and gums are healthy, so we start with a quick check and talk through what is realistic. Treatment is supervised by our dental team from start to finish.",
      benefits: [
        ["Planned around you", "We check your teeth first and explain what results to expect."],
        ["Supervised treatment", "Our dental team guides every step so you can feel confident."],
        ["Comfort in mind", "We discuss sensitivity beforehand and give you aftercare advice."]
      ],
      included: ["Whitening consultation", "Gum and tooth health check", "Supervised treatment", "Aftercare advice"],
      quotes: [
        ["Subtle, natural and exactly what I hoped for. They were honest about what whitening could do.", "Priya S.", "Whitening patient"],
        ["Friendly from the consultation to the aftercare. I smile in photos again.", "James L.", "Patient since 2023"]
      ]
    },
    {
      slug: "emergency-appointments", name: "Emergency appointments", tag: "Urgent care",
      img: "dentist emergency toothache", alt: "Dentist reassuring a patient in pain",
      short: "In pain, or have you chipped or lost a tooth? Call us and we will help you as quickly as we can.",
      intro: "Dental emergencies are stressful, and we want you to feel looked after from the first call. Phone us on 0113 496 0456 and tell us what has happened, so we can advise you and see you as quickly as we can.",
      benefits: [
        ["Call first", "Speak to our team on 0113 496 0456 so we understand what has happened and can advise on next steps."],
        ["Pain eased and explained", "We find the cause, ease the pain where we can and explain what comes next."],
        ["Kind, calm care", "You will not be judged or rushed, however long it has been since your last visit."]
      ],
      included: ["Phone advice from our team", "Pain relief and assessment", "Treatment plan explained", "Follow-up if needed"],
      quotes: [
        ["I rang first thing with a broken tooth and was seen quickly. Calm, kind and clear about what would happen next.", "Daniel O.", "Emergency patient"],
        ["Awful toothache and a very worried me. The team could not have been kinder.", "Sophie W.", "Emergency patient"]
      ]
    },
    {
      slug: "invisalign", name: "Invisalign", tag: "Clear aligners",
      img: "clear aligners orthodontic", alt: "Clear aligner held in a hand",
      short: "Discreet clear aligners to straighten teeth gently, with regular reviews along the way.",
      intro: "Invisalign uses a series of clear, removable aligners to move your teeth step by step. We begin with a consultation, plan your treatment with you and check your progress at regular review visits.",
      benefits: [
        ["Discreet and removable", "Clear aligners are hard to spot and come out for eating and cleaning."],
        ["A plan you can see", "We talk through your treatment plan and expected timescale before you start."],
        ["Reviews along the way", "Regular visits keep your treatment on track and your questions answered."]
      ],
      included: ["Consultation and scan", "Personal treatment plan", "Aligner sets", "Regular review visits"],
      quotes: [
        ["Regular reviews kept my aligner treatment on track, and every visit felt friendly and organised.", "Priya S.", "Invisalign patient"],
        ["Nobody at work noticed, and my teeth look great. The team were encouraging throughout.", "Tom H.", "Invisalign patient"]
      ]
    }
  ];

  const STEPS = [
    ["01", "Call or book online", "Phone us on 0113 496 0456, or send a message. Tell us if it is urgent.", "telephone appointment call"],
    ["02", "Meet your dentist", "A friendly chat and gentle examination, at a pace that suits you.", "dentist consultation patient"],
    ["03", "Agree your plan", "We explain your options and costs in plain English before anything begins.", "dentist explaining x-ray"],
    ["04", "Keep smiling", "Regular check-ups and hygiene visits keep your teeth and gums healthy.", "healthy smile woman"]
  ];

  const FAQS = [
    ["Do you offer emergency appointments?", "Yes. If you are in pain or have damaged a tooth, phone 0113 496 0456 as early as you can and tell us what has happened. We keep time free for urgent cases and will do our best to see you quickly."],
    ["What are your opening hours?", "We are open Monday to Friday 8:30–17:30 and on Saturday 9:00–12:00."],
    ["How do I book an appointment?", "Phone us on 0113 496 0456, email hello@kirkstalldental.test or use the form on our contact page. Phone is quickest, especially for emergencies."],
    ["Where are you based?", "You will find us at 22 Abbey Road, Leeds LS5 3HS. The contact page has a map and a link to directions."],
    ["I am nervous about the dentist. Can you help?", "Absolutely. Tell us when you book and we will go at your pace, explain each step and pause whenever you need. Many of our patients felt the same way at first."]
  ];

  const ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m5 12 4 4 10-10"/></svg>';

  /* ---------------- Render helpers ---------------- */
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

  function serviceCard(s) {
    return '<a class="scard rv" href="#service/' + s.slug + '">' +
      '<div class="scard-t"><div><span class="tag">' + esc(s.tag) + '</span><h3>' + esc(s.name) + '</h3><p>' + esc(s.short) + '</p></div>' +
      '<span class="btn ghost">Learn more →</span></div>' +
      '<div class="media"><img data-pixabay="' + s.img + '" data-orientation="horizontal" alt="' + esc(s.alt) + '" width="268" height="272"></div></a>';
  }

  function renderStatic() {
    const rows = document.getElementById("home-service-rows");
    if (rows) {
      rows.innerHTML = SERVICES.slice(0, 4).map(function (s, i) {
        return '<a class="srow rv" href="#service/' + s.slug + '"><span class="circle">0' + (i + 1) + '</span><div><h3>' + esc(s.name) + '</h3><p>' + esc(s.short) + '</p></div></a>';
      }).join("");
    }
    document.querySelectorAll('[data-render="services-grid"]').forEach(function (el) {
      el.innerHTML = SERVICES.map(serviceCard).join("");
    });
    document.querySelectorAll('[data-render="workflow"]').forEach(function (el) {
      el.innerHTML = STEPS.map(function (st) {
        return '<article class="step rv"><div class="media"><img data-pixabay="' + st[3] + '" data-orientation="horizontal" alt="' + esc(st[1]) + '" width="285" height="220"></div><h3>' + st[0] + ' - ' + esc(st[1]) + '</h3><p>' + esc(st[2]) + '</p></article>';
      }).join("");
    });
    document.querySelectorAll('[data-render="faq"]').forEach(function (el, n) {
      el.innerHTML = FAQS.map(function (f, i) {
        const id = "faq" + n + "-" + i;
        return '<div class="faq-item rv"><h3><button type="button" aria-expanded="false" aria-controls="' + id + '"><span>' + esc(f[0]) + '</span><span class="faq-i" aria-hidden="true"></span></button></h3>' +
          '<div class="faq-a" id="' + id + '" role="region"><div><p>' + esc(f[1]) + '</p></div></div></div>';
      }).join("");
    });
    document.querySelectorAll('[data-render="detail"]').forEach(function (el) {
      const s = SERVICES.find(function (x) { return x.slug === el.dataset.slug; });
      const others = SERVICES.filter(function (x) { return x !== s; });
      el.innerHTML =
        '<section class="wrap top" data-section="page-top"><div class="top-head center"><h1 class="rv">' + esc(s.name) + '</h1></div>' +
        '<div class="media top-img"><img data-pixabay="' + s.img + '" data-orientation="horizontal" data-large="1" alt="' + esc(s.alt) + '" width="1265" height="480"></div></section>' +
        '<section class="wrap" data-section="service-detail"><div class="sd-wrap">' +
        '<div class="sd-rich rv"><div><h4>About ' + esc(s.name.toLowerCase()) + '</h4><p>' + esc(s.intro) + '</p></div>' +
        '<div><h4>Why patients choose it</h4><ul>' + s.benefits.map(function (b) { return '<li><strong>' + esc(b[0]) + '</strong> – ' + esc(b[1]) + '</li>'; }).join("") + '</ul></div></div>' +
        '<div class="included sd-rich"><h2 class="rv">What is included</h2><div class="inc-grid">' + s.included.map(function (i) { return '<div class="inc rv"><p>' + esc(i) + '</p></div>'; }).join("") + '</div></div>' +
        '<div class="quotes rv">' + s.quotes.map(function (q) { return '<figure class="quote" style="margin:0"><blockquote>“' + esc(q[0]) + '”</blockquote><figcaption><h3>' + esc(q[1]) + '</h3><p>' + esc(q[2]) + '</p></figcaption></figure>'; }).join("") + '</div>' +
        '</div></section>' +
        '<section class="sec wrap" data-section="services-grid"><div class="sec-head center narrow"><div class="label rv"><i></i><span>Our services</span></div><h2 class="rv">Explore our other services</h2><p class="rv">Everything we offer, under one friendly roof on Abbey Road.</p></div>' +
        '<div class="scards">' + others.map(serviceCard).join("") + '</div></section>' +
        '<section class="sec wrap" data-section="cta-banner"><div class="cta-panel"><div class="cta-text"><h2 class="rv">Ready to take the next step?</h2><p class="rv">Call ' + BIZ.phone + ' to book ' + esc(s.name.toLowerCase()) + ' or to ask about anything urgent.</p><a class="btn inv rv" href="' + BIZ.tel + '">Call ' + BIZ.phone + '</a></div>' +
        '<div class="media"><img data-pixabay="friendly dental team" data-orientation="horizontal" alt="Friendly dental team ready to help" width="560" height="360"></div></div></section>';
    });
  }

  /* ---------------- Router ---------------- */
  const TITLES = { home: "Dentist in Leeds LS5", about: "About us", services: "Services", contact: "Contact", "404": "Page not found" };
  SERVICES.forEach(function (s) { TITLES["service/" + s.slug] = s.name; });

  function route() {
    let h = decodeURIComponent(location.hash.replace(/^#/, "")) || "home";
    let page = document.querySelector('.page[data-page="' + h + '"]');
    if (!page) { h = "404"; page = document.querySelector('.page[data-page="404"]'); }
    document.querySelectorAll(".page").forEach(function (p) { p.hidden = p !== page; });
    document.title = TITLES[h] + " — " + BIZ.name + ", Leeds";
    const top = h.split("/")[0];
    document.querySelectorAll(".menu a[data-nav]").forEach(function (a) { a.classList.toggle("active", a.dataset.nav === top); });
    const header = document.querySelector(".site-header");
    header.classList.remove("open");
    header.querySelector(".burger").setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    resolveImages(page);
    observeReveal(page);
    initSlider(page);
    updateTimeline();
  }

  /* ---------------- Reveal ---------------- */
  let io;
  function observeReveal(root) {
    const items = root.querySelectorAll(".rv:not(.in)");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    }
    items.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- Pixabay images ---------------- */
  const used = new Set();
  const cache = {};
  function hits(q, o) {
    const k = q + "|" + o;
    if (!cache[k]) {
      cache[k] = fetch("https://www.navegaid.com/api/outreach/images?key=" + PIXABAY_KEY + "&q=" + encodeURIComponent(q) + "&image_type=photo&orientation=" + o + "&safesearch=true&per_page=10")
        .then(function (r) { if (!r.ok) throw new Error("bad"); return r.json(); })
        .then(function (d) { return d.hits || []; });
    }
    return cache[k];
  }
  function fallback(img) {
    img.onload = null; img.onerror = null;
    img.removeAttribute("src");
    img.classList.add("ph");
  }
  function addCredit(img) {
    if (img.hasAttribute("data-nocredit")) return;
    const m = img.closest(".media");
    if (!m || m.querySelector(".credit")) return;
    const c = document.createElement("span");
    c.className = "credit"; c.textContent = "Image: Pixabay";
    m.appendChild(c);
  }
  function resolveImg(img) {
    if (img.dataset.done) return;
    img.dataset.done = "1";
    if (!PIXABAY_KEY || /^__/.test(PIXABAY_KEY)) { fallback(img); return; }
    hits(img.dataset.pixabay, img.dataset.orientation || "all").then(function (list) {
      const pick = list.find(function (h) { return !used.has(h.id); }) || list[0];
      if (!pick) throw new Error("none");
      used.add(pick.id);
      img.onload = function () { addCredit(img); };
      img.onerror = function () { fallback(img); };
      img.src = img.dataset.large ? (pick.largeImageURL || pick.webformatURL) : pick.webformatURL;
    }).catch(function () { fallback(img); });
  }
  function resolveImages(page) {
    document.querySelectorAll("img[data-pixabay]").forEach(function (img) {
      if (page.contains(img) || !img.closest(".page")) resolveImg(img);
    });
  }

  /* ---------------- UI: menu, accordion ---------------- */
  function initUI() {
    const header = document.querySelector(".site-header");
    const burger = header.querySelector(".burger");
    burger.addEventListener("click", function () {
      const open = header.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".faq-item button");
      if (!btn) return;
      const item = btn.closest(".faq-item");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  /* ---------------- Slider ---------------- */
  function initSlider(page) {
    const s = page.querySelector("#slider");
    if (!s || s.dataset.ready) return;
    s.dataset.ready = "1";
    const track = s.querySelector(".slides");
    const n = track.children.length;
    const dots = s.querySelector(".dots");
    let i = 0;
    for (let k = 0; k < n; k++) {
      const d = document.createElement("button");
      d.type = "button"; d.setAttribute("aria-label", "Show result " + (k + 1));
      d.addEventListener("click", function () { go(k); });
      dots.appendChild(d);
    }
    function go(k) {
      i = (k + n) % n;
      track.style.transform = "translateX(" + (-100 * i) + "%)";
      Array.prototype.forEach.call(dots.children, function (d, j) { d.classList.toggle("on", j === i); });
    }
    s.querySelector(".prev").addEventListener("click", function () { go(i - 1); });
    s.querySelector(".next").addEventListener("click", function () { go(i + 1); });
    go(0);
  }

  /* ---------------- Timeline progress ---------------- */
  function updateTimeline() {
    const tl = document.getElementById("tl");
    if (!tl || tl.closest(".page").hidden) return;
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    tl.style.setProperty("--p", p.toFixed(3));
  }

  /* ---------------- Forms (mailto, no backend) ---------------- */
  function mailto(subject, body) {
    location.href = "mailto:" + BIZ.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  const validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

  function initForms() {
    const cf = document.getElementById("contact-form");
    if (cf) {
      cf.addEventListener("submit", function (e) {
        e.preventDefault();
        const msg = cf.querySelector(".form-msg");
        const name = cf.elements.name, email = cf.elements.email, text = cf.elements.message;
        [name, email, text].forEach(function (f) { f.classList.remove("err"); });
        if (!name.value.trim()) { name.classList.add("err"); msg.textContent = "— Please add your name so we know who to reply to."; name.focus(); return; }
        if (!validEmail(email.value.trim())) { email.classList.add("err"); msg.textContent = "— Please enter a valid email address so we can reply."; email.focus(); return; }
        if (!text.value.trim()) { text.classList.add("err"); msg.textContent = "— Please tell us briefly how we can help."; text.focus(); return; }
        msg.textContent = "Thank you. Your email app will open so you can send your message. For emergencies please call " + BIZ.phone + ".";
        mailto(cf.elements.subject.value + " — " + name.value.trim(),
          "Name: " + name.value.trim() + "\nEmail: " + email.value.trim() + "\nPhone: " + cf.elements.phone.value.trim() + "\n\n" + text.value.trim());
      });
    }
    const nf = document.getElementById("news-form");
    if (nf) {
      nf.addEventListener("submit", function (e) {
        e.preventDefault();
        const em = document.getElementById("n-email");
        const msg = document.querySelector(".news-msg");
        if (!validEmail(em.value.trim())) { msg.textContent = "Please enter a valid email address."; em.focus(); return; }
        msg.textContent = "Thank you for subscribing. Your email app will open to confirm.";
        mailto("Newsletter sign-up", "Please add this email address to the newsletter: " + em.value.trim());
      });
    }
  }

  /* ---------------- Init ---------------- */
  renderStatic();
  initUI();
  initForms();
  window.addEventListener("hashchange", route);
  window.addEventListener("scroll", updateTimeline, { passive: true });
  document.querySelectorAll(".site-header img[data-pixabay], .site-footer img[data-pixabay]").forEach(resolveImg);
  route();
})();
