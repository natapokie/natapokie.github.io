"use client";

import { AvatarHandler } from '@/components/avatar/avatar';
import DialogBox from "@/components/textbox/textbox";
import {
  IntroOptionsList,
  IntroOptionsMap,
  IntroText,
} from "@/lib/static/intro";
import { useRouter } from "next/navigation";

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
      <div className="w-full h-full flex justify-center items-center p-5 page">
        <AvatarHandler></AvatarHandler>
        <div className="absolute left-1/2 bottom-[230px] transform -translate-x-1/2">
          <DialogBox
            name={"Natalie"}
            value={IntroText}
            onComplete={dialogComplete}
          ></DialogBox>
        </div>
        {/* </div> */}
      </div>

      {/* <TextBox value={IntroText}></TextBox> */}
    </>
  );
}
