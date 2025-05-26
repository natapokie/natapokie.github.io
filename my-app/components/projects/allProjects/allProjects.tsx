import { ProjectsList } from "@/lib/static/projects";
import styles from "../projects.module.css";
import { useProjectContext } from "@/context/ProjectContext";

export default function AllProjects() {
  const { setSelectedProject } = useProjectContext();

  const onProjectClick = (index: number) => {
    console.log("project clicked");
    setSelectedProject(index);
  };

  return (
    <div className="h-full w-full flex justify-center items-start">
      <div className="relative top-[150px] grid grid-cols-2 gap-4">
        {ProjectsList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center w-[400px] h-[260px] rounded-[4px] border-[7px] border-white bg-[var(--champagne-pink)] p-4 shadow-sm 
              ${styles.cardContainer} 
              ${styles.pattern} 
              ${item.class ? styles[item.class] : ""}
              `}
            onClick={() => onProjectClick(index)}
          >
            <h2 className="text-[var(--liver)] text-center">{item.name}</h2>
            <div className="absolute bottom-0 left-0 p-3 w-[80%] font-bold">
              <p>{item.date}</p>
              <p>{item.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
