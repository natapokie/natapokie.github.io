import { ProjectsList } from "@/lib/static/projects";
import Image from "next/image";
import styles from "../projects.module.css";

type AllProjectsProps = {
  setSelectedIndex: (index: number) => void;
};

export default function AllProjects({ setSelectedIndex }: AllProjectsProps) {
  const onProjectClick = (index: number) => {
    console.log("project clicked");
    setSelectedIndex(index);
  };

  return (
    <div className="relative top-[250px] grid grid-cols-2 gap-10">
      {ProjectsList.map((items, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center items-center gap-8 w-[600px] h-[400px] rounded-[10px] border-[10px] border-white bg-[var(--champagne-pink)] ${styles.cardContainer}`}
          onClick={() => onProjectClick(index)}
        >
          <h2 className="text-[var(--liver)]">{items.name}</h2>
          <div className="flex flex-row justify-center items-center bg-white rounded-[100px] w-[150px] h-[150px]">
            {items?.icon ? (
              <Image src={items.icon} alt={items.name}></Image>
            ) : (
              <div>TODO ICON</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
