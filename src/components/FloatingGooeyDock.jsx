import React, { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';

const DOCK_SECTIONS = [
  {
    label: 'Solutions',
    href: '#solutions-deck',
    id: 'solutions-deck',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    label: 'Runway',
    href: '#lookbook-stage',
    id: 'lookbook-stage',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    label: 'Showroom',
    href: '#showroom-matrix',
    id: 'showroom-matrix',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    label: 'SmartPOS',
    href: '#pos-simulator',
    id: 'pos-simulator',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    label: 'App & OS',
    href: '#multiplatform',
    id: 'multiplatform',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    label: 'VIP Pass',
    href: '#merchant-pass',
    id: 'merchant-pass',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    )
  },
  {
    label: 'Pricing',
    href: '#pricing',
    id: 'pricing',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

export default function FloatingGooeyDock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Show dock after scrolling down 240px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active pill based on scroll position using IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matchedIdx = DOCK_SECTIONS.findIndex(s => s.id === entry.target.id);
          if (matchedIdx !== -1) {
            setActiveIndex(matchedIdx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    });

    DOCK_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (idx, item) => {
    setActiveIndex(idx);
    const targetEl = document.querySelector(item.href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  if (isDismissed) {
    return (
      <aside 
        aria-label="Show section navigation" 
        className="hidden md:block fixed bottom-4 sm:bottom-6 right-6 z-40 animate-fade-in"
      >
        <button
          type="button"
          onClick={() => setIsDismissed(false)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md text-slate-300 hover:text-white text-xs font-semibold shadow-lg border border-slate-700/70 transition-all hover:scale-105 cursor-pointer group"
          title="Show quick navigation dock"
        >
          <svg className="w-3.5 h-3.5 text-blue-400 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
          <span>Show Dock</span>
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Quick section navigation"
      className="hidden md:block fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 transform animate-fade-in"
    >
      <div className="bg-slate-900/90 backdrop-blur-md pl-2 pr-2.5 py-1.5 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.35)] border border-slate-700/60 flex items-center gap-1">
        <GooeyNav
          items={DOCK_SECTIONS}
          activeIndex={activeIndex}
          onChange={handleNavClick}
          theme="dark"
          size="sm"
          color="#0456DD"
          activeTextColor="#FFFFFF"
          particleCount={12}
          spread={42}
          animationTime={500}
          timeVariance={250}
          gooeyness={0.55}
          wobble={0.45}
          hoverEffect={true}
          frame={false}
          className="shadow-none border-none bg-transparent"
        />

        {/* Divider */}
        <div className="w-[1px] h-5 bg-slate-700/80 mx-1" />

        {/* Hide Button */}
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition cursor-pointer"
          title="Hide navigation line"
        >
          <svg className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-slate-400 group-hover:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span>Hide</span>
        </button>
      </div>
    </aside>
  );
}
