'use client';

import React, { useState } from 'react';
import { useResponsive } from '@/app/hooks/useResponsive';
import { useAppStore, ViewMode, GridType, WorkspaceMode } from '@/app/store/useAppStore';
import { 
    Settings, 
    Eye, 
    Grid3x3, 
    MousePointer2, 
    Move, 
    Maximize, 
    RotateCw,
    CircleDot,
    Map,
    Box,
    Minus,
    Square,
    X,
    Bold, Italic, Underline, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Quote, Highlighter, Undo, Redo,
    MessageSquarePlus,
    Compass, FolderPlus, FilePlus, StickyNote, Sparkles, Wand2, Mic, Layout, Download, Shield, Cloud, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, designTokens } from '@/lib/utils';
import { LowPolyModeSelector } from '@/app/components/interface/LowPolyModeSelector';
import { usePoeStore } from '@/app/store/usePoeStore';
import { ExportModal } from './ExportModal';
import { I_Folder, I_Download, I_Cloud, I_Settings } from '../atoms/LowPolyIcons';

const VIEW_MODES: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'canvas', label: 'Canvas', icon: <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.8"/> },
    { id: '2d', label: '2D', icon: <polygon points="12,2 22,7 12,12 2,7" fill="currentColor" opacity="0.8"/> },
    { id: '3d', label: '3D', icon: <> <polygon points="12,12 22,7 22,17 12,22" fill="currentColor" opacity="0.8"/> <polygon points="12,12 2,7 2,17 12,22" fill="currentColor" opacity="0.5"/> </> },
    { id: 'top_2d', label: 'Top 2D', icon: <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.8" /> },
    { id: 'orto', label: 'Ortográfico', icon: <polygon points="4,4 20,4 20,20 4,20" fill="currentColor" opacity="0.8" /> }
];

const GRID_TYPES: { id: GridType; label: string; icon: React.ReactNode }[] = [
    { id: 'grid', label: 'Cuadrícula', icon: <Grid3x3 size={16} /> },
    { id: 'dots', label: 'Puntos', icon: <CircleDot size={16} /> },
    { id: 'thick_dots', label: 'Punto Grueso', icon: <CircleDot size={16} strokeWidth={3} /> },
    { id: 'none', label: 'Ocultar todo', icon: <Eye size={16} className="opacity-40" /> },
];

const ToolButton = ({ 
    icon: Icon, 
    active = false, 
    title, 
    onClick 
}: { 
    icon: any; 
    active?: boolean; 
    title?: string; 
    onClick?: (e: React.MouseEvent) => void; 
}) => (
    <button 
        onMouseDown={(e) => {
            e.preventDefault(); // Previene la pérdida de la selección en el contentEditable
            if (onClick) onClick(e);
        }}
        title={title}
        className={cn(
 "p-2 rounded-lg transition-all duration-200 flex items-center justify-center active:scale-90",
            active 
                ? "bg-[#c4ff00]/10 text-[#c4ff00]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
        )}
    >
        <Icon className="w-4 h-4" />
    </button>
);

const Divider = () => <div className="w-1.5" />;

interface UnifiedTopBarProps {
    nodeCount: number;
    activeSceneLabel: string;
    onSceneManagerClick: () => void;
    showNodes: boolean;
    onToggleNodes: () => void;
    aiVisible: boolean;
    onToggleChat: () => void;
    settingsVisible: boolean;
    onToggleSettings: () => void;
}

export const UnifiedTopBar = ({ 
    nodeCount, 
    activeSceneLabel, 
    onSceneManagerClick, 
    showNodes, 
    onToggleNodes,
    aiVisible,
    onToggleChat,
    settingsVisible,
    onToggleSettings
}: UnifiedTopBarProps) => {
    const { 
        workspaceMode, setWorkspaceMode,
        viewMode, setViewMode, 
        gridType, setGridType, 
        activeToolId, setActiveTool, 
        showOutlineOnly, setShowOutlineOnly,
        gridConfig, setGridConfig
    } = useAppStore();

    const {
        chapters,
        activeChapterId,
        activeSceneId,
        isFocusMode,
        isDictating,
        setActiveChapterId,
        setActiveSceneId,
        setIsFocusMode,
        setIsDictating,
        addNewChapter,
        addNewScene,
        addNote,
        triggerAISuggestion,
        triggerSceneAnalysis,
        showChaptersMenu,
        setShowChaptersMenu,
        autoSaveStatus,
        radarVisible,
        setRadarVisible
    } = usePoeStore();
    
    const { isMobile, isCompact, width, isMounted } = useResponsive();
    const [viewMenuOpen, setViewMenuOpen] = useState(false);
    const [eyeMenuOpen, setEyeMenuOpen] = useState(false);
    const [exportModalOpen, setExportModalOpen] = useState(false);

    const activeView = VIEW_MODES.find(m => m.id === viewMode) || VIEW_MODES[0];
    const activeGrid = GRID_TYPES.find(g => g.id === gridType) || GRID_TYPES[0];

    const isVeryCompact = isMounted && width < 1100;

    const handleFormat = (command: string, arg: string = '') => {
        try {
            document.execCommand(command, false, arg);
        } catch (e) {
            console.error("Format error", e);
        }
    };

    const toolBtnClass = (isActive: boolean, colorVar: string) => 
        cn(
 "relative flex items-center justify-center rounded-[12px] transition-all duration-300 pointer-events-auto",
            isVeryCompact ? "w-[36px] h-[36px]" : "w-[40px] h-[40px]",
            isActive 
                ? "bg-[length:100%_100%] text-white" 
                : "text-white/50 hover:bg-white/5 hover:text-white/90 active:scale-95"
        );

    // Dynamic style for active tool to ensure correct color
    const getActiveStyle = (isActive: boolean, colorVar: string) => {
        if (!isActive) return {};
        return {
            backgroundColor: `rgba(from ${colorVar} r g b / 0.15)`,
            color: colorVar,
        };
    };

    if (!isMounted) return null;

    return (
        <header className={cn(
            "absolute top-0 left-0 right-0 z-[100] flex flex-col pointer-events-auto bg-[#151619]/90 border-b border-white/5 backdrop-blur-[24px] w-full transition-all duration-300 overflow-visible",
            ((workspaceMode as string) === 'home' || (workspaceMode as string) === 'nodos') ? "h-[48px]" : "h-[96px]"
        )}>
            {/* ========================================== */}
            {/* TIER 1: GLOBAL NAVIGATION                  */}
            {/* ========================================== */}
            <div data-tier="tier-1" className="flex items-center justify-between px-6 h-[48px] w-full shrink-0 relative">
                
                {/* Branding - Left */}
                <div className="flex items-center gap-6 px-2 relative z-10">
                    <div 
                        className="font-sans font-black tracking-[-0.03em] text-[20px] uppercase text-white select-none transition-colors cursor-default flex items-center pr-2"
                        style={{}}
                    >
                        NODI<span className="text-[#c4ff00]">A</span>
                    </div>
                    
                    {/* Project Controls */}
                    <div className="flex items-center gap-4">
                        <button className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white transition-transform hover:scale-110" title="Abrir Proyecto">
                            <I_Folder />
                        </button>
                        <button className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white transition-transform hover:scale-110" title="Guardar Proyecto">
                            <I_Download />
                        </button>
                        <div className="relative group flex items-center">
                            <button className="w-5 h-5 flex items-center justify-center transition-transform hover:scale-110 text-white/50 hover:text-white relative" title="Guardado Automático">
                                {autoSaveStatus === 'guardado' ? (
                                    <I_Cloud />
                                ) : (
                                    <>
                                        <div className="text-amber-500/80 w-full h-full"><I_Cloud /></div>
                                        <span className="absolute top-[0px] right-[0px] w-[4px] h-[4px] bg-amber-400 rounded-full animate-ping" />
                                    </>
                                )}
                            </button>
                            <div className="absolute top-[calc(100%+4px)] left-0 bg-[#0a0c10]/95 backdrop-blur-3xl rounded-lg p-2 flex flex-col gap-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 min-w-[160px] ">
                                <h3 className="text-[10px] text-white/40 uppercase font-bold tracking-widest mb-1 px-1">Frecuencia de Autoguardado</h3>
                                <button className="text-[10px] text-left px-2 py-1.5 hover:bg-white/10 rounded whitespace-nowrap text-white/70 flex items-center justify-between">Cada 1 min <RotateCw size={10} className="ml-2 text-[#8ab300]" /></button>
                                <button className="text-[10px] text-left px-2 py-1.5 hover:bg-white/10 rounded whitespace-nowrap text-white/70 flex items-center justify-between">Cada 5 min</button>
                                <button className="text-[10px] text-left px-2 py-1.5 hover:bg-white/10 rounded whitespace-nowrap text-white/70 flex items-center justify-between">Cada 10 min</button>
                                <div className="h-[1px] bg-white/10 my-1 mx-1" />
                                <button className="text-[10px] text-left px-2 py-1.5 hover:bg-rose-500/20 text-rose-400 rounded whitespace-nowrap">Desactivar Automático</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Mode Switcher occupies the absolute horizontal center of Tier 1 */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none flex items-center h-[36px] z-20">
                    
                    {/* Settings, Focus, and Export tools, positioned to the left of the center pill */}
                    <AnimatePresence>
                        {workspaceMode === 'poe' && (
                            <div className="absolute right-[calc(100%+16px)] flex items-center gap-4">
                                <div className="relative group">
                                    <button className="flex items-center justify-center w-5 h-5 text-white/40 hover:text-white transition-transform hover:scale-110 outline-none" title="Configuración de página">
                                        <I_Settings />
                                    </button>
                                    <div className="absolute top-[calc(100%+8px)] left-0 mt-2 w-56 bg-[#0c0e12]/95 backdrop-blur-[30px]  rounded-xl p-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 origin-top-left">
                                        <div className="mb-2 pb-2 ">
                                            <h3 className="text-white/70 text-[10px] font-bold uppercase tracking-wider mb-2">Diseño</h3>
                                            <button className="w-full text-left text-xs px-2 py-1.5 hover:bg-white/10 rounded text-white/90">Hoja continua</button>
                                            <button className="w-full text-left text-xs px-2 py-1.5 hover:bg-white/10 rounded text-white/90">Corte por página</button>
                                        </div>
                                        <div className="pt-1">
                                            <h3 className="text-white/70 text-[10px] font-bold uppercase tracking-wider mb-2">Formato</h3>
                                            <button className="w-full text-left text-xs px-2 py-1.5 hover:bg-white/10 rounded text-white/90 flex justify-between items-center">Sangría <span className="text-white/30">1.25cm</span></button>
                                            <button className="w-full text-left text-xs px-2 py-1.5 hover:bg-white/10 rounded text-white/90 flex justify-between items-center">Reglas <span className="bg-[#c4ff00]/20 text-[#c4ff00] px-1 rounded">ON</span></button>
                                            <button className="w-full text-left text-xs px-2 py-1.5 hover:bg-white/10 rounded text-white/90 flex justify-between items-center">Tamaño <span className="text-white/30">12pt</span></button>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsFocusMode(!isFocusMode)}
                                    title="Modo Enfoque"
                                    className={cn("flex items-center justify-center w-[32px] h-[32px] rounded-lg transition-colors outline-none", isFocusMode ? "bg-[#c4ff00]/15 text-[#c4ff00]" : "text-white/40 hover:bg-white/5 hover:text-white")}
                                >
                                    <Layout size={14} />
                                </button>
                                <button 
                                    onClick={() => setExportModalOpen(true)}
                                    title="Exportar"
                                    className="flex items-center justify-center w-[32px] h-[32px] rounded-lg text-white/40 hover:bg-white/5 hover:text-white transition-colors outline-none"
                                >
                                    <Download size={14} />
                                </button>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-2">
                        <LowPolyModeSelector
                            workspaceMode={workspaceMode}
                            setWorkspaceMode={setWorkspaceMode}
                        />
                    </div>
                    
                    {/* Word Counter independent, right next to pill */}
                    {workspaceMode === 'poe' && (
                        <div className="absolute left-[calc(100%+12px)] flex items-center h-[32px] gap-2 text-white/40 font-mono text-[10px] px-2 whitespace-nowrap">
                            {(() => {
                                const currentChapter = chapters?.find(c => c.id === activeChapterId) || chapters?.[0];
                                const currentScene = currentChapter?.scenes?.find(s => s.id === activeSceneId);
                                const sc = currentScene || chapters?.[0]?.scenes?.[0];
                                if (!sc) return <span>0 palabras</span>;
                                
                                const words = sc.content.split(/\s+/).filter(Boolean).length;
                                const pages = Math.max(1, Math.ceil(words / 250));

                                return (
                                    <>
                                        <span>{words} palabras</span>
                                        <span className="opacity-40">|</span>
                                        <span>{sc.content.length} chars</span>
                                        <span className="opacity-40">|</span>
                                        <span>Pág {pages}</span>
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>

                {/* Window Controls - Right */}
                <div className="flex items-center justify-end gap-2 px-2 min-w-[200px] relative z-10">
                    <button 
                        onClick={onToggleSettings}
                        title="Configuración General"
                        className={toolBtnClass(settingsVisible, 'var(--lime)')}
                        style={getActiveStyle(settingsVisible, 'var(--lime)')}
                    >
                        <Settings size={18} />
                    </button>
                    {!isVeryCompact && (
                        <>
                            <button title="Minimizar" className="flex items-center justify-center w-[36px] h-[36px] rounded-[12px] text-white/30 hover:bg-white/5 hover:text-white transition-all active:scale-90">
                                <Minus size={16} />
                            </button>
                            <button title="Maximizar" className="flex items-center justify-center w-[36px] h-[36px] rounded-[12px] text-white/30 hover:bg-white/5 hover:text-white transition-all active:scale-90">
                                <Square size={14} />
                            </button>
                            <button title="Cerrar" className="flex items-center justify-center w-[36px] h-[36px] rounded-[12px] text-white/30 hover:bg-red-500/20 hover:text-red-400 transition-all active:scale-90">
                                <X size={16} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* ========================================== */}
            {/* TIER 2: CONTEXTUAL TOOL SHELF              */}
            {/* ========================================== */}
            <AnimatePresence>
                {((workspaceMode as string) !== 'home' && (workspaceMode as string) !== 'nodos') && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 48 }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                        data-tier="tier-2" 
                        className="flex items-center justify-between px-4 w-full shrink-0 bg-transparent relative"
                    >
                        
                        {workspaceMode === 'poe' && (
                    <>
                        {/* LEFT: Guía, Analizar, Quick Adds, Estructuras */}
                        <div className="flex items-center gap-3 min-w-max relative z-10 w-1/3">
                            {/* Escritura IA / Analizar Escena */}
                            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                                <button 
                                    onClick={triggerSceneAnalysis}
                                    className="w-[32px] h-[32px] rounded flex items-center justify-center text-purple-300 hover:text-white hover:bg-white/10 transition-colors"
                                    title="Analizar escena IA"
                                >
                                    <Wand2 size={14} />
                                </button>
                                <div className="w-[1px] h-4 bg-white/10 mx-0.5" />
                                <button 
                                    onClick={() => {
                                        triggerAISuggestion();
                                        onToggleChat();
                                    }}
                                    className={cn("w-[32px] h-[32px] rounded flex items-center justify-center transition-colors", aiVisible ? "bg-[#c4ff00]/15 text-[#c4ff00]" : "text-black bg-[linear-gradient(135deg,#c4ff00,#8ab300)] hover:brightness-110 active:scale-95")}
                                    title="Ethyria AI (Continuar Escritura IA)"
                                >
                                    <Sparkles size={14} />
                                </button>
                            </div>

                            <Divider />

                            {/* Quick Adds (Grouped Purple, Lime, Blue) */}
                            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                                <button onClick={addNewChapter} className="w-[32px] h-[32px] rounded flex items-center justify-center text-purple-400 hover:bg-white/10 transition-colors" title="Nuevo Capítulo">
                                    <FolderPlus size={14} />
                                </button>
                                <button onClick={addNewScene} className="w-[32px] h-[32px] rounded flex items-center justify-center text-[#c4ff00] hover:bg-white/10 transition-colors" title="Nueva Escena">
                                    <FilePlus size={14} />
                                </button>
                                <button 
                                    onClick={() => {
                                        const note = prompt('Ingresa nota:');
                                        if (note) addNote(note);
                                    }}
                                    className="w-[32px] h-[32px] rounded flex items-center justify-center text-blue-400 hover:bg-white/10 transition-colors"
                                    title="Nueva Nota"
                                >
                                    <StickyNote size={14} />
                                </button>
                            </div>

                            <Divider />

                            {/* Manuscrito / Navigation (Toggle Sidebar) */}
                            <div className="relative pointer-events-auto flex items-center">
                                <button 
                                    onClick={() => setShowChaptersMenu(!showChaptersMenu)}
                                    className={`w-[32px] h-[32px] rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center text-xs font-bold uppercase tracking-wider ${
                                        showChaptersMenu 
                                            ? 'bg-[#c4ff00]/15 text-[#c4ff00]' 
                                            : 'bg-white/5 text-white/55 hover:text-white hover:bg-white/10'
                                    }`}
                                    title="Manuscrito e Índice"
                                >
                                    <Compass size={16} />
                                </button>
                            </div>
                        </div>

                        {/* CENTER: Text Formatting */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 z-20">
                            <div className="flex items-center gap-0.5">
                                <ToolButton icon={Undo} title="Deshacer" onClick={() => handleFormat('undo')} />
                                <ToolButton icon={Redo} title="Rehacer" onClick={() => handleFormat('redo')} />
                                <div className="w-[1px] h-3 bg-white/10 mx-1.5" />
                                <ToolButton icon={Bold} title="Negrita" onClick={() => handleFormat('bold')} />
                                <ToolButton icon={Italic} title="Cursiva" onClick={() => handleFormat('italic')} />
                                <ToolButton icon={Underline} title="Subrayado" onClick={() => handleFormat('underline')} />
                                <span className="hidden sm:inline-flex"><ToolButton icon={Strikethrough} title="Tachado" onClick={() => handleFormat('strikeThrough')} /></span>
                                <span className="hidden md:inline-block w-[1px] h-3 bg-white/10 mx-1.5" />
                                <span className="hidden md:inline-flex gap-0.5">
                                    <ToolButton icon={AlignLeft} title="Izquierda" onClick={() => handleFormat('justifyLeft')} />
                                    <ToolButton icon={AlignCenter} title="Centrar" onClick={() => handleFormat('justifyCenter')} />
                                    <ToolButton icon={AlignRight} title="Derecha" onClick={() => handleFormat('justifyRight')} />
                                    <ToolButton icon={AlignJustify} title="Justificar" onClick={() => handleFormat('justifyFull')} />
                                </span>
                                <span className="hidden lg:inline-block w-[1px] h-3 bg-white/10 mx-1.5" />
                                <span className="hidden lg:inline-flex gap-0.5">
                                    <ToolButton icon={List} title="Lista de Viñetas" onClick={() => handleFormat('insertUnorderedList')} />
                                    <ToolButton icon={ListOrdered} title="Lista Numerada" onClick={() => handleFormat('insertOrderedList')} />
                                    <ToolButton icon={Quote} title="Cita" onClick={() => handleFormat('formatBlock', 'blockquote')} />
                                    <ToolButton icon={Highlighter} title="Resaltar" onClick={() => handleFormat('backColor', '#c4ff00')} />
                                </span>
                            </div>

                            {/* Mic, Radar on the right of format tools */}
                            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                                <button 
                                    onClick={() => setRadarVisible(!radarVisible)}
                                    className={`w-[32px] h-[32px] rounded flex items-center justify-center transition-colors ${
                                        radarVisible ? 'bg-purple-500/15 text-purple-400' : 'text-purple-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                    title="Radar POE Analítico"
                                >
                                    <CircleDot size={14} />
                                </button>
                                <button 
                                    onClick={() => setIsDictating(!isDictating)}
                                    className={`w-[32px] h-[32px] rounded flex items-center justify-center transition-colors ${
                                        isDictating ? 'bg-rose-500/15 text-rose-400' : 'text-white/50 hover:bg-white/10 hover:text-white'
                                    }`}
                                    title={isDictating ? "Detener dictado" : "Dictar voz"}
                                >
                                    <Mic size={14} className={isDictating ? "animate-pulse" : ""} />
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: Empty to balance flex-between */}
                        <div className="flex justify-end w-1/3 z-10" />
                    </>
                )}

                {((workspaceMode as string) === 'nodos' || workspaceMode === 'dev' || workspaceMode === 'desarrollo') && (
                    <div className="flex items-center gap-3 px-4 min-w-max">
                        {/* Escena Actual Component */}
                        <button 
                            onClick={onSceneManagerClick}
                            title="Escena Actual" 
                            className="flex items-center justify-center w-[32px] h-[32px] rounded-lg text-[#ff3366]/85 hover:text-[#ff3366] hover:bg-[#ff3366]/10 transition-all active:scale-90 cursor-pointer"
                        >
                            <Map size={16} />
                        </button>

                        <Divider />

                        {/* Visibility & Views */}
                        <div className="flex items-center gap-2">
                            {/* Visibility Menus */}
                            <div className="relative flex items-center">
                                <button 
                                    onClick={() => setEyeMenuOpen(!eyeMenuOpen)}
                                    className={cn(toolBtnClass(eyeMenuOpen || gridType !== 'grid' || showOutlineOnly, 'var(--cyan)'), "h-[32px] w-[32px] rounded-lg")}
                                    style={getActiveStyle(eyeMenuOpen || gridType !== 'grid' || showOutlineOnly, 'var(--cyan)')}
                                >
                                    <Eye size={16} />
                                </button>
                                
                                <AnimatePresence>
                                    {eyeMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute top-[calc(100%+8px)] left-0 flex flex-col gap-1 p-2 min-w-[200px] rounded-[16px] bg-[#141414]/95 backdrop-blur-3xl origin-top-left"
                                        >
                                            <div className="px-3 pt-2 pb-1 text-[10px] uppercase font-black tracking-widest text-white/30">Visibilidad</div>
                                            <div 
                                                onClick={() => setShowOutlineOnly(!showOutlineOnly)}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-[10px] cursor-pointer transition-colors ${showOutlineOnly ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}`}
                                            >
                                                <Box size={16} />
                                                <span className="text-[12px] font-medium">Solo Outline</span>
                                            </div>
<div className="my-[4px]" />
                                            {GRID_TYPES.map((type) => (
                                                <div 
                                                    key={type.id}
                                                    onClick={() => setGridType(type.id)}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-[10px] cursor-pointer transition-colors ${activeGrid.id === type.id ? 'bg-[var(--cyan)]/10 text-[var(--cyan)]' : 'text-white/50 hover:bg-white/5'}`}
                                                >
                                                    <div className="w-[18px] h-[18px] opacity-70">
                                                        {type.icon}
                                                    </div>
                                                    <span className="text-[12px] font-medium flex-1">{type.label}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* View Menu */}
                            <div className="relative flex items-center">
                                <div 
                                    onClick={() => setViewMenuOpen(!viewMenuOpen)}
                                    className="flex items-center gap-2 px-3 h-[32px] rounded-lg cursor-pointer hover:bg-white/5 transition-colors  text-white/55 hover:text-white"
                                >
                                    <div className="text-[var(--lime)] opacity-80">
                                        <svg width="14" height="14" viewBox="0 0 24 24">{activeView.icon}</svg>
                                    </div>
                                    {!isVeryCompact && <span className="text-[10px] font-black uppercase tracking-wider text-white/70">{activeView.label}</span>}
                                </div>
                                <AnimatePresence>
                                    {viewMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            className="absolute top-[calc(100%+8px)] left-0 flex flex-col gap-1 p-2 min-w-[180px] rounded-[16px] bg-[#141414]/95 backdrop-blur-3xl origin-top-left"
                                        >
                                            {VIEW_MODES.map((mode, idx) => (
                                                <div 
                                                    key={mode.id}
                                                    onClick={() => { setViewMode(mode.id); setViewMenuOpen(false); }}
                                                    className={`flex items-center gap-3 px-3 py-2 rounded-[10px] cursor-pointer transition-colors ${activeView.id === mode.id ? 'bg-[var(--lime)]/10 text-[var(--lime)]' : 'text-white/50 hover:bg-white/5'}`}
                                                >
                                                    <div className="w-[16px] flex items-center justify-center font-mono text-[9px] uppercase font-bold tracking-widest opacity-30">
                                                        [{idx + 1}]
                                                    </div>
                                                    <div className={`text-[var(--lime)] opacity-60`}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24">{mode.icon}</svg>
                                                    </div>
                                                    <span className="text-[12px] font-medium flex-1">{mode.label}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <Divider />

                        {/* Node Tool Palette */}
                        <div className="flex items-center gap-1">
                            <button onClick={() => setActiveTool('pointer', 'var(--text)')} title="Seleccionar (V)" className={cn(toolBtnClass(activeToolId === 'pointer', 'var(--text)'), "h-[32px] w-[32px] rounded-lg")} style={getActiveStyle(activeToolId === 'pointer', 'var(--text)')}><MousePointer2 size={16} /></button>
                            <button onClick={() => setActiveTool('move', 'var(--lime)')} title="Mover (M)" className={cn(toolBtnClass(activeToolId === 'move', 'var(--lime)'), "h-[32px] w-[32px] rounded-lg")} style={getActiveStyle(activeToolId === 'move', 'var(--lime)')}><Move size={16} /></button>
                            <button onClick={() => setActiveTool('scale', 'var(--cyan)')} title="Escalar (S)" className={cn(toolBtnClass(activeToolId === 'scale', 'var(--cyan)'), "h-[32px] w-[32px] rounded-lg")} style={getActiveStyle(activeToolId === 'scale', 'var(--cyan)')}><Maximize size={16} /></button>
                            <button onClick={() => setActiveTool('rotate', 'var(--orange)')} title="Rotar (R)" className={cn(toolBtnClass(activeToolId === 'rotate', 'var(--orange)'), "h-[32px] w-[32px] rounded-lg")} style={getActiveStyle(activeToolId === 'rotate', 'var(--orange)')}><RotateCw size={16} /></button>
                        </div>
                    </div>
                )}

                {workspaceMode === 'arco' && (
                    <div className="flex items-center px-4 h-full pointer-events-none opacity-50">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">Estructura Narrativa (En desarrollo)</span>
                    </div>
                )}
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Modals */}
            <ExportModal isOpen={exportModalOpen} onClose={() => setExportModalOpen(false)} />
        </header>
    );
};

