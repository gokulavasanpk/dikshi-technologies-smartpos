import React, { useState, useEffect, useRef } from 'react';

const PRODUCTS = [
  {
    key: 'cap',
    label: 'Cap',
    category: 'Headwear & Caps',
    price: 899,
    sku: 'DIK-CAP-01',
    desc: 'Premium Embroidered Star Cotton Snapback Cap',
    stock: 48,
    thumb: '/assets/one-standard-cap.png',
    worn: '/assets/cap3.webp'
  },
  {
    key: 'headphones2',
    label: 'Audio',
    category: 'Lifestyle Acoustics',
    price: 2499,
    sku: 'DIK-AUD-20',
    desc: 'Studio Wireless Metallic Sound Over-Ear Headphones',
    stock: 22,
    thumb: '/assets/one-standard-headphones2.png',
    worn: '/assets/headphones3.webp'
  },
  {
    key: 'earrings',
    label: 'Jewelry',
    category: 'Fancy Ornaments',
    price: 1299,
    sku: 'DIK-JWL-77',
    desc: 'Handcrafted Golden Flame Fluid Sculptural Earrings',
    stock: 65,
    thumb: '/assets/one-standard-earrings.png',
    worn: '/assets/earrings3.webp'
  },
  {
    key: 'sunglasses',
    label: 'Eyewear',
    category: 'Designer Frames',
    price: 1499,
    sku: 'DIK-EYE-42',
    desc: 'Futuristic Dark Shield UV400 Cyber Shades',
    stock: 31,
    thumb: '/assets/one-standard-sunglasses.png',
    worn: '/assets/sunglasses3.webp'
  },
  {
    key: 'watch',
    label: 'Watch',
    category: 'Timepieces',
    price: 3999,
    sku: 'DIK-WTC-88',
    desc: 'Desert Sand Matte Tactical Chronograph Watch',
    stock: 19,
    thumb: '/assets/one-standard-watch.png',
    worn: '/assets/watch3.webp'
  },
  {
    key: 'bag',
    label: 'Bag',
    category: 'Boutique Leather',
    price: 2199,
    sku: 'DIK-BAG-95',
    desc: 'Ochre Suede Grommet Hobo Shoulder Carryall',
    stock: 14,
    thumb: '/assets/one-standard-bag.png',
    worn: '/assets/bag3.webp'
  }
];

const BASE_MODEL = '/assets/model-base.webp';

const calcCardWidth = (w) => {
  if (w < 480) {
    return Math.min(Math.max(82, 0.24 * w), 96);
  }
  return Math.min(Math.max(112, 0.114 * w), 168);
};

export default function SwitchbladeLookbook({ onAddToCart }) {
  const stageRef = useRef(null);
  const cardsRef = useRef([]);

  // States
  const [totalCards, setTotalCards] = useState(PRODUCTS.length * 2);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [activeKey, setActiveKey] = useState(null);

  // Playback & Interaction
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [scrollDir, setScrollDir] = useState(1); // 1 = right-to-left (Switchblade natural flow)

  // Smooth Motion Refs for Continuous 60fps/120fps RAF
  const scrollOffsetRef = useRef(0);
  const targetOffsetRef = useRef(null);
  const isTargetingRef = useRef(false);
  const holdUntilRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startDragXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const activeIdxRef = useRef(-1);
  const activeKeyRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Cached layout metrics to eliminate forced layout calculation inside RAF
  const layoutMetricsRef = useRef({
    winW: typeof window !== 'undefined' ? window.innerWidth : 1200,
    clientW: 1200,
    clientH: 480,
    cardW: 140,
    trackW: 1400,
    spacing: 140
  });

  // Preload images into browser memory cache
  useEffect(() => {
    [BASE_MODEL, ...PRODUCTS.map(p => p.thumb), ...PRODUCTS.map(p => p.worn)].forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Responsive card count calculation and metric caching
  useEffect(() => {
    const handleResize = () => {
      if (!stageRef.current) return;
      const winW = window.innerWidth;
      const cardW = calcCardWidth(winW);
      const cardGap = cardW + Math.min(Math.max(16, 0.016 * winW), 32);
      const clientW = stageRef.current.clientWidth || winW;
      const clientH = stageRef.current.clientHeight || 480;
      const trackW = clientW + 2 * cardW;
      const needed = Math.ceil((clientW + 2 * cardW) / cardGap);
      const count = winW < 640
        ? PRODUCTS.length
        : Math.max(PRODUCTS.length * 2, Math.ceil(needed / PRODUCTS.length) * PRODUCTS.length);
      setTotalCards(count);

      layoutMetricsRef.current = {
        winW,
        cardW,
        clientW,
        clientH,
        trackW,
        spacing: trackW / count
      };
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ultra-Smooth Switchblade animation loop with zero layout thrashing
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let animId;

    const animate = (now) => {
      if (!isVisibleRef.current) {
        animId = null;
        return;
      }

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.06);
      lastTimeRef.current = now;

      const { cardW, clientW, clientH, trackW, spacing } = layoutMetricsRef.current;

      // 1. Smooth Glide to Selected Target Card (Exponential Spring Damping)
      if (isTargetingRef.current && targetOffsetRef.current !== null) {
        let diff = (targetOffsetRef.current - scrollOffsetRef.current) % trackW;
        if (diff > trackW / 2) diff -= trackW;
        if (diff < -trackW / 2) diff += trackW;

        if (Math.abs(diff) < 0.6) {
          scrollOffsetRef.current = targetOffsetRef.current;
          isTargetingRef.current = false;
          targetOffsetRef.current = null;
        } else {
          // Smooth deceleration glide factor
          const factor = Math.min(1, dt * 9.5);
          scrollOffsetRef.current = (scrollOffsetRef.current + diff * factor) % trackW;
          if (scrollOffsetRef.current < 0) scrollOffsetRef.current += trackW;
        }
      } else if (!isDraggingRef.current && isPlaying && now > holdUntilRef.current) {
        // 2. Normal Continuous Conveyor Scroll
        const step = dt * (cardW / 2.9) * speedMultiplier * scrollDir;
        scrollOffsetRef.current = (scrollOffsetRef.current + step) % trackW;
        if (scrollOffsetRef.current < 0) scrollOffsetRef.current += trackW;
      } else if (!isDraggingRef.current && Math.abs(dragVelocityRef.current) > 0.4) {
        // 3. Momentum Inertia after User Drag
        scrollOffsetRef.current = (scrollOffsetRef.current - dragVelocityRef.current * dt * 60) % trackW;
        if (scrollOffsetRef.current < 0) scrollOffsetRef.current += trackW;
        dragVelocityRef.current *= 0.91;
      }

      // Exact Switchblade trigger line (viewer's right, next to model)
      const centerTarget = clientW / 2 + 0.9 * cardW;
      let closestIdx = -1;
      let minDistance = Infinity;

      for (let i = 0; i < totalCards; i++) {
        const cardEl = cardsRef.current[i];
        if (!cardEl) continue;

        let x = (i * spacing - scrollOffsetRef.current) % trackW;
        if (x < 0) x += trackW;
        x -= cardW;

        // Mathematical U-curve
        const y = 0.03 * clientH + 0.55 * clientH * (0.5 - 0.5 * Math.cos((x / (1.2 * clientW)) * Math.PI * 2));
        cardEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;

        // Keep cards behind the central model (z: 1 to 20)
        const z = String(Math.min(20, Math.max(1, Math.round((x + cardW) / 60))));
        cardEl.style.zIndex = z;

        const dist = Math.abs(x + cardW / 2 - centerTarget);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }

      // Proximity check: activate during natural scrolling when not actively targeting
      if (!isTargetingRef.current && now > holdUntilRef.current) {
        const activationProximity = cardW * 0.9;
        if (minDistance <= activationProximity) {
          if (closestIdx !== -1 && closestIdx !== activeIdxRef.current) {
            activeIdxRef.current = closestIdx;
            setActiveIdx(closestIdx);
            const prod = PRODUCTS[closestIdx % PRODUCTS.length];
            if (activeKeyRef.current !== prod.key) {
              activeKeyRef.current = prod.key;
              setActiveKey(prod.key);
            }
          }
        } else {
          if (activeIdxRef.current !== -1) {
            activeIdxRef.current = -1;
            setActiveIdx(-1);
            if (activeKeyRef.current !== null) {
              activeKeyRef.current = null;
              setActiveKey(null);
            }
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    // IntersectionObserver pauses RAF when offscreen to save 100% CPU/GPU
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        lastTimeRef.current = performance.now();
        if (!animId) {
          animId = requestAnimationFrame(animate);
        }
      } else {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      }
    }, { threshold: 0.05 });

    observer.observe(stage);

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [totalCards, isPlaying, speedMultiplier, scrollDir]);

  // Pointer drag listeners with momentum release
  const handlePointerDown = (e) => {
    if (e.target.closest('button')) return;
    isDraggingRef.current = true;
    isTargetingRef.current = false;
    targetOffsetRef.current = null;
    holdUntilRef.current = 0;
    startDragXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastDragXRef.current = startDragXRef.current;
    lastDragTimeRef.current = performance.now();
    startOffsetRef.current = scrollOffsetRef.current;
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const now = performance.now();
    const dt = (now - lastDragTimeRef.current) / 1000;
    const deltaX = clientX - startDragXRef.current;

    const winW = window.innerWidth;
    const cardW = calcCardWidth(winW);
    const clientW = stageRef.current ? stageRef.current.clientWidth : winW;
    const trackW = clientW + 2 * cardW;

    scrollOffsetRef.current = (startOffsetRef.current - deltaX) % trackW;
    if (scrollOffsetRef.current < 0) scrollOffsetRef.current += trackW;

    if (dt > 0.005) {
      dragVelocityRef.current = (clientX - lastDragXRef.current) / (dt * 60);
      lastDragXRef.current = clientX;
      lastDragTimeRef.current = now;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Smooth Selection: Glides conveyor to target card and holds view cleanly
  const selectByKey = (key) => {
    if (key === 'reset') {
      setActiveIdx(-1);
      setActiveKey(null);
      activeIdxRef.current = -1;
      activeKeyRef.current = null;
      isTargetingRef.current = false;
      targetOffsetRef.current = null;
      holdUntilRef.current = 0;
      return;
    }

    const { cardW, clientW, trackW, spacing } = layoutMetricsRef.current;
    const centerTarget = clientW / 2 + 0.9 * cardW;

    // Find closest instance of this product on the continuous ring
    let bestIdx = -1;
    let shortestDist = Infinity;
    let bestNewOffset = 0;

    for (let i = 0; i < totalCards; i++) {
      if (PRODUCTS[i % PRODUCTS.length].key === key) {
        let candidateOffset = (i * spacing - (centerTarget + cardW / 2)) % trackW;
        if (candidateOffset < 0) candidateOffset += trackW;

        let diff = (candidateOffset - scrollOffsetRef.current) % trackW;
        if (diff > trackW / 2) diff -= trackW;
        if (diff < -trackW / 2) diff += trackW;

        const absDist = Math.abs(diff);
        if (absDist < shortestDist) {
          shortestDist = absDist;
          bestIdx = i;
          bestNewOffset = candidateOffset;
        }
      }
    }

    if (bestIdx !== -1) {
      targetOffsetRef.current = bestNewOffset;
      isTargetingRef.current = true;
      holdUntilRef.current = performance.now() + 2500;
      
      setActiveIdx(bestIdx);
      activeIdxRef.current = bestIdx;
      setActiveKey(key);
      activeKeyRef.current = key;
    }
  };

  const activeProduct = activeKey ? PRODUCTS.find(p => p.key === activeKey) : null;

  return (
    <section className="relative bg-slate-50/60 overflow-hidden pt-8 sm:pt-16 pb-6 sm:pb-8 select-none w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display break-words">
            One Standard. <br />
            <span className="bg-gradient-to-r from-blue-600 via-[#0456DD] to-indigo-600 bg-clip-text text-transparent">
              Every Part of Retail Fashion.
            </span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-base mt-3 max-w-2xl mx-auto font-normal">
            Drag the accessory conveyor or tap any card to watch the model wear the active boutique accessory in real-time.
          </p>
        </div>

        {/* Action Controls & Outfit Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 max-w-4xl mx-auto">
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsPlaying(prev => !prev)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 shadow-sm transition active:scale-95 flex-shrink-0"
            >
              <span>{isPlaying ? '⏸️ Pause' : '▶️ Play'}</span>
            </button>
            <button
              onClick={() => setSpeedMultiplier(s => s === 1 ? 2 : s === 2 ? 0.5 : 1)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 shadow-sm transition active:scale-95 flex-shrink-0"
            >
              <span>⚡ {speedMultiplier}x</span>
            </button>
            <button
              onClick={() => setScrollDir(d => -d)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1.5 shadow-sm transition active:scale-95 flex-shrink-0 ${
                scrollDir === 1
                  ? 'bg-blue-50 border-blue-200 text-[#0456DD]'
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
              title="Toggle Flow Direction"
            >
              <span>{scrollDir === 1 ? '⇄ Right-to-Left' : '⇄ Left-to-Right'}</span>
            </button>
          </div>

          {/* Outfit Equip Selector - Horizontal Scroll on Mobile */}
          <div className="w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center justify-start sm:justify-end gap-1.5 min-w-max px-1">
              <span className="text-[11px] font-mono text-slate-400 mr-1 uppercase font-semibold hidden md:inline">Equip:</span>
              <button
                onClick={() => selectByKey('cap')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap flex-shrink-0 ${activeKey === 'cap' ? 'border-[#0456DD] bg-blue-50 text-[#0456DD] font-bold shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                🧢 Cap
              </button>
              <button
                onClick={() => selectByKey('headphones2')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap flex-shrink-0 ${activeKey === 'headphones2' ? 'border-[#0456DD] bg-blue-50 text-[#0456DD] font-bold shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                🎧 Audio
              </button>
              <button
                onClick={() => selectByKey('earrings')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap flex-shrink-0 ${activeKey === 'earrings' ? 'border-[#0456DD] bg-blue-50 text-[#0456DD] font-bold shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                ✨ Jewelry
              </button>
              <button
                onClick={() => selectByKey('sunglasses')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap flex-shrink-0 ${activeKey === 'sunglasses' ? 'border-[#0456DD] bg-blue-50 text-[#0456DD] font-bold shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                🕶️ Eyewear
              </button>
              <button
                onClick={() => selectByKey('watch')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap flex-shrink-0 ${activeKey === 'watch' ? 'border-[#0456DD] bg-blue-50 text-[#0456DD] font-bold shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                ⌚ Watch
              </button>
              <button
                onClick={() => selectByKey('bag')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition whitespace-nowrap flex-shrink-0 ${activeKey === 'bag' ? 'border-[#0456DD] bg-blue-50 text-[#0456DD] font-bold shadow-sm' : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'}`}
              >
                👜 Bag
              </button>
              <button
                onClick={() => selectByKey('reset')}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 transition whitespace-nowrap flex-shrink-0"
              >
                🔄 Base
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Cosine Stage */}
      <div
        ref={stageRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: 'clamp(340px, 42vw, 540px)' }}
      >
        {/* Track Cards */}
        <div className="relative w-full h-full pointer-events-none">
          {Array.from({ length: totalCards }, (_, i) => {
            const prod = PRODUCTS[i % PRODUCTS.length];
            const isActive = activeIdx === i;
            return (
              <div
                key={i}
                ref={el => (cardsRef.current[i] = el)}
                onClick={(e) => {
                  e.stopPropagation();
                  selectByKey(prod.key);
                }}
                className={`absolute top-0 left-0 flex flex-col bg-white pointer-events-auto transition-colors duration-200 shadow-sm rounded-lg overflow-hidden ${
                  isActive ? '!border-2 !border-[#0456DD] !shadow-md' : 'border border-[rgba(13,13,13,0.12)]'
                }`}
                style={{
                  width: 'clamp(82px, 11.4vw, 168px)',
                  height: 'calc(clamp(82px, 11.4vw, 168px) * 1.09)',
                  padding: 'clamp(6px, 1vw, 14px)',
                  willChange: 'transform'
                }}
              >
                <div className="relative flex-1 min-h-0 flex items-center justify-center">
                  <img
                    src={prod.thumb}
                    alt={prod.label}
                    className="w-full h-full object-contain pointer-events-none"
                    loading="eager"
                  />
                </div>
                <p className="mt-1 text-center flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis w-full px-0.5 font-mono font-medium text-[clamp(9px,0.85vw,13px)] text-[#0D0D0D]">
                  {prod.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Central Fashion Model - Elevated in front & standing tall */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none flex items-end justify-center"
          style={{
            height: '98%',
            width: 'auto',
            aspectRatio: activeKey ? '5452 / 5136' : '1333 / 2000',
            zIndex: 35
          }}
        >
          {/* Base Model Outfit */}
          <img
            src={BASE_MODEL}
            alt="Dikshi Model Base"
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-contain pointer-events-none transition-opacity duration-300 ease-in-out ${
              !activeKey ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ willChange: 'opacity' }}
          />

          {/* All 6 Equipped Outfits Pre-Mounted for 0ms Zero-Stutter Instant Crossfade */}
          {PRODUCTS.map((prod) => (
            <img
              key={prod.key}
              src={prod.worn}
              alt={prod.label}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-contain pointer-events-none transition-opacity duration-300 ease-in-out ${
                activeKey === prod.key ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ willChange: 'opacity' }}
            />
          ))}
        </div>
      </div>

      {/* Active Item Details HUD Bar */}
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6 mb-4 sm:mb-6 relative z-30">
        <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full overflow-hidden">
          <div className="flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-[#0456DD] flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
              🏷️
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-mono text-xs uppercase font-bold text-[#0456DD] break-words">
                  {activeProduct ? activeProduct.category : 'Dikshi Signature Lookbook'}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                  {activeProduct ? `Stock: ${activeProduct.stock} units` : 'Runway Active'}
                </span>
              </div>
              <h3 className="text-xs sm:text-base font-bold text-slate-900 break-words leading-snug w-full block mt-0.5">
                {activeProduct ? `${activeProduct.label} — ${activeProduct.desc}` : 'Base Runway Apparel — White Crop Top & Denim Jeans'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-mono break-all mt-0.5">
                {activeProduct ? `SKU: ${activeProduct.sku}` : 'SKU: DIK-BASE-00'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-400 block font-mono">Retail Price</span>
              <span className="font-barlow font-black text-xl sm:text-2xl text-[#0D0D0D]">
                {activeProduct ? `₹${activeProduct.price.toLocaleString('en-IN')}` : '₹0'}
              </span>
            </div>
            <button
              onClick={() => {
                if (onAddToCart && activeProduct) {
                  onAddToCart({
                    id: activeProduct.sku,
                    name: `${activeProduct.label} (${activeProduct.category})`,
                    price: activeProduct.price,
                    category: activeProduct.category,
                    size: 'Free Size',
                    image: activeProduct.thumb
                  });
                }
              }}
              disabled={!activeProduct}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                activeProduct 
                  ? 'bg-[#0456DD] hover:bg-[#0344b0] text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>🛒 Add to POS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
