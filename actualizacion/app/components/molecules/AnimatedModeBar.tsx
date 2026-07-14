import React from 'react';
import { WorkspaceMode } from '@/app/store/useAppStore';
import { InteractiveIconButton } from '../atoms/InteractiveIconButton';
import { I_Poe, I_Nodos, I_ArcoPersonaje } from '../atoms/LowPolyIcons';
import { Menu as MenuIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimatedModeBarProps {
  onChatToggle: () => void;
  aiVisible: boolean;
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;
}

export const AnimatedModeBar: React.FC<AnimatedModeBarProps> = ({ 
  workspaceMode, 
  setWorkspaceMode 
}) => {
  // Poe, Arco, and Nodos modes. Desarrollo and Nodos are identical.
  const herramientas = [
    { id: 'poe', icon: I_Poe, nombre: 'Poe', bgFrom: '#7e22ce', bgTo: '#581c87', color: '#c084fc' },
    { id: 'arco', icon: I_ArcoPersonaje, nombre: 'Arco', bgFrom: '#b91c1c', bgTo: '#7f1d1d', color: '#f87171' },
    { id: 'nodos', icon: I_Nodos, nombre: 'Nodos', bgFrom: '#0369a1', bgTo: '#075985', color: '#38bdf8' },
  ];

  const handleToolClick = (id: string) => {
    setWorkspaceMode(id as WorkspaceMode);
  };

  const handleMenuClick = () => {
    setWorkspaceMode('dev');
  };

  // 'dev' acts as the Menu/Home canvas state
  const isMenuCtxActive = workspaceMode === 'dev' || workspaceMode === 'desarrollo';

  // Custom icon component for Menu using Lucide Menu
  const MenuComponentIcon = () => (
    <div className="flex items-center justify-center text-white/80">
      <MenuIcon size={16} />
    </div>
  );

  const activeIndex = herramientas.findIndex((h) => h.id === workspaceMode);
  const activeTool = activeIndex !== -1 ? herramientas[activeIndex] : herramientas[0];

  return (
    <div className="relative flex items-center justify-center pointer-events-auto w-[240px]">
      {/* Background Sliding Glow Orb (Laying PHYSICALLY BEHIND the flat container) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center gap-1.5 p-1 px-1.5 z-0">
        {herramientas.map((h) => {
          const isActive = workspaceMode === h.id;
          return (
            <div 
              key={`glow-${h.id}`}
              className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center"
              style={{
                width: isActive 
                  ? (h.id === 'poe' ? '92px' : h.id === 'arco' ? '98px' : '108px') 
                  : '48px',
                height: '36px'
              }}
            >
              {isActive && (
                <motion.div 
                  layoutId="modebar-glow"
                  className="absolute rounded-lg pointer-events-none"
                  style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)`,
                    boxShadow: `0 0 15px ${h.color}30`,
                    zIndex: 0
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* FLAT CONTAINER */}
      <div className="w-full flex items-center justify-center p-1 rounded-lg relative z-10 h-[36px]">
        {/* Modos Específicos */}
        <div className="flex items-center justify-center gap-1.5 relative z-10 w-full h-full">
          {herramientas.map((herramienta) => (
            <InteractiveIconButton
              key={herramienta.id}
              id={herramienta.id}
              icon={herramienta.icon}
              nombre={herramienta.nombre}
              color={herramienta.color}
              bgFrom={herramienta.bgFrom}
              bgTo={herramienta.bgTo}
              onClick={handleToolClick}
              isActive={workspaceMode === herramienta.id}
              mostrarTooltip={false}
              variant="expandable"
              sizeClass={workspaceMode === herramienta.id ? "h-full rounded-md" : "w-[28px] h-full rounded-md"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

