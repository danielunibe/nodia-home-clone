import React from "https://esm.sh/react@19.2.0";
import { Kicker } from "../atoms/Kicker.js";

const ICONS = {
  arrow_up_circle: "↟",
  plus_square: "+",
  sparkles: "✦"
};

export function OptionCard({ world, active, onSelect }) {
  const iconGlyph = ICONS[world.option.icon] ?? "✦";
  const accent = world.option.accentColor ?? "#C5A367";
  const buttonStyle = active
    ? {
        backgroundColor: accent,
        boxShadow: `0 16px 36px -10px ${accent}66, inset 0 2px 4px rgba(255,255,255,0.38), inset 0 0 0 1px rgba(255,255,255,0.18)`
      }
    : {
        backgroundColor: "rgba(255,255,255,0.02)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.06)"
      };

  const cls = active ? "interface-button active" : "interface-button";

  return React.createElement("button", { className: cls, type: "button", onClick: () => onSelect(world.id) },
    React.createElement("div", { className: "interface-button-frame", style: buttonStyle },
      React.createElement("div", { className: "interface-button-shine", "aria-hidden": "true" }),
      React.createElement("div", { className: "interface-button-content" },
        React.createElement("div", { className: "interface-icon-wrap" },
          React.createElement("span", { className: "interface-icon-glyph", "aria-hidden": "true" }, iconGlyph)
        ),
        React.createElement("div", { className: "interface-main-copy" },
          React.createElement(Kicker, null, world.option.kicker),
          React.createElement("div", { className: "option-title" }, world.option.title),
          React.createElement("div", { className: "option-sub" }, world.option.sub)
        ),
        React.createElement("div", { className: "interface-action-wrap" },
          React.createElement("span", { className: "interface-action-text" }, world.option.actionText ?? "Entrar"),
          React.createElement("div", { className: "interface-action-icon" },
            React.createElement("span", { "aria-hidden": "true" }, "→")
          )
        )
      )
    )
  );
}
