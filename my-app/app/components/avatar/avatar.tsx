import Image from 'next/image';
import styles from './avatar.module.css';
import base from '../../../public/avatar/base.svg';
import shirt from '../../../public/avatar/shirt.svg';
import hair1 from '../../../public/avatar/hair-1.svg';
import bangs1 from '../../../public/avatar/bangs-1.svg';
import sides from '../../../public/avatar/side.svg';
import eyeRightOpen from '../../../public/avatar/eye-r-open.svg';
import eyeLeftOpen from '../../../public/avatar/eye-l-open.svg';
import smile from '../../../public/avatar/smile.svg';
import iris from '../../../public/avatar/iris.svg';
import eyelashRightOpen from '../../../public/avatar/eyelash-r-open.svg';
import eyelashLeftOpen from '../../../public/avatar/eyelash-l-open.svg';

export const Avatar = () => {
  return (
    <>
      <div className="relative origin-center w-[650px] h-[900px] flex justify-center items-start">
        <Image src={hair1} alt="hair" className={`absolute z-[-1] ${styles.hair1}`}></Image>
        <Image src={base} alt="base" className=""></Image>

        <Image src={shirt} alt="shirt" className={`absolute ${styles.shirt}`}></Image>
        <Image src={sides} alt="sides" className={`absolute ${styles.sides}`}></Image>
        <Image src={bangs1} alt="bangs" className={`absolute ${styles.bangs1}`}></Image>
        <Image src={eyeRightOpen} alt="eye-right" className={`absolute ${styles.eyeRight}`}></Image>
        {/* <Image src={eyeLeftOpen} alt="eye-left" className={`absolute ${styles.eyeLeft}`}></Image> */}
        <Image src={smile} alt="smile" className={`absolute ${styles.smile}`}></Image>
        {/* <Image src={iris} alt="iris-left" className={`absolute ${styles.irisLeft}`}></Image> */}
        <Image src={iris} alt="iris-right" className={`absolute ${styles.irisRight}`}></Image>
        <Image
          src={eyelashRightOpen}
          alt="eyelash-right"
          className={`absolute ${styles.eyelashRightOpen}`}
        ></Image>
        {/* <Image
          src={eyelashLeftOpen}
          alt="eyelash-left"
          className={`absolute ${styles.eyelashLeftOpen}`}
        ></Image> */}

        {/* <div className="relative"> */}
        <Image src={eyeLeftOpen} alt="eye-left" className={`absolute ${styles.eyeLeft}`}></Image>
        <Image src={iris} alt="iris-left" className={`absolute ${styles.irisLeft}`}></Image>
        <Image
          src={eyelashLeftOpen}
          alt="eyelash-left"
          className={`absolute ${styles.eyelashLeftOpen}`}
        ></Image>
        {/* </div> */}
      </div>
    </>
  );
};
