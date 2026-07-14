'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MousePointer2, Move, Maximize, RotateCw } from 'lucide-react';
import { useAppStore } from '@/app/store/useAppStore';

interface RadialMenuProps {
    x: number;
    y: number;
    onClose: () => void;
}

const RADIAL_ITEMS = [
    { id: 'pointer', label: 'Select (V)', icon: MousePointer2, angle: -90, shortcut: 'V' },
    { id: 'move', label: 'Move (M)', icon: Move, angle: 0, shortcut: 'M' },
    { id: 'scale', label: 'Scale (S)', icon: Maximize, angle: 90, shortcut: 'S' },
    { id: 'rotate', label: 'Rotate (R)', icon: RotateCw, angle: 180, shortcut: 'R' },
];

export const RadialMenu = ({ x, y, onClose }: RadialMenuProps) => {
    const { activeToolId, setActiveTool } = useAppStore();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Prevent context menu from closing this immediately
    useEffect(() => {
        const handleCtx = (e: MouseEvent) => {
            e.preventDefault();
        };
        window.addEventListener('contextmenu', handleCtx);
        return () => window.removeEventListener('contextmenu', handleCtx);
    }, []);

    const radius = 60;

    return (
        <div 
            className="fixed inset-0 z-[100000]" 
            onClick={onClose} 
            onContextMenu={(e) => { e.preventDefault(); onClose(); }}
        >
            <div 
                className="absolute pointer-events-none"
                style={{ top: y, left: x }}
            >
                {/* Center dot/ring */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2  bg-black/50 backdrop-blur-md flex items-center justify-center shadow-md"
                >
                    <div className="w-2 h-2 rounded-full bg-white/50" />
                </motion.div>

                {RADIAL_ITEMS.map((item, i) => {
                    const rad = (item.angle * Math.PI) / 180;
                    const tx = Math.cos(rad) * radius;
                    const ty = Math.sin(rad) * radius;

                    const isActive = activeToolId === item.id;
                    const isHovered = hoveredNode === item.id;

                    return (
                        <motion.button
                            key={item.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                            animate={{ x: tx, y: ty, scale: 1, opacity: 1 }}
                            exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                            transition={{ 
                                type: 'spring', 
                                stiffness: 300, 
                                damping: 20, 
                                delay: i * 0.03 
                            }}
                            onMouseEnter={() => setHoveredNode(item.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveTool(item.id, 'var(--lime)');
                                onClose();
                            }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-all duration-200 pointer-events-auto shadow-md
                                ${isActive 
                                    ? 'bg-[var(--lime)]/20 border-[var(--lime)] text-[var(--lime)] shadow-md' 
                                    : 'bg-black/60  text-white/70 hover:bg-black/80 hover: hover:text-white hover:scale-110'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            
                            {/* Tooltip inline inside radial ring */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 2 }}
                                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80  text-[10px] font-bold tracking-wider text-white whitespace-nowrap shadow-md"
                                    >
                                        {item.label}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
