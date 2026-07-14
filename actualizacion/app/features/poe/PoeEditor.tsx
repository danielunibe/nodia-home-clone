'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    Plus, Sparkles, Activity, AlertTriangle, Check, Shield, Bookmark, 
    Trash2, Edit3, HelpCircle, GitMerge, User, RefreshCw, Volume2, 
    Mic, Info, Download, ChevronRight, CheckSquare, EyeOff, Layout,
    MessageSquare, Eye, Compass, Wand2, ArrowRight, FolderPlus, FilePlus, StickyNote, Settings, SlidersHorizontal
} from 'lucide-react';
import { usePoeStore } from '@/app/store/usePoeStore';
import { useAppStore } from '@/app/store/useAppStore';

interface Scene {
    id: string;
    title: string;
    content: string;
    objective: string;
    characters: string[];
    isProtected: boolean;
    doubts: string[];
    riskLevel: 'bajo' | 'medio' | 'alto';
}

interface Chapter {
    id: string;
    title: string;
    scenes: Scene[];
}

export const PoeEditor = () => {
    const {
        chapters,
        setChapters,
        activeChapterId,
        setActiveChapterId,
        activeSceneId,
        setActiveSceneId,
        isFocusMode,
        setIsFocusMode,
        isDictating,
        setIsDictating,
        isReadingAloud,
        setIsReadingAloud,
        autoSaveStatus,
        setAutoSaveStatus,
        completedTensionScenes,
        setCompletedTensionScenes,
        cognitiveMetrics,
        setCognitiveMetrics,
        canonFacts,
        setCanonFacts,
        detectedSignals,
        setDetectedSignals,
        activeRiesgos,
        setActiveRiesgos,
        showChaptersMenu,
        setShowChaptersMenu,
        radarVisible,
        setRadarVisible,
        addNewScene,
        addNewChapter,
        addNote,
        triggerAISuggestion,
        triggerSceneAnalysis,
        exportMarkdown,
        toggleTensionScene
    } = usePoeStore();
    
    const {
        workspaceMode,
        setWorkspaceMode
    } = useAppStore();

    const [editorHistory, setEditorHistory] = useState<string[]>([]);

    // Selection floating bar
    const [showSelectionBar, setShowSelectionBar] = useState(false);
    const [selectionCoords, setSelectionCoords] = useState({ top: 0, left: 0 });
    const [selectedText, setSelectedText] = useState('');
    const [currentTonoDropdown, setCurrentTonoDropdown] = useState(false);

    // Radar layer toggles
    const [layerVisibility, setLayerVisibility] = useState({
        callbacks: true,
        riesgos: true,
        canon: true,
        alineacion: true
    });

    const editableRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const objectiveRef = useRef<HTMLParagraphElement>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);

    // Get current Active objects
    const currentChapter = chapters.find(c => c.id === activeChapterId) || chapters[0];
    const currentScene = currentChapter?.scenes?.find(s => s.id === activeSceneId) || currentChapter?.scenes?.[0];

    // Safe synchronization effects to avoid contentEditable cursor jumping
    useEffect(() => {
        if (editableRef.current && currentScene) {
            if (editableRef.current.innerText !== currentScene.content) {
                editableRef.current.innerText = currentScene.content;
            }
        }
    }, [activeSceneId, currentScene?.content, currentScene]);

    useEffect(() => {
        if (titleRef.current && currentScene) {
            if (titleRef.current.innerText !== currentScene.title) {
                titleRef.current.innerText = currentScene.title;
            }
        }
    }, [activeSceneId, currentScene?.title, currentScene]);

    useEffect(() => {
        if (objectiveRef.current && currentScene) {
            if (objectiveRef.current.innerText !== currentScene.objective) {
                objectiveRef.current.innerText = currentScene.objective;
            }
        }
    }, [activeSceneId, currentScene?.objective, currentScene]);

    // Simulated action triggers
    const triggerNotification = (text: string) => {
        // Simple elegant audio-visual cues or simulated AI outputs
        console.log(`Poe Notify: ${text}`);
    };

    // AI suggestion simulation (Continuar escritura)
    const handleAISuggestion = () => {
        if (!currentScene) return;
        setAutoSaveStatus('guardando');
        
        setTimeout(() => {
            const suggestions = [
                ' El silencio que siguió al anuncio fue casi físico. Liam dio un paso al frente, consciente de que los ojos del Embajador ocultaban memorias que debían permanecer selladas bajo el yermo planetario.',
                ' "Iniciando vector de desembarque espacial," reportó la voz sintética del traje. Vance apretó la mandíbula; conocía demasiado bien lo que yacía enterrado en el sótano del desierto.',
                ' Un chispazo de luz fucsia emergió de las dunas del desierto, atrayendo la mirada cautelosa de Liam hacia la antigua colina de residuos lunares.'
            ];
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            const chosen = suggestions[randomIndex];
            
            const updatedChapters = chapters.map(chap => {
                return {
                    ...chap,
                    scenes: chap.scenes.map(sc => {
                        if (sc.id === activeSceneId) {
                            return { ...sc, content: sc.content + chosen };
                        }
                        return sc;
                    })
                };
            });
            setChapters(updatedChapters);
            setAutoSaveStatus('guardado');
            triggerNotification('IA Poe sugirió una continuación con éxito.');
        }, 1000);
    };

    // Simulate Analizar escena
    const handleSceneAnalysis = () => {
        setAutoSaveStatus('guardando');
        setTimeout(() => {
            setCognitiveMetrics({
                ritmo: Math.min(100, Math.max(30, cognitiveMetrics.ritmo + Math.floor(Math.random() * 16 - 8))),
                tension: Math.min(100, Math.max(30, cognitiveMetrics.tension + Math.floor(Math.random() * 20 - 10))),
                claridad: Math.min(100, Math.max(30, cognitiveMetrics.claridad + Math.floor(Math.random() * 10 - 5))),
                coherencia: Math.min(100, Math.max(30, cognitiveMetrics.coherencia + Math.floor(Math.random() * 12 - 6))),
                subtexto: Math.min(100, Math.max(30, cognitiveMetrics.subtexto + Math.floor(Math.random() * 25 - 12))),
            });
            setAutoSaveStatus('guardado');
            triggerNotification('Radar Poe actualizó las métricas de tensión y ritmo.');
        }, 800);
    };

    // Detect Selection
    const handleSelection = () => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
            setShowSelectionBar(false);
            setCurrentTonoDropdown(false);
            return;
        }

        const text = sel.toString().trim();
        if (text.length > 0) {
            setSelectedText(text);
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            const containerRect = editorContainerRef.current?.getBoundingClientRect();
            if (containerRect) {
                setSelectionCoords({
                    top: rect.top - containerRect.top - 58,
                    left: rect.left - containerRect.left + (rect.width / 2) - 150
                });
                setShowSelectionBar(true);
            }
        }
    };

    // Floating actions handlers
    const applyAIRephrase = (mode: 'reescribir' | 'expandir' | 'reducir' | 'intensificar' | 'clarificar' | 'tono') => {
        if (!selectedText) return;
        setAutoSaveStatus('guardando');

        setTimeout(() => {
            let resultText = '';
            switch (mode) {
                case 'reescribir':
                    resultText = `«${selectedText}» (En prosa pulida: Liam contempló la mole metálica que parecía una reliquia suspendida sobre las dunas grises.)`;
                    break;
                case 'expandir':
                    resultText = `${selectedText} El fuselaje de la colosal estructura estaba surcado por profundas zanjas térmicas, vestigios de un reingreso accidentado que nadie se atrevía a registrar en los mapas imperiales.`;
                    break;
                case 'reducir':
                    resultText = `${selectedText.slice(0, 50)}... [Sintetizado por Poe]`;
                    break;
                case 'intensificar':
                    resultText = `¡Atención! La tensión se eleva: ${selectedText} El latido del motor subterráneo resonó con la violencia de una premonición funesta.`;
                    break;
                case 'clarificar':
                    resultText = `${selectedText} (Es decir, Liam se dio cuenta inmediatamente del peligro inminente)`;
                    break;
                default:
                    resultText = `[Tono alterado] ${selectedText}`;
            }

            // Create customized inline marks or update content
            const updatedChapters = chapters.map(chap => {
                return {
                    ...chap,
                    scenes: chap.scenes.map(sc => {
                        if (sc.id === activeSceneId) {
                            return { 
                                ...sc, 
                                content: sc.content.replace(selectedText, resultText) 
                            };
                        }
                        return sc;
                    })
                };
            });
            setChapters(updatedChapters);
            setShowSelectionBar(false);
            setAutoSaveStatus('guardado');
        }, 600);
    };

    // Manage Scenes Add/Delete
    const handleAddNewScene = () => {
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

        const updatedChapters = chapters.map(chap => {
            if (chap.id === activeChapterId) {
                return {
                    ...chap,
                    scenes: [...chap.scenes, newScene]
                };
            }
            return chap;
        });

        setChapters(updatedChapters);
        setActiveSceneId(newSceneId);
        triggerNotification('Nueva escena creada.');
    };

    const handleAddNewChapter = () => {
        const newCapId = `cap-${Date.now()}`;
        const newChapter: Chapter = {
            id: newCapId,
            title: `Capítulo ${chapters.length + 1}: Sin Título`,
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
        setChapters([...chapters, newChapter]);
        setActiveChapterId(newCapId);
        setActiveSceneId(newChapter.scenes[0].id);
        triggerNotification('Nuevo capítulo creado.');
    };

    const handleAddNote = () => {
        // Quick interactive notes builder
        const userNote = prompt('Ingresa una nota rápida de continuidad:');
        if (userNote) {
            setCanonFacts([...canonFacts, userNote]);
            triggerNotification('Anotación agregada al canon oficial.');
        }
    };

    const handleSaveVersion = () => {
        setAutoSaveStatus('guardando');
        setTimeout(() => {
            setAutoSaveStatus('guardado');
            alert(`Checkpoint de la escena "${currentScene?.title}" guardado en el historial local con éxito.`);
        }, 500);
    };

    const handleExportMarkdown = () => {
        if (!currentScene) return;
        const dataStr = `# ${currentScene.title}\n\n**Objetivo de escena:** ${currentScene.objective}\n\n${currentScene.content}`;
        const dataUri = 'data:text/markdown;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `${currentScene.title.toLowerCase().replace(/\s+/g, '_')}.md`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    // Auto-save typing update
    const handleContentTyping = (e: React.FormEvent<HTMLParagraphElement>) => {
        const newText = (e.target as HTMLParagraphElement).innerText;
        setAutoSaveStatus('guardando');

        const updatedChapters = chapters.map(chap => {
            return {
                ...chap,
                scenes: chap.scenes.map(sc => {
                    if (sc.id === activeSceneId) {
                        return { ...sc, content: newText };
                    }
                    return sc;
                })
            };
        });
        setChapters(updatedChapters);
        
        // Debounce simulated auto save
        const timer = setTimeout(() => {
            setAutoSaveStatus('guardado');
        }, 1200);
        return () => clearTimeout(timer);
    };

    const handleTitleTyping = (e: React.FormEvent<HTMLHeadingElement>) => {
        const newTitle = (e.target as HTMLHeadingElement).innerText;
        const updatedChapters = chapters.map(chap => {
            return {
                ...chap,
                scenes: chap.scenes.map(sc => {
                    if (sc.id === activeSceneId) {
                        return { ...sc, title: newTitle };
                    }
                    return sc;
                })
            };
        });
        setChapters(updatedChapters);
    };

    const handleObjectiveTyping = (e: React.FormEvent<HTMLParagraphElement>) => {
        const newObjective = (e.target as HTMLFormElement).innerText;
        const updatedChapters = chapters.map(chap => {
            return {
                ...chap,
                scenes: chap.scenes.map(sc => {
                    if (sc.id === activeSceneId) {
                        return { ...sc, objective: newObjective };
                    }
                    return sc;
                })
            };
        });
        setChapters(updatedChapters);
    };

    // Voice dictation simulation active state helper
    const toggleDictation = () => {
        if (isDictating) {
            setIsDictating(false);
        } else {
            setIsDictating(true);
            triggerNotification('Dictado por voz activo. Escuchando...');
            setTimeout(() => {
                if (editableRef.current) {
                    const textToAdd = ' [Frase dictada con la voz: Liam detectó una interferencia magnética de bajo nivel.]';
                    const updatedChapters = chapters.map(chap => {
                        return {
                            ...chap,
                            scenes: chap.scenes.map(sc => {
                                if (sc.id === activeSceneId) {
                                    return { ...sc, content: sc.content + textToAdd };
                                }
                                return sc;
                            })
                        };
                    });
                    setChapters(updatedChapters);
                    setIsDictating(false);
                }
            }, 3000);
        }
    };

    // Text to Speech simulator audio feedback
    const toggleAudioReader = () => {
        if (isReadingAloud) {
            setIsReadingAloud(false);
        } else {
            setIsReadingAloud(true);
            triggerNotification('Narrador de voz sintético leyendo escena...');
            setTimeout(() => {
                setIsReadingAloud(false);
            }, 6000);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-40 flex flex-col pointer-events-none select-none"
            onPointerDown={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
        >
            <div className="flex-1 flex overflow-hidden px-4 gap-4">
                {/* 1. Left Sidebar - Chatbot Assistant with High-End Glassmorphism */}
                <AnimatePresence>
                    {!isFocusMode && (
                        <div className="relative shrink-0 pointer-events-auto h-full flex select-none py-4">
                            {/* Glowing Color Orbs behind the Glassmorphic box */}
                            <motion.div 
                                animate={{ 
                                    opacity: [0.35, 0.45, 0.35],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-[10%] left-[20px] w-[180px] h-[180px] rounded-full bg-purple-600/35 blur-[64px] pointer-events-none -z-10"
                            />
                            <motion.div 
                                animate={{ 
                                    opacity: [0.22, 0.3, 0.22],
                                    scale: [1, 0.95, 1],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute bottom-[20%] right-[30px] w-[140px] h-[140px] rounded-full bg-violet-500/25 blur-[50px] pointer-events-none -z-10"
                            />
                            <motion.div 
                                initial={{ x: -250, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -250, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="w-[300px] shrink-0 flex flex-col gap-4 h-full pointer-events-none"
                            >
                                {/* Estructuras y Escenas Box */}
                                <AnimatePresence>
                                    {showChaptersMenu && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            className="bg-[#1e1f22]/75 border border-white/5 backdrop-blur-[24px] rounded-lg flex flex-col p-4 pointer-events-auto flex-1 overflow-hidden"
                                        >
                                            <div className="flex items-center justify-between mb-4   pb-4 shrink-0">
                                                <h3 className="text-white/80 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                                                    <Compass size={14} className="text-[#c4ff00]" /> Estructuras y Escenas
                                                </h3>
                                            </div>

                                            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col pb-4">
                                                <div className="mb-3   pb-2">
                                                    <h3 className="text-white text-xs font-bold uppercase tracking-widest text-[#c4ff00] mb-1">Proyecto Base</h3>
                                                    <div className="text-[10px] text-white/50">Estructura Global</div>
                                                </div>
                                                <div className="pl-2   ml-1">
                                                    {chapters.map((chapter) => (
                                                        <div key={chapter.id} className="mb-4 relative">
                                                            <div className="absolute w-2   -left-2 top-2" />
                                                            <h4 className="text-white/70 text-[10px] font-extrabold uppercase tracking-wider mb-2 ml-2 flex items-center gap-1.5"><FolderPlus size={10} className="text-purple-400" /> {chapter.title}</h4>
                                                            
                                                            <div className="pl-3   ml-3">
                                                                {chapter.scenes?.map((sc) => (
                                                                    <div 
                                                                        key={sc.id} 
                                                                        onClick={() => { setActiveChapterId(chapter.id); setActiveSceneId(sc.id); }}
                                                                        className={`p-2 mb-1 text-xs rounded-lg cursor-pointer transition-colors flex items-center justify-between group relative ${activeSceneId === sc.id ? 'bg-[#c4ff00]/10 text-[#c4ff00] font-semibold border-[#c4ff00]/20' : 'text-white/60 hover:bg-white/5 hover:text-white '}`}
                                                                    >
                                                                        <div className="absolute w-3   -left-3 top-1/2 -translate-y-1/2" />
                                                                        <span className="truncate flex items-center gap-1.5"><FilePlus size={10} className={activeSceneId === sc.id ? "text-[#c4ff00]" : "text-white/20 group-hover:text-white/40"} /> {sc.title}</span>
                                                                        {sc.isProtected && <Shield size={10} className="text-[#c4ff00]" />}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Poe Assistant Box */}
                                <div className="bg-[#1e1f22]/75 border border-white/5 backdrop-blur-[24px] rounded-lg flex flex-col p-4 pointer-events-auto h-[280px] shrink-0">
                                    <div className="flex items-center justify-between mb-4 pb-4 shrink-0">
                                        <h3 className="text-white/80 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                                            <User size={14} className="text-[#38bdf8]" /> Poe Assistant
                                        </h3>
                                        <span className="text-[10px] bg-[#38bdf8]/10 text-[#38bdf8] font-sans px-2 py-0.5 rounded-full font-bold">
                                            IA
                                        </span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                        <div className="bg-white/[0.04] text-white/70 text-[11px] font-sans p-3 rounded-lg rounded-tl-none selection:bg-[#38bdf8]/30">
                                            ¡Hola! Soy Poe, tu asistente narrativo. Puedo ayudarte a revisar el tono, encontrar huecos argumentales o sugerir continuaciones basadas en el radar de análisis. ¿En qué trabajamos hoy?
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 shrink-0">
                                        <div className="flex bg-[#141517] rounded-md focus-within:ring-1 ring-[#38bdf8]/30 p-1">
                                            <input type="text" placeholder="Escribe a Poe..." className="flex-1 bg-transparent border-none text-xs text-white px-3 outline-none" />
                                            <button className="p-1.5 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 rounded-lg text-[#38bdf8] transition-colors cursor-pointer">
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            {/* 2. Main Writing Area (Center) */}
            <div 
                ref={editorContainerRef}
                className="flex-1 flex flex-col bg-transparent rounded-lg overflow-hidden relative min-w-0"
                onMouseUp={handleSelection}
            >
                {/* FLOATING TEXT SELECTION DIALOG (CONTEXTUAL MICRO-IA OVERLAY) */}
                <AnimatePresence>
                    {showSelectionBar && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 10 }}
                            className="absolute bg-[#1e1f22] border border-white/5 p-1 rounded-lg z-50 flex items-center gap-0.5"
                            style={{
                                top: `${Math.max(10, selectionCoords.top)}px`,
                                left: `${Math.max(10, selectionCoords.left)}px`
                            }}
                        >
                            <button 
                                onClick={() => applyAIRephrase('reescribir')}
                                className="text-[10px] text-white/80 hover:text-white hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider"
                            >
                                Reescribir
                            </button>
                            <button 
                                onClick={() => applyAIRephrase('expandir')}
                                className="text-[10px] text-white/80 hover:text-white hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider"
                            >
                                Expandir
                            </button>
                            <button 
                                onClick={() => applyAIRephrase('reducir')}
                                className="text-[10px] text-white/80 hover:text-white hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider"
                            >
                                Reducir
                            </button>
                            <button 
                                onClick={() => applyAIRephrase('intensificar')}
                                className="text-[10px] text-white/80 hover:text-white hover:bg-[#c4ff00]/10 hover:text-[#c4ff00] px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider flex items-center gap-1"
                            >
                                <Sparkles size={10} /> Intensificar
                            </button>
                            
                            <div className="relative">
                                <button 
                                    onClick={() => setCurrentTonoDropdown(!currentTonoDropdown)}
                                    className="text-[10px] text-white/60 hover:text-white hover:bg-white/5 px-2.5 py-1.5 rounded-lg transition-colors font-bold uppercase tracking-wider flex items-center gap-0.5"
                                >
                                    Tono...
                                </button>
                                {currentTonoDropdown && (
                                    <div className="absolute bottom-full left-0 mb-1.5 bg-[#25262a] border border-white/5 rounded-md p-1 flex flex-col min-w-[100px] z-50">
                                        {['Épico', 'Melancólico', 'Íntimo', 'Tensión'].map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => {
                                                    applyAIRephrase('tono');
                                                    setCurrentTonoDropdown(false);
                                                }}
                                                className="text-[9px] text-white/70 hover:text-white hover:bg-white/5 p-1.5 rounded-lg text-left font-semibold uppercase"
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="w-[1px] h-4 bg-white/10 mx-1" />

                            <button
                                onClick={() => {
                                    if (currentScene) {
                                        const updatedChapters = chapters.map(chap => {
                                            return {
                                                ...chap,
                                                scenes: chap.scenes.map(sc => {
                                                    if (sc.id === activeSceneId) {
                                                        return { ...sc, isProtected: !sc.isProtected };
                                                    }
                                                    return sc;
                                                })
                                            };
                                        });
                                        setChapters(updatedChapters);
                                        setShowSelectionBar(false);
                                        triggerNotification(currentScene.isProtected ? 'Bloqueo liberado.' : 'Texto protegido contra IA.');
                                    }
                                }}
                                className={`text-[10px] px-2.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors ${
                                    currentScene?.isProtected 
                                        ? 'bg-[#c4ff00]/20 text-[#c4ff00]' 
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                                title="Fijar este fragmento para que la IA no pueda editarlo"
                            >
                                Proteger
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Subpanel Container (Scene Header and document) */}
                <div className="flex-1 overflow-y-auto px-6 pointer-events-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Scene metadata structure header */}
                    {currentScene ? (
                        <div className="max-w-4xl mx-auto w-full pt-8 pb-[120px] space-y-6">
                            {/* DOCUMENT SHEET CANVAS - FULL US LETTER PAGE DESIGN WITH FLUID ENTRANX/EXIT ANIMATION */}
                            <motion.div 
                                initial={{ y: 650, opacity: 0, scale: 0.93 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 650, opacity: 0, scale: 0.93 }}
                                transition={{ 
                                    type: 'spring', 
                                    stiffness: 110, 
                                    damping: 22, 
                                    mass: 1.1,
                                    duration: 0.85
                                }}
                                className="w-full max-w-[816px] mx-auto overflow-y-auto bg-[#f4f1ea] text-[#2a2c33] rounded-md border border-black/[0.04] relative group select-text flex flex-col justify-start shadow-md"
                                style={{ aspectRatio: '8.5 / 11', padding: '0.8in 1in 0.8in 1in' }}
                            >
                                {/* Botón de configuración de hoja (Sliders) */}
                                <div className="absolute top-4 right-5 z-20">
                                    <button 
                                        className="h-7 px-2.5 rounded-md border border-black/10 hover:border-black/25 bg-white/50 hover:bg-white/80 active:scale-95 flex items-center gap-1.5 text-black/55 hover:text-black/85 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
                                        title="Ajustes de Maquetación de Hoja"
                                    >
                                        <SlidersHorizontal size={11} strokeWidth={2.5} />
                                        <span>Ajustes</span>
                                    </button>
                                </div>

                                {/* Cabecera de Página de Manuscrito */}
                                <div className="border-b border-black/[0.1] pb-3 mb-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-black/45 uppercase relative z-10 select-none">
                                    <span>Manuscrito: {currentScene?.title || "Escena Activa"}</span>
                                    <span>Borrador Principal</span>
                                </div>
                                
                                {/* Objetivo de escena pill box as Checklist - INTERACTIVE */}
                                <div className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-300 mb-10 select-none ${
                                    completedTensionScenes[currentScene.id]
                                        ? 'bg-[#8ab300]/10 text-[#2a2c33]'
                                        : 'bg-black/5 text-[#2a2c33]/70'
                                }`}>
                                    <button 
                                        onClick={() => {
                                            toggleTensionScene(currentScene.id);
                                            triggerNotification(
                                                completedTensionScenes[currentScene.id] 
                                                    ? 'Objetivo de tensión marcado como pendiente.' 
                                                    : '¡Excelente! Objetivo de tensión completado.'
                                            );
                                        }}
                                        className={`mt-1 w-5 h-5 rounded flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer ${
                                            completedTensionScenes[currentScene.id]
                                                ? 'bg-[#8ab300] text-white'
                                                : 'bg-black/10 hover:bg-black/20 text-transparent'
                                        }`}
                                    >
                                        <Check size={12} strokeWidth={3} />
                                    </button>
                                    <div className="flex-1">
                                        <div className="text-[10px] text-black/50 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <CheckSquare size={12} className={completedTensionScenes[currentScene.id] ? 'text-[#8ab300]' : 'text-black/40'} />
                                            <span>Tensión / Objetivo de Escena</span>
                                            {completedTensionScenes[currentScene.id] && (
                                                <span className="text-[9px] bg-[#8ab300]/10 text-[#8ab300] font-sans px-2 py-0.5 rounded-full font-extrabold normal-case leading-none tracking-normal">Completado</span>
                                            )}
                                        </div>
                                        <p 
                                            ref={objectiveRef}
                                            className={`text-xs font-sans leading-relaxed outline-none transition-all duration-300 select-text ${
                                                completedTensionScenes[currentScene.id] 
                                                    ? 'text-black/40 line-through decoration-black/25' 
                                                    : 'text-black/80'
                                            }`} 
                                            contentEditable 
                                            suppressContentEditableWarning
                                            onInput={handleObjectiveTyping}
                                        />
                                    </div>
                                </div>

                                <h1 
                                    ref={titleRef}
                                    className="font-serif text-3xl md:text-4xl font-extrabold outline-none tracking-tight   pb-4 text-[#1a1b1e]" 
                                    contentEditable 
                                    suppressContentEditableWarning
                                    onInput={handleTitleTyping}
                                />

                                <p 
                                    ref={editableRef}
                                    className="font-serif text-[16px] md:text-[17px] leading-[1.8] outline-none min-h-[500px] whitespace-pre-wrap select-text selection:bg-[#c4ff00]/40 text-[#2a2c33] mt-6 tracking-wide"
                                    contentEditable 
                                    suppressContentEditableWarning
                                    onInput={handleContentTyping}
                                />

                                {/* Pie de Página de Manuscrito */}
                                <div className="border-t border-black/[0.1] pt-3 mt-auto flex justify-between items-center text-[9px] font-mono text-black/45 uppercase tracking-wider relative z-10 select-none">
                                    <span>Foco: {currentScene?.characters && currentScene.characters.length > 0 ? currentScene.characters.join(', ') : 'Sin focalización'}</span>
                                    <span>Nodia Writer • {(currentScene?.content || '').split(/\s+/).filter(Boolean).length || 0} palabras</span>
                                </div>
                            </motion.div>

                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-white/40 text-sm font-sans pt-[96px]">
                            Selecciona una escena válida en el menú lateral para iniciar la redacción.
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Right Sidebar - Radar Poe Analytical Scanner with High-End Glassmorphism */}
                <AnimatePresence>
                    {!isFocusMode && (
                        <div className="relative shrink-0 pointer-events-auto h-full flex select-none py-4">
                            {/* Glowing Color Orbs behind the Glassmorphic box */}
                            <motion.div 
                            animate={{ 
                                opacity: [0.3, 0.4, 0.3],
                                scale: [1, 1.06, 1],
                            }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute top-[20%] right-[40px] w-[200px] h-[200px] rounded-full bg-fuchsia-600/30 blur-[64px] pointer-events-none -z-10"
                        />
                        <motion.div 
                            animate={{ 
                                opacity: [0.22, 0.32, 0.22],
                                scale: [1, 0.94, 1],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bottom-[10%] left-[20px] w-[160px] h-[160px] rounded-full bg-indigo-500/25 blur-[50px] pointer-events-none -z-10"
                        />
                        <motion.div 
                            initial={{ x: 250, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 250, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="w-[325px] shrink-0 h-full pointer-events-none flex flex-col gap-4"
                        >
                            {/* RADAR POE ANALÍTICO BOX (Toggleable) */}
                            <AnimatePresence>
                                {radarVisible && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                        className="bg-[#1e1f22]/85 border border-white/5 backdrop-blur-[24px] rounded-lg p-3 overflow-hidden shrink-0 pointer-events-auto"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-white/80 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                                                <Activity size={14} className="text-purple-400 animate-pulse" /> Radar Poe Analítico
                                            </h3>
                                            <button 
                                                onClick={handleSceneAnalysis}
                                                title="Actualizar scanner radar"
                                                className="text-purple-400 hover:text-white transition-colors active:scale-95 cursor-pointer"
                                            >
                                                <RefreshCw size={12} />
                                            </button>
                                        </div>

                                        {/* Top primary trigger chips */}
                                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                                            <button
                                                onClick={handleSceneAnalysis}
                                                className="dynamic-btn p-2 hover:bg-white/5 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                                                style={{ '--icon-color': '#c4ff00' } as React.CSSProperties}
                                            >
                                                <Wand2 size={13} className="text-[#c4ff00] mb-1" />
                                                <span className="text-[9px] text-white/75 font-semibold leading-tight">Detectar Señales</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    triggerNotification('Agrupando señales por Personaje, Entorno, y Conflicto.');
                                                }}
                                                className="dynamic-btn p-2 hover:bg-white/5 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                                                style={{ '--icon-color': '#38bdf8' } as React.CSSProperties}
                                            >
                                                <Layout size={13} className="text-blue-400 mb-1" />
                                                <span className="text-[9px] text-white/75 font-semibold leading-tight">Agrupar</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    triggerNotification('Mostrando riesgos estructurales identificados en la prosa.');
                                                }}
                                                className="dynamic-btn p-2 hover:bg-white/5 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                                                style={{ '--icon-color': '#f87171' } as React.CSSProperties}
                                            >
                                                <AlertTriangle size={13} className="text-rose-400 mb-1" />
                                                <span className="text-[9px] text-white/75 font-semibold leading-tight">Ver Riesgos</span>
                                            </button>
                                        </div>

                                        {/* Visual Pacing & Metric Diagnostics list */}
                                        <div className="grid grid-cols-5 gap-1 mb-4">
                                            {[
                                                { id: 'ritmo', label: 'Ritmo', raw: cognitiveMetrics.ritmo },
                                                { id: 'tension', label: 'Tensión', raw: cognitiveMetrics.tension },
                                                { id: 'claridad', label: 'Claridad', raw: cognitiveMetrics.claridad },
                                                { id: 'coherencia', label: 'Coherencia', raw: cognitiveMetrics.coherencia },
                                                { id: 'subtexto', label: 'Subtexto', raw: cognitiveMetrics.subtexto }
                                            ].map((m) => (
                                                <div key={m.id} className="flex flex-col items-center">
                                                    <div className="relative w-8 h-8 flex items-center justify-center rounded-full mb-1">
                                                        <span className="text-[10px] font-mono font-bold text-white z-10">{m.raw}</span>
                                                        {/* Simple circular background progress stroke simulation */}
                                                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                                                            <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1.5" />
                                                            <circle 
                                                                cx="16" 
                                                                cy="16" 
                                                                r="14" 
                                                                fill="none" 
                                                                stroke={m.id === 'tension' ? '#f43f5e' : m.id === 'ritmo' ? '#bc52f5' : '#c4ff00'} 
                                                                strokeWidth="1.5" 
                                                                strokeDasharray="88"
                                                                strokeDashoffset={88 - (88 * m.raw) / 100}
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="text-[8px] text-white/40 mt-1 uppercase font-semibold font-sans scale-90">{m.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Layer Toggles */}
                                        <div className="flex items-center justify-between bg-transparent p-1 mb-2">
                                            {Object.entries({
                                                callbacks: 'Señales',
                                                riesgos: 'Riesgos',
                                                canon: 'Canon',
                                                alineacion: 'Personajes'
                                            }).map(([key, label]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => setLayerVisibility(prev => ({ ...prev, [key as keyof typeof prev]: !prev[key as keyof typeof prev] }))}
                                                    className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-colors ${layerVisibility[key as keyof typeof layerVisibility] ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
                                                >
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        {/* Diagnostic Subpanel Contents list */}
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pb-4">
                            
                            {/* BOX: SEÑALES (HIGHLIGHTING FACTS OR SYMBOLS DETECTED FOR NARRATIVE CALLBACKS) */}
                            {layerVisibility.callbacks && (
                            <div className="bg-[#1e1f22]/85 border border-white/5 backdrop-blur-[24px] rounded-lg p-3.5 space-y-3 pointer-events-auto">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-white/50 font-bold uppercase">Callbacks e Indirectas</span>
                                        <button 
                                            onClick={() => triggerNotification('Señales de ambientación re-escaneadas.')}
                                            className="text-[9px] text-[#c4ff00] font-sans hover:underline cursor-pointer"
                                        >
                                            Escanear
                                        </button>
                                    </div>
                                    <div className="space-y-1.5">
                                        {detectedSignals.map((sig) => (
                                            <div key={sig.id} className="p-2 bg-transparent relative overflow-hidden flex items-start gap-2">
                                                <input 
                                                    type="checkbox" 
                                                    checked={sig.checked}
                                                    onChange={() => {
                                                        const updated = detectedSignals.map(s => s.id === sig.id ? { ...s, checked: !s.checked } : s);
                                                        setDetectedSignals(updated);
                                                        triggerNotification(`Señal "${sig.text}" resuelta.`);
                                                    }}
                                                    className="mt-1"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`text-[8px] px-1 py-0.5 rounded font-bold uppercase ${
                                                            sig.type === 'Símbolo' ? 'bg-purple-500/10 text-[#c084fc]' : 'bg-blue-500/10 text-blue-400'
                                                        }`}>
                                                            {sig.type}
                                                        </span>
                                                        <span className="text-white/95 text-[10px] font-extrabold">{sig.text}</span>
                                                    </div>
                                                    <p className="text-[9px] text-white/45 mt-0.5 leading-relaxed font-sans">
                                                        {sig.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1  border-white/[0.02] pt-1">
                                                        <button 
                                                            onClick={() => triggerNotification('Señal exportada temporalmente a nodos creativos.')}
                                                            className="text-[8px] text-white/45 hover:text-[#c4ff00] cursor-pointer"
                                                        >
                                                            Mandadar a Nodos
                                                        </button>
                                                        <button 
                                                            onClick={() => triggerNotification('Señal conectada con el arco de personajes.')}
                                                            className="text-[8px] text-white/45 hover:text-white cursor-pointer"
                                                        >
                                                            Conectar Arco
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BOX: RIESGOS (HIGHLIGHT WARNINGS OF LOGICAL FAILURES) */}
                            {layerVisibility.riesgos && (
                            <div className="bg-[#1e1f22]/85 border border-white/5 backdrop-blur-[24px] rounded-lg p-3.5 space-y-3 pointer-events-auto">
                                    <span className="text-[10px] text-white/50 font-bold uppercase flex items-center gap-1">
                                        <AlertTriangle size={11} className="text-amber-400" /> Huecos en Continuidad
                                    </span>
                                    <div className="space-y-2">
                                        {activeRiesgos.map((r, idx) => (
                                            <div key={idx} className="p-2.5 bg-transparent flex gap-2">
                                                <AlertTriangle size={14} className="text-rose-450 shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-white/80 leading-relaxed font-sans">
                                                        {r}
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        <button 
                                                            onClick={() => {
                                                                setActiveRiesgos(activeRiesgos.filter((_, i) => i !== idx));
                                                                triggerNotification('Riesgo resuelto con éxito.');
                                                            }}
                                                            className="text-[8px] text-rose-400 hover:text-white font-bold uppercase tracking-wider cursor-pointer"
                                                        >
                                                            Resolver
                                                        </button>
                                                        <button 
                                                            onClick={() => triggerNotification('Sugerencia ignorada debidamente.')}
                                                            className="text-[8px] text-white/30 hover:text-white/70 font-bold uppercase tracking-wider cursor-pointer"
                                                        >
                                                            Ignorar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BOX: COHERENCIA Y CONTINUIDAD (GLOBAL LAX STRATEGY FACTS CHECKER) */}
                            {layerVisibility.canon && (
                            <div className="bg-[#1e1f22]/85 border border-white/5 backdrop-blur-[24px] rounded-lg p-3.5 space-y-3 pointer-events-auto">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-white/50 font-bold uppercase">Datos del Canon Oficial</span>
                                        <button 
                                            onClick={() => triggerNotification('Verificando concordancia del canon en todo el texto del manuscrito.')}
                                            className="text-[9px] text-blue-400 hover:underline cursor-pointer"
                                        >
                                            Revisar Continuidad
                                        </button>
                                    </div>
                                    <div className="space-y-1.5">
                                        {canonFacts.map((fact, idx) => (
                                            <div key={idx} className="p-2 bg-transparent flex gap-2">
                                                <CheckSquare size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-[10px] text-white/75 font-sans leading-relaxed">
                                                        {fact}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <button 
                                                            onClick={() => {
                                                                const issueNote = prompt('Describe tu duda de continuidad relacionada con este hecho:');
                                                                if (issueNote) {
                                                                    triggerNotification(`Duda marcada: ${issueNote}`);
                                                                }
                                                            }}
                                                            className="text-[8px] text-amber-400 hover:text-white cursor-pointer"
                                                        >
                                                            Marcar Duda
                                                        </button>
                                                        <button 
                                                            onClick={() => {
                                                                triggerNotification('Mostrando consecuencias mecánicas y arcos de personajes.');
                                                            }}
                                                            className="text-[8px] text-white/40 hover:text-white cursor-pointer"
                                                        >
                                                            Ver Consecuencias
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BOX: PERSONAJES (DETAILED DRIVER TRACKER) */}
                            {layerVisibility.alineacion && (
                            <div className="bg-[#1e1f22]/85 border border-white/5 backdrop-blur-[24px] rounded-lg p-3.5 space-y-3 pointer-events-auto">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-white/50 font-bold uppercase tracking-wider">Alineación & Roles</span>
                                        <div className="flex items-center gap-1 bg-white/5 rounded p-0.5">
                                            <button className="px-2 py-0.5 rounded bg-white/10 text-white text-[9px] font-medium">Bento</button>
                                            <button className="px-2 py-0.5 rounded text-white/40 hover:text-white text-[9px] font-medium transition-colors">Moral</button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        {currentScene?.characters.map((char, idx) => {
                                            // Mock data depending on index for visual diversity
                                            const isProtagonist = idx === 0;
                                            const role = isProtagonist ? 'POV Principal' : (idx === 1 ? 'Antagonista Ambiguo' : 'Catalizador');
                                            const roleColor = isProtagonist ? 'text-[#c4ff00]' : (idx === 1 ? 'text-rose-400' : 'text-blue-400');
                                            const bgGrad = isProtagonist ? 'from-[#c4ff00]/20 to-[#8ab300]/20' : (idx === 1 ? 'from-rose-500/20 to-orange-500/20' : 'from-blue-500/20 to-indigo-500/20');
                                            const agency = isProtagonist ? 82 : (idx === 1 ? 65 : 40);
                                            const empathy = isProtagonist ? 70 : (idx === 1 ? 30 : 60);
                                            const threat = isProtagonist ? 10 : (idx === 1 ? 85 : 5);
                                            const arc = isProtagonist ? 'Duda → Acción' : (idx === 1 ? 'Secreto → Quiebre' : 'Estático');

                                            return (
                                                <div key={char} className="p-3 bg-transparent transition-colors group">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${bgGrad} flex items-center justify-center font-bold text-white`}>
                                                                {char[0]}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs text-white font-extrabold">{char}</span>
                                                                <span className={`text-[9px] uppercase tracking-wider font-bold ${roleColor}`}>{role}</span>
                                                            </div>
                                                        </div>
                                                        {isProtagonist && <div className="w-1.5 h-1.5 rounded-full bg-[#c4ff00]" title="Foco Narrativo" />}
                                                    </div>
                                                    
                                                    <div className="space-y-2 mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] text-white/40 w-12">Agencia</span>
                                                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${agency}%` }} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] text-white/40 w-12">Empatía</span>
                                                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-purple-400 rounded-full" style={{ width: `${empathy}%` }} />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] text-white/40 w-12">Amenaza</span>
                                                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-rose-400 rounded-full" style={{ width: `${threat}%` }} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between text-[9px] bg-white/[0.02] p-2 rounded-lg ">
                                                        <span className="text-white/40">Arco actual:</span>
                                                        <span className="text-white/70 font-semibold">{arc}</span>
                                                    </div>

                                                    <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => triggerNotification(`Ethyria: Solicitando análisis profundo de ${char}...`)}
                                                            className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                                                        >
                                                            Preguntar a IA
                                                        </button>
                                                        <button 
                                                            className="flex-1 py-1.5 bg-[var(--lime)]/10 hover:bg-[var(--lime)]/20 text-[var(--lime)] rounded-lg text-[9px] font-bold transition-colors cursor-pointer"
                                                        >
                                                            Fix Arco
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        
                                        {!currentScene?.characters.length && (
                                            <div className="text-white/30 text-xs text-center py-6 rounded-lg bg-white/[0.02]">
                                                No hay personajes detectados en esta escena. Escribe para registrarlos o añadelos manualmente.
                                            </div>
                                        )}

                                        <button 
                                            onClick={() => {
                                                const newChar = prompt('Nombre del personaje a forzar registro:');
                                                if (newChar && currentScene) {
                                                    const updatedChapters = chapters.map(chap => {
                                                        return {
                                                            ...chap,
                                                            scenes: chap.scenes.map(sc => {
                                                                if (sc.id === activeSceneId) {
                                                                    return { ...sc, characters: [...sc.characters, newChar] };
                                                                }
                                                                return sc;
                                                            })
                                                        };
                                                    });
                                                    setChapters(updatedChapters);
                                                    triggerNotification(`Personaje "${newChar}" añadido al registro de Nodia.`);
                                                }
                                            }}
                                            className="w-full py-2.5 mt-2   hover: text-white/40 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors"
                                        >
                                            + Forzar Registro Manual
                                        </button>
                                    </div>
                            </div>
                            )}

                            {/* BOX: ARCOS NARRATIVOS (PLOT TRACKING BEATS) */}
                            <div className="bg-[#1e1f22]/85 border border-white/5 backdrop-blur-[24px] rounded-lg p-3.5 space-y-3">
                                    <span className="text-[10px] text-white/50 font-bold uppercase">Acoplamiento con Arcos Superiores</span>
                                    <div className="p-2.5 rounded-xl bg-purple-500/5 ">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] text-white font-extrabold font-mono">Arco: La Traición del Gremio</span>
                                            <span className="text-[8px] bg-purple-500/20 text-[#c084fc] px-1 rounded font-bold">Clímax</span>
                                        </div>
                                        <p className="text-[9px] text-white/50 leading-relaxed font-sans">
                                            Esta escena actúa como revelación de secretos guardados. Conecta directamente con el desenlace del Capítulo 3.
                                        </p>
                                        
                                        <div className="flex items-center gap-2 mt-2  border-white/[0.03] pt-2">
                                            <button 
                                                onClick={() => triggerNotification('Marcado como punto de giro crítico.')}
                                                className="text-[8px] text-[#c4ff00] hover:underline cursor-pointer"
                                            >
                                                Marcar Punto de Giro
                                            </button>
                                            <button 
                                                onClick={() => triggerNotification('Visualizando flujo temporal del arco principal.')}
                                                className="text-[8px] text-white/40 hover:text-white cursor-pointer font-sans"
                                            >
                                                Ver Progreso
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => triggerNotification('Vinculado a un nuevo arco argumental del storyboard.')}
                                        className="w-full py-1.5   hover: text-white/50 rounded-xl text-[9px] font-bold uppercase tracking-wider cursor-pointer"
                                    >
                                        Asignar a Arco Mayor
                                    </button>
                                </div>

                        </div>
                    </motion.div>
                    </div>
                )}
            </AnimatePresence>
            </div>
        </motion.div>
    );
};
