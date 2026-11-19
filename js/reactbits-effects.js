/**
 * React Bits - SpotlightCard, TiltedCard & PixelTrail Interactive Effects
 * Pure Vanilla JavaScript implementation matching reactbits.dev
 */

(function () {
  'use strict';

  // 1. Spotlight Card Engine
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
      card.style.position = 'relative';
      card.style.overflow = 'hidden';

      let light = card.querySelector('.spotlight-light');
      if (!light) {
        light = document.createElement('span');
        light.className = 'spotlight-light';
        light.style.cssText = `
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          z-index: 2;
        `;
        card.appendChild(light);
      }

      const color = card.getAttribute('data-spotlight-color') || 'rgba(4, 86, 221, 0.18)';
      const size = parseInt(card.getAttribute('data-spotlight-size') || '300', 10);

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        light.style.opacity = '1';
        light.style.background = `radial-gradient(circle ${size}px at ${x}px ${y}px, ${color}, transparent 80%)`;
      });

      card.addEventListener('pointerleave', () => {
        light.style.opacity = '0';
      });
    });
  }

  // 2. Tilted Card Engine (3D Parallax Tilt)
  function initTiltedCards() {
    const tiltedCards = document.querySelectorAll('.tilted-card');
    tiltedCards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.perspective = '1000px';
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';

      const maxTilt = parseFloat(card.getAttribute('data-max-tilt') || '8');

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;

        const rotateX = -yPercent * maxTilt;
        const rotateY = xPercent * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  // 3. PixelTrail Canvas Effect (reactbits.dev/animations/pixel-trail)
  function initPixelTrails() {
    const containers = document.querySelectorAll('.pixel-trail-container');
    containers.forEach(container => {
      let canvas = container.querySelector('.pixel-trail-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'pixel-trail-canvas';
        canvas.style.cssText = `
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        `;
        container.insertBefore(canvas, container.firstChild);
      }

      const ctx = canvas.getContext('2d');
      const pixelSize = parseInt(container.getAttribute('data-pixel-size') || '18', 10);
      const trailColor = container.getAttribute('data-trail-color') || '4, 86, 221';
      let activePixels = new Map(); // key: "col,row" -> { alpha, timestamp }

      function resize() {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      resize();
      window.addEventListener('resize', resize);

      let animRunning = false;

      function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = performance.now();
        let hasActive = false;

        activePixels.forEach((item, key) => {
          const age = now - item.timestamp;
          const maxAge = 550; // fade duration in ms
          if (age >= maxAge) {
            activePixels.delete(key);
          } else {
            hasActive = true;
            const progress = age / maxAge;
            const alpha = (1 - progress) * 0.35;
            const [c, r] = key.split(',').map(Number);
            const x = c * pixelSize;
            const y = r * pixelSize;

            ctx.fillStyle = `rgba(${trailColor}, ${alpha.toFixed(3)})`;
            ctx.fillRect(x + 1, y + 1, pixelSize - 2, pixelSize - 2);
          }
        });

        if (hasActive) {
          requestAnimationFrame(loop);
        } else {
          animRunning = false;
        }
      }

      container.addEventListener('pointermove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const col = Math.floor(x / pixelSize);
        const row = Math.floor(y / pixelSize);
        const now = performance.now();

        // Light up target and 4-connected neighbors
        const radius = 1;
        for (let dx = -radius; dx <= radius; dx++) {
          for (let dy = -radius; dy <= radius; dy++) {
            if (Math.abs(dx) + Math.abs(dy) <= 1) {
              const k = `${col + dx},${row + dy}`;
              activePixels.set(k, { timestamp: now + Math.random() * 50 });
            }
          }
        }

        if (!animRunning) {
          animRunning = true;
          requestAnimationFrame(loop);
        }
      });
    });
  }

  function initAll() {
    initSpotlightCards();
    initTiltedCards();
    initPixelTrails();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.ReactBitsEffects = {
    initSpotlight: initSpotlightCards,
    initTilt: initTiltedCards,
    initPixelTrail: initPixelTrails
  };
})();
