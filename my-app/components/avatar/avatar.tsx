'use client';

import Image, { StaticImageData } from 'next/image';
import styles from './avatar.module.css';
import { RefObject, useEffect, useRef, useState } from 'react';
import { IAvatarEye } from '@/lib/types/avatar';
import {
  EyeLeft,
  EyeRight,
  EyeState,
  Iris,
  MouthStyles,
  Neck,
  Skin,
} from '@/lib/static/avatar';
import { useCustomizationContext } from '@/context/CustomizationContext';

export const AvatarHandler = () => {
  return (
    <>
      <div className="w-full h-full flex justify-between items-center py-[80px] px-[20px] md:py-[60px] md:px-0">
        <Avatar></Avatar>
      </div>
    </>
  );
};

const Avatar = () => {
  const { customizationImgs } = useCustomizationContext();
  const [mouth, setMouth] = useState<StaticImageData>(MouthStyles.smile);
  const [baseLoaded, setBaseLoaded] = useState<{ [key: string]: boolean }>({
    rightEye: false,
    leftEye: false,
    neck: false,
    skin: false,
    mouth: false,
  });
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    const allTrue = Object.values(baseLoaded).every(Boolean);
    setAllLoaded(allTrue);
  }, [baseLoaded]);

  const onImageLoad = (part?: string) => {
    console.log('onImageLoad');
    if (part) {
      setBaseLoaded(prev => ({ ...prev, [part]: true }));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center relative origin-center w-full h-full max-h-[430px] md:max-h-[650px]">
        <Image
          src={customizationImgs.hairstyle.hairBack}
          alt="hair-back"
          className={styles.base}
          onLoad={() => onImageLoad()}
        ></Image>
        <Image
          src={Neck}
          alt="nexk"
          className={styles.base}
          onLoad={() => onImageLoad('neck')}
        ></Image>
        <Image
          src={customizationImgs.shirt}
          alt="shirt"
          className={styles.base}
          onLoad={() => onImageLoad()}
        ></Image>
        {customizationImgs.hairstyle?.hairMiddle && (
          <Image
            src={customizationImgs.hairstyle.hairMiddle}
            alt="skin"
            className={styles.base}
            onLoad={() => onImageLoad()}
          ></Image>
        )}
        <Image
          src={Skin}
          alt="skin"
          className={styles.base}
          onLoad={() => onImageLoad('skin')}
        ></Image>
        <Image
          src={mouth}
          alt="smile"
          className={styles.base}
          onLoad={() => onImageLoad('mouth')}
        ></Image>

        <Eye
          irisImg={Iris.left}
          eyeMap={EyeLeft}
          onFinishLoad={() => onImageLoad('leftEye')}
        />
        <Eye
          irisImg={Iris.right}
          eyeMap={EyeRight}
          onFinishLoad={() => onImageLoad('rightEye')}
        />

        <Image
          src={customizationImgs.hairstyle.hairSide}
          alt="hair-side"
          className={styles.base}
          onLoad={e => onImageLoad()}
        ></Image>
        <Image
          src={customizationImgs.hairstyle.hairFront}
          alt="hair-front"
          className={styles.base}
          onLoad={e => onImageLoad()}
        ></Image>

        {customizationImgs.accessories.map((accessory, index) => {
          return (
            <Image
              key={index}
              src={accessory}
              alt="accessory"
              className={styles.base}
              onLoad={e => onImageLoad()}
            ></Image>
          );
        })}

        {!allLoaded && (
          <div className="w-full h-full absolute inset-0 bg-[var(--background)]">
            LOADING OVERLAY (BASICALLY A BG)
          </div>
        )}
      </div>
    </>
  );
};

interface EyeProps {
  irisImg: StaticImageData;
  eyeMap: Record<EyeState, IAvatarEye>;
  onFinishLoad: () => void;
}

const Eye = ({ irisImg, eyeMap, onFinishLoad }: EyeProps) => {
  const eyeRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: '0px', y: '0px' });
  const [eyeState, setEyeState] = useState<EyeState>(EyeState.OPEN);
  const [loadedCount, setLoadedCount] = useState(0);

  const { base, eyelash } = eyeMap[eyeState];

  const onLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (loadedCount === 3) {
      onFinishLoad();
    }
  }, [loadedCount]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (eyeState === EyeState.OPEN) {
      timeoutId = setTimeout(() => setEyeState(EyeState.CLOSING), 5000);
    } else if (eyeState === EyeState.CLOSING) {
      timeoutId = setTimeout(() => setEyeState(EyeState.CLOSED), 50);
    } else {
      timeoutId = setTimeout(() => setEyeState(EyeState.OPEN), 300);
    }

    return () => clearTimeout(timeoutId);
  }, [eyeState]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const offset = calculateIrisOffset(e.pageX, e.pageY, eyeRef, {
        x: 10,
        y: 5,
      });
      setPosition(offset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={eyeRef}>
      <Image
        src={base}
        alt="eye"
        className={`${styles.base}`}
        onLoad={onLoad}
      />
      <Image
        src={irisImg}
        alt="iris"
        className={`${styles.base}`}
        style={{
          transform: `translate(${position.x}, ${position.y})`,
          display: eyeState !== EyeState.CLOSED ? 'unset' : 'none',
        }}
        onLoad={onLoad}
      />
      {eyelash && (
        <Image
          src={eyelash}
          alt="eyelash"
          className={`${styles.base}`}
          onLoad={onLoad}
        />
      )}
    </div>
  );
};

export const calculateIrisOffset = (
  mouseX: number,
  mouseY: number,
  eyeRef: RefObject<HTMLDivElement>,
  maxOffset: { x: number; y: number }
) => {
  if (!eyeRef.current) return { x: '0px', y: '0px' };

  const rect = eyeRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = mouseX - centerX;
  const dy = mouseY - centerY;

  // Max distance you consider relevant for eye tracking
  const maxDistance = 100; // pixels from center where iris reaches max offset

  // Normalize dx and dy to range [-1, 1], with clamping
  const normalizedX = Math.max(-1, Math.min(1, dx / maxDistance));
  const normalizedY = Math.max(-1, Math.min(1, dy / maxDistance));

  return {
    x: `${normalizedX * maxOffset.x}px`,
    y: `${normalizedY * maxOffset.y}px`,
  };
};
