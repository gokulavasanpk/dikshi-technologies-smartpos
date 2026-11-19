import React from 'react';
import { ArrowRight, Sparkles, Barcode, Zap, Scissors, ShieldCheck, CheckCircle2 } from 'lucide-react';
import ReceiptPrinter from './ReceiptPrinter';
import PixelCard from './PixelCard';

export default function HeroSection({ onExplorePOS, onBookDemo }) {
  return (
    <section id="hero" className="relative pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden bg-white">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/70 via-sky-50/30 to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.05] font-display">
              Cloth &amp; Fancy <br />
              <span className="bg-gradient-to-r from-blue-600 via-[#0456DD] to-indigo-600 bg-clip-text text-transparent">
                Billing Software
              </span> <br />
              <span className="text-slate-800 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                by Dikshi Technologies
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-lg mt-5 max-w-xl leading-relaxed font-normal">
              Designed specifically for silk sarees, readymade garments, cosmetics, and boutique fashion showrooms. 
              Supercharge counter checkout to under 0.8s, automate barcode tag generation, and manage inventory seamlessly across sizes and shades.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mt-8">
              <a
                href="#pos-simulator"
                className="px-6 py-3.5 rounded-xl bg-[#0456DD] hover:bg-[#0344b0] text-white font-bold text-sm tracking-wide transition shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 flex items-center gap-2 active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Try Live POS Simulator</span>
              </a>

              <a
                href="#solutions-deck"
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm tracking-wide transition shadow-md active:scale-[0.98] flex items-center gap-2"
              >
                <span>Explore Solutions Deck</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#lookbook-stage"
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm tracking-wide transition border border-slate-200 active:scale-[0.98]"
              >
                <span>Virtual Fitting Runway</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-100 text-slate-800">
              <div>
                <span className="font-extrabold text-2xl sm:text-3xl text-slate-900 block tracking-tight">0.8s</span>
                <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase">Barcode Scan</span>
              </div>
              <div>
                <span className="font-extrabold text-2xl sm:text-3xl text-emerald-600 block tracking-tight">100%</span>
                <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase">Offline Failover</span>
              </div>
              <div>
                <span className="font-extrabold text-2xl sm:text-3xl text-[#0456DD] block tracking-tight">B2B &amp; B2C</span>
                <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase">Auto GST Invoices</span>
              </div>
              <div>
                <span className="font-extrabold text-2xl sm:text-3xl text-slate-900 block tracking-tight">Instant UPI</span>
                <span className="font-mono text-[11px] text-slate-500 tracking-wider uppercase">Receipt QR Code</span>
              </div>
            </div>

          </div>

          {/* Right Hero: React Bits Pro Scaled Receipt Printer Component */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6 lg:py-0">
            {/* Soft ambient depth glow */}
            <div className="absolute w-80 h-80 bg-gradient-to-tr from-blue-100/70 via-indigo-50/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* The Scaled Receipt Printer with Tear Button */}
            <ReceiptPrinter />
          </div>

        </div>

        {/* 3 Value Proposition Cards powered by React Bits PixelCard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <PixelCard
            variant="blue"
            theme="light"
            colors={['#0456DD', '#2563eb', '#60a5fa', '#93c5fd']}
            glowColor="#93c5fd"
            gap={6}
            pixelSize={2.5}
            speed={28}
            spotlight={0.5}
            glow={0.4}
            opacity={0.35}
            fade={0.15}
            radius={20}
            trigger="hover"
            clickPulse={true}
            className="pixel-card-responsive hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6 text-left flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0456DD] flex items-center justify-center text-xl mb-4 font-bold border border-blue-100/80 shadow-xs">
                  🏷️
                </div>
                <h3 className="font-bold text-lg text-slate-900 tracking-tight font-display">
                  Cloth Matrix Barcoding
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Auto-generate scannable barcode tags with fabric type, size (S, M, L, XL, Free), color shade, and wash care.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-[#0456DD]">
                <span>Matrix Tag Engine</span>
                <span className="font-mono text-[10px] bg-blue-50 px-2 py-0.5 rounded text-[#0456DD] font-semibold">0.8s Scan</span>
              </div>
            </div>
          </PixelCard>

          <PixelCard
            theme="light"
            colors={['#059669', '#10b981', '#34d399', '#a7f3d0']}
            glowColor="#a7f3d0"
            gap={6}
            pixelSize={2.5}
            speed={28}
            spotlight={0.5}
            glow={0.4}
            opacity={0.35}
            fade={0.15}
            radius={20}
            trigger="hover"
            clickPulse={true}
            className="pixel-card-responsive hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6 text-left flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4 font-bold border border-emerald-100/80 shadow-xs">
                  ⚡
                </div>
                <h3 className="font-bold text-lg text-slate-900 tracking-tight font-display">
                  Rapid Counter Checkout
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Scan hanging tags in under 0.8 seconds. Apply festive coupon discounts and split payments across cash, card, and UPI.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-emerald-600">
                <span>Split Tender POS</span>
                <span className="font-mono text-[10px] bg-emerald-50 px-2 py-0.5 rounded text-emerald-700 font-semibold">UPI + Cash</span>
              </div>
            </div>
          </PixelCard>

          <PixelCard
            theme="light"
            colors={['#0284c7', '#0ea5e9', '#38bdf8', '#bae6fd']}
            glowColor="#bae6fd"
            gap={6}
            pixelSize={2.5}
            speed={28}
            spotlight={0.5}
            glow={0.4}
            opacity={0.35}
            fade={0.15}
            radius={20}
            trigger="hover"
            clickPulse={true}
            className="pixel-card-responsive hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6 text-left flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl mb-4 font-bold border border-sky-100/80 shadow-xs">
                  ✂️
                </div>
                <h3 className="font-bold text-lg text-slate-900 tracking-tight font-display">
                  Tailoring &amp; Alterations
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Generate tailoring measurement job sheets with delivery tracking. Send automatic WhatsApp SMS when ready for pickup.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-sky-600">
                <span>Smart Job Sheets</span>
                <span className="font-mono text-[10px] bg-sky-50 px-2 py-0.5 rounded text-sky-700 font-semibold">WhatsApp Ping</span>
              </div>
            </div>
          </PixelCard>
        </div>

      </div>
    </section>
  );
}
