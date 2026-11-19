import React, { useState } from 'react';
import GridMotion from './GridMotion';
import { Sparkles, Calendar, Clock, Store, User, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const MODERN_SHOWROOM_ITEMS = [
  '/assets/boutique-modern-1.jpg',
  '/assets/saree-banarasi.jpg',
  '/assets/boutique-modern-2.jpg',
  '/assets/royal-saree-texture.jpg',
  '/assets/kurti-jaipuri.jpg',
  '/assets/boutique-modern-3.jpg',
  '/assets/saree-chanderi.jpg',
  '/assets/boutique-modern-4.jpg',
  '/assets/golden-silk-texture.jpg',
  '/assets/mens-kurta.jpg',
  '/assets/boutique-modern-5.jpg',
  '/assets/luxury-silk-texture.png',
  '/assets/boutique-modern-6.jpg',
  '/assets/mens-denim.jpg',
  '/assets/kurti-anarkali.jpg'
];

export default function ShowroomTapestrySection() {
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    phone: '',
    city: '',
    storeType: 'Saree & Silk Emporium',
    counters: '1 - 2 Counters',
    preferredSlot: 'Today'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.storeName || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      storeName: '',
      ownerName: '',
      phone: '',
      city: '',
      storeType: 'Saree & Silk Emporium',
      counters: '1 - 2 Counters',
      preferredSlot: 'Today'
    });
    setIsSubmitted(false);
  };

  return (
    <section 
      id="showroom-matrix" 
      className="scroll-mt-24 sm:scroll-mt-28 relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] w-full bg-slate-50/70 overflow-hidden flex items-center justify-center py-8 sm:py-12 select-none"
    >
      {/* ========================================================================= */}
      {/* 1. BACKGROUND KINETIC GRIDMOTION                                         */}
      {/* High-resolution curated showroom & silk saree photography tapestry       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <GridMotion
          items={MODERN_SHOWROOM_ITEMS}
          rows={6}
          aspectRatio={1.4}
          gap={14}
          radius={14}
          angle={-10}
          tilt={0}
          speed={16}
          direction="alternate"
          parallax={0.35}
          spotlight={0.8}
          dim={0.06}
          fade={0.15}
          grayscale={false}
          theme="light"
          className="w-full h-full"
        />
      </div>

      {/* ========================================================================= */}
      {/* Seamless Ambient Radial Illumination                                      */}
      {/* Softly diffuses under the center card so it merges organically with photos */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(248,250,252,0.9)_0%,rgba(248,250,252,0.5)_55%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/70 pointer-events-none" />

      {/* ========================================================================= */}
      {/* 2. CENTER STAGE: ULTRA-COMPACT LIVE DEMO BOOKING CARD (LANDSCAPE GLASS)  */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-2xl lg:max-w-[740px] mx-auto px-4">
        
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08),0_0_30px_rgba(4,86,221,0.08)] ring-1 ring-slate-900/5 text-slate-900">
          
          {!isSubmitted ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-center">
              
              {/* Left Column: Compact Narrative, Badges & Value Props */}
              <div className="md:col-span-5 flex flex-col justify-between text-left">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0456DD] text-[10px] font-mono mb-2 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>FREE 1-ON-1 DEMO</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-display leading-tight">
                    See Dikshi{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-[#0456DD] to-indigo-600 bg-clip-text text-transparent">
                      SmartPOS Live
                    </span>
                  </h3>
                  
                  <p className="text-slate-600 text-[11px] sm:text-xs mt-1 leading-snug">
                    Tailored specifically for silk sarees, garments, cosmetics &amp; boutique fashion.
                  </p>

                  {/* Compact High-Value Highlights */}
                  <div className="mt-3.5 space-y-2 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-xs font-bold border border-blue-200">
                        ⚡
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-900 tracking-wide">0.8s High-Speed Billing</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold border border-emerald-200">
                        🏷️
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-900 tracking-wide">Cloth Matrix Barcoding</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 text-xs font-bold border border-sky-200">
                        ✂️
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-900 tracking-wide">Tailoring &amp; Alteration Slips</h4>
                    </div>
                  </div>
                </div>

                {/* Micro Trust Badges */}
                <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    15-Min Demo
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Zero Obligation
                  </span>
                </div>
              </div>

              {/* Right Column: Compact Landscape Glass Form */}
              <div className="md:col-span-7 bg-slate-50/90 p-3 sm:p-3.5 rounded-xl border border-slate-200/90 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="space-y-2.5 text-left">
                  
                  {/* Row 1: Store Name & Owner Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">
                        Store Name *
                      </label>
                      <div className="relative">
                        <Store className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.storeName}
                          onChange={e => setFormData({ ...formData, storeName: e.target.value })}
                          placeholder="Jaipur Saree Flagship"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0456DD] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.ownerName}
                          onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
                          placeholder="Rajesh Sharma"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0456DD] transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">
                        WhatsApp Phone *
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0456DD] transition font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">
                        City / Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Surat, Gujarat"
                          className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0456DD] transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Store Category & Counters Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">
                        Retail Category
                      </label>
                      <select
                        value={formData.storeType}
                        onChange={e => setFormData({ ...formData, storeType: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0456DD] transition"
                      >
                        <option value="Saree & Silk Emporium">Saree &amp; Silk Emporium</option>
                        <option value="Readymade Garments & Kids">Readymade Garments &amp; Kids</option>
                        <option value="Boutique & Tailoring Studio">Boutique &amp; Tailoring</option>
                        <option value="Fancy & Cosmetics Store">Fancy &amp; Cosmetics</option>
                        <option value="Multi-Branch Apparel Chain">Multi-Branch Chain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-0.5">
                        Billing Counters
                      </label>
                      <select
                        value={formData.counters}
                        onChange={e => setFormData({ ...formData, counters: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0456DD] transition"
                      >
                        <option value="1 Counter">1 Counter (Single Store)</option>
                        <option value="2 - 3 Counters">2 - 3 Counters (Flagship)</option>
                        <option value="4+ Counters">4+ Counters (Multi-Floor)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Slot Pills */}
                  <div>
                    <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                      {['Today', 'Tomorrow', 'This Weekend'].map(slot => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setFormData({ ...formData, preferredSlot: slot })}
                          className={`py-1 rounded-lg text-[11px] font-semibold transition border text-center cursor-pointer ${
                            formData.preferredSlot === slot
                              ? 'bg-[#0456DD] border-[#0456DD] text-white shadow-sm shadow-blue-500/30'
                              : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1.5 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-600 via-[#0456DD] to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide transition shadow-md shadow-blue-600/25 active:scale-[0.98] flex items-center justify-center gap-1.5 group cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Scheduling Walkthrough...</span>
                    ) : (
                      <>
                        <span>Schedule Free Live Demo</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                </form>
              </div>

            </div>
          ) : (
            /* Confirmation Success State in Ultra-Compact Landscape */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-2 text-left">
              <div className="md:col-span-5 text-center md:text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-2 mx-auto md:mx-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display mb-1">
                  Demo Confirmed!
                </h3>
                
                <p className="text-slate-600 text-xs leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.ownerName || 'Merchant'}</strong>. We will WhatsApp you at <strong className="text-blue-600 font-mono">{formData.phone}</strong> for <span className="text-blue-700 font-semibold">{formData.storeName}</span> ({formData.preferredSlot}).
                </p>
              </div>

              <div className="md:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-3 text-xs font-mono space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Retail Category:</span>
                  <span className="font-semibold text-slate-900">{formData.storeType}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Counter Scale:</span>
                  <span className="font-semibold text-slate-900">{formData.counters}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-500">Live Features:</span>
                  <span className="text-emerald-600 font-semibold">0.8s Scan · Barcode Print</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={handleReset}
                    className="px-3.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition border border-slate-200 cursor-pointer shadow-sm"
                  >
                    Book Another Store
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
