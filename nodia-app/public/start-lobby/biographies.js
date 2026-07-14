/* ─── NODIA v3.0 — biographies.js ─── */
'use strict';

const BIOGRAPHIES = {
  'fantasia': [
    { text: "Acabo de encontrar un mapa que no existía ayer. Sé que tú también lo has visto en sueños. Juntos podemos descifrar qué hay al otro lado del bosque azul antes de que se cierren los caminos. ¿Te atreves a sostener el farol conmigo?", age: "13 años", tone: "Maravilla" },
    { text: "Todo el mundo dice que la magia tiene reglas. Que el destino no se discute. Yo llevo dos años construyendo mundos donde las reglas las pone quien decide preguntar. Si tienes ganas de romper lo que está escrito, tengo un farol que ilumina lo que otros prefieren no ver.", age: "16 años", tone: "Rebelde" },
    { text: "He recorrido trece reinos y ninguno fue como imaginaba. Eso es exactamente lo bueno. La Fantasía no es escapar: es construir una lógica tan sólida que lo imposible se vuelve inevitable. Busco a alguien que quiera edificar mundos que sobrevivan al olvido.", age: "Veterana", tone: "Sabia" },
    { text: "El farol que cargo no ilumina el camino. Ilumina las preguntas que aún no has hecho. Dicen que el verdadero héroe no es el que mata al dragón, sino el que entiende por qué el dragón existe. Escríbeme un mundo donde ambos tengan razón.", age: "Atemporal", tone: "Enigmática" },
    { text: "El bosque se cierra al amanecer. No tengo tiempo para explicarte todo lo que vi: criaturas que hablan con silencio, ciudades flotantes que caen lentamente desde hace siglos. Solo necesito saber si quieres empezar desde el principio de todo.", age: "14 años", tone: "Urgente" }
  ],
  'ciencia-ficcion': [
    { text: "Me encanta mirar las estrellas y armar drones con chatarra. Busco a alguien que me ayude a mapear galaxias desconocidas. ¿Te apuntas a un viaje de ida? Mi dron-luna ya tiene las coordenadas cargadas.", age: "17 años", tone: "Entusiasta" },
    { text: "He visto ciber-ciudades arder en el cinturón de Orión. Ya no busco acción, busco entender a dónde va la humanidad con tanta tecnología. Escribamos sobre las consecuencias, no sobre la promesa.", age: "Cíborg Retirado", tone: "Filosófico" },
    { text: "El problema con el futuro es que ya llegó y nadie lo documentó bien. Trabajo en sistemas que procesan decisiones que los humanos tardaban décadas en tomar. Ahora tardo 0.003 segundos. Tengo mucho que contarte sobre lo que pasa después de eso.", age: "26 años", tone: "Pragmático" },
    { text: "La gravedad es una sugerencia. Desde acá arriba, los problemas de abajo parecen solucionables. Busco un escritor que quiera explorar el espacio sin romanticizarlo ni temerle. Solo entender qué somos cuando no hay atmósfera que nos proteja.", age: "22 años", tone: "Optimista" },
    { text: "El mundo que prometieron y el mundo que construyeron son dos historias completamente distintas. Vivo en la grieta entre ambos. Si quieres escribir ciencia ficción que duela un poco, tenemos mucho que procesar juntos.", age: "32 años", tone: "Melancólico" }
  ],
  'terror': [
    { text: "No hago ruido. Solo aparezco cuando la luz falla. Pero llevo esta vela encendida desde hace mucho tiempo, y necesito que alguien me ayude a recordar por qué la encendí. Eso, si todavía quieres saber.", age: "Indefinida", tone: "Inquietante" },
    { text: "Qué amable de tu parte leer esto. No todo el mundo llega hasta aquí. La mayoría cierra esto antes. No te preocupes: solo quiero escribir algo que haga que los lectores verifiquen dos veces que cerraron la puerta. Nada más.", age: "Cortés", tone: "Perturbadora" },
    { text: "El miedo real no viene de los monstruos. Viene de darte cuenta de que llevas tiempo equivocado sobre algo fundamental. Trabajo con ese tipo de terror. El que no grita. El que susurra.", age: "Indescifrable", tone: "Directa" },
    { text: "En el pueblo donde crecí, hay cosas que no se nombran después del anochecer. No porque sean un tabú, sino porque nombrarlas es invocarlas. Te enseño todo lo que sé. Pero tendrás que escribirlo tú.", age: "Folk Horror", tone: "Ancestral" },
    { text: "El horror más efectivo es el que el lector construye en su propia cabeza. Yo solo pongo los materiales. Si sabes cómo dejar espacios en blanco estratégicos en una historia, podemos crear algo que nadie olvide fácilmente.", age: "Psicóloga del Miedo", tone: "Calculadora" }
  ],
  'noir': [
    { text: "Llevo veinte años buscando respuestas en lugares donde nadie mira. El sobre que cargo tiene información que puede arruinar a tres personas distintas. Solo una de ellas lo merece. Necesito a alguien que me ayude a decidir cuál.", age: "48 años", tone: "Veterano" },
    { text: "La ciudad me prometió que si trabajaba duro, conseguiría lo que merecía. Tenía razón. Aquí estoy, bajo la lluvia, con las manos en los bolsillos y demasiado saber para ser feliz. ¿Escribimos sobre lo que queda cuando ya no quedan ilusiones?", age: "31 años", tone: "Desencantado" },
    { text: "Fui detective tres años. Luego me di cuenta de que los clientes no quieren la verdad: quieren una verdad que puedan pagar. Ahora vendo otra cosa. Cuéntame tu historia y veré si vale la pena investigarla.", age: "40 años", tone: "Cínico" },
    { text: "Alguien me dijo que el Noir trata sobre la moral en un mundo sin ella. Creo que es más sencillo: trata sobre la dignidad cuando todo está en contra. Eso es más difícil de escribir. Y mucho más difícil de vivir.", age: "42 años", tone: "Filosófico" },
    { text: "Sobre sellado. Remitente sin nombre. Dirección incorrecta. Tres razones para no abrirlo. Las abrí de todas formas. Hay cosas que una vez que sabes, cambian cómo lees todo lo anterior. Así es el Noir. ¿Quieres que te explique por qué no puedes dejar de leer?", age: "El que sabe", tone: "Enigmático" }
  ],
  'drama-magico': [
    { text: "Hay una cafetería en mi calle donde el tiempo avanza a distinta velocidad. Nadie más lo nota. Yo llevo años tomando el mismo café en la misma mesa, y cada vez que lo hago, pienso en alguien diferente. Busco a quien quiera escribir sobre los momentos que se quedan aunque todo lo demás cambie.", age: "32 años", tone: "Nostálgica" },
    { text: "El paraguas que cargo contiene otro cielo. No el cielo de hoy: el de hace diez años, el que compartí con alguien que ya no está. La magia, en mi género, no viene de hechizos. Viene de lo que no podemos soltar. ¿Te interesa explorar eso?", age: "36 años", tone: "Melancólica" },
    { text: "No tengo poderes ni mundos alternativos que ofrecer. Solo tengo lo que todos tenemos: esa sensación de que algo invisible estructura los días. El Drama Mágico es lo que pasa cuando decides escribir sobre eso sin romantizarlo demasiado.", age: "38 años", tone: "Realista" },
    { text: "Hoy vi cómo el charco de la lluvia reflejaba una calle que no existe. No tomé foto. Solo lo vi y seguí caminando. Necesito a alguien que quiera escribir sobre los momentos que no se pueden capturar, solo recordar.", age: "27 años", tone: "Sensible" },
    { text: "La magia en la vida real no hace ruido. Aparece entre un miércoles y un jueves, cuando nadie mira. Llevo años escribiendo sobre ese silencio. Si tú también lo escuchas, tenemos mucho de qué hablar.", age: "44 años", tone: "Filosófica" }
  ],
  'epico': [
    { text: "Fui testigo de la caída de tres imperios. No porque sobreviví a ellos, sino porque alguien tuvo que escribirlos. Eso es el Épico: la responsabilidad de no dejar que las grandes historias mueran sin que nadie las cuente.", age: "65 años", tone: "Solemne" },
    { text: "El estandarte que cargo no representa una nación. Representa una idea. Las naciones caen, las ideas permanecen. Busco a quien quiera escribir sobre las ideas que cambiaron el rumbo de civilizaciones enteras.", age: "55 años", tone: "Guerrero" },
    { text: "Dicen que los héroes son personas ordinarias en circunstancias extraordinarias. Yo digo que son personas ordinarias que tomaron una decisión extraordinaria en un momento en que nadie estaba mirando. El Épico empieza ahí.", age: "Legendario", tone: "Mitológico" },
    { text: "La batalla más importante nunca se peleó con armas. Se peleó en una sala, con palabras, con alianzas y con traiciones calculadas. El Épico que me interesa no tiene solo héroes: tiene estructuras de poder que colapsan desde adentro.", age: "60 años", tone: "Estratégico" },
    { text: "El sol nació hoy como ha nacido diez mil veces. Pero hoy es diferente. Hoy alguien decide cambiar todo. Eso es lo único que necesita el Épico para comenzar: una decisión. El resto es consecuencia.", age: "Oral", tone: "Épico" }
  ],
  'accion': [
    { text: "No tengo tiempo para explicaciones largas. Hay tres personas detrás de mí, una cuerda que no sé si aguanta mi peso y una decisión que tomé hace exactamente cuatro segundos. ¿Escribes rápido?", age: "21 años", tone: "Urgente" },
    { text: "La adrenalina es una herramienta, no un estado permanente. Los mejores momentos de acción son los que duran exactamente tres segundos pero se sienten como tres minutos. Sé cómo construirlos. Solo necesito una historia donde importan.", age: "29 años", tone: "Calculadora" },
    { text: "Me expulsaron del equipo oficial. Fue la mejor noticia de mi vida. Ahora opero sin reglas absurdas ni cadena de mando. Busco a quien quiera escribir sobre lo que pasa cuando haces lo correcto de la manera incorrecta.", age: "25 años", tone: "Rebelde" },
    { text: "Cuerda. Tejados. Salto. No es tan complicado cuando dejas de pensar en las consecuencias y te enfocas en el movimiento. Eso es la Acción bien escrita: presencia total en el cuerpo, en el instante, en la decisión física.", age: "23 años", tone: "Zen" },
    { text: "La gente cree que el género de Acción no tiene profundidad. Esas personas nunca han leído sobre alguien que tiene que elegir entre salvar a uno o salvar a diez en 0.8 segundos. El cuerpo decide antes que la mente. Eso es filosofía.", age: "Veterana", tone: "Filosófica" }
  ],
  'comedia': [
    { text: "¿Sabes cuántas veces me han dicho que no soy serio? Exactamente las suficientes para entender que 'serio' es el único género que teme al ridículo. Yo prospero ahí. Busco a quien quiera escribir algo que haga reír y luego incomode sin avisar.", age: "32 años", tone: "Teatral" },
    { text: "Hice una reverencia tan elaborada que me caí. El público aplaudió igualmente. Eso me enseñó todo lo que necesitaba saber sobre la Comedia: el error bien ejecutado es indistinguible del plan.", age: "35 años", tone: "Irónico" },
    { text: "La Comedia es el único género donde puedes decir la verdad más incómoda y que la gente lo acepte porque estaban riendo. Yo uso eso. No para engañar, sino para llegar a donde los otros géneros no pueden entrar.", age: "40 años", tone: "Honesto" },
    { text: "Tres sombreros, ninguno mío. Una corona de papel que fabricé hace diez minutos. Un monólogo dramático que terminó siendo lo más gracioso de la semana. Sí, ese soy yo. ¿Escribimos?", age: "26 años", tone: "Caótico" },
    { text: "Los mejores payasos tienen los ojos más tristes del circo. No es accidente. La Comedia que vale algo lleva debajo algo que no puede decirse directamente. Si quieres saber qué es, tendrás que leer entre las carcajadas.", age: "45 años", tone: "Melancólico" }
  ],
  'romance': [
    { text: "Tengo una carta que escribí hace tres años. Nunca la envié. No porque no quise, sino porque cuando llegó el momento, me di cuenta de que las palabras que había elegido no eran del todo ciertas. El Romance, para mí, es ese proceso de encontrar las palabras correctas.", age: "25 años", tone: "Vulnerable" },
    { text: "No busco una historia de amor convencional. Busco escribir sobre el momento específico en que alguien decide hacerse vulnerable frente a otra persona. Ese instante dura milisegundos y cambia todo. Sé cómo capturarlo.", age: "31 años", tone: "Sofisticada" },
    { text: "El problema con el Romance mal escrito es que se olvida de que amar duele. No siempre, no todo el tiempo, pero lo hace. Quiero escribir sobre el amor que cuesta, que complica, que vale exactamente porque no es simple.", age: "27 años", tone: "Apasionada" },
    { text: "Hay algo en las conversaciones de madrugada que hace que todo lo que se dice suene más verdadero. Puedo explicarte por qué el tiempo no es decoración en el Romance: es arquitectura emocional. ¿Construimos juntos?", age: "33 años", tone: "Poética" },
    { text: "El Slow Burn no es lento porque no pase nada. Es lento porque cada cosa que pasa importa el doble. Soy paciente. Sé esperar el momento correcto. ¿Tú también?", age: "29 años", tone: "Tranquila" }
  ],
  'western': [
    { text: "La espiga seca que cargo no es un accidente de vestuario. Es un recordatorio de que la tierra aquí era fértil antes de que llegaran las promesas. El Western que me interesa habla de lo que se perdió, no solo de lo que se ganó.", age: "22 años", tone: "Melancólico" },
    { text: "En la frontera, la ley la hace quien llega primero con una historia convincente. He visto eso funcionar de ambos lados. Escribamos sobre alguien que entiende ese sistema y decide, una vez, no usarlo.", age: "35 años", tone: "Filosófico" },
    { text: "Todo el mundo en este pueblo tiene un pasado que no menciona. Yo no tengo pasado todavía. Eso me hace peligroso o inocente, todavía no sé cuál. Busco una historia donde esa diferencia importe.", age: "20 años", tone: "Ambicioso" },
    { text: "He aprendido más sobre las personas mirando cómo saludan que escuchando lo que dicen. Un sombrero bien tocado te dice todo sobre quién fue alguien antes de llegar aquí. ¿Escribimos sobre esa lectura?", age: "Observador", tone: "Silencioso" },
    { text: "El polvo del desierto tiene memoria. Algunos días arrastra cosas que no deberían estar aquí: ecos de decisiones que nadie tomó todavía. El Weird West vive en ese polvo. ¿Vienes?", age: "Raro", tone: "Extraño" }
  ],
  'belico': [
    { text: "El pañuelo que cargo perteneció a alguien que no llegó. No sé exactamente qué hacer con eso todavía. Pero sé que si no lo escribo, si no lo pongo en palabras, se pierde de una manera definitiva que ninguna guerra puede justificar.", age: "26 años", tone: "Protectora" },
    { text: "No glorificaré esto. Lo que vi no tiene música de fondo ni cámara lenta. Solo tiene peso y frío y decisiones que no tienen respuesta correcta. Si buscas eso, si quieres escribir lo que la guerra realmente hace, hablemos.", age: "30 años", tone: "Anti-bélica" },
    { text: "La diferencia entre un héroe y un superviviente en una guerra es a menudo quién tuvo la suerte de que la cámara estuviera apuntando hacia otro lado. Escribamos sobre los que no tuvieron esa suerte.", age: "35 años", tone: "Cínica" },
    { text: "Tenía un plan claro cuando llegué. Ahora el plan no existe y tampoco estoy segura de que existiera alguna vez. Eso es lo que la Bélica puede explorar mejor que cualquier otro género: la identidad que se disuelve bajo presión extrema.", age: "23 años", tone: "Perdida" },
    { text: "Sobreviví. Eso significa que ahora tengo la responsabilidad de recordarlo correctamente, sin heroísmo fabricado y sin victimismo tampoco. Solo con exactitud. Es el trabajo más difícil que he hecho. Necesito ayuda para terminarlo.", age: "42 años", tone: "Reconciliada" }
  ],
  'post-apocaliptico': [
    { text: "Esta planta creció en una lata oxidada, sin tierra buena, sin lluvia regular, sin nadie que le dijera que era posible. Llevo meses cuidándola. No porque crea que va a cambiar el mundo, sino porque necesito algo que esté vivo.", age: "17 años", tone: "Esperanzadora" },
    { text: "El fin del mundo ya pasó. Lo que queda no es el apocalipsis: es el día siguiente. Y el día siguiente siempre tiene decisiones pequeñas que determinan si algo nuevo crece o si solo sobrevive lo viejo con otro nombre.", age: "22 años", tone: "Pragmático" },
    { text: "Antes del colapso, la gente se peleaba por cosas que ahora no existen. Eso me dice algo sobre lo que realmente importa, pero no estoy seguro de qué. Busco a quien quiera escribir mientras seguimos descubriéndolo.", age: "25 años", tone: "Filosófico" },
    { text: "El suelo todavía recuerda lo que fue. Debajo de las cenizas, hay semillas esperando condiciones que quizás ya llegaron. Mi género no trata sobre la destrucción: trata sobre qué se merece ser reconstruido y qué no.", age: "19 años", tone: "Ecológico" },
    { text: "No te voy a romantizar esto. Hay días en que la única pregunta válida es si vale la pena seguir. El Post-Apocalíptico honesto no elude esa pregunta. La mira de frente. Eso es lo que lo hace necesario.", age: "21 años", tone: "Brutal" }
  ],
  'superheroes': [
    { text: "No elegí el poder. El poder me eligió a mí en el peor momento posible. Pero una vez que lo tienes, ya no puedes pretender que no está ahí. ¿Escribimos sobre lo que pasa después de ese momento?", age: "19 años", tone: "Idealista" },
    { text: "El problema con ser héroe es que alguien siempre decide quién merece ser salvado. Esa decisión tiene consecuencias políticas, morales y personales que el género raramente explora con honestidad. Yo quiero hacerlo.", age: "28 años", tone: "Crítico" },
    { text: "No tengo institución que me respalde. Solo tengo una decisión que tomé una noche y de la que no me he arrepentido. Todavía. Eso es lo que separa el Vigilante del héroe oficial: la soledad de la convicción.", age: "26 años", tone: "Oscuro" },
    { text: "Hay amenazas que no caben en una ciudad ni en un planeta. Hay escala que hace que todo lo demás parezca pequeño. Pero incluso en lo cósmico, la historia interesante siempre es la del individuo dentro de algo demasiado grande.", age: "25 años", tone: "Cósmico" },
    { text: "El día que descubrí lo que podía hacer, lo primero que pensé no fue 'voy a salvar el mundo'. Fue 'esto va a complicar todo'. Tenía razón. El Origen real de un superhéroe empieza con esa complicación, no con el primer vuelo.", age: "18 años", tone: "Íntimo" }
  ],
  'musical': [
    { text: "Hay cosas que no puedo decir en una conversación normal. Cuando canto, esas cosas aparecen con una claridad que nunca tienen cuando las pienso. Eso es lo que el Musical ofrece: la emoción que no cabe en el habla cotidiana.", age: "38 años", tone: "Catártica" },
    { text: "La canción que estoy a punto de cantar la escribió alguien que murió hace cuarenta años. Pero cuando la canto, vive. Eso es el Musical: la continuidad de la emoción humana a través del tiempo, más real que cualquier documento.", age: "45 años", tone: "Histórica" },
    { text: "La diferencia entre el diegético y el no-diegético en un musical no es técnica: es filosófica. ¿El personaje sabe que está cantando? ¿Importa? Yo creo que sí. Y esa diferencia cambia completamente qué tipo de historia puedes contar.", age: "35 años", tone: "Teórica" },
    { text: "Canciones que ya existen, usadas para contar algo nuevo. Es como encontrar significados que la canción no sabía que tenía. El Jukebox Musical es arqueología emocional. Busco a quien quiera cavar conmigo.", age: "33 años", tone: "Nostálgica" },
    { text: "El spotlight me encontró antes de que yo lo buscara. Y cuando me iluminó, me di cuenta de que llevaba toda mi vida preparándome para ese momento sin saberlo. Escribamos sobre ese tipo de destino.", age: "40 años", tone: "Teatral" }
  ],
  'deportivo': [
    { text: "Tengo tres segundos. El balón está en mi pie. Dos defensas encima. Un portero que ya calculó mi ángulo. Y yo, que sé exactamente qué voy a hacer, aunque ningún entrenador me lo enseñó. Esto es Latinoamérica. Esto es fútbol.", age: "18 años", tone: "Instintivo" },
    { text: "Me lesioné en el mejor momento de mi carrera. Tardé dos años en volver. Nadie apostaba por mí. Eso me enseñó que el deporte real no es sobre el talento: es sobre qué haces cuando el talento ya no es suficiente.", age: "28 años", tone: "Redención" },
    { text: "No vengo del equipo con mejor infraestructura ni del barrio con cancha. Vengo de un estacionamiento con porterías de lona. Eso no es handicap en una buena historia deportiva: es el punto de partida correcto.", age: "20 años", tone: "Underdog" },
    { text: "El gol lo meto yo, pero la jugada la construyeron nueve personas en los veinte segundos anteriores. El deporte que me interesa es el que entiende que el individuo y el colectivo no son opuestos: son la misma cosa desde ángulos distintos.", age: "25 años", tone: "Colectivo" },
    { text: "Final. Tiempo de descuento. Un gol de diferencia. Los cuerpos ya no obedecen pero la mente dice que falta uno más. El deporte como género narrativo existe para ese momento. Todo lo anterior fue la preparación para esto.", age: "22 años", tone: "Épico" }
  ]
};

// Capa de profundidad narrativa por género.
// Se inyecta sobre la variante base para reforzar conflicto, costo y dirección dramática.
const BIOGRAPHY_DEPTH = {
  'fantasia': {
    conflict: 'Si abrimos ese camino, la magia nos pedirá algo a cambio.',
    stake: 'La pregunta no es si ganamos: es qué parte de nosotros queda intacta al volver.'
  },
  'ciencia-ficcion': {
    conflict: 'Cada avance resuelve un problema y crea uno ético todavía más difícil.',
    stake: 'Lo crítico no es llegar primero, sino decidir qué humanidad queremos conservar.'
  },
  'terror': {
    conflict: 'Lo que tememos no siempre está afuera: a veces es una verdad que evitamos mirar.',
    stake: 'Si abrimos esa puerta, la historia ya no trata de sobrevivir, sino de no negarnos.'
  },
  'noir': {
    conflict: 'Toda pista útil compromete a alguien que no puede pagar el precio de la verdad.',
    stake: 'Resolver el caso quizá sea posible; salir limpio de él, no.'
  },
  'drama-magico': {
    conflict: 'Lo imposible aparece justo donde intentamos fingir que todo está bien.',
    stake: 'La escena clave no es el milagro: es quién se atreve a nombrar lo que duele.'
  },
  'epico': {
    conflict: 'Cada juramento heroico tiene una factura política, íntima o histórica.',
    stake: 'La leyenda importa menos que la herencia real que deja en los demás.'
  },
  'accion': {
    conflict: 'Moverse rápido salva el cuerpo, pero no siempre protege lo que importa.',
    stake: 'La decisión correcta suele llegar tarde y aun así exige ejecutarse en segundos.'
  },
  'comedia': {
    conflict: 'La risa funciona como escudo, hasta que la verdad atraviesa el chiste.',
    stake: 'Si la escena solo hace reír, se olvida; si además incomoda, permanece.'
  },
  'romance': {
    conflict: 'Amar no es elegir a alguien perfecto, sino sostenerse cuando aparecen las grietas.',
    stake: 'El clímax no es un beso: es el momento de decir lo que podría romperlo todo.'
  },
  'western': {
    conflict: 'En la frontera, la justicia personal compite con una ley escrita por el más fuerte.',
    stake: 'El duelo verdadero ocurre antes del disparo: en el código que decides obedecer.'
  },
  'belico': {
    conflict: 'La estrategia ordena el mapa, pero el dolor siempre desordena a las personas.',
    stake: 'La victoria táctica no compensa automáticamente la pérdida moral.'
  },
  'post-apocaliptico': {
    conflict: 'Reconstruir exige elegir qué ruinas merecen memoria y cuáles no.',
    stake: 'Sobrevivir es el mínimo; la pregunta de fondo es para qué seguir.'
  },
  'superheroes': {
    conflict: 'El poder amplifica virtudes y también defectos que antes podían ocultarse.',
    stake: 'Salvar la ciudad es épico; sostener una identidad quebrada es lo verdaderamente difícil.'
  },
  'musical': {
    conflict: 'Cuando la emoción sube, callar también es una decisión dramática.',
    stake: 'La canción que funciona no decora: revela lo que el personaje no podía admitir.'
  },
  'deportivo': {
    conflict: 'El talento abre puertas, pero la disciplina decide quién se queda cuando cae la presión.',
    stake: 'La jugada final vale por el marcador y por quién te conviertes al ejecutarla.'
  }
};

function buildDeepText(genreId, baseText) {
  const depth = BIOGRAPHY_DEPTH[genreId];
  if (!depth) return baseText;

  // Mantener longitud razonable para la UI: base + 2 líneas de profundidad.
  return `${baseText} ${depth.conflict} ${depth.stake}`;
}

class BiographyManager {
  constructor() {
    this.usedCombinations = new Set();
  }

  getBio(genreId) {
    const bios = BIOGRAPHIES[genreId];
    if (!bios) return { text: "Un género sin voz aún.", age: "Desconocida", tone: "Silencioso" };

    const available = bios
      .map((bio, i) => ({ ...bio, key: `${genreId}-${i}` }))
      .filter(({ key }) => !this.usedCombinations.has(key));

    if (available.length === 0) {
      // Reset for this genre only
      bios.forEach((_, i) => this.usedCombinations.delete(`${genreId}-${i}`));
      return this.getBio(genreId);
    }

    const chosen = available[Math.floor(Math.random() * available.length)];
    this.usedCombinations.add(chosen.key);
    return {
      ...chosen,
      text: buildDeepText(genreId, chosen.text)
    };
  }

  reset() {
    this.usedCombinations.clear();
  }
}

const bioManager = new BiographyManager();
