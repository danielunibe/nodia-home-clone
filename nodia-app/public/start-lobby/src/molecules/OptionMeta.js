import React from "https://esm.sh/react@19.2.0";

export function OptionMeta({ active }) {
  return React.createElement("div", { className: "option-cta" }, active ? "Seleccionado" : "Entrar");
}
