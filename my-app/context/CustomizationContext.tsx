'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  CustomizationImgsType,
  CustomizationType,
  IHairstyleOption,
  IShirtOrAccessoryOption,
} from '@/lib/types/avatar';
import { CustomizationOptions } from '@/lib/static/customize';

const defaultCustomization: CustomizationType = {
  hairstyle: 3,
  shirt: 0,
  accessories: []
}

const defaultCustomizationImgs: CustomizationImgsType = {
  hairstyle:
  (CustomizationOptions.hairstyle.options[defaultCustomization.hairstyle] as IHairstyleOption)
    .img,
  shirt: (CustomizationOptions.shirt.options[defaultCustomization.shirt] as IShirtOrAccessoryOption)
    .img,
  accessories: [],
};

type CustomizationContextType = {
  customization: CustomizationType,
  onSetCustomization: (context: Partial<CustomizationType>) => void;
  customizationImgs: CustomizationImgsType;
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
  const [customization, setCustomization] = useState<CustomizationType>(() => {
    const saved = localStorage.getItem(CUSTOMIZATION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch {
        console.log("Error parsing customization, using default");
      }
    }
    return defaultCustomization;
  });
  const [customizationImgs, setCustomizationImgs] = useState<CustomizationImgsType>(defaultCustomizationImgs);

  useEffect(() => {
    localStorage.setItem(CUSTOMIZATION_KEY, JSON.stringify(customization));

    const hairstyleOption = CustomizationOptions.hairstyle.options[
      customization.hairstyle
      ] as IHairstyleOption;

    const shirtOption = CustomizationOptions.shirt.options[
      customization.shirt
      ] as IShirtOrAccessoryOption;

    const accessoriesOptions = customization.accessories.map(
      (i) => CustomizationOptions.accessories.options[i] as IShirtOrAccessoryOption
    );

    setCustomizationImgs({
      hairstyle: hairstyleOption.img,
      shirt: shirtOption.img,
      accessories: accessoriesOptions.map((a) => a.img),
    });
  }, [customization]);

  const isValidCustomization = (context: CustomizationType): boolean => {
    const { hairstyle, shirt, accessories } = context;

    const validHairstyle = Number.isInteger(hairstyle) && hairstyle >= 0 && hairstyle < CustomizationOptions.hairstyle.options.length;
    const validShirt = Number.isInteger(shirt) && shirt >= 0 && shirt < CustomizationOptions.shirt.options.length;
    const validAccessories = Array.isArray(accessories);

    return validHairstyle && validShirt && validAccessories;
  };

  const onSetCustomization = (context: Partial<CustomizationType>) => {
    const newContext: CustomizationType = {
      ...customization,
      ...context,
    }

    if (isValidCustomization(newContext)) {
      setCustomization(newContext);
    } else {
      console.warn("Invalid customization:", context);
    }
  };

  return (
    <CustomizationContext.Provider value={{customization, onSetCustomization, customizationImgs}}>
      {children}
      </CustomizationContext.Provider>
  )
}