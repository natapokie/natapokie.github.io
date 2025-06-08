"use client";

import Image, { StaticImageData } from "next/image";
import styles from "./avatar.module.css";
import { useEffect, useRef, useState } from "react";
import {IAvatarEye, IAvatarHair} from "@/lib/types/avatar";
import {
  EyeLeft,
  EyeRight,
  EyeState,
  Hairstyles,
  Iris,
  MouthStyles,
  Neck,
  ShirtStyles,
  Skin,
} from "@/lib/static/avatar";

export const AvatarHandler = () => {
  // handle the avatar rendering & the appearance changing
  // const [appearance, setAppearance] = useState<number>(3);

  return(
      <>
        <div className="w-full h-full flex justify-between items-center py-[80px] px-[20px] md:py-[60px] md:px-0">
        <Avatar></Avatar>
        </div>
      </>
  )
}

const Avatar = () => {
  const [hair, setHair] = useState<IAvatarHair>(Hairstyles[3]);
  const [mouth, setMouth] = useState<StaticImageData>(MouthStyles.smile);
  const [shirt, setShirt] = useState<StaticImageData>(ShirtStyles[0]);

  return (
    <>

      <div className="flex justify-center items-center relative origin-center w-full h-full max-h-[430px] md:max-h-[650px]">
        <Image src={hair.hairBack} alt="hair-back" className={styles.base}></Image>
        <Image src={Neck} alt="nexk" className={styles.base}></Image>
        <Image src={shirt} alt="shirt" className={styles.base}></Image>
        {hair?.hairMiddle && (
            <Image src={hair.hairMiddle} alt="skin" className={styles.base}></Image>
        )}
        <Image src={Skin} alt="skin" className={styles.base}></Image>
        <Image src={mouth} alt="smile" className={styles.base}></Image>
        <Image src={mouth} alt="smile" className={styles.base}></Image>

        <Eye irisImg={Iris.left} irisClass="iris-style" eyeMap={EyeLeft} />
        <Eye irisImg={Iris.right} irisClass="iris-style" eyeMap={EyeRight} />

        <Image src={hair.hairSide} alt="hair-side" className={styles.base}></Image>
        <Image
          src={hair.hairFront}
          alt="hair-front"
          className={styles.base}
        ></Image>

      </div>
    </>
  );
};

interface EyeProps {
  irisImg: StaticImageData;
  irisClass: string;
  eyeMap: Record<EyeState, IAvatarEye>;
}

const Eye = ({ irisImg, irisClass, eyeMap }: EyeProps) => {
  const eyeRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: "0px", y: "0px" });
  const [eyeState, setEyeState] = useState<EyeState>(EyeState.OPEN);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (eyeState === EyeState.OPEN) {
      timeoutId = setTimeout(() => setEyeState(EyeState.CLOSING), 5000);
    } else if (eyeState === EyeState.CLOSING) {
      timeoutId = setTimeout(() => setEyeState(EyeState.CLOSED), 50);
    } else {
      timeoutId = setTimeout(() => setEyeState(EyeState.OPEN), 300);
    }

    return () => clearTimeout(timeoutId);
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

  const { base, eyelash } = eyeMap[eyeState];

  return (
      <div ref={eyeRef}>
        <Image
            src={base}
            alt="eye"
            className={`${styles.base}`}
        />
        {eyeState !== EyeState.CLOSED && (
            <Image
                src={irisImg}
                alt="iris"
                className={`${styles.base}`}
                style={{ transform: `translate(${position.x}, ${position.y})` }}
            />
        )}
        {eyelash && (
            <Image
                src={eyelash}
                alt="eyelash"
                className={`${styles.base}`}
            />
        )}
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
