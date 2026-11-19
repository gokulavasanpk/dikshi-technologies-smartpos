import React, { useState, useEffect, useRef } from 'react';
import PaperCrumple from './PaperCrumple';
import { generateReceiptImage } from '../utils/receiptCanvas';
import './ReceiptPrinter.css';

/**
 * Natural Physical Receipt Printer with Gesture-Driven Tear, Crumple & Throw
 * 
 * Interactivity:
 * - Thermal print emerges step-by-step from slot with authentic zigzag cuts
 * - Click/drag the paper to tear with bottom zigzag teeth visibly ripping off the blade
 * - Enters 3D crumpled paper ball
 * - User can drag the crumpled paper ball ANYWHERE on the page ("drag in page wherever")
 * - Releasing hand from cursor ("keeping out hand in cursor") automatically throws the crumpled paper away with momentum
 * - Automatically feeds next receipt upon throwing
 */

const RECEIPT_BATCHES = [
  {
    items: [
      { name: "1 x Kanjivaram Pure Zari Silk Saree", price: "₹4,499" },
      { name: "1 x Star Snapback Cotton Cap", price: "₹899" },
      { name: "1 x Golden Flame Fluid Earrings", price: "₹1,299" }
    ],
    subtotal: "₹6,697",
    tax: "₹335",
    total: "₹7,032",
    barcode: "138232932"
  },
  {
    items: [
      { name: "1 x Banarasi Bridal Brocade Saree", price: "₹6,999" },
      { name: "1 x Cyber Shield UV400 Shades", price: "₹1,499" },
      { name: "1 x Ochre Suede Hobo Carryall", price: "₹2,199" }
    ],
    subtotal: "₹10,697",
    tax: "₹535",
    total: "₹11,232",
    barcode: "249184021"
  },
  {
    items: [
      { name: "1 x Chanderi Handloom Festive Kurti", price: "₹2,799" },
      { name: "1 x Tactical Chronograph Watch", price: "₹3,999" },
      { name: "1 x Studio Wireless Headphones", price: "₹2,499" }
    ],
    subtotal: "₹9,297",
    tax: "₹465",
    total: "₹9,762",
    barcode: "582049103"
  }
];

export default function ReceiptPrinter({
  storeName = "DIKSHI TECHNOLOGIES",
  location = "Jaipur Flagship Showroom",
  orderPrefix = "#482",
  speed = 1,
  tearable = true,
  onTear,
  onPrinted,
  className = ""
}) {
  // Status: 'feeding' | 'ready' | 'tearing' | 'crumple'
  const [status, setStatus] = useState('feeding');
  const [currentStep, setCurrentStep] = useState(0); // 0 to TOTAL_STEPS
  const [batchIdx, setBatchIdx] = useState(0);
  const [orderNum, setOrderNum] = useState(28);

  // Drag anywhere & throw state
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const [throwStyle, setThrowStyle] = useState({});
  // Immediate synchronous base64 receipt image generation so PaperCrumple NEVER receives empty string
  const [receiptImage, setReceiptImage] = useState(() => {
    return generateReceiptImage({
      storeName,
      location,
      orderPrefix,
      orderNum: 28,
      currentDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      currentTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
      items: RECEIPT_BATCHES[0].items,
      subtotal: RECEIPT_BATCHES[0].subtotal,
      tax: RECEIPT_BATCHES[0].tax,
      total: RECEIPT_BATCHES[0].total,
      barcode: RECEIPT_BATCHES[0].barcode
    });
  });
  const [resetKey, setResetKey] = useState(0);

  const containerRef = useRef(null);
  const hasTriggeredMount = useRef(false);
  const hasThrownRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ vx: 0, vy: 0, lastX: 0, lastY: 0, lastT: 0 });

  // Scaled dimensions
  const TOTAL_STEPS = 16;
  const STEP_INTERVAL = Math.round(130 / speed); // ~130ms per step => ~2.08s total print
  const TOTAL_PAPER_HEIGHT = 385;
  const VISIBLE_MARGIN_AT_REST = 16;
  const TRAVEL_DISTANCE = TOTAL_PAPER_HEIGHT - VISIBLE_MARGIN_AT_REST;

  const currentBatch = RECEIPT_BATCHES[batchIdx % RECEIPT_BATCHES.length];

  // Live timestamp
  const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  // Generate crisp receipt image with authentic top & bottom transparent zigzag teeth
  useEffect(() => {
    const dataUrl = generateReceiptImage({
      storeName,
      location,
      orderPrefix,
      orderNum,
      currentDate,
      currentTime,
      items: currentBatch.items,
      subtotal: currentBatch.subtotal,
      tax: currentBatch.tax,
      total: currentBatch.total,
      barcode: currentBatch.barcode
    });
    setReceiptImage(dataUrl);
  }, [batchIdx, orderNum, storeName, location, orderPrefix, currentDate, currentTime]);

  // 1. Trigger print on mount/refresh AND when entering viewport
  useEffect(() => {
    if (!hasTriggeredMount.current) {
      hasTriggeredMount.current = true;
      setStatus('feeding');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatus((prev) => (prev === 'tearing' ? 'feeding' : prev));
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Progressive thermal feed: step-by-step mechanical motor ratchet
  useEffect(() => {
    if (status === 'feeding') {
      setCurrentStep(0);
      setIsThrowing(false);
      setIsDragging(false);
      setDragPos({ x: 0, y: 0 });
      setThrowStyle({});
      hasThrownRef.current = false;

      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        setCurrentStep(step);
        if (step >= TOTAL_STEPS) {
          clearInterval(interval);
          setStatus('ready');
          if (onPrinted) onPrinted();
        }
      }, STEP_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [status, speed, orderNum]);

  // Track pointer up globally so tear timeout knows if pointer is still held
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isPointerDownRef.current = false;
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, []);

  // 3. User selects / clicks paper -> TEAR with bottom zigzag visibly lifting
  const handleTearAndCrumple = (e) => {
    if (status !== 'ready' || !tearable || isThrowing) return;
    setStatus('tearing');
    if (onTear) onTear();

    isPointerDownRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;

    // Rips off cutter blade -> enters 3D PaperCrumple
    setTimeout(() => {
      setStatus('crumple');
      setResetKey((k) => k + 1);
      // If user is actively holding/dragging, attach continuous drag
      if (isPointerDownRef.current) {
        setIsDragging(true);
        dragOriginRef.current = { x: startX, y: startY };
        velocityRef.current = { vx: 0, vy: 0, lastX: startX, lastY: startY, lastT: performance.now() };
      }
    }, 300);
  };

  // 4. Pointer down on crumpled ball (if grabbed after initial tear)
  const handleCrumplePointerDown = (e) => {
    if (isThrowing || hasThrownRef.current) return;
    setIsDragging(true);
    dragOriginRef.current = { x: e.clientX - dragPos.x, y: e.clientY - dragPos.y };
    velocityRef.current = { vx: 0, vy: 0, lastX: e.clientX, lastY: e.clientY, lastT: performance.now() };
  };

  // 5. Automatic throw away when user releases their hand from cursor ("keeping out hand in cursor")
  const handleThrowAway = (info) => {
    if (isThrowing || hasThrownRef.current) return;
    hasThrownRef.current = true;
    setIsThrowing(true);
    setIsDragging(false);

    const vx = info?.vx || info?.speedX || 0;
    const vy = info?.vy || info?.speedY || 0;
    const speed = Math.hypot(vx, vy);

    let dirX = 1;
    let dirY = -1;
    if (speed > 1.2) {
      dirX = vx / speed;
      dirY = vy / speed;
    } else {
      dirX = dragPos.x >= 0 ? 1.2 : -1.2;
      dirY = -0.9;
    }

    const throwDist = 800;
    const targetX = dragPos.x + dirX * throwDist;
    const targetY = dragPos.y + dirY * throwDist;
    const rot = (dirX >= 0 ? 1 : -1) * (540 + Math.random() * 360);

    setThrowStyle({
      transform: `translate3d(${targetX}px, ${targetY}px, 0) scale(0.04) rotate(${rot}deg)`,
      opacity: 0,
      transition: 'transform 0.52s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.52s ease',
      pointerEvents: 'none'
    });

    // After toss finishes, feed next bill from slot
    setTimeout(() => {
      setBatchIdx((b) => (b + 1) % RECEIPT_BATCHES.length);
      setOrderNum((n) => n + 1);
      setDragPos({ x: 0, y: 0 });
      setIsThrowing(false);
      setThrowStyle({});
      hasThrownRef.current = false;
      setStatus('feeding');
    }, 550);
  };

  // 6. Global Window Pointer Listeners: Drag ANYWHERE on page, Throw on release
  useEffect(() => {
    if (status !== 'crumple') return;

    const handleWindowPointerMove = (e) => {
      if (!isDragging || isThrowing) return;
      const x = e.clientX - dragOriginRef.current.x;
      const y = e.clientY - dragOriginRef.current.y;
      setDragPos({ x, y });

      const now = performance.now();
      const dt = Math.max(8, now - velocityRef.current.lastT);
      const vx = ((e.clientX - velocityRef.current.lastX) / dt) * 16;
      const vy = ((e.clientY - velocityRef.current.lastY) / dt) * 16;
      velocityRef.current = { vx, vy, lastX: e.clientX, lastY: e.clientY, lastT: now };
    };

    const handleWindowPointerUp = () => {
      if (!isDragging || isThrowing) return;
      setIsDragging(false);
      // User releases cursor / lifts hand ("keeping out hand in cursor") -> automatically throw away!
      handleThrowAway(velocityRef.current);
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, [status, isDragging, isThrowing, dragPos]);

  // Calculate translation: step 0 = 369px down (inside machine), step 16 = 0px
  const progressRatio = currentStep / TOTAL_STEPS;
  const currentTranslateY = (1 - progressRatio) * TRAVEL_DISTANCE;

  return (
    <div 
      ref={containerRef}
      className={`receipt-printer-root ${className} ${
        status === 'crumple' ? 'receipt-printer--crumple-mode' : ''
      } ${status === 'tearing' ? 'receipt-printer--tearing' : ''}`}
    >
      
      {/* ======================================================================= */}
      {/* 1. PAPER FEED STAGE (Feeding & Ready) OR 3D PAPERC RUMPLE ARENA (Torn)  */}
      {/* ======================================================================= */}
      
      {status === 'crumple' ? (
        /* 3D WebGL PaperCrumple: Can be dragged anywhere on page, throws on releasing hand */
        <div 
          className="receipt-crumple-stage"
          onPointerDown={handleCrumplePointerDown}
          style={{
            transform: isThrowing 
              ? throwStyle.transform 
              : `translate3d(${dragPos.x}px, ${dragPos.y}px, 0)`,
            opacity: isThrowing ? throwStyle.opacity : 1,
            transition: isThrowing ? throwStyle.transition : (isDragging ? 'none' : 'transform 0.15s ease-out'),
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <PaperCrumple
            src={receiptImage}
            alt="Torn Dikshi Technologies Thermal Receipt with Zigzag Teeth"
            width={280}
            height={380}
            sceneHeight={420}
            releaseBehavior="stay"
            initialCrumple={true}
            crumpleAmount={0.92}
            crumpleDuration={0.35}
            releaseDuration={0.35}
            foldCount={8}
            foldSharpness={0.7}
            wrinkleDepth={0.85}
            creaseStrength={0.28}
            paperColor="#f6f4ee"
            paperTexture={0.12}
            draggable={false}
            returnToOrigin={false}
            resetKey={resetKey}
            onDragThrow={handleThrowAway}
            className="receipt-paper-crumple-instance"
          />
        </div>
      ) : (
        /* Regular Thermal Printing Feed Stage */
        <div className={`receipt-feed-stage ${status === 'tearing' ? 'receipt-feed-stage--tearing' : ''}`}>
          
          {/* Shadow Wrapper: traces the exact clip-path zigzag cutter teeth */}
          <div 
            onPointerDown={handleTearAndCrumple}
            title={status === 'ready' ? "Grab paper to tear & crumple — Drag anywhere and release to throw" : "Thermal printer printing..."}
            className={`receipt-paper-shadow-wrapper ${
              status === 'tearing' ? 'receipt-paper--tearing' : ''
            }`}
            style={{
              transform: status === 'tearing' ? undefined : `translateY(${currentTranslateY.toFixed(1)}px)`,
              cursor: status === 'ready' ? 'grab' : 'default'
            }}
          >
            
            {/* The Actual Bill Paper with Authentic Top & Bottom Zigzag Cutter Teeth */}
            <div className="receipt-paper-body">
              
              {/* Top clearance for top zigzag teeth */}
              <div className="h-3 w-full" />

              {/* Receipt Body Content */}
              <div className="px-5 pt-1.5 pb-2 font-mono text-[12px] leading-tight text-[#121316] select-none">
                
                {/* Header: Brand Logo & Store Name */}
                <div className="text-center mb-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <img 
                      src="/assets/dikshi-logo.png" 
                      alt="Dikshi Technologies Logo" 
                      className="w-5 h-5 rounded-full object-contain" 
                    />
                    <h4 className="font-extrabold text-[13.5px] tracking-wider text-[#121316] uppercase font-display">
                      {storeName}
                    </h4>
                  </div>
                  <p className="text-[10.5px] text-[#6b6d76] tracking-tight">{location}</p>
                </div>

                {/* Order Number & Timestamp */}
                <div className="flex justify-between items-center text-[11px] text-[#4b4d54] mb-0.5">
                  <span className="font-semibold">ORDER {orderPrefix}{orderNum}</span>
                  <span>{currentTime}</span>
                </div>
                <div className="text-[10.5px] text-[#6b6d76] mb-2">
                  {currentDate}
                </div>

                {/* Dotted Line Divider */}
                <div className="border-t border-dashed border-[#cbc9c2] my-2" />

                {/* Line Items */}
                <div className="space-y-1.5 my-2">
                  {currentBatch.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-[11.5px]">
                      <span className="truncate pr-2 text-[#32343b]">{item.name}</span>
                      <span className="font-bold text-[#121316] flex-shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Dotted Line Divider */}
                <div className="border-t border-dashed border-[#cbc9c2] my-2" />

                {/* Totals Summary */}
                <div className="space-y-1 text-[11.5px]">
                  <div className="flex justify-between text-[#6b6d76]">
                    <span>Subtotal</span>
                    <span>{currentBatch.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[#6b6d76]">
                    <span>Tax (5% GST)</span>
                    <span>{currentBatch.tax}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[13px] pt-1 text-[#121316]">
                    <span>TOTAL</span>
                    <span className="text-[14.5px] font-black">{currentBatch.total}</span>
                  </div>
                </div>

                {/* Authentic Barcode */}
                <div className="mt-3 text-center">
                  <div className="receipt-barcode">
                    {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 2, 4, 1, 2, 3, 2, 1, 3, 1, 2].map((w, i) => (
                      <span 
                        key={i} 
                        className="receipt-barcode-bar" 
                        style={{ width: `${w}px`, opacity: i % 4 === 0 ? 0.85 : 1 }} 
                      />
                    ))}
                  </div>
                  <span className="text-[9.5px] tracking-widest text-[#71737e] block mt-1 font-mono">
                    {currentBatch.barcode}
                  </span>
                </div>

                {/* Cordial Footer Message */}
                <div className="text-center text-[10.5px] text-[#6b6d76] mt-2">
                  Thank you. Visit again.
                </div>

                {/* Perforated tear guideline above bottom teeth */}
                <div className="border-b border-dashed border-[#cbc9c2] mt-2.5 mb-1" />

              </div>

              {/* Bottom clearance for bottom zigzag teeth */}
              <div className="h-3 w-full" />

            </div>

          </div>

        </div>
      )}

      {/* ======================================================================= */}
      {/* 2. THE SLEEK MINIMAL PRINTER CHASSIS (Sits on top of the slot)         */}
      {/* ======================================================================= */}
      <div className="receipt-printer-chassis">
        {/* Slit Mouth from which paper emerges, showing cutter blade serration */}
        <div className="receipt-printer-slot">
          <span className="receipt-slot-cutter-teeth" />
        </div>

        {/* Status LED: Blinking amber when printing, solid emerald green when ready */}
        <span 
          className={`receipt-printer-led ${
            status === 'feeding' ? 'receipt-printer-led--busy' : ''
          }`} 
          title={status === 'feeding' ? 'Printing line by line...' : 'Receipt Ready — Grab to tear & crumple, drag anywhere and release to throw'}
        />
      </div>

    </div>
  );
}
