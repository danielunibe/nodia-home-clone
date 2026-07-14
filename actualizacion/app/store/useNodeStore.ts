import { create } from 'zustand';
import { NodiaNode, Connection } from '@/lib/types';
import { NodiaBridge } from '@/services/Bridge';

// Estado ultra-eficiente para el manejo del grafo de nodos.
// Optimizamos usando un Map (convertido a objeto para Zustand) o estructuras planas
// para reducir los tiempos de búsqueda y mutación (O(1) updates).

interface NodeState {
    nodes: Record<string, NodiaNode>;
    connections: Connection[];
    selectedNodeIds: Set<string>;
    isLoading: boolean;
}

interface NodeActions {
    setNodes: (nodesArray: NodiaNode[]) => void;
    setConnections: (connections: Connection[]) => void;
    addConnection: (connection: Connection) => void;
    removeConnection: (id: string) => void;
    updateNodePosition: (id: string, dx: number, dy: number) => void;
    addNode: (node: NodiaNode) => void;
    removeNode: (id: string) => void;
    selectNode: (id: string, append?: boolean) => void;
    deselectAll: () => void;
    loadNodesFromBridge: () => Promise<void>;
}

type NodeStore = NodeState & NodeActions;

export const useNodeStore = create<NodeStore>((set, get) => ({
    nodes: {},
    connections: [],
    selectedNodeIds: new Set(),
    isLoading: false,

    setNodes: (nodesArray) => {
        const nodesRecord: Record<string, NodiaNode> = {};
        for (const node of nodesArray) {
            nodesRecord[node.id] = node;
        }
        set({ nodes: nodesRecord });
    },

    setConnections: (connections) => set({ connections }),

    addConnection: (connection) => set((state) => ({ connections: [...state.connections, connection] })),

    removeConnection: (id) => set((state) => ({ connections: state.connections.filter(c => c.id !== id) })),

    updateNodePosition: (id, dx, dy) => {
        set((state) => {
            const node = state.nodes[id];
            if (!node) return state;

            // Creamos una nueva instancia del nodo mutable para evitar side-effects
            const updatedNode = {
                ...node,
                position: {
                    x: node.position.x + dx,
                    y: node.position.y + dy
                }
            };

            const newNodes = { ...state.nodes, [id]: updatedNode };
            
            // Sync asíncrono y debounced con el motor (Tauri IPC Bridge)
            // Se asume que saveGraph puede ser optimizado o llamado vía un debounce en la capa de red
            NodiaBridge.saveGraph(Object.values(newNodes));

            return { nodes: newNodes };
        });
    },

    addNode: (node) => {
        set((state) => {
            const newNodes = { ...state.nodes, [node.id]: node };
            NodiaBridge.saveGraph(Object.values(newNodes));
            return { nodes: newNodes };
        });
    },

    removeNode: (id) => {
        set((state) => {
            const newNodes = { ...state.nodes };
            delete newNodes[id];
            NodiaBridge.saveGraph(Object.values(newNodes));
            return { nodes: newNodes };
        });
    },

    selectNode: (id, append = false) => {
        set((state) => {
            const newSelection = new Set(append ? state.selectedNodeIds : []);
            newSelection.add(id);
            return { selectedNodeIds: newSelection };
        });
    },

    deselectAll: () => set({ selectedNodeIds: new Set() }),

    loadNodesFromBridge: async () => {
        set({ isLoading: true });
        try {
            const bridgeNodes = await NodiaBridge.getNodes();
            get().setNodes(bridgeNodes);
        } catch (error) {
            console.error("[NodeStore] Error loading nodes from bridge:", error);
        } finally {
            set({ isLoading: false });
        }
    }
}));
