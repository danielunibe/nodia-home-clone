'use client';

import React, { useMemo } from 'react';
import { useRoomStore } from '@/app/store/useRoomStore';
import { useAppStore } from '@/app/store/useAppStore';

interface DrawingOverlayProps {
    zoom: number;
}

export const DrawingOverlay = ({ zoom }: DrawingOverlayProps) => {
    const { isDrawing, points, currentPoint, unitSystem, isDefiningHeight, roomHeight } = useRoomStore();
    const activeColor = useAppStore(state => state.activeColor);

    const activeLength = useMemo(() => {
        if (points.length === 0 || !currentPoint) return null;
        const last = points[points.length - 1];
        const dist = Math.sqrt(Math.pow(currentPoint.x - last.x, 2) + Math.pow(currentPoint.y - last.y, 2));
        const scale = unitSystem === 'metric' ? 1/40 : 3.28/40; // 40px por unidad
        return (dist * scale).toFixed(2) + (unitSystem === 'metric' ? 'm' : 'ft');
    }, [points, currentPoint, unitSystem]);

    if (!isDrawing) return null;

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20" style={{ transformStyle: 'preserve-3d' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <g>
                    {/* Relleno del Polígono Preview / Suelo */}
                    {(points.length > 2) && (
                        <polygon 
                            points={points.map(p => `${p.x},${p.y}`).join(' ')}
                            fill={`${activeColor}22`}
                            stroke={`${activeColor}44`}
                            strokeWidth={1/zoom}
                            className="transition-colors duration-500"
                        />
                    )}

                    {/* Preview current shape */}
                    {!isDefiningHeight && points.length > 0 && (
                         <path 
                             d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')} ${currentPoint ? `L ${currentPoint.x},${currentPoint.y}` : ''}`}
                             fill="none"
                             stroke={activeColor}
                             strokeWidth={2/zoom}
                             style={{ strokeDasharray: '8 4' }}
                             className="animate-flow-line transition-colors duration-500"
                             strokeLinecap="round"
                             strokeLinejoin="round"
                         />
                    )}
                    
                    {/* Dots for vertices */}
                    {!isDefiningHeight && points.map((p, i) => (
                        <circle 
                            key={i} 
                            cx={p.x} cy={p.y} 
                            r={4/zoom} 
                            fill={activeColor}
                            className="transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-150"
                        />
                    ))}

                    {/* Length Label Bubble */}
                    {currentPoint && points.length > 0 && !isDefiningHeight && (
                        <g transform={`translate(${currentPoint.x}, ${currentPoint.y})`}>
                            <rect 
                                x={14/zoom} 
                                y={-32/zoom} 
                                width={64/zoom} 
                                height={24/zoom} 
                                rx={8/zoom} 
                                fill={activeColor}
                                style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))' }}
                                className="transition-colors duration-500"
                            />
                            <text 
                                x={46/zoom} 
                                y={-15/zoom} 
                                fontSize={11/zoom} 
                                fill="#000" 
                                textAnchor="middle" 
                                fontWeight="900"
                                style={{ fontFamily: 'monospace' }}
                            >
                                {activeLength}
                            </text>
                        </g>
                    )}
                </g>
            </svg>

            {/* Altura / Extrusión 3D Preview (Muros Reales 3D) */}
            {isDefiningHeight && points.length > 2 && (
                <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
                    {points.map((p, i) => {
                        const nextP = points[(i + 1) % points.length];
                        const dx = nextP.x - p.x;
                        const dy = nextP.y - p.y;
                        const length = Math.hypot(dx, dy);
                        const angle = Math.atan2(dy, dx);
                        
                        return (
                            <div 
                                key={`wall-drawing-${i}`}
                                className="absolute border-r border-t"
                                style={{
                                    left: p.x,
                                    top: p.y,
                                    width: length,
                                    height: roomHeight,
                                    transformOrigin: '0 0',
                                    transform: `rotateZ(${angle}rad) rotateX(-90deg)`,
                                    backgroundColor: `transparent`,
                                    borderColor: activeColor,
                                    borderWidth: `${2/zoom}px`,
                                    borderStyle: 'dashed',
                                    opacity: 0.6,
                                    backfaceVisibility: 'visible',
                                }}
                            />
                        );
                    })}

                    {/* Tapa / Techo */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: `translateZ(${roomHeight}px)` }}>
                        <polygon 
                            points={points.map(p => `${p.x},${p.y}`).join(' ')}
                            fill="transparent"
                            stroke={activeColor}
                            strokeWidth={2/zoom}
                            strokeDasharray="4 4"
                        />
                        
                        {/* Etiqueta de Altura */}
                        <g transform={`translate(${points[0].x}, ${points[0].y})`}>
                            <rect 
                                x={10/zoom} 
                                y={-12/zoom} 
                                width={50/zoom} 
                                height={24/zoom} 
                                rx={4/zoom} 
                                fill={activeColor}
                            />
                            <text 
                                x={35/zoom} 
                                y={4/zoom} 
                                fontSize={11/zoom} 
                                fill="#000" 
                                textAnchor="middle" 
                                fontWeight="bold"
                            >
                                {((roomHeight) * (unitSystem === 'metric' ? 1/40 : 3.28/40)).toFixed(2)}{unitSystem === 'metric' ? 'm' : 'ft'}
                            </text>
                        </g>

                        {/* Hint de Confirmacion */}
                        <g transform={`translate(${points[0].x}, ${points[0].y})`}>
                            <text 
                                x={0} 
                                y={30/zoom} 
                                fontSize={14/zoom} 
                                fill={activeColor} 
                                textAnchor="middle" 
                                fontWeight="bold"
                                className="animate-pulse"
                                style={{ pointerEvents: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}
                            >
                                Presiona Enter para confirmar
                            </text>
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
};
