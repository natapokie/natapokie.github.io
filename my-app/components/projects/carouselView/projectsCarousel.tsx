"use client";

import { ProjectsList } from "@/lib/static/projects";
import ProjectCard from "../projectCard/projectCard";
import React, { useEffect, useState } from "react";
import styles from "./projectsCarousel.module.css";
import Arrow from "@/public/misc/arrow.svg";
import Image from "next/image";

type ProjectCarouselProps = {
  selectedIndex: number;
};

export default function ProjectCarousel({
  selectedIndex,
}: ProjectCarouselProps) {
  const [focusedIndex, setFocusedIndex] = useState(selectedIndex);
  const [transformX, setTransformX] = useState("0");

  const onSetNextIndex = (curr: number) => (curr + 1) % ProjectsList.length;
  const onSetPrevIndex = (curr: number) =>
    (curr - 1 + ProjectsList.length) % ProjectsList.length;

  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [nextIndex, setNextIndex] = useState<number>(
    onSetNextIndex(selectedIndex)
  );
  const [prevIndex, setPrevIndex] = useState<number>(
    onSetPrevIndex(selectedIndex)
  );
  const [hideLeftArrow, setHideLeftArrow] = useState(true);
  const [hideRightArrow, setHideRightArrow] = useState(true);

  // card animation, sliding in from right/left and opening/closing
  const [animationState, setAnimationState] = useState<
    "rightClick" | "leftClick" | "scaleIn" | "scaleOut" | null
  >("scaleIn");

  useEffect(() => {
    setTimeout(() => {
      // only show arrows after the first animation
      setAnimationState(null);
      setHideLeftArrow(false);
      setHideRightArrow(false);
    }, 500);
  }, []);

  const onLeftClick = () => {
    if (animationState) return;
    console.log("on left click");
    // setFocusedIndex((index) => {
    //   const next = index - 1;
    //   console.log("next", next);
    //   return next < 0 ? 0 : next;
    // });

    // setCurrentIndex((index) => {
    //   const next = index - 1;
    //   console.log("next", next);
    //   return next < 0 ? 0 : next;
    // });
    // setCurrentIndex(
    //   (prev) => (prev - 1 + ProjectsList.length) % ProjectsList.length
    // );
    // setCurrentIndex((prev) => onSetPrevIndex(prev));
    setAnimationState("leftClick");
    setTimeout(() => {
      setCurrentIndex((prev) => onSetPrevIndex(prev));
      setAnimationState(null);
    }, 500);
  };

  const onRightClick = () => {
    if (animationState) return;
    // setFocusedIndex((index) => {
    //   const next = index + 1;
    //   return next > ProjectsList.length - 1 ? ProjectsList.length - 1 : next;
    // });

    // setCurrentIndex((index) => {
    //   const next = index + 1;
    //   return next > ProjectsList.length - 1 ? ProjectsList.length - 1 : next;
    // });
    // setCurrentIndex((prev) => (prev + 1) % ProjectsList.length);

    // setNextIndex(() => onSetNextIndex(onSetNextIndex(currentIndex)));
    // setPrevIndex(() => onSetPrevIndex(onSetNextIndex(currentIndex)));
    // // setPrevIndex(() => onSetPrevIndex(currentIndex));
    setAnimationState("rightClick");
    setTimeout(() => {
      setCurrentIndex((prev) => onSetNextIndex(prev));
      setAnimationState(null);
    }, 500); // wait until animation is complete
  };

  useEffect(() => {
    console.log("prevIndex", prevIndex, ProjectsList[prevIndex].name);
    console.log("currentIndex", currentIndex, ProjectsList[currentIndex].name);
    console.log("nextIndex", nextIndex, ProjectsList[nextIndex].name);

    // hide the arrows if at the end/beginning of the list
    if (currentIndex === 0) {
      setHideLeftArrow(true);
    } else if (currentIndex === ProjectsList.length - 1) {
      setHideRightArrow(true);
    } else {
      setHideLeftArrow(false);
      setHideRightArrow(false);
    }
    // onSetNextIndex(currentIndex);
    // onSetPrevIndex(currentIndex);

    // if (!nextIndex || !prevIndex) {
    //   // on init (make sure to set the next and prev index)
    //   // setNextIndex(() => onSetNextIndex(currentIndex));
    //   setNextIndex(() => onSetNextIndex(currentIndex));
    // setPrevIndex(() => onSetPrevIndex(currentIndex));
    // } else {

    // }
    // setNextIndex(() => onSetNextIndex(currentIndex));
    // setPrevIndex(() => onSetPrevIndex(currentIndex));
  }, [currentIndex, nextIndex, prevIndex]);

  const showAllProjects = () => {
    setAnimationState("scaleOut")
    setTimeout(() => {
      // TODO: switch back to thumbnail view
      setAnimationState(null);
    }, 500);
  }

  // useEffect(() => {
  //   // console.log("nextIndex", nextIndex);
  //   // console.log("prevIndex", prevIndex);
  // }, [nextIndex, prevIndex]);

  //   useEffect(() => {
  //     console.log("focusedIndex", focusedIndex);
  //     setTransformX(`${focusedIndex * -100}vw`);
  //   }, [focusedIndex]);

  //   useEffect(() => {
  //     console.log("transformX", transformX);
  //   }, [transformX]);

  return (
    <div className="w-full h-full flex flex-row justify-start items-center">
      {/* <div className="flex flex-row justify-center items-center"> */}
      {/* <div
        className="relative h-full"
        style={{
          transform: `translateX(-${selectedIndex} * 100vw)`,
        }}
      > */}
      <div
        className="relative flex flex-row justify-start items-center"
        style={{
          transform: `translateX(-${currentIndex * 100}vw)`,
        }}
      >
        {ProjectsList.map((item, index) => (
          <div
            key={index}
            className={`w-screen h-screen flex justify-center items-center flex-shrink-0 
            
              ${animationState ? styles[animationState] : ""}
            `}
            onClick={(e) => showAllProjects()}
          >
            <ProjectCard details={item} />
          </div>
        ))}

        {/* {ProjectsList.map((item, index) => (
          <div
            key={index}
            className={`absolute w-screen h-screen flex justify-center items-center flex-shrink-0 
              ${
                index === currentIndex ||
                index === nextIndex ||
                index === prevIndex
                  ? styles.active
                  : ""
              }
              ${
                index === currentIndex
                  ? styles.currentCard
                  : index === nextIndex
                  ? styles.nextCard
                  : index === prevIndex
                  ? styles.prevCard
                  : styles.hidden
              }
            
              ${
                animationState === "right-slide" && index === currentIndex
                  ? `${styles.rightSlideIn}`
                  : animationState === "right-slide" && index === nextIndex
                  ? `${styles.rightSlideOut}`
                  : ""
              }
            `}
          >
            <ProjectCard details={item} />
          </div>
        ))} */}
      </div>

      {/* <div
        className={`transition-transform duration-500 ease-in-out z-0`}
        style={{
          transform: `translateX(${transformX})`,
        }}
      >
        <div className="flex flex-row justify-center items-center">
          {prevIndex && <ProjectCard details={ProjectsList[prevIndex]} />}
          <ProjectCard details={ProjectsList[focusedIndex]} />
          {nextIndex && <ProjectCard details={ProjectsList[nextIndex]} />}

          {ProjectsList.map((item, index) => (
            <React.Fragment key={index}>
              <ProjectCard details={item} />
            </React.Fragment>
          ))}
        </div>
      </div> */}
      {!hideLeftArrow && (
        <div
          className={`absolute left-5 z-[1] ${styles.bounceLeftX}`}
          onClick={onLeftClick}
        >
          <Image
            src={Arrow}
            alt="left-arrow"
            className="w-[50px] h-auto cursor-pointer"
          />
        </div>
      )}

      {!hideRightArrow && (
        <div
          className={`absolute right-5 z-[1] ${styles.bounceRightX}`}
          onClick={onRightClick}
        >
          <Image
            src={Arrow}
            alt="left-arrow"
            className="w-[50px] h-auto cursor-pointer scale-x-[-1]"
          />
        </div>
      )}
    </div>
  );
}
