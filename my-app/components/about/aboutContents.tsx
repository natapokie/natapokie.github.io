import React from "react";
import {
  AboutDetails,
  AboutExperience,
  AboutIntro,
  AboutLinks,
  AboutSkills,
} from "@/lib/static/about";
import Image from "next/image";
import Link from "next/link";
import Header from "../common/header/header";
import styles from "./aboutContents.module.css";
import ProfileImage from "@/public/todo.jpg"; // Update with your actual image path

export default function AboutContents() {
  return (
    <>
      <Header title="About Me" />
      <div className="w-full h-auto flex flex-col flex-1 bg-[var(--champagne-pink)] pt-[120px] pb-[80px] px-[50px] z-[1] gap-y-[20px]">
        <div className="w-full flex flex-row justify-center items-start gap-x-[30px]">
          <div className="flex flex-col justify-start items-center gap-y-[20px]">
            <div className="w-[250px] h-auto aspect-square rounded-[30px] border-[6px] border-white shadow-md overflow-hidden bg-[var(--champagne-pink)]">
              <Image
                src={ProfileImage}
                alt="profile-image"
                className={styles.profileImage}
              ></Image>
            </div>
          </div>
          <div className="flex flex-col flex-1 h-full w-full gap-y-[15px]">
            <div className={`w-full ${styles.headerContainer}`}>
              Hello! I'm Natalie! 👋
            </div>
            <p>{AboutIntro}</p>
            {AboutDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <div className={styles.divider}></div>
                <div className="flex flex-row items-center justify-start">
                  <div className="flex items-center justify-center w-[35px] mr-[10px] flex-shrink-0">
                    <Image
                      src={detail.icon}
                      alt={detail.name}
                      className={styles.icon}
                    ></Image>
                  </div>
                  <span className="text-sm font-bold text-[var(--liver)]">
                    {detail.text}
                  </span>
                </div>
              </React.Fragment>
            ))}
            <div className={styles.divider}></div>
            <div className="flex flex-row justify-start items-center gap-x-[20px]">
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
        <div className={`w-fit mt-3 ${styles.headerContainer}`}>
          Software & Tools
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
        <div className={`w-fit mt-3 ${styles.headerContainer}`}>Experience</div>
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
        <span className="text-[12px]">Last Upd. May 2025</span>
      </div>
    </>
  );
}
