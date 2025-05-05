"use client";

import { NavbarItems } from "@/lib/static/intro";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNavbarContext } from "@/context/NavbarContext";

export default function Navbar() {
  const { navbarState, setNavbarState } = useNavbarContext();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavItemClick = (index: number) => {
    setNavbarState(NavbarItems[index]);
    router.push(NavbarItems[index].route);
  };

  useEffect(() => {
    const index = NavbarItems.findIndex((item) => item.route === pathname);
    if (index !== -1) {
      setNavbarState(NavbarItems[index]);
    } else {
      setNavbarState(NavbarItems[0]);
    }
  }, [pathname]);

  return (
    <div className="flex flex-row justify-start items-center z-10">
      {NavbarItems.map((item, index) => (
        <div
          key={index}
          onClick={() => handleNavItemClick(index)}
          className={`${styles.navbarItem} ${
            navbarState.name === item.name ? styles.navbarItemSelected : ""
          }`}
        >
          <Image
            src={item.icon}
            alt={item.name}
            className={`${styles.navbarIcon} `}
          ></Image>
          {navbarState.name === item.name && (
            <div className={styles.navbarHeader}>{item.name}</div>
          )}
        </div>
      ))}
    </div>
  );
}
