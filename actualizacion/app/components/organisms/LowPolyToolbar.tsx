'use client';

import React, { useState, useCallback, memo } from 'react';
import { NodiaBridge } from '@/services/Bridge';
import { useRoomStore } from '@/app/store/useRoomStore';
import { useAppStore } from '@/app/store/useAppStore';
import { cn } from '@/lib/utils';

import { I_AgenteIA } from '../atoms/LowPolyIcons';

// --- Componente de Tooltip ---
export const Tooltip = memo(({ texto, mostrar = true, children, direction = 'bottom' }: { texto: string, mostrar: boolean, children: React.ReactNode, direction?: 'top' | 'bottom' | 'left' }) => {
  const isLeft = direction === 'left';
  const isTop = direction === 'top';
  
  let posClasses = '';
  if (isLeft) {
    posClasses = 'right-[calc(100%+12px)] top-1/2 -translate-y-1/2 group-hover:translate-x-0 translate-x-2';
  } else if (isTop) {
    posClasses = '-top-12 group-hover:translate-y-0 translate-y-2';
  } else {
    posClasses = '-bottom-12 group-hover:translate-y-0 -translate-y-2';
  }

  return (
    <div className="relative flex items-center justify-center group">
      {children}
      <div className={`absolute px-3 py-1.5 text-xs font-medium text-white/90 bg-[#1A1A1A] border-white/[0.08] rounded-lg shadow-md transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] transform pointer-events-none whitespace-nowrap z-50 ${mostrar ? `opacity-0 group-hover:opacity-100 ${posClasses}` : 'opacity-0 hidden'}`}>
        {texto}
      </div>
    </div>
  );
});
Tooltip.displayName = 'Tooltip';

// --- Componente de Botón Interactivo ---
export const InteractiveIconButton = memo(({ id, icon: Icon, nombre, color, onClick, isActive, mostrarTooltip, sizeClass = "w-[48px] h-[48px] rounded-[16px]", tooltipDirection = 'top', draggable, onDragStart }: any) => {
  const [isFlashing, setIsFlashing] = useState(false);

  const handleClick = useCallback(() => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 450); 
    if (onClick) onClick(id, color);
  }, [id, color, onClick]);

  return (
    <Tooltip texto={nombre} mostrar={mostrarTooltip} direction={tooltipDirection}>
      <div
        draggable={draggable}
        onDragStart={(e) => onDragStart && onDragStart(e, id)}
        onClick={handleClick}
        className={`transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center ${sizeClass} outline-none relative overflow-visible ${
          isActive 
            ? 'text-white drop-shadow-md' 
            : 'text-[#888888] bg-transparent hover:bg-white/[0.04] hover:-translate-y-1 hover:scale-110 active:translate-y-0 active:scale-95'
        } ${draggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
        style={{ '--icon-color': color } as React.CSSProperties}
      >
        {isFlashing && (
          <span 
            className="absolute inset-0 rounded-full animate-ios-flash pointer-events-none z-0"
            style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
          />
        )}
        <div className="relative z-10"><Icon /></div>
      </div>
    </Tooltip>
  );
});
InteractiveIconButton.displayName = 'InteractiveIconButton';

// --- ICONS (Low Poly) ---
const IconoLibro = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,20 20,15 20,5 12,10" opacity="0.6"/><polygon points="12,20 4,15 4,5 12,10" opacity="0.4"/><polygon points="12,22 22,17 22,7 12,12" opacity="0.9"/><polygon points="12,22 2,17 2,7 12,12" opacity="0.7"/></svg>;
const IconoActante = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 8,6 12,10 16,6" opacity="0.9"/><polygon points="8,6 12,10 12,14 8,10" opacity="0.6"/><polygon points="16,6 12,10 12,14 16,10" opacity="0.4"/><polygon points="12,14 5,18 12,22 19,18" opacity="0.8"/><polygon points="5,18 12,22 12,24 5,20" opacity="0.5"/><polygon points="19,18 12,22 12,24 19,20" opacity="0.3"/></svg>;
const IconoProp = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,3 21,8 12,13 3,8" opacity="0.9"/><polygon points="3,8 12,13 12,21 3,16" opacity="0.5"/><polygon points="21,8 12,13 12,21 21,16" opacity="0.7"/></svg>;
const IconoEntorno = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="2,18 10,6 16,14" opacity="0.9"/><polygon points="10,6 18,12 16,14" opacity="0.6"/><polygon points="16,14 18,12 22,18" opacity="0.8"/><polygon points="12,22 2,18 16,14 22,18" opacity="0.4"/></svg>;
const IconoInterfaz = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="3,7 21,4 21,18 3,21" opacity="0.4"/><polygon points="5,9 19,6 19,16 5,19" opacity="0.9"/><polygon points="7,11 11,10 11,14 7,15" fill="#141414" opacity="0.8"/></svg>;

const I_Narrativa = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="10,3 18,7 10,11 2,7" opacity="0.4"/><polygon points="12,7 20,11 12,15 4,11" opacity="0.6"/><polygon points="14,11 22,15 14,19 6,15" opacity="0.9"/></svg>; 
const I_Mecanicas = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="16,3 21,8 15,14 10,9" opacity="0.9"/><polygon points="10,9 15,14 8,21 3,16" opacity="0.5"/><polygon points="19,5 21,8 15,14 13,11" opacity="0.4"/></svg>; 
const I_Dialogos = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,4 20,4 20,14 4,14" opacity="0.6"/><polygon points="8,14 16,14 12,20" opacity="0.6"/><polygon points="2,6 18,6 18,16 2,16" opacity="0.9"/><polygon points="6,16 14,16 10,22" opacity="0.9"/></svg>; 
const I_Camara = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,10 14,10 14,18 4,18" opacity="0.9"/><polygon points="14,12 20,8 20,20 14,16" opacity="0.6"/><polygon points="4,10 8,6 18,6 14,10" opacity="0.4"/></svg>; 
const I_Imagenes = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="2,4 22,4 22,20 2,20" opacity="0.4"/><polygon points="4,6 20,6 20,18 4,18" fill="#141414" opacity="0.8"/><polygon points="4,18 10,10 14,15 17,11 20,15 20,18" opacity="0.9"/></svg>; 
const I_Sonido = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,8 14,3 14,21 8,16" opacity="0.7"/><polygon points="2,10 8,10 8,14 2,14" opacity="0.9"/><polygon points="16,8 18,10 18,14 16,16" opacity="0.4"/><polygon points="19,5 22,9 22,15 19,19" opacity="0.5"/></svg>; 

const I_Hombre = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 8,5 12,8 16,5" opacity="0.9"/><polygon points="8,5 8,11 12,14 12,8" opacity="0.6"/><polygon points="16,5 16,11 12,14 12,8" opacity="0.4"/><polygon points="12,15 6,18 12,22 18,18" opacity="0.9"/><polygon points="6,18 6,24 12,24 12,22" opacity="0.5"/><polygon points="18,18 18,24 12,24 12,22" opacity="0.3"/></svg>;
const I_Mujer = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 9,6 12,10 15,6" opacity="0.9"/><polygon points="9,6 9,11 12,15 12,10" opacity="0.6"/><polygon points="15,6 15,11 12,15 12,10" opacity="0.4"/><polygon points="12,13 4,22 12,24 20,22" opacity="0.9"/><polygon points="4,22 12,24 12,13" opacity="0.5"/><polygon points="20,22 12,24 12,13" opacity="0.3"/></svg>;
const I_Robot = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 7,4 12,6 17,4" opacity="0.9"/><polygon points="7,4 7,10 12,12 12,6" opacity="0.6"/><polygon points="17,4 17,10 12,12 12,6" opacity="0.4"/><polygon points="12,13 5,16 12,19 19,16" opacity="0.8"/><polygon points="5,16 5,22 12,24 12,19" opacity="0.5"/><polygon points="19,16 19,22 12,24 12,19" opacity="0.3"/></svg>;
const I_Monstruo = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 6,10 12,14 18,10" opacity="0.9"/><polygon points="6,10 2,18 12,22 12,14" opacity="0.6"/><polygon points="18,10 22,18 12,22 12,14" opacity="0.4"/><polygon points="12,14 8,18 16,18" opacity="0.8"/></svg>;
const I_Perro = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="10,10 4,13 10,16 16,13" opacity="0.9"/><polygon points="4,13 4,18 10,21 10,16" opacity="0.6"/><polygon points="16,13 16,18 10,21 10,16" opacity="0.4"/><polygon points="17,6 13,8 17,11 21,8" opacity="0.9"/><polygon points="13,8 13,12 17,15 17,11" opacity="0.5"/><polygon points="21,8 21,12 17,15 17,11" opacity="0.3"/></svg>;
const I_Gato = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="11,12 5,15 11,18 17,15" opacity="0.8"/><polygon points="5,15 5,20 11,23 11,18" opacity="0.5"/><polygon points="17,15 17,20 11,23 11,18" opacity="0.3"/><polygon points="17,6 14,8 17,11 20,8" opacity="0.9"/><polygon points="14,8 14,12 17,15 17,11" opacity="0.6"/><polygon points="20,8 20,12 17,15 17,11" opacity="0.4"/><polygon points="17,6 15,2 14,8" opacity="0.9"/><polygon points="20,8 23,4 17,6" opacity="0.7"/></svg>;
const I_Pajaro = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,6 6,12 12,18 18,12" opacity="0.9"/><polygon points="6,12 2,16 12,22 12,18" opacity="0.6"/><polygon points="18,12 22,16 12,22 12,18" opacity="0.4"/><polygon points="12,18 6,24 18,24" opacity="0.8"/></svg>;

const I_Cubo = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,3 21,8 12,13 3,8" opacity="0.9"/><polygon points="3,8 12,13 12,21 3,16" opacity="0.5"/><polygon points="21,8 12,13 12,21 21,16" opacity="0.7"/></svg>;
const I_Esfera = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 5,7 12,12" opacity="0.9"/><polygon points="12,2 19,7 12,12" opacity="0.7"/><polygon points="5,7 2,13 8,16 12,12" opacity="0.6"/><polygon points="19,7 22,13 16,16 12,12" opacity="0.4"/><polygon points="12,12 8,16 12,22 16,16" opacity="0.5"/><polygon points="2,13 8,16 5,20" opacity="0.4"/><polygon points="22,13 16,16 19,20" opacity="0.2"/></svg>; 
const I_Cilindro = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 6,5 12,8 18,5" opacity="0.9"/><polygon points="6,5 12,8 12,20 6,17" opacity="0.6"/><polygon points="18,5 12,8 12,20 18,17" opacity="0.4"/><polygon points="6,5 2,8 2,20 6,17" opacity="0.5"/><polygon points="18,5 22,8 22,20 18,17" opacity="0.3"/></svg>;
const I_Cono = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 6,16 12,20" opacity="0.9"/><polygon points="12,2 18,16 12,20" opacity="0.5"/><polygon points="12,2 2,13 6,16" opacity="0.6"/><polygon points="12,2 22,13 18,16" opacity="0.3"/></svg>; 
const I_Toroide = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 4,6 4,18 12,22 20,18 20,6" opacity="0.4"/><polygon points="12,6 8,8 8,16 12,18 16,16 16,8" fill="#141414"/><polygon points="12,2 4,6 8,8 12,6" opacity="0.9"/><polygon points="12,2 20,6 16,8 12,6" opacity="0.7"/><polygon points="4,6 4,18 8,16 8,8" opacity="0.6"/><polygon points="20,6 20,18 16,16 16,8" opacity="0.4"/><polygon points="4,18 12,22 12,18 8,16" opacity="0.5"/><polygon points="20,18 12,22 12,18 16,16" opacity="0.3"/></svg>; 
const I_Piramide = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 2,16 12,22" opacity="0.8"/><polygon points="12,2 22,16 12,22" opacity="0.4"/></svg>;

const I_LuzDir = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 14,8 20,10 14,12 12,18 10,12 4,10 10,8" opacity="0.9"/><polygon points="12,2 14,8 10,8" opacity="0.6"/><polygon points="18,18 22,22 20,22 16,18" opacity="0.7"/><polygon points="16,18 20,22 18,22 14,18" opacity="0.4"/></svg>;
const I_LuzPuntual = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 12,16 9,9" opacity="0.9"/><polygon points="12,2 18,9 15,9" opacity="0.6"/><polygon points="12,16 15,9 18,9" opacity="0.4"/><polygon points="12,20 14,22 10,22" opacity="0.8"/></svg>;
const I_Skybox = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,8 12,14 2,8" opacity="0.6"/><polygon points="2,8 12,14 12,22 2,16" opacity="0.9"/><polygon points="22,8 12,14 12,22 22,16" opacity="0.4"/><polygon points="12,8 17,11 12,14 7,11" opacity="0.8"/></svg>;
const I_Terreno = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,20 10,8 14,16" opacity="0.9"/><polygon points="10,8 18,12 14,16" opacity="0.6"/><polygon points="14,16 18,12 22,20" opacity="0.8"/></svg>;
const I_Agua = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="2,12 6,8 10,12 14,8 18,12 22,8 22,20 2,20" opacity="0.6"/><polygon points="2,16 6,12 10,16 14,12 18,16 22,12 22,20 2,20" opacity="0.9"/></svg>;
const I_Niebla = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,10 10,6 16,10 20,6 24,10 24,14 20,10 16,14 10,10 4,14" opacity="0.9"/><polygon points="2,16 8,12 14,16 18,12 22,16 22,20 18,16 14,20 8,16 2,20" opacity="0.5"/></svg>;

const I_Boton = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,10 20,6 20,14 4,18" opacity="0.9"/><polygon points="4,10 6,6 22,2 20,6" opacity="0.4"/><polygon points="20,6 22,2 22,10 20,14" opacity="0.6"/></svg>;
const I_Panel = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="2,4 20,2 22,18 4,20" opacity="0.4"/><polygon points="4,6 18,4 18,10 4,12" opacity="0.9"/><polygon points="4,14 18,12 18,16 4,18" opacity="0.6"/></svg>;
const I_Barra = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,14 20,10 20,14 4,18" opacity="0.4"/><polygon points="4,14 14,11.5 14,15.5 4,18" opacity="0.9"/></svg>;
const I_TextoUI = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,6 18,6 18,10 14,10 14,20 10,20 10,10 6,10" opacity="0.9"/><polygon points="6,6 8,4 20,4 18,6" opacity="0.5"/><polygon points="18,6 20,4 20,8 18,10" opacity="0.3"/></svg>;
const I_Inventario = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,6 10,6 10,10 6,10" opacity="0.9"/><polygon points="14,6 18,6 18,10 14,10" opacity="0.6"/><polygon points="6,14 10,14 10,18 6,18" opacity="0.4"/><polygon points="14,14 18,14 18,18 14,18" opacity="0.8"/></svg>;
const I_Minimapa = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 22,12 12,22 2,12" opacity="0.4"/><polygon points="12,6 16,10 12,14 8,10" opacity="0.9"/><polygon points="12,14 14,18 10,18" opacity="0.7"/></svg>;

const IconoCinematica = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="3,6 21,6 21,18 3,18" opacity="0.4"/><polygon points="3,6 7,6 5,10 3,10" opacity="0.9"/><polygon points="10,6 14,6 12,10 8,10" opacity="0.9"/><polygon points="17,6 21,6 19,10 15,10" opacity="0.9"/></svg>;

const IconoRooms = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor">
    <g transform="translate(0, 5)">
      <polygon points="50,10 10,50 50,45" opacity="0.9" />
      <polygon points="50,10 50,45 90,50" opacity="0.7" />
      <polygon points="10,50 40,65 50,45" opacity="0.6" />
      <polygon points="90,50 50,45 60,65" opacity="0.5" />
      <polygon points="10,50 20,90 40,65" opacity="0.6" />
      <polygon points="90,50 60,65 80,90" opacity="0.4" />
      <polygon points="20,90 40,90 40,65" opacity="0.5" />
      <polygon points="80,90 60,65 60,90" opacity="0.3" />
      <polygon points="50,45 40,65 60,65" opacity="0.4" />
      <polygon points="40,65 60,65 50,90" opacity="0.3" />
      <polygon points="40,65 50,90 40,90" opacity="0.2" />
      <polygon points="60,65 60,90 50,90" opacity="0.2" />
    </g>
  </svg>
);
const I_DibujarLibre = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="4,20 8,20 20,8 16,4" opacity="0.9"/><polygon points="16,4 20,8 22,6 18,2" opacity="0.5"/><polygon points="4,20 2,22 8,20" opacity="0.4"/></svg>;

const I_DibujarLineas = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,6 10,6 10,10 6,10" opacity="0.9"/><polygon points="14,14 18,14 18,18 14,18" opacity="0.9"/><polygon points="9,9 15,15" stroke="currentColor" strokeWidth="2" opacity="0.6"/></svg>;

// --- DATA ---
const MENU_ROOMS = [
  { id: 'dibujar_libre', icon: I_DibujarLibre, nombre: 'Dibujar de Manera Libre', color: '#10b981' },
  { id: 'habitacion_cuadrada', icon: I_Cubo, nombre: 'Pintar Cuadrícula (Pisos)', color: '#3b82f6' },
  { id: 'dibujar_lineas', icon: I_DibujarLineas, nombre: 'Dibujar por Líneas/Vértices', color: '#f59e0b' },
  { id: 'muros_auto', icon: I_Panel, nombre: 'Muros Automáticos', color: '#6366f1' },
  { id: 'generar_3d', icon: I_Piramide, nombre: 'Generar 3D', color: '#ec4899' },
];

const MENU_PROYECTO = [
  { id: 'narrativa', icon: I_Narrativa, nombre: 'Narrativa', color: '#a855f7' },
  { id: 'mecanicas', icon: I_Mecanicas, nombre: 'Mecánicas', color: '#f97316' },
  { id: 'dialogos', icon: I_Dialogos, nombre: 'Diálogos', color: '#3b82f6' },
  { id: 'camara', icon: I_Camara, nombre: 'Cámaras', color: '#ef4444' },
  { id: 'imagenes', icon: I_Imagenes, nombre: 'Imágenes', color: '#06b6d4' },
  { id: 'sonido', icon: I_Sonido, nombre: 'Sonido', color: '#84cc16' },
];

const MENU_ACTANTES = [
  { id: 'hombre', icon: I_Hombre, nombre: 'Hombre', color: '#3b82f6' },
  { id: 'mujer', icon: I_Mujer, nombre: 'Mujer', color: '#ec4899' },
  { id: 'robot', icon: I_Robot, nombre: 'Robot', color: '#94a3b8' },
  { id: 'monstruo', icon: I_Monstruo, nombre: 'Monstruo', color: '#22c55e' },
  { id: 'perro', icon: I_Perro, nombre: 'Perro', color: '#eab308' },
  { id: 'gato', icon: I_Gato, nombre: 'Gato', color: '#8b5cf6' },
  { id: 'pajaro', icon: I_Pajaro, nombre: 'Pájaro', color: '#38bdf8' },
];

const MENU_PROPS = [
  { id: 'cubo', icon: I_Cubo, nombre: 'Cubo', color: '#3b82f6' },
  { id: 'esfera', icon: I_Esfera, nombre: 'Esfera', color: '#ef4444' },
  { id: 'cilindro', icon: I_Cilindro, nombre: 'Cilindro', color: '#10b981' },
  { id: 'cono', icon: I_Cono, nombre: 'Cono', color: '#f59e0b' },
  { id: 'toroide', icon: I_Toroide, nombre: 'Toroide', color: '#d946ef' },
  { id: 'piramide', icon: I_Piramide, nombre: 'Pirámide', color: '#eab308' },
];

const MENU_ENTORNO = [
  { id: 'luz_dir', icon: I_LuzDir, nombre: 'Luz Direccional', color: '#fde047' },
  { id: 'luz_puntual', icon: I_LuzPuntual, nombre: 'Luz Puntual', color: '#fb923c' },
  { id: 'skybox', icon: I_Skybox, nombre: 'Skybox / Cielo', color: '#7dd3fc' },
  { id: 'terreno', icon: I_Terreno, nombre: 'Terreno', color: '#4ade80' },
  { id: 'agua', icon: I_Agua, nombre: 'Océano / Agua', color: '#0ea5e9' },
  { id: 'niebla', icon: I_Niebla, nombre: 'Niebla Volumétrica', color: '#cbd5e1' },
];

const MENU_INTERFAZ = [
  { id: 'boton', icon: I_Boton, nombre: 'Botón', color: '#3b82f6' },
  { id: 'panel', icon: I_Panel, nombre: 'Panel / Ventana', color: '#64748b' },
  { id: 'barra', icon: I_Barra, nombre: 'Barra de Progreso', color: '#10b981' },
  { id: 'texto', icon: I_TextoUI, nombre: 'Texto / Etiqueta', color: '#f8fafc' },
  { id: 'inventario', icon: I_Inventario, nombre: 'Inventario', color: '#d97706' },
  { id: 'minimapa', icon: I_Minimapa, nombre: 'Minimapa', color: '#84cc16' },
];

const MENU_CINEMATICA = [
  { id: 'cinematica_add_cam', icon: I_Camara, nombre: 'Añadir Cámara', color: '#3b82f6' },
  { id: 'cinematica_ruta', icon: I_Barra, nombre: 'Ruta de Cámara', color: '#10b981' },
];

const SUBMENU_MAP: Record<string, any[]> = {
  rooms: MENU_ROOMS,
  proyecto: MENU_PROYECTO,
  actantes: MENU_ACTANTES,
  props: MENU_PROPS,
  entorno: MENU_ENTORNO,
  interfaz: MENU_INTERFAZ,
  cinematica: MENU_CINEMATICA
};

const HERRAMIENTAS_PRINCIPALES = [
  { id: 'rooms', icon: IconoRooms, nombre: 'Arquitectura (Rooms)', from: '#10b981', to: '#059669', colorHover: '#34d399' },
  { id: 'proyecto', icon: IconoLibro, nombre: 'Sistemas del Proyecto', from: '#c084fc', to: '#9333ea', colorHover: '#a855f7' },
  { id: 'actantes', icon: IconoActante, nombre: 'Actantes y Personajes', from: '#34d399', to: '#059669', colorHover: '#10b981' },
  { id: 'props', icon: IconoProp, nombre: 'Primitivas 3D', from: '#fbbf24', to: '#d97706', colorHover: '#f59e0b' },
  { id: 'entorno', icon: IconoEntorno, nombre: 'Iluminación y Entorno', from: '#38bdf8', to: '#0284c7', colorHover: '#0ea5e9' },
  { id: 'interfaz', icon: IconoInterfaz, nombre: 'Interfaz de Usuario (UI)', from: '#f43f5e', to: '#e11d48', colorHover: '#f43f5e' },
  { id: 'cinematica', icon: IconoCinematica, nombre: 'Cinemática y Cámaras', from: '#14b8a6', to: '#0f766e', colorHover: '#2dd4bf' },
  { id: 'agente', icon: I_AgenteIA, nombre: 'Modo Agente / IA', from: '#c4ff00', to: '#8ab300', colorHover: '#c4ff00' },
];

interface LowPolyToolbarProps {
  onToggleAI?: () => void;
}

export const LowPolyToolbar = memo(({ onToggleAI }: LowPolyToolbarProps) => {
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);

  const handleToolClick = useCallback((id: string) => {
    if (id === 'agente') {
      if (onToggleAI) onToggleAI();
      return;
    }
    setMenuAbierto(prevMenu => prevMenu === id ? null : id);
    if (id === 'props') NodiaBridge.exportToEngine('unreal');
  }, [onToggleAI]);

  const handleSubMenuAction = useCallback((id: string, color?: string) => {
    console.log(`[Toolbar] Accion de agregar ejecutada: ${id}`);
    
    if (color) {
      useAppStore.getState().setActiveTool(id, color);
    }

    // Mapear IDs a modos de dibujo de RoomStore
    if (id === 'dibujar_libre') {
      useRoomStore.getState().setMode('free');
      useAppStore.getState().setViewMode('top_2d');
    } else if (id === 'habitacion_cuadrada' || id === 'muros_auto') {
      useRoomStore.getState().setMode('square');
    } else if (id === 'dibujar_lineas') {
      useRoomStore.getState().setMode('assisted');
    }

    setMenuAbierto(null);
  }, []);

  const activeIndex = HERRAMIENTAS_PRINCIPALES.findIndex(h => h.id === menuAbierto);
  const activeTool = activeIndex !== -1 ? HERRAMIENTAS_PRINCIPALES[activeIndex] : HERRAMIENTAS_PRINCIPALES[0];
  
  const salto = 56; // 44 button + 12 gap
  // Fix the index to 0 when menu is closed so we don't get NaN
  const safeIndex = activeIndex !== -1 ? activeIndex : 0;
  const translacionLuzX = (safeIndex * salto) - 18;
  const translacionCajaX = safeIndex * salto;

  const opcionesMenu = SUBMENU_MAP[menuAbierto || ''] || [];

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
      
      {/* SUBMENÚ FLOTANTE */}
      <div 
        className={cn(
 "absolute bottom-[calc(100%+16px)] p-2 rounded-[24px] glass-surface pointer-events-auto transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom z-40",
          menuAbierto ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'
        )}
        style={{
          backgroundImage: menuAbierto ? `radial-gradient(150% 100% at 50% 100%, ${activeTool.from}2A 0%, transparent 100%)` : 'none'
        }}
      >
        <div key={menuAbierto} className="flex flex-row gap-2 animate-swap">
          {opcionesMenu.map((opcion) => (
            <InteractiveIconButton 
              key={opcion.id}
              id={opcion.id}
              icon={opcion.icon}
              nombre={opcion.nombre}
              color={opcion.color}
              onClick={handleSubMenuAction}
              isActive={false}
              mostrarTooltip={!!menuAbierto}
              sizeClass="w-[44px] h-[44px] rounded-[12px]"
              draggable={true}
              onDragStart={(e: React.DragEvent<HTMLDivElement>, id: string) => {
                e.dataTransfer.setData('application/nodia-node', JSON.stringify({ category: menuAbierto, id: id, name: opcion.nombre }));
              }}
            />
          ))}
        </div>
      </div>

      {/* BARRA PRINCIPAL */}
      <div className="relative z-50 flex items-center px-[12px] py-[8px] gap-[12px] rounded-[24px] glass-surface pointer-events-auto">
        
        <div
          className={`absolute top-[8px] w-[44px] h-[44px] rounded-[12px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none z-10 ${menuAbierto ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          style={{
            left: '12px',
            transform: `translateX(${translacionCajaX}px)`,
            backgroundColor: 'rgba(255, 255, 255, 0.05)', 
            boxShadow: `0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.12), inset 0 0 0 1px rgba(255,255,255,0.02)`
          }}
        ></div>

        <div className="relative z-20 flex items-center gap-[12px]">
          {HERRAMIENTAS_PRINCIPALES.map((herramienta) => (
            <InteractiveIconButton 
              key={herramienta.id}
              id={herramienta.id}
              icon={herramienta.icon}
              nombre={herramienta.nombre}
              color={herramienta.colorHover} 
              onClick={handleToolClick}
              isActive={menuAbierto === herramienta.id}
              mostrarTooltip={true}
              sizeClass="w-[44px] h-[44px] rounded-[12px]"
            />
          ))}
        </div>

      </div>
    </div>
  );
});
LowPolyToolbar.displayName = 'LowPolyToolbar';
