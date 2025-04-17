"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./textbox.module.css";

import textBox from "@/public/textbox/container.svg";
import arrow from "@/public/textbox/chat_arrow.svg";
import { on } from "events";

interface TextBoxProps {
  name?: string;
  value: string[];
  onChange?: (value: string) => void;
  placeholder?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  name,
  value = [],
  onChange,
  placeholder,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [displayArrow, setDisplayArrow] = useState<boolean>(false);
  const [completeTextImmediately, setCompleteTextImmediately] =
    useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        console.log("key pressed", displayArrow);
        // handle down arrow action here
        if (!displayArrow) {
          console.log("complete text immediately");
          setCompleteTextImmediately(true);
        } else {
          console.log("display the next blurb of text");
          onArrowClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayArrow]);

  const handleTextComplete = () => {
    console.log("handleTextComplete");
    setDisplayArrow(true);

    // reset complete immediately flag
    setCompleteTextImmediately(false);
  };

  const onArrowClick = () => {
    console.log("Arrow clicked");
    // switch to next text blurb
    setCurrentTextIndex((prevIndex) => prevIndex + 1);
    setDisplayArrow(false);
  };

  return (
    <>
      <div className="relative w-[869px] h-[246.23px]">
        <Image
          src={textBox}
          alt="textbox"
          className={`${styles.textBox}`}
        ></Image>
        <div className={styles.nameBox}>{name ?? "? ? ?"}</div>

        {displayArrow && (
          <Image
            src={arrow}
            alt="arrow"
            className={styles.arrow}
            onClick={onArrowClick}
          ></Image>
        )}

        <div className={styles.text}>
          <Typewriter
            text={value[currentTextIndex]}
            speed={50}
            completeImmediately={completeTextImmediately}
            onComplete={handleTextComplete}
          />
        </div>
      </div>
    </>
  );
};

const Typewriter = ({
  text = "",
  speed = 50,
  completeImmediately = false,
  onComplete,
}: {
  text: string;
  speed?: number;
  completeImmediately?: boolean;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    setDisplayedText(text.charAt(index));

    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => prev + text?.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(intervalRef.current!);
      }
    }, speed);

    return () => clearInterval(intervalRef.current!); // Cleanup the interval on unmount
  }, [text, speed]);

  useEffect(() => {
    if (displayedText.length === text.length) {
      console.log('"Text complete:", displayedText);')
      // check if all text has been displayed
      if (onComplete) onComplete();
    }
  }, [displayedText]);

  useEffect(() => {
    if (completeImmediately) {
      // clear the interval, and display full text
      console.log("completeImmediately", completeImmediately);
      clearInterval(intervalRef.current!);
      setDisplayedText(text);
    }
  }, [completeImmediately]);

  return <span>{displayedText}</span>;
};

export default TextBox;
