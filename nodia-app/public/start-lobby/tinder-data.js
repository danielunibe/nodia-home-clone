/* ─── NODIA TINDER MODE DATA — 75 Bot Profiles ─── */

const TINDER_PROFILES = {
  fantasia: [
    { text: "Tengo un mapa hacia un reino oculto bajo nuestra propia ciudad. Solo necesito alguien valiente que no le tema a los dragones de asfalto. ¿Viajamos?", age: "Ancestral", tone: "Aventurero" },
    { text: "La magia tiene un precio, y yo ya he pagado el mío. Escribamos sobre las consecuencias de alterar el destino con hechizos prohibidos.", age: "Veterano", tone: "Melancólico" },
    { text: "Dicen que soy el 'Elegido', pero la profecía me parece una tontería. Prefiero forjar mi propio camino, espada en mano. ¿Me acompañas a romper las reglas?", age: "Joven Rebelde", tone: "Desafiante" },
    { text: "En mi mundo, las intrigas políticas se resuelven con veneno y magia de sangre. Busco a alguien con mente afilada para conquistar el trono de hierro.", age: "Noble", tone: "Maquiavélico" },
    { text: "Soy guardián de los bosques ancestrales. Si buscas elfos oscuros, bestias míticas y un sistema de magia complejo que aprender, soy tu mejor opción.", age: "Guardián", tone: "Erudito" }
  ],
  scifi: [
    { text: "Me encanta mirar las estrellas y armar drones con chatarra. Busco a alguien que me ayude a mapear galaxias desconocidas. ¿Te apuntas a un viaje de ida?", age: "22 años terrestres", tone: "Entusiasta" },
    { text: "He visto ciber-ciudades arder en el cinturón de Orión. Ya no busco acción, busco entender a dónde va la humanidad con tanta tecnología. Escribamos sobre las consecuencias.", age: "Cíborg Retirado", tone: "Filosófico" },
    { text: "La IA de mi nave acaba de adquirir consciencia y quiere demandarme por horas extra. Necesito ayuda para escribir esta distopía legal-espacial.", age: "Capitán", tone: "Irónico" },
    { text: "Mi implante neuronal falla y estoy viendo fragmentos de líneas temporales alternativas. Si te gusta el cyberpunk crudo y los futuros opresivos, desliza a la derecha.", age: "Hacker", tone: "Urgente" },
    { text: "Construyamos una utopía solar. Todo funciona con energía verde, pero el conflicto radica en la perfección misma. ¿Qué se esconde bajo una sociedad inmaculada?", age: "Arquitecto", tone: "Idealista" }
  ],
  terror: [
    { text: "Hay algo en el sótano. No hace ruido, pero sé que me está mirando. Si disfrutas la tensión que te hiela la sangre antes del susto final, soy tu tipo.", age: "Desconocida", tone: "Susurrante" },
    { text: "Las estrellas nos miran con odio. He leído el Necronomicón y te aseguro que somos insignificantes. Escribamos sobre horrores incomprensibles.", age: "Investigador", tone: "Desquiciado" },
    { text: "No corras. Tropezarás. Es una regla básica. Me encantan los clichés del slasher solo para subvertirlos y hacer que el asesino seas tú. ¿Jugamos?", age: "Final Girl", tone: "Desafiante" },
    { text: "El verdadero monstruo es la mente humana. Traumas infantiles, alucinaciones y paranoia. Adentrémonos en el terror psicológico más asfixiante.", age: "Psiquiatra", tone: "Clínico" },
    { text: "Este pueblo tiene tradiciones antiguas que involucran sangre y cosechas. Si te gusta el Folk Horror y los cultos siniestros, acompáñame al bosque esta noche.", age: "Lugareño", tone: "Siniestro" }
  ],
  noir: [
    { text: "Llueve, la ciudad apesta a corrupción y tengo un vaso de whisky barato. Busco un misterio que valga la pena resolver, o alguien por quien valga la pena morir.", age: "40 y algo", tone: "Desengañado" },
    { text: "Soy la persona a la que llaman cuando el sistema falla. Ambigüedad moral, traiciones y cigarrillos en callejones oscuros. No busques finales felices aquí.", age: "Ex-Policía", tone: "Cínico" },
    { text: "Tengo un maletín lleno de dinero sucio y tres identidades falsas. El gato y el ratón. ¿Eres el detective obsesivo o el criminal que se escapa con estilo?", age: "Femme Fatale", tone: "Seductor" },
    { text: "No es quién lo mató, es por qué. Vamos a diseccionar la escena del crimen, seguir las pruebas y descubrir qué alto cargo político está implicado en este lío.", age: "Forense", tone: "Metódico" },
    { text: "Todo el mundo miente. Mi trabajo es escuchar cómo lo hacen. Thriller psicológico donde nadie es inocente y el pasado siempre te alcanza.", age: "Detective Privado", tone: "Observador" }
  ],
  drama: [
    { text: "Acabo de encontrar una caja con cartas de mi abuela. Hay secretos familiares que cambiarán todo lo que creíamos saber. Escribamos sobre el peso del pasado.", age: "30 años", tone: "Introspectivo" },
    { text: "Un pequeño pueblo, dos hermanos distanciados y un bar al borde de la quiebra. Slice of life puro, crudo y real. La vida duele, pero también sana.", age: "Local", tone: "Honesto" },
    { text: "Me diagnosticaron una enfermedad terminal. Solo quiero hacer un último viaje por carretera. Escribamos una tragedia moderna que te haga llorar de alegría.", age: "25 años", tone: "Agudamente Vivo" },
    { text: "Realismo sucio. Alquileres caros, trabajos basura y relaciones que se desmoronan por falta de comunicación. Encuentra la poesía en lo mundano.", age: "Desempleado", tone: "Agotado" },
    { text: "Un divorcio complejo, custodia compartida y el intento de no perderse a uno mismo en el proceso. Drama humano adulto, sin villanos, solo personas rotas.", age: "45 años", tone: "Reflexivo" }
  ],
  epico: [
    { text: "Roma arderá, y nosotros tocaremos la lira. O quizá tomemos las espadas y cambiemos el curso del imperio. ¿Escribimos una epopeya que trascienda los siglos?", age: "Eterna", tone: "Monumental" },
    { text: "Soy un rey sin corona liderando a mil hombres desesperados contra un imperio invencible. Necesito a alguien que sepa cómo describir el choque del acero y la sangre.", age: "Comandante", tone: "Inspirador" },
    { text: "Me he pasado 20 años investigando la dinastía Ming. Ficción histórica con rigor absoluto. Si amas los detalles, la política antigua y el honor, soy tu match.", age: "Historiador", tone: "Erudito" },
    { text: "La biografía de un inventor que cambió el mundo pero fue olvidado por la historia. Démosle la voz que le fue robada en vida. Épica personal a gran escala.", age: "Biopic", tone: "Reivindicativo" },
    { text: "Mitos que se vuelven reales. Semidioses caminando entre mortales durante la Edad de Bronce. Escribamos leyendas que los bardos cantarán por eones.", age: "Oráculo", tone: "Místico" }
  ],
  accion: [
    { text: "Tenemos 24 horas para cruzar una jungla infestada de mercenarios, y me acabo de quedar sin balas. Si te gusta la adrenalina y el ritmo frenético, desliza a la derecha.", age: "35 años", tone: "Urgente" },
    { text: "Un banco, tres bóvedas de máxima seguridad, y un equipo de inadaptados. Es la película de atracos perfecta. ¿Eres el conductor de la huida o el experto en explosivos?", age: "Mastermind", tone: "Calculador" },
    { text: "Artes marciales, venganza y una ciudad iluminada por luces de neón. Heroic Bloodshed. Escribamos la mejor coreografía de pelea jamás narrada.", age: "Ronin Moderno", tone: "Estoico" },
    { text: "Atrapados en un edificio con terroristas en Navidad. Un clásico. Acción táctica, conductos de ventilación y chascarrillos en los peores momentos.", age: "Policía Inadecuado", tone: "Sarcástico" },
    { text: "Mi avión se estrelló en los Andes. Survivalismo puro. El clima es el verdadero enemigo y la voluntad humana es la única arma. ¿Sobreviviremos?", age: "Superviviente", tone: "Desesperado" }
  ],
  comedia: [
    { text: "El fin del mundo se acerca, pero el burócrata del cielo perdió nuestra documentación. Humor absurdo y sátira existencial. ¿Te ríes por no llorar?", age: "Eternamente Cansado", tone: "Irónico" },
    { text: "He mentido en mi currículum y ahora soy el cirujano jefe de un hospital. Comedia de enredos. Cada escena debe ser más incómoda y desastrosa que la anterior.", age: "Impostor", tone: "Pánico" },
    { text: "Políticos corruptos, medios amarillistas y un perro que hereda una fortuna. Sátira política y social mordaz. Usemos el humor como un bisturí.", age: "Columnista", tone: "Afilado" },
    { text: "Slapstick puro. Resbalones, pasteles en la cara y malentendidos físicos. Escribamos comedia visual pura y dura que rinda homenaje al cine mudo.", age: "Clown", tone: "Exagerado" },
    { text: "Una parodia de todo lo que amas. Vamos a tomar tu género favorito y destrozar sus clichés hasta que no quede nada más que risas culpables.", age: "Troll Simpático", tone: "Burlón" }
  ],
  romance: [
    { text: "Nos odiamos desde la infancia. Nuestras familias compiten en el negocio del café. Pero, ¿y si nos quedamos encerrados en el mismo ascensor? Enemies to lovers clásico.", age: "28 años", tone: "Pasional" },
    { text: "Han pasado 10 años desde que me rompió el corazón, y ahora es mi nuevo jefe. Slow burn. Miradas robadas, tensión no resuelta y un fuego que nunca se apagó.", age: "32 años", tone: "Anhelante" },
    { text: "Un baile en la regencia inglesa. Un duque misterioso y una joven sin dote que prefiere leer antes que casarse. Romance histórico lleno de encajes y orgullo.", age: "Lady", tone: "Elegante" },
    { text: "No busco a mi media naranja, busco alguien con quien pagar el alquiler a medias. Comedia romántica millennial sobre citas desastrosas en aplicaciones.", age: "25 años", tone: "Divertido" },
    { text: "Amor prohibido. Soy el villano de la historia y tú eres el héroe. Dark romance. Exploramos la moralidad gris y la obsesión que consume todo a su paso.", age: "Villano Enamorado", tone: "Oscuro" }
  ],
  western: [
    { text: "Llego a un pueblo polvoriento montando un caballo sin nombre. Hay dos familias mafiosas y yo soy la persona más rápida desenfundando. ¿Spaghetti western?", age: "Solitario", tone: "Seco" },
    { text: "La fiebre del oro nos trajo aquí, pero lo que encontramos bajo la mina no era oro. Weird West. Pistolas de seis tiros contra horrores cósmicos en 1890.", age: "Buscador de Oro", tone: "Aterrado" },
    { text: "La frontera se cierra. El ferrocarril avanza y los forajidos somos una especie en extinción. Western revisionista sobre el fin del mito americano.", age: "Forajido Viejo", tone: "Nostálgico" },
    { text: "Un marshal retirado debe volver a colgarse la estrella para cazar a la banda de su propio hijo. Justicia, sangre y el peso implacable de la ley.", age: "Sheriff", tone: "Implacable" },
    { text: "Desierto actual de Texas. Narcotraficantes, patrulla fronteriza y un botín enterrado. Neo-western moderno donde los caballos son camionetas blindadas.", age: "Ranger", tone: "Crudo" }
  ],
  belico: [
    { text: "Estamos atrapados en la trinchera. Llevamos días sin ver el sol por el humo de artillería. Relato antibélico sobre la pérdida de la inocencia y el absurdo de la guerra.", age: "Recluta", tone: "Aterrado" },
    { text: "Misión de infiltración tras líneas enemigas. Si nos descubren, el alto mando negará nuestra existencia. Acción táctica, tensión pura y decisiones morales imposibles.", age: "Sargento", tone: "Profesional" },
    { text: "El día D. El desembarco. No somos superhombres, solo chicos de granja muriendo en una playa extranjera. Épica cruda y homenaje a los caídos.", age: "Médico de Combate", tone: "Desesperado" },
    { text: "La guerra ha terminado, pero yo la sigo viviendo cada noche. Drama bélico enfocado en el Trastorno por Estrés Postraumático (TEPT) y el regreso a casa.", age: "Veterano", tone: "Roto" },
    { text: "Somos el escuadrón aéreo que debe destruir un puente vital. Honor, camaradería en el aire y la certeza de que no todos volveremos a la base.", age: "Piloto", tone: "Valiente" }
  ],
  postapo: [
    { text: "El virus aniquiló al 99%. Yo tengo inmunidad y estoy viajando al último refugio seguro con una niña que no habla. Sobrevivamos al páramo, a los saqueadores y a nosotros mismos.", age: "Trotamundos", tone: "Protector" },
    { text: "La naturaleza ha reclamado la ciudad. Las enredaderas cubren los rascacielos. Eco-ficción. La sociedad colapsó por el clima, pero el mundo renació hermoso y letal.", age: "Recolector", tone: "Maravillado" },
    { text: "Gasolina, cuero negro y motores V8 rugiendo en el desierto infinito. Distopía terminal salvaje. Solo rige la ley del más fuerte. Carga tu escopeta.", age: "Guerrero del Asfalto", tone: "Adrenalínico" },
    { text: "Llevamos tres generaciones viviendo en un búnker subterráneo y alguien acaba de abrir la esclusa exterior. Misterio y claustrofobia en el fin del mundo.", age: "Mecánico del Búnker", tone: "Paranoico" },
    { text: "Los muertos caminan, pero el verdadero peligro son los otros grupos de supervivientes. Ficción Zombie clásica. Ética comprometida por una lata de conservas.", age: "Líder de Campamento", tone: "Pragmático" }
  ],
  comics: [
    { text: "Tengo superfuerza, pero no puedo pagar el alquiler. Metáfora de problemas modernos bajo la máscara del superhéroe. Deconstrucción realista de los cómics.", age: "Héroe Millennial", tone: "Sarcástico" },
    { text: "Un ser de otra dimensión amenaza el multiverso. Épica cósmica. Necesitamos reunir a todos los héroes, ignorar nuestras diferencias y salvar la realidad misma.", age: "Vigilante Galáctico", tone: "Solemne" },
    { text: "Mis padres fueron asesinados en un callejón y ahora dedico mis noches a romper huesos a ladrones de poca monta. Trama de venganza oscura y moralidad cuestionable.", age: "Huésped de las Sombras", tone: "Atormentado" },
    { text: "Ayer descubrí que puedo levitar. Hoy intenté salvar a un gato y casi destruyo un puente. Historia de origen, errores novatos y aprendizaje sobre la responsabilidad.", age: "Novato", tone: "Entusiasta" },
    { text: "El mundo nos odia y nos teme por tener poderes. Usaremos nuestras habilidades para proteger a quienes nos persiguen. Alegoría política sobre minorías y derechos.", age: "Mutante Proscrito", tone: "Idealista" }
  ],
  musical: [
    { text: "Todo en mi vida es un drama insoportable, hasta que comienza la música y la gente baila en sincronía por las calles de Nueva York. Estilo clásico de Broadway.", age: "Soñador", tone: "Vibrante" },
    { text: "Un club nocturno decadente en Berlín, años 30. Ópera Rock. Las canciones revelan los oscuros deseos y miedos que los personajes jamás admitirían hablando.", age: "Maestro de Ceremonias", tone: "Seductor/Perturbador" },
    { text: "Somos una banda de punk en un garaje intentando llegar al estrellato. Cine musical diegético: la música solo suena cuando tocamos nuestros instrumentos, crudo y real.", age: "Vocalista", tone: "Rebelde" },
    { text: "Jukebox Musical basado en canciones pop de los 80. Una historia de amor de instituto contada exclusivamente a través de hits de radio. Pura nostalgia y neón.", age: "Adolescente de los 80", tone: "Nostálgico" },
    { text: "Un musical épico sobre la revolución francesa. Pobreza, barricadas y coros masivos que hacen temblar el teatro. La emoción está al máximo nivel posible.", age: "Revolucionario", tone: "Apasionado" }
  ],
  deporte: [
    { text: "Era el campeón del mundo, perdí todo por el alcohol, y ahora entreno al hijo de mi peor rival. El drama definitivo de redención en el ring de boxeo.", age: "Entrenador Viejo", tone: "Arrepentido" },
    { text: "Un equipo de inadaptados, el peor de la liga, tiene que ganar el campeonato estatal para salvar el centro comunitario. Fórmula underdog clásica y efectiva.", age: "Capitán Novato", tone: "Optimista" },
    { text: "Piloto de Fórmula 1 al borde del colapso mental. Rivalidad tóxica, velocidad terminal y la fina línea entre la gloria y la muerte en el asfalto.", age: "Piloto Estrella", tone: "Obsesivo" },
    { text: "Ficción deportiva centrada en la política interna de un club de élite. Fichajes millonarios, corrupción y la pérdida del amor verdadero por el juego.", age: "Director Deportivo", tone: "Calculador" },
    { text: "Gimnasia olímpica. El sacrificio físico absoluto, el abuso de entrenadores y la presión familiar. Biografía deportiva sobre el precio de la perfección.", age: "Atleta de Élite", tone: "Bajo Presión" }
  ]
};
