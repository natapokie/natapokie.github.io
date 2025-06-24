import {StaticImageData} from "next/image";

export interface IAvatarEye {
  base: StaticImageData;
  eyelash?: StaticImageData;
}

// Custom image type for hair
export interface IAvatarHair {
  hairFront: StaticImageData;
  hairSide: StaticImageData;
  hairBack: StaticImageData;
  hairMiddle?: StaticImageData;
}

// Option structure per category
export interface IHairstyleOption {
  label: string;
  icon: StaticImageData;
  img: IAvatarHair;
}

export interface IShirtOrAccessoryOption {
  label: string;
  icon: StaticImageData;
  img: StaticImageData;
}

// Customization category keys
export type CustomizationCategory = "hairstyle" | "shirt" | "accessories";

// Main customization state
export type CustomizationType = {
  hairstyle: number;
  shirt: number;
  accessories: number[];
};

// Images used for display
export type CustomizationImgsType = {
  hairstyle: IAvatarHair;
  shirt: StaticImageData;
  accessories: StaticImageData[];
};
