import React, { useState, useEffect, useRef } from 'react';

// Custom SVG Watermarks matching the delicate line-art seen in 8am Showcase
const WATERMARK_ICONS = {
  quickCharge: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 14L28 54h22l-4 32 30-44H52l4-28z" />
      <circle cx="50" cy="50" r="42" strokeDasharray="6 6" strokeWidth="1.5" />
    </svg>
  ),
  payLater: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="26" width="64" height="48" rx="10" />
      <line x1="18" y1="42" x2="82" y2="42" strokeWidth="3" />
      <rect x="28" y="54" width="16" height="8" rx="3" strokeWidth="2" />
      <circle cx="70" cy="58" r="4" strokeWidth="2" />
    </svg>
  ),
  capital: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="50,14 84,36 84,74 50,92 16,74 16,36" strokeWidth="2" />
      <polygon points="50,26 74,42 74,68 50,80 26,68 26,42" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M50 36v28M42 44h16M42 56h16" strokeWidth="2.5" />
    </svg>
  ),
  smartSpend: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="20" y="22" width="60" height="42" rx="8" />
      <path d="M26 36h48M26 48h32" strokeWidth="2" />
      <circle cx="68" cy="48" r="8" strokeWidth="2" />
      <path d="M30 68l12 16h42l-12-16" strokeWidth="1.5" />
    </svg>
  ),
  draft: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 18h36l20 20v44a6 6 0 01-6 6H26a6 6 0 01-6-6V24a6 6 0 016-6z" />
      <polyline points="62,18 62,38 82,38" />
      <line x1="32" y1="50" x2="68" y2="50" strokeWidth="2" />
      <line x1="32" y1="62" x2="56" y2="62" strokeWidth="2" />
      <path d="M48 28l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor" fillOpacity="0.4" />
    </svg>
  ),
  messaging: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 28h56a8 8 0 018 8v30a8 8 0 01-8 8H44l-18 12v-12h-4a8 8 0 01-8-8V36a8 8 0 018-8z" />
      <line x1="34" y1="44" x2="66" y2="44" strokeWidth="2.5" />
      <line x1="34" y1="56" x2="54" y2="56" strokeWidth="2.5" />
      <path d="M72 18l12 10-12 10" strokeWidth="2" />
    </svg>
  ),
  mycaseMcp: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="28" strokeWidth="2" />
      <path d="M50 14v16M50 70v16M14 50h16M70 50h16" strokeWidth="2" />
      <path d="M26 26l12 12M62 62l12 12M26 74l12-12M62 38l12-12" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.3" />
    </svg>
  ),
  caseAssistant: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="50" r="38" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="50" cy="50" r="24" strokeWidth="2" />
      <circle cx="50" cy="50" r="10" strokeWidth="2" fill="currentColor" fillOpacity="0.25" />
      <line x1="50" y1="12" x2="50" y2="88" strokeWidth="1.5" />
      <line x1="12" y1="50" x2="88" y2="50" strokeWidth="1.5" />
    </svg>
  ),
  discoveryAssistant: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="44" cy="44" r="26" strokeWidth="2.5" />
      <line x1="62" y1="62" x2="84" y2="84" strokeWidth="4" strokeLinecap="round" />
      <path d="M34 44a10 10 0 0110-10" strokeWidth="2" />
      <circle cx="74" cy="28" r="6" strokeWidth="1.5" />
    </svg>
  ),
  firmAgent: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="30" r="12" strokeWidth="2" />
      <circle cx="28" cy="70" r="10" strokeWidth="2" />
      <circle cx="72" cy="70" r="10" strokeWidth="2" />
      <line x1="44" y1="40" x2="34" y2="60" strokeWidth="2" />
      <line x1="56" y1="40" x2="66" y2="60" strokeWidth="2" />
      <line x1="38" y1="70" x2="62" y2="70" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  ),
  applePay: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 32c6-10 16-12 16-12s-2 10-10 16c-6 5-14 3-14 3s2-9 8-15z" strokeWidth="2" />
      <path d="M38 42c-12 0-20 10-20 22 0 16 14 26 20 26 5 0 9-4 14-4s9 4 14 4c8 0 18-9 20-22-6-3-9-9-9-15 0-9 8-14 8-14-6-8-15-8-17-8-6 0-11 4-14 4s-10-4-16-4z" strokeWidth="2" />
    </svg>
  ),
  nextDay: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <text x="24" y="66" fontSize="48" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fill="currentColor" fillOpacity="0.28" stroke="none">12</text>
      <circle cx="50" cy="50" r="40" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M50 20v8M50 72v8" strokeWidth="2" />
    </svg>
  ),
  dashboard: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="22" width="64" height="56" rx="8" strokeWidth="2" />
      <line x1="18" y1="36" x2="82" y2="36" strokeWidth="2" />
      <circle cx="28" cy="29" r="2.5" fill="currentColor" />
      <circle cx="36" cy="29" r="2.5" fill="currentColor" />
      <circle cx="44" cy="29" r="2.5" fill="currentColor" />
      <rect x="26" y="46" width="14" height="22" rx="3" strokeWidth="1.5" />
      <rect x="44" y="52" width="14" height="16" rx="3" strokeWidth="1.5" />
      <rect x="62" y="42" width="12" height="26" rx="3" strokeWidth="1.5" />
    </svg>
  ),
  tailoring: (
    <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="70" r="10" strokeWidth="2" />
      <circle cx="68" cy="70" r="10" strokeWidth="2" />
      <line x1="38" y1="64" x2="68" y2="28" strokeWidth="2.5" />
      <line x1="62" y1="64" x2="32" y2="28" strokeWidth="2.5" />
    </svg>
  )
};

const DECK_CARDS = [
  {
    id: "card-1",
    title: "Quick Charge",
    subtitle: "PAYMENTS WITHOUT THE SETUP",
    category: ["get-paid-faster"],
    bg: "linear-gradient(154.8deg, #FFF2C9 22.11%, #FFD0BA 94.46%)",
    lightText: false,
    watermarkKey: "quickCharge",
    tagline: "Instant Counter Tap & Pay"
  },
  {
    id: "card-2",
    title: "Pay Later",
    subtitle: "CLIENT FINANCING AT CHECKOUT",
    category: ["get-paid-faster"],
    bg: "linear-gradient(154.8deg, #C2F1FF 22.11%, #75E0B4 94.46%)",
    lightText: false,
    watermarkKey: "payLater",
    tagline: "Store Credit & Khata Book"
  },
  {
    id: "card-3",
    title: "8am Capital",
    subtitle: "FAST, FLEXIBLE FUNDING",
    category: ["power-growth"],
    bg: "linear-gradient(154.8deg, #1AA68E 22.11%, #88CFDB 94.46%)",
    lightText: true,
    watermarkKey: "capital",
    tagline: "Instant Working Capital"
  },
  {
    id: "card-4",
    title: "Smart Spend Intelligence",
    subtitle: "TRACK EVERY CASE DOLLAR",
    category: ["get-paid-faster", "power-growth"],
    bg: "linear-gradient(154.8deg, #FCF6C7 22.11%, #D5F0EC 94.46%)",
    lightText: false,
    watermarkKey: "smartSpend",
    tagline: "Expense & Margin Tracking"
  },
  {
    id: "card-5",
    title: "Draft",
    subtitle: "FASTER DRAFTS AT EVERY STAGE",
    category: ["run-my-store"],
    bg: "linear-gradient(154.8deg, #1D7FA6 22.11%, #3AB8CD 94.46%)",
    lightText: true,
    watermarkKey: "draft",
    tagline: "GST E-Invoice & E-Way Bills"
  },
  {
    id: "card-6",
    title: "Client Messaging",
    subtitle: "WRITE LESS, CONNECT MORE",
    category: ["run-my-store"],
    bg: "linear-gradient(154.8deg, #FFE6CC 22.11%, #88CFDB 94.46%)",
    lightText: false,
    watermarkKey: "messaging",
    tagline: "WhatsApp Delivery & Offers"
  },
  {
    id: "card-7",
    title: "MyCase MCP",
    subtitle: "ASK CLAUDE ANYTHING, GET THE FULL PICTURE",
    category: ["run-my-store", "power-growth"],
    bg: "linear-gradient(154.8deg, #F2C12E 22.11%, #F05722 94.46%)",
    lightText: true,
    watermarkKey: "mycaseMcp",
    tagline: "POS Smart Sync AI"
  },
  {
    id: "card-8",
    title: "Case Assistant",
    subtitle: "NO SWITCHING TABS OR SCREENS",
    category: ["run-my-store"],
    bg: "linear-gradient(154.8deg, #EDEBFF 22.11%, #BAE5E5 94.46%)",
    lightText: false,
    watermarkKey: "caseAssistant",
    tagline: "Fast Fabric & SKU Search"
  },
  {
    id: "card-9",
    title: "Discovery Assistant",
    subtitle: "EVERY DETAIL SURFACED",
    category: ["power-growth"],
    bg: "linear-gradient(154.8deg, #F2FEDA 22.11%, #F2C12E 94.46%)",
    lightText: false,
    watermarkKey: "discoveryAssistant",
    tagline: "Deadstock & Saree Aging AI"
  },
  {
    id: "card-10",
    title: "Firm Agent",
    subtitle: "SEE EXACTLY WHERE THINGS STAND",
    category: ["run-my-store"],
    bg: "linear-gradient(154.8deg, #FF7381 22.11%, #F9F1CA 94.46%)",
    lightText: true,
    watermarkKey: "firmAgent",
    tagline: "Daily Sales Audit Bot"
  },
  {
    id: "card-11",
    title: "Apple Pay",
    subtitle: "THE CHECKOUT YOUR CLIENTS WANT",
    category: ["get-paid-faster"],
    bg: "linear-gradient(154.8deg, #EDEBFF 22.11%, #BAE5E5 94.46%)",
    lightText: false,
    watermarkKey: "applePay",
    tagline: "Dynamic UPI QR on Receipt"
  },
  {
    id: "card-12",
    title: "Next Day Payments",
    subtitle: "PREDICTABLE DEPOSITS EVERY TIME",
    category: ["get-paid-faster", "power-growth"],
    bg: "linear-gradient(154.8deg, #F2FEDA 22.11%, #F2C12E 94.46%)",
    lightText: false,
    watermarkKey: "nextDay",
    tagline: "T+0 Real-Time Bank Settlement"
  },
  {
    id: "card-13",
    title: "Customizable Dashboards",
    subtitle: "SEE WHAT MATTERS FIRST",
    category: ["run-my-store"],
    bg: "linear-gradient(154.8deg, #FF7381 22.11%, #F9F1CA 94.46%)",
    lightText: true,
    watermarkKey: "dashboard",
    tagline: "Live Multi-Branch Margins"
  },
  {
    id: "card-14",
    title: "Tailoring Studio",
    subtitle: "ALTERATIONS & SAREE FALL TRACKER",
    category: ["run-my-store"],
    bg: "linear-gradient(154.8deg, #D0D8F7 22.11%, #FFF0C4 94.46%)",
    lightText: false,
    watermarkKey: "tailoring",
    tagline: "Alteration Measurement Slips"
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Explore All Solutions' },
  { id: 'get-paid-faster', label: 'Get Paid Faster' },
  { id: 'run-my-store', label: 'Run My Store' },
  { id: 'power-growth', label: 'Power My Growth' }
];

export default function DeckWheel({ onSelectCard }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [apexIndex, setApexIndex] = useState(5); // Starts centered on Draft & Client Messaging
  const stageRef = useRef(null);

  // Filter cards by category
  const visibleCards = activeCategory === 'all'
    ? DECK_CARDS
    : DECK_CARDS.filter(c => c.category.includes(activeCategory));

  // Dragging & Velocity states
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startApexRef = useRef(apexIndex);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  // Responsive elliptical half-oval radii calculation (Rx: semi-major axis, Ry: semi-minor axis)
  const getOvalRadii = () => {
    if (typeof window === 'undefined') return { rx: 960, ry: 420 };
    const w = window.innerWidth;
    // Semi-major axis (horizontal spread across viewport)
    const rx = Math.min(Math.max(580, w * 0.68), 1140);
    // Semi-minor axis (~44% of Rx produces an unmistakable, elegant half-oval arch)
    const ry = Math.round(rx * 0.44);
    return { rx, ry };
  };

  const [radii, setRadii] = useState(getOvalRadii);

  useEffect(() => {
    const handleResize = () => setRadii(getOvalRadii());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Momentum scroll animation
  const stepMomentum = () => {
    if (Math.abs(velocityRef.current) > 0.005) {
      setApexIndex(prev => {
        const next = prev - velocityRef.current;
        return Math.max(0, Math.min(visibleCards.length - 1, next));
      });
      velocityRef.current *= 0.92; // friction
      animFrameRef.current = requestAnimationFrame(stepMomentum);
    }
  };

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startApexRef.current = apexIndex;
    lastXRef.current = startXRef.current;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - startXRef.current;
    const now = performance.now();
    const dt = (now - lastTimeRef.current) / 1000;

    // Angle step: 13.2 degrees per card ~ 48px drag per card
    const cardStepPx = 48;
    const newApex = startApexRef.current - deltaX / cardStepPx;
    setApexIndex(Math.max(0, Math.min(visibleCards.length - 1, newApex)));

    if (dt > 0.005) {
      velocityRef.current = ((clientX - lastXRef.current) / cardStepPx) * (dt * 12);
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    animFrameRef.current = requestAnimationFrame(stepMomentum);
  };

  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      setApexIndex(prev => Math.max(0, Math.min(visibleCards.length - 1, prev + e.deltaX * 0.005)));
    } else {
      setApexIndex(prev => Math.max(0, Math.min(visibleCards.length - 1, prev + e.deltaY * 0.004)));
    }
  };

  const handleCardMouseMove = (id, e) => {
    const cardEl = e.currentTarget;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / (rect.width || 1);
    const py = y / (rect.height || 1);

    const rx = (py - 0.5) * -14;
    const ry = (px - 0.5) * 16;

    cardEl.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    cardEl.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    cardEl.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    cardEl.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  };

  const handleCardMouseLeave = (id, e) => {
    const cardEl = e.currentTarget;
    cardEl.style.setProperty('--rx', '0deg');
    cardEl.style.setProperty('--ry', '0deg');
    cardEl.style.setProperty('--mx', '50%');
    cardEl.style.setProperty('--my', '50%');
  };

  const navigateDeck = (dir) => {
    setApexIndex(prev => Math.max(0, Math.min(visibleCards.length - 1, Math.round(prev) + dir)));
  };

  return (
    <section id="solutions-deck" className="scroll-mt-24 sm:scroll-mt-28 relative w-full bg-slate-50/60 overflow-hidden pt-8 sm:pt-14 pb-10 sm:pb-20 select-none">
      
      {/* Section Headline */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-10">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] max-w-4xl mx-auto font-display">
          Solutions that stack the deck in your favor
        </h2>
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setApexIndex(Math.floor(DECK_CARDS.length / 4));
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-display tracking-wide transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Elliptical Half-Oval Arc Stage */}
      <div
        ref={stageRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing flex justify-center items-start"
        style={{ height: 'clamp(390px, 48vw, 650px)' }}
      >
        {/* Half-Oval Center Origin */}
        <div className="absolute top-[32%] sm:top-[34%] left-1/2 -translate-x-1/2 w-0 h-0">
          
          {visibleCards.map((card, idx) => {
            // Math for elliptical half-oval arc:
            const stepDeg = 11.4;
            const diff = idx - apexIndex;
            const angleDeg = diff * stepDeg;
            const angleRad = (angleDeg * Math.PI) / 180;

            // X = sin(angle) * Rx (semi-major axis: wide horizontal spread)
            const x = Math.sin(angleRad) * radii.rx;

            // Y = (1 - cos(angle)) * Ry (semi-minor axis: gentle, shallow oval descent)
            const y = (1 - Math.cos(angleRad)) * radii.ry;

            // Elliptical tangent rotation angle:
            // For an ellipse with axes Rx and Ry: tan(rotation) = (Ry / Rx) * tan(angleRad)
            // This ensures cards fan smoothly along the oval tangent without excessive tilt
            const tanAlpha = (radii.ry / radii.rx) * Math.tan(angleRad);
            const rotation = (Math.atan(tanAlpha) * 180) / Math.PI;

            // Scale drops subtly as distance from apex increases
            const distFromApex = Math.abs(diff);
            const scale = Math.max(0.88, 1 - distFromApex * 0.022);

            // Z-Index: cards closer to apex are stacked above outer cards
            const zIndex = 60 - Math.round(distFromApex * 2);

            // Is current card the active apex card?
            const isApex = distFromApex < 0.55;

            return (
              <div
                key={card.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setApexIndex(idx);
                  if (onSelectCard) onSelectCard(card);
                }}
                className="absolute top-0 left-0 transition-transform duration-100 ease-out select-none"
                style={{
                  transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                  transformOrigin: '50% 50%',
                  zIndex: zIndex
                }}
              >
                {/* The Wheel Card Component */}
                <div
                  onMouseMove={(e) => handleCardMouseMove(card.id, e)}
                  onMouseLeave={(e) => handleCardMouseLeave(card.id, e)}
                  className={`group relative overflow-hidden rounded-[26px] shadow-[0_16px_40px_rgba(0,0,0,0.16)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.26)] transition-all duration-300 cursor-pointer ${
                    isApex ? '-translate-y-4 ring-2 ring-white/70 shadow-[0_28px_65px_rgba(0,0,0,0.28)]' : 'opacity-98'
                  }`}
                  style={{
                    width: 'clamp(190px, 17.5vw, 255px)',
                    aspectRatio: '0.71',
                    background: card.bg,
                    transform: 'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform'
                  }}
                >
                  {/* Outer / Inner Fine Frame Border matching 8am Showcase */}
                  <div
                    className="absolute inset-[10px] sm:inset-[12px] z-20 rounded-[18px] pointer-events-none border border-white/50 shadow-[0_1px_rgba(255,255,255,0.4),0_0_0_1px_rgba(0,0,0,0.06)_inset]"
                  />

                  {/* Watermark Background Graphic matching 8am Showcase line vectors */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-transform duration-500 group-hover:scale-110 ${
                      card.lightText ? 'text-white opacity-25' : 'text-slate-900 opacity-15'
                    }`}
                  >
                    {WATERMARK_ICONS[card.watermarkKey] || WATERMARK_ICONS.smartSpend}
                  </div>

                  {/* Holographic Glare Layer following cursor */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    style={{
                      background: 'radial-gradient(circle 260px at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35), transparent 70%)'
                    }}
                  />

                  {/* Card Content Layout */}
                  <div className={`relative z-30 h-full w-full p-5 sm:p-6 flex flex-col justify-between ${card.lightText ? 'text-white' : 'text-slate-900'}`}>
                    
                    {/* Top: Title */}
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight leading-[1.12]">
                        {card.title}
                      </h3>
                    </div>

                    {/* Bottom: Subtitle & Tagline */}
                    <div>
                      <p className={`font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-wider leading-snug mb-1 ${
                        card.lightText ? 'text-white/95' : 'text-slate-900/90'
                      }`}>
                        {card.subtitle}
                      </p>
                      <span className={`text-[9px] font-mono uppercase tracking-widest block font-medium ${
                        card.lightText ? 'text-white/70' : 'text-slate-600/80'
                      }`}>
                        {card.tagline}
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>

      {/* Floating Bottom Navigation Controls (Arrows & Apex counter) */}
      <div className="w-full max-w-sm mx-auto px-4 mt-2 flex items-center justify-between">
        
        <button
          onClick={() => navigateDeck(-1)}
          disabled={apexIndex <= 0}
          aria-label="Previous card"
          className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-md flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <span className="font-mono text-xs text-slate-600 font-bold block">
            {Math.round(apexIndex) + 1} of {visibleCards.length}
          </span>
          <span className="text-[11px] text-slate-400 font-display font-medium">
            Drag, scroll or click to rotate
          </span>
        </div>

        <button
          onClick={() => navigateDeck(1)}
          disabled={apexIndex >= visibleCards.length - 1}
          aria-label="Next card"
          className="w-11 h-11 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-md flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>

    </section>
  );
}
