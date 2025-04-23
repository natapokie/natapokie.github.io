import { DialogBox } from "@/components/textbox/textbox";

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
