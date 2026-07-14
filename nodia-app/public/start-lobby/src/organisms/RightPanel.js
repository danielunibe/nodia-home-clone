import React from "https://esm.sh/react@19.2.0";
import { WorldVisual } from "../organisms/WorldVisual.js";
import { ProjectsPanel } from "../organisms/ProjectsPanel.js";

export function RightPanel({ currentWorld, projects }) {
  const showProjects = currentWorld === "ethyria";
  const cls = showProjects ? "right with-projects" : "right solo-circle";

  return React.createElement("section", { className: cls },
    React.createElement(WorldVisual, { currentWorld }),
    showProjects ? React.createElement(ProjectsPanel, { projects }) : null
  );
}
