import React from "https://esm.sh/react@19.2.0";

export function OptionIcon({ glyph }) {
  return React.createElement("div", { className: "option-icon", "aria-hidden": "true" }, glyph);
}
