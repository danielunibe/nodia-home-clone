export const worlds = {
  ethyria: {
    id: "ethyria",
    greeting: "Tu historia sigue viva.",
    title: "Sigamos justo donde te quedaste.",
    subtitle: "Retoma tu avance con calma: escena, ritmo y decisiones te están esperando.",
    option: {
      kicker: "Continuar",
      title: "Continuar historia",
      sub: "Abre tu último avance y sigue escribiendo.",
      actionText: "Entrar",
      icon: "arrow_up_circle",
      accentColor: "#C5A367"
    },
    project: "Proyecto activo"
  },
  nuevo: {
    id: "nuevo",
    greeting: "Todo gran mundo empieza hoy.",
    title: "Vamos a crear algo nuevo.",
    subtitle: "Construimos base narrativa, tono y dirección para que empieces con claridad.",
    option: {
      kicker: "Nuevo",
      title: "Crear proyecto nuevo",
      sub: "Inicia un mundo desde cero con estructura base.",
      actionText: "Crear",
      icon: "plus_square",
      accentColor: "#D3D4D6"
    },
    project: "Nuevo proyecto"
  },
  idea: {
    id: "idea",
    greeting: "Una chispa basta para empezar.",
    title: "Probemos una idea rápida.",
    subtitle: "Escribe sin presión y la convertimos en escena, estructura y siguientes pasos.",
    option: {
      kicker: "Idea",
      title: "Explorar idea rápida",
      sub: "Captura una idea y conviértela en escena.",
      actionText: "Escribir",
      icon: "sparkles",
      accentColor: "#A794D8"
    },
    project: "Idea rápida"
  }
};

export const optionOrder = ["ethyria", "nuevo", "idea"];

export const projects = [
  { title: "Proyecto activo", type: "Mundo", status: "En curso", sub: "Interactivo · Poe", meta: "Escena inicial · ritmo pendiente" },
  { title: "Proyecto Boreal", type: "Guion", status: "Borrador", sub: "Acto I", meta: "Conflicto presentado · sin clímax" },
  { title: "Rama Ceniza", type: "Questline", status: "Revisión", sub: "Ruta B", meta: "Decisión clave · consecuencia abierta" },
  { title: "+ Nuevo proyecto", type: "Crear", status: "Vacío", sub: "Historia, juego o universo", meta: "" }
];
