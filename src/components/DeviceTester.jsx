import React, { useState, useEffect } from 'react';

/**
 * Top Sticky Responsive Tester & Viewport Inspector Bar
 */
export default function DeviceTester({ currentWidth, onWidthChange, isGridOverlay, onToggleGrid }) {
  const [viewportDims, setViewportDims] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setViewportDims({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const presets = [
    { label: '📱 375px', value: '375px' },
    { label: '📱 430px', value: '430px' },
    { label: '📟 768px', value: '768px' },
    { label: '💻 1024px', value: '1024px' },
    { label: '🖥️ 1440px', value: '1440px' },
    { label: '↔️ 100% Fluid', value: '100%' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white px-3 py-2 text-xs font-mono shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Brand & Live Dimensions */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wider text-slate-200">
            DIKSHI RESPONSIVE LAB
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-sky-400 font-bold">
            {viewportDims.w} × {viewportDims.h}px
          </span>
        </div>

        {/* Device Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => onWidthChange(p.value)}
              className={`px-2.5 py-1 rounded transition text-[11px] font-semibold ${
                currentWidth === p.value
                  ? 'bg-[#0456DD] text-white shadow'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}

          {/* Grid Toggle */}
          <button
            onClick={onToggleGrid}
            className={`px-2.5 py-1 rounded transition text-[11px] font-semibold ml-1 ${
              isGridOverlay
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            📐 {isGridOverlay ? 'Grid: ON' : 'Grid: OFF'}
          </button>
        </div>
      </div>
    </header>
  );
}
