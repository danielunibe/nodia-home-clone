import React from "https://esm.sh/react@19.2.0";
import { HeaderBar } from "../organisms/HeaderBar.js";
import { LeftPanel } from "../organisms/LeftPanel.js";
import { RightPanel } from "../organisms/RightPanel.js";

export function LobbyLayout({ currentWorld, worlds, order, projects, onSelect }) {
  return React.createElement("div", { className: "app" },
    React.createElement("div", { className: "bg-pattern", "aria-hidden": "true" }),
    React.createElement(HeaderBar),
    React.createElement("main", { className: "main" },
      React.createElement(LeftPanel, { currentWorld, worlds, order, onSelect }),
      React.createElement(RightPanel, { currentWorld, projects })
    )
  );
}
