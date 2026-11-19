import React, { useState } from 'react';

/**
 * React Bits - BounceCards (reactbits.dev/components/bounce-cards)
 */
export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 320,
  animationDelay = 0.5,
  animationStagger = 0.08,
  transformStyles = [
    "rotate(10deg) translate(-110px, 16px)",
    "rotate(5deg) translate(-55px, -14px)",
    "rotate(-3deg) translate(0px, 10px)",
    "rotate(-8deg) translate(55px, -18px)",
    "rotate(12deg) translate(110px, 14px)"
  ]
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
        height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
        maxWidth: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((src, idx) => {
        const baseTransform = transformStyles[idx % transformStyles.length];
        const spreadMultiplier = isHovered ? 1.25 : 1;
        const scale = isHovered ? 1.05 : 1;

        return (
          <div
            key={idx}
            className="absolute rounded-xl overflow-hidden bg-white shadow-lg border-2 border-white transition-all duration-500 ease-out cursor-pointer hover:!scale-110 hover:!z-30 hover:shadow-2xl"
            style={{
              width: 'clamp(90px, 20vw, 130px)',
              height: 'clamp(115px, 25vw, 170px)',
              transform: `${baseTransform} scale(${scale * spreadMultiplier})`,
              zIndex: idx + 1,
              transitionDelay: `${idx * animationStagger}s`
            }}
          >
            <img
              src={src}
              alt={`Boutique preview ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
