import React from "https://esm.sh/react@19.2.0";
import { SectionLabel } from "../atoms/SectionLabel.js";
import { ProjectCard } from "../molecules/ProjectCard.js";

export function ProjectsPanel({ projects }) {
  return React.createElement("section", { className: "saved-projects" },
    React.createElement(SectionLabel, null, "Proyectos guardados"),
    React.createElement("div", { className: "project-shelf" },
      projects.map((item, idx) => React.createElement(ProjectCard, { key: `${item.title}-${idx}`, item }))
    )
  );
}
