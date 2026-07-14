import React from "https://esm.sh/react@19.2.0";

export function HeroText({ greeting, title, subtitle, worldKey }) {
  const [phase, setPhase] = React.useState("in");

  React.useEffect(() => {
    setPhase("out");
    const t = window.setTimeout(() => setPhase("in"), 160);
    return () => window.clearTimeout(t);
  }, [worldKey]);

  return React.createElement(React.Fragment, null,
    React.createElement("div", { className: "greeting" },
      React.createElement("strong", { className: "greeting-primary" }, "Buenas noches, Daniel.")
    ),
    React.createElement("div", { className: "gold-line", "aria-hidden": "true" }),
    React.createElement("div", { className: `hero-copy-lock smoke-${phase}` },
      React.createElement("h2", { className: "hero-title" }, title),
      React.createElement("p", { className: "hero-sub" }, subtitle)
    )
  );
}
