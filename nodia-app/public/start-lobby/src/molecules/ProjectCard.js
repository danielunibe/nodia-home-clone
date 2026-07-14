import React from "https://esm.sh/react@19.2.0";
import { ProjectBadge } from "../atoms/ProjectBadge.js";

export function ProjectCard({ item }) {
  return React.createElement("button", { className: "project-card", type: "button" },
    React.createElement("div", { className: "project-top" },
      React.createElement(ProjectBadge, { kind: "type" }, item.type),
      React.createElement(ProjectBadge, { kind: "status" }, item.status)
    ),
    React.createElement("strong", null, item.title),
    React.createElement("span", null, item.sub),
    item.meta ? React.createElement("em", null, item.meta) : null
  );
}
