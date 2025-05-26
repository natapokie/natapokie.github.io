// "use client";

// import { ProjectsList } from "@/lib/static/projects";
// import Image from "next/image";
// import styles from "./page.module.css";
// import { useState } from "react";
// import AllProjects from "@/components/projects/allProjects/allProjects";
// import ProjectCarousel from "@/components/projects/carouselView/projectsCarousel";

// export default function Projects() {
//   const [selectedProject, setSelectedProject] = useState(-1);

//   const onShowAllProjects = () => {
//     setSelectedProject(-1);
//   };

//   return (
//     <div className="w-full h-full flex justify-center items-center page">
//       {selectedProject === -1 ? (
//         <AllProjects setSelectedIndex={setSelectedProject} />
//       ) : (
//         <ProjectCarousel
//           selectedIndex={selectedProject}
//           onShowAllProjects={onShowAllProjects}
//         />
//       )}
//     </div>
//   );
// }

import Projects from "@/components/projects/projects";
import { ProjectProvider } from "@/context/ProjectContext";

export default function ProjectsPage() {
  return (
    <ProjectProvider>
      <Projects />
    </ProjectProvider>
  );
}
