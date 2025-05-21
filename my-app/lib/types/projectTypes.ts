import { StaticImageData } from "next/image";

export interface IProject {
  name: string;
  description: string;
  icon?: StaticImageData;
  photo: StaticImageData;
  githubLink?: string;
  websiteLink?: string;
  techStack: string[];
  role?: string;
}
