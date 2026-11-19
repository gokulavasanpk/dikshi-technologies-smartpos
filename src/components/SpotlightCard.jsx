import React, { useRef, useState } from 'react';

/**
 * React Bits - SpotlightCard (reactbits.dev/components/spotlight-card)
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(4, 86, 221, 0.18)",
  spotlightSize = 300
}) {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Radial Spotlight Light */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[inherit] z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle ${spotlightSize}px at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 80%)`
        }}
      />
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}
