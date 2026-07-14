import React from "https://esm.sh/react@19.2.0";
import { AppLogo } from "../atoms/AppLogo.js";
import { TopNav } from "../molecules/TopNav.js";

export function HeaderBar() {
  return React.createElement("header", { className: "header" },
    React.createElement(AppLogo),
    React.createElement(TopNav)
  );
}
