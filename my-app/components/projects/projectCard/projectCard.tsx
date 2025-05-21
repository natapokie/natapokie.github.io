import { useMemo } from "react";

import Image from "next/image";
import Link from "next/link";

import { IProject } from "@/lib/types/projectTypes";
import GithubIcon from "@/public/about/github.svg";
import OpenIcon from "@/public/icons/arrow-up-right-from-square-solid.svg";
import TextBlob from "@/public/blob/text-blob.svg";

type ProjectCardProps = {
  details: IProject;
};

export default function ProjectCard({ details }: ProjectCardProps) {
  // useMemo to calculate rotation one on mount
  const rotation = useMemo(() => `${Math.random() * 2 - 1}deg`, []);

  return (
    <div
      className="relative flex flex-col justify-center items-center w-[800px] h-[525px] border-white rounded-[10px] border-[10px] overflow-hidden shadow-md"
      style={{ transform: `rotate(${rotation})` }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-full bg-[var(--seashell)] text-[var(--liver)] flex justify-center items-center text-3xl font-bold pb-[30px]"
        style={{ height: "calc(15% + 40px)" }}
      >
        <h2>{details.name}</h2>
      </div>
      <div
        className="absolute flex flex-row justify-center items-center z-0"
        style={{ zIndex: 0, top: "15%" }}
      >
        {Array.from({ length: 13 }).map((e, index) => (
          <div
            key={index}
            className="w-[80px] h-[80px]  bg-[var(--champagne-pink)]"
            style={{
              marginLeft: "-8px",
              marginRight: "-8px",
              borderRadius: "100px",
            }}
          ></div>
        ))}
      </div>
      <div className="w-full h-auto flex flex-row flex-1 bg-[var(--champagne-pink)] z-[1] px-[25px] gap-x-[25px]">
        <div className="relative flex justify-center items-center w-[60%] h-full pb-[50px]">
          <Image
            src={TextBlob}
            alt="text-box"
            className="w-full h-auto opacity-75"
          />
          <p className="absolute text-white text-center p-[50px]">
            {details.description}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-[40%] h-full gap-y-3 pb-[25px]">
          <div className="w-full h-auto aspect-[4/3] border-[5px] border-white rounded-[5px] overflow-hidden bg-[var(--champagne-pink)]">
            <Image
              src={details.photo}
              alt="project-image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-y-2">
            {details.role && <p className="font-bold">Role: {details.role}</p>}

            <div className="flex flex-wrap gap-1">
              {details.techStack.map((item, index) => (
                <div
                  key={index}
                  className="w-fit py-[2px] px-[14px] border-[2px] border-[var(--old-rose)] rounded-[100px] text-[var(--liver)]"
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {details?.githubLink && (
        <Link href={details.githubLink} target="_blank">
          <div className="absolute flex flex-row justify-center items-center left-[10px] bottom-[10px] gap-x-[20px] z-[2]">
            <Image
              src={GithubIcon}
              alt="github-link"
              className="w-[50px] h-auto cursor-pointer"
            />
          </div>
        </Link>
      )}
      {details?.websiteLink && (
        <Link href={details.websiteLink} target="_blank">
          <div className="absolute top-[10px] right-[10px] z-[2]">
            <Image
              src={OpenIcon}
              alt="link"
              className="w-[25px] h-auto cursor-pointer"
            />
          </div>
        </Link>
      )}
    </div>
  );
}
