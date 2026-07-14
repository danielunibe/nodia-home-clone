import React from "https://esm.sh/react@19.2.0";
import { WorldCircle } from "../molecules/WorldCircle.js";

export function WorldVisual({ currentWorld }) {
  return React.createElement("div", { className: `world-stage world-${currentWorld}` },
    React.createElement("div", { className: "world-cluster" },
      React.createElement(WorldCircle)
    )
  );
}
