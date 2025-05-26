"use client";

import { ProjectsList } from "@/lib/static/projects";
import ProjectCard from "../projectCard/projectCard";
import React, { useEffect, useState } from "react";
import styles from "./projectsCarousel.module.css";
import Arrow from "@/public/misc/arrow.svg";
import Image from "next/image";
import { useProjectContext } from "@/context/ProjectContext";

export default function ProjectCarousel() {
  const { selectedProject, showAllProjects } = useProjectContext();

  const [currentIndex, setCurrentIndex] = useState(selectedProject);
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
      hideShowArrows(selectedProject);
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

  const hideShowArrows = (index: number) => {
    if (index === 0) {
      setHideLeftArrow(true);
      setHideRightArrow(false);
    } else if (index === ProjectsList.length - 1) {
      setHideRightArrow(true);
      setHideLeftArrow(false);
    } else {
      setHideLeftArrow(false);
      setHideRightArrow(false);
    }
  };

  useEffect(() => {
    // hide the arrows if at the end/beginning of the list
    hideShowArrows(currentIndex);
  }, [currentIndex]);

  const onShowAllProjects = () => {
    setAnimationState("scaleOut");
    setTimeout(() => {
      showAllProjects();
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
            onClick={() => onShowAllProjects()}
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
