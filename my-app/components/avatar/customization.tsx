import { useEffect, useState } from 'react';
import { CustomizationOptions } from '@/lib/static/customize';
import {
  useCustomizationContext,
} from '@/context/CustomizationContext';
import {
  BubbleMenu,
  BubbleMenuStyle,
} from '@/components/common/bubbleMenu/bubbleMenu';
import styles from './customization.module.css';
import Image from 'next/image';
import CheckIcon from "@/public/icons/check-icon.svg";
import {CustomizationCategory} from "@/lib/types/avatar";

export const CustomizationWindow = () => {
  const { customization, onSetCustomization } = useCustomizationContext();

  const [category, setCategory] = useState<CustomizationCategory>("hairstyle");
  const [optionIndices, setOptionIndices] = useState<number[]>([0]);

  const customBubbleStyles: BubbleMenuStyle = {
    label: {
      fontColor: 'var(--bittersweet-shimmer)',
      backgroundColor: 'var(--seashell)',
    },
    bubble: {
      backgroundColor: 'var(--bittersweet-shimmer)',
    },
    menu: {
      transform: 'scale(0.85)',
    },
  };

  useEffect(() => {
    // load the selected options
    setOptionIndices(
        Array.isArray(customization[category])
          ? customization[category]
          : [customization[category]]
      );

  }, [category]);

  useEffect(() => {
    onSetCustomization({
      [category]: CustomizationOptions[category]?.multi
        ? optionIndices
        : optionIndices[0],
    });
  }, [optionIndices]);

  const onCategorySelect = (selectedCategory: CustomizationCategory) => {
    setCategory(selectedCategory);
  };

  const onSingleOptionSelect = (i: number) => {
    console.log('single option', i);
    setOptionIndices([i]);
  };
  const onMultiOptionSelect = (i: number) => {
    if (optionIndices.includes(i)) {
      // if state already includes index, remove
      setOptionIndices(curr => curr.filter(val => val !== i));
    } else {
      // add state
      setOptionIndices(curr => [...curr, i]);
    }
  };

  return (
    <div className="absolute w-full h-full grid place-content-center">
      <div className="relative inset-0 sm:left-[-100%] w-[340px] h-[500px] bg-[var(--cavern-pink)] flex flex-col justify-start items-center rounded-[100px] px-[40px] pt-[25px] pb-[60px] gap-y-[20px]">
        <BubbleMenu
          menuItems={CustomizationOptions}
          customStyles={customBubbleStyles}
          onMenuSelect={category => onCategorySelect(category as CustomizationCategory)}
        ></BubbleMenu>
        <div className="w-full h-full flex justify-start overflow-y-auto">
          <div className="w-full h-fit grid grid-cols-2 gap-4 p-[10px]">
            {CustomizationOptions[category].options.map((option, index) => (
              <div
                key={index}
                className={`${styles.optionBox} ${optionIndices.includes(index) ? styles.optionBoxSelected : ''}`}
                onClick={() =>
                  CustomizationOptions[category]?.multi
                    ? onMultiOptionSelect(index)
                    : onSingleOptionSelect(index)
                }
              >
                {
                  CustomizationOptions[category].multi ? optionIndices.includes(index) ? <div className={styles.checkIconContainer}>
                    <span className={styles.checkIconText}>{optionIndices.indexOf(index) + 1}</span>
                    </div> : <></>
                     : optionIndices.includes(index) ? (
                    <div className={styles.checkIconContainer}>
                      <Image
                        alt="check-icon"
                        src={CheckIcon}
                        className={styles.checkIcon}
                      ></Image>
                    </div>
                  ) : <></>
                }

                <Image
                  alt={option.label}
                  src={option.icon}
                  className={styles.optionImage}
                ></Image>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
