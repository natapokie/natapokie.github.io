'use client';

import { NavbarItems } from '@/lib/static/intro';
import styles from './navbar.module.css';
import Image from 'next/image';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNavbarContext } from '@/context/NavbarContext';
import { useCustomizationContext } from '@/context/CustomizationContext';

export default function Navbar() {
  const { navbarState, setNavbarState } = useNavbarContext();
  const { setShowCustomization } = useCustomizationContext();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavItemClick = (index: number) => {
    setNavbarState(NavbarItems[index]);
    if (NavbarItems[index]?.route) {
      router.push(NavbarItems[index].route);
    } else {
      if (NavbarItems[index].name === 'Customize') {
        if (navbarState.name === 'Customize') {
          setShowCustomization(false);
          setNavbarState(NavbarItems[0]);
        } else {
          setShowCustomization(true);
        }
      }
    }
  };

  useEffect(() => {
    const index = NavbarItems.findIndex(item => item.route === pathname);
    if (index !== -1) {
      setNavbarState(NavbarItems[index]);
    } else {
      setNavbarState(NavbarItems[0]);
    }
  }, [pathname]);

  return (
    <div className="flex flex-row justify-start items-center">
      {(pathname === '/'
        ? NavbarItems
        : NavbarItems.slice(0, NavbarItems.length - 1)
      ).map((item, index) => (
        <div
          key={index}
          onClick={() => handleNavItemClick(index)}
          className={`${styles.navbarItem} ${
            navbarState.name === item.name ? styles.navbarItemSelected : ''
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
