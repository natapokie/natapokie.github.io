import { StaticImageData } from "next/image";

export type INavbarContext = {
  navbarState: INavbarItem;
  setNavbarState: (state: INavbarItem) => void;
};

export type INavbarItem = {
  name: string;
  icon: StaticImageData;
  route?: string;
};
