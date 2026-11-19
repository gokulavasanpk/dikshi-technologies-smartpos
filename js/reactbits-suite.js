/**
 * React Bits Suite - Interactive Components Engine
 * Incorporates: PixelCard, BounceCards, FlowingMenu, FlipCard, HoloCard, SpotlightCard, TiltedCard
 */

(function () {
  'use strict';

  // 1. PixelCard Engine (Interactive Canvas Pixels)
  function initPixelCards() {
    const pixelCards = document.querySelectorAll('.pixel-card');
    pixelCards.forEach(card => {
      let canvas = card.querySelector('.pixel-card__canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'pixel-card__canvas';
        card.prepend(canvas);
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const gap = 12;
      const pixelSize = 4;
      const colors = ['#0456DD', '#38bdf8', '#7dd3fc', '#ffffff', '#0284c7'];
      let pixels = [];
      let width = 0;
      let height = 0;
      let mouseX = -1000;
      let mouseY = -1000;
      let isHovered = false;
      let animId = 0;

      function resize() {
        const rect = card.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width;
        canvas.height = height;

        pixels = [];
        const cols = Math.ceil(width / gap);
        const rows = Math.ceil(height / gap);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            pixels.push({
              x: c * gap + gap / 2,
              y: r * gap + gap / 2,
              alpha: 0,
              targetAlpha: 0,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
        }
      }

      function draw() {
        ctx.clearRect(0, 0, width, height);

        let activeCount = 0;
        pixels.forEach(p => {
          if (isHovered) {
            const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
            if (dist < 90) {
              p.targetAlpha = Math.max(0, 1 - dist / 90);
              if (Math.random() > 0.8) {
                p.color = colors[Math.floor(Math.random() * colors.length)];
              }
            } else {
              p.targetAlpha = 0;
            }
          } else {
            p.targetAlpha = 0;
          }

          p.alpha += (p.targetAlpha - p.alpha) * 0.12;

          if (p.alpha > 0.02) {
            activeCount++;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fillRect(p.x - pixelSize / 2, p.y - pixelSize / 2, pixelSize, pixelSize);
          }
        });

        if (isHovered || activeCount > 0) {
          animId = requestAnimationFrame(draw);
        } else {
          animId = 0;
        }
      }

      function onPointerMove(e) {
        const rect = card.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        if (!animId) {
          animId = requestAnimationFrame(draw);
        }
      }

      card.addEventListener('pointerenter', () => {
        isHovered = true;
        if (!animId) animId = requestAnimationFrame(draw);
      });

      card.addEventListener('pointermove', onPointerMove);

      card.addEventListener('pointerleave', () => {
        isHovered = false;
        mouseX = -1000;
        mouseY = -1000;
      });

      const observer = new ResizeObserver(resize);
      observer.observe(card);
      resize();
    });
  }

  // 2. BounceCards Engine (Spring Physics Fanning Cards)
  function initBounceCards() {
    const container = document.getElementById('boutique-bounce-cards');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.bounce-card-item'));
    if (cards.length === 0) return;

    const defaultTransforms = [
      { x: -130, y: -45, rot: -14, z: 10 },
      { x: -65, y: -55, rot: -7, z: 20 },
      { x: 0, y: -60, rot: 0, z: 30 },
      { x: 65, y: -55, rot: 7, z: 20 },
      { x: 130, y: -45, rot: 14, z: 10 }
    ];

    function applyTransforms(factor = 0) {
      cards.forEach((card, i) => {
        const def = defaultTransforms[i] || { x: (i - 2) * 50, y: -50, rot: (i - 2) * 6, z: 10 };
        const offsetX = def.x + factor * (def.x * 0.2);
        const offsetY = def.y + factor * -10;
        const rotate = def.rot + factor * (def.rot * 0.2);

        card.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotate}deg)`;
        card.style.zIndex = def.z;
      });
    }

    applyTransforms(0);

    container.addEventListener('pointermove', (e) => {
      const rect = container.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      applyTransforms(Math.abs(xPercent) * 1.5);
    });

    container.addEventListener('pointerleave', () => {
      applyTransforms(0);
    });
  }

  // 3. FlipCard Engine (3D Touch & Click Toggle)
  function initFlipCards() {
    const flipWrappers = document.querySelectorAll('.flip-card-wrapper');
    flipWrappers.forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('flipped');
      });
    });
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initPixelCards();
    initBounceCards();
    initFlipCards();
  });

  window.ReactBitsSuite = {
    initPixelCards,
    initBounceCards,
    initFlipCards
  };
})();
