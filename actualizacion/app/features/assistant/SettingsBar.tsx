import React, { useState } from 'react';
import { InteractiveIconButton } from '@/app/components/organisms/LowPolyToolbar';
import { useAppStore } from '@/app/store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';

const I_Display = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="2,6 22,6 22,18 2,18" opacity="0.3"/><polygon points="4,8 20,8 20,16 4,16" opacity="0.8"/></svg>;
const I_Database = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,6 20,6 20,10 4,10" opacity="0.8"/><polygon points="4,14 20,14 20,18 4,18" opacity="0.5"/></svg>;
const I_AI = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,12 12,22 2,12" opacity="0.8"/><polygon points="12,8 16,12 12,16 8,12" opacity="0.5"/></svg>;
const I_System = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 19,6 19,14 12,18 5,14 5,6" opacity="0.8"/><polygon points="12,18 19,14 15,12 12,14 9,12 5,14" opacity="0.5"/></svg>;

const SETTINGS_TOOLS = [
  { id: 'display', icon: I_Display, nombre: 'Resolución y Fondo', colorHover: '#3B82F6', from: 'rgba(59,130,246,0.8)', to: 'rgba(59,130,246,0)' },
  { id: 'database', icon: I_Database, nombre: 'Datos', colorHover: '#10B981', from: 'rgba(16,185,129,0.8)', to: 'rgba(16,185,129,0)' },
  { id: 'ai', icon: I_AI, nombre: 'Engine AI', colorHover: '#F59E0B', from: 'rgba(245,158,11,0.8)', to: 'rgba(245,158,11,0)' },
  { id: 'system', icon: I_System, nombre: 'Sistema', colorHover: '#F43F5E', from: 'rgba(244,63,94,0.8)', to: 'rgba(244,63,94,0)' }
];

export const SettingsBar = ({ isVisible }: { isVisible: boolean }) => {
  const [activeTab, setActiveTab] = useState('display');

  if (!isVisible) return null;

  const activeIndex = SETTINGS_TOOLS.findIndex(t => t.id === activeTab);
  const activeTool = SETTINGS_TOOLS[activeIndex] || SETTINGS_TOOLS[0];
  
  const salto = 56; 
  const translacionLuzY = (activeIndex * salto) - 18;
  const translacionCajaY = activeIndex * salto;

  return (
    <div className="w-full h-full flex flex-row items-center justify-end pr-4 gap-6 pointer-events-none relative z-50">
      
      <div 
        className="h-full flex flex-col items-center justify-center pointer-events-auto relative w-[80px]"
      >
        <div className="absolute right-0 w-[64px] h-fit bg-transparent rounded-[32px] py-1 shadow-md" />
        
        <div className="relative flex flex-col items-center p-3 gap-4 rounded-[32px] bg-[#14181c] shadow-md backdrop-blur-xl group transition-all duration-500 hover:bg-[#1a1f24]">
          
          {/* Luces de Acento Dinámicas (Tailwind Pure) */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] pointer-events-none z-0">
            <div
              className="absolute w-24 h-16 rounded-full blur-[32px] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-40 shadow-md"
              style={{
                right: '-48px', 
                background: activeTool.from,
                top: '16px',
                transform: `translateY(${translacionLuzY}px)`
              }}
            ></div>
          </div>
          
          {/* Cursor de selección Glass */}
          <div
            className="absolute left-[10px] w-12 h-12 rounded-[14px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none z-10 bg-white/5  shadow-md"
            style={{
              top: '12px',
              transform: `translateY(${translacionCajaY}px)`,
            }}
          ></div>

          <div className="relative z-20 flex flex-col items-center gap-3">
            {SETTINGS_TOOLS.map((tool) => (
              <InteractiveIconButton 
                key={tool.id}
                id={tool.id}
                icon={tool.icon}
                nombre={tool.nombre}
                color={tool.colorHover} 
                onClick={() => setActiveTab(activeTab === tool.id ? '' : tool.id)}
                isActive={activeTab === tool.id}
                mostrarTooltip={true}
                sizeClass="w-12 h-12 rounded-[14px]"
                tooltipDirection="left"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
