"use client";

import { NavbarItems } from "@/lib/static/intro";
import styles from "./navbar.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  const handleNavItemClick = (index: number) => {
    setSelectedIndex(index);
    router.push(NavbarItems[index].route);
  };

  useEffect(() => {
    const index = NavbarItems.findIndex((item) => item.route === pathname);
    if (index !== -1) {
      setSelectedIndex(index);
    } else {
      setSelectedIndex(0); // Default to the first item if not found
    }
  }, [pathname]);

  return (
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
  );
}
