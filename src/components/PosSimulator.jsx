import React, { useState } from 'react';
import SpotlightCard from './SpotlightCard';
import GooeyNav from './GooeyNav';

const SAMPLE_ITEMS = [
  { id: 'DIK-SAR-01', name: 'Banarasi Kanjivaram Silk Saree', price: 4499, category: 'Ethnic Wear', size: 'Free Size', image: '/assets/saree-banarasi.jpg', tag: 'Pure Zari Silk' },
  { id: 'DIK-SAR-02', name: 'Chanderi Zari Handloom Saree', price: 3299, category: 'Ethnic Wear', size: 'Free Size', image: '/assets/saree-chanderi.jpg', tag: 'Handloom Silk' },
  { id: 'DIK-CAP-01', name: 'Limited Edition Star Snapback Cap', price: 899, category: 'Accessories', size: 'Free Size', image: '/assets/one-standard-cap.png', tag: 'Embroidered Cotton' },
  { id: 'DIK-JWL-77', name: 'Golden Flame Sculptural Earrings', price: 1299, category: 'Fancy Ornaments', size: 'One Size', image: '/assets/one-standard-earrings.png', tag: 'Fluid 18K Gold' },
  { id: 'DIK-WTC-88', name: 'Tactical Matte Chronograph Watch', price: 3999, category: 'Accessories', size: 'Standard', image: '/assets/one-standard-watch.png', tag: 'Tactical Matte' },
  { id: 'DIK-BAG-95', name: 'Ochre Suede Grommet Hobo Bag', price: 2199, category: 'Accessories', size: 'Standard', image: '/assets/one-standard-bag.png', tag: 'Boutique Suede' },
  { id: 'DIK-EYE-42', name: 'Dark Shield UV400 Cyber Shades', price: 1499, category: 'Accessories', size: 'Free Size', image: '/assets/one-standard-sunglasses.png', tag: 'UV400 Shield' },
  { id: 'DIK-AUD-20', name: 'Studio Wireless Metallic Headphones', price: 2499, category: 'Accessories', size: 'Standard', image: '/assets/one-standard-headphones2.png', tag: 'High-Fi Acoustic' },
  { id: 'DIK-KUR-02', name: 'Handcrafted Anarkali Kurti Set', price: 1899, category: 'Women Festive', size: 'M', image: '/assets/kurti-anarkali.jpg', tag: 'Festive Georgette' },
  { id: 'DIK-KUR-03', name: 'Jaipuri Block-Print Cotton Kurti', price: 1299, category: 'Women Festive', size: 'L', image: '/assets/kurti-jaipuri.jpg', tag: 'Pure Mulmul Cotton' },
  { id: 'DIK-DEN-03', name: 'Slim Fit Stretch Indigo Denim', price: 1499, category: "Men's Apparel", size: '32', image: '/assets/mens-denim.jpg', tag: 'Flex Stretch Indigo' },
  { id: 'DIK-MEN-04', name: 'Royal Linen Festive Kurta Pajama', price: 2199, category: "Men's Apparel", size: 'XL', image: '/assets/mens-kurta.jpg', tag: 'Premium Linen' }
];

const CATEGORY_TABS = [
  { label: 'All Catalog', cat: 'all' },
  { label: 'Silk Sarees', cat: 'Ethnic Wear' },
  { label: 'Kurtis & Sets', cat: 'Women Festive' },
  { label: "Men's Apparel", cat: "Men's Apparel" },
  { label: 'Jewelry', cat: 'Fancy Ornaments' },
  { label: 'Accessories', cat: 'Accessories' }
];

export default function PosSimulator({ cart = [], setCart, onShowToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeCategory, setActiveCategory] = useState('all');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-88492');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const addItemToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === (item.size || selectedSize));
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, size: item.size || selectedSize, qty: 1 }];
    });
    if (onShowToast) onShowToast(`Added ${item.name} to POS Cart!`);
  };

  const updateQty = (index, delta) => {
    setCart(prev => {
      const item = prev[index];
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      return prev.map((it, i) => i === index ? { ...it, qty: newQty } : it);
    });
  };

  const removeItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'DIKSHI20') {
      setDiscountPercent(20);
      setAppliedCoupon('DIKSHI20 (20% OFF)');
      if (onShowToast) onShowToast('🎉 Coupon DIKSHI20 applied: 20% Discount!');
    } else if (code === 'FESTIVE10') {
      setDiscountPercent(10);
      setAppliedCoupon('FESTIVE10 (10% OFF)');
      if (onShowToast) onShowToast('🎉 Coupon FESTIVE10 applied: 10% Discount!');
    } else {
      if (onShowToast) onShowToast('❌ Invalid coupon code! Use DIKSHI20 or FESTIVE10');
    }
  };

  // Calculations
  const subtotal = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = subtotal - discountAmount;
  const gstAmount = Math.round(taxableAmount * 0.05); // 5% GST for textiles
  const grandTotal = taxableAmount + gstAmount;

  const handlePrintReceipt = () => {
    if (cart.length === 0) {
      if (onShowToast) onShowToast('⚠️ Cart is empty! Add products first.');
      return;
    }
    setInvoiceNumber(`INV-${Math.floor(10000 + Math.random() * 90000)}`);
    setIsReceiptOpen(true);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const filteredItems = SAMPLE_ITEMS.filter(it => {
    const matchesSearch = it.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      it.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || it.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section id="pos-simulator" className="scroll-mt-20 sm:scroll-mt-24 py-6 sm:py-8 bg-white overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Compact and clear */}
        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Live Cloth &amp; Fancy Billing Simulator
          </h2>
          <p className="text-slate-500 text-xs mt-1 max-w-xl mx-auto font-normal font-display">
            Scan barcode, select size matrix variant, compute instant GST tax, and preview 80mm thermal bill inside desktop terminal.
          </p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP MONITOR MOCKUP TEMPLATE ENCLOSURE (FITS FULL LAYOUT)   */}
        {/* ============================================================== */}
        <div className="relative mx-auto w-full max-w-3xl lg:max-w-4xl">
          
          {/* 1. The Desktop Monitor Display Chassis */}
          <div className="relative rounded-[18px] sm:rounded-[24px] bg-[#0E131F] p-2 sm:p-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.25),0_6px_16px_rgba(0,0,0,0.14)] border border-slate-700/80 ring-1 ring-white/10">
            
            {/* Monitor Top Bezel: Centered Webcam Lens & Green Active LED */}
            <div className="flex items-center justify-center gap-1.5 mb-1.5 sm:mb-2">
              <div className="w-2 h-2 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center shadow-inner">
                <span className="w-0.5 h-0.5 rounded-full bg-slate-800" />
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>

            {/* Windows 11 POS Desktop Window Title Bar */}
            <div className="bg-[#181D28] rounded-t-xl sm:rounded-t-2xl px-2.5 sm:px-3 py-1.5 border-b border-slate-700/80 flex items-center justify-between text-slate-300 select-none">
              
              {/* Left: Windows App Branding */}
              <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
                <img src="/assets/dikshi-logo.png" alt="Dikshi Logo" className="w-4 h-4 rounded-full object-contain" />
                <div className="flex items-baseline gap-1.5 truncate">
                  <span className="font-bold text-slate-100 text-[11px] font-display">Dikshi SmartPOS</span>
                  <span className="text-slate-500 text-[10px] font-mono hidden sm:inline">v2026.4</span>
                  <span className="text-slate-600 text-[10px] hidden md:inline">|</span>
                  <span className="text-slate-400 text-[10px] font-mono hidden md:inline">Counter #01 (Jaipur Flagship)</span>
                </div>
              </div>

              {/* Center: Clean Windows SSL Address (Never wraps) */}
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[10px] font-mono text-slate-300 shadow-inner flex-shrink-0">
                <span className="text-emerald-400 text-[10px]">🔒</span>
                <span className="text-slate-400">pos.dikshitechnologies.com</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-800 text-[8px] font-bold">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Right: Windows Native Window Control Buttons (Minimize, Maximize, Close) */}
              <div className="flex items-center -mr-1">
                {/* Windows Minimize Button */}
                <button 
                  className="w-7 h-6 sm:w-8 sm:h-6 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-sm transition cursor-pointer"
                  title="Minimize"
                  aria-label="Minimize Window"
                >
                  <span className="w-2.5 h-[1.5px] bg-current inline-block" />
                </button>
                {/* Windows Maximize / Restore Button */}
                <button 
                  className="w-7 h-6 sm:w-8 sm:h-6 flex items-center justify-center text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded-sm transition cursor-pointer"
                  title="Maximize"
                  aria-label="Maximize Window"
                >
                  <span className="w-2.5 h-2.5 border-[1.5px] border-current inline-block rounded-[1px]" />
                </button>
                {/* Windows Close Button */}
                <button 
                  className="w-7 h-6 sm:w-8 sm:h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E81123] rounded-sm transition cursor-pointer text-xs font-normal"
                  title="Close"
                  aria-label="Close Window"
                >
                  ✕
                </button>
              </div>

            </div>

            {/* 2. Interactive Screen Workspace - FIXED HEIGHT DESKTOP SCREEN */}
            <div className="relative bg-slate-100 rounded-b-xl sm:rounded-b-2xl border border-slate-300/60 shadow-inner h-[395px] sm:h-[415px] lg:h-[425px] overflow-hidden flex flex-col justify-between">
              
              {/* Internal Desktop Hint Bar for Small Screens (Visible only when viewport requires scrolling) */}
              <div className="lg:hidden bg-slate-200/90 border-b border-slate-300/80 px-2.5 py-1 text-[9.5px] font-mono text-slate-600 flex items-center justify-between flex-shrink-0 select-none">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0078D4] font-bold">⇄ ⇅</span> Scroll / pan inside monitor to explore desktop POS
                </span>
                <span className="text-[8px] bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-300 font-bold uppercase tracking-wider">
                  Desktop POS
                </span>
              </div>

              {/* Internal Content Workspace (Scrollable on small layouts, fits seamlessly on desktop) */}
              <div className="w-full flex-1 overflow-auto lg:overflow-hidden pos-monitor-viewport">
                {/* 2-Column POS Layout inside Desktop (Pinned desktop width & height on small screens, fluid on lg) */}
                <div className="w-[740px] min-w-[740px] lg:w-full lg:min-w-0 min-h-[410px] lg:min-h-0 lg:h-full p-2.5 sm:p-3 flex flex-col justify-between">
                  <div className="grid grid-cols-12 gap-2.5 sm:gap-3 items-stretch h-full">
                  
                  {/* Left Column: Product Catalog & Search (7 Cols) - FIXED HEIGHT, CLEAN DESKTOP VIEW */}
                  <div className="col-span-7 flex flex-col justify-between h-full overflow-hidden">
                    
                    {/* Search Bar & Size Matrix - Compact & Proportional */}
                    <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 flex-shrink-0">
                      <div className="relative flex-1 w-full">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          placeholder="Scan barcode or SKU (e.g., DIK-SAR-01)..."
                          className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-display focus:outline-none focus:ring-1 focus:ring-[#0078D4]"
                        />
                      </div>

                      {/* Size variant selector */}
                      <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 flex-shrink-0">
                        <span className="text-[10px] font-mono text-slate-400 mr-0.5 hidden sm:inline">Size:</span>
                        {['S', 'M', 'L', 'XL', 'Free'].map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md border transition cursor-pointer ${
                              selectedSize === sz
                                ? 'bg-[#0078D4] text-white border-[#0078D4]'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Windows 11 Department Tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none flex-shrink-0">
                      {CATEGORY_TABS.map((tab) => (
                        <button
                          key={tab.cat}
                          onClick={() => handleCategoryChange(tab.cat)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] whitespace-nowrap transition cursor-pointer ${
                            activeCategory === tab.cat
                              ? 'bg-[#0078D4] text-white font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Product Cards Grid: Exactly 6 Slots (2 Rows of 3) - FIXED HEIGHT, NEVER JUMPS */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[200px] sm:h-[210px] overflow-hidden flex-shrink-0">
                    {currentItems.length === 0 ? (
                      <div className="col-span-2 sm:col-span-3 row-span-2 flex flex-col items-center justify-center text-center p-4 bg-white/60 rounded-xl border border-dashed border-slate-300 text-slate-400 font-mono text-[10px]">
                        <span className="text-xl mb-1">🔍</span>
                        <span>No items match "{searchTerm}" in this category</span>
                        <button 
                          onClick={() => { setSearchTerm(''); setActiveCategory('all'); setCurrentPage(1); }}
                          className="mt-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#0078D4] text-[9px] font-bold hover:bg-[#0078D4] hover:text-white transition cursor-pointer"
                        >
                          Show All Products
                        </button>
                      </div>
                    ) : (
                      currentItems.map((item) => (
                        <SpotlightCard
                          key={item.id}
                          className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between h-full"
                          spotlightColor="rgba(0, 120, 212, 0.12)"
                        >
                          <div>
                            <div className="w-full h-14 sm:h-16 rounded-lg bg-slate-100 mb-1 flex items-center justify-center overflow-hidden border border-slate-200/80">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                loading="lazy" 
                                decoding="async" 
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                              />
                            </div>
                            <span className="text-[8px] font-mono uppercase font-bold text-[#0078D4] block truncate">
                              {item.category}
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-[11px] text-slate-900 truncate font-display leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[9px] font-mono text-slate-400 truncate">
                              {item.id}
                            </p>
                          </div>

                          <div className="mt-1 pt-1 border-t border-slate-100 flex items-center justify-between">
                            <span className="font-extrabold text-[11px] text-slate-900 font-display">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => addItemToCart(item)}
                              className="px-2 py-0.5 rounded-md bg-blue-50 hover:bg-[#0078D4] text-[#0078D4] hover:text-white text-[10px] font-bold transition cursor-pointer"
                            >
                              + Add
                            </button>
                          </div>
                        </SpotlightCard>
                      ))
                    )}
                  </div>

                  {/* Catalog Pagination Controls - Pinned at bottom of left column */}
                  <div className="flex items-center justify-between px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-xs font-mono flex-shrink-0">
                    <span className="text-[10px] text-slate-500">
                      {filteredItems.length === 0 ? '0 items' : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of ${filteredItems.length} items`}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                          currentPage === 1 
                            ? 'text-slate-300 bg-slate-50 cursor-not-allowed' 
                            : 'text-slate-700 bg-slate-100 hover:bg-[#0078D4] hover:text-white cursor-pointer'
                        }`}
                      >
                        ‹ Prev
                      </button>
                      
                      <span className="text-[10px] font-bold text-slate-700 px-1">
                        {currentPage} / {totalPages}
                      </span>

                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                          currentPage >= totalPages 
                                ? 'text-slate-300 bg-slate-50 cursor-not-allowed' 
                                : 'text-slate-700 bg-slate-100 hover:bg-[#0078D4] hover:text-white cursor-pointer'
                        }`}
                      >
                        Next ›
                      </button>
                    </div>
                  </div>

                </div>

                {/* Right Column: Active Terminal Cart (5 Cols) - FIXED FULL HEIGHT */}
                <div className="col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs p-2.5 sm:p-3 flex flex-col justify-between h-full overflow-hidden">
                  <div className="flex-1 flex flex-col justify-start overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-1.5 flex-shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[10px] font-bold text-slate-700 uppercase">
                          Register #01 · Live Counter
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {cart.length} {cart.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    {/* Cart Items List */}
                    {cart.length === 0 ? (
                      <div className="text-center py-5 text-slate-400 font-mono text-[10px] flex-1 flex flex-col items-center justify-center">
                        <span className="text-2xl block mb-1">🛍️</span>
                        No cloth items in cart.<br />Tap any product or scan barcode to add!
                      </div>
                    ) : (
                      <div className="space-y-1 max-h-[110px] sm:max-h-[125px] overflow-y-auto pr-1 flex-1">
                        {cart.map((item, idx) => (
                          <div key={`${item.id}-${idx}`} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px]">
                            <div className="min-w-0 pr-1.5">
                              <p className="font-bold text-slate-800 truncate font-display text-[10px]">{item.name}</p>
                              <span className="text-[8px] text-slate-400 font-mono">
                                ₹{item.price} · Size: {item.size}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <div className="flex items-center bg-white rounded border border-slate-200">
                                <button
                                  onClick={() => updateQty(idx, -1)}
                                  className="px-1.5 py-0.2 text-slate-600 hover:bg-slate-100 rounded-l text-[9px]"
                                >
                                  -
                                </button>
                                <span className="px-1 font-mono text-[9px] font-bold text-slate-800">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(idx, 1)}
                                  className="px-1.5 py-0.2 text-slate-600 hover:bg-slate-100 rounded-r text-[9px]"
                                >
                                  +
                                </button>
                              </div>
                              <span className="font-mono font-bold text-slate-900 w-12 text-right text-[10px]">
                                ₹{(item.price * item.qty).toLocaleString('en-IN')}
                              </span>
                              <button
                                onClick={() => removeItem(idx)}
                                className="text-red-400 hover:text-red-600 text-[9px] px-0.5 cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Coupon Box */}
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex-shrink-0">
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon (DIKSHI20)"
                          className="flex-1 px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[10px] font-mono uppercase focus:outline-none focus:ring-1 focus:ring-[#0078D4]"
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-2.5 py-0.5 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-semibold rounded-md transition cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedCoupon && (
                        <span className="text-[9px] font-mono text-emerald-600 mt-0.5 block">
                          ✓ Applied: {appliedCoupon}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Billing Summary & Actions - Always pinned at bottom */}
                  <div className="pt-1.5 border-t border-slate-100 space-y-0.5 text-[10px] flex-shrink-0">
                    <div className="flex justify-between text-slate-600 font-display">
                      <span>Subtotal</span>
                      <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-display">
                        <span>Discount ({discountPercent}%)</span>
                        <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600 font-display">
                      <span>GST (5% Apparel Tax)</span>
                      <span className="font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1 border-t border-slate-200 text-slate-900">
                      <span className="font-bold text-xs font-display">Grand Total</span>
                      <span className="font-black text-sm sm:text-base text-[#0078D4] font-mono">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handlePrintReceipt}
                      className="w-full mt-1.5 py-1.5 rounded-lg bg-[#0078D4] hover:bg-[#0067b8] text-white font-bold text-[11px] uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>🖨️ Print 80mm GST Thermal Bill</span>
                    </button>
                  </div>

                </div>
                {/* End of col-span-5 right column */}

              </div>
              {/* End of grid grid-cols-12 */}

            </div>
            {/* End of w-[740px] desktop canvas container */}

          </div>
          {/* End of pos-monitor-viewport */}
            {/* End of internal content */}

            {/* 3. Authentic Windows 11 Desktop Taskbar (Centered Icons) */}
            <div className="h-7 sm:h-7.5 bg-[#121620]/95 backdrop-blur-xl border-t border-slate-700/80 px-2.5 sm:px-3 flex items-center justify-between text-slate-300 text-[10px] select-none z-10 flex-shrink-0">
              
              {/* Left: Windows 11 Weather Widget */}
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-white/10 transition cursor-pointer text-slate-300">
                <span className="text-xs">⛅</span>
                <div className="hidden sm:flex flex-col leading-none text-left">
                  <span className="text-[9px] font-semibold text-slate-200">28°C</span>
                  <span className="text-[7.5px] text-slate-400 font-mono">Sunny · Jaipur</span>
                </div>
              </div>

              {/* Center: Authentic Windows 11 Centered Taskbar Icons */}
              <div className="flex items-center gap-1">
                {/* Windows 11 Start Icon (4 blue squares) */}
                <button 
                  className="w-6 h-6 flex items-center justify-center p-0.5 rounded hover:bg-white/10 transition cursor-pointer"
                  title="Windows 11 Start"
                >
                  <div className="w-3.5 h-3.5 grid grid-cols-2 gap-[1.5px] p-[1px]">
                    <span className="bg-[#0078D4] rounded-[0.5px]" />
                    <span className="bg-[#0078D4] rounded-[0.5px]" />
                    <span className="bg-[#0078D4] rounded-[0.5px]" />
                    <span className="bg-[#0078D4] rounded-[0.5px]" />
                  </div>
                </button>

                {/* Windows 11 Search pill */}
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/90 border border-slate-700/60 text-[9px] text-slate-400 hover:bg-slate-800 transition cursor-pointer">
                  <span className="text-[9px]">🔍</span>
                  <span>Search</span>
                </div>

                {/* Windows 11 Task View */}
                <button className="w-6 h-6 hidden md:flex items-center justify-center rounded hover:bg-white/10 transition text-slate-400 text-xs" title="Task View">
                  🗗
                </button>

                {/* Windows 11 Copilot */}
                <button className="w-6 h-6 hidden sm:flex items-center justify-center rounded hover:bg-white/10 transition text-cyan-400 text-xs" title="Microsoft Copilot">
                  ✨
                </button>

                {/* File Explorer icon */}
                <button className="w-6 h-6 hidden xs:flex items-center justify-center rounded hover:bg-white/10 transition text-amber-400 text-xs" title="File Explorer">
                  📁
                </button>

                {/* ACTIVE APP: Dikshi SmartPOS (with blue indicator bar underneath) */}
                <div className="relative px-2 py-0.5 rounded bg-white/10 transition flex flex-col items-center">
                  <img src="/assets/dikshi-logo.png" alt="Dikshi SmartPOS" className="w-3.5 h-3.5 object-contain" />
                  <span className="absolute -bottom-0.5 w-3 h-[2px] bg-[#0078D4] rounded-full shadow-[0_0_4px_#0078D4]" />
                </div>

                {/* Edge Browser */}
                <button className="w-6 h-6 hidden md:flex items-center justify-center rounded hover:bg-white/10 transition text-blue-400 text-xs" title="Microsoft Edge">
                  🌐
                </button>

                {/* Thermal Printer Spooler icon */}
                <span className="text-[11px] opacity-80 hidden xs:inline px-1" title="80mm Thermal Receipt Spooler Active">🖨️</span>
              </div>

              {/* Right: Windows 11 System Tray + Quick Settings + Clock */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-300">
                <span className="text-slate-400 text-[10px] hidden sm:inline">^</span>
                
                {/* Quick Settings Pill */}
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition cursor-pointer text-slate-300 text-[10px]">
                  <span>📶</span>
                  <span>🔊</span>
                  <span>🔋</span>
                </div>

                <span className="hidden sm:inline text-slate-400 text-[9px]">ENG</span>

                {/* Stacked Clock & Date */}
                <div className="flex flex-col items-end leading-none px-1.5 py-0.5 rounded hover:bg-white/10 transition cursor-pointer">
                  <span className="text-slate-200 font-semibold text-[9.5px]">
                    {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                  <span className="text-slate-400 text-[7.5px] mt-0.5">
                    {new Date().toLocaleDateString('en-GB')}
                  </span>
                </div>

                {/* Notifications */}
                <span className="text-slate-400 hover:text-white transition cursor-pointer text-xs" title="Notifications">
                  🔔
                </span>

                {/* Show Desktop sliver */}
                <div className="w-[2px] h-3.5 bg-slate-600/70 ml-1 rounded-full" />
              </div>

            </div>

              {/* 80mm Thermal Receipt Popup - Rendered INSIDE Desktop Screen Template */}
              {isReceiptOpen && (
                <div className="absolute inset-0 z-40 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 rounded-b-xl sm:rounded-b-2xl animate-in fade-in duration-150">
                  <div className="bg-white w-full max-w-[290px] sm:max-w-[310px] max-h-[96%] overflow-y-auto rounded-xl p-3 sm:p-3.5 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150 font-mono text-slate-900">
                    {/* Close button */}
                    <button
                      onClick={() => setIsReceiptOpen(false)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[11px] font-bold transition"
                      aria-label="Close Receipt"
                    >
                      ✕
                    </button>

                    {/* Thermal Slip Content */}
                    <div className="font-mono text-[10px] text-slate-900 border-b border-dashed border-slate-300 pb-2 text-center">
                      <img src="/assets/dikshi-logo.png" alt="Dikshi Technologies" className="w-7 h-7 rounded-full mx-auto mb-1 object-contain shadow-xs" />
                      <h3 className="font-black text-xs uppercase tracking-tight text-slate-900">JAIPUR SILK &amp; BOUTIQUE</h3>
                      <p className="text-[9px] text-slate-500">M.I. Road, Jaipur, Rajasthan</p>
                      <p className="text-[9px] text-slate-500">GSTIN: 08AABCT4829K1Z5</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">Inv #{invoiceNumber} · {new Date().toLocaleDateString('en-IN')}</p>
                    </div>

                    {/* Line Items */}
                    <div className="py-2 border-b border-dashed border-slate-300 space-y-1 font-mono text-[10px]">
                      {cart.map((it, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="truncate pr-2 font-medium">{it.qty}x {it.name} ({it.size})</span>
                          <span className="flex-shrink-0 font-bold">₹{it.price * it.qty}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tax & Total */}
                    <div className="py-2 border-b border-dashed border-slate-300 font-mono text-[10px] space-y-0.5">
                      <div className="flex justify-between text-slate-600">
                        <span>Taxable Value</span>
                        <span>₹{taxableAmount}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>SGST (2.5%)</span>
                        <span>₹{(gstAmount / 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>CGST (2.5%)</span>
                        <span>₹{(gstAmount / 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-black text-xs pt-1 border-t border-slate-200 text-slate-950">
                        <span>NET TOTAL</span>
                        <span>₹{grandTotal}</span>
                      </div>
                    </div>

                    {/* UPI QR Code Mock */}
                    <div className="pt-2 text-center">
                      <div className="w-14 h-14 mx-auto bg-slate-900 rounded-lg p-1 flex flex-col items-center justify-center text-white text-[9px] font-mono font-bold shadow-inner">
                        <span className="text-[12px]">📱</span>
                        <span>UPI QR</span>
                      </div>
                      <p className="text-[8px] font-mono text-slate-500 mt-1">
                        Scan via GPay / PhonePe / Paytm
                      </p>
                      <button
                        onClick={() => {
                          setIsReceiptOpen(false);
                          if (onShowToast) onShowToast('✅ Thermal Receipt Printed & Saved!');
                        }}
                        className="mt-2 w-full py-1.5 bg-[#0078D4] hover:bg-[#0067b8] text-white font-mono text-[10px] rounded-lg font-bold transition shadow-sm cursor-pointer"
                      >
                        ✓ Close &amp; Complete Bill
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
            {/* End of Screen Workspace */}

            {/* 3. Monitor Bottom Bezel Chin with Engraved Branding */}
            <div className="pt-1.5 sm:pt-2 flex items-center justify-center">
              <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition">
                <img src="/assets/dikshi-logo.png" alt="Dikshi Logo" className="w-3.5 h-3.5 rounded-full object-contain" />
                <span className="font-display font-bold text-[9px] tracking-widest text-slate-400 uppercase">
                  DIKSHI TECHNOLOGIES
                </span>
              </div>
            </div>

          </div>

          {/* 4. Desktop Monitor Stand Neck - Compact */}
          <div 
            className="w-20 sm:w-28 h-5 sm:h-7 mx-auto bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500 shadow-sm"
            style={{
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)'
            }}
          />

          {/* 5. Desktop Monitor Aluminum Foot Base - Compact & Elegant */}
          <div className="w-44 sm:w-60 h-2.5 sm:h-3 mx-auto bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-lg sm:rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.25)] border border-slate-300 relative">
            <div className="absolute inset-x-4 top-0.5 h-[1px] bg-white/70 rounded-full" />
          </div>

          {/* 6. Ambient Desk Surface Contact Shadow */}
          <div className="w-3/4 max-w-xl h-3.5 bg-slate-900/20 blur-md rounded-full mx-auto -mt-1.5 pointer-events-none" />

        </div>

      </div>

    </section>
  );
}
