import { useState } from 'react';
import { CustomizationOptions } from '@/lib/static/customize';
import { useCustomizationContext } from '@/context/CustomizationContext';

export const CustomizationWindow = () => {
  const { customization, setCustomization } = useCustomizationContext();
  const [categoryIdx, setCategoryIdx] = useState(0);

  const onCategorySelect = (i: number) => {
    console.log('category selected', i)
    setCategoryIdx(i);
  }

  const onOptionSelect = (i: number) => {
    console.log('option selected', i, CustomizationOptions[categoryIdx].options[i]);

    const parseCategory = CustomizationOptions[categoryIdx].label.toLowerCase();
    setCustomization(prev => ({
      ...prev,
      [parseCategory]: i,
    }));
  }

  return(
    <div className="w-full h-full">
    <div className="absolute w-[250px] h-[250px] bg-amber-200 flex flex-col justify-start items-center">
    customization window

      <div className="flex flex-row">
        {CustomizationOptions.map((category, index) => (<div key={index} onClick={() => onCategorySelect(index)}>
          {category.label}
        </div>))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {CustomizationOptions[categoryIdx].options.map((option, index) => (<div key={index} onClick={() => onOptionSelect(index)}>{option.label}</div>))}
      </div>
    </div>
    </div>
  )
}