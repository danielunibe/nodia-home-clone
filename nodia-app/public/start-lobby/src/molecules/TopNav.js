import React from "https://esm.sh/react@19.2.0";
import { NavLink } from "../atoms/NavLink.js";

export function TopNav() {
  const links = ["Biblioteca", "Plantillas", "Ayuda", "Ajustes"];
  return React.createElement("nav", { className: "nav", "aria-label": "Navegación principal" },
    links.map((label) => React.createElement(NavLink, { key: label, label }))
  );
}
