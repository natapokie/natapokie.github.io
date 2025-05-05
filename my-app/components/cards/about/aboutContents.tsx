import React from "react";
import styles from "./aboutContents.module.css";
import {
  AboutDetails,
  AboutExperience,
  AboutIntro,
  AboutLinks,
  AboutSkills,
} from "@/lib/static/about";
import Image from "next/image";
import Link from "next/link";

export default function AboutContents() {
  return (
    <>
      <div className="w-full h-[200px] bg-[var(--seashell)] text-[var(--liver)] flex justify-center items-center text-3xl font-bold pb-[50px]">
        <h1>About Me</h1>
      </div>
      <div
        className="absolute top-[150px] flex flex-row justify-center items-center z-0"
        style={{ zIndex: 0 }}
      >
        {Array.from({ length: 10 }).map((e, index) => (
          <div
            key={index}
            className="w-[150px] h-[150px]  bg-[var(--champagne-pink)]"
            style={{ marginLeft: "-25px", borderRadius: "100px" }}
          ></div>
        ))}
      </div>

      <div className="w-full h-auto flex flex-col flex-1 bg-[var(--champagne-pink)] pt-[50px] pb-[80px] px-[80px] z-[1] gap-y-[20px]">
        <div className="w-full flex flex-row justify-center items-center gap-x-[80px]">
          <div className="w-[425px] h-auto aspect-square rounded-[30px] border-[6px] border-white shadow-md overflow-hidden bg-[var(--champagne-pink)]">
            {/* <Image></Image> */}
          </div>
          <div className="flex flex-col flex-1 h-full w-full gap-y-[20px]">
            <div className={`w-full ${styles.headerContainer}`}>
              <h2>Hello! I'm Natalie! 👋</h2>
            </div>
            <p>{AboutIntro}</p>
            {AboutDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <div className={styles.divider}></div>
                <div className="flex flex-row items-center justify-start">
                  <div className="flex items-center justify-center w-[40px] mr-[20px]">
                    <Image
                      src={detail.icon}
                      alt={detail.name}
                      className={styles.icon}
                    ></Image>
                  </div>
                  <h3>{detail.text}</h3>
                </div>
              </React.Fragment>
            ))}
            <div className={styles.divider}></div>
            <div className="flex flex-row justify-start items-center gap-x-[40px]">
              {AboutLinks.map((item, index) => (
                <React.Fragment key={index}>
                  <Link href={item.link} target="_blank">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      className={styles.contactIcon}
                    ></Image>
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className={`w-fit ${styles.headerContainer}`}>
          <h2>Software & Tools</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {AboutSkills.map((item, index) => (
            <div
              key={index}
              className="w-fit py-[2px] px-[20px] border-[2px] border-[var(--old-rose)] rounded-[100px] text-[var(--liver)]"
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
        <div className={`w-fit ${styles.headerContainer}`}>
          <h2>Experience</h2>
        </div>
        <div className="flex flex-col gap-y-[10px]">
          {AboutExperience.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-start"
            >
              <div>
                <p className="font-bold">{item.title}</p>
                <p>{item.company}</p>
              </div>
              <p className="italic">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full absolute bottom-[5px] flex flex-row items-center justify-between z-[1] px-[40px] pb-[20px] text-[var(--rosy-brown)]">
        <span className="">Last Upd. May 2025</span>
      </div>
    </>
  );
}
