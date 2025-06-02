import styles from "./header.module.css";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <div className="absolute top-0 flex flex-col items-center justify-center w-full h-fit z-[2]">
      <div className="w-full bg-[var(--seashell)] text-[var(--liver)] flex justify-center items-center pt-[15px] pb-[10px]">
        <h2>{title}</h2>
      </div>
      <div className="flex flex-row justify-center items-center">
        {Array.from({ length: 13 }).map((e, index) => (
          <div key={index} className={styles.headerDecorator}></div>
        ))}
      </div>
    </div>
  );
}
