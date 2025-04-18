"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./textbox.module.css";

import textBox from "@/public/textbox/container.svg";
import arrow from "@/public/textbox/chat_arrow.svg";
import optionArrow from "@/public/textbox/option_arrow.svg";

interface TextBoxProps {
  name?: string;
  value: DialogBox[];
  onChange?: (value: string) => void;
  placeholder?: string;
}

export interface DialogBox {
  dialog: string;
  optionsList?: string[];
}

const DialogBox: React.FC<TextBoxProps> = ({
  name,
  value = [],
  onChange,
  placeholder,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [displayArrow, setDisplayArrow] = useState<boolean>(false);
  const [completeTextImmediately, setCompleteTextImmediately] =
    useState<boolean>(false);
  const [displayedAllText, setDisplayedAllText] = useState<boolean>(false);
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [currentTextDisplayed, setCurrentTextDisplayed] =
    useState<boolean>(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  const navigateDialog = () => {
    if (!currentTextDisplayed) {
      console.log("complete text immediately");
      setCompleteTextImmediately(true);
    } else {
      console.log("display the next blurb of text");
      onArrowClick();
    }
  };

  const navigateOptions = (up: boolean) => {
    const options = value[currentTextIndex]?.optionsList || [];
    setSelectedOptionIndex((prevIndex) => {
      if (up) {
        // select the previous option
        return prevIndex > 0 ? prevIndex - 1 : options.length - 1;
      } else {
        // select the next option
        return (prevIndex + 1) % options.length;
      }
    });
  };

  const handleOptionClick = (index: number) => {
    // do stuff with selected option
    setDisplayOptions(false);
    setCurrentTextIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        if (displayOptions) {
          navigateOptions(true);
        }
      } else if (event.key === "ArrowDown") {
        if (!displayOptions) {
          navigateDialog();
        } else {
          navigateOptions(false);
        }
      } else if (event.key === "ArrowRight") {
        console.log("right key", displayOptions);
        if (!displayOptions) {
          console.log("navigate");
          navigateDialog();
        }
      } else if (event.key === "Enter") {
        console.log("option selected", selectedOptionIndex);
        if (displayOptions) {
          // handle option selection
          handleOptionClick(selectedOptionIndex);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [displayOptions, selectedOptionIndex, currentTextDisplayed]);

  useEffect(() => {
    if (currentTextIndex >= value.length) {
      console.log("displayed all text");
      setDisplayedAllText(true);
    }
  }, [currentTextIndex, value]);

  const handleTextComplete = () => {
    console.log("handleTextComplete");

    if (value[currentTextIndex]?.optionsList) {
      // don't display arrow if options are available
      console.log("optionsList", value[currentTextIndex].optionsList);
      console.log("display the options !!");
      setDisplayOptions(true);
    } else {
      setDisplayArrow(true);
    }

    setCurrentTextDisplayed(true);
    setCompleteTextImmediately(false);
  };

  const onArrowClick = () => {
    console.log("Arrow clicked");
    // switch to next text blurb
    setCurrentTextIndex((prevIndex) => prevIndex + 1);
    setDisplayArrow(false);
    setCurrentTextDisplayed(false);
  };

  return (
    <>
      <div
        className={`relative w-[869px] h-[246.23px] ${
          displayedAllText
            ? styles.textBoxContainerHidden
            : styles.textBoxContainer
        }`}
      >
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
            text={value[currentTextIndex]?.dialog}
            speed={50}
            completeImmediately={completeTextImmediately}
            onComplete={handleTextComplete}
          />
        </div>

        {/* {displayOptions && currentTextDisplayed && ( */}
        <div
          className={`${styles.optionsList} ${
            displayOptions && currentTextDisplayed
              ? styles.optionsListVisible
              : styles.optionsListHidden
          }`}
        >
          {value[currentTextIndex]?.optionsList?.map((option, index) => (
            <div key={index} className={styles.option}>
              {index === selectedOptionIndex && (
                <Image
                  src={optionArrow}
                  alt="option arrow"
                  className={styles.optionArrow}
                ></Image>
              )}

              <span className="block w-fit">
                <div
                  className={`${styles.optionHighlight} ${
                    selectedOptionIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
                <span className="relative z-10">{option}</span>
              </span>
            </div>
          ))}
        </div>
        {/* )} */}
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
      console.log('"Text complete:", displayedText);');
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

export default DialogBox;
