"use client";

import { NavbarItems } from "@/lib/static/intro";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleNavItemClick = (index: number) => {
    console.log("Clicked on route:", index);
    setSelectedIndex(index);
  };

  return (
    <div className="absolute top-[40px] right-[30px]">
      <div className="flex flex-row justify-start items-center">
        {NavbarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavItemClick(index)}
            className={`${styles.navbarItem} ${
              selectedIndex === index ? styles.navbarItemSelected : ""
            }`}
          >
            <Image
              src={item.icon}
              alt={item.name}
              className={`${styles.navbarIcon} `}
            ></Image>
            {selectedIndex === index && (
              <div className={styles.navbarHeader}>{item.name}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
