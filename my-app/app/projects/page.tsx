"use client";

import { ProjectsList } from "@/lib/static/projects";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import AllProjects from "@/components/projects/allProjects/allProjects";
import ProjectCarousel from "@/components/projects/carouselView/projectsCarousel";
// import ProjectGallery from "@/components/projects/projectGallery/projectGallery";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(-1);

  return (
    <div className="w-full h-full flex justify-center items-center page">
      {selectedProject === -1 ? (
        <AllProjects setSelectedIndex={setSelectedProject} />
      ) : (
        // <div className="relative top-[250px] grid grid-cols-2 gap-10">
        //   {ProjectsList.map((items, index) => (
        //     <div
        //       key={index}
        //       className={`flex flex-col justify-center items-center gap-8 w-[600px] h-[400px] rounded-[10px] border-[10px] border-white bg-[var(--champagne-pink)] ${styles.cardContainer}`}
        //     >
        //       <h2 className="text-[var(--liver)]">{items.name}</h2>
        //       <div className="flex flex-row justify-center items-center bg-white rounded-[100px] w-[150px] h-[150px]">
        //         {items?.icon ? (
        //           <Image src={items.icon} alt={items.name}></Image>
        //         ) : (
        //           <div>TODO ICON</div>
        //         )}
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <ProjectCarousel selectedIndex={selectedProject} />
      )}

      {/* <ProjectGallery /> */}

      {/* <h1 className="text-3xl font-bold">Projects</h1> */}
    </div>
  );
}
