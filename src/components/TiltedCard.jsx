import React, { useRef, useState } from 'react';

/**
 * React Bits - TiltedCard (reactbits.dev/components/tilted-card)
 */
export default function TiltedCard({
  children,
  className = "",
  maxTilt = 8
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) - 0.5;
    const yPercent = (y / rect.height) - 0.5;

    const rotateX = -yPercent * maxTilt;
    const rotateY = xPercent * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.15s ease-out'
    });
  };

  const handlePointerLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}
