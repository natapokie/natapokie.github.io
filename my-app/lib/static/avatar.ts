import { IAvatarEye, IAvatarHair } from '@/lib/types/avatar';
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

import EyeLeftOpenBase from '@/public/avatar/eye-left/open/base.svg';
import EyeLeftOpenEyelash from '@/public/avatar/eye-left/open/eyelash.svg';
import EyeLeftClosingBase from '@/public/avatar/eye-left/closing/base.svg';
import EyeLeftClosingEyelash from '@/public/avatar/eye-left/closing/eyelash.svg';
import EyeLeftClosedBase from '@/public/avatar/eye-left/closed/base.svg';

import EyeRightOpenBase from '@/public/avatar/eye-right/open/base.svg';
import EyeRightOpenEyelash from '@/public/avatar/eye-right/open/eyelash.svg';
import EyeRightClosingBase from '@/public/avatar/eye-right/closing/base.svg';
import EyeRightClosingEyelash from '@/public/avatar/eye-right/closing/eyelash.svg';
import EyeRightClosedBase from '@/public/avatar/eye-right/closed/base.svg';

import IrisLeftBase from "@/public/avatar/eye-left/iris.svg";
import IrisRightBase from "@/public/avatar/eye-right/iris.svg";

import Smile from '@/public/avatar/mouth/base.svg';

import SkinBase from '@/public/avatar/face/base.svg';

import ShirtBase from '@/public/avatar/shirt/base.svg';

import NeckBase from '@/public/avatar/neck/base.svg';

export const Hairstyles: IAvatarHair[] = [
  {
    description: 'short black',
    hairFront: HairFront1,
    hairSide: HairSideBlack,
    hairBack: HairBack1,
  },
  {
    description: 'purple bob',
    hairFront: HairFront2,
    hairSide: HairSidePurple,
    hairBack: HairBack2,
  },
  {
    description: 'black mid',
    hairFront: HairFront3,
    hairSide: HairSideBlack,
    hairBack: HairBack3,
  },
  {
    description: 'black long with highlights',
    hairFront: HairFront4,
    hairSide: HairSideBlack,
    hairMiddle: HairMiddle4,
    hairBack: HairBack4,
  },
];

export const EyeState = {
  OPEN: 0,
  CLOSING: 1,
  CLOSED: 2,
};
export type EyeState = (typeof EyeState)[keyof typeof EyeState];

export const EyeLeft: Record<EyeState, IAvatarEye> = {
  [EyeState.OPEN]: {
    base: EyeLeftOpenBase,
    eyelash: EyeLeftOpenEyelash,
  },
  [EyeState.CLOSING]: {
    base: EyeLeftClosingBase,
    eyelash: EyeLeftClosingEyelash,
  },
  [EyeState.CLOSED]: {
    base: EyeLeftClosedBase,
  }
}

export const EyeRight: Record<EyeState, IAvatarEye> = {
  [EyeState.OPEN]: {
    base: EyeRightOpenBase,
    eyelash: EyeRightOpenEyelash,
  },
  [EyeState.CLOSING]: {
    base: EyeRightClosingBase,
    eyelash: EyeRightClosingEyelash,
  },
  [EyeState.CLOSED]: {
    base: EyeRightClosedBase,
  }
}

export const Iris = {
  left: IrisLeftBase,
  right: IrisRightBase,
};

export const MouthStyles = {
  smile: Smile
}

export const Skin = SkinBase;

export const Neck = NeckBase;

export const ShirtStyles = [
    ShirtBase,
]