import React, { useState } from 'react';

const FAQS = [
  {
    q: "How does Dikshi SmartPOS handle apparel sizes, colors, and design variants?",
    a: "Our software features a dedicated matrix grid for fashion retail. You create a master design SKU (e.g., Slim Denim) and assign child variants (Sizes: 28, 30, 32, 34, 36; Colors: Indigo, Black, Stone). Each variant generates an individual barcode tag automatically."
  },
  {
    q: "Can I print hanging price tags and adhesive barcode stickers?",
    a: "Yes! The system integrates with all standard 2-inch and 3-inch thermal barcode label printers (TVS, Zebra, TSC, Godex). You can print custom store logos, wash care icons, MRP, offer price, and scannable EAN-13 barcodes."
  },
  {
    q: "Does the billing terminal work during internet downtime?",
    a: "Absolutely. Dikshi SmartPOS runs with offline-first local synchronization. You can continue high-speed counter billing and printing receipts with zero internet. The bills auto-sync to the cloud the moment connectivity resumes."
  },
  {
    q: "Can customers pay directly using Dynamic UPI QR codes on the thermal bill?",
    a: "Yes. Every printed thermal receipt generates a dynamic UPI QR code containing the exact grand total. Customers scan with PhonePe, Google Pay, or Paytm and the payment confirms instantly."
  },
  {
    q: "How does the custom tailoring and alteration tracking module work?",
    a: "When a customer requests alterations (saree fall/pico, trouser hem, blazer fitting), the cashier generates an Alteration Job Slip with delivery deadline. Tailors update progress from their workshop tablet, and customers receive an automatic SMS when ready."
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-20 bg-slate-50/60">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-normal">
            Answers to common technical, hardware, and GST billing questions from cloth merchants and showroom owners.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition"
                >
                  <span className="font-barlow font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold bg-slate-100 transition-transform ${isOpen ? 'rotate-180 bg-blue-100 text-[#0456DD]' : 'text-slate-600'}`}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm font-archivo text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
