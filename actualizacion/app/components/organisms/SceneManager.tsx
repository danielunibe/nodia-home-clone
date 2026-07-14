'use client';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Layout, FileText, ChevronRight } from 'lucide-react';
import { Scene } from '@/lib/types';
import { useAppStore } from '@/app/store/useAppStore';

interface SceneManagerProps {
    isOpen: boolean;
    scenes: Scene[];
    onClose: () => void;
    onGoToScene: (x: number, y: number) => void;
}

export const SceneManager = ({ isOpen, scenes, onClose, onGoToScene }: SceneManagerProps) => {
    const { workspaceMode, setWorkspaceMode } = useAppStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="absolute top-[80px] left-[32px] z-[200] pointer-events-none">
                    {/* Glowing Azure Orb behind Gestor de Escenas */}
                    <motion.div 
                        animate={{ 
                            opacity: [0.35, 0.45, 0.35],
                            scale: [1, 1.08, 1],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[10%] left-[20px] w-[180px] h-[180px] rounded-full bg-sky-600/35 blur-[54px] pointer-events-none -z-10"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                        className="w-[320px] bg-[rgba(15,19,23,0.7)] backdrop-blur-[30px] saturate-[150%] rounded-[20px] shadow-md overflow-hidden pointer-events-auto flex flex-col"
                    >
                    <div className="flex justify-between items-center p-[18px]">
                        <span className="text-[10px] font-extrabold text-[#6A6A73] tracking-[1px]">GESTOR DE ESCENAS</span>
                        <button className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white/5 hover:bg-[var(--lime)] text-[var(--lime)] hover:text-black cursor-pointer transition-all duration-200 hover:scale-110" title="Añadir Escena">
                            <Plus size={16} />
                        </button>
                    </div>

                    <div className="p-[12px] max-h-[400px] overflow-y-auto">
                        {scenes.map(scene => (
                            <div key={scene.id}>
                                <div className="group flex items-center justify-between p-[10px_14px] rounded-[10px] cursor-pointer text-[var(--text-3)] text-[12.5px] transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--text)]">
                                    <div className="flex items-center gap-[10px] flex-1" onClick={() => onGoToScene(scene.x, scene.y)}>
                                        <Layout size={14} className="opacity-50 text-[var(--lime)]" />
                                        {scene.label}
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 bg-[var(--lime)] text-black border-none rounded-[6px] p-[4px_8px] text-[10px] font-extrabold uppercase transition-all duration-200" onClick={() => onGoToScene(scene.x, scene.y)}>IR</button>
                                </div>
                                {scene.children?.map(child => (
                                    <div key={child.id} className="group flex items-center justify-between p-[10px_14px] rounded-[10px] cursor-pointer text-[var(--text-3)] text-[12.5px] transition-all duration-200 hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--text)]" style={{ paddingLeft: '32px' }}>
                                        <div className="flex items-center gap-[10px] flex-1" onClick={() => onGoToScene(child.x, child.y)}>
                                            <FileText size={14} className="opacity-40" />
                                            {child.label}
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 bg-[var(--lime)] text-black border-none rounded-[6px] p-[4px_8px] text-[10px] font-extrabold uppercase transition-all duration-200" onClick={() => onGoToScene(child.x, child.y)}>IR</button>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
