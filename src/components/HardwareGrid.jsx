import React, { useState } from 'react';
import FolderFloat from './FolderFloat';

const HARDWARE_ITEMS = [
  {
    id: "printer",
    title: "80mm High-Speed Thermal Receipt Printer",
    tag: "Auto-Cutter · 260mm/s",
    label: "Printer Specs",
    sublabel: "4 Certified Specs",
    frontDesc: "Prints detailed itemized cloth bills with barcode, store logo & UPI QR code instantly.",
    speed: "260 mm/s",
    icon: "🖨️",
    badgeColor: "#0456DD",
    folderColor: "#0047BA",
    frontColor: "#0456DD",
    items: [
      "260mm/s Auto-Cutter",
      "Tri-Interface: USB/LAN/BT",
      "ESC/POS & Dynamic UPI QR",
      "1.5M Clean Cut Lifecycle"
    ]
  },
  {
    id: "scanner",
    title: "2D Wireless Long-Range Barcode Scanner",
    tag: "QR Code & 1D/2D Barcodes",
    label: "Scanner Specs",
    sublabel: "4 Sensor Specs",
    frontDesc: "Scans hanging cloth tags, crumpled stickers, and smartphone screens effortlessly.",
    speed: "300 scans/s",
    icon: "📡",
    badgeColor: "#0284c7",
    folderColor: "#0369a1",
    frontColor: "#0284c7",
    items: [
      "300 scans/sec High-Speed",
      "1D & 2D QR Code Engine",
      "30m Wireless RF + BLE 5.2",
      "Crumpled Cloth Tag Read"
    ]
  },
  {
    id: "drawer",
    title: "Heavy-Duty Electronic Cash Drawer",
    tag: "5 Note / 8 Coin Slots",
    label: "Cash Drawer",
    sublabel: "4 Vault Specs",
    frontDesc: "Automated RJ11 kick-out trigger when bill prints. Dual key lock mechanism.",
    speed: "Instant Kick",
    icon: "🗄️",
    badgeColor: "#0f766e",
    folderColor: "#115e59",
    frontColor: "#0d9488",
    items: [
      "5 Note & 8 Coin Compartments",
      "RJ11 24V Printer Auto-Kick",
      "1.2mm Cold-Rolled Steel",
      "3-Position Deadbolt Lock"
    ]
  },
  {
    id: "terminal",
    title: "Dual-Screen Touch POS Terminal",
    tag: "15.6\" Cashier + 10.1\" Customer Display",
    label: "Touch Terminal",
    sublabel: "4 System Specs",
    frontDesc: "Full HD capacitive touch screen with dynamic customer-facing promotions & QR display.",
    speed: "FHD Touch",
    icon: "🖥️",
    badgeColor: "#4f46e5",
    folderColor: "#3730a3",
    frontColor: "#4f46e5",
    items: [
      "Dual 15.6\" + 10.1\" FHD IPS",
      "Intel Core i5 / 8GB / 256GB",
      "Fanless Aluminum Heatsink",
      "6x USB + 2x COM + RJ11 Hub"
    ]
  }
];

export default function HardwareGrid() {
  const [triggerMode, setTriggerMode] = useState('hover');
  const [enablePhysics, setEnablePhysics] = useState(true);

  return (
    <section id="hardware" className="scroll-mt-24 sm:scroll-mt-28 py-14 sm:py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#0456DD] animate-ping" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0456DD]">
              Plug-and-Play Certified Ecosystem
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            Compatible Retail Hardware Ecosystem
          </h2>
          <p className="text-slate-500 text-xs sm:text-base mt-2.5 max-w-2xl mx-auto font-normal">
            Certified peripherals engineered for seamless counter reliability. Hover or tap any folder to float out zero-gravity technical spec notes. Drag and toss pills freely across the space.
          </p>

          {/* Interactive Trigger & Physics Switcher */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-2">Trigger:</span>
            <div className="inline-flex rounded-xl bg-white p-0.5 shadow-sm border border-slate-200/60">
              <button
                type="button"
                onClick={() => setTriggerMode('hover')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  triggerMode === 'hover'
                    ? 'bg-[#0456DD] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ✨ Hover to Float
              </button>
              <button
                type="button"
                onClick={() => setTriggerMode('click')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  triggerMode === 'click'
                    ? 'bg-[#0456DD] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                👆 Click to Toggle
              </button>
            </div>

            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 px-2 ml-1">Physics:</span>
            <div className="inline-flex rounded-xl bg-white p-0.5 shadow-sm border border-slate-200/60">
              <button
                type="button"
                onClick={() => setEnablePhysics(true)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  enablePhysics
                    ? 'bg-[#0456DD] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🪐 Zero-G Matter.js
              </button>
              <button
                type="button"
                onClick={() => setEnablePhysics(false)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  !enablePhysics
                    ? 'bg-[#0456DD] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🍃 Gentle Drift
              </button>
            </div>
          </div>
        </div>

        {/* 4 Hardware Cards with Interactive FolderFloat Components */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HARDWARE_ITEMS.map((hw) => (
            <div
              key={hw.id}
              className="group relative bg-slate-50/70 hover:bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-visible"
            >
              {/* Top Details */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">
                    {hw.icon}
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border"
                    style={{
                      color: hw.badgeColor,
                      backgroundColor: `${hw.badgeColor}14`,
                      borderColor: `${hw.badgeColor}33`
                    }}
                  >
                    {hw.tag}
                  </span>
                </div>

                <h3 className="font-barlow font-black text-base sm:text-lg text-slate-900 mt-1 leading-snug">
                  {hw.title}
                </h3>
                <p className="font-archivo text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                  {hw.frontDesc}
                </p>
              </div>

              {/* Interactive FolderFloat Showcase Zone */}
              <div className="my-5 pt-12 pb-2 flex items-center justify-center overflow-visible min-h-[220px]">
                <FolderFloat
                  key={`${hw.id}-${triggerMode}-${enablePhysics}`}
                  items={hw.items}
                  label={hw.label}
                  sublabel={hw.sublabel}
                  trigger={triggerMode}
                  physics={enablePhysics}
                  drift={0.5}
                  closeOnSelect={false}
                  folderColor={hw.folderColor}
                  frontColor={hw.frontColor}
                  paperColor="#ffffff"
                  itemColor="#ffffff"
                  itemTextColor="#0f172a"
                  labelColor="#ffffff"
                  width={180}
                  height={125}
                  radius={12}
                  spread={105}
                  lift={22}
                  tilt={8}
                  flapAngle={32}
                  restAngle={14}
                  openDuration={480}
                  stagger={40}
                  bounce={0.25}
                  className="mx-auto select-none"
                />
              </div>

              {/* Bottom Specs & Status Footer */}
              <div className="pt-3.5 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-ping" />
                  <span>{triggerMode === 'hover' ? 'Hover to float notes' : 'Click to float notes'}</span>
                </span>
                <span className="text-slate-800 font-bold bg-white px-2 py-0.5 rounded-lg border border-slate-200/70 shadow-2xs">
                  {hw.speed}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
