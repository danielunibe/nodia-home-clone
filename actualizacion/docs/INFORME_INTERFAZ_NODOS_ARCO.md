# Informe Detallado: Interfaces de Nodos y Arco Narrativo en NODIA

Este informe ofrece una descripción exhaustiva de las funcionalidades, botones, herramientas y ubicaciones clave de los modos **Arco Narrativo** y **Nodos** en la plataforma NODIA.

---

## 1. MODO ARCO NARRATIVO: Estructuración Temporal y Ritmo Dramático

El **Modo Arco** es el cerebro estructural de la historia. No es simplemente un "canvas" más largo ni un "editor de texto", sino el entorno especializado para diagnosticar, planificar y auditar el tempo de la obra, dividiéndola en actos y gestionando las consecuencias y el ritmo narrativo.

> **Poe escribe. Nodos materializa. Arc organiza el destino narrativo.**

### A. Las Cinco Capas de Organización del Modo Arc

1. **Capa Estructural**: Organiza la jerarquía del proyecto (Actos 👉 Secuencias 👉 Capítulos 👉 Escenas 👉 Beats Narrativos).
2. **Capa Dramática**: Controla el conflicto en cada escena. Exige saber: ¿Qué quiere el personaje? ¿Qué lo bloquea? ¿Qué cambia al final?
3. **Capa de Personajes**: Traza una lectura en paralelo del arco emocional, moral y de relación de los integrantes del reparto.
4. **Capa de Ritmo**: Ofrece análisis visuales vía curvas de tensión, emoción y ritmo, permitiendo identificar zonas sobreexpuestas o sin conflicto.
5. **Capa de Continuidad**: Cruza la información para asegurar que no se produzcan huecos narrativos o acciones sin pagar a futuro.

### B. Estructura y Perfil de la Interfaz (Mapa de Arco)
*Ubicación: Extremo izquierdo de la pantalla, actuando como un índice vivo estructural.*

*   **Selector de Modo Unificado (`LowPolyModeSelector`):** Integrado en la cabecera del panel. Permite transicionar fluidamente entre `Poe`, `Arco` y `Nodos`.
*   **Árbol Narrativo de la Estructura del Libro:** Lista secuencial interactiva dividida en Actos, con indicadores visuales de salud (Punto verde = sana, rojo = problemas de continuidad, etc.):
    *   **Acto I: Planteamiento** (`GitCommit` en color verde brillante `#c4ff00`).
    *   **Acto II: Nudo** (`GitBranch` en color púrpura `#a855f7`).
    *   **Acto III: Desenlace** (`GitMerge` en color azul eléctrico `#3b82f6`).
*   **Eventos Clave (Anclas Estructurales):** Bloques visuales inamovibles que marcan los puntos obligados de tensión de la trama, como:
    *   **Incidente Incitador**, **Punto de Giro 1**, **Midpoint**, **Crisis**, **Clímax**, y **Resolución**.

### C. Lienzo de Línea de Tiempo Central (Timeline Canvas Híbrido)
*Ubicación: El cuerpo central del espacio de trabajo.*

*   **Vista Arco (Vertical):** Pensada para la lectura narrativa fluida, mostrando actos y nodos de eventos interconectados.
*   **Vista Timeline (Horizontal):** Para control cruzado de producción (escenas simultáneas, líneas de caracteres, control temporal estricto).
*   **Vista Curvas:** Mallas espaciales para mapear emociones y densidad de tensión.
*   **Vista Matriz:** Tablero auditable donde la estructura se depura línea por línea.

### D. Inspector Derecho: Detalle Narrativo
*Aparece dinámicamente al seleccionar una escena o punto narrativo en el lienzo central.*

*   **Campos Esenciales Documentados:** Objetivo, Obstáculo, Conflicto, Giro, Consecuencia, Promesa/Pago, Estado Emocional y Función Narrativa (Introducción, transición, resolución, clímax).

### E. Botonera Analítica Principal del Modo Arco
*(Recomendación Arquitectónica para la barra de herramientas específica de Arc)*

*   **[+ Escena] / [+ Evento] / [+ Punto de Giro]:** Botones de creación jerárquica y semántica. Funcionalidades como "Nuevo Punto de Giro" o "Nuevo Beat".
*   **[Arco Personaje]:** Abre la vista para registrar estados iniciales y finales, además de evolución.
*   **[Conectar]:** Herramientas para relacionar causas y efectos, o crear nexos bidireccionales con **Poe** (Texto) y **Nodos** (Mundo 3D).
*   **[Curvas] y [Diagnóstico]:** Auditoría con IA analítica que permite detectar escenas vacías de conflicto, ritmos planos o huecos en la trama sin que la IA sobrescriba el guion, actuando como un consultor técnico riguroso.
*   **[Vista]:** Control de cambio veloz entre modo Actos, Timeline, Personajes o Mapa Causal.

---

## 2. MODO NODOS: Topología Tridimensional y Orquestación del Mundo

El **Modo Nodos** es el espacio de juego tridimensional y topológico donde el escritor o diseñador puede modelar el espacio de su obra mediante arquitectura low-poly, personajes tridimensionales ("Actantes") y el modelado de primitivas.

### A. Barra de Herramientas Principal de Nodos (`LowPolyToolbar`)
*Ubicación: Flotando en la parte delantera e inferior central de la pantalla con un sistema de traslación e iluminación reactiva según la herramienta activa.*

La barra principal se compone de **7 categorías de herramientas principales** que despliegan submenús flotantes individuales al hacer clic:

#### 1. Arquitectura (Rooms) (`IconoRooms` — Verde `#10b981`)
Orientado al diseño estructural del espacio:
*   **Dibujar de Manera Libre (`dibujar_libre`):** Permite reconfigurar el espacio dibujando geometrías vectoriales libres directamente sobre el plano. Cambia automáticamente la vista a un lienzo `top_2d` superior para mayor precisión de planos.
*   **Pintar Cuadrícula (`habitacion_cuadrada`):** Asfalta celdas ortogonales de pisos predefinidos.
*   **Dibujar por Líneas/Vértices (`dibujar_lineas`):** Creación guiada de perímetros mediante la pulsación secuencial de puntos.
*   **Muros Automáticos (`muros_auto`):** Eleva muros y tabiques limpios y perimetrales mediante un solo clic analizando la superficie del perímetro.
*   **Generar 3D (`generar_3d`):** Proyecta la extrusión volumétrica vertical en el espacio con control de altura reactivo.

#### 2. Sistemas del Proyecto (`IconoLibro` — Violeta/Púrpura `#a855f7`)
Sistemas para anclar elementos dinámicos que alteran de forma lógica el flujo de la obra:
*   **Narrativa:** Vincula trozos de manuscrito y datos de la trama al espacio.
*   **Mecánicas:** Parámetros de interacción física o lógica de las escenas.
*   **Diálogos:** Redes conversacionales y opciones de decisión.
*   **Cámaras:** Encrespa puntos de observación fijos o recorridos.
*   **Imágenes:** Vincula el arte conceptual e ilustraciones en el lienzo tridimensional.
*   **Sonido:** Inserta disparadores de sonido directo y música atmosférica.

#### 3. Actantes y Personajes (`IconoActante` — Verde esmeralda `#34d399`)
Modelos o representantes que permiten posicionar el reparto en el espacio:
*   **Hombre (`hombre` — Azul), Mujer (`mujer` — Rosa), Robot (`robot` — Gris), Monstruo (`monstruo` — Verde), Perro (`perro` — Amarillo), Gato (`gato` — Violeta), Pájaro (`pajaro` — Celeste).**
*   Cuentan con soporte de arrastre analítico (`draggable`) para posicionar el nodo arrastrándolo directamente desde la barra flotante hasta la posición elegida del lienzo 3D.

#### 4. Primitivas 3D (`IconoProp` — Amarillo `#fbbf24`)
Permite insertar geometría estándar de modelado tridimensional para maquetar bocetos de escenografía. *Dispara además una telemetría inteligente para simular exportación a motores gráficos como Unreal Engine.*
*   **Cubo, Esfera, Cilindro, Cono, Toroide, Pirámide.**

#### 5. Iluminación y Entorno (`IconoEntorno` — Celeste `#38bdf8`)
Ajusta la atmósfera visual del nodo donde se interactúa teatralmente:
*   **Luz Direccional, Luz Puntual, Skybox / Cielo (Cargar texturas celestes), Terreno, Océano / Agua, Niebla Volumétrica.**

#### 6. Interfaz de Usuario (UI) (`IconoInterfaz` — Carmín `#f43f5e`)
Diseña la maqueta o prototipo directo de cómo se percibirá la interfaz interactiva durante el videojuego o la novela interactiva:
*   **Botón, Panel / Ventana, Barra de Progreso, Texto / Etiqueta, Inventario, Minimapa.**

#### 7. Cinemática y Cámaras (`IconoCinematica` — Verde azulado/Turquesa `#14b8a6`)
*   **Añadir Cámara:** Inserta frentes de cámara móviles.
*   **Ruta de Cámara:** Permite trazar un riel vectorial para simular barridos cinematográficos en el entorno narrativo.

---

## 3. Conclusión de la Arquitectura de Trabajo

Con la unificación espacial de los tres modos complementarios en las barras de navegación lateral:
1.  **Arco** otorga el mapa secuencial de la tensión y la trama.
2.  **Nodos** materializa la profundidad física, geométrica y el reparto actoral.
3.  **Poe** captura la riqueza lírica y la prosa definitiva de la obra.

El flujo de trabajo unificado permite una transición intuitiva y rápida de planos creativos con un alto estándar de diseño visual y confort de navegación.
