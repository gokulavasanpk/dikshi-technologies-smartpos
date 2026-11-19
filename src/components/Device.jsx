import React, { useState, useRef, useEffect } from 'react';
import './Device.css';

/**
 * React Bits Pro - Device Component
 * A studio-lit 3D phone mockup that frames any image or custom content.
 * Docs: https://pro.reactbits.dev/docs/components/device
 */
export default function Device({
  image,
  alt = 'Device screen',
  children,
  finish = 'titanium',
  frameColor,
  screenColor = '#000000',
  shadowColor = '#0b0c16',
  orientation = 'portrait',
  width,
  scale = 0.5,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  tilt = 12,
  float = 1,
  lift = 1,
  island = true,
  bezel = 11,
  reflection = 1,
  isWobbling = false,
  onHoverChange,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const bodyRef = useRef(null);
  const reflectionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Compute dimensions
  // Standard 35.6rem (570px) wide at scale=1
  const baseWidth = 570;
  const resolvedWidth = width !== undefined
    ? (typeof width === 'number' ? `${width}px` : width)
    : `${baseWidth * scale}px`;

  // Aspect ratio: portrait ~ 19.5:9 (~0.4615) -> 300px width × 650px height
  const isPortrait = orientation === 'portrait';
  const aspectRatio = isPortrait ? '9 / 19.5' : '19.5 / 9';

  const handlePointerMove = (e) => {
    if (!containerRef.current || tilt === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / (rect.width || 1);
    const py = y / (rect.height || 1);

    const prx = (py - 0.5) * -tilt;
    const pry = (px - 0.5) * tilt;

    if (bodyRef.current) {
      bodyRef.current.style.transform = `translate3d(0, ${-16 * lift}px, ${30 * lift}px) rotateX(${(rotateX + prx).toFixed(2)}deg) rotateY(${(rotateY + pry).toFixed(2)}deg) rotateZ(${rotateZ}deg)`;
    }
    if (reflectionRef.current && reflection > 0) {
      reflectionRef.current.style.background = `linear-gradient(${(125 + pry * 2).toFixed(1)}deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)`;
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (onHoverChange) onHoverChange(false);
    if (bodyRef.current) {
      bodyRef.current.style.transform = `translate3d(0, 0px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    }
    if (reflectionRef.current && reflection > 0) {
      reflectionRef.current.style.background = 'linear-gradient(125deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)';
    }
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    if (onHoverChange) onHoverChange(true);
  };

  // Custom frame color override if provided
  const frameStyle = frameColor ? {
    '--frame-bg': frameColor,
    '--frame-border': frameColor,
    '--btn-color': frameColor
  } : {};

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      className={`device-container ${className} ${isWobbling && !isHovered ? 'device-container--wobble' : ''}`}
      style={{
        width: resolvedWidth,
        ...style
      }}
    >
      {/* 3D Contact Shadow on Page */}
      <div
        className="device-shadow"
        style={{
          background: shadowColor,
          opacity: isHovered ? 0.35 : 0.55,
          transform: `scale(${isHovered ? 1.08 : 0.95}) translateY(${isHovered ? 12 : 0}px)`
        }}
      />

      {/* Main 3D Device Chassis */}
      <div
        ref={bodyRef}
        className={`device-body device-finish--${finish} ${float > 0 && !isHovered && !isWobbling ? 'device-body--floating' : ''} ${isWobbling && !isHovered ? 'device-body--wobble' : ''}`}
        style={{
          width: '100%',
          aspectRatio: aspectRatio,
          transform: `translate3d(0, 0px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
          '--dev-rx': `${rotateX}deg`,
          '--dev-ry': `${rotateY}deg`,
          '--dev-rz': `${rotateZ}deg`,
          willChange: 'transform',
          ...frameStyle
        }}
      >
        {/* Hardware Buttons - Left Side (Action + Volume Up/Down) */}
        {isPortrait && (
          <div className="absolute -left-[3px] top-[18%] bottom-[50%] flex flex-col justify-between w-[3px] pointer-events-none z-10">
            {/* Action button */}
            <span className="w-full h-7 rounded-l-sm bg-[var(--btn-color)] shadow-[-1px_0_2px_rgba(0,0,0,0.5)] border-l border-y border-white/20" />
            {/* Volume Up */}
            <span className="w-full h-12 rounded-l-sm bg-[var(--btn-color)] shadow-[-1px_0_2px_rgba(0,0,0,0.5)] border-l border-y border-white/20" />
            {/* Volume Down */}
            <span className="w-full h-12 rounded-l-sm bg-[var(--btn-color)] shadow-[-1px_0_2px_rgba(0,0,0,0.5)] border-l border-y border-white/20" />
          </div>
        )}

        {/* Hardware Buttons - Right Side (Side Power Button) */}
        {isPortrait && (
          <div className="absolute -right-[3px] top-[24%] w-[3px] pointer-events-none z-10">
            <span className="block w-full h-16 rounded-r-sm bg-[var(--btn-color)] shadow-[1px_0_2px_rgba(0,0,0,0.5)] border-r border-y border-white/20" />
          </div>
        )}

        {/* Outer Metallic Bezel Case */}
        <div
          className="relative w-full h-full rounded-[48px] p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_0_1px_var(--frame-border),inset_0_1px_2px_var(--frame-highlight),inset_0_-2px_4px_var(--frame-shadow)]"
          style={{ background: 'var(--frame-bg)' }}
        >
          {/* Inner Black Bezel Wall */}
          <div
            className="relative w-full h-full rounded-[45px] overflow-hidden bg-black"
            style={{
              padding: `${bezel}px`,
              boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)'
            }}
          >
            {/* Dynamic Island Notch */}
            {island && isPortrait && (
              <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center justify-between px-3 py-1 bg-black rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.8)] border border-white/10 w-[100px] h-[26px]">
                {/* Camera lens */}
                <div className="w-3 h-3 rounded-full bg-[#111318] border border-[#232733] flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-[#053d6e] opacity-80" />
                </div>
                {/* Sensor dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#101216] border border-[#20222a]" />
              </div>
            )}

            {/* Glass Glare Reflection Sheen following pointer */}
            {reflection > 0 && (
              <div
                ref={reflectionRef}
                className="device-reflection"
                style={{
                  opacity: isHovered ? 0.35 * reflection : 0.18 * reflection,
                  background: 'linear-gradient(125deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)'
                }}
              />
            )}

            {/* Inner Screen Display (Children or Image) */}
            <div
              className="relative w-full h-full rounded-[36px] overflow-hidden"
              style={{ backgroundColor: screenColor }}
            >
              {children ? (
                children
              ) : image ? (
                <img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-cover object-top select-none pointer-events-none"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
                  <span className="text-4xl mb-2">📱</span>
                  <p className="font-bold text-sm">Dikshi SmartPOS</p>
                  <span className="text-xs text-slate-400">Mobile Edition</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
