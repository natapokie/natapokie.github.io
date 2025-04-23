"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TransitionMask({
  duration = 4000,
  fill = "#b65854",
  onBegin,
  onEnd,
}: {
  duration?: number;
  fill?: string;
  onBegin?: () => void;
  onEnd?: () => void;
}) {
  const [radius, setRadius] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [readyToRender, setReadyToRender] = useState(false);
  const motionRef = useRef<SVGAnimateMotionElement | null>(null);
  
  useEffect(() => {
    const updateSize = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const maxRadius = Math.max(viewport.width, viewport.height);
  const cx = viewport.width / 2;
  const cy = viewport.height / 2;

  useEffect(() => {
    const el = motionRef.current;
    if (!el || viewport.width === 0 || viewport.height === 0) return;

    const handleBegin = () => {
      onBegin?.();
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        const currentRadius = maxRadius * eased;

        setRadius(currentRadius);
        setReadyToRender(true);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log('animation complete')
          setRadius(maxRadius);
          onEnd?.();
        }
      };

      requestAnimationFrame(animate);
    };

    el.addEventListener("beginEvent", handleBegin);
    el.beginElement(); // Manually trigger

    return () => {
      el.removeEventListener("beginEvent", handleBegin);
    };
  }, [viewport, duration, maxRadius, onBegin, onEnd]);

  if (viewport.width === 0 || viewport.height === 0) return null;

  return (
    <svg
      className="fixed inset-0 w-screen h-screen z-50 pointer-events-none"
      viewBox={`0 0 ${viewport.width} ${viewport.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="circle-cutout">
          <rect width="100%" height="100%" fill="white" />
          <circle id="cutout" cx={cx} cy={cy} r={radius} fill="black" />
          <animateMotion
            ref={motionRef}
            href="#cutout"
            dur={`${duration}ms`}
            repeatCount="1"
            path="M0,0 L0,0"
            fill="freeze"
            begin="indefinite"
          />
        </mask>
      </defs>

      {readyToRender && (
        <rect
          width="100%"
          height="100%"
          fill={fill}
          mask="url(#circle-cutout)"
        />
      )}
    </svg>
  );
}
