import { StaticImageData } from "next/image";

export interface IProject {
  name: string;
  shortDescription: string;
  description: string;
  date: string;
  icon?: StaticImageData;
  photo: StaticImageData;
  githubLink?: string;
  websiteLink?: string;
  techStack: string[];
  role?: string;
  class?: 'pattern-geometric' | 'pattern-grid' | 'pattern-stars'; // additional class for styling
}
