import React, { useState, useEffect, useRef } from 'react';
import Device from './Device';
import { Apple, Smartphone, Monitor, Laptop, CheckCircle2, QrCode, Cloud, ShieldCheck, Zap } from 'lucide-react';

const PLATFORMS = [
  {
    name: 'iOS',
    sub: 'iPhone & iPad Pro',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 3.5c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-1.09 1.74-1.05 2.78 1.03.08 2.08-.53 2.74-1.32z"/>
      </svg>
    ),
    badge: 'App Store',
    desc: 'Mobile aisle billing, VIP digital lookbook, and camera barcode tag scanner for iPhone & iPad.'
  },
  {
    name: 'Android',
    sub: 'Phones & POS Terminals',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4116 13.8533 8.125 12 8.125s-3.5902.2866-5.1368.8247L4.8409 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.7778h24c-.3432-4.1189-2.6889-7.5911-6.1185-9.4564"/>
      </svg>
    ),
    badge: 'Google Play & Sunmi OS',
    desc: 'Optimized for handheld mobile POS terminals (Sunmi, Pax, Pine Labs) with built-in thermal printers.'
  },
  {
    name: 'Windows',
    sub: 'Windows 11 & 10 Desktop',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.849"/>
      </svg>
    ),
    badge: 'Desktop .exe & Surface',
    desc: 'Heavy-duty counter billing engine supporting 1D/2D laser scanners, cash drawers, and 80mm ESC/POS.'
  },
  {
    name: 'macOS',
    sub: 'MacBook & Mac Studio',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
      </svg>
    ),
    badge: 'Apple Silicon Native',
    desc: 'Fluid luxury showroom management app for store owners, live GST filing, and daily profit analytics.'
  },
  {
    name: 'Laptop & Web',
    sub: 'Cloud Terminal Browser',
    icon: (
      <Laptop className="w-5 h-5 text-current" />
    ),
    badge: 'Chrome, Edge, Safari',
    desc: 'Instant counter access from any laptop or browser without software installation. 100% PWA failover.'
  }
];

export default function MultiPlatformDeviceSection() {
  const [activeFinish, setActiveFinish] = useState('titanium');
  const [activeOrientation, setActiveOrientation] = useState('portrait');
  const [isWobbling, setIsWobbling] = useState(false);
  const [isHoveringDevice, setIsHoveringDevice] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let timer = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger moving / shaky cue effect every time user enters the section
          setIsWobbling(true);
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            setIsWobbling(false);
          }, 1700);
        } else {
          // Reset so subsequent entries trigger the effect again
          setIsWobbling(false);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="multiplatform" className="scroll-mt-24 sm:scroll-mt-28 relative py-10 sm:py-16 lg:py-24 bg-slate-50/60 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/70 via-indigo-50/30 to-transparent pointer-events-none -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] font-display">
            Available on Every Device. <br />
            <span className="bg-gradient-to-r from-blue-600 via-[#0456DD] to-indigo-600 bg-clip-text text-transparent">
              iOS, Android, Laptop, Windows &amp; Mac.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed font-display">
            Whether your staff is walking the showroom aisles with an iPhone, running high-speed barcode checkout on a Windows counter, or reviewing profit reports on a MacBook at home — Dikshi Technologies keeps your entire business in sync.
          </p>
        </div>

        {/* 2-Column Showcase: Left = 3D Device Mockup, Right = Multi-Platform Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 3D Studio-Lit Phone Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Interactive Finish & Orientation Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] font-mono text-slate-500 uppercase px-2 font-bold hidden sm:inline">Finish:</span>
              {[
                { id: 'titanium', label: 'Titanium', color: '#68645E' },
                { id: 'black', label: 'Black', color: '#16171C' },
                { id: 'silver', label: 'Silver', color: '#C8CBD0' },
                { id: 'gold', label: 'Gold', color: '#D8BE8E' },
                { id: 'blue', label: 'Blue', color: '#27364B' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFinish(f.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition ${
                    activeFinish === f.id
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: f.color }} />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            {/* The React Bits Pro <Device /> Component */}
            <div className="w-full flex items-center justify-center py-4">
              <Device
                finish={activeFinish}
                orientation={activeOrientation}
                scale={0.55}
                tilt={20}
                lift={1.25}
                float={1}
                rotateX={3}
                rotateY={-5}
                rotateZ={0}
                island={true}
                shadowColor="rgba(4, 86, 221, 0.22)"
                isWobbling={isWobbling}
                onHoverChange={setIsHoveringDevice}
                className="max-w-[320px] sm:max-w-[340px]"
              >
                {/* Photorealistic Dikshi Technologies Mobile App Screen UI */}
                <div className="w-full h-full bg-slate-900 text-white flex flex-col justify-between p-4 pt-11 font-display relative overflow-hidden select-none">
                  
                  {/* Subtle Background Radial Aura */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                  {/* 1. Mobile App Top Bar */}
                  <div>
                    {/* Status / Store Name */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <img src="/assets/dikshi-logo.png" alt="Dikshi Logo" className="w-7 h-7 rounded-full object-contain shadow-md bg-white/10 p-0.5" />
                        <div>
                          <h4 className="font-extrabold text-xs text-white leading-tight">Dikshi SmartPOS</h4>
                          <span className="text-[9px] font-mono text-slate-400 block">Jaipur Flagship · Reg #02</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        SYNCED
                      </span>
                    </div>

                    {/* Quick Barcode Scanner Banner */}
                    <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-[#0456DD] shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm">
                          📷
                        </div>
                        <div>
                          <span className="text-[9px] font-mono uppercase text-blue-100 tracking-wider block">AI Camera Scanner</span>
                          <p className="font-bold text-xs text-white">Scan Saree Barcode Tag</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-white text-[#0456DD] font-bold px-2 py-1 rounded-lg shadow-sm">
                        SCAN
                      </span>
                    </div>

                    {/* Today's Sales Card */}
                    <div className="mt-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono uppercase text-slate-400 block">Today's Counter Revenue</span>
                        <span className="font-extrabold text-base text-white font-mono">₹1,84,650</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono uppercase text-slate-400 block">Active Bills</span>
                        <span className="font-bold text-xs text-emerald-400 font-mono">54 Customers</span>
                      </div>
                    </div>

                    {/* Active Cart Items Preview */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Current Customer Cart</span>
                        <span className="text-[10px] font-mono text-sky-400 font-bold">3 items</span>
                      </div>
                      
                      <div className="space-y-1.5 text-xs">
                        <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-800 flex justify-between items-center">
                          <div className="min-w-0 pr-2">
                            <p className="font-bold text-white break-words text-[11px] leading-tight">Kanjivaram Silk Saree</p>
                            <span className="text-[9px] font-mono text-slate-400">1 × ₹4,499 (Size: Free)</span>
                          </div>
                          <span className="font-mono font-bold text-slate-200 text-xs flex-shrink-0">₹4,499</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-800 flex justify-between items-center">
                          <div className="min-w-0 pr-2">
                            <p className="font-bold text-white break-words text-[11px] leading-tight">Gold Flame Earrings</p>
                            <span className="text-[9px] font-mono text-slate-400">1 × ₹1,299 (Jewelry)</span>
                          </div>
                          <span className="font-mono font-bold text-slate-200 text-xs flex-shrink-0">₹1,299</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* 2. Bottom Pay & Navigation Bar */}
                  <div className="pt-3 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Total (GST Incl.)</span>
                      <span className="font-black text-sm text-[#0456DD] font-mono bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                        ₹5,798
                      </span>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-[#0456DD] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30">
                      <span>⚡ Instant UPI QR &amp; Tap Pay</span>
                    </button>

                    {/* App Bottom Tabs */}
                    <div className="grid grid-cols-4 gap-1 text-center pt-2.5 mt-2 border-t border-slate-800/80 text-[9px] font-mono text-slate-400">
                      <div className="text-[#0456DD] font-bold">● POS</div>
                      <div>📦 Stock</div>
                      <div>🏷️ Tags</div>
                      <div>📊 Daily</div>
                    </div>
                  </div>

                </div>
              </Device>
            </div>

            {/* Interactive 3D Cursor Hint Pill */}
            <div className="mt-3 flex items-center justify-center">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 select-none ${
                  isHoveringDevice
                    ? 'bg-blue-50 border-blue-400 text-[#0456DD] shadow-sm scale-105 font-bold'
                    : isWobbling
                      ? 'bg-blue-50 border-blue-300 text-[#0456DD] shadow-md animate-pulse font-semibold'
                      : 'bg-white border-slate-200 text-slate-600 shadow-2xs font-medium'
                }`}
              >
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0456DD]/10 text-[#0456DD]">
                  <svg className={`w-2.5 h-2.5 ${isWobbling || isHoveringDevice ? 'animate-bounce' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 15l6 6m-6-6v4.5m0-4.5h4.5M9 9l-6-6m6 6V4.5M9 9H4.5" />
                  </svg>
                </span>
                <span className="text-[11px]">
                  {isHoveringDevice
                    ? '● 3D Active: Tilting with cursor'
                    : '✦ Move cursor over phone to rotate in 3D'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Multi-Platform Compatibility Matrix (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-display mb-2">
                Deploy Across Your Whole Team in 60 Seconds
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-display mb-6">
                No expensive proprietary hardware locks. Install Dikshi SmartPOS on your existing showroom cash register PCs, employee smartphones, or store tablets.
              </p>

              {/* Platform Grid */}
              <div className="space-y-3">
                {PLATFORMS.map((plat) => (
                  <div
                    key={plat.name}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 transition shadow-sm hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-700 group-hover:text-[#0456DD] flex items-center justify-center flex-shrink-0 transition">
                        {plat.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 font-display">
                            {plat.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            ({plat.sub})
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-display line-clamp-1 mt-0.5">
                          {plat.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>{plat.badge}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Enterprise Highlights Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0456DD] flex items-center justify-center font-bold text-xs mb-2">
                  <Cloud className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-900 font-display">Real-Time Sync</h5>
                <p className="text-[11px] text-slate-500 font-display mt-0.5">Bills made on mobile instantly deduct stock on the desktop register.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-2">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-900 font-display">100% Offline Failover</h5>
                <p className="text-[11px] text-slate-500 font-display mt-0.5">Internet down? Bill continuously. Syncs silently when reconnected.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs text-slate-900 font-display">Multi-Branch Security</h5>
                <p className="text-[11px] text-slate-500 font-display mt-0.5">Role-based access: Cashier billing mode vs. Store Owner ledger mode.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
