import React from "https://esm.sh/react@19.2.0";

export function WorldRings() {
  return React.createElement("div", { className: "rings", "aria-hidden": "true" },
    React.createElement("div", { className: "ring ring-1" }),
    React.createElement("div", { className: "ring ring-2" }),
    React.createElement("div", { className: "ring ring-3" })
  );
}
