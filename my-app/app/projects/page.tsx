import Projects from "@/components/projects/projects";
import { ProjectProvider } from "@/context/ProjectContext";

export default function ProjectsPage() {
  return (
    <ProjectProvider>
      <Projects />
    </ProjectProvider>
  );
}
