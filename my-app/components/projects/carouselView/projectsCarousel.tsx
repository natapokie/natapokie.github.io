"use client";

import { ProjectsList } from "@/lib/static/projects";
import ProjectCard from "../projectCard/projectCard";
import React, { useEffect, useState } from "react";
import styles from "./projectsCarousel.module.css";
import Arrow from "@/public/misc/arrow.svg";
import Image from "next/image";

type ProjectCarouselProps = {
  selectedIndex: number;
  onShowAllProjects: () => void;
};

export default function ProjectCarousel({
  selectedIndex,
  onShowAllProjects,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const [hideLeftArrow, setHideLeftArrow] = useState(true);
  const [hideRightArrow, setHideRightArrow] = useState(true);

  // card animation, sliding in from right/left and opening/closing
  const [animationState, setAnimationState] = useState<
    "rightClick" | "leftClick" | "scaleIn" | "scaleOut" | null
  >("scaleIn");

  const onSetNextIndex = (curr: number) => (curr + 1) % ProjectsList.length;
  const onSetPrevIndex = (curr: number) =>
    (curr - 1 + ProjectsList.length) % ProjectsList.length;

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

    setAnimationState("leftClick");
    setTimeout(() => {
      setCurrentIndex((prev) => onSetPrevIndex(prev));
      setAnimationState(null);
    }, 500);
  };

  const onRightClick = () => {
    if (animationState) return;

    setAnimationState("rightClick");
    setTimeout(() => {
      setCurrentIndex((prev) => onSetNextIndex(prev));
      setAnimationState(null);
    }, 500); // wait until animation is complete
  };

  useEffect(() => {
    // hide the arrows if at the end/beginning of the list
    if (currentIndex === 0) {
      setHideLeftArrow(true);
    } else if (currentIndex === ProjectsList.length - 1) {
      setHideRightArrow(true);
    } else {
      setHideLeftArrow(false);
      setHideRightArrow(false);
    }
  }, [currentIndex]);

  const showAllProjects = () => {
    setAnimationState("scaleOut");
    setTimeout(() => {
      onShowAllProjects();
      setAnimationState(null);
    }, 500);
  };

  return (
    <div
      className={`w-full h-full flex flex-row justify-start items-center ${
        animationState === "scaleOut" ? styles.fadeOut : ""
      }`}
    >
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
            onClick={() => showAllProjects()}
          >
            <ProjectCard details={item} />
          </div>
        ))}
      </div>

      {!hideLeftArrow && (
        <div
          className={`absolute left-7 z-[1] cursor-pointer py-10 px-5 ${styles.bounceLeftX}`}
          onClick={onLeftClick}
        >
          <Image src={Arrow} alt="left-arrow" className="w-[50px] h-auto" />
        </div>
      )}

      {!hideRightArrow && (
        <div
          className={`absolute right-7 z-[1] cursor-pointer py-10 px-5 ${styles.bounceRightX}`}
          onClick={onRightClick}
        >
          <Image
            src={Arrow}
            alt="left-arrow"
            className="w-[50px] h-auto scale-x-[-1]"
          />
        </div>
      )}
    </div>
  );
}
