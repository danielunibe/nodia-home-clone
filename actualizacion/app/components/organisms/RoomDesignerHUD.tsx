'use client';

import React, { useMemo } from 'react';
import { useRoomStore } from '../../store/useRoomStore';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Ruler, Maximize2, Trash2, RotateCcw } from 'lucide-react';

export const RoomDesignerHUD = () => {
    const { 
        isDrawing, 
        points, 
        unitSystem, 
        toggleUnitSystem, 
        confirmRoom, 
        resetDrawing, 
        setMode 
    } = useRoomStore();

    // Cálculos de métricas
    const metrics = useMemo(() => {
        if (points.length < 2) return { perimeter: 0, area: 0 };
        
        let perimeter = 0;
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            // Si el dibujo no está cerrado, el último segmento no cuenta a menos que queramos previsualizarlo
            if (i === points.length - 1 && points.length > 2) {
                // No sumamos el cierre si estamos dibujando activamente líneas abiertas
            } else if (i < points.length - 1) {
                perimeter += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            }
        }

        // Área usando la fórmula de la lazada (Shoelace formula)
        let area = 0;
        if (points.length >= 3) {
            for (let i = 0; i < points.length; i++) {
                const p1 = points[i];
                const p2 = points[(i + 1) % points.length];
                area += (p1.x * p2.y) - (p2.x * p1.y);
            }
            area = Math.abs(area) / 2;
        }

        // Convertir píxeles a unidades reales (ej: 40px = 1 unidad de medida)
        // Escalado: 40px = 1 metro o 3.28 pies
        const scale = unitSystem === 'metric' ? 1/40 : 3.28/40;
        return {
            perimeter: perimeter * scale,
            area: area * Math.pow(scale, 2)
        };
    }, [points, unitSystem]);

    if (!isDrawing) return null;

    return (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-4 pointer-events-none">
            {/* Panel de Métricas */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="animate-slide-in-hud flex items-center gap-6 px-6 py-4 rounded-2xl bg-[#14181c] shadow-md pointer-events-auto"
            >
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-white/30">ÁREA TOTAL</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-mono font-bold text-[var(--lime)]">{metrics.area.toFixed(2)}</span>
                        <span className="text-xs text-white/50">{unitSystem === 'metric' ? 'm²' : 'ft²'}</span>
                    </div>
                </div>

                <div className="w-[8px]" />

                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-black text-white/30">PERÍMETRO</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-mono font-bold text-white/90">{metrics.perimeter.toFixed(2)}</span>
                        <span className="text-xs text-white/50">{unitSystem === 'metric' ? 'm' : 'ft'}</span>
                    </div>
                </div>

                <div className="w-[8px]" />

                {/* Unidad de Medida */}
                <button 
                    onClick={toggleUnitSystem}
                    className="flex flex-col items-center gap-1 hover:text-[var(--lime)] transition-colors group"
                >
                    <span className="text-[10px] uppercase tracking-widest font-black text-white/30 group-hover:text-[var(--lime)]/50">SISTEMA</span>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                        <Ruler size={14} className="text-white/40" />
                        <span className="text-xs font-bold uppercase">{unitSystem}</span>
                    </div>
                </button>
            </motion.div>

            {/* Controles de Acción */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-2 rounded-2xl bg-[#14181c] pointer-events-auto shadow-md"
            >
                <button 
                    onClick={resetDrawing}
                    className="w-[44px] h-[44px] flex items-center justify-center rounded-[12px] hover:bg-white/[0.04] text-[#888888] hover:text-[#eeeeee] transition-all duration-300 transform hover:scale-105 active:scale-95"
                    title="Resetear dibujo"
                >
                    <RotateCcw size={18} />
                </button>
                <button 
                    onClick={() => setMode('none')}
                    className="w-[44px] h-[44px] flex items-center justify-center rounded-[12px] hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    title="Cancelar"
                >
                    <X size={18} />
                </button>
                <div className="w-1.5" />
                <button 
                    onClick={confirmRoom}
                    disabled={points.length < 3}
                    className={`px-6 h-[44px] flex items-center gap-2 rounded-[12px] transition-all duration-300 transform active:scale-95 ${points.length >= 3 ? 'bg-[var(--lime)] text-black font-bold shadow-md hover:scale-105 hover:bg-[#d4ff33]' : 'bg-white/5 text-white/20 grayscale pointer-events-none'}`}
                >
                    <Check size={18} strokeWidth={3} />
                    <span className="text-[11px] uppercase truncate">CONFIRMAR</span>
                </button>
            </motion.div>
        </div>
    );
};
