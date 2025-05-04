"use client";

import {  useEffect, useRef, useState } from "react";
import styles from "./aboutCard.module.css";
import { AboutText } from "@/lib/static/about";

const MAX_OFFSET = 250;
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
      setMinOffset(-containerHeight / 3);
    };

    checkSize();
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault(); // prevent page from scrolling
      const delta = event.deltaY;

      setOffsetY((prev) => {
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
      className={`w-[70%] h-fit shadow-md ${styles.cardContainer}`}
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
      <div className="w-full h-[200px] bg-[var(--seashell)] color-[var(--liver)] flex justify-center items-center text-3xl font-bold pb-[50px]">
        <h1>About Me</h1>
      </div>
      <div
        className="absolute top-[150px] flex flex-row justify-center items-center"
        style={{ zIndex: 0 }}
      >
        {Array.from({ length: 10 }).map((e, index) => (
          <div
            key={index}
            className="w-[150px] h-[150px]  bg-[var(--champagne-pink)]"
            style={{ marginLeft: "-25px", borderRadius: "100px" }}
          ></div>
        ))}
      </div>
      <div
        className="w-full h-auto flex-1 bg-[var(--champagne-pink)] pt-[50px] pb-[80px] px-[80px]"
        style={{ zIndex: 1 }}
      >
        <div className="w-full h-[350px] flex flex-row justify-center items-start gap-x-[80px]">
          <div className="w-[350px] h-auto aspect-square rounded-[30px] border-[6px] border-white shadow-md overflow-hidden bg-[var(--champagne-pink)]">
            {/* <Image></Image> */}
          </div>
          <div className="flex flex-col flex-1 h-full w-full">
            <div
              className="w-full bg-[var(--seashell)] py-[18px] px-[50px] text-center mb-[25px]"
              style={{ borderRadius: "100px" }}
            >
              <h2>Hello! I'm Natalie! 👋</h2>
            </div>
            <p>{AboutText}</p>
            <div
              className="w-full h-[5px] bg-white mt-auto"
              style={{ borderRadius: "50px" }}
            ></div>
          </div>
        </div>
        {/* ADD STUFF */}
      </div>
    </div>
  );
}
