"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./textbox.module.css";

import textBox from "@/public/textbox/container.svg";
import arrow from "@/public/textbox/chat_arrow.svg";

interface TextBoxProps {
  name?: string;
  value?: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  const [currentText, setCurrentText] = useState<string>(value?.[0] ?? "");

  return (
    <>
      <div className="relative w-[869px] h-[246.23px]">
        {/* <div className="relative"> */}
        <Image
          src={textBox}
          alt="textbox"
          className={`${styles.textBox}`}
        ></Image>
        <div className={styles.nameBox}>{name ?? "? ? ?"}</div>
        <Image src={arrow} alt="arrow" className={styles.arrow}></Image>
        <div className={styles.text}>
          <Typewriter text={currentText} speed={50} />
        </div>
      </div>
    </>
    // <input
    //   type="text"
    //   value={value}
    //   onChange={handleChange}
    //   placeholder={placeholder}
    //   className="textbox"
    // />
  );
};

const Typewriter = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(text.charAt(index)); // Reset displayed text

    const interval = setInterval(() => {
      console.log(text.charAt(index));
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default TextBox;
