"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./aboutCard.module.css";
import AboutContents from "./aboutContents";

const MAX_OFFSET = 150;
const SIZE_THRESHOLD = 0.8; // 80% of the screen height

export default function AboutCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [disableScroll, setDisableScroll] = useState(true);
  const [offsetY, setOffsetY] = useState(MAX_OFFSET);
  const [minOffset, setMinOffset] = useState(0); // can't "scroll" up more than this amount

  useEffect(() => {
    const checkSize = () => {
      const container = cardRef.current;
      if (!container) return;

      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      setDisableScroll(containerHeight < windowHeight * SIZE_THRESHOLD);
      setMinOffset(-containerHeight / 4);
    };

    checkSize();
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault(); // prevent page from scrolling
      const delta = event.deltaY;

      setOffsetY((prev) => {
        console.log("prev", prev, "delta", delta);
        let next = prev + delta; // subtract to scroll downward
        next = Math.max(minOffset, Math.min(MAX_OFFSET, next));
        return next;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [minOffset]);

  return (
    <div
      ref={cardRef}
      className={`h-fit shadow-md ${styles.cardContainer}`}
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
      <AboutContents />
    </div>
  );
}
