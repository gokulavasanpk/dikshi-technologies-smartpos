import React, { useState, useRef } from 'react';
import { Tag, Scissors, QrCode, TrendingUp, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import CircularCarousel from './CircularCarousel';

const TEXTILE_CAPABILITIES = [
  {
    id: 0,
    tabLabel: "Multi-Attribute Tagging",
    tag: "CLOTH & ZARI MATRIX",
    badgeCategory: "FABRIC ARCHITECTURE",
    icon: <Tag className="w-5 h-5 text-sky-600" />,
    title: "Multi-Attribute Cloth Tagging",
    subtitle: "Dynamic hanging tag & thermal sticker printing with zero latency.",
    description: "Generate barcode hangtags encoding cloth type, zari purity (Pure Zari / Half Fine), weaver origin, and matching unstitched blouse pieces. Eliminate manual tag errors during peak festive showroom surges.",
    stats: "100+ Shades per Design",
    points: [
      "Dynamic hanging tag & thermal barcode sticker printing",
      "Cloth matrix: sizes S to 5XL + custom unstitched length",
      "Instant 0.8s barcode scanning with zero database latency"
    ],
    accent: "border-sky-200 bg-sky-50 text-sky-700",
    image: "/assets/carousel-card-tagging.png"
  },
  {
    id: 1,
    tabLabel: "Tailor Slips Hub",
    tag: "WORKSHOP SYNC",
    badgeCategory: "TAILORING LOGISTICS",
    icon: <Scissors className="w-5 h-5 text-rose-600" />,
    title: "Tailor Slips & Alteration Hub",
    subtitle: "Real-time alteration tickets with automated WhatsApp ready alerts.",
    description: "Log fall-pico, blouse stitching, sleeve length, and waist taper requests directly from the billing screen. Sends automatic ready-for-pickup WhatsApp alerts with verified customer pickup QR.",
    stats: "Zero Delivery Delays",
    points: [
      "Itemized tailor job ticket dispatched instantly to workshop",
      "Real-time status tracking: Alteration in Progress ➔ Ready",
      "Automated WhatsApp customer reminder with pickup QR"
    ],
    accent: "border-rose-200 bg-rose-50 text-rose-700",
    image: "/assets/carousel-card-tailor.png"
  },
  {
    id: 2,
    tabLabel: "Counter Billing",
    tag: "FESTIVE RUSH READY",
    badgeCategory: "HIGH-VELOCITY POS",
    icon: <QrCode className="w-5 h-5 text-[#0456DD]" />,
    title: "Sub-Second Counter Billing",
    subtitle: "Conquer peak Diwali & wedding season counter rushes with rapid scans.",
    description: "Conquer peak festive rushes with rapid barcode scans, bundle promotions (Buy 2 Get 1 Saree), and split cash + UPI billing. Keep counter checkout flowing with zero network bottlenecks.",
    stats: "0.8s Bill Speed",
    points: [
      "High-concurrency offline-first counter billing architecture",
      "Auto-calculated apparel GST (5% cloth, 12% luxury silk)",
      "Dynamic PhonePe/GooglePay QR on 80mm thermal receipt"
    ],
    accent: "border-blue-200 bg-blue-50 text-[#0456DD]",
    image: "/assets/carousel-card-billing.png"
  },
  {
    id: 3,
    tabLabel: "Deadstock Alerts",
    tag: "PROFIT INTELLIGENCE",
    badgeCategory: "CAPITAL OPTIMIZATION",
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
    title: "Deadstock & Saree Aging Alerts",
    subtitle: "Identify stagnant bridal sets past 60 days to trigger festive bundles.",
    description: "Never let premium bridal lehengas or unstitched suits linger unsold. Real-time aging dashboard flags items past 60 days to trigger clearance offers and reallocate showroom capital.",
    stats: "32% Faster Turnover",
    points: [
      "Color-coded aging reports (30 / 60 / 90+ days)",
      "Best-selling weaver replenishment recommendations",
      "28% reduction in showroom idle capital"
    ],
    accent: "border-emerald-200 bg-emerald-50 text-emerald-700",
    image: "/assets/carousel-card-deadstock.png"
  }
];

// 8 items for a rich 3D cylinder ring with authentic curvature
const CAROUSEL_ITEMS = [
  ...TEXTILE_CAPABILITIES.map(c => ({
    src: c.image,
    alt: c.title,
    title: c.title,
    subtitle: c.tag
  })),
  ...TEXTILE_CAPABILITIES.map(c => ({
    src: c.image,
    alt: c.title,
    title: c.title,
    subtitle: c.tag
  }))
];

export default function TextileShowcaseBanner() {
  const [activeIdx, setActiveIdx] = useState(0);
  const carouselRef = useRef(null);

  const activeCard = TEXTILE_CAPABILITIES[activeIdx % TEXTILE_CAPABILITIES.length];

  const handleSelectTab = (idx) => {
    setActiveIdx(idx);
    if (carouselRef.current) {
      carouselRef.current.focusIndex(idx);
    }
  };

  const handleCardClick = (item, index) => {
    const normalizedIdx = index % TEXTILE_CAPABILITIES.length;
    setActiveIdx(normalizedIdx);
  };

  return (
    <section id="textile-solutions" className="scroll-mt-24 sm:scroll-mt-28 py-8 sm:py-16 lg:py-20 bg-white text-slate-900 relative overflow-hidden">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Clean Pill Badge, Heading, and Paragraph */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0456DD]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0456DD]">
              Built for Cloth &amp; Fashion Showrooms
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Retail Features Purpose-Built for Textile &amp; Apparel Stores
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            From bridal silk sarees and unstitched fabrics to boutique readymade garments, Dikshi SmartPOS automates your counter billing, barcode tagging, tailoring slip tracking, and inventory aging in one unified platform.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* Interactive 2-Column Split: 3D CircularCarousel (Left) + Content (Right)  */}
        {/* ========================================================================= */}
        <div className="bg-slate-50/60 rounded-2xl sm:rounded-[32px] border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-3 sm:p-6 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: 3D CircularCarousel Container                          */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 w-full flex flex-col items-center justify-center">
              <div className="w-full bg-white rounded-xl sm:rounded-[28px] border border-slate-200/80 shadow-sm p-1 sm:p-4 lg:p-5 relative overflow-hidden flex flex-col items-center">
                
                {/* 3D Circular Carousel Frame - TIGHT DYNAMIC HEIGHT, ZERO DEAD WHITE SPACE */}
                <div className="w-full h-[195px] xs:h-[220px] sm:h-[380px] lg:h-[500px] relative">
                  <CircularCarousel
                    ref={carouselRef}
                    items={CAROUSEL_ITEMS}
                    preset="cylinder"
                    intro="rise"
                    cardWidth={270}
                    aspectRatio={0.78}
                    scale={1.42}
                    gap={20}
                    speed={12}
                    curve={0.92}
                    tilt={-4}
                    perspective={2400}
                    draggable={true}
                    pauseOnHover={true}
                    focusOnClick={true}
                    depthFade={0.42}
                    fadeColor="#ffffff"
                    innerShade={0.4}
                    cornerRadius={28}
                    captions={false}
                    onChange={(index) => setActiveIdx(index % TEXTILE_CAPABILITIES.length)}
                    onItemClick={handleCardClick}
                    className="w-full h-full"
                  />
                </div>

                {/* Subtle Interactive Instruction */}
                <div className="mt-1 sm:mt-2 pb-0.5 sm:pb-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 font-medium">
                    Drag, flick or click card to rotate 3D ring
                  </span>
                </div>

              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: Interactive Synchronized Content Card                 */}
            {/* ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 w-full flex flex-col justify-center text-left">
              
              {/* Category Badges Header (matching sample Image 2 & 3) */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-bold tracking-wider uppercase text-[#0456DD] bg-blue-50 border border-blue-200/60">
                  {activeCard.badgeCategory}
                </span>
                <span className="px-3 py-1 rounded-full text-[10.5px] font-mono font-bold tracking-wider uppercase text-slate-700 bg-slate-100 border border-slate-200">
                  {activeCard.tag}
                </span>
              </div>

              {/* 4 Interactive Tab Selector Buttons (matching sample Image 2 & 3) */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {TEXTILE_CAPABILITIES.map((cap, idx) => {
                  const isActive = (activeIdx % TEXTILE_CAPABILITIES.length) === idx;
                  return (
                    <button
                      key={cap.id}
                      onClick={() => handleSelectTab(idx)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 font-display cursor-pointer ${
                        isActive
                          ? 'bg-[#0456DD] text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
                      }`}
                    >
                      {cap.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Card Title with Icon */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center flex-shrink-0">
                  {activeCard.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {activeCard.title}
                </h3>
              </div>

              {/* Highlight Subtitle */}
              <p className="text-sm sm:text-base font-bold text-[#0456DD] tracking-tight font-display mt-1">
                {activeCard.subtitle}
              </p>

              {/* Detailed Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-3 font-normal">
                {activeCard.description}
              </p>

              {/* Feature Bullet Points */}
              <div className="space-y-2.5 mt-5 pt-4 border-t border-slate-200/70">
                {activeCard.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Stat & Action Bar */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Impact Metric:
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200/90 shadow-2xs">
                    {activeCard.stats}
                  </span>
                </div>

                <a
                  href="#pos-simulator"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-wide transition shadow-sm hover:shadow active:scale-95 font-display"
                >
                  <span>Open in POS Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
