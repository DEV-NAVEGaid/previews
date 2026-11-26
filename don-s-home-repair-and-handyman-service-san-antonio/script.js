(function () {
  'use strict';

  const PIXABAY_KEY = "navegaid-images";
  const BIZ = "Don's Home Repair and Handyman Service";
  const EMAIL = "auzan@navegaid.com";
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desk = window.matchMedia('(min-width: 992px)');
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  document.documentElement.classList.add('js');

  /* ---------- Image resolver (Pixabay) ---------- */
  const used = new Set();
  const cache = new Map();

  function search(q, o) {
    const k = q + '|' + o;
    if (!cache.has(k)) {
      cache.set(k, fetch(`https://www.navegaid.com/api/outreach/images?key=${PIXABAY_KEY}&q=${encodeURIComponent(q)}&image_type=photo&orientation=${o}&safesearch=true&per_page=10`)
        .then(r => { if (!r.ok) throw new Error('bad'); return r.json(); })
        .then(d => d.hits || [])
        .catch(() => []));
    }
    return cache.get(k);
  }
  function fallback(img) {
    img.onload = null;
    img.onerror = null;
    img.removeAttribute('src');
    img.classList.add('img-ph');
    const c = img.parentElement && img.parentElement.querySelector('.credit');
    if (c) c.remove();
  }
  function credit(img) {
    const p = img.parentElement;
    if (!p || p.querySelector('.credit') || p.classList.contains('no-credit')) return;
    const s = document.createElement('span');
    s.className = 'credit';
    s.textContent = 'Image: Pixabay';
    p.appendChild(s);
  }
  async function resolve(img) {
    if (img.dataset.done) return;
    img.dataset.done = '1';
    if (!PIXABAY_KEY) { fallback(img); return; }
    const hits = await search(img.dataset.pixabay, img.dataset.orientation || 'all');
    const hit = hits.find(h => !used.has(h.id));
    if (!hit) { fallback(img); return; }
    used.add(hit.id);
    img.onload = () => credit(img);
    img.onerror = () => fallback(img);
    img.src = img.hasAttribute('data-large') ? hit.largeImageURL : hit.webformatURL;
  }

  /* ---------- Split letters ---------- */
  function split(el) {
    el.setAttribute('aria-label', el.textContent.trim());
    const walk = n => {
      Array.from(n.childNodes).forEach(c => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(tok => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            w.setAttribute('aria-hidden', 'true');
            Array.from(tok).forEach(ch => {
              const s = document.createElement('span');
              s.className = 'ch';
              s.textContent = ch;
              w.appendChild(s);
            });
            frag.appendChild(w);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1) walk(c);
      });
    };
    walk(el);
    const chs = $$('.ch', el);
    const n = chs.length;
    chs.forEach((s, i) => {
      const d = Math.abs(i - (n - 1) / 2) / (n / 2);
      s.style.transitionDelay = (0.3 + d * 0.5).toFixed(2) + 's';
    });
  }

  /* ---------- Reveal on scroll ---------- */
  $$('[data-stagger]').forEach(c => {
    Array.from(c.children).forEach((k, i) => {
      if (!k.dataset.anim) k.dataset.anim = c.dataset.stagger;
      k.dataset.delay = (i * 0.12).toFixed(2);
    });
  });
  $$('[data-delay]').forEach(el => { el.style.transitionDelay = el.dataset.delay + 's'; });
  if (!reduce) $$('[data-split]').forEach(split);

  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in');
      io.unobserve(el);
      if (el.hasAttribute('data-anim')) {
        el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true });
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  $$('[data-anim],[data-split],.curtain').forEach(el => io.observe(el));

  /* ---------- Scroll effects: scrub rise, parallax, timeline ---------- */
  const scrubs = $$('[data-scrub]');
  const paras = $$('.cta-bg img, .slide > .media img');
  const tlItems = $$('.tl-item');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const vh = window.innerHeight;
    scrubs.forEach(el => {
      if (el.closest('.page').hidden) return;
      if (!desk.matches || reduce) { el.style.transform = ''; return; }
      const r = el.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      el.style.transform = `translateY(${((1 - p) * +el.dataset.scrub).toFixed(1)}px)`;
    });
    if (!reduce) paras.forEach(img => {
      if (img.closest('.page').hidden) return;
      const host = img.closest('.cta-banner, .slide');
      const r = host.getBoundingClientRect();
      const off = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.transform = `translateY(${(-off * 40).toFixed(1)}px) scale(1.2)`;
    });
    tlItems.forEach(it => {
      if (it.closest('.page').hidden) return;
      const f = $('.tl-fill', it);
      const r = it.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
      f.style.height = (p * 100).toFixed(1) + '%';
    });
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- Router ---------- */
  const pages = $$('.page');
  const names = pages.map(p => p.dataset.page);
  const TITLES = {
    'home': 'Home', 'about': 'About', 'services': 'Services', 'contact': 'Contact',
    'service/home-repair': 'Home repair', 'service/handyman-services': 'Handyman services', '404': 'Page not found'
  };
  const header = $('.site-header');

  function route() {
    let h = '';
    try { h = decodeURIComponent(location.hash.replace(/^#\/?/, '')); } catch (e) { h = ''; }
    h = h || 'home';
    const name = names.indexOf(h) > -1 ? h : '404';
    pages.forEach(p => { p.hidden = p.dataset.page !== name; });
    const top = name.split('/')[0];
    document.body.dataset.route = top;
    $$('[data-nav]').forEach(a => {
      if (a.dataset.nav === top) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    closeMenu();
    window.scrollTo(0, 0);
    document.title = (name === 'home' ? BIZ + ' — Handyman in San Antonio, TX' : TITLES[name] + ' — ' + BIZ);
    const page = pages.find(p => p.dataset.page === name);
    $$('img[data-pixabay]', page).forEach(resolve);
    requestAnimationFrame(onScroll);
  }
  window.addEventListener('hashchange', route);

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('.menu-btn');
  function closeMenu() {
    header.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }
  menuBtn.addEventListener('click', () => {
    const o = header.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(o));
    menuBtn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  });
  $('#menu').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- FAQ accordions ---------- */
  document.addEventListener('click', e => {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.closest('.faq-item');
    const open = item.classList.toggle('open');
    q.setAttribute('aria-expanded', String(open));
  });

  /* ---------- Project slider ---------- */
  (function () {
    const sl = $('.slider');
    if (!sl) return;
    const track = $('.track-s', sl);
    const len = $$('.slide', sl).length;
    const dots = $$('.s-dots button', sl);
    let i = 0;
    function go(n) {
      i = (n + len) % len;
      track.style.transform = `translateX(${-100 * i}%)`;
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
    }
    $('.next', sl).addEventListener('click', () => go(i + 1));
    $('.prev', sl).addEventListener('click', () => go(i - 1));
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    let x0 = null;
    sl.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    sl.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    go(0);
  })();

  /* ---------- Forms ---------- */
  const okEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  const cf = $('#contact-form');
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const err = $('.err', cf), ok = $('.ok', cf);
    err.hidden = true; ok.hidden = true;
    const f = new FormData(cf);
    const email = String(f.get('email') || '').trim();
    if (!okEmail(email)) {
      err.textContent = '— Enter a valid email address so we can reply.';
      err.hidden = false;
      $('#cf-email').focus();
      return;
    }
    const subject = String(f.get('subject') || 'Select one...');
    const body = `Name: ${f.get('name') || ''}\nEmail: ${email}\nPhone: ${f.get('phone') || ''}\nSubject: ${subject}\n\n${f.get('message') || ''}`;
    const subj = subject === 'Select one...' ? 'Website enquiry' : subject;
    ok.textContent = 'Thank you! Your email app will open so you can send the message. You can also call (210) 410-4759.';
    ok.hidden = false;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  });

  const nf = $('#news-form');
  nf.addEventListener('submit', e => {
    e.preventDefault();
    const msg = $('.news-msg');
    const v = $('#news-email').value.trim();
    msg.hidden = false;
    if (!okEmail(v)) { msg.textContent = '— Enter a valid email address.'; return; }
    msg.textContent = 'Thank you for subscribing.';
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Subscribe me to updates')}&body=${encodeURIComponent('Please add this address to your updates list: ' + v)}`;
  });

  $('#year').textContent = new Date().getFullYear();

  route();
})();
