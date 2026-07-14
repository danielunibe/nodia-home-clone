import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { cn } from '@/lib/utils';

interface InteractiveIconButtonProps {
  id: string;
  tipo?: 'menu' | 'herramienta' | 'caja';
  icon: React.FC | any;
  nombre: string;
  color: string;
  bgFrom?: string;
  bgTo?: string;
  onClick?: (id: string, tipo?: string) => void;
  isActive?: boolean;
  mostrarTooltip?: boolean;
  variant?: 'expandable' | 'simple';
  size?: 'small' | 'medium';
  sizeClass?: string;
}

export const InteractiveIconButton: React.FC<InteractiveIconButtonProps> = ({ 
  id, 
  tipo,
  icon: Icon, 
  nombre, 
  color,
  bgFrom,
  bgTo,
  onClick, 
  isActive,
  mostrarTooltip,
  variant = 'simple',
  size = 'small',
  sizeClass
}) => {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsFlashing(true);
    // Sincronizado exactamente con el tiempo de 0.45s del CSS
    setTimeout(() => setIsFlashing(false), 450);
    if (onClick) onClick(id, tipo);
  };

  const currentSizeClass = sizeClass || (size === 'medium' ? 'w-[56px] h-[56px] rounded-[16px]' : 'w-[48px] h-[48px] rounded-[16px]');

  return (
    <Tooltip texto={nombre} mostrar={mostrarTooltip ?? !isActive}>
      <button
        onClick={handleClick}
        className={cn(
 "dynamic-btn flex items-center justify-center outline-none relative overflow-hidden",
          currentSizeClass,
          variant === 'expandable' && isActive ? 'w-auto px-4 pl-3 pr-5' : '', 
          isActive && variant === 'simple' ? 'text-white' : '',
          isActive && variant === 'expandable' ? 'text-white' : '',
          !isActive ? 'text-[#888888] bg-transparent hover:bg-white/[0.04]' : ''
        )}
        style={{ 
          '--icon-color': color,
        } as React.CSSProperties}
      >
        {/* Physical Frosted Glass Background layer (z-10: covers the glows below, blurs them, but sits underneath foreground content) */}
        {isActive && variant === 'expandable' && (
          <div 
            className="absolute inset-0 rounded-[inherit] outline-none pointer-events-none z-10"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
            }}
          />
        )}

        {/* Glow Trasero Centrado (z-0: sitting behind the glass layer, giving high-end diffused illumination) */}
        {variant === 'expandable' && isActive && (
          <span className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
            <span 
              className="w-[110%] h-[110%] rounded-full opacity-60 blur-[18px] animate-pulse"
              style={{ 
                background: `radial-gradient(circle, ${color} 0%, transparent 68%)` 
              }}
            />
          </span>
        )}

        {/* Efecto iOS Flash (Respuesta Háptica) */}
        {isFlashing && (
          <span 
            className="absolute inset-0 rounded-[16px] animate-ios-flash pointer-events-none z-0"
            style={{ 
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)` 
            }}
          />
        )}
        
        {/* Foreground Content (z-20: Always perfectly crisp and high-contrast) */}
        <div className="relative z-20 flex items-center justify-center">
          <Icon />
          
          {variant === 'expandable' && (
            <div 
              className={cn(
 "transition-[grid-template-columns,opacity,margin] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] grid",
                isActive ? 'grid-cols-[1fr] ml-2.5 opacity-100' : 'grid-cols-[0fr] ml-0 opacity-0'
              )}
            >
              <div className="overflow-hidden flex items-center">
                 <span 
                  className="whitespace-nowrap text-[13px] font-semibold tracking-wide"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
                >
                  {nombre}
                </span>
              </div>
            </div>
          )}
        </div>
      </button>
    </Tooltip>
  );
};
