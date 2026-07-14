import React from 'react';
import { NodiaNode } from '@/lib/types';
import { DraggableNode } from './DraggableNode';
import { PanInfo } from 'motion/react';
import { useNodeStore } from '@/app/store/useNodeStore';

interface GraphNodeProps {
    node: NodiaNode;
    onDragEnd: (id: string, info: PanInfo) => void;
}

export const GraphNode = ({ node, onDragEnd }: GraphNodeProps) => {
    const removeNode = useNodeStore(state => state.removeNode);

    return (
        <DraggableNode 
            className={node.type === 'metadata' 
                ? 'w-[320px] bg-[#1a1f24] rounded-[20px] p-[18px_18px_14px] shadow-md' 
                : 'w-[360px] bg-[#14181c] rounded-[24px] p-[18px] shadow-md relative'
            }
            initialTop={`${node.position.y}px`}
            initialLeft={`${node.position.x}px`}
            onDragEnd={(_, info) => onDragEnd(node.id, info)}
        >
            <button 
                onClick={(e) => { e.stopPropagation(); removeNode?.(node.id); }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-500 flex items-center justify-center transition-colors z-50"
            >
                ×
            </button>
            {node.type === 'metadata' ? (
                <>
                    <h3 className="text-[10.5px] font-semibold tracking-[1px] text-[#7c828c] mb-[12px]">{node.label}</h3>
                    <p className="font-mono text-[11px] text-[#c4ff00] mb-[8px]">ID: {node.id}</p>
                    {node.content.path ? (
                        <p className="text-[12.8px] leading-[1.55] text-[#c2c6ce] mb-[14px]">Path: {node.content.path as string}<br/>Coord: {node.content.coord as string}</p>
                    ) : (
                        <p className="text-[12.8px] leading-[1.55] text-[#c2c6ce] mb-[14px]">{node.content.content || node.content.title || 'Nodo'}</p>
                    )}
                </>
            ) : node.type === 'dialog' ? (
                <>
                    <div className="font-mono text-[12.6px] leading-[1.5] text-[#d0d4db] mb-[12px] max-h-[78px] overflow-hidden line-clamp-4">
                        <span className="text-[var(--lime)]">[{node.content.speaker1 as string}]</span>: &quot;{node.content.text1 as string}&quot;<br/><br/>
                        <span className="text-[#8a8f98]">[{node.content.speaker2 as string}]</span>: &quot;{node.content.text2 as string}&quot;
                    </div>
                </>
            ) : (
                <div>Tipo de nodo no soportado</div>
            )}
        </DraggableNode>
    );
};
