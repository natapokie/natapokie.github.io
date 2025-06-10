"use client";

import { AvatarHandler } from '@/components/avatar/avatar';
import DialogBox from "@/components/textbox/textbox";
import {
  IntroOptionsList,
  IntroOptionsMap,
  IntroText,
} from "@/lib/static/intro";
import { useRouter } from "next/navigation";
import {CustomizationWindow} from "@/components/avatar/customization";
import { CustomizationProvider } from '@/context/CustomizationContext';

export default function Home() {
  const router = useRouter();

  const dialogComplete = (index: number) => {
    console.log("Dialog complete", index);
    const selectedOption = IntroOptionsList[index];
    const nextPath = IntroOptionsMap[selectedOption];
    console.log("Next path", nextPath);
    if (nextPath) {
      setTimeout(() => {
        router.push(nextPath);
      }, 600); // delay to complete animation
    }
  };

  return (
    <>
      <CustomizationProvider>
      <div className="w-full h-full flex justify-center items-center p-5 page">
        <AvatarHandler></AvatarHandler>
        <div className="absolute w-full h-full flex justify-center items-center pt-[65vh] pb-[15vh] md:pt-[72vh] md:pb-[7vh]">
              <DialogBox
                name={"Natalie"}
                value={IntroText}
                onComplete={dialogComplete}
              ></DialogBox>
        </div>
        <CustomizationWindow></CustomizationWindow>
      </div>
      </CustomizationProvider>
    </>
  );
}
