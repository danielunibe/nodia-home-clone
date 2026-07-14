'use client';

import React from 'react';
import { useNodeStore } from '@/app/store/useNodeStore';

interface ContextMenuProps {
    x: number;
    y: number;
    zoom: number;
    pan: { x: number; y: number };
    canvasRect: DOMRect | null;
    onClose: () => void;
}

export const CanvasContextMenu = ({ x, y, zoom, pan, canvasRect, onClose }: ContextMenuProps) => {
    
    const handleAddNode = (type: string, label: string, desc: string, layer: string) => {
        if (!canvasRect) return;
        const worldX = (x - canvasRect.left - pan.x) / zoom;
        const worldY = (y - canvasRect.top - pan.y) / zoom;
        useNodeStore.getState().addNode({
            id: `node_${Date.now()}`,
            type,
            label,
            position: { x: worldX, y: worldY },
            content: { title: label, content: desc },
            layer
        } as any);
        onClose();
    };

    return (
        <div
            className="absolute z-50 rounded-[16px] bg-[linear-gradient(135deg,rgba(30,35,42,0.8),rgba(18,21,26,0.9))] backdrop-blur-md  shadow-md py-2 min-w-[200px]"
            style={{ left: x, top: y }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="px-3 py-1 text-[10px] font-black tracking-widest uppercase text-white/30   mb-1 mx-2">
                Añadir Nodo de Sistema
            </div>
            
            <button
                className="w-full text-left px-4 py-2 mt-1 hover:bg-white/[0.05] text-white/80 text-sm transition-colors flex items-center gap-3 hover:text-white"
                onClick={() => handleAddNode('metadata', 'Room Structure', 'Nuevo nodo Arquitectura', 'espacialidad')}
            >
                <div className="w-[20px] h-[20px] rounded-md bg-[var(--lime)]/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2">
                        <polygon points="12,2 22,8 12,14 2,8" opacity="0.6"/><polygon points="2,8 12,14 12,22 2,16" opacity="0.9"/><polygon points="22,8 12,14 12,22 22,16" opacity="0.4"/>
                    </svg>
                </div>
                Nuevo Cuarto (Room)
            </button>
            <button
                className="w-full text-left px-4 py-2 hover:bg-white/[0.05] text-white/80 text-sm transition-colors flex items-center gap-3 hover:text-white"
                onClick={() => handleAddNode('event', 'Narrative Event', 'Nuevo evento narrativo', 'cronos')}
            >
                <div className="w-[20px] h-[20px] rounded-md bg-[#a855f7]/10 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </div>
                Evento Narrativo
            </button>
        </div>
    );
};
