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
import eyeRightClosed from "../../../public/avatar/eye-r-close.svg";
import eyeLeftClosed from "../../../public/avatar/eye-l-close.svg";
import eyeRightMidClosed from "../../../public/avatar/eye-r-mid.svg";
import eyeLeftMidClosed from "../../../public/avatar/eye-l-mid.svg";
import eyelashRightMidClosed from "../../../public/avatar/eyelash-r-mid.svg";
import eyelashLeftMidClosed from "../../../public/avatar/eyelash-l-mid.svg";

import { useEffect, useRef, useState } from "react";

interface EyeProps {
  img: StaticImageData;
  style: string;
}

const EYE_STATE = {
  OPEN: 0,
  CLOSING: 1,
  CLOSED: 2,
};

const EYE_RIGHT: EyeProps[] = [
  {
    img: eyeRightOpen,
    style: styles.eyeRightOpen,
  },
  {
    img: eyeRightMidClosed,
    style: styles.eyeRightMidClosed,
  },
  {
    img: eyeRightClosed,
    style: styles.eyeRightClosed,
  },
];

const EYE_LEFT: EyeProps[] = [
  {
    img: eyeLeftOpen,
    style: styles.eyeLeftOpen,
  },
  {
    img: eyeLeftMidClosed,
    style: styles.eyeLeftMidClosed,
  },
  {
    img: eyeLeftClosed,
    style: styles.eyeLeftClosed,
  },
];

const EYELASH_RIGHT: EyeProps[] = [
  {
    img: eyelashRightOpen,
    style: styles.eyelashRightOpen,
  },
  {
    img: eyelashRightMidClosed,
    style: styles.eyelashRightMidClosed,
  },
];

const EYELASH_LEFT: EyeProps[] = [
  {
    img: eyelashLeftOpen,
    style: styles.eyelashLeftOpen,
  },
  {
    img: eyelashLeftMidClosed,
    style: styles.eyelashLeftMidClosed,
  },
];

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
            irisImg={iris}
            irisClass={styles.irisLeft}
            eyeImages={EYE_LEFT}
            eyeLashImages={EYELASH_LEFT}
          />
        </div>
        <div className="absolute top-[255.05px] left-[377.98px]">
          <Eye
            irisImg={iris}
            irisClass={styles.irisRight}
            eyeImages={EYE_RIGHT}
            eyeLashImages={EYELASH_RIGHT}
          />
        </div>
      </div>
    </>
  );
};

const Eye = ({
  irisImg,
  irisClass,
  eyeImages,
  eyeLashImages,
}: {
  irisImg: StaticImageData;
  irisClass: string;
  eyeImages: EyeProps[];
  eyeLashImages: EyeProps[];
}) => {
  const eyeRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: "0px", y: "0px" });
  const [eyeState, setEyeState] = useState(0); // this is the frame in the array

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (eyeState === EYE_STATE.OPEN) {
      timeoutId = setTimeout(() => {
        setEyeState(eyeState + 1);
      }, 5000);
    } else if (eyeState === EYE_STATE.CLOSED) {
      timeoutId = setTimeout(() => {
        setEyeState(0);
      }, 300);
    } else {
      timeoutId = setTimeout(() => {
        setEyeState(eyeState + 1);
      }, 50);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [eyeState]);

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
      {eyeImages.map((eye, index) => (
        <Image
          key={index}
          src={eye.img}
          alt="eye"
          className={`absolute ${eyeImages[eyeState].style}`}
          style={{ display: eyeState === index ? "unset" : "none" }}
        />
      ))}
      <Image
        src={irisImg}
        alt="iris"
        className={`absolute ${irisClass}`}
        style={{
          transform: `translate(${position.x}, ${position.y})`,
          display: eyeState !== EYE_STATE.CLOSED ? "unset" : "none",
        }}
      />
      {eyeLashImages.map((eyeLash, index) => (
        <Image
          key={index}
          src={eyeLash.img}
          alt="eyelash"
          className={`absolute ${eyeLash.style}`}
          style={{ display: eyeState === index ? "unset" : "none" }}
        />
      ))}
    </div>
  );
};

export const calculateIrisOffset = (
  mouseX: number,
  mouseY: number,
  eyeRef: React.RefObject<HTMLDivElement>,
  maxOffset: { x: number; y: number }
) => {
  if (!eyeRef.current) return { x: "0px", y: "0px" };

  // relative to center of eye
  const rect = eyeRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // clamp mouse position to prevent iris lagging behind
  const clampMouseX = Math.min(1000, Math.max(mouseX, 450));
  const clampMouseY = Math.min(630, Math.max(mouseY, 340));

  const dx = clampMouseX - centerX;
  const dy = clampMouseY - centerY;

  // normalize and more clamp
  const clamp = (value: number, max: number) =>
    Math.max(-max, Math.min(value / 20, max));

  return {
    x: `${clamp(dx, maxOffset.x)}px`,
    y: `${clamp(dy, maxOffset.y)}px`,
  };
};
