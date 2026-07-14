# Informe sobre la Interfaz y Botones del Espacio de Trabajo 'Poe'

Este informe detalla minuciosamente todos los botones, controles y configuraciones integrados de forma exclusiva dentro del **Modo Poe** (el espacio de creación y edición literaria avanzada de NODIA).

---

## 1. Diseño Conceptual & Filosofía Visual: Sistema de Tarjetas

La interfaz de **Poe** no es un simple procesador de texto, sino un transpilador narrativo. Adopta una jerarquía minimalista donde **el texto se convierte en tarjetas narrativas accionables**. En Poe no escribes solamente texto; lo transformas en unidades que puedes leer, mover, conectar o resolver.

Se divide en tres planos de interacción:
1. **Módulo Lateral Izquierdo (Tarjetas de Estructura):** Navegación orgánica mediante tarjetas de escenas, capítulos y notas.
2. **Lienzo Central (Canvas Literario):** Un editor limpio y de alta concentración. Aquí solo flotan pequeños "chips" o tarjetas mínimas contextuales (Objetivo de escena, Estado).
3. **Módulo Lateral Derecho (Tarjetas Inteligentes / Radar):** Área dinámica de diagnóstico. Aquí residen las tarjetas de Señales, Riesgos, Canon, Personajes, Arcos y Sugerencias de IA.

---

## 2. Anatomía del Sistema de Tarjetas (Unidades Accionables)

Las tarjetas en Poe no son decorativas; responden a preguntas clave y tienen estados de ciclo de vida (`Pendiente`, `Confirmada`, `Conectada`, `En Revisión`, `Resuelta`, `Ignorada`). Si un elemento no se puede abrir, conectar, resolver o archivar, no existe como tarjeta.

### Tipos de Tarjetas Integradas

| Tipo de Tarjeta | Pregunta que Responde | Acción Principal |
| :--- | :--- | :--- |
| **Escena** | ¿Qué está pasando aquí? | Abrir, Analizar, Conectar |
| **Señal Narrativa** | ¿Qué pista, promesa u objeto apareció? | Convertir en Nodo, Registrar Canon |
| **Riesgo Narrativo** | ¿Qué puede romper la historia o continuidad? | Resolver, Sugerir Solución |
| **Personaje** | ¿Quién está involucrado y qué cambió en él? | Revisar Ficha, Conectar con Arco |
| **Canon** | ¿Qué dato del mundo ya es intocable u oficial? | Confirmar, Editar, Ver Apariciones |
| **Arco** | ¿A qué línea estructural pertenece este momento? | Marcar Punto de Giro |
| **Sugerencia IA** | ¿Qué propone el asistente para potenciar el texto? | Aceptar, Comparar, Rechazar |

El flujo operativo básico es: **Texto → Análisis (Poe) → Muestra de Tarjetas Inteligentes → Decisión del Usuario → Conexión con Estructura (Nodos / Arco)**.

---

## 3. Inventario Detallado de Botones y Herramientas Globals

### A. Barra Superior Global — Navegación y Sesión (Tier 1)
*Ubicación: Extremo superior de la pantalla, sección izquierda y derecha del primer nivel.*

| Botón / control | Ícono / Representación | Función Exclusiva | Ubicación Visual |
| :--- | :---: | :--- | :--- |
| **Logotipo NODIA** | Texto "NODIA" | Indicador estético del sistema de desarrollo del canon. | Esquina superior izquierda. |
| **Abrir Proyecto** | `FolderPlus` (Carpeta) | Abre el selector integrado de archivos locales o proyectos guardados. | Lado izquierdo, primer bloque de acciones. |
| **Guardar Proyecto** | `Download` (Descargar corto) | Realiza una escritura manual del estado de la aplicación en el caché local inmediato. | Lado izquierdo, a la derecha de abrir proyecto. |
| **Nube de Autoguardado** | `Cloud` (Nube inteligente) | Muestra el estado activo de la persistencia del archivo. Su cambio de estado incluye un ping de animación sutil. Al posarse sobre él, despliega un menú para fijar la frecuencia de sincronización (1 min, 5 min, 10 min o apagado). | Barra de estado de archivo, lado izquierdo. |
| **Configuraciones de Página** | `Settings` (Engranaje compacto) | Despliega opciones visuales sofisticadas para fijar el diseño físico de la hoja (Hoja continua / Corte por página física) y los márgenes y sangría (1.25 cm estándar, reglas físicas ON/OFF, tamaño 12pt). | Bloque izquierdo del interruptor central de la barra superior. |
| **Modo Enfoque** | `Layout` (Estructura de cuadrícula) | Oculta instantáneamente todos los paneles laterales (Asistente e Índice a la izquierda; Radar y Diagnósticos a la derecha) para ofrecer una pantalla de escritura absolutamente limpia. | Bloque de control del centro-izquierda. |
| **Exportar Proyecto** | `Download` (Flecha hacia abajo) | Abre una ventana modal de exportación polivalente con análisis de peso estimado de datos del canon según los tres modos (*Poe*, *Arco*, *Nodos*), permitiendo al usuario descargar el material en formatos `.md` (Markdown), `.json` (Esquema de datos Nodia) o `.pdf` listo para imprenta. | Bloque de control izquierdo-central. |
| **Contador de Palabras** | Medida física de texto | Monitorea en tiempo real las métricas del manuscrito de la escena activa (Palabras totales, longitud de caracteres, y equivalencia estimada de páginas físicas editoriales `Pág X`). | Bloque de datos numéricos derecho de la barra. |
| **Configuración General** | `Settings` (Engranaje) | Configuración profunda de la aplicación y la integración con modelos locales de lenguaje. | Esquina superior derecha de la pantalla. |

---

### B. Barra Superior — Herramientas de Edición Literaria (Tier 2)
*Ubicación: Nivel inferior del encabezado flotante de la barra superior.*

| Botón / Control | Ícono / Representación | Función Exclusiva | Ubicación Visual |
| :--- | :---: | :--- | :--- |
| **Deshacer / Rehacer** | `Undo` / `Redo` | Restauración inmediata de la pila histórica de cambios en el texto manuscrito. | Extremo izquierdo de la barra de formato. |
| **Formato Tipográfico** | `Bold`, `Italic`, `Underline`, `Strikethrough` | Edición estética de la tipografía seleccionada dentro del lienzo. | Bloque centro-izquierdo de formato. |
| **Alineación de Texto** | `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify` | Ajusta la distribución de los párrafos en el manuscrito de la hoja actual. | Bloque central de formato. |
| **Listas y Citas** | Listas y comillas de cita | Crea bloques indentados o listas secuenciales ordenadas y desordenadas. | Bloque centro-derecho de formato. |
| **Resaltador** | `Highlighter` | Colorizador rápido de caracteres o párrafos seleccionados. | Sección derecha del formato. |
| **Nueva Nota** | `StickyNote` (Nota adhesiva) | Inserta un recordatorio amarillo rápido flotando en el lienzo para seguimiento de ideas. | Bloque derecho de edición. |
| **Manuscrito e Índice** | `Compass` (Brújula) / Texto "Manuscrito" | Alterna el menú flotante lateral de navegación que muestra los capítulos, escenas y documentos protegidos de la narración actual. | Sección derecha de controles de barra. |
| **Analizar Escena IA** | `Wand2` (Varita violeta) | Solicita un dictamen inmediato a la IA Poe para calibrar la carga emocional y dramática del párrafo donde se ubica el cursor de escritura. | Módulo derecho de Inteligencia Artificial. |
| **Ethyria AI / Chat** | `Sparkles` (Destellos dorados/verdes verdes) | Ofrece un autocompletado de texto contextual ("Continuar Escritura IA") con un solo clic y abre/cierra simultáneamente el chat interactivo del asistente de IA. | Extremo derecho de controles de barra superior. |
| **Dictado de Voz** | `Mic` (Micrófono) | Alterna el servicio de reconocimiento de voz inteligente para transcribir prosa narrada directamente sobre la hoja activa. | Control de utilidades del extremo derecho. |
| **Acceso al Radar** | `CircleDot` (Punto circular) | Muestra u oculta de forma fluida el escáner de continuidad del lateral derecho. | Botón final del extremo derecho de la barra. |

---

### C. Sidebar de Estructura e Inteligencia (Izquierdo)
*Ubicación: Panel lateral izquierdo, acoplado estéticamente con efecto de vidrio esmerilado.*

*   **Selector de Modo Unificado (`LowPolyModeSelector`):** Cabecera del panel. Integra de forma unificada las tres perspectivas estratégicas de trabajo: `Poe`, `Arco` y `Nodos`.
*   **Visor de Manuscrito (Tarjetas Estructurales Fijas):** Despliega el árbol organizado de la arquitectura del libro mediante **Tarjetas de Escena** y **Capítulos**. Cada tarjeta de escena permite clics rápidos para saltar de contexto y muestra en pequeñito su estado o arco asociado.
*   **Paso de Consultas AI (Poe Assistant Box):** Consola interactiva para chats directos.

---

### D. Sidebar Analítico de Continuidad o Radar (Derecho)
*Ubicación: Panel lateral derecho, diseñado para visualizaciones de métricas cerebrales, de tensión dramática y de continuidad.*

Aquí reside el comportamiento dinámico de Poe. A diferencia del lado izquierdo (que siempre muestra escenas), el lado derecho reacciona al análisis del texto mostrando **Tarjetas Inteligentes Dinámicas** organizadas en grupos tipo acordeón para no saturar al usuario:
*   **Filtros / Acordeones de Tarjetas:**
    1. `▾ Señales Narrativas`: Tarjetas de objetos, misterios o promesas captadas en el texto (ej. "El colgante volvió a brillar").
    2. `▾ Riesgos Detectados`: Tarjetas ámbar que alertan sobre contradicciones lógicas o exposición excesiva.
    3. `▸ Canon Pendiente`: Tarjetas para afirmar reglas del mundo que acaban de establecerse.
    4. `▸ Personajes`: Tarjetas de estado motivacional de los actantes en la escena.
    5. `▸ Sugerencias de Poe`: Posibles alteraciones de ritmo o reescrituras de la IA, sujetas a botones de [Aceptar], [Rechazar] o [Comparar].

Las tarjetas mantienen limpio el espacio interactivo: el autor solo presta atención a la tarjeta de su interés, resolviendo y validando datos que alimentarán la línea temporal narrativa del *Modo Arco* y el diagrama topológico del *Modo Nodos*.

---

## 3. Conclusión del Análisis

La interfaz de **Poe** destaca por su concentración funcional. Al mover los componentes que solían sobrecargar el encabezado central directamente a las cabeceras de los paneles laterales e integrar herramientas antes dispersas (como la consolidación del botón de autocompletado inteligente con el chat y los filtros del radar derecho):

1.  **Limpieza Espacial:** El header superior se libera de ruidos cognitivos innecesarios para que la atención se concentre en el formato.
2.  **Continuidad Operativa:** El flujo de diseño permite al escritor cambiar de modo en un clic sin perder la referencia visual de las escenas que está editando.
3.  **Filtrados Inteligentes:** Reducción del sobre-estímulo mediante la activación opcional de capas (Señales, Riesgos, Canon, Personajes) para un diagnóstico a demanda.
