import React, { useState, Suspense, lazy } from 'react';
import CardNav from './components/CardNav';
import HeroSection from './components/HeroSection';
import DeckWheel from './components/DeckWheel';
import TextileShowcaseBanner from './components/TextileShowcaseBanner';
import PixelTrail from './components/PixelTrail';
import SwitchbladeLookbook from './components/SwitchbladeLookbook';
import FlowingMenu from './components/FlowingMenu';
import ShowroomTapestrySection from './components/ShowroomTapestrySection';
import ShowroomExperienceBanner from './components/ShowroomExperienceBanner';
import PosSimulator from './components/PosSimulator';
import MultiPlatformDeviceSection from './components/MultiPlatformDeviceSection';
import HardwareGrid from './components/HardwareGrid';
import PricingRoi from './components/PricingRoi';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingGooeyDock from './components/FloatingGooeyDock';

// Code-split heavy WebGL 3D physics scene for instant initial page loading
const MerchantBadgeSection = lazy(() => import('./components/MerchantBadgeSection'));

const NAV_ITEMS = [
  {
    label: 'Store Solutions',
    description: 'Designed specifically for cloth, sarees, and boutique showrooms.',
    links: [
      { label: 'Live POS Simulator', href: '#pos-simulator' },
      { label: 'Virtual Fitting Runway', href: '#lookbook-stage' },
      { label: 'Solutions Carousel Deck', href: '#solutions-deck' },
      { label: 'Omnichannel OS & Apps', href: '#multiplatform' }
    ]
  },
  {
    label: 'Retail Features',
    description: 'Automated barcode printing, size matrix, and tailoring job slips.',
    links: [
      { label: 'Size & Color Variant Matrix', href: '#pos-simulator' },
      { label: 'High-Speed Barcode Lookup', href: '#pos-simulator' },
      { label: 'GST Thermal Receipt Print', href: '#pos-simulator' },
      { label: 'Certified Hardware Setup', href: '#hardware' }
    ]
  },
  {
    label: 'Pricing & Plans',
    description: 'Transparent monthly plans, store ROI calculator, and merchant support.',
    links: [
      { label: 'Store ROI Savings Calculator', href: '#pricing' },
      { label: 'Subscription Pricing Plans', href: '#pricing' },
      { label: 'VIP Merchant Digital Keycard', href: '#merchant-pass' },
      { label: 'Frequently Asked Questions', href: '#faq' }
    ]
  }
];

export default function App() {
  const [cart, setCart] = useState([
    { id: 'DIK-CAP-01', name: 'Limited Edition Star Snapback Cap', price: 899, category: 'Headwear', size: 'Free Size', qty: 1 }
  ]);
  const [toastMessage, setToastMessage] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === product.size);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✅ Added ${product.name} (₹${product.price}) to POS Cart!`);
  };

  const handleSelectDeckCard = (card) => {
    showToast(`✨ Selected: ${card.title} (${card.tagline})`);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 overflow-x-clip relative flex flex-col">

      {/* 1. Header Navigation */}
      <CardNav
        logo="/assets/dikshi-logo.png"
        items={NAV_ITEMS}
        cta={{ label: "Try POS Simulator", href: "#pos-simulator" }}
        cardEffect="rise"
        openOn="click"
        stagger={0.08}
        bounce={0.15}
        speed={1.1}
        cardHeight={220}
        maxWidth={880}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onExplorePOS={() => window.location.hash = 'pos-simulator'}
        onBookDemo={() => setIsDemoModalOpen(true)}
      />

      {/* 3. Solutions Deck Arc Carousel */}
      <DeckWheel onSelectCard={handleSelectDeckCard} />

      {/* 4. Luxury Textile Statement with React Bits MaskedHeading */}
      <TextileShowcaseBanner />

      {/* 5. Switchblade Cosine U-Curve Live Runway */}
      <div id="lookbook-stage" className="scroll-mt-24 sm:scroll-mt-28">
        <PixelTrail pixelSize={18} trailColor="4, 86, 221">
          <SwitchbladeLookbook onAddToCart={handleAddToCart} />
        </PixelTrail>
      </div>

      {/* 6. Marquee Store Categories */}
      <FlowingMenu />

      {/* 7. Kinetic Showroom Tapestry with React Bits GridMotion */}
      <ShowroomTapestrySection />

      {/* 8. Flagship Showroom Experience with React Bits ScrollExpand */}
      <ShowroomExperienceBanner
        onBookDemo={() => setIsDemoModalOpen(true)}
      />

      {/* 9. Live POS Billing Simulator */}
      <PosSimulator
        cart={cart}
        setCart={setCart}
        onShowToast={showToast}
      />

      {/* 9. Omnichannel Multi-Platform 3D Device Showcase (React Bits Pro Device) */}
      <MultiPlatformDeviceSection />

      {/* 10. Hardware Compatibility Grid */}
      <HardwareGrid />

      {/* 10. 3D VIP Merchant ID Keycard (Lanyard) - Lazy loaded */}
      <Suspense fallback={
        <section id="merchant-pass" className="scroll-mt-24 sm:scroll-mt-28 w-full py-16 lg:py-24 bg-slate-50/70 min-h-[640px]" />
      }>
        <MerchantBadgeSection
          onShowToast={showToast}
        />
      </Suspense>

      {/* 11. ROI Calculator & Transparent Pricing */}
      <PricingRoi
        onBookDemo={() => setIsDemoModalOpen(true)}
      />

      {/* 12. Frequently Asked Questions */}
      <FaqSection />

      {/* 13. Footer & Lead Booking Modal */}
      <Footer
        isDemoModalOpen={isDemoModalOpen}
        setIsDemoModalOpen={setIsDemoModalOpen}
        onShowToast={showToast}
      />

      {/* 14. Floating Quick Navigation Dock with GooeyNav */}
      <FloatingGooeyDock />

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-mono animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
