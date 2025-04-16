import { Avatar } from "@/components/avatar/avatar";
import TextBox from "@/components/textbox/textbox";
import { IntroText } from "@/lib/static/intro";
// import TextBox from '@/components/textbox/textbox';

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {/* <div className="relative w-full h-full"> */}
        <Avatar></Avatar>
        <div className="absolute left-1/2 bottom-[230px] transform -translate-x-1/2">
          <TextBox value={IntroText}></TextBox>
        </div>
        {/* </div> */}
      </div>

      {/* <TextBox value={IntroText}></TextBox> */}
    </>
  );
}
