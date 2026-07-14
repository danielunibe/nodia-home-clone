'use client';

import React from 'react';
import { WorkspaceMode } from '@/app/store/useAppStore';
import { I_Poe, I_Nodos, I_ArcoPersonaje, I_Desarrollo, I_Home } from '../atoms/LowPolyIcons';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LowPolyModeSelectorProps {
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
}

export const LowPolyModeSelector: React.FC<LowPolyModeSelectorProps> = ({
  workspaceMode,
  setWorkspaceMode,
}) => {
  const modes = [
    {
      id: 'home' as WorkspaceMode,
      nombre: 'Home',
      icon: I_Home,
      color: '#c4ff00', // Unique vibrant highlight for Home
      isActive: workspaceMode === 'home',
    },
    {
      id: 'poe' as WorkspaceMode,
      nombre: 'Poe',
      icon: I_Poe,
      color: '#c084fc', // Established Purple/Amethyst
      isActive: workspaceMode === 'poe',
    },
    {
      id: 'arco' as WorkspaceMode,
      nombre: 'Arco',
      icon: I_ArcoPersonaje,
      color: '#f87171', // Established Muted Coral Red
      isActive: workspaceMode === 'arco',
    },
    {
      id: 'nodos' as WorkspaceMode,
      nombre: 'Nodos',
      icon: I_Nodos,
      color: '#38bdf8', // Established Sky Blue
      isActive: workspaceMode === 'nodos',
    },
  ];

  return (
    <div 
      id="low-poly-mode-selector-pill"
      className="relative flex items-center justify-center p-1 rounded-full bg-[#050609]/60 backdrop-blur-xl select-none pointer-events-auto transition-all duration-300 h-[36px] overflow-hidden gap-1 px-1.5"
    >
      {/* Mode Buttons */}
      {modes.map((m) => {
        const IconComponent = m.icon;
        return (
          <button
            id={`lowpoly-btn-${m.id}`}
            key={m.id}
            onClick={() => setWorkspaceMode(m.id)}
            className={cn(
              "relative h-full flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 z-10 active:scale-95 group outline-none bg-transparent",
              m.isActive ? "px-3 bg-white/10" : "px-2 hover:bg-white/5"
            )}
          >
            {/* Color-matched and styled container */}
            <div 
              className={cn(
                "flex items-center justify-center gap-2 font-sans transition-all duration-300",
                m.isActive ? "scale-100 opacity-100 font-extrabold" : "scale-[0.98] opacity-50 font-medium text-white group-hover:opacity-100"
              )}
              style={m.isActive ? { color: m.color } : {}}
            >
              {/* Responsive Styled Low-Poly Icon */}
              <div 
                className={cn(
                  "flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110",
                  m.isActive ? "w-[18px] h-[18px]" : "w-[16px] h-[16px]"
                )}
                style={!m.isActive ? { color: 'inherit' } : {}}
              >
                <div 
                    className="w-full h-full transition-colors duration-300 group-hover:text-[var(--hover-color)] drop-shadow-md"
                    style={{ '--hover-color': m.color } as React.CSSProperties}
                >
                    <IconComponent />
                </div>
              </div>

              {/* Label Name, fully colored with its established mode color */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out flex items-center",
                  m.isActive ? "max-w-[80px] opacity-100" : "max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100 group-hover:delay-200"
                )}
              >
                <span 
                  className="font-sans text-[11px] uppercase tracking-[0.08em] mt-[1px] transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                  style={{ '--hover-color': m.color } as React.CSSProperties}
                >
                  {m.nombre}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
