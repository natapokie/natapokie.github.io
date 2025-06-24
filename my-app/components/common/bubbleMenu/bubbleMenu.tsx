import { IBubbleMenuItem } from '@/lib/types/common';
import styles from './bubbleMenu.module.css';
import { useState } from 'react';
import Image from 'next/image';

export type BubbleMenuStyle = {
  label?: {
    fontColor?: string;
    backgroundColor?: string;
  };
  bubble?: {
    backgroundColor?: string;
  };
  menu?: {
    transform?: string;
  };
};

type BubbleMenuProps = {
  menuItems: Record<string, IBubbleMenuItem>;
  onMenuSelect?: (key: string) => void;
  customStyles?: BubbleMenuStyle;
};

export function BubbleMenu({ menuItems, onMenuSelect, customStyles }: BubbleMenuProps) {
  const [selected, setSelected] = useState<string>(Object.keys(menuItems)[0]);

  const onMenuItemClick = (key: string) => {
    setSelected(key);
    onMenuSelect?.(key);
  };

  return (
    <div
      className="flex flex-row justify-center items-center"
      style={{ transform: customStyles?.menu?.transform ?? '' }}
    >
      {Object.entries(menuItems).map(([key, item]) => (
        <div
          key={key}
          onClick={() => onMenuItemClick(key)}
          className={`${styles.menuItem} ${
            selected === key ? styles.menuItemSelected : ''
          }`}
          style={{
            backgroundColor:
              customStyles?.bubble?.backgroundColor ?? 'var(--champagne-pink)',
          }}
        >
          <Image
            src={item.icon}
            alt={item.label}
            className={styles.menuItemIcon}
          ></Image>
          {selected === key && (
            <div
              className={styles.menuItemHeader}
              style={{
                backgroundColor:
                  customStyles?.label?.backgroundColor ?? 'var(--redwood)',
                color: customStyles?.label?.fontColor ?? 'var(--white)',
              }}
            >
              {item.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
