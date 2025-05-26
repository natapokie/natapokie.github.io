"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

type ScrollWrapperProps = {
  children: ReactNode;
  className?: string;
  maxOffset?: number;
  sizeThreshold?: number; // e.g., 0.8 for 80% of viewport height
};

export default function ScrollWrapper({
  children,
  className = "",
  maxOffset = 250,
  sizeThreshold = 0.8,
}: ScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [disableScroll, setDisableScroll] = useState(true);
  const [offsetY, setOffsetY] = useState(maxOffset);
  const [minOffset, setMinOffset] = useState(0);

  useEffect(() => {
    const checkSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

        // console.log(containerHeight, windowHeight, sizeThreshold);

      setDisableScroll(containerHeight < windowHeight * sizeThreshold);
      setMinOffset(-containerHeight / 3);
    };

    checkSize();
  }, [sizeThreshold]);

  useEffect(() => {
    console.log('disableScroll', disableScroll);
    console.log('minOffset', minOffset);
    console.log('maxOffset', maxOffset);

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      const delta = event.deltaY;

      setOffsetY((prev) => {
        let next = prev + delta;
        next = Math.max(minOffset, Math.min(maxOffset, next));
        return next;
      });
    };

    const container = containerRef.current;
    if (!container || disableScroll) return;

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [minOffset, maxOffset, disableScroll]);

  useEffect(() => {
    // Re-check size on window resize 
    console.log('offsetY changed', offsetY); 
  }, [offsetY])

  return (
    <div
      ref={containerRef}
      className={className}
      style={
        disableScroll
          ? {
              position: "relative",
              top: "50%",
              transform: `translateY(-50%)`,
              transformOrigin: "center",
            }
          : {
              transform: `translateY(${offsetY}px)`,
            }
      }
    >
      {children}
    </div>
  );
}
