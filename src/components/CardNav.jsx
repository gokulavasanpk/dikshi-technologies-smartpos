import React, { useState, useEffect, useRef } from 'react';

/**
 * CardNav Component for Dikshi Technologies
 * - Full-width lengthy top header spanning the entire screen width
 * - Attached flush to top: no transparent gap or margin above the nav
 * - Solid clean white at the top; dynamic backdrop blur on scroll/swipe
 * - Sleek dropdown mega-cards menu with balanced categories
 */
export default function CardNav({
  logo,
  logoAlt = "Dikshi Technologies",
  items = [],
  cta = { label: "Try POS Simulator", href: "#pos-simulator" }
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const containerRef = useRef(null);

  // Responsive breakpoint check
  useEffect(() => {
    const checkWidth = () => {
      setIsNarrow(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Click outside to close menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <header 
      ref={containerRef}
      className="relative z-50 w-full bg-white"
    >
      {/* Top Navbar Row (Lengthy Full-Width with Max-W Container) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 min-w-0 group">
          {logo ? (
            typeof logo === 'string' ? (
              <img src={logo} alt={logoAlt} className="w-8 h-8 rounded-full object-contain flex-shrink-0 shadow-sm" />
            ) : (
              logo
            )
          ) : (
            <img 
              src="/assets/dikshi-logo.png" 
              alt="Dikshi Technologies Logo" 
              className="w-8 h-8 rounded-full object-contain flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform" 
            />
          )}
          
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-sm sm:text-[15px] tracking-tight text-slate-900 truncate font-display">
              DIKSHI TECHNOLOGIES
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium font-display tracking-tight -mt-0.5 truncate">
              Cloth &amp; Fancy SmartPOS
            </span>
          </div>
        </a>

        {/* Quick Nav Links (Visible on desktop for lengthy, rich header) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-600 font-display">
          <a href="#pos-simulator" className="hover:text-[#0456DD] transition">POS Simulator</a>
          <a href="#solutions-deck" className="hover:text-[#0456DD] transition">Solutions Deck</a>
          <a href="#lookbook-stage" className="hover:text-[#0456DD] transition">Virtual Runway</a>
          <a href="#multiplatform" className="hover:text-[#0456DD] transition">Multi-Platform</a>
          <a href="#pricing" className="hover:text-[#0456DD] transition">Pricing &amp; ROI</a>
        </nav>

        {/* Right Action & Menu Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          {cta && (
            <a
              href={cta.href}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0456DD] hover:bg-[#0344b0] text-white text-xs font-bold tracking-wide transition shadow-sm hover:shadow active:scale-95 font-display"
              onClick={() => setIsOpen(false)}
            >
              <span>{cta.label}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          )}

          <button
            onClick={toggleMenu}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-normal transition border active:scale-95 font-display cursor-pointer ${
              isOpen 
                ? 'bg-slate-900 text-white border-slate-900' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200/80'
            }`}
            aria-label="Toggle navigation menu"
          >
            <span>{isOpen ? 'Close' : 'Menu'}</span>
            <div className="w-3.5 h-3.5 relative flex flex-col justify-center items-center gap-1">
              <span className={`block w-3.5 h-0.5 rounded-full transition-all duration-200 ${isOpen ? 'bg-white rotate-45 translate-y-[3px]' : 'bg-slate-700'}`} />
              <span className={`block w-3.5 h-0.5 rounded-full transition-all duration-200 ${isOpen ? 'bg-white -rotate-45 -translate-y-[3px]' : 'bg-slate-700'}`} />
            </div>
          </button>
        </div>

      </div>

      {/* Dropdown Mega-Menu Panel */}
      {isOpen && (
        <div className="w-full bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl transition-all duration-300">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`grid ${isNarrow ? 'grid-cols-1' : 'grid-cols-3'} gap-4 sm:gap-6`}>
              {items.map((item, index) => (
                <div
                  key={item.label || index}
                  className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-slate-900 tracking-tight font-display">
                        {item.label}
                      </h4>
                      <span className="text-[10px] font-bold text-[#0456DD] bg-blue-50 px-2.5 py-0.5 rounded-full font-display">
                        0{index + 1}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-slate-500 font-normal leading-relaxed font-display">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {item.links && item.links.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex flex-col gap-1.5">
                      {item.links.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#0456DD] py-1.5 px-2.5 rounded-xl hover:bg-white transition font-display"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform">
                            {link.label}
                          </span>
                          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0456DD] group-hover:translate-x-0.5 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
