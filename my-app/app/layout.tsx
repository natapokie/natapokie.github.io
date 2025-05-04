"use client";

import "./globals.css";
import TransitionMask from "@/components/transitions/transitionMask";
import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";
import { NavbarProvider } from "@/context/NavbarContext";

const MOUSE_ACTIVITY_TIMEOUT = 10_000; // 10 seconds

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showNavbarMouse, setShowNavbarMouse] = useState(false);
  const [showNavbarTimeout, setShowNavbarTimeout] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 200) {
        setShowNavbar(true);
        setShowNavbarMouse(true);
      } else {
        setShowNavbarMouse(false);
        if (!showNavbarTimeout) {
          setShowNavbar(false);
        }
      }
      setLastMoveTime(Date.now());
    };

    const interval = setInterval(() => {
      if (Date.now() - lastMoveTime > MOUSE_ACTIVITY_TIMEOUT) {
        // no mouse activity for over a certain period show navbar
        setShowNavbar(true);
        setShowNavbarTimeout(true);
      } else {
        setShowNavbarTimeout(false);
        if (!showNavbarMouse) {
          setShowNavbar(false);
        }
      }
    }, 1000);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [lastMoveTime, showNavbar]);

  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden`}>
        <NavbarProvider>
          {children}
          <TransitionMask />
          <div
            className={`absolute top-[40px] right-[30px] transition-transform duration-600 ease-in-out ${
              showNavbar ? "translate-y-0" : "translate-y-[-150px]"
            }`}
          >
            <Navbar />
          </div>
        </NavbarProvider>
      </body>
    </html>
  );
}
