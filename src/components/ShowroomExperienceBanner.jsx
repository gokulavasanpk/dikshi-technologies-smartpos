import React from 'react';
import ScrollExpand from './ScrollExpand';
import { Sparkles, ArrowDown, Zap, ShieldCheck } from 'lucide-react';

export default function ShowroomExperienceBanner({ onBookDemo }) {
  return (
    <section 
      id="showroom-experience" 
      className="relative w-full bg-slate-50/80 text-slate-900 overflow-visible"
    >
      {/* Soft Ambient Radial Background Lights */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <ScrollExpand
        src="/assets/modern-luxury-showroom.jpg"
        alt="Dikshi Technologies Ultra-Modern Fashion Flagship Showroom"
        title="Engineered for Flagship Fashion Retail"
        scrollHint="Scroll to expand experience"
        useWindowScroll={true}
        startWidth={60}
        startHeight={64}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.2}
        scrollDistance={0.65}
        holdDistance={0.12}
        overlayScrim={0.72}
      >
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center select-none">
          
          {/* Seamless feathered fade merged with the background image behind typography */}
          <div className="absolute -inset-x-12 -inset-y-10 bg-radial from-slate-950/80 via-slate-950/35 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Ambient Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-mono font-bold uppercase tracking-wider mb-5 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>High-Velocity Counter Architecture</span>
          </div>

          {/* Full Bleed Headline with multi-layer drop shadows for maximum contrast */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.1] [text-shadow:_0_4px_24px_rgb(0_0_0_/_95%),_0_2px_8px_rgb(0_0_0_/_95%)]">
            Every Counter. Every Saree. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-200 bg-clip-text text-transparent [text-shadow:_0_4px_24px_rgb(0_0_0_/_95%)]">
              Zero Checkout Delays.
            </span>
          </h2>

          {/* Subtitle with clear readable shadow */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-100 max-w-2xl mx-auto leading-relaxed font-semibold [text-shadow:_0_2px_12px_rgb(0_0_0_/_95%)]">
            Conquer peak festive and wedding rushes with sub-0.8s barcode scanning, dynamic UPI QR on 80mm thermal receipts, and real-time inventory synchronization across multi-floor showrooms.
          </p>

          {/* Key Stat Badges as transparent floating pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono">
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-semibold flex items-center gap-2 shadow-lg">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>&lt;0.8s Scan Speed</span>
            </span>
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-semibold flex items-center gap-2 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Offline Failover</span>
            </span>
            <span className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-semibold flex items-center gap-2 shadow-lg">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>500+ Showrooms Active</span>
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#pos-simulator"
              className="px-6 py-3.5 rounded-xl bg-[#0456DD] hover:bg-[#0344b0] text-white font-bold text-sm tracking-wide transition shadow-xl shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Launch Live POS Simulator</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>

            {onBookDemo && (
              <button
                type="button"
                onClick={onBookDemo}
                className="px-6 py-3.5 rounded-xl bg-black/50 hover:bg-black/70 text-white font-semibold text-sm tracking-wide transition border border-white/30 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98]"
              >
                Schedule Store Demo
              </button>
            )}
          </div>

        </div>
      </ScrollExpand>
    </section>
  );
}
