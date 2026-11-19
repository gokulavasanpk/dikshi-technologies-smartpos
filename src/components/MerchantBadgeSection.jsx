import React from 'react';
import Lanyard from './Lanyard';
import { 
  Wifi, 
  ShieldCheck, 
  Lock, 
  Rotate3d, 
  CheckCircle2, 
  CreditCard,
  KeyRound,
  FileCheck2,
  ArrowRight
} from 'lucide-react';

export default function MerchantBadgeSection({ onShowToast }) {
  const [shakeCount, setShakeCount] = React.useState(0);
  const [flipCount, setFlipCount] = React.useState(0);
  const sectionRef = React.useRef(null);
  const wasVisibleRef = React.useRef(false);

  // Trigger lanyard shake every time user scrolls or navigates into this section
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!wasVisibleRef.current) {
              setShakeCount((prev) => prev + 1);
            }
            wasVisibleRef.current = true;
          } else {
            wasVisibleRef.current = false;
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);

    const handleHash = () => {
      if (window.location.hash === '#merchant-pass') {
        setShakeCount((prev) => prev + 1);
      }
    };
    window.addEventListener('hashchange', handleHash);

    // Initial check if opened directly at #merchant-pass
    if (window.location.hash === '#merchant-pass') {
      setTimeout(() => setShakeCount((prev) => prev + 1), 350);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const handleAction = (label) => {
    if (onShowToast) {
      onShowToast(`💳 ${label} triggered successfully!`);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="merchant-pass" 
      className="scroll-mt-20 sm:scroll-mt-24 w-full py-14 sm:py-20 bg-slate-50/60 text-slate-900 relative overflow-hidden"
    >
      
      {/* Soft Ambient Radial Background Lights */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Professional Layout: Original Website Content (Left) + Clean Free-Hanging 3D ID Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Authentic Enterprise Product Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Pill Tag */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0456DD] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#0456DD] animate-pulse" />
                Access Control &amp; Counter Security
              </div>
            </div>

            {/* Section Heading */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-display">
                Certified VIP <span className="text-[#0456DD]">Merchant Keycard</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Every Dikshi Technologies flagship retail partner receives an encrypted physical NFC SmartPOS keycard and mobile pass. Empower your billing counter staff with instant tap-to-sign-in, manager discount overrides, and real-time cloud attendance tracking.
              </p>
            </div>

            {/* 4 Professional Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              
              {/* Feature 1 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0456DD] flex items-center justify-center mb-2.5">
                  <Wifi className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 font-display">Instant Tap-to-Sign-In</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Cashiers tap their 13.56 MHz NFC keycard or Apple/Google Wallet pass to switch registers in under 0.08s with zero manual password typing.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 font-display">Supervisor Overrides</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Floor managers quickly authorize festive discounts, item returns, and custom tailoring alteration slips with an encrypted supervisor badge tap.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2.5">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 font-display">AES-256 Cloud Token</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Tamper-proof hardware node ensures credentials cannot be cloned or manipulated, protecting retail ledger integrity across all locations.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 font-display">Multi-Store Shift Auditing</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Live cloud dashboard tracks staff attendance, cashier shift handovers, and hourly counter billing totals across Jaipur, Surat &amp; Mumbai stores.
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleAction('Request Showroom Staff Keycards')}
                className="px-5 py-3 rounded-xl bg-[#0456DD] hover:bg-[#0344b0] text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Keycards for Showroom</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleAction('Digital Apple & Google Wallet Pass')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 font-semibold text-xs sm:text-sm transition shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Mobile Wallet PassKit (.pkpass)</span>
              </button>
            </div>

            {/* Enterprise Trust Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 font-mono border-t border-slate-200/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ISO 27001 Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                NPCI &amp; UPI Soundbox Sync
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                Offline Shift Failover
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: The 3D Lanyard ID Card (NO BOX - Hangs Freely) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Subtle Ambient Radial Highlight Behind Card (No bounding box) */}
            <div className="absolute inset-0 max-w-sm mx-auto h-[480px] bg-gradient-to-b from-blue-200/30 via-indigo-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            {/* 3D Interactive Lanyard Component (Transparent Canvas) */}
            <div className="w-full h-[500px] sm:h-[560px] lg:h-[600px] relative cursor-grab active:cursor-grabbing flex items-center justify-center">
              <Lanyard
                frontImage="/assets/merchant-pass-front.png"
                backImage="/assets/merchant-pass-back.png"
                strapImage="/assets/merchant-pass-strap.png"
                cardColor="#0B132B"
                finish="holographic"
                metal="gold"
                strapColor="#0F172A"
                strapLength={0.48}
                strapWidth={0.65}
                size={0.62}
                breeze={0.25}
                gravity={0.9}
                damping={0.45}
                elasticity={0.48}
                interactive={true}
                intro={true}
                orientation="portrait"
                shakeTrigger={shakeCount}
                flipTrigger={flipCount}
              />
            </div>

            {/* Interactive Badge Controls & Helper Pill */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setFlipCount(c => c + 1)}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 shadow-xs text-slate-700 hover:text-[#0456DD] text-xs font-semibold transition cursor-pointer"
                title="Flip card 180° to inspect reverse side"
              >
                <Rotate3d className="w-3.5 h-3.5 text-[#0456DD] transition-transform duration-500 group-hover:rotate-180" />
                <span>Flip Card 180°</span>
              </button>
              <button
                type="button"
                onClick={() => setShakeCount(c => c + 1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold transition cursor-pointer"
                title="Impart natural physical lanyard shake impulse"
              >
                <span>👋 Shake Badge</span>
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 font-mono text-center">
              Drag horizontally or click card to flip 180° • Automatically shakes upon entering section
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
