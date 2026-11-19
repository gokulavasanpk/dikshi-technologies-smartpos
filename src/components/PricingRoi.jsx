import React, { useState } from 'react';

export default function PricingRoi({ onBookDemo }) {
  const [dailyBills, setDailyBills] = useState(120);
  const [avgBillValue, setAvgBillValue] = useState(1500);
  const [isAnnual, setIsAnnual] = useState(true);

  // ROI calculations
  const monthlyBills = dailyBills * 30;
  const hoursSaved = Math.round((monthlyBills * 45) / 3600); // 45s saved per bill
  const monthlyRevenue = monthlyBills * avgBillValue;
  const theftLeakageSaved = Math.round(monthlyRevenue * 0.025); // 2.5% shrinkage prevention

  const plans = [
    {
      name: "Boutique Starter",
      tag: "Single Counter Retailers",
      monthlyPrice: 999,
      annualPrice: 799,
      features: [
        "1 POS Terminal License",
        "Barcode & Tag Generation",
        "Apparel Size & Color Matrix",
        "GST Invoices (B2B & B2C)",
        "Daily WhatsApp Summary",
        "Email & Chat Support"
      ],
      popular: false
    },
    {
      name: "Retail Pro",
      tag: "Multi-Counter Garment Showrooms",
      monthlyPrice: 1999,
      annualPrice: 1599,
      features: [
        "Up to 3 Billing Counters",
        "Real-Time Central Inventory",
        "Alteration & Tailoring Tracker",
        "Loyalty Points & SMS Coupons",
        "UPI Dynamic QR on 80mm Print",
        "24/7 Phone & Remote Support"
      ],
      popular: true
    },
    {
      name: "Enterprise Chain",
      tag: "Multi-Store Fashion Brands",
      monthlyPrice: 3999,
      annualPrice: 3199,
      features: [
        "Unlimited Store Outlets",
        "Warehouse Inter-Branch Transfers",
        "Dedicated Account Manager",
        "E-Way Bill & E-Invoicing Portal",
        "Custom ERP & Tally Integration",
        "Hardware Onsite Deployment"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display break-words">
            Calculate Your Store Savings &amp; ROI
          </h2>
          <p className="text-slate-500 text-xs sm:text-base mt-2.5 max-w-2xl mx-auto font-normal">
            Adjust your daily customer footfall to estimate monthly counter hours saved and inventory shrinkage prevented.
          </p>
        </div>

        {/* ROI Calculator Box */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-md max-w-4xl mx-auto mb-16 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            
            {/* Sliders */}
            <div className="space-y-5 sm:space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
                  <span className="font-barlow font-bold text-xs sm:text-sm text-slate-800">
                    Average Daily Bills
                  </span>
                  <span className="font-mono font-black text-xs sm:text-sm text-[#0456DD] bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                    {dailyBills} bills / day
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={dailyBills}
                  onChange={(e) => setDailyBills(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0456DD]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
                  <span className="font-barlow font-bold text-xs sm:text-sm text-slate-800">
                    Average Bill Value (₹)
                  </span>
                  <span className="font-mono font-black text-xs sm:text-sm text-[#0456DD] bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                    ₹{avgBillValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={avgBillValue}
                  onChange={(e) => setAvgBillValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0456DD]"
                />
              </div>
            </div>

            {/* Metrics Output Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3.5 bg-slate-50 p-2.5 sm:p-4 rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-100 shadow-sm min-w-0 overflow-hidden">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block truncate">Hours Saved</span>
                <span className="font-barlow font-black text-base sm:text-2xl text-slate-900 block mt-0.5 sm:mt-1 truncate">
                  {hoursSaved} hrs
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 block truncate">Every month</span>
              </div>

              <div className="bg-white p-2.5 sm:p-3.5 rounded-xl border border-slate-100 shadow-sm min-w-0 overflow-hidden">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block truncate">Leakage Prevented</span>
                <span className="font-barlow font-black text-base sm:text-2xl text-emerald-600 block mt-0.5 sm:mt-1 truncate">
                  ₹{theftLeakageSaved.toLocaleString('en-IN')}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 block truncate">Barcode audits</span>
              </div>

              <div className="col-span-2 bg-[#0456DD] text-white p-3 sm:p-4 rounded-xl shadow-md min-w-0 overflow-hidden">
                <span className="text-[10px] sm:text-xs font-mono uppercase block text-blue-100 truncate">Annual Return On Investment</span>
                <div className="flex flex-wrap items-baseline justify-between gap-1 mt-1">
                  <span className="font-barlow font-black text-lg sm:text-3xl tracking-tight">
                    ₹{(theftLeakageSaved * 12).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono bg-blue-500/40 px-2 py-0.5 rounded flex-shrink-0">
                    +400% ROI
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(prev => !prev)}
            className="w-12 h-6 bg-slate-300 rounded-full p-0.5 transition-colors duration-200 flex items-center relative"
            style={{ backgroundColor: isAnnual ? '#0456DD' : '#cbd5e1' }}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            <span>Annual</span>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, idx) => {
            const price = isAnnual ? p.annualPrice : p.monthlyPrice;
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 ${
                  p.popular
                    ? 'border-[#0456DD] ring-2 ring-[#0456DD]/20 shadow-xl relative'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0456DD] text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <h3 className="font-barlow font-black text-xl uppercase text-slate-900 tracking-tight">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-archivo mt-1">{p.tag}</p>

                  <div className="mt-5 mb-6 flex items-baseline gap-1">
                    <span className="font-barlow font-black text-3xl sm:text-4xl text-[#0D0D0D]">
                      ₹{price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">/ month</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-5">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onBookDemo}
                  className={`mt-8 w-full py-2.5 rounded-xl font-barlow font-bold text-xs uppercase tracking-wider transition ${
                    p.popular
                      ? 'bg-[#0456DD] hover:bg-[#0344b0] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Start Free 14-Day Trial
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
