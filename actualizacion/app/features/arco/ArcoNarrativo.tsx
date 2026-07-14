'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitCommit, GitBranch, GitMerge, Activity, Target, Compass, ChevronDown, ChevronRight, User, AlertCircle, Bookmark, Shield, FilePlus, Zap } from 'lucide-react';

export const ArcoNarrativo = () => {
    const [selectedEvent, setSelectedEvent] = useState<string | null>('scene1');
    const [expandedActs, setExpandedActs] = useState<Record<string, boolean>>({
        'acto1': true,
        'acto2': true,
    });

    const toggleAct = (acto: string) => {
        setExpandedActs(prev => ({ ...prev, [acto]: !prev[acto] }));
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex overflow-hidden pt-[52px] cursor-default pointer-events-none"
            onPointerDown={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
        >
            {/* LEFT SIDEBAR: Índice Estructural Vivo (Glassmorphic, no-bento) */}
            <div className="relative shrink-0 pointer-events-auto h-full flex select-none">
                <motion.div 
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-[300px] bg-[#0c0e12]/35 backdrop-blur-[24px] p-4   flex flex-col h-full shadow-md overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-4   pb-4 shrink-0 px-2 mt-2">
                        <h3 className="text-[#c4ff00] text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                            <Compass size={14} /> Estructura de Arco
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col pb-4 px-2">
                        
                        {/* Acto I */}
                        <div className="mb-4">
                            <div 
                                onClick={() => toggleAct('acto1')}
                                className="flex items-center gap-2 text-white/80 hover:text-white cursor-pointer transition-colors mb-2"
                            >
                                {expandedActs['acto1'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                <GitCommit size={14} className="text-[#c4ff00]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#c4ff00]">Acto I: Planteamiento</span>
                            </div>
                            
                            <AnimatePresence>
                                {expandedActs['acto1'] && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="pl-5   ml-[11px] flex flex-col gap-1 overflow-hidden"
                                    >
                                        <div 
                                            onClick={() => setSelectedEvent('scene1')}
                                            className={`p-2 text-[11px] rounded-lg cursor-pointer transition-all flex items-center justify-between group ${selectedEvent === 'scene1' ? 'bg-[#c4ff00]/10 text-[#c4ff00] font-semibold border-[#c4ff00]/20' : 'text-white/60 hover:bg-white/5 hover:text-white '}`}
                                        >
                                            <span className="truncate flex items-center gap-2">
                                                <FilePlus size={10} className={selectedEvent === 'scene1' ? "text-[#c4ff00]" : "text-white/20"} />
                                                Una vida normal
                                            </span>
                                        </div>
                                        <div 
                                            onClick={() => setSelectedEvent('inciting')}
                                            className={`p-2 text-[11px] rounded-lg cursor-pointer transition-all flex items-center justify-between group ${selectedEvent === 'inciting' ? 'bg-[#c4ff00]/10 text-[#c4ff00] font-semibold border-[#c4ff00]/20' : 'text-white/60 hover:bg-white/5 hover:text-white '}`}
                                        >
                                            <span className="truncate flex items-center gap-2">
                                                <Target size={10} className="text-rose-400" />
                                                <span className={selectedEvent === 'inciting' ? 'text-rose-400' : 'text-white/80 font-medium'}>Incidente Incitador</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Acto II */}
                        <div className="mb-4 mt-2">
                            <div 
                                onClick={() => toggleAct('acto2')}
                                className="flex items-center gap-2 text-white/80 hover:text-white cursor-pointer transition-colors mb-2"
                            >
                                {expandedActs['acto2'] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                <GitBranch size={14} className="text-purple-400" />
                                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Acto II: Nudo</span>
                            </div>
                            
                            <AnimatePresence>
                                {expandedActs['acto2'] && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="pl-5   ml-[11px] flex flex-col gap-1 overflow-hidden"
                                    >
                                        <div 
                                            onClick={() => setSelectedEvent('scene3')}
                                            className={`p-2 text-[11px] rounded-lg cursor-pointer transition-all flex items-center justify-between group ${selectedEvent === 'scene3' ? 'bg-[#c4ff00]/10 text-[#c4ff00] font-semibold border-[#c4ff00]/20' : 'text-white/60 hover:bg-white/5 hover:text-white '}`}
                                        >
                                            <span className="truncate flex items-center gap-2">
                                                <FilePlus size={10} className={selectedEvent === 'scene3' ? "text-[#c4ff00]" : "text-white/20"} />
                                                Entrenamiento en la torre
                                            </span>
                                        </div>
                                        <div 
                                            onClick={() => setSelectedEvent('midpoint')}
                                            className={`p-2 text-[11px] rounded-lg cursor-pointer transition-all flex items-center justify-between group ${selectedEvent === 'midpoint' ? 'bg-[#c4ff00]/10 text-[#c4ff00] font-semibold border-[#c4ff00]/20' : 'text-white/60 hover:bg-white/5 hover:text-white '}`}
                                        >
                                            <span className="truncate flex items-center gap-2">
                                                <Zap size={10} className="text-yellow-400" />
                                                <span className={selectedEvent === 'midpoint' ? 'text-yellow-400' : 'text-white/80 font-medium'}>Midpoint</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* CENTER: Timeline Canvas */}
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 110, damping: 22, duration: 0.8 }}
                className="flex-1 p-10 relative overflow-y-auto pointer-events-auto"
            >
                <div className="max-w-[700px] mx-auto min-h-[1000px] pt-10">
                    <h1 className="text-4xl text-white font-medium tracking-tight mb-16 pl-6">Línea Temporal</h1>

                    <div className="relative pl-8   space-y-16 pb-20">
                        
                        {/* Timeline Event 1 */}
                        <div className={`relative transition-opacity ${selectedEvent === 'scene1' ? 'opacity-100' : 'opacity-40 hover:opacity-70'} cursor-pointer`} onClick={() => setSelectedEvent('scene1')}>
                            <div className={`absolute -left-[37px] top-1 w-2 h-2 rounded-full border-[2px] ${selectedEvent === 'scene1' ? 'border-[#c4ff00] scale-150' : 'border-[#c4ff00]'} bg-[#050708] ring-4 ring-[#050708] transition-all duration-300`} />
                            <h3 className="text-white/90 text-2xl font-medium mb-3">Una vida normal</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-4">
                                El protagonista se introduce en su mundo ordinario. Vemos sus rutinas, sus necesidades emocionales y sus miedos antes de que todo cambie para siempre.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 uppercase tracking-widest">Escena 1</span>
                                <span className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/40 uppercase tracking-widest">Planteamiento</span>
                            </div>
                        </div>

                        {/* Timeline Event 2: Inciting Incident */}
                        <div className={`relative transition-opacity ${selectedEvent === 'inciting' ? 'opacity-100' : 'opacity-40 hover:opacity-70'} cursor-pointer`} onClick={() => setSelectedEvent('inciting')}>
                            <div className={`absolute -left-[37px] top-1 w-3 h-3 rounded-full border-[2px] border-rose-400 bg-[#050708] ring-4 ring-[#050708] shadow-md transition-all duration-300 ${selectedEvent === 'inciting' ? 'scale-125' : ''}`} />
                            <h3 className="text-rose-400 text-sm font-bold tracking-widest uppercase mb-1">Incidente Incitador</h3>
                            <h3 className="text-white/90 text-2xl font-medium mb-3">El Despertar del Artefacto</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-4">
                                Un evento de fuerza mayor rompe la normalidad. Se presenta un conflicto directo que obliga a tomar una decisión.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-rose-500/10 text-rose-400 rounded text-[10px] uppercase tracking-widest ">Punto de Giro</span>
                            </div>
                        </div>

                        {/* Timeline Event 3: Midpoint */}
                        <div className={`relative transition-opacity ${selectedEvent === 'midpoint' ? 'opacity-100' : 'opacity-40 hover:opacity-70'} cursor-pointer`} onClick={() => setSelectedEvent('midpoint')}>
                            <div className={`absolute -left-[37px] top-1 w-3 h-3 rounded-[3px] rotate-45 border-[2px] border-yellow-400 bg-[#050708] ring-4 ring-[#050708] shadow-md transition-all duration-300 ${selectedEvent === 'midpoint' ? 'scale-125' : ''}`} />
                            <h3 className="text-yellow-400 text-sm font-bold tracking-widest uppercase mb-1">Midpoint</h3>
                            <h3 className="text-white/90 text-2xl font-medium mb-3">La Traición en la Capital</h3>
                            <p className="text-white/50 text-sm leading-relaxed mb-4">
                                Toda la información que el protagonista creía cierta se voltea. El conflicto deja de ser reactivo y se vuelve proactivo.
                            </p>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-[10px] uppercase tracking-widest border-yellow-500/20">Inflexión Central</span>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* RIGHT SIDEBAR: Inspector de Tarjetas Bento */}
            <div className="relative shrink-0 pointer-events-auto h-full flex select-none">
                <motion.div 
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="w-[340px] bg-[#0c0e12]/35 backdrop-blur-[24px] p-4   flex flex-col h-full shadow-md overflow-y-auto"
                >
                    <div className="flex items-center justify-between mb-4   pb-4 px-1">
                        <h3 className="text-white/80 text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
                            <Activity size={14} className="text-[#c4ff00]" /> Detalle de Evento
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4 px-1 pb-10">
                        {/* Bento Card: Función Narrativa */}
                        <div className="bg-white/[0.03] rounded-2xl p-4  relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c4ff00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h4 className="text-[10px] font-bold tracking-widest text-[#c4ff00] uppercase mb-3 flex items-center gap-2">
                                <Bookmark size={12} /> Objetivo y Tensión
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Conflicto Principal</span>
                                    <p className="text-xs text-white/90 font-medium">El protagonista rechaza su llamado, temiendo perder la seguridad de su familia.</p>
                                </div>
                                <div>
                                    <span className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Consecuencia / Cambio</span>
                                    <p className="text-xs text-white/70">Aumento de vulnerabilidad. Se cierra la puerta a su zona de confort.</p>
                                </div>
                            </div>
                        </div>

                        {/* Bento Card: Personajes (Alineación y Arcos) */}
                        <div className="bg-white/[0.03] rounded-2xl p-4 ">
                            <h4 className="text-[10px] font-bold tracking-widest text-purple-400 uppercase mb-3 flex items-center gap-2">
                                <User size={12} /> Personajes en Escena
                            </h4>
                            <div className="flex flex-col gap-3">
                                {/* Character Item */}
                                <div className="p-3 bg-white/[0.02] rounded-xl border-white/[0.03] hover:bg-white/[0.05] transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white">Kael</span>
                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">Protagonista</span>
                                    </div>
                                    <div className="space-y-2 mt-2 pt-2 ">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] text-white/40 uppercase">Motivación</span>
                                            <span className="text-[10px] text-white/70 text-right">Sobrevivir la tormenta</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] text-white/40 uppercase">Evolución</span>
                                            <span className="text-[10px] text-[#c4ff00] text-right">+ Independencia</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Character Item 2 */}
                                <div className="p-3 bg-white/[0.02] rounded-xl border-white/[0.03] hover:bg-white/[0.05] transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-white">Mentor Erydon</span>
                                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">Guía</span>
                                    </div>
                                    <div className="space-y-2 mt-2 pt-2 ">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] text-white/40 uppercase">Motivación</span>
                                            <span className="text-[10px] text-white/70 text-right">Proteger la reliquia</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] text-white/40 uppercase">Evolución</span>
                                            <span className="text-[10px] text-rose-400 text-right">- Confianza</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bento Card: Señales y Continuidad */}
                        <div className="bg-rose-500/[0.02] rounded-2xl p-4 ">
                            <h4 className="text-[10px] font-bold tracking-widest text-rose-400 uppercase mb-3 flex items-center gap-2">
                                <AlertCircle size={12} /> Diagnóstico de Escena
                            </h4>
                            <div className="space-y-3">
                                <div className="p-2.5 rounded-lg bg-rose-500/10  text-xs text-rose-200">
                                    <span className="font-bold block mb-1">Riesgo Detectado</span>
                                    El artefacto reacciona sin explicación previa. Considera plantar una señal narrativa antes de este momento.
                                </div>
                                <div className="p-2.5 rounded-lg bg-white/[0.05]  text-xs text-white/70">
                                    <span className="font-bold text-[#c4ff00] block mb-1">Promesa Narrativa</span>
                                    El antagonista promete vengarse antes del ocaso.
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};
