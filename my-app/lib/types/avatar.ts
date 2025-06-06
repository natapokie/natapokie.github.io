import {StaticImageData} from "next/image";

export interface IAvatarHair {
    description: string;
    hairFront: StaticImageData;
    hairSide: StaticImageData;
    hairMiddle?: StaticImageData;
    hairBack: StaticImageData;
}

export interface IAvatarEye {
  base: StaticImageData;
  eyelash?: StaticImageData;
}