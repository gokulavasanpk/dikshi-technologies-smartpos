/**
 * React Bits - CardNav Component Implementation
 * Pure Vanilla JavaScript zero-dependency adaptation of DavidHDev/react-bits CardNav
 */

(function () {
  'use strict';

  const THEMES = {
    dark: {
      '--cn-panel': 'rgba(24, 23, 33, 0.88)',
      '--cn-solid': '#181721',
      '--cn-edge': 'rgba(255, 255, 255, 0.1)',
      '--cn-highlight': 'rgba(255, 255, 255, 0.12)',
      '--cn-shadow': '0 24px 48px -20px rgba(0, 0, 0, 0.8), 0 6px 16px -8px rgba(0, 0, 0, 0.5)',
      '--cn-text': '#f4f4f5',
      '--cn-muted': 'rgba(244, 244, 245, 0.65)',
      '--cn-hover': 'rgba(255, 255, 255, 0.08)',
      '--cn-ring': 'rgba(4, 86, 221, 0.6)',
      '--cn-tile': 'linear-gradient(180deg, #282535 0%, #1c1a26 100%)',
      '--cn-tile-rim': 'inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 4px 10px -4px rgba(0, 0, 0, 0.6)',
      '--cn-cta': 'linear-gradient(180deg, #0456DD 0%, #0344b0 100%)',
      '--cn-cta-ink': '#ffffff',
      '--cn-cta-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 16px -6px rgba(4, 86, 221, 0.5)',
      '--cn-cta-hover': 'brightness(1.15)'
    },
    light: {
      '--cn-panel': 'rgba(255, 255, 255, 0.88)',
      '--cn-solid': '#ffffff',
      '--cn-edge': 'rgba(13, 13, 13, 0.1)',
      '--cn-highlight': 'rgba(255, 255, 255, 0.95)',
      '--cn-shadow': '0 24px 48px -24px rgba(13, 13, 13, 0.25), 0 6px 16px -10px rgba(13, 13, 13, 0.15)',
      '--cn-text': '#0D0D0D',
      '--cn-muted': 'rgba(13, 13, 13, 0.6)',
      '--cn-hover': 'rgba(13, 13, 13, 0.05)',
      '--cn-ring': 'rgba(4, 86, 221, 0.45)',
      '--cn-tile': 'linear-gradient(180deg, #ffffff 0%, #f8f8fa 100%)',
      '--cn-tile-rim': 'inset 0 0 0 1px rgba(13, 13, 13, 0.08), inset 0 1px 0 #ffffff, 0 4px 10px -5px rgba(13, 13, 13, 0.15)',
      '--cn-cta': 'linear-gradient(180deg, #0456DD 0%, #0344b0 100%)',
      '--cn-cta-ink': '#ffffff',
      '--cn-cta-shadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 14px -6px rgba(4, 86, 221, 0.45)',
      '--cn-cta-hover': 'brightness(1.12)'
    }
  };

  const NARROW = 560;
  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function createCardNav(element, options = {}) {
    if (!element) return;

    const {
      theme = 'dark',
      surface = 'glass',
      openOn = 'click',
      cardEffect = 'rise',
      stagger = 0.12,
      bounce = 0.2,
      speed = 1,
      cardHeight = 176,
      maxWidth = 840,
      menuLabel = true,
      items = [],
      cta = { label: 'Start Free Trial', href: '#book-demo-section' },
      logoText = 'DIKSHITECH'
    } = options;

    let isOpen = false;
    let isNarrow = false;
    let isShown = false;
    let raf = 0;
    let lastTime = 0;

    const springState = {
      p: 0,
      v: 0,
      height: 0,
      bar: 60
    };

    // Apply CSS Variables
    const palette = THEMES[theme] || THEMES.dark;
    const vars = {
      ...palette,
      '--cn-max': `${maxWidth}px`,
      '--cn-bar': '60px',
      '--cn-inset': '8px',
      '--cn-gap': '8px',
      '--cn-radius': '18px',
      '--cn-logo': '28px',
      '--cn-card': `${cardHeight}px`
    };
    if (surface === 'glass') vars['--cn-blur'] = 'blur(20px) saturate(1.6)';
    if (surface === 'solid') {
      vars['--cn-panel'] = palette['--cn-solid'];
      vars['--cn-blur'] = 'none';
    }

    Object.entries(vars).forEach(([k, v]) => {
      element.style.setProperty(k, v);
    });

    element.classList.add('card-nav');

    // Build DOM
    element.innerHTML = `
      <nav class="card-nav__panel">
        <div class="card-nav__bar">
          <button type="button" class="card-nav__menu" aria-expanded="false" aria-label="Toggle navigation menu">
            <span class="card-nav__burger" aria-hidden="true">
              <span class="card-nav__line card-nav__line--top"></span>
              <span class="card-nav__line card-nav__line--bottom"></span>
            </span>
            ${menuLabel ? `
              <span class="card-nav__menu-label">
                <span class="card-nav__word card-nav__word--open">Menu</span>
                <span class="card-nav__word card-nav__word--close">Close</span>
              </span>
            ` : ''}
          </button>

          <a href="#" class="card-nav__logo flex items-center gap-2">
            <div class="w-6 h-6 rounded bg-[#0456DD] flex items-center justify-center text-white font-bold text-xs">D</div>
            <span class="font-barlow font-black text-base tracking-tight text-white">${logoText}</span>
          </a>

          ${cta ? `<a href="${cta.href}" class="card-nav__cta">${cta.label}</a>` : ''}
        </div>

        <div class="card-nav__content" aria-hidden="true">
          <div class="card-nav__cards">
            ${items.map((item, idx) => `
              <div class="card-nav__card" data-card-index="${idx}">
                <div class="card-nav__card-head">
                  <span class="card-nav__label">${item.label}</span>
                  ${item.description ? `<p class="card-nav__description">${item.description}</p>` : ''}
                </div>
                <ul class="card-nav__links">
                  ${(item.links || []).map(link => `
                    <li>
                      <a href="${link.href}" class="card-nav__link">
                        <span class="card-nav__arrow" aria-hidden="true">
                          <svg class="card-nav__arrow-icon card-nav__arrow-icon--out" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                          <svg class="card-nav__arrow-icon card-nav__arrow-icon--in" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                        </span>
                        <span>${link.label}</span>
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
          ${cta ? `<a href="${cta.href}" class="card-nav__cta card-nav__cta--wide mt-2">${cta.label}</a>` : ''}
        </div>
        <span class="card-nav__rim"></span>
      </nav>
    `;

    const panel = element.querySelector('.card-nav__panel');
    const content = element.querySelector('.card-nav__content');
    const menuBtn = element.querySelector('.card-nav__menu');
    const cardElements = Array.from(element.querySelectorAll('.card-nav__card'));
    const wideCta = element.querySelector('.card-nav__cta--wide');

    function checkNarrow() {
      isNarrow = element.offsetWidth < NARROW;
      element.toggleAttribute('data-narrow', isNarrow);
      if (wideCta) {
        wideCta.style.display = isNarrow ? 'flex' : 'none';
      }
      springState.height = content.offsetHeight;
      render();
    }

    const resizeObserver = new ResizeObserver(checkNarrow);
    resizeObserver.observe(element);
    checkNarrow();

    function render() {
      springState.bar = parseFloat(getComputedStyle(panel).getPropertyValue('--cn-bar')) || 60;
      panel.style.height = `${springState.bar + Math.max(0, springState.p) * springState.height}px`;

      const count = cardElements.length;
      const lag = count > 1 ? Math.min(stagger, 0.7 / (count - 1)) : 0;
      const span = 1 - lag * (count - 1);

      cardElements.forEach((card, index) => {
        const local = clamp((springState.p - index * lag) / Math.max(span, 0.05), 0, 1);
        const e = easeOut(local);

        if (cardEffect === 'unfold') {
          card.style.transform = `translateY(${(1 - e) * -10}px) rotateX(${(1 - e) * -72}deg)`;
          card.style.opacity = `${clamp(local * 1.8, 0, 1)}`;
        } else if (cardEffect === 'fade') {
          card.style.transform = `translateY(${(1 - e) * 6}px)`;
          card.style.opacity = `${e}`;
        } else {
          // 'rise'
          card.style.transform = `translateY(${(1 - e) * 26}px) scale(${0.97 + 0.03 * e})`;
          card.style.opacity = `${e}`;
        }
      });
    }

    function tick(now) {
      raf = 0;
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 1 / 60;
      lastTime = now;
      const target = isOpen ? 1 : 0;

      const k = 160 * speed * speed;
      const zeta = isOpen ? 1 - 0.68 * bounce : 1;
      const steps = Math.ceil(dt / (1 / 240));
      const h = dt / steps;

      for (let i = 0; i < steps; i++) {
        springState.v += (-k * (springState.p - target) - 2 * zeta * Math.sqrt(k) * springState.v) * h;
        springState.p += springState.v * h;
      }

      const done = Math.abs(springState.p - target) < 0.0005 && Math.abs(springState.v) < 0.002;
      if (done) {
        springState.p = target;
        springState.v = 0;
      }

      render();

      if (done && target === 0) {
        isShown = false;
        element.removeAttribute('data-shown');
      }

      if (!done) {
        raf = requestAnimationFrame(tick);
      }
    }

    function setOpen(open) {
      if (open === isOpen) return;
      isOpen = open;
      element.toggleAttribute('data-open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      content.setAttribute('aria-hidden', String(!isOpen));

      if (isOpen) {
        isShown = true;
        element.setAttribute('data-shown', '');
        springState.height = content.offsetHeight;
      }

      if (!raf) {
        lastTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    }

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!isOpen);
    });

    // Close on link click
    element.querySelectorAll('.card-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        setOpen(false);
      });
    });

    // Click outside to close
    document.addEventListener('pointerdown', (e) => {
      if (isOpen && !element.contains(e.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
        menuBtn.focus();
      }
    });

    // Hover open support
    if (openOn === 'hover') {
      let hoverTimeout = 0;
      element.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'touch') return;
        clearTimeout(hoverTimeout);
        setOpen(true);
      });
      element.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'touch') return;
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => setOpen(false), 180);
      });
    }

    render();
  }

  window.CardNav = {
    init: createCardNav
  };

  document.addEventListener('DOMContentLoaded', () => {
    const navMount = document.getElementById('card-nav-root');
    if (navMount) {
      createCardNav(navMount, {
        logoText: 'DIKSHITECH POS',
        cardEffect: 'rise',
        openOn: 'click',
        surface: 'glass',
        stagger: 0.12,
        bounce: 0.2,
        menuLabel: true,
        speed: 1,
        cardHeight: 180,
        maxWidth: 860,
        cta: { label: 'Start Free Trial', href: '#book-demo-section' },
        items: [
          {
            label: 'Software & POS',
            description: 'Fast billing, matrix sizes & thermal receipt printers.',
            links: [
              { label: 'POS Terminal Simulator', href: '#pos-simulator' },
              { label: 'Size × Color Matrix', href: '#features' },
              { label: 'Tailoring Job Cards', href: '#features' },
              { label: 'GST & E-Way Filing', href: '#features' }
            ]
          },
          {
            label: 'Virtual Lookbook',
            description: 'Cosine U-curve 3D merchandising & live accessory try-on.',
            links: [
              { label: 'Virtual Lookbook Stage', href: '#lookbook' },
              { label: 'Snapback Caps (₹899)', href: '#lookbook' },
              { label: 'Fancy Jewellery (₹1,299)', href: '#lookbook' },
              { label: 'Designer Eyewear & Bags', href: '#lookbook' }
            ]
          },
          {
            label: 'Hardware & Pricing',
            description: 'Tested plug & play hardware and flexible monthly subscriptions.',
            links: [
              { label: 'Hardware Compatibility', href: '#hardware' },
              { label: 'Store ROI Calculator', href: '#roi-calc' },
              { label: 'Pricing Plans', href: '#pricing' },
              { label: 'Book Live Demo', href: '#book-demo-section' }
            ]
          }
        ]
      });
    }
  });
})();
