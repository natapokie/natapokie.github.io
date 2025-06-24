import { StaticImageData } from 'next/image';

import { IBubbleMenuItem } from '@/lib/types/common';
import { CustomizationCategory, IAvatarHair } from '@/lib/types/avatar';

import HairstyleIcon from '@/public/icons/hairstyle.svg';
import ShirtIcon from '@/public/icons/shirt.svg';
import AccessoriesIcon from '@/public/icons/accessories.svg';

import HairIcon1 from '@/public/avatar/icons/hair/1.svg';
import HairIcon2 from '@/public/avatar/icons/hair/2.svg';
import HairIcon3 from '@/public/avatar/icons/hair/3.svg';
import HairIcon4 from '@/public/avatar/icons/hair/4.svg';

import ShirtIcon1 from '@/public/avatar/icons/shirt/1.svg';
import ShirtIcon2 from '@/public/avatar/icons/shirt/2.svg';
import ShirtIcon3 from '@/public/avatar/icons/shirt/3.svg';

import HairFront1 from '@/public/avatar/hair-front/1.svg';
import HairFront2 from '@/public/avatar/hair-front/2.svg';
import HairFront3 from '@/public/avatar/hair-front/3.svg';
import HairFront4 from '@/public/avatar/hair-front/4.svg';
import HairSideBlack from '@/public/avatar/hair-side/base.svg';
import HairSidePurple from '@/public/avatar/hair-side/purple.svg';
import HairMiddle4 from '@/public/avatar/hair-middle/4.svg';
import HairBack1 from '@/public/avatar/hair-back/1.svg';
import HairBack2 from '@/public/avatar/hair-back/2.svg';
import HairBack3 from '@/public/avatar/hair-back/3.svg';
import HairBack4 from '@/public/avatar/hair-back/4.svg';

import Shirt1 from '@/public/avatar/shirt/base.svg';
import Shirt2 from '@/public/avatar/shirt/2.svg';
import Shirt3 from '@/public/avatar/shirt/3.svg';

import AccessoryScarf from '@/public/avatar/accessories/1-scarf.svg';
import AccessoryGlasses from '@/public/avatar/accessories/2-glasses.svg';
import AccessoryMustache from '@/public/avatar/accessories/3-mustache.svg';
import AccessoryEarring from '@/public/avatar/accessories/4-earring.svg';
import AccessoryGlassesRound from '@/public/avatar/accessories/5-glasses.svg';
import AccessoryAirpods from '@/public/avatar/accessories/6-airpod.svg';
import AccessoryClips from '@/public/avatar/accessories/7-clip.svg';
import AccessoryHeadband from '@/public/avatar/accessories/8-headband.svg';

import AccessoryIcon1 from '@/public/avatar/icons/accessories/1.svg';
import AccessoryIcon2 from '@/public/avatar/icons/accessories/2.svg';
import AccessoryIcon3 from '@/public/avatar/icons/accessories/3.svg';
import AccessoryIcon4 from '@/public/avatar/icons/accessories/4.svg';
import AccessoryIcon5 from '@/public/avatar/icons/accessories/5.svg';
import AccessoryIcon6 from '@/public/avatar/icons/accessories/6.svg';
import AccessoryIcon7 from '@/public/avatar/icons/accessories/7.svg';
import AccessoryIcon8 from '@/public/avatar/icons/accessories/8.svg';

interface ICustomizeOptionBase {
  label: string;
  icon: StaticImageData;
  multi?: boolean;
}

interface IHairstyleOption extends ICustomizeOptionBase, IBubbleMenuItem {
  img: IAvatarHair;
}

interface IShirtAccessoryOption extends ICustomizeOptionBase, IBubbleMenuItem {
  img: StaticImageData;
}

export const CustomizationOptions: Record<
  CustomizationCategory,
  IBubbleMenuItem & {
    options: (IHairstyleOption | IShirtAccessoryOption)[];
  }
> = {
  hairstyle: {
    label: 'Hairstyle',
    icon: HairstyleIcon,
    options: [
      {
        label: 'short black',
        icon: HairIcon1,
        img: {
          hairFront: HairFront1,
          hairSide: HairSideBlack,
          hairBack: HairBack1,
        },
      },
      {
        label: 'purple bob',
        icon: HairIcon2,
        img: {
          hairFront: HairFront2,
          hairSide: HairSidePurple,
          hairBack: HairBack2,
        },
      },
      {
        label: 'black mid',
        icon: HairIcon3,
        img: {
          hairFront: HairFront3,
          hairSide: HairSideBlack,
          hairBack: HairBack3,
        },
      },
      {
        label: 'black long with highlights',
        icon: HairIcon4,
        img: {
          hairFront: HairFront4,
          hairSide: HairSideBlack,
          hairMiddle: HairMiddle4,
          hairBack: HairBack4,
        },
      },
      // {
      //   label: 'orange up do',
      //   icon: todo,
      // },
    ],
  },
  shirt: {
    label: 'Shirt',
    icon: ShirtIcon,
    options: [
      {
        label: 'default white shirt',
        icon: ShirtIcon1,
        img: Shirt1,
      },
      {
        label: 'black shirt',
        icon: ShirtIcon2,
        img: Shirt2,
      },
      {
        label: 'white with vest',
        icon: ShirtIcon3,
        img: Shirt3,
      },
    ],
  },
  accessories: {
    label: 'Accessories',
    icon: AccessoriesIcon,
    multi: true,
    options: [
      {
        label: 'red scarf',
        icon: AccessoryIcon1,
        img: AccessoryScarf,
      },
      {
        label: 'white glasses',
        icon: AccessoryIcon2,
        img: AccessoryGlasses,
      },
      {
        label: 'mustache',
        icon: AccessoryIcon3,
        img: AccessoryMustache,
      },
      {
        label: 'earring',
        icon: AccessoryIcon4,
        img: AccessoryEarring,
      },
      {
        label: 'round glasses',
        icon: AccessoryIcon5,
        img: AccessoryGlassesRound,
      },
      {
        label: 'airpods',
        icon: AccessoryIcon6,
        img: AccessoryAirpods,
      },
      {
        label: 'clips',
        icon: AccessoryIcon7,
        img: AccessoryClips,
      },
      {
        label: 'headband',
        icon: AccessoryIcon8,
        img: AccessoryHeadband,
      },
    ],
  },
};


