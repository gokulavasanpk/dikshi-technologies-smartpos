import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FlowingMenu({
  items = [
    { text: "Banarasi & Kanjivaram Silk Sarees", desc: "Zari, Silk & Wedding Trousseau", link: "#pos-simulator" },
    { text: "Designer Kurtis, Anarkalis & Festive Sets", desc: "Embroidery & Rayon Daily Wear", link: "#pos-simulator" },
    { text: "Men's Ethnic Kurtas, Suits & Denim", desc: "Formal Suiting & Casual Denim", link: "#pos-simulator" },
    { text: "Bridal Kundan, Polki & Gold Jewellery", desc: "Fashion Ornaments & Gems", link: "#pos-simulator" },
    { text: "Boutique Leather Handbags & Hobo Bags", desc: "Totes, Clutches & Wallets", link: "#pos-simulator" },
    { text: "Custom Alterations & Blouse Tailoring", desc: "Measurement Cards & WhatsApp Ready SMS", link: "#hardware" }
  ]
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-white text-slate-900 w-full">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Multi-Department Retail Catalog
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-xl mx-auto font-normal">
            Instant barcode lookup, matrix inventory tracking, and synchronized cloud ledger across all textile categories.
          </p>
        </div>

        <div className="border-t border-slate-200 divide-y divide-slate-100">
          {items.map((item, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <a
                key={index}
                href={item.link}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative flex items-center justify-between py-3.5 sm:py-5 px-2.5 sm:px-6 transition-all duration-300 hover:bg-slate-50/80 overflow-hidden"
              >
                <div className="flex items-center gap-3 sm:gap-6 min-w-0 z-10 flex-1">
                  <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 group-hover:text-[#0456DD] transition-colors flex-shrink-0">
                    0{index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-sm xs:text-base sm:text-xl lg:text-2xl tracking-tight text-slate-900 group-hover:text-[#0456DD] group-hover:translate-x-1.5 sm:group-hover:translate-x-2 transition-all duration-300 block break-words leading-snug">
                      {item.text}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 z-10 flex-shrink-0 ml-2">
                  <span className="text-xs font-mono text-slate-500 group-hover:text-[#0456DD] transition-colors opacity-0 group-hover:opacity-100 hidden sm:inline">
                    Open in POS
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 group-hover:bg-[#0456DD] text-slate-600 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm flex-shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Subtle Hover Gradient Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-[#0456DD] transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
