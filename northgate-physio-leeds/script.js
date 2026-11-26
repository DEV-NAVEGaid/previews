const PIXABAY_KEY = "navegaid-images";

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var BUSINESS = {
    name: 'Northgate Physio',
    email: 'hello@northgatephysio.test',
    phone: '0113 496 0123'
  };

  var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqDesktop = window.matchMedia('(min-width: 992px)');
  function reduced() { return mqReduce.matches; }
  function isDesktop() { return mqDesktop.matches; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var main = document.getElementById('main');
  var pages = Array.prototype.slice.call(document.querySelectorAll('main .page'));
  var currentPage = null;
  var hasRouted = false;

  /* ---------------- Mobile menu ---------------- */
  function setMenu(open) {
    if (!header || !toggle) return;
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!header.classList.contains('menu-open'));
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header && header.classList.contains('menu-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (header && header.classList.contains('menu-open') && !header.contains(e.target)) setMenu(false);
  });

  /* ---------------- Split characters ---------------- */
  function splitChars(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', label);
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span');
        w.className = 'w';
        w.setAttribute('aria-hidden', 'true');
        Array.from(part).forEach(function (ch) {
          var c = document.createElement('span');
          c.className = 'ch';
          c.textContent = ch;
          w.appendChild(c);
        });
        frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    var chars = el.querySelectorAll('.ch');
    var mid = (chars.length - 1) / 2 || 1;
    chars.forEach(function (c, i) {
      c.style.transitionDelay = (0.3 + 0.5 * Math.abs(i - mid) / mid).toFixed(3) + 's';
    });
  }

  /* ---------------- Entrance animations ---------------- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.01 }) : null;

  function prepareAnim(el) {
    var a = el.dataset.anim;
    var from = 'none';
    var m = /^fade-(up|down|left|right)-(\d+)$/.exec(a || '');
    if (m) {
      var n = parseInt(m[2], 10);
      if (m[1] === 'up') from = 'translateY(' + n + 'px)';
      else if (m[1] === 'down') from = 'translateY(-' + n + 'px)';
      else if (m[1] === 'left') from = 'translateX(' + n + 'px)';
      else from = 'translateX(-' + n + 'px)';
    } else if (a === 'rise-scale') {
      from = 'translateY(50px) scale(0.9)';
    } else if (a === 'split-chars') {
      splitChars(el);
    }
    el.style.setProperty('--from', from);
    if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 's';
    if ((el.dataset.animOn === 'desktop' && !isDesktop()) || reduced() || !io) {
      el.classList.add('is-in');
      return;
    }
    io.observe(el);
  }
  document.querySelectorAll('[data-anim]').forEach(prepareAnim);
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (reduced() || !io) el.classList.add('is-in');
    else io.observe(el);
  });

  /* ---------------- Pixabay resolver ---------------- */
  var usedIds = new Set();
  var queryCache = new Map();

  function keyMissing() {
    return !PIXABAY_KEY || PIXABAY_KEY.indexOf('__') === 0;
  }
  function fetchHits(q, orientation) {
    var cacheKey = q + '|' + orientation;
    if (!queryCache.has(cacheKey)) {
      var url = 'https://www.navegaid.com/api/outreach/images?key=' + encodeURIComponent(PIXABAY_KEY) +
        '&q=' + encodeURIComponent(q) + '&image_type=photo&orientation=' + encodeURIComponent(orientation) +
        '&safesearch=true&per_page=10';
      queryCache.set(cacheKey, fetch(url).then(function (r) {
        if (!r.ok) throw new Error('Pixabay request failed');
        return r.json();
      }).then(function (d) { return (d && d.hits) || []; }));
    }
    return queryCache.get(cacheKey);
  }
  function failImage(img) {
    img.dataset.pxState = 'failed';
    img.removeAttribute('src');
    img.style.visibility = 'hidden';
  }
  function addCredit(img) {
    if (img.hasAttribute('data-px-nocredit')) return;
    var wrap = img.parentElement;
    if (!wrap || wrap.querySelector('.px-credit')) return;
    var s = document.createElement('span');
    s.className = 'px-credit';
    s.textContent = 'Image: Pixabay';
    wrap.appendChild(s);
  }
  function resolveImages(root) {
    if (!root) return;
    root.querySelectorAll('img[data-pixabay]:not([data-px-state])').forEach(function (img) {
      img.dataset.pxState = 'loading';
      if (keyMissing()) { failImage(img); return; }
      var orientation = img.dataset.orientation || 'all';
      fetchHits(img.dataset.pixabay, orientation).then(function (hits) {
        if (!hits.length) { failImage(img); return; }
        var hit = hits.find(function (h) { return !usedIds.has(h.id); }) || hits[0];
        usedIds.add(hit.id);
        var large = img.hasAttribute('data-px-large');
        img.addEventListener('load', function () {
          img.dataset.pxState = 'done';
          addCredit(img);
        }, { once: true });
        img.addEventListener('error', function () { failImage(img); }, { once: true });
        img.src = large ? (hit.largeImageURL || hit.webformatURL) : hit.webformatURL;
      }).catch(function () { failImage(img); });
    });
  }

  /* ---------------- Router ---------------- */
  function route() {
    var name = '';
    try { name = decodeURIComponent(location.hash.replace(/^#\/?/, '')).trim(); }
    catch (e) { name = ''; }
    if (name === 'main' && currentPage) { main.focus(); return; }
    if (!name || name === 'main') name = 'home';

    var page = pages.find(function (p) { return p.dataset.page === name; }) ||
               pages.find(function (p) { return p.dataset.page === '404'; });
    var changed = page !== currentPage;
    pages.forEach(function (p) { p.hidden = p !== page; });
    currentPage = page;

    document.body.classList.toggle('is-home', page.dataset.page === 'home');
    document.title = page.dataset.title || BUSINESS.name;

    var top = page.dataset.page.split('/')[0];
    var navKey = top === 'service' ? 'services' : top;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var on = a.dataset.nav === navKey;
      a.classList.toggle('is-current', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    setMenu(false);
    window.scrollTo(0, 0);
    resolveImages(page);

    if (changed && hasRouted) {
      var h1 = page.querySelector('h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    }
    hasRouted = true;
    requestAnimationFrame(update);
  }
  window.addEventListener('hashchange', route);

  /* ---------------- Project slider ---------------- */
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.dot'));
    var index = 0;
    function go(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === index;
        s.classList.toggle('is-active', on);
        if (on) s.removeAttribute('aria-hidden');
        else s.setAttribute('aria-hidden', 'true');
      });
      dots.forEach(function (d, k) {
        if (k === index) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }
    var prev = slider.querySelector('[data-prev]');
    var next = slider.querySelector('[data-next]');
    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    slider.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    });
    var startX = null;
    slider.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    slider.addEventListener('pointerup', function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
      startX = null;
    });
    go(0);
  });

  /* ---------------- FAQ accordions ---------------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    var id = 'faq-' + Math.random().toString(36).slice(2, 9);
    ans.id = id;
    btn.setAttribute('aria-controls', id);

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      item.classList.toggle('is-open', open);
      if (reduced()) {
        ans.hidden = !open;
        ans.style.height = open ? 'auto' : '0px';
        return;
      }
      if (open) {
        ans.hidden = false;
        ans.style.height = '0px';
        var h = ans.scrollHeight;
        requestAnimationFrame(function () { ans.style.height = h + 'px'; });
      } else {
        ans.style.height = ans.scrollHeight + 'px';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { ans.style.height = '0px'; });
        });
      }
    });
    ans.addEventListener('transitionend', function (e) {
      if (e.propertyName !== 'height') return;
      if (btn.getAttribute('aria-expanded') === 'true') ans.style.height = 'auto';
      else ans.hidden = true;
    });
  });

  /* ---------------- Forms ---------------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input) {
    var wrap = input.closest('.field');
    if (!wrap) return true;
    var err = wrap.querySelector('.field__error');
    var value = input.value.trim();
    var msg = '';
    if (input.required && !value) {
      msg = input.type === 'email' ? '— Please add your email address so we can reply.' : '— Please fill in this field.';
    } else if (input.type === 'email' && value && !EMAIL_RE.test(value)) {
      msg = '— This email address looks incomplete. Please check it.';
    }
    wrap.classList.toggle('has-error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) {
      if (!err.id) err.id = input.id + '-error';
      input.setAttribute('aria-describedby', err.id);
      err.textContent = msg;
    }
    return !msg;
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var cfStatus = contactForm.querySelector('.form__status');
    contactForm.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('blur', function () { validateField(el); });
    });
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = contactForm.querySelectorAll('input, textarea, select');
      var ok = true;
      var firstBad = null;
      fields.forEach(function (el) {
        if (!validateField(el)) { ok = false; if (!firstBad) firstBad = el; }
      });
      if (!ok) {
        cfStatus.textContent = '— Please check the highlighted field.';
        if (firstBad) firstBad.focus();
        return;
      }
      var data = new FormData(contactForm);
      var subject = data.get('subject') || 'General question';
      var body = [
        'Name: ' + (data.get('name') || ''),
        'Email: ' + (data.get('email') || ''),
        'Phone: ' + (data.get('phone') || ''),
        'Subject: ' + subject,
        '',
        String(data.get('message') || '')
      ].join('\n');
      var href = 'mailto:' + BUSINESS.email +
        '?subject=' + encodeURIComponent('Website enquiry – ' + subject) +
        '&body=' + encodeURIComponent(body);
      cfStatus.textContent = 'Thank you. Your email app will open with your message. For the quickest booking, call ' + BUSINESS.phone + '.';
      window.location.href = href;
      contactForm.reset();
    });
  }

  var newsletter = document.getElementById('newsletter-form');
  if (newsletter) {
    var nlInput = newsletter.querySelector('input[type="email"]');
    var nlStatus = document.querySelector('.newsletter__status');
    newsletter.addEventListener('submit', function (e) {
      e.preventDefault();
      var value = nlInput.value.trim();
      if (!value || !EMAIL_RE.test(value)) {
        newsletter.classList.add('has-error');
        nlInput.setAttribute('aria-invalid', 'true');
        nlStatus.textContent = value ? '— This email address looks incomplete.' : '— Please add your email address.';
        nlInput.focus();
        return;
      }
      newsletter.classList.remove('has-error');
      nlInput.setAttribute('aria-invalid', 'false');
      nlStatus.textContent = 'Thank you. Your email app will open to confirm the sign-up.';
      window.location.href = 'mailto:' + BUSINESS.email +
        '?subject=' + encodeURIComponent('Newsletter sign-up') +
        '&body=' + encodeURIComponent('Please add ' + value + ' to the Northgate Physio newsletter.');
      newsletter.reset();
    });
  }

  /* ---------------- Scroll-linked effects ---------------- */
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }
  function update() {
    ticking = false;
    if (!currentPage) return;
    var vh = window.innerHeight || 800;
    var motionOk = !reduced();
    var desk = isDesktop() && motionOk;

    currentPage.querySelectorAll('[data-scrub]').forEach(function (el) {
      if (!desk) { el.style.translate = ''; el.style.scale = ''; return; }
      var host = el.closest('[data-scrub-host]') || el;
      var r = host.getBoundingClientRect();
      var p = clamp((vh - (r.top + r.height * 0.25)) / (vh * 0.8), 0, 1);
      var n = parseFloat(el.dataset.scrub) || 0;
      el.style.translate = '0 ' + (n * (1 - p)).toFixed(1) + 'px';
      if (el.hasAttribute('data-scrub-scale')) el.style.scale = (0.9 + 0.1 * p).toFixed(3);
    });

    currentPage.querySelectorAll('[data-parallax]').forEach(function (el) {
      if (!motionOk) { el.style.translate = ''; return; }
      var host = el.closest('[data-parallax-host]') || el.parentElement;
      var r = host.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      el.style.translate = '0 ' + (-6 + 12 * p).toFixed(2) + '%';
    });

    currentPage.querySelectorAll('.tl-item').forEach(function (item) {
      var line = item.querySelector('.tl-progress');
      if (!line) return;
      var r = item.getBoundingClientRect();
      var p = motionOk ? clamp((vh * 0.6 - r.top) / r.height, 0, 1) : 1;
      line.style.height = (p * 100).toFixed(1) + '%';
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if (mqDesktop.addEventListener) {
    mqDesktop.addEventListener('change', function () {
      if (isDesktop()) setMenu(false);
      update();
    });
  }

  /* ---------------- Footer year ---------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------------- Start ---------------- */
  resolveImages(document.querySelector('.site-header'));
  route();
})();
