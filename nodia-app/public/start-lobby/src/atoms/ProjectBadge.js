import React from "https://esm.sh/react@19.2.0";

export function ProjectBadge({ kind, children }) {
  return React.createElement("span", { className: `project-badge ${kind}` }, children);
}
