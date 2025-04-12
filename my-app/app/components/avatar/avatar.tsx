"use client";

import Image, { StaticImageData } from "next/image";
import styles from "./avatar.module.css";
import base from "../../../public/avatar/base.svg";
import shirt from "../../../public/avatar/shirt.svg";
import hair1 from "../../../public/avatar/hair-1.svg";
import bangs1 from "../../../public/avatar/bangs-1.svg";
import sides from "../../../public/avatar/side.svg";
import eyeRightOpen from "../../../public/avatar/eye-r-open.svg";
import eyeLeftOpen from "../../../public/avatar/eye-l-open.svg";
import smile from "../../../public/avatar/smile.svg";
import iris from "../../../public/avatar/iris.svg";
import eyelashRightOpen from "../../../public/avatar/eyelash-r-open.svg";
import eyelashLeftOpen from "../../../public/avatar/eyelash-l-open.svg";
import { useEffect, useRef, useState } from "react";

export const Avatar = () => {
  return (
    <>
      <div className="relative origin-center w-[674px] h-[1021.6px]">
        <Image
          src={hair1}
          alt="hair"
          className={`absolute z-[-1] ${styles.hair1}`}
        ></Image>
        <Image
          src={base}
          alt="base"
          className={`absolute ${styles.base}`}
        ></Image>

        <Image
          src={shirt}
          alt="shirt"
          className={`absolute ${styles.shirt}`}
        ></Image>
        <Image
          src={sides}
          alt="sides"
          className={`absolute ${styles.sides}`}
        ></Image>
        <Image
          src={bangs1}
          alt="bangs"
          className={`absolute ${styles.bangs1}`}
        ></Image>
        <Image
          src={smile}
          alt="smile"
          className={`absolute ${styles.smile}`}
        ></Image>

        <div className="absolute top-[254.4px] left-[94.18px]">
          <Eye
            eyeImg={eyeLeftOpen}
            eyeClass={styles.eyeLeftOpen}
            irisImg={iris}
            irisClass={styles.irisLeft}
            eyelashImg={eyelashLeftOpen}
            eyelashClass={styles.eyelashLeftOpen}
          />
        </div>
        <div className="absolute top-[255.05px] left-[377.98px]">
          <Eye
            eyeImg={eyeRightOpen}
            eyeClass={styles.eyeRightOpen}
            irisImg={iris}
            irisClass={styles.irisRight}
            eyelashImg={eyelashRightOpen}
            eyelashClass={styles.eyelashRightOpen}
          />
        </div>
      </div>
    </>
  );
};

const Eye = ({
  eyeImg,
  eyeClass,
  irisImg,
  irisClass,
  eyelashImg,
  eyelashClass,
}: {
  eyeImg: StaticImageData;
  eyeClass: string;
  irisImg: StaticImageData;
  irisClass: string;
  eyelashImg: StaticImageData;
  eyelashClass: string;
}) => {
  const eyeRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: "0px", y: "0px" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offset = calculateIrisOffset(e.pageX, e.pageY, eyeRef, {
        x: 20,
        y: 10,
      });
      setPosition(offset);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={eyeRef} className="relative w-[162.92px] h-[234.58px]">
      <Image src={eyeImg} alt="eye" className={`absolute ${eyeClass}`} />
      <Image
        src={irisImg}
        alt="iris"
        className={`absolute ${irisClass}`}
        style={{ transform: `translate(${position.x}, ${position.y})` }}
      />
      <Image
        src={eyelashImg}
        alt="eyelash"
        className={`absolute ${eyelashClass}`}
      />
    </div>
  );
};

// utils.ts
export const calculateIrisOffset = (
  mouseX: number,
  mouseY: number,
  eyeRef: React.RefObject<HTMLDivElement>,
  maxOffset: { x: number; y: number }
) => {
  if (!eyeRef.current) return { x: "0px", y: "0px" };

  const rect = eyeRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = mouseX - centerX;
  const dy = mouseY - centerY;

  console.log(mouseX, mouseY);

  // Normalize and clamp
  const clamp = (value: number, max: number) =>
    Math.max(-max, Math.min(value / 20, max));

  return {
    x: `${clamp(dx, maxOffset.x)}px`,
    y: `${clamp(dy, maxOffset.y)}px`,
  };
};
