const PIXABAY_KEY = "navegaid-images";

(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var EMAIL = 'office@alamoheightsplumbing.test';
  var NAME = 'Alamo Heights Plumbing';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var menu = document.getElementById('menu');
  var burger = document.querySelector('.burger');

  /* ---------- Router ---------- */
  function route() {
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, '')) || 'home';
    var p = pages.filter(function (x) { return x.dataset.page === h; })[0];
    if (!p) { p = pages.filter(function (x) { return x.dataset.page === '404'; })[0]; h = '404'; }
    pages.forEach(function (x) { x.hidden = x !== p; });
    document.title = p.dataset.title || NAME;
    var top = h.indexOf('service/') === 0 ? 'services' : h;
    navLinks.forEach(function (a) {
      var on = a.dataset.nav === top;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    closeMenu();
    window.scrollTo(0, 0);
    resolveImages(p);
    observeAll(p);
    onScroll();
  }
  window.addEventListener('hashchange', route);

  /* ---------- Mobile menu ---------- */
  function closeMenu() {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }
  burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Split letters ---------- */
  function split(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    el.setAttribute('aria-label', el.textContent.trim());
    var chars = [];
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'w';
            w.setAttribute('aria-hidden', 'true');
            Array.from(part).forEach(function (ch) {
              var s = document.createElement('span');
              s.className = 'ch';
              s.textContent = ch;
              w.appendChild(s);
              chars.push(s);
            });
            frag.appendChild(w);
          });
          n.replaceChild(frag, c);
        } else if (c.nodeType === 1) { walk(c); }
      });
    })(el);
    var mid = (chars.length - 1) / 2;
    chars.forEach(function (s, i) {
      s.style.setProperty('--cd', (0.3 + Math.abs(i - mid) / Math.max(mid, 1) * 0.5).toFixed(2) + 's');
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-split]'), split);

  /* ---------- Entrance animations ---------- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }) : null;
  function observeAll(scope) {
    var els = scope.querySelectorAll('[data-anim], [data-split], .curtain');
    Array.prototype.forEach.call(els, function (el) {
      if (el.classList.contains('in')) return;
      if (!io || reduce) el.classList.add('in'); else io.observe(el);
    });
  }

  /* ---------- Pixabay images ---------- */
  var cache = {};
  var usedByPage = new WeakMap();
  function keyOk() { return PIXABAY_KEY && !/^__.*__$/.test(PIXABAY_KEY); }
  function placeholder(img) {
    img.onload = null;
    img.onerror = null;
    img.removeAttribute('src');
    img.classList.add('ph');
    if (img.parentElement) img.parentElement.classList.remove('has-credit');
  }
  function fetchHits(q, o) {
    var k = q + '|' + o;
    if (!cache[k]) {
      var url = 'https://www.navegaid.com/api/outreach/images?key=' + PIXABAY_KEY + '&q=' + encodeURIComponent(q) + '&image_type=photo&orientation=' + o + '&safesearch=true&per_page=10';
      cache[k] = fetch(url).then(function (r) { if (!r.ok) throw new Error('bad'); return r.json(); }).then(function (d) { return d.hits || []; });
    }
    return cache[k];
  }
  function resolveImages(page) {
    var used = usedByPage.get(page);
    if (!used) { used = new Set(); usedByPage.set(page, used); }
    Array.prototype.forEach.call(page.querySelectorAll('img[data-pixabay]'), function (img) {
      if (img.dataset.done) return;
      img.dataset.done = '1';
      if (!keyOk()) { placeholder(img); return; }
      fetchHits(img.dataset.pixabay, img.dataset.orientation || 'all').then(function (hits) {
        var hit = hits.filter(function (h) { return !used.has(h.id); })[0];
        if (!hit) throw new Error('none');
        used.add(hit.id);
        img.onload = function () { if (img.parentElement) img.parentElement.classList.add('has-credit'); };
        img.onerror = function () { placeholder(img); };
        img.src = img.dataset.large ? (hit.largeImageURL || hit.webformatURL) : hit.webformatURL;
      }).catch(function () { placeholder(img); });
    });
  }

  /* ---------- Slider ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-slider]'), function (root) {
    var track = root.querySelector('.proj-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.proj-slide'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('.proj-dots button'));
    var prev = root.querySelector('.proj-prev');
    var next = root.querySelector('.proj-next');
    var i = 0;
    function go(n) {
      i = Math.max(0, Math.min(slides.length - 1, n));
      track.style.transform = 'translateX(' + (-100 * i) + '%)';
      slides.forEach(function (s, k) { s.setAttribute('aria-hidden', String(k !== i)); });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', String(k === i)); });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }
    prev.addEventListener('click', function () { go(i - 1); });
    next.addEventListener('click', function () { go(i + 1); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    var sx = null;
    root.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      sx = null;
    });
    go(0);
  });

  /* ---------- FAQ accordion ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.faq-item'), function (it) {
    var b = it.querySelector('.faq-q');
    var a = it.querySelector('.faq-a');
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      a.style.height = open ? '0px' : a.scrollHeight + 'px';
      it.classList.toggle('open', !open);
    });
  });
  window.addEventListener('resize', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.faq-item.open .faq-a'), function (a) { a.style.height = a.scrollHeight + 'px'; });
  });

  /* ---------- Forms (mailto, no backend) ---------- */
  function mailto(subject, body) {
    location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }
  var validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

  var cf = document.getElementById('contact-form');
  if (cf) {
    var cmsg = cf.querySelector('.form-msg');
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = cf.elements;
      if (!validEmail(f.email.value.trim())) {
        cmsg.textContent = '— Enter a valid email address so we can reply.';
        f.email.setAttribute('aria-invalid', 'true');
        f.email.focus();
        return;
      }
      f.email.removeAttribute('aria-invalid');
      cmsg.textContent = 'Thank you. Your email app will open with your message. You can also call (210) 555-0142.';
      mailto(f.subject.value + ' | ' + NAME,
        'Name: ' + f.name.value + '\nEmail: ' + f.email.value + '\nPhone: ' + f.phone.value + '\n\n' + f.message.value);
    });
  }
  var nf = document.getElementById('news-form');
  if (nf) {
    var nmsg = document.getElementById('news-msg');
    nf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = document.getElementById('news-email').value.trim();
      if (!validEmail(v)) { nmsg.textContent = '— Enter a valid email address.'; return; }
      nmsg.textContent = 'Thank you for subscribing. Your email app will open to confirm.';
      mailto('Subscribe | ' + NAME, 'Please add this address to your updates list: ' + v);
    });
  }

  /* ---------- Scroll effects: timeline fill + parallax ---------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var vh = window.innerHeight;
      Array.prototype.forEach.call(document.querySelectorAll('.page:not([hidden]) .tl-item'), function (it) {
        var r = it.getBoundingClientRect();
        var f = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
        it.style.setProperty('--fill', (f * 100).toFixed(1) + '%');
      });
      if (reduce) return;
      Array.prototype.forEach.call(document.querySelectorAll('.page:not([hidden]) [data-parallax]'), function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var img = el.querySelector('img');
        if (img) img.style.transform = 'translateY(' + ((r.top + r.height / 2 - vh / 2) * -0.08).toFixed(1) + 'px) scale(1.15)';
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- Init ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  route();
})();
