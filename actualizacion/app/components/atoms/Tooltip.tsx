import React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  texto: string;
  mostrar?: boolean;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ texto, mostrar = true, children }) => (
  <div className="relative flex items-center justify-center group pointer-events-auto">
    {children}
    <div 
      className={cn(
 "absolute px-3 py-1.5 text-xs font-medium text-white/90 bg-[#1A1A1A] border-white/[0.08] rounded-lg shadow-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform pointer-events-none whitespace-nowrap z-50",
        mostrar ? "opacity-0 -bottom-12 group-hover:opacity-100 group-hover:-bottom-14 scale-90 group-hover:scale-100" : "opacity-0 -bottom-14 hidden"
      )}
    >
      {texto}
    </div>
  </div>
);
