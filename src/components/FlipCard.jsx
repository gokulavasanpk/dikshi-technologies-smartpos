import React, { useState } from 'react';

/**
 * React Bits - FlipCard (reactbits.dev/micro/flip-card)
 */
export default function FlipCard({
  frontContent,
  backContent,
  className = "",
  flipOn = "click" // 'click' or 'hover'
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (flipOn === 'click') {
      setIsFlipped(prev => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (flipOn === 'hover') {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (flipOn === 'hover') {
      setIsFlipped(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`cursor-pointer perspective-[1000px] select-none ${className}`}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Face */}
        <div
          className="w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
