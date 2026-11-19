import React, { useRef, useEffect } from 'react';

/**
 * React Bits - PixelTrail (reactbits.dev/animations/pixel-trail)
 */
export default function PixelTrail({
  pixelSize = 20,
  fadeDuration = 550,
  trailColor = '4, 86, 221',
  children,
  className = ''
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const activePixelsRef = useRef(new Map());
  const animRunningRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');

    let cachedRect = container.getBoundingClientRect();
    const updateRect = () => {
      if (container) cachedRect = container.getBoundingClientRect();
    };

    const resize = () => {
      updateRect();
      canvas.width = cachedRect.width;
      canvas.height = cachedRect.height;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      let hasActive = false;

      activePixelsRef.current.forEach((item, key) => {
        const age = now - item.timestamp;
        if (age >= fadeDuration) {
          activePixelsRef.current.delete(key);
        } else {
          hasActive = true;
          const progress = age / fadeDuration;
          const alpha = (1 - progress) * 0.35;
          const [c, r] = key.split(',').map(Number);
          const x = c * pixelSize;
          const y = r * pixelSize;

          ctx.fillStyle = `rgba(${trailColor}, ${alpha.toFixed(3)})`;
          ctx.fillRect(x + 1, y + 1, pixelSize - 2, pixelSize - 2);
        }
      });

      if (hasActive) {
        requestAnimationFrame(loop);
      } else {
        animRunningRef.current = false;
      }
    };

    const handlePointerMove = (e) => {
      const x = e.clientX - cachedRect.left;
      const y = e.clientY - cachedRect.top;

      const col = Math.floor(x / pixelSize);
      const row = Math.floor(y / pixelSize);
      const now = performance.now();

      const radius = 1;
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          if (Math.abs(dx) + Math.abs(dy) <= 1) {
            const k = `${col + dx},${row + dy}`;
            activePixelsRef.current.set(k, { timestamp: now + Math.random() * 50 });
          }
        }
      }

      if (!animRunningRef.current) {
        animRunningRef.current = true;
        requestAnimationFrame(loop);
      }
    };

    container.addEventListener('pointerenter', updateRect, { passive: true });
    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateRect);
      container.removeEventListener('pointerenter', updateRect);
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, [pixelSize, fadeDuration, trailColor]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />
      {children}
    </div>
  );
}
