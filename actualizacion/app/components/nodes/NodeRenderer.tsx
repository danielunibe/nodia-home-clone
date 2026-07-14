'use client';

import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useNodeStore } from '@/app/store/useNodeStore';
import { useAppStore } from '@/app/store/useAppStore';
import { GraphNode } from './GraphNode';
import { DraggableNode } from './DraggableNode';
import { PanInfo } from 'motion/react';

export const NodeRenderer = () => {
    const { nodes, loadNodesFromBridge, updateNodePosition } = useNodeStore();
    const { showOutlineOnly, viewMode, activeColor } = useAppStore();

    useEffect(() => {
        loadNodesFromBridge();
    }, [loadNodesFromBridge]);

    const handleNodeDragEnd = (id: string, info: PanInfo) => {
        updateNodePosition(id, info.offset.x, info.offset.y);
    };

    const nodesArray = Object.values(nodes);
    const { connections } = useNodeStore();
    const roomNodes = useMemo(() => nodesArray.filter(n => n.polygon), [nodesArray]);

    if (nodesArray.length === 0) return null;

    return (
        <>
            {/* Conecciones (Líneas) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
                <g>
                    {connections && connections.map(conn => {
                        const fromNode = nodes[conn.fromNodeId];
                        const toNode = nodes[conn.toNodeId];
                        if (!fromNode || !toNode) return null;
                        return (
                            <line 
                                key={conn.id}
                                x1={fromNode.position.x + 160} 
                                y1={fromNode.position.y + 75}
                                x2={toNode.position.x + 160} 
                                y2={toNode.position.y + 75}
                                stroke={activeColor}
                                strokeWidth={2}
                                strokeDasharray="4 4"
                                opacity={0.6}
                            />
                        );
                    })}
                </g>
            </svg>

            {roomNodes.length > 0 && (
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
                    {roomNodes.map(room => {
                        const polygon = room.polygon as {x: number, y: number}[];
                        const height = (room.roomHeight as number) || 0;
                        const isOutline = showOutlineOnly;

                        return (
                            <div key={`room-drawing-${room.id}`} className="absolute inset-0 w-full h-full overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
                                {/* Suelo (Floor) */}
                                <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'translateZ(0px)' }}>
                                    <polygon 
                                        points={polygon.map(p => `${p.x},${p.y}`).join(' ')}
                                        fill={isOutline ? 'none' : `${activeColor}11`}
                                        stroke={isOutline ? '#555' : `${activeColor}44`}
                                        strokeWidth={isOutline ? 2 : 1}
                                        strokeDasharray={isOutline ? "4 4" : "none"}
                                    />
                                </svg>
                                
                                {/* Muros y Extrusión en 3D Real */}
                                {height > 0 && viewMode !== 'canvas' && viewMode !== '2d' && (
                                    <>
                                        {/* Muros HTML */}
                                        {polygon.map((p, i) => {
                                            const nextP = polygon[(i + 1) % polygon.length];
                                            const dx = nextP.x - p.x;
                                            const dy = nextP.y - p.y;
                                            const length = Math.hypot(dx, dy);
                                            const angle = Math.atan2(dy, dx);
                                            
                                            // El color lo adaptamos ligeramente usando boxShadow o borades para el outline
                                            return (
                                                <div 
                                                    key={`wall-${i}`}
                                                    className="absolute  border-r"
                                                    style={{
                                                        left: p.x,
                                                        top: p.y,
                                                        width: length,
                                                        height: height,
                                                        transformOrigin: '0 0',
                                                        transform: `rotateZ(${angle}rad) rotateX(-90deg)`,
                                                        backgroundColor: isOutline ? 'transparent' : `${activeColor}11`,
                                                        borderColor: isOutline ? 'transparent' : `${activeColor}44`,
                                                        borderWidth: isOutline ? '0px' : '1px',
                                                        backfaceVisibility: 'hidden',
                                                    }}
                                                >
                                                    {isOutline && (
                                                        <div className="w-full h-full border-dashed" style={{ borderColor: `${activeColor}88`, borderWidth: '1px' }} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                        
                                        {/* Tapa / Techo elevado en 3D Real */}
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: `translateZ(${height}px)` }}>
                                            <polygon 
                                                points={polygon.map(p => `${p.x},${p.y}`).join(' ')}
                                                fill={isOutline ? 'none' : `${activeColor}22`}
                                                stroke={activeColor}
                                                strokeWidth={2}
                                            />
                                        </svg>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            <DraggableNode 
                className="w-[210px] h-[260px]" 
                initialTop="120px" 
                initialLeft="100px"
            >
                <div className="absolute -top-[8px] -left-[8px] z-[3] w-[28px] h-[28px] rounded-full bg-[#0f1317] border-2 border-[#1a1f24] grid place-items-center shadow-md after:content-[''] after:w-[18px] after:h-[18px] after:rounded-full after:bg-[linear-gradient(135deg,#ff9a8b,#ff6a88)]" />
                <div className="relative w-[200px] h-[300px]">
                    <Image 
                        className="absolute w-[190px] h-[240px] top-[8px] left-0 -rotate-[4deg] brightness-90 object-cover rounded-[20px]  shadow-md" 
                        src="https://picsum.photos/seed/n1/200/300" 
                        alt="bg" 
                        fill
                        referrerPolicy="no-referrer"
                    />
                    <Image 
                        className="absolute w-[190px] h-[240px] top-0 left-[14px] rotate-[8deg] object-cover rounded-[20px]  shadow-md" 
                        src="https://picsum.photos/seed/n2/200/300" 
                        alt="fg" 
                        fill
                        referrerPolicy="no-referrer"
                    />
                </div>
            </DraggableNode>

            {nodesArray.map(node => (
                <GraphNode key={node.id} node={node} onDragEnd={handleNodeDragEnd} />
            ))}
        </>
    );
};