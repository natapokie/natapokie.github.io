"use client";

import Image from "next/image";
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
          <EyeLeft></EyeLeft>
        </div>
        <div className="absolute top-[255.05px] left-[377.98px]">
          <EyeRight></EyeRight>
        </div>
      </div>
    </>
  );
};

const EyeLeft = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: "0px", y: "0px" });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();

        const x = Math.min((event.pageX - rect.left) / 30, 19.6) + "px";
        const y = Math.min((event.pageY - rect.top) / 30, 7.6) + "px";

        console.log("left", x, y);

        setPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Cleanup
    };
  }, []);

  return (
    <>
      <div ref={divRef} className="relative w-[162.92px] h-[234.58px]">
        <Image
          src={eyeLeftOpen}
          alt="eye-left"
          className={`absolute ${styles.eyeLeftOpen}`}
        ></Image>
        <Image
          src={iris}
          alt="iris-left"
          className={`absolute ${styles.irisLeft}`}
          style={{ transform: `translate(${position.x}, ${position.y})` }}
        ></Image>
        <Image
          src={eyelashLeftOpen}
          alt="eyelash-left"
          className={`absolute ${styles.eyelashLeftOpen}`}
        ></Image>
      </div>
    </>
  );
};

const EyeRight = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: "0px", y: "0px" });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();

        const x = Math.min((event.pageX - rect.left) / 30, -10) + "px";
        const y = Math.min((event.pageY - rect.top) / 30, 9.03) + "px";

        console.log("right", x, y);

        setPosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove); // Cleanup
    };
  }, []);

  return (
    <>
      <div ref={divRef} className="relative w-[162.92px] h-[234.58px]">
        <Image
          src={eyeRightOpen}
          alt="eye-right"
          className={`absolute ${styles.eyeRightOpen}`}
        ></Image>
        <Image
          src={iris}
          alt="iris-right"
          className={`absolute ${styles.irisRight}`}
          style={{ transform: `translate(${position.x}, ${position.y})` }}
        ></Image>
        <Image
          src={eyelashRightOpen}
          alt="eyelash-right"
          className={`absolute ${styles.eyelashRightOpen}`}
        ></Image>
      </div>
    </>
  );
};
