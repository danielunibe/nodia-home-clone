import React from "https://esm.sh/react@19.2.0";
import { HeroText } from "../molecules/HeroText.js";
import { OptionCard } from "../molecules/OptionCard.js";

export function LeftPanel({ currentWorld, worlds, order, onSelect }) {
  const data = worlds[currentWorld];
  return React.createElement("section", { className: "left" },
    React.createElement("div", { className: "left-content" },
      React.createElement(HeroText, {
        greeting: data.greeting,
        title: data.title,
        subtitle: data.subtitle,
        worldKey: currentWorld
      })
    ),
    React.createElement("div", { className: "left-actions" },
      React.createElement("div", { className: "world-actions" },
        order.map((id) => React.createElement(OptionCard, {
          key: id,
          world: worlds[id],
          active: id === currentWorld,
          onSelect
        }))
      )
    )
  );
}
