'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { StaticImageData } from 'next/image';
import { IAvatarHair } from '@/lib/types/avatar';
import { Hairstyles, ShirtStyles } from '@/lib/static/avatar';

type CustomizationType = {
  hairstyle: number,
  shirt: number,
  accessories: number[],
}

type CustomizationContextType = {
  customization: CustomizationType,
  setCustomization: Dispatch<SetStateAction<CustomizationType>>;
  avatarStyles: AvatarStylesType,
  setAvatarStyles: Dispatch<SetStateAction<AvatarStylesType>>;
}

type AvatarStylesType = {
  hairstyle: IAvatarHair;
  shirt: StaticImageData;
  accessories: StaticImageData[];
}

const defaultCustomization: CustomizationType = {
  hairstyle: 3,
  shirt: 0,
  accessories: []
}

const defaultAvatarStyles: AvatarStylesType = {
  hairstyle: Hairstyles[defaultCustomization.hairstyle],
  shirt: ShirtStyles[defaultCustomization.shirt],
  accessories: [],
}

const CUSTOMIZATION_KEY = "customization";

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export const useCustomizationContext = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomizationContext must be used within CustomizationProvider");
  }
  return context;
}

export const CustomizationProvider = ({ children }:{
  children: ReactNode;
}) => {
  const [customization, setCustomization] = useState<CustomizationType>(defaultCustomization);
  const [avatarStyles, setAvatarStyles] = useState<AvatarStylesType>(defaultAvatarStyles);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return

    hasInitialized.current = true;

    console.log('on init')
    // get saved state from local storage
    const saved = localStorage.getItem(CUSTOMIZATION_KEY);
    console.log('saved', saved);
    try {
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log('parsed', parsed);
        if (parsed) {
          console.log('set customization');
          setCustomization(parsed);
        }
      }
    } catch {
      console.log('Error parsing, using default')
    }
  }, []);

  useEffect(() => {
    console.log('customization useEffect', customization);
    localStorage.setItem(CUSTOMIZATION_KEY, JSON.stringify(customization));

    setAvatarStyles({
        hairstyle: Hairstyles[customization.hairstyle],
        shirt: ShirtStyles[customization.shirt],
        accessories: [],
      }
    )

  }, [customization]);

  return (
    <CustomizationContext.Provider value={{customization, setCustomization, avatarStyles, setAvatarStyles}}>
      {children}
      </CustomizationContext.Provider>
  )
}