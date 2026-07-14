import React from "https://esm.sh/react@19.2.0";

export function Kicker({ children }) {
  return React.createElement("span", { className: "option-kicker" }, children);
}
