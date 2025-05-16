"use client";

import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    let raf: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let scale = 1;
    let currentScale = 1;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, [role="button"]');
      
      const handleMouseEnter = () => {
        scale = 1.5;
        setIsHovering(true);
      };
      const handleMouseLeave = () => {
        scale = 1;
        setIsHovering(false);
      };

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        // Ensure the default cursor is hidden on these elements
        if (element instanceof HTMLElement) {
          element.style.cursor = 'none';
        }
      });

      return () => {
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    const animate = () => {
      const easeFactor = 0.08; // Smooth movement
      const scaleEaseFactor = 0.15; // Smooth scaling
      
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      const dScale = scale - currentScale;
      
      currentX += dx * easeFactor;
      currentY += dy * easeFactor;
      currentScale += dScale * scaleEaseFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${currentScale})`;
      }

      raf = requestAnimationFrame(animate);
    };

    // Hide default cursor on the whole document
    document.documentElement.style.cursor = 'none';
    
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    const cleanupHover = addHoverListeners();
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cleanupHover();
      cancelAnimationFrame(raf);
      // Restore default cursor when component unmounts
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!isClient) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 md:opacity-100 will-change-transform"
      style={{
        mixBlendMode: 'difference'
      }}
    >
      <div 
        className="w-32 h-32 will-change-transform"
        style={{
          backgroundImage: `url('/pressplay.png')`,
          backgroundSize: '32px 32px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: 'invert(1)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'subpixel-antialiased'
        }}
      />
    </div>
  );
};

export { CustomCursor }; 