import { DialogBox } from "@/components/textbox/textbox";
import HomeIcon from "@/public/navbar/home.svg";
import AboutIcon from "@/public/navbar/about.svg";
import ProjectsIcon from "@/public/navbar/idea.svg";
import ResumeIcon from "@/public/navbar/file.svg";
import CustomizeIcon from "@/public/navbar/paint.svg";
import { INavbarItem } from '@/lib/types/navbarTypes';

export const NavbarItems: INavbarItem[] = [
  {
    name: "Home",
    icon: HomeIcon,
    route: "/",
  },
  {
    name: "About Me",
    icon: AboutIcon,
    route: "/about",
  },
  {
    name: "Projects",
    icon: ProjectsIcon,
    route: "/projects",
  },
  // {
  //   name: "Resume",
  //   icon: ResumeIcon,
  // },
  {
    name: "Customize",
    icon: CustomizeIcon,
  },
]

export const IntroOptionsMap: Record<string, string> = {
  "About Me": "/about",
  Projects: "/projects",
  Resume: "/resume",
  "I want to look around": "",
};

export const IntroOptionsList = Object.keys(IntroOptionsMap);

export const IntroText: DialogBox[] = [
  {
    dialog:
      "Hi there! I’m Natalie — a recent graduate from the University of Toronto.",
  },
  {
    dialog: "What are you interested in seeing?",
    optionsList: IntroOptionsList,
  },
  {
    dialog:
      "Alright! Come back to the home menu if you want to see something else.",
  },
];
