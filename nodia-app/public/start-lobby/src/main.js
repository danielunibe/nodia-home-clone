import React from "https://esm.sh/react@19.2.0";
import { createRoot } from "https://esm.sh/react-dom@19.2.0/client";
import { LobbyLayout } from "./templates/LobbyLayout.js";
import { worlds, optionOrder, projects } from "./data/worlds.js";

function App() {
  const [currentWorld, setCurrentWorld] = React.useState("ethyria");

  React.useEffect(() => {
    document.body.dataset.world = currentWorld;
  }, [currentWorld]);

  return React.createElement(LobbyLayout, {
    currentWorld,
    worlds,
    order: optionOrder,
    projects,
    onSelect: setCurrentWorld
  });
}

const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));
