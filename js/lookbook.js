/**
 * Dikshi Technologies - Virtual Lookbook & Interactive Outfit Carousel
 * Exact reverse-engineered Switchblade mathematical cosine U-curve animation
 * Responsive Grid & Flex architecture with 100% fluid transitions
 */

(function () {
  'use strict';

  // 1. Data configuration matching Switchblade & Dikshi POS items
  const PRODUCTS = [
    {
      key: 'cap',
      label: 'Limited Edition',
      category: 'Headwear & Caps',
      price: 899,
      sku: 'DIK-CAP-01',
      desc: 'Premium Embroidered Star Cotton Snapback Cap',
      stock: 48,
      thumb: 'assets/one-standard-cap.png',
      worn: 'assets/cap3.png'
    },
    {
      key: 'headphones2',
      label: 'Audio',
      category: 'Lifestyle Acoustics',
      price: 2499,
      sku: 'DIK-AUD-20',
      desc: 'Studio Wireless Metallic Sound Over-Ear Headphones',
      stock: 22,
      thumb: 'assets/one-standard-headphones2.png',
      worn: 'assets/headphones3.png'
    },
    {
      key: 'earrings',
      label: 'Jewelry',
      category: 'Fancy Ornaments',
      price: 1299,
      sku: 'DIK-JWL-77',
      desc: 'Handcrafted Golden Flame Fluid Sculptural Earrings',
      stock: 65,
      thumb: 'assets/one-standard-earrings.png',
      worn: 'assets/earrings3.png'
    },
    {
      key: 'sunglasses',
      label: 'Eyewear',
      category: 'Designer Frames',
      price: 1499,
      sku: 'DIK-EYE-42',
      desc: 'Futuristic Dark Shield UV400 Cyber Shades',
      stock: 31,
      thumb: 'assets/one-standard-sunglasses.png',
      worn: 'assets/sunglasses3.png'
    },
    {
      key: 'watch',
      label: 'Watch',
      category: 'Timepieces',
      price: 3999,
      sku: 'DIK-WTC-88',
      desc: 'Desert Sand Matte Tactical Chronograph Watch',
      stock: 19,
      thumb: 'assets/one-standard-watch.png',
      worn: 'assets/watch3.png'
    },
    {
      key: 'bag',
      label: 'Bag',
      category: 'Boutique Leather',
      price: 2199,
      sku: 'DIK-BAG-95',
      desc: 'Ochre Suede Grommet Hobo Shoulder Carryall',
      stock: 14,
      thumb: 'assets/one-standard-bag.png',
      worn: 'assets/bag3.png'
    }
  ];

  const BASE_MODEL = 'assets/model-base.png';

  // Preload all high-res textures into browser cache
  const preloadPool = [];
  function preloadImages() {
    [BASE_MODEL, ...PRODUCTS.map(p => p.thumb), ...PRODUCTS.map(p => p.worn)].forEach(src => {
      const img = new Image();
      img.src = src;
      preloadPool.push(img);
    });
  }
  preloadImages();

  // Exact Switchblade card width formula: clamp(112px, 11.4vw, 168px)
  // Adjusted slightly on small mobile (<480px) to prevent layout overflows
  function calcCardWidth(w) {
    if (w < 480) {
      return Math.min(Math.max(92, 0.22 * w), 112);
    }
    return Math.min(Math.max(112, 0.114 * w), 168);
  }

  // DOM elements
  let container = null;
  let cardsContainer = null;
  let modelWrapper = null;
  let modelCurrentImg = null;
  let modelIncomingImg = null;
  let activeDetailsBox = null;

  // Track state
  let totalCardsCount = PRODUCTS.length * 3;
  let cardElements = [];
  let cardZIndexes = [];

  // Motion physics
  let scrollOffset = 0;
  let lastTimestamp = performance.now();
  let animationFrameId = null;
  let isPlaying = true;
  let speedMultiplier = 1;
  let scrollDirection = 1;

  // Active state
  let activeIndex = -1;
  let activeProductKey = null;
  let currentOutfitSrc = BASE_MODEL;
  let incomingOutfitSrc = null;
  let fadeTimeoutId = null;

  // Pointer drag state
  let isDragging = false;
  let startDragX = 0;
  let startOffset = 0;
  let dragVelocity = 0;
  let lastDragTime = 0;
  let lastDragX = 0;

  function initLookbook() {
    container = document.getElementById('lookbook-stage');
    if (!container) return;

    cardsContainer = document.getElementById('lookbook-cards-track');
    modelWrapper = document.getElementById('lookbook-model-wrapper');
    modelCurrentImg = document.getElementById('lookbook-model-current');
    modelIncomingImg = document.getElementById('lookbook-model-incoming');
    activeDetailsBox = document.getElementById('lookbook-active-hud');

    createCards();

    window.addEventListener('resize', handleResize);

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    setupControlButtons();

    lastTimestamp = performance.now();
    animationFrameId = requestAnimationFrame(animate);
  }

  function createCards() {
    if (!cardsContainer || !container) return;
    cardsContainer.innerHTML = '';
    cardElements = [];
    cardZIndexes = [];

    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const cardH = cardW * 1.09;
    const cardGap = cardW + Math.min(Math.max(16, 0.016 * winW), 32);
    const clientW = container.clientWidth || winW;
    const needed = Math.ceil((clientW + 2 * cardW) / cardGap);
    totalCardsCount = Math.max(PRODUCTS.length, Math.ceil(needed / PRODUCTS.length) * PRODUCTS.length);

    for (let i = 0; i < totalCardsCount; i++) {
      const prod = PRODUCTS[i % PRODUCTS.length];
      const card = document.createElement('div');
      card.className = 'lookbook-card';
      card.style.width = `${cardW}px`;
      card.style.height = `${cardH}px`;
      card.setAttribute('data-index', i);
      card.setAttribute('data-key', prod.key);

      card.innerHTML = `
        <div class="lookbook-card-img-wrap">
          <img src="${prod.thumb}" alt="${prod.label}" loading="eager" draggable="false" />
        </div>
        <p class="lookbook-card-label">${prod.label}</p>
      `;

      card.addEventListener('click', e => {
        e.stopPropagation();
        selectCardByIndex(i);
      });

      cardsContainer.appendChild(card);
      cardElements.push(card);
      cardZIndexes.push('0');
    }
  }

  function handleResize() {
    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const cardH = cardW * 1.09;
    cardElements.forEach(card => {
      card.style.width = `${cardW}px`;
      card.style.height = `${cardH}px`;
    });
  }

  // Exact Switchblade Cosine U-Curve Loop
  function animate(now) {
    const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
    lastTimestamp = now;

    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const clientW = container ? container.clientWidth : winW;
    const clientH = container ? container.clientHeight : 480;
    const trackW = clientW + 2 * cardW;
    const spacing = trackW / totalCardsCount;

    // Movement: dt * (cardW / 2.9) gives the exact Switchblade pace
    if (!isDragging && isPlaying) {
      const step = dt * (cardW / 2.9) * speedMultiplier * scrollDirection;
      scrollOffset = (scrollOffset + step) % trackW;
      if (scrollOffset < 0) scrollOffset += trackW;
    } else if (!isDragging && Math.abs(dragVelocity) > 0.4) {
      scrollOffset = (scrollOffset - dragVelocity * dt * 60) % trackW;
      if (scrollOffset < 0) scrollOffset += trackW;
      dragVelocity *= 0.91;
    }

    // Switchblade trigger line: clientWidth / 2 + 0.9 * cardWidth
    const centerTarget = clientW / 2 + 0.9 * cardW;
    let closestIndex = -1;
    let minDistance = Infinity;

    for (let e = 0; e < totalCardsCount; e++) {
      const card = cardElements[e];
      if (!card) continue;

      let x = (e * spacing - scrollOffset) % trackW;
      if (x < 0) x += trackW;
      x -= cardW;

      // Exact mathematical U-curve
      const y = 0.03 * clientH + 0.55 * clientH * (0.5 - 0.5 * Math.cos((x / (1.2 * clientW)) * Math.PI * 2));

      card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

      // Dynamic z-index
      const z = String(Math.round((x + cardW) / 20));
      if (cardZIndexes[e] !== z) {
        cardZIndexes[e] = z;
        card.style.zIndex = z;
      }

      // Check distance to center trigger line
      const dist = Math.abs(x + cardW / 2 - centerTarget);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = e;
      }
    }

    // Active slot check: if closest card is within activation proximity
    const activationProximity = cardW * 0.9;
    if (minDistance <= activationProximity) {
      if (closestIndex !== -1 && closestIndex !== activeIndex) {
        setActiveCard(closestIndex);
      }
    } else {
      // If gap passes the trigger line (neutral state - Screenshot 3)
      if (activeIndex !== -1) {
        setNeutralState();
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function setActiveCard(index) {
    activeIndex = index;
    const prod = PRODUCTS[index % PRODUCTS.length];
    activeProductKey = prod.key;

    cardElements.forEach((c, idx) => {
      if (idx === index) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // Switchblade aspect ratio: 5452/5136 when accessory active
    if (modelWrapper) {
      modelWrapper.style.aspectRatio = '5452 / 5136';
    }

    updateModelOutfit(prod.worn);
    updateHUD(prod);

    // Sync pill buttons
    document.querySelectorAll('.outfit-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-key') === prod.key) {
        btn.classList.add('active');
        btn.style.borderColor = '#0456DD';
        btn.style.backgroundColor = '#EBF2FF';
        btn.style.color = '#0456DD';
      } else {
        btn.classList.remove('active');
        btn.style.borderColor = 'rgba(13, 13, 13, 0.15)';
        btn.style.backgroundColor = '#ffffff';
        btn.style.color = '#0D0D0D';
      }
    });
  }

  function setNeutralState() {
    activeIndex = -1;
    activeProductKey = null;

    cardElements.forEach(c => c.classList.remove('active'));

    // Switchblade aspect ratio: 1333/2000 when base model active
    if (modelWrapper) {
      modelWrapper.style.aspectRatio = '1333 / 2000';
    }

    updateModelOutfit(BASE_MODEL);

    if (activeDetailsBox) {
      const catEl = activeDetailsBox.querySelector('.hud-category');
      const nameEl = activeDetailsBox.querySelector('.hud-name');
      const skuEl = activeDetailsBox.querySelector('.hud-sku');
      const stockEl = activeDetailsBox.querySelector('.hud-stock');
      const priceEl = activeDetailsBox.querySelector('.hud-price');

      if (catEl) catEl.textContent = 'Dikshi Signature Lookbook';
      if (nameEl) nameEl.textContent = 'Base Apparel Runway — White Crop Top & Denim Jeans';
      if (skuEl) skuEl.textContent = 'SKU: DIK-BASE-00';
      if (stockEl) stockEl.textContent = 'Runway Ready';
      if (priceEl) priceEl.textContent = '₹0';
    }

    document.querySelectorAll('.outfit-pill-btn').forEach(b => {
      b.style.borderColor = 'rgba(13, 13, 13, 0.15)';
      b.style.backgroundColor = '#ffffff';
      b.style.color = '#0D0D0D';
    });
  }

  // Dual-Image Crossfade matching Switchblade's 250ms transition
  function updateModelOutfit(targetSrc) {
    if (targetSrc === currentOutfitSrc) return;

    if (fadeTimeoutId) {
      clearTimeout(fadeTimeoutId);
    }

    incomingOutfitSrc = targetSrc;
    modelIncomingImg.src = incomingOutfitSrc;
    modelIncomingImg.classList.remove('visible');

    requestAnimationFrame(() => {
      modelIncomingImg.classList.add('visible');
    });

    fadeTimeoutId = setTimeout(() => {
      currentOutfitSrc = incomingOutfitSrc;
      modelCurrentImg.src = currentOutfitSrc;
      modelIncomingImg.classList.remove('visible');
      fadeTimeoutId = null;
    }, 250);
  }

  function updateHUD(prod) {
    if (!activeDetailsBox) return;

    const categoryEl = activeDetailsBox.querySelector('.hud-category');
    const nameEl = activeDetailsBox.querySelector('.hud-name');
    const priceEl = activeDetailsBox.querySelector('.hud-price');
    const skuEl = activeDetailsBox.querySelector('.hud-sku');
    const stockEl = activeDetailsBox.querySelector('.hud-stock');

    if (categoryEl) categoryEl.textContent = prod.category;
    if (nameEl) nameEl.textContent = prod.label + ' — ' + prod.desc;
    if (priceEl) priceEl.textContent = '₹' + prod.price.toLocaleString('en-IN');
    if (skuEl) skuEl.textContent = 'SKU: ' + prod.sku;
    if (stockEl) stockEl.textContent = 'Stock: ' + prod.stock + ' units';
  }

  function selectCardByIndex(targetIndex) {
    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const clientW = container.clientWidth || winW;
    const trackW = clientW + 2 * cardW;
    const spacing = trackW / totalCardsCount;

    // Switchblade trigger line (viewer's right, next to model)
    const centerTarget = clientW / 2 + 0.9 * cardW;

    // Exactly align center of target card (i_pos + cardW/2) with centerTarget:
    let newOffset = (targetIndex * spacing - (centerTarget + cardW / 2)) % trackW;
    if (newOffset < 0) newOffset += trackW;

    scrollOffset = newOffset;
    setActiveCard(targetIndex);
  }

  function selectByProductKey(key) {
    if (key === 'reset') {
      setNeutralState();
      return;
    }

    let bestIndex = -1;
    let minDiff = Infinity;
    for (let i = 0; i < totalCardsCount; i++) {
      if (PRODUCTS[i % PRODUCTS.length].key === key) {
        const diff = Math.abs(i - (activeIndex !== -1 ? activeIndex : 0));
        if (diff < minDiff) {
          minDiff = diff;
          bestIndex = i;
        }
      }
    }

    if (bestIndex !== -1) {
      selectCardByIndex(bestIndex);
    }
  }

  // Pointer drag event handlers
  function handleMouseDown(e) {
    if (e.target.closest('button') || e.target.closest('.outfit-controls') || e.target.closest('#lookbook-active-hud')) return;
    isDragging = true;
    startDragX = e.clientX;
    lastDragX = e.clientX;
    lastDragTime = performance.now();
    startOffset = scrollOffset;
    dragVelocity = 0;
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const now = performance.now();
    const dt = (now - lastDragTime) / 1000;
    const deltaX = e.clientX - startDragX;
    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const clientW = container.clientWidth || winW;
    const trackW = clientW + 2 * cardW;

    scrollOffset = (startOffset - deltaX) % trackW;
    if (scrollOffset < 0) scrollOffset += trackW;

    if (dt > 0.005) {
      dragVelocity = (e.clientX - lastDragX) / (dt * 60);
      lastDragX = e.clientX;
      lastDragTime = now;
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchStart(e) {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startDragX = e.touches[0].clientX;
    lastDragX = e.touches[0].clientX;
    lastDragTime = performance.now();
    startOffset = scrollOffset;
    dragVelocity = 0;
  }

  function handleTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;
    const now = performance.now();
    const dt = (now - lastDragTime) / 1000;
    const deltaX = e.touches[0].clientX - startDragX;
    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const clientW = container.clientWidth || winW;
    const trackW = clientW + 2 * cardW;

    scrollOffset = (startOffset - deltaX) % trackW;
    if (scrollOffset < 0) scrollOffset += trackW;

    if (dt > 0.005) {
      dragVelocity = (e.touches[0].clientX - lastDragX) / (dt * 60);
      lastDragX = e.touches[0].clientX;
      lastDragTime = now;
    }
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function setupControlButtons() {
    const playPauseBtn = document.getElementById('lookbook-play-pause-btn');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying
          ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> <span>Pause Flow</span>`
          : `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> <span>Play Flow</span>`;
        playPauseBtn.classList.toggle('active', !isPlaying);
      });
    }

    const speedBtn = document.getElementById('lookbook-speed-btn');
    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        if (speedMultiplier === 1) {
          speedMultiplier = 2;
          speedBtn.innerHTML = `⚡ <span>Speed: 2x</span>`;
        } else if (speedMultiplier === 2) {
          speedMultiplier = 0.5;
          speedBtn.innerHTML = `🐢 <span>Speed: 0.5x</span>`;
        } else {
          speedMultiplier = 1;
          speedBtn.innerHTML = `⏱️ <span>Speed: 1x</span>`;
        }
      });
    }

    const reverseBtn = document.getElementById('lookbook-reverse-btn');
    if (reverseBtn) {
      reverseBtn.addEventListener('click', () => {
        scrollDirection = -scrollDirection;
        reverseBtn.innerHTML = scrollDirection === 1 
          ? `<span>⬅️ Right to Left</span>` 
          : `<span>➡️ Left to Right</span>`;
        reverseBtn.classList.toggle('active', scrollDirection === -1);
      });
    }

    document.querySelectorAll('.outfit-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        selectByProductKey(key);
      });
    });

    const addToPosBtn = document.getElementById('lookbook-add-pos-btn');
    if (addToPosBtn) {
      addToPosBtn.addEventListener('click', () => {
        const prod = PRODUCTS.find(p => p.key === activeProductKey) || PRODUCTS[0];
        if (window.DikshiPOS && typeof window.DikshiPOS.addToCart === 'function') {
          window.DikshiPOS.addToCart({
            id: prod.sku,
            name: prod.label + ' (' + prod.category + ')',
            price: prod.price,
            category: prod.category,
            size: 'Free Size',
            image: prod.thumb
          });
          if (typeof window.showToast === 'function') {
            window.showToast(`✅ Added ${prod.label} (₹${prod.price}) to POS Billing Terminal!`);
          }
        }
      });
    }
  }

  window.DikshiLookbook = {
    init: initLookbook,
    selectProduct: selectByProductKey,
    products: PRODUCTS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLookbook);
  } else {
    initLookbook();
  }
})();
