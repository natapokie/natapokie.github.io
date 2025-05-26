"use client";

import { createContext, useContext, useState } from "react";

type ProjectContextType = {
  selectedProject: number;
  setSelectedProject: (index: number) => void;
  showAllProjects: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedProject, setSelectedProject] = useState(-1);

  const showAllProjects = () => setSelectedProject(-1);

  return (
    <ProjectContext.Provider
      value={{ selectedProject, setSelectedProject, showAllProjects }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
