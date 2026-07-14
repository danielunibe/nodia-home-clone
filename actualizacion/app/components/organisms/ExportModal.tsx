'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Compass, Map, Download, Check, FileJson } from 'lucide-react';
import { usePoeStore } from '@/app/store/usePoeStore';
import { useAppStore } from '@/app/store/useAppStore';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
    const { chapters } = usePoeStore();
    const { workspaceMode } = useAppStore();
    const [exportFormat, setExportFormat] = React.useState<'markdown' | 'json' | 'pdf'>('markdown');
    
    // Some analysis metric counts
    const totalChapters = chapters?.length || 0;
    const totalScenes = chapters?.reduce((acc, c) => acc + (c.scenes?.length || 0), 0) || 0;
    
    // Handle the actual export (mocked logic for now, but UI shows the intent)
    const handleExport = () => {
        // Trigger specific logic depending on workspaceMode and format
        console.log(`Exporting ${workspaceMode} in ${exportFormat} format...`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#000000]/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-[#0c0e12]/95 backdrop-blur-3xl  rounded-2xl shadow-md overflow-hidden flex flex-col"
                >
                    <div className="flex items-center justify-between p-4 ">
                        <h2 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            <Download size={16} className="text-[#c4ff00]" /> Exportar Proyecto
                        </h2>
                        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="p-6 flex flex-col gap-6">
                        {/* Analysis Section */}
                        <div className="bg-white/5  rounded-xl p-4">
                            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Análisis de Exportación</h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/40 uppercase">Modo Activo</span>
                                    <span className="text-sm font-medium text-white flex items-center gap-1.5 capitalize">
                                        {workspaceMode === 'poe' ? <FileText size={14} className="text-[#38bdf8]" /> : null}
                                        {workspaceMode === 'arco' ? <Compass size={14} className="text-[#c4ff00]" /> : null}
                                        {workspaceMode === 'nodos' ? <Map size={14} className="text-[#ff3366]" /> : null}
                                        {workspaceMode}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/40 uppercase">Estructuras</span>
                                    <span className="text-sm font-medium text-white">{totalChapters} Capítulos</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/40 uppercase">Segmentos</span>
                                    <span className="text-sm font-medium text-white">{totalScenes} Escenas</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] text-white/40 uppercase">Peso Est.</span>
                                    <span className="text-sm font-medium text-white">~45 KB</span>
                                </div>
                            </div>
                            
                            <div className="mt-4 text-[11px] text-white/50 leading-relaxed bg-[#000000]/20 p-3 rounded-lg ">
                                Este proyecto refleja una exportación estructurada según la vista actual ({workspaceMode}). 
                                {workspaceMode === 'poe' && " El modo Poe exportará primariamente el texto en formato manuscrito con la configuración de página actual."}
                                {workspaceMode === 'arco' && " El modo Arco exportará la estructura narrativa, perfiles de personajes y escaletas."}
                                {workspaceMode === 'nodos' && " El modo Nodos exportará la topología del mundo y los diagramas relacionales identificados."}
                            </div>
                        </div>

                        {/* Format Selection */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest">Formato de Salida</h3>
                            <div className="grid grid-cols-3 gap-3">
                                <button 
                                    onClick={() => setExportFormat('markdown')}
                                    className={`p-4 rounded-xl flex flex-col gap-2 items-center justify-center text-center transition-all ${exportFormat === 'markdown' ? 'border-[#c4ff00] bg-[#c4ff00]/10 text-white' : ' text-white/50 hover:bg-white/5 hover:'}`}
                                >
                                    <FileText size={24} className={exportFormat === 'markdown' ? 'text-[#c4ff00]' : ''} />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold font-mono">.md</span>
                                        <span className="text-[10px] opacity-70">Markdown Document</span>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => setExportFormat('json')}
                                    className={`p-4 rounded-xl flex flex-col gap-2 items-center justify-center text-center transition-all ${exportFormat === 'json' ? 'border-[#38bdf8] bg-[#38bdf8]/10 text-white' : ' text-white/50 hover:bg-white/5 hover:'}`}
                                >
                                    <FileJson size={24} className={exportFormat === 'json' ? 'text-[#38bdf8]' : ''} />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold font-mono">.json</span>
                                        <span className="text-[10px] opacity-70">Nodia Project Model</span>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => setExportFormat('pdf')}
                                    className={`p-4 rounded-xl flex flex-col gap-2 items-center justify-center text-center transition-all ${exportFormat === 'pdf' ? 'border-[#ff3366] bg-[#ff3366]/10 text-white' : ' text-white/50 hover:bg-white/5 hover:'}`}
                                >
                                    <div className="relative">
                                        <FileText size={24} className={exportFormat === 'pdf' ? 'text-[#ff3366]' : ''} />
                                        <span className="absolute -bottom-1 -right-1 text-[8px] bg-white/20 px-1 rounded">PDF</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold">PDF</span>
                                        <span className="text-[10px] opacity-70">Formato de Lectura</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4   bg-white/[0.02] flex justify-end gap-3">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleExport}
                            className="flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[linear-gradient(135deg,#c4ff00,#8ab300)] hover:brightness-110 active:scale-95 transition-all shadow-md"
                        >
                            <Check size={14} /> Exportar {workspaceMode}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
