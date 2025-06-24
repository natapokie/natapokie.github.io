import { StaticImageData } from 'next/image';

export interface IBubbleMenuItem {
  label: string;
  icon: StaticImageData,
  multi?: boolean; // multi select: true,
  callback?: (name: string, index: number) => void;
}