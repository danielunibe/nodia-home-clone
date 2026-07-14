"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  MousePointer2,
  Box,
  FileText,
  Grid3x3,
  MessageSquare,
  Minus,
  Square,
  X,
  Zap,
  Search,
  Plus,
  Maximize2,
  RotateCw,
  Move,
  Map,
  Sliders,
  CircleDot,
  Eye,
  EyeOff,
  Trash2,
  Maximize,
  Compass,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NodiaNode, Scene } from "@/lib/types";
import { useCanvas } from "@/app/hooks/useCanvas";
import { SceneManager } from "@/app/components/organisms/SceneManager";
import { UnifiedTopBar } from "./components/organisms/UnifiedTopBar";
import { AIAssistant } from "@/app/features/assistant/AIAssistant";
import { SettingsBar } from "@/app/features/assistant/SettingsBar";
import { NodeRenderer } from "@/app/components/nodes/NodeRenderer";
import { LowPolyToolbar } from "@/app/components/organisms/LowPolyToolbar";
import { NodiaBridge } from "@/services/Bridge";
import { useNodeStore } from "@/app/store/useNodeStore";
import { PoeEditor } from "@/app/features/poe/PoeEditor";
import { ArcoNarrativo } from "@/app/features/arco/ArcoNarrativo";

import { cn } from "@/lib/utils";

import { useGlobalShortcuts } from "@/app/hooks/useGlobalShortcuts";
import { useDrawingInteraction } from "@/app/hooks/useDrawingInteraction";

let topZIndex = 110;

import { useRoomStore } from "./store/useRoomStore";
import { useAppStore } from "./store/useAppStore";
import { RoomDesignerHUD } from "./components/organisms/RoomDesignerHUD";
import { DrawingOverlay } from "./components/canvas/DrawingOverlay";
import { CanvasContextMenu } from "./components/canvas/CanvasContextMenu";
import { RadialMenu } from "./components/canvas/RadialMenu";

export default function Page() {
  const { nodes, selectedNodeIds, updateNodePosition, selectNode } =
    useNodeStore();
  const { 
    viewMode, 
    activeToolId: activeTool, 
    gridType, 
    gridConfig, 
    workspaceMode,
    setViewMode,
    setActiveTool,
    setGridType,
    setShowOutlineOnly,
    showOutlineOnly,
    setGridConfig
  } = useAppStore();
  const {
    showGrid,
    isDrawing,
    mode: drawingMode,
    addPoint,
    points,
    currentPoint,
    updateCurrentPoint,
    gridSize,
    setMode,
  } = useRoomStore();
  const nodesCount = useNodeStore((state) => Object.keys(state.nodes).length);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [showNodes, setShowNodes] = useState(false);
  const [sceneTreeOpen, setSceneTreeOpen] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [nodeSearch, setNodeSearch] = useState("");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    rect: DOMRect | null;
  } | null>(null);
  const [radialMenu, setRadialMenu] = useState<{ x: number; y: number } | null>(null);
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);
  const innerCanvasRef = useRef<HTMLDivElement>(null);
  const rightClickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [spacePressed, setSpacePressed] = useState(false);

  const {
    zoom,
    pan,
    isDragging,
    handleWheel,
    startDragging,
    stopDragging,
    onDrag,
    goToCoordinates,
  } = useCanvas();

  // World coordinate conversion
  const toWorld = useCallback(
    (clientX: number, clientY: number) => {
      if (!innerCanvasRef.current) return { x: 0, y: 0 };
      const rect = innerCanvasRef.current.getBoundingClientRect();
      return {
        x: (clientX - rect.left - pan.x) / zoom,
        y: (clientY - rect.top - pan.y) / zoom,
      };
    },
    [pan, zoom, innerCanvasRef],
  );

  const { handleDrawingPointerDown, handleDrawingPointerMove } = useDrawingInteraction(toWorld, zoom);

  const spawnNode = useCallback(() => {
    if (!innerCanvasRef.current) return;
    const rect = innerCanvasRef.current.getBoundingClientRect();
    const cx = (rect.width / 2 - pan.x) / zoom;
    const cy = (rect.height / 2 - pan.y) / zoom;
    
    useNodeStore.getState().addNode({
      id: `node_gen_${Date.now()}`,
      type: "metadata",
      label: `Nodo Creativo ${Object.keys(nodes).length + 1}`,
      position: { x: cx, y: cy },
      content: {
        title: `Nuevo Nodo ${Object.keys(nodes).length + 1}`,
        content: "Ingresa el contenido creativo de esta narrativa..."
      },
      layer: "cronos"
    });
  }, [pan, zoom, nodes]);

  const focusElement = useCallback((x: number, y: number, nodeId?: string) => {
    goToCoordinates(x, y, innerCanvasRef.current);
    if (nodeId) {
      selectNode(nodeId, false);
    }
  }, [goToCoordinates, selectNode]);

  // Data Hydration from Tauri Bridge
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoadingData(true);
      try {
        const bridgeScenes = await NodiaBridge.getScenes();
        setScenes(bridgeScenes);
        setShowNodes(true);
      } catch (error) {
        console.error("Error cargando datos del Bridge:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    loadInitialData();
  }, []);

  useGlobalShortcuts(setSpacePressed);

  const handleSceneNavigation = (x: number, y: number) => {
    goToCoordinates(x, y, innerCanvasRef.current);
    setSceneTreeOpen(false);
  };

  const gridOpacity = gridType === 'none' ? 0 : showGrid ? 0.1 : 0;
  const dotOpacity = gridType === 'thick_dots' ? 0.25 : 0.08;
  const gridCssOpacity = gridType === 'grid' ? gridOpacity : 0.02; // Very faint if dots are selected just as background
  const dotSize = gridType === 'thick_dots' ? '3px' : '1.5px';

  return (
    <div
      className="canvas-wrap"
      style={
        {
 "--pan-x": `${pan.x}px`,
 "--pan-y": `${pan.y}px`,
 "--zoom": zoom,
 "--dot-opacity": dotOpacity,
 "--grid-opacity-dynamic": gridConfig.opacity,
 "--grid-hue-dynamic": gridConfig.hue,
 "--grid-gap-dynamic": `${gridConfig.gap}px`,
 "--dot-size": dotSize,
 "--grid-size": `${gridSize}px`,
        } as React.CSSProperties
      }
    >
      <SceneManager
        isOpen={sceneTreeOpen}
        scenes={scenes}
        onClose={() => setSceneTreeOpen(false)}
        onGoToScene={handleSceneNavigation}
      />

      <div
        className={`canvas relative overflow-hidden view-${viewMode}`}
        data-grid-type={gridType}
        style={
          {
            cursor: isDrawing
              ? "crosshair"
              : activeTool === "pointer"
                ? isDragging
                  ? "grabbing"
                  : "default"
                : "crosshair",
            backgroundColor: viewMode !== 'canvas' ? '#1f2023' : `hsl(${gridConfig.hue}, 12%, 14%)`,
          } as React.CSSProperties
        }
      >
        <UnifiedTopBar 
          nodeCount={nodesCount}
          activeSceneLabel={scenes.length > 0 ? scenes[0].label : "Sin título"}
          onSceneManagerClick={() => setSceneTreeOpen(!sceneTreeOpen)}
          showNodes={showNodes}
          onToggleNodes={() => setShowNodes(!showNodes)}
          aiVisible={aiVisible}
          onToggleChat={() => setAiVisible(!aiVisible)}
          settingsVisible={settingsVisible}
          onToggleSettings={() => setSettingsVisible(!settingsVisible)}
        />
        
        {/* Main Viewport (Base Layer) */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-auto top-[96px] overflow-hidden"
          ref={innerCanvasRef}
          onClick={() => {
            setContextMenu(null);
            setRadialMenu(null);
          }}
          onContextMenu={(e) => {
             e.preventDefault();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDrop={(e) => {
            e.preventDefault();
            const nodeDataStr = e.dataTransfer.getData(
 "application/nodia-node",
            );
            if (nodeDataStr) {
              try {
                const toolData = JSON.parse(nodeDataStr);
                if (innerCanvasRef.current) {
                  const rect = innerCanvasRef.current.getBoundingClientRect();
                  const x = (e.clientX - rect.left - pan.x) / zoom;
                  const y = (e.clientY - rect.top - pan.y) / zoom;
                  useNodeStore.getState().addNode({
                    id: `node_${Date.now()}`,
                    type: "metadata",
                    label: toolData.name,
                    position: { x, y },
                    content: {
                      title: toolData.name,
                      content: `Nuevo nodo de tipo: ${toolData.id}`,
                    },
                    layer: "cronos",
                  });
                }
              } catch (err) {
                console.error("Error parsing dropped tool data", err);
              }
            }
          }}
          onWheel={(e) => handleWheel(e, innerCanvasRef.current)}
          onPointerDown={(e) => {
            if (isDrawing) {
              handleDrawingPointerDown(e);
              return;
            }
            if (
              e.target === innerCanvasRef.current ||
              (e.target as HTMLElement).classList.contains("viewport-layer")
            ) {
              // Mouse button 1 = middle click, or standard click with Spacebar pressed
              if (e.button === 1 || (e.button === 0 && spacePressed)) {
                startDragging();
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                return;
              }

              // Right click hold for radial menu
              if (e.button === 2) {
                rightClickTimerRef.current = setTimeout(() => {
                  setRadialMenu({ x: e.clientX, y: e.clientY });
                  rightClickTimerRef.current = null;
                }, 250);
                return;
              }
            }
          }}
          onPointerMove={(e) => {
            if (isDrawing) {
              handleDrawingPointerMove(e);
            }
            if (isDragging) onDrag(e.movementX, e.movementY);
          }}
          onPointerUp={(e) => {
            if (e.button === 2) {
              if (rightClickTimerRef.current) {
                clearTimeout(rightClickTimerRef.current);
                rightClickTimerRef.current = null;
                // Was a short right click -> generic context menu
                if (!radialMenu) {
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    rect: innerCanvasRef.current?.getBoundingClientRect() || null,
                  });
                }
              }
            } else {
              stopDragging();
              try {
                (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              } catch (e) {}
            }
          }}
          style={
            {
 "--zoom": zoom,
 "--pan-x": `${pan.x}px`,
 "--pan-y": `${pan.y}px`,
              cursor:
                activeTool === "pointer"
                  ? isDragging
                    ? "grabbing"
                    : "grab"
                  : "crosshair",
            } as React.CSSProperties
          }
        >
          <AnimatePresence>
             {workspaceMode === 'poe' && <PoeEditor key="poe" />}
             {workspaceMode === 'arco' && <ArcoNarrativo key="arco" />}
             {workspaceMode === 'home' && (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    
                  </div>
                </motion.div>
             )}
          </AnimatePresence>

          <div className={`viewport-transform view-${viewMode}`}>
            <div
              className="viewport-layer"
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "0 0",
                pointerEvents: "none",
                willChange: "transform",
                transformStyle: "preserve-3d"
              }}
            >
              {workspaceMode !== 'poe' && workspaceMode !== 'arco' && workspaceMode !== 'home' && (
                <>
                  {/* Base canvas interface layer */}
                  <DrawingOverlay zoom={zoom} />
                  <NodeRenderer />
                </>
              )}
            </div>
          </div>

          {workspaceMode !== 'arco' && workspaceMode !== 'home' && (
             <LowPolyToolbar onToggleAI={() => setAiVisible(!aiVisible)} />
          )}

          {workspaceMode !== 'home' && <RoomDesignerHUD />}

          {workspaceMode === 'nodos' && (
            <>
              {/* Left Floating Panel: Scene Topology Manager */}
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="absolute left-[24px] top-[110px] bottom-[110px] w-[300px] pointer-events-auto bg-[#151619]/80 border border-white/5 backdrop-blur-[24px] rounded-2xl flex flex-col p-4 shadow-2xl z-40 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <Compass className="text-[var(--lime)] w-4 h-4 animate-spin-slow" />
                    <span className="text-xs font-black tracking-widest uppercase text-white/90">Estructura & Nodos</span>
                  </div>
                  <button
                    onClick={spawnNode}
                    className="p-1 px-2.5 rounded bg-[var(--lime)]/10 text-[var(--lime)] hover:bg-[var(--lime)] hover:text-black text-[10px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1 active:scale-95 cursor-pointer"
                    title="Crear nuevo nodo"
                  >
                    <Plus size={11} strokeWidth={3} />
                    <span>Nuevo</span>
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-3 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-3.5 h-3.5" />
                  <input
                    type="text"
                    placeholder="Buscar escenas o nodos..."
                    value={nodeSearch}
                    onChange={(e) => setNodeSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/20 outline-none focus:border-[var(--lime)]/30 focus:bg-white/[0.08] transition-all"
                  />
                  {nodeSearch && (
                    <button onClick={() => setNodeSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs">×</button>
                  )}
                </div>

                {/* Split Sections */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col gap-4">
                  {/* 1. Scenes list (Gestor de Escenas) */}
                  <div>
                    <div className="text-[9px] font-black tracking-wider uppercase text-white/30 mb-2 flex items-center gap-1.5">
                      <Map size={10} className="text-[#ff3366]" />
                      <span>Líneas de Escena ({scenes.length})</span>
                    </div>
                    {scenes.length === 0 ? (
                      <div className="text-[10px] text-white/30 italic px-2">Cargando escenas...</div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {scenes
                          .filter(s => s.label?.toLowerCase().includes(nodeSearch.toLowerCase()))
                          .map(scene => (
                            <div 
                              key={scene.id} 
                              onClick={() => focusElement(scene.x, scene.y)}
                              className="group flex items-center justify-between p-2 rounded-lg cursor-pointer bg-white/[0.02] border border-transparent hover:border-white/5 hover:bg-white/5 transition-colors text-[11.5px] text-white/70 hover:text-white"
                            >
                              <span className="truncate flex-1 font-medium">{scene.label}</span>
                              <button className="text-[9px] font-bold border border-[#ff3366]/30 text-[#ff3366] hover:bg-[#ff3366] hover:text-white rounded px-1.5 py-0.5 transition-colors origin-right active:scale-95 cursor-pointer">IR</button>
                            </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. Graph Nodes list (Nodos del Lienzo) */}
                  <div>
                    <div className="text-[9px] font-black tracking-wider uppercase text-white/30 mb-2 flex items-center gap-1.5">
                      <Activity size={10} className="text-[#38bdf8]" />
                      <span>Nodos del Grafo ({Object.keys(nodes).length})</span>
                    </div>
                    {Object.keys(nodes).length === 0 ? (
                      <div className="text-[10px] text-white/30 italic px-2">No hay nodos en el lienzo.</div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {Object.values(nodes)
                          .filter(n => n.label?.toLowerCase().includes(nodeSearch.toLowerCase()) || n.type?.toLowerCase().includes(nodeSearch.toLowerCase()))
                          .map(node => (
                            <div 
                              key={node.id}
                              className="group flex items-center justify-between p-2 rounded-lg cursor-pointer bg-white/[0.02] border border-transparent hover:border-white/5 hover:bg-white/5 transition-colors text-[11.5px] text-white/70 hover:text-white"
                            >
                              <div 
                                onClick={() => focusElement(node.position.x, node.position.y, node.id)}
                                className="flex-1 min-w-0 pr-2 flex flex-col"
                              >
                                <span className="truncate text-white/80 font-medium group-hover:text-white transition-colors">{node.label || "Sin título"}</span>
                                <span className="text-[9px] font-mono opacity-40 uppercase tracking-wider">{node.type}</span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0 select-none">
                                <button 
                                  onClick={() => focusElement(node.position.x, node.position.y, node.id)}
                                  className="text-[9px] font-bold border border-[var(--lime)]/30 text-[var(--lime)] hover:bg-[var(--lime)] hover:text-black rounded px-1.5 py-0.5 transition-colors active:scale-95 cursor-pointer"
                                >
                                  IR
                                </button>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    useNodeStore.getState().removeNode(node.id);
                                  }}
                                  className="p-1 hover:bg-red-500/10 text-red-400/60 hover:text-red-400 rounded transition-colors cursor-pointer"
                                  title="Eliminar nodo"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Floating Panel: Camera, Grid & Alignment Settings */}
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="absolute right-[24px] top-[110px] bottom-[110px] w-[300px] pointer-events-auto bg-[#151619]/80 border border-white/5 backdrop-blur-[24px] rounded-2xl flex flex-col p-4 shadow-2xl z-40 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-4 shrink-0">
                  <Sliders className="text-[#38bdf8] w-4 h-4" />
                  <span className="text-xs font-black tracking-widest uppercase text-white/90">Cámara & Rejilla</span>
                </div>

                {/* Split Sections */}
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col gap-5">
                  {/* 1. View Mode (Cámara) */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-2">MODOS DE CÁMARA / VISTA</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: '2d', label: 'Plano 2D', icon: Grid3x3 },
                        { id: '3d', label: 'Estructural 3D', icon: Box },
                        { id: 'top_2d', label: 'Plano Cenital', icon: Map },
                        { id: 'orto', label: 'Ortográfico', icon: Maximize }
                      ].map((modeItem) => {
                        const isItemActive = viewMode === modeItem.id;
                        const Icon = modeItem.icon;
                        return (
                          <button
                            key={modeItem.id}
                            onClick={() => setViewMode(modeItem.id as any)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-xl border text-[11.5px] transition-all cursor-pointer",
                              isItemActive 
                                ? "bg-[var(--lime)]/10 text-[var(--lime)] border-[var(--lime)]/30 font-semibold"
                                : "bg-white/[0.01] border-white/5 text-white/50 hover:text-white/80 hover:bg-white/5"
                            )}
                          >
                            <Icon size={12.5} className="opacity-70" />
                            <span>{modeItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Transform Action Palette */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-2 font-mono">HERRAMIENTAS DE EDICIÓN</span>
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl">
                      {[
                        { id: 'pointer', title: 'Puntero (V)', icon: MousePointer2, color: 'var(--text)' },
                        { id: 'move', title: 'Mover (M)', icon: Move, color: 'var(--lime)' },
                        { id: 'scale', title: 'Escalar (S)', icon: Maximize2, color: 'var(--cyan)' },
                        { id: 'rotate', title: 'Rotar (R)', icon: RotateCw, color: 'var(--orange)' }
                      ].map((toolItem) => {
                        const isToolActive = activeTool === toolItem.id;
                        const Icon = toolItem.icon;
                        
                        let activeStyle = {};
                        if (isToolActive) {
                          activeStyle = {
                            backgroundColor: `rgba(from ${toolItem.color} r g b / 0.15)`,
                            color: toolItem.color,
                          };
                        }

                        return (
                          <button
                            key={toolItem.id}
                            onClick={() => setActiveTool(toolItem.id, toolItem.color)}
                            className={cn(
                              "flex-1 flex items-center justify-center h-[32px] rounded-lg transition-all cursor-pointer",
                              isToolActive ? "text-white" : "text-white/40 hover:text-white/85 hover:bg-white/5"
                            )}
                            style={activeStyle}
                            title={toolItem.title}
                          >
                            <Icon size={13.5} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Grid Visibility (Rejilla) */}
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black tracking-widest uppercase text-white/30 mb-2 font-mono">REJILLA & CONTORNOS</span>
                    
                    <div className="flex flex-col gap-2.5">
                      {/* Outline Mode Toggle */}
                      <div 
                        onClick={() => setShowOutlineOnly(!showOutlineOnly)}
                        className={cn(
                          "flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all",
                          showOutlineOnly
                            ? "bg-white/5 border-white/10 text-[var(--cyan)]"
                            : "bg-white/[0.01] border-white/5 text-white/50 hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <Box size={14} className="opacity-70" />
                          <span className="font-medium">Solo contornos / Outline</span>
                        </div>
                        <div className={cn(
                          "w-[28px] h-[16px] rounded-full p-[2px] transition-colors relative flex items-center",
                          showOutlineOnly ? "bg-[var(--cyan)]" : "bg-white/10"
                        )}>
                          <div className={cn(
                            "w-[12px] h-[12px] rounded-full bg-black transition-transform shadow-xs",
                            showOutlineOnly ? "translate-x-[12px]" : "translate-x-0"
                          )} />
                        </div>
                      </div>

                      {/* Pre-set Styles Horizontal Pills */}
                      <div className="grid grid-cols-2 gap-1 font-mono text-[9px]">
                        {[
                          { id: 'grid', label: 'Cuadrícula', icon: Grid3x3 },
                          { id: 'dots', label: 'Puntos', icon: CircleDot },
                          { id: 'thick_dots', label: 'Grueso', icon: CircleDot },
                          { id: 'none', label: 'Ocultar', icon: EyeOff }
                        ].map((gridItem) => {
                          const isGridActive = gridType === gridItem.id;
                          const Icon = gridItem.icon;
                          return (
                            <button
                              key={gridItem.id}
                              onClick={() => setGridType(gridItem.id as any)}
                              className={cn(
                                "flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-[10px] transition-all cursor-pointer",
                                isGridActive
                                  ? "bg-white/10 border-white/10 text-white font-bold"
                                  : "bg-transparent border-transparent text-white/45 hover:text-white/80 hover:bg-white/5"
                              )}
                            >
                              <Icon size={11} className="opacity-70" />
                              <span>{gridItem.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 4. Ambient Hue & Opacity Sliders (Just like POE!) */}
                  <div className="flex flex-col gap-3.5 border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between text-[9px] font-black tracking-widest uppercase text-white/30 mb-1.5">
                        <span>TONALIDAD ACENTO</span>
                        <span className="text-[10px] font-mono text-[var(--lime)] font-bold">{gridConfig.hue ?? 220}°</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input 
                          type="range"
                          min="0"
                          max="360"
                          value={gridConfig.hue ?? 220}
                          onChange={(e) => setGridConfig({ hue: parseInt(e.target.value) })}
                          className="flex-1 h-[4px] bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--lime)] outline-none"
                        />
                        <div 
                          className="w-[14px] h-[14px] rounded-full border border-white/20 shadow-xs shrink-0" 
                          style={{ backgroundColor: `hsl(${gridConfig.hue ?? 220}, 100%, 50%)` }} 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center justify-between text-[9px] font-black tracking-widest uppercase text-white/30 mb-1.5">
                        <span>BRILLO / OPACIDAD</span>
                        <span className="text-[10px] font-mono text-white/60 font-bold">{Math.round((gridConfig.opacity ?? 0.1) * 100)}%</span>
                      </div>
                      <input 
                        type="range"
                        min="0.01"
                        max="0.4"
                        step="0.01"
                        value={gridConfig.opacity ?? 0.1}
                        onChange={(e) => setGridConfig({ opacity: parseFloat(e.target.value) })}
                        className="w-full h-[4px] bg-white/10 rounded-lg appearance-none cursor-pointer accent-white opacity-85 outline-none"
                      />
                    </div>
                  </div>

                </div>
              </motion.div>
            </>
          )}

          {workspaceMode !== 'home' && <RoomDesignerHUD />}


          {radialMenu && (
             <RadialMenu 
                x={radialMenu.x} 
                y={radialMenu.y} 
                onClose={() => setRadialMenu(null)} 
             />
          )}

          {contextMenu && (
             <CanvasContextMenu 
                 x={contextMenu.x} 
                 y={contextMenu.y} 
                 zoom={zoom} 
                 pan={pan} 
                 canvasRect={contextMenu.rect}
                 onClose={() => setContextMenu(null)}
             />
          )}


        </div>

        {/* Right Chat Overlay Panel (Chat) */}
        <AnimatePresence>
          {aiVisible && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="absolute right-0 top-0 bottom-0 z-[60] w-[400px] pointer-events-auto"
            >
              <AIAssistant
                isVisible={true}
                onClose={() => setAiVisible(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Overlay Panel (Settings) */}
        <AnimatePresence>
          {settingsVisible && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="absolute right-0 top-0 bottom-0 z-[60] w-auto pointer-events-none"
            >
              <SettingsBar isVisible={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
