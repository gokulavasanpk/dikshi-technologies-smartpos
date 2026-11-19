import React, { useState } from 'react';
import { ArrowRight, Mail, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';

/**
 * React Bits Pro - Footer 4 Block
 * Newsletter signup with a big logo
 * Docs: https://pro.reactbits.dev/docs/blocks/footer/footer-4
 * Registry item: @reactbits-pro/footer-4
 */
export default function Footer4({ isDemoModalOpen, setIsDemoModalOpen, onShowToast }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', storeType: 'Cloth Showroom', city: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      if (onShowToast) onShowToast('⚠️ Please enter a valid business email address.');
      return;
    }
    setIsSubscribed(true);
    if (onShowToast) {
      onShowToast(`🎉 Subscribed ${email} to Dikshi Retail Tech Insider!`);
    }
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsDemoModalOpen(false);
    if (onShowToast) {
      onShowToast(`🎉 Demo scheduled! Our retail specialist will call ${formData.phone} within 15 minutes.`);
    }
    setFormData({ name: '', phone: '', storeType: 'Cloth Showroom', city: '' });
  };

  return (
    <>
      <footer className="relative bg-[#070A12] text-slate-400 overflow-hidden pt-16 sm:pt-24 pb-8 font-display select-none">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ============================================================== */}
          {/* 1. TOP NEWSLETTER SIGNUP BANNER                                 */}
          {/* ============================================================== */}
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl mb-16 sm:mb-20 overflow-hidden">
            
            {/* Background Corner Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading & Value Proposition */}
              <div className="lg:col-span-7 text-left">
                <img src="/assets/dikshi-logo.png" alt="Dikshi Logo" className="w-12 h-12 rounded-full object-contain mb-3 bg-white p-1 shadow-md" />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 text-blue-400 font-mono text-[11px] font-semibold mb-3 border border-blue-800/80">
                  <Sparkles className="w-3 h-3" />
                  <span>Dikshi Retail Tech Dispatch</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  Stay Ahead in Modern Retail Fashion.
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
                  Join 5,000+ fashion boutique and showroom merchants receiving monthly GST updates, barcode automation strategies, and deadstock reduction tips.
                </p>
              </div>

              {/* Right Column: Interactive Subscription Form */}
              <div className="lg:col-span-5">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your business email..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0456DD] transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#0456DD] hover:bg-[#0344b0] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/25 active:scale-[0.98] flex-shrink-0"
                  >
                    <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                <div className="flex items-center gap-2 mt-2.5 text-[11px] text-slate-500 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No spam ever. Unsubscribe with one click anytime.</span>
                </div>
              </div>

            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. STRUCTURED MULTI-COLUMN NAVIGATION LINKS                    */}
          {/* ============================================================== */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-14 text-xs">
            
            {/* Column 1: Core Platform */}
            <div>
              <h4 className="font-bold text-xs uppercase text-white tracking-wider mb-4 font-display">
                POS Capabilities
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li><a href="#pos-simulator" className="hover:text-white transition">Fast Barcode Billing</a></li>
                <li><a href="#pos-simulator" className="hover:text-white transition">Size &amp; Color Matrix</a></li>
                <li><a href="#lookbook-stage" className="hover:text-white transition">Virtual Outfit Runway</a></li>
                <li><a href="#solutions-deck" className="hover:text-white transition">Solutions Deck Wheel</a></li>
                <li><a href="#showroom-matrix" className="hover:text-white transition">Kinetic Catalog Matrix</a></li>
                <li><a href="#merchant-pass" className="hover:text-white transition">3D VIP Merchant Pass</a></li>
              </ul>
            </div>

            {/* Column 2: Supported Hardware */}
            <div>
              <h4 className="font-bold text-xs uppercase text-white tracking-wider mb-4 font-display">
                Hardware Ecosystem
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li><a href="#hardware" className="hover:text-white transition">80mm Thermal Receipt Printers</a></li>
                <li><a href="#hardware" className="hover:text-white transition">2D QR &amp; Handheld Scanners</a></li>
                <li><a href="#hardware" className="hover:text-white transition">Heavy-Duty Steel Cash Drawers</a></li>
                <li><a href="#hardware" className="hover:text-white transition">Dual Customer-Facing Displays</a></li>
                <li><a href="#hardware" className="hover:text-white transition">Thermal Barcode Tag Printers</a></li>
              </ul>
            </div>

            {/* Column 3: Multi-Platform Apps */}
            <div>
              <h4 className="font-bold text-xs uppercase text-white tracking-wider mb-4 font-display">
                Multi-Platform
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li><a href="#multiplatform" className="hover:text-white transition">iOS (iPhone &amp; iPad Pro)</a></li>
                <li><a href="#multiplatform" className="hover:text-white transition">Android (Google Play &amp; Sunmi)</a></li>
                <li><a href="#multiplatform" className="hover:text-white transition">Windows (Desktop 11 &amp; 10)</a></li>
                <li><a href="#multiplatform" className="hover:text-white transition">macOS (Apple Silicon Native)</a></li>
                <li><a href="#multiplatform" className="hover:text-white transition">Laptop &amp; Web Browser Cloud</a></li>
              </ul>
            </div>

            {/* Column 4: Showroom Segments */}
            <div>
              <h4 className="font-bold text-xs uppercase text-white tracking-wider mb-4 font-display">
                Retail Segments
              </h4>
              <ul className="space-y-2.5 text-slate-400">
                <li><a href="#pos-simulator" className="hover:text-white transition">Silk Saree Mandirs</a></li>
                <li><a href="#pos-simulator" className="hover:text-white transition">Men's Suiting &amp; Shirting</a></li>
                <li><a href="#pos-simulator" className="hover:text-white transition">Bridal Lehenga Boutiques</a></li>
                <li><a href="#pos-simulator" className="hover:text-white transition">Fancy Jewellery Stores</a></li>
                <li><a href="#pos-simulator" className="hover:text-white transition">Alterations &amp; Tailoring Hubs</a></li>
              </ul>
            </div>

            {/* Column 5: Headquarters & Live Demo */}
            <div>
              <h4 className="font-bold text-xs uppercase text-white tracking-wider mb-4 font-display">
                Company &amp; Support
              </h4>
              <ul className="space-y-2.5 text-slate-400 mb-4">
                <li>📍 Commercial Tech Hub, Bangalore</li>
                <li>📞 +91 98765 43210 (24/7 Helpline)</li>
                <li>✉️ contact@dikshitechnologies.com</li>
              </ul>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition border border-slate-700"
              >
                📅 Book Store Demo
              </button>
            </div>

          </div>



          {/* ============================================================== */}
          {/* 4. SUB-FOOTER BOTTOM BAR                                       */}
          {/* ============================================================== */}
          <div className="border-t border-slate-800/80 mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
            
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Dikshi Technologies Pvt. Ltd. All rights reserved. Cloth &amp; Fancy SmartPOS.
            </p>

            {/* Live System Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-bold">ALL CLOUD SERVERS ONLINE</span>
            </div>

            {/* Quick Legal Links */}
            <div className="flex items-center gap-4">
              <a href="#pricing" className="hover:text-slate-300 transition">Pricing &amp; ROI</a>
              <a href="#faq" className="hover:text-slate-300 transition">FAQ</a>
              <a href="#multiplatform" className="hover:text-slate-300 transition">Apps</a>
            </div>

          </div>

        </div>
      </footer>

      {/* Demo Booking Lead Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-lg w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>

            <div className="mb-5">
              <img src="/assets/dikshi-logo.png" alt="Dikshi Technologies" className="w-12 h-12 rounded-full object-contain shadow-md mb-3 bg-blue-50/50 p-1" />
              <h3 className="font-extrabold text-xl text-slate-900 tracking-tight font-display">
                Schedule Live Store Demo
              </h3>
              <p className="text-xs text-slate-500 font-display mt-1">
                A retail billing expert from Dikshi Technologies will demonstrate barcode scanning, size variants, and thermal printing live.
              </p>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-3.5 text-xs font-display">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0456DD]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp / Contact Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#0456DD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Showroom Type</label>
                  <select
                    value={formData.storeType}
                    onChange={(e) => setFormData({ ...formData, storeType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0456DD]"
                  >
                    <option>Saree Mandir</option>
                    <option>Men's Apparel</option>
                    <option>Boutique</option>
                    <option>Jewelry</option>
                    <option>Multi-Store Chain</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Store City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Jaipur, Surat..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0456DD]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0456DD] hover:bg-[#0344b0] text-white font-extrabold text-xs uppercase tracking-wide transition shadow-lg shadow-blue-600/30 mt-4 active:scale-[0.98]"
              >
                Confirm Live Demo Request
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
