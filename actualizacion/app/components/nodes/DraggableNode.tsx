'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'motion/react';
import { useAppStore } from '@/app/store/useAppStore';

let topZIndex = 110;

interface DraggableNodeProps {
    children: React.ReactNode;
    className?: string;
    initialTop: string;
    initialLeft: string;
    onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export const DraggableNode = ({ children, className = '', initialTop, initialLeft, onDragEnd }: DraggableNodeProps) => {
    const [zIndex, setZIndex] = useState(5);
    const viewMode = useAppStore(state => state.viewMode);
    
    // Si estamos en 3D o Orto, aplicamos una rotacion para que tengan volumen y no esten pegados al piso
    const is3D = viewMode === '3d';
    const isOrto = viewMode === 'orto';
    
    let transformContent = "none";
    if (is3D) {
       transformContent = "translateZ(30px) rotateX(-60deg) rotateZ(-30deg)";
    } else if (isOrto) {
       transformContent = "translateZ(30px) rotateX(-45deg) rotateZ(-45deg)";
    }
    
    return (
        <motion.div
            drag
            dragMomentum={false}
            className={`absolute z-[5] cursor-grab active:cursor-grabbing opacity-0 animate-[fadeUp_0.7s_cubic-bezier(0.2,0.8,0.2,1)_forwards] will-change-transform ${className}`}
            style={{ 
                top: initialTop, 
                left: initialLeft, 
                zIndex, 
                pointerEvents: 'auto', 
                position: 'absolute',
                transformStyle: 'preserve-3d'
            }}
            onDragEnd={onDragEnd}
            onMouseDown={() => {
                topZIndex++;
                setZIndex(topZIndex);
            }}
            whileHover={{ scale: 1.02, filter: 'brightness(1.04)' }}
            whileTap={{ scale: 1.02, cursor: 'grabbing' }}
        >
            <div style={{ transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)', transform: transformContent, transformStyle: 'preserve-3d', width: '100%', height: '100%' }}>
                {children}
            </div>
            {/* Sombras bajo el nodo */}
            {(is3D || isOrto) && (
               <div className="absolute inset-0 bg-black/20 blur-xl pointer-events-none rounded-inherit translate-z-[-30px]" style={{ transform: 'translateZ(-30px)' }}/>
            )}
        </motion.div>
    );
};

