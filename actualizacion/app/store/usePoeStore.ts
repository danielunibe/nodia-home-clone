import { create } from 'zustand';

export interface Scene {
    id: string;
    title: string;
    content: string;
    objective: string;
    characters: string[];
    isProtected: boolean;
    doubts: string[];
    riskLevel: 'bajo' | 'medio' | 'alto';
}

export interface Chapter {
    id: string;
    title: string;
    scenes: Scene[];
}

export interface MetricValues {
    ritmo: number;
    tension: number;
    claridad: number;
    coherencia: number;
    subtexto: number;
}

export interface SignalItem {
    id: string;
    type: string;
    text: string;
    description: string;
    checked: boolean;
}

interface PoeState {
    chapters: Chapter[];
    activeChapterId: string;
    activeSceneId: string;
    isFocusMode: boolean;
    isDictating: boolean;
    isReadingAloud: boolean;
    autoSaveStatus: 'guardado' | 'guardando';
    completedTensionScenes: Record<string, boolean>;
    cognitiveMetrics: MetricValues;
    canonFacts: string[];
    detectedSignals: SignalItem[];
    activeRiesgos: string[];
    showChaptersMenu: boolean;
    radarVisible: boolean;

    // Actions
    setChapters: (chapters: Chapter[]) => void;
    setActiveChapterId: (id: string) => void;
    setActiveSceneId: (id: string) => void;
    setIsFocusMode: (f: boolean) => void;
    setIsDictating: (d: boolean) => void;
    setIsReadingAloud: (r: boolean) => void;
    setAutoSaveStatus: (status: 'guardado' | 'guardando') => void;
    setCompletedTensionScenes: (val: Record<string, boolean>) => void;
    toggleTensionScene: (sceneId: string) => void;
    setCognitiveMetrics: (metrics: MetricValues) => void;
    setCanonFacts: (facts: string[]) => void;
    setDetectedSignals: (signals: SignalItem[]) => void;
    setActiveRiesgos: (riesgos: string[]) => void;
    setShowChaptersMenu: (open: boolean) => void;
    setRadarVisible: (open: boolean) => void;

    // Rich quick mutations
    addNewScene: () => void;
    addNewChapter: () => void;
    addNote: (note: string) => void;
    triggerAISuggestion: () => void;
    triggerSceneAnalysis: () => void;
    exportMarkdown: () => void;
}

export const usePoeStore = create<PoeState>((set, get) => ({
    chapters: [
        {
            id: 'cap-1',
            title: 'Capítulo 1: El Eco del Vacío',
            scenes: [
                {
                    id: 'esc-1',
                    title: 'La llegada del Embajador',
                    objective: 'Introducir la tensión sociopolítica entre los clanes estelares y revelar el secreto hermético de la IA Nodia.',
                    content: 'La nave nodriza se cernía sobre el desierto de ceniza como un coloso oxidado. Liam ajustó el visor de su casco; las tormentas de estática rozaban el cristal metálico con gemidos agudos. "No estamos autorizados para este cuadrante," susurró Vance a través del comunicador cuántico. El Embajador descendió por la rampa neumática, sus hombros cargados de secretos históricos que cambiarían el destino de nuestra especie.',
                    characters: ['Liam', 'Vance', 'Embajador'],
                    isProtected: false,
                    doubts: ['¿Cómo reaccionará Liam al ver el emblema ancestral?'],
                    riskLevel: 'medio'
                },
                {
                    id: 'esc-2',
                    title: 'Bajo el manto de ceniza',
                    objective: 'Establecer la geografía del planeta baldío y sembrar la promesa de los reactores latentes.',
                    content: 'La tormenta de silicio se desató de golpe, borrando las débiles huellas de carbono de las botas de Liam. Debajo de esta estepa yerma, las antiguas bóvedas subterráneas de Nodia continuaban latiendo con una frecuencia estelar constante...',
                    characters: ['Liam'],
                    isProtected: true,
                    doubts: [],
                    riskLevel: 'bajo'
                }
            ]
        },
        {
            id: 'cap-2',
            title: 'Capítulo 2: Líneas de Estática',
            scenes: [
                {
                    id: 'esc-3',
                    title: 'El primer contacto cuántico',
                    objective: 'Hacer que la terminal central reconozca el colgante ancestral de Liam.',
                    content: 'Al posar las manos sobre el plasma solidificado de la consola, la máquina suspiró. Líneas de código en fucsia y calipso proyectaron diagramas en espiral directamente sobre la retina del explorador.',
                    characters: ['Liam', 'Vance'],
                    isProtected: false,
                    doubts: ['Determinar si Vance tiene incentivos de traicionar el gremio.'],
                    riskLevel: 'alto'
                }
            ]
        }
    ],
    activeChapterId: 'cap-1',
    activeSceneId: 'esc-1',
    isFocusMode: false,
    isDictating: false,
    isReadingAloud: false,
    autoSaveStatus: 'guardado',
    showChaptersMenu: false,
    radarVisible: false,
    completedTensionScenes: {
        'esc-1': false,
        'esc-2': true,
        'esc-3': false
    },
    cognitiveMetrics: {
        ritmo: 78,
        tension: 85,
        claridad: 92,
        coherencia: 90,
        subtexto: 64
    },
    canonFacts: [
        'La estepa de cenizas emite radiaciones de frecuencia cuántica 1420MHz.',
        'El comunicador cuántico de Vance es un modelo prohibido por la Alianza.'
    ],
    detectedSignals: [
        { id: 'sig-1', type: 'Símbolo', text: 'Coloso oxidado', description: 'Representa el colapso del antiguo orden colonial.', checked: false },
        { id: 'sig-2', type: 'Personaje', text: 'Los hombros cargados de secretos', description: 'Callback de la traición previa del Embajador en el Sector 4.', checked: true },
        { id: 'sig-3', type: 'Conflicto', text: 'No estamos autorizados para este cuadrante', description: 'Promesa narrativa de persecución inminente.', checked: false }
    ],
    activeRiesgos: [
        'Tono inconsistente en la tercera línea (excesivamente militar).',
        'Falta especificar qué reactor emite el murmullo de estática.'
    ],

    setChapters: (chapters) => set({ chapters }),
    setActiveChapterId: (activeChapterId) => set({ activeChapterId }),
    setActiveSceneId: (activeSceneId) => set({ activeSceneId }),
    setIsFocusMode: (isFocusMode) => set({ isFocusMode }),
    setIsDictating: (isDictating) => set({ isDictating }),
    setIsReadingAloud: (isReadingAloud) => set({ isReadingAloud }),
    setAutoSaveStatus: (autoSaveStatus) => set({ autoSaveStatus }),
    setCompletedTensionScenes: (completedTensionScenes) => set({ completedTensionScenes }),
    toggleTensionScene: (sceneId) => set((state) => ({
        completedTensionScenes: {
            ...state.completedTensionScenes,
            [sceneId]: !state.completedTensionScenes[sceneId]
        }
    })),
    setCognitiveMetrics: (cognitiveMetrics) => set({ cognitiveMetrics }),
    setCanonFacts: (canonFacts) => set({ canonFacts }),
    setDetectedSignals: (detectedSignals) => set({ detectedSignals }),
    setActiveRiesgos: (activeRiesgos) => set({ activeRiesgos }),
    setShowChaptersMenu: (showChaptersMenu) => set({ showChaptersMenu }),
    setRadarVisible: (radarVisible) => set({ radarVisible }),

    addNewScene: () => {
        const state = get();
        const currentChapter = state.chapters.find(c => c.id === state.activeChapterId) || state.chapters[0];
        const newSceneId = `esc-${Date.now()}`;
        const newScene: Scene = {
            id: newSceneId,
            title: `Escena ${currentChapter.scenes.length + 1}: Nueva Revelación`,
            objective: 'Escribe el objetivo conceptual de esta escena aquí.',
            content: 'Escribe el cuerpo narrativo aquí...',
            characters: ['Liam'],
            isProtected: false,
            doubts: [],
            riskLevel: 'bajo'
        };

        const updatedChapters = state.chapters.map(chap => {
            if (chap.id === state.activeChapterId) {
                return {
                    ...chap,
                    scenes: [...chap.scenes, newScene]
                };
            }
            return chap;
        });

        set({
            chapters: updatedChapters,
            activeSceneId: newSceneId
        });
    },

    addNewChapter: () => {
        const state = get();
        const newCapId = `cap-${Date.now()}`;
        const newChapter: Chapter = {
            id: newCapId,
            title: `Capítulo ${state.chapters.length + 1}: Sin Título`,
            scenes: [
                {
                    id: `esc-${Date.now()}`,
                    title: 'Planteamiento inicial',
                    objective: 'Escribe el objetivo de la escena crucial aquí.',
                    content: 'Inicia la redacción del nuevo capítulo...',
                    characters: [],
                    isProtected: false,
                    doubts: [],
                    riskLevel: 'bajo'
                }
            ]
        };
        set({
            chapters: [...state.chapters, newChapter],
            activeChapterId: newCapId,
            activeSceneId: newChapter.scenes[0].id
        });
    },

    addNote: (note: string) => {
        const state = get();
        set({
            canonFacts: [...state.canonFacts, note]
        });
    },

    triggerAISuggestion: () => {
        const state = get();
        const currentChapter = state.chapters.find(c => c.id === state.activeChapterId) || state.chapters[0];
        const currentScene = currentChapter.scenes.find(s => s.id === state.activeSceneId) || currentChapter.scenes[0];
        if (!currentScene) return;

        set({ autoSaveStatus: 'guardando' });
        
        setTimeout(() => {
            const suggestions = [
                ' El silencio que siguió al anuncio fue casi físico. Liam dio un paso al frente, consciente de que los ojos del Embajador ocultaban memorias que debían permanecer selladas bajo el yermo planetario.',
                ' "Iniciando vector de desembarque espacial," reportó la voz sintética del traje. Vance apretó la mandíbula; conocía demasiado bien lo que yacía enterrado en el sótano del desierto.',
                ' Un chispazo de luz fucsia emergió de las dunas del desierto, atrayendo la mirada cautelosa de Liam hacia la antigua colina de residuos lunares.'
            ];
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            const chosen = suggestions[randomIndex];
            
            const updatedChapters = get().chapters.map(chap => {
                return {
                    ...chap,
                    scenes: chap.scenes.map(sc => {
                        if (sc.id === state.activeSceneId) {
                            return { ...sc, content: sc.content + chosen };
                        }
                        return sc;
                    })
                };
            });
            set({
                chapters: updatedChapters,
                autoSaveStatus: 'guardado'
            });
        }, 1000);
    },

    triggerSceneAnalysis: () => {
        const state = get();
        set({ autoSaveStatus: 'guardando' });
        setTimeout(() => {
            const metrics = {
                ritmo: Math.min(100, Math.max(30, state.cognitiveMetrics.ritmo + Math.floor(Math.random() * 16 - 8))),
                tension: Math.min(100, Math.max(30, state.cognitiveMetrics.tension + Math.floor(Math.random() * 20 - 10))),
                claridad: Math.min(100, Math.max(30, state.cognitiveMetrics.claridad + Math.floor(Math.random() * 10 - 5))),
                coherencia: Math.min(100, Math.max(30, state.cognitiveMetrics.coherencia + Math.floor(Math.random() * 12 - 6))),
                subtexto: Math.min(100, Math.max(30, state.cognitiveMetrics.subtexto + Math.floor(Math.random() * 25 - 12))),
            };
            set({
                cognitiveMetrics: metrics,
                autoSaveStatus: 'guardado'
            });
        }, 800);
    },

    exportMarkdown: () => {
        const state = get();
        const currentChapter = state.chapters.find(c => c.id === state.activeChapterId) || state.chapters[0];
        const currentScene = currentChapter?.scenes?.find(s => s.id === state.activeSceneId) || currentChapter?.scenes?.[0];
        if (!currentScene) return;

        const dataStr = `# ${currentScene.title}\n\n**Objetivo de escena:** ${currentScene.objective}\n\n${currentScene.content}`;
        const dataUri = 'data:text/markdown;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `${currentScene.title.toLowerCase().replace(/\s+/g, '_')}.md`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}));
