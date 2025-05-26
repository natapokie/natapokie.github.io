"use client";

import AllProjects from "@/components/projects/allProjects/allProjects";
import ProjectCarousel from "@/components/projects/carouselView/projectsCarousel";
import { useProjectContext } from "@/context/ProjectContext";

export default function Projects() {
  const { selectedProject } = useProjectContext();

  return (
    <div className="w-full h-full flex justify-center items-center page">
      {selectedProject === -1 ? <AllProjects /> : <ProjectCarousel />}
    </div>
  );
}
