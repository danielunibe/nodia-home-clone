import { create } from 'zustand';
import { useNodeStore } from './useNodeStore';
import { useAppStore } from './useAppStore';

export type DrawingMode = 'none' | 'free' | 'square' | 'assisted';
export type UnitSystem = 'metric' | 'imperial';

interface Point {
    x: number;
    y: number;
}

interface RoomState {
    isDrawing: boolean;
    mode: DrawingMode;
    points: Point[];
    currentPoint: Point | null;
    unitSystem: UnitSystem;
    gridSize: number;
    showGrid: boolean;
    isDefiningHeight: boolean;
    roomHeight: number;
    
    // Actions
    setMode: (mode: DrawingMode) => void;
    addPoint: (p: Point) => void;
    updateCurrentPoint: (p: Point | null) => void;
    resetDrawing: () => void;
    toggleUnitSystem: () => void;
    startDefiningHeight: () => void;
    setRoomHeight: (height: number) => void;
    confirmRoom: () => void;
}

export const useRoomStore = create<RoomState>((set, get) => ({
    isDrawing: false,
    mode: 'none',
    points: [],
    currentPoint: null,
    unitSystem: 'metric',
    gridSize: 40,
    showGrid: false,
    isDefiningHeight: false,
    roomHeight: 120, // default height ~ 3 units

    setMode: (mode) => set({ 
        mode, 
        isDrawing: mode !== 'none', 
        showGrid: mode !== 'none',
        points: [],
        currentPoint: null,
        isDefiningHeight: false,
        roomHeight: 120 
    }),

    addPoint: (p) => set((state) => ({ 
        points: [...state.points, p] 
    })),

    updateCurrentPoint: (p) => set({ currentPoint: p }),

    resetDrawing: () => set({ points: [], currentPoint: null, isDefiningHeight: false, roomHeight: 120 }),

    toggleUnitSystem: () => set((state) => ({ 
        unitSystem: state.unitSystem === 'metric' ? 'imperial' : 'metric' 
    })),

    startDefiningHeight: () => {
        set({ isDefiningHeight: true });
        useAppStore.getState().setViewMode('3d');
    },

    setRoomHeight: (height: number) => set({ roomHeight: Math.max(0, height) }),

    confirmRoom: () => {
        const { points, unitSystem, roomHeight } = get();
        if (points.length < 3) {
            set({ mode: 'none', isDrawing: false, showGrid: false, points: [], currentPoint: null });
            return;
        }

        // Calcular area de poligono Irregular (Shoelace formula)
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            area += points[i].x * points[j].y;
            area -= points[j].x * points[i].y;
        }
        area = Math.abs(area) / 2;
        
        // Asumiendo 40px por unidad base, calcular m2 o ft2
        const scale = unitSystem === 'metric' ? 1/40 : 3.28/40;
        const finalArea = (area * scale * scale).toFixed(2);
        const areaLabel = `${finalArea} ${unitSystem === 'metric' ? 'm²' : 'ft²'}`;

        // Bounding box para determinar position (centro)
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        points.forEach(p => {
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        });
        const centerX = minX + (maxX - minX) / 2;
        const centerY = minY + (maxY - minY) / 2;

        const roomNodeData = {
            id: `room_${Date.now()}`,
            type: 'metadata',
            label: 'Nueva Habitación',
            position: { x: centerX, y: centerY },
            content: {
                title: 'Habitación',
                content: `Área: ${areaLabel}\nAltura: ${(roomHeight * scale).toFixed(2)}${unitSystem === 'metric' ? 'm' : 'ft'}`,
            },
            layer: 'espacialidad',
            // Agregamos puntos y altura al content extra para renderizado en NodeRenderer o vista futura
            polygon: points,
            roomHeight: roomHeight
        };

        useNodeStore.getState().addNode(roomNodeData as any);

        set({ mode: 'none', isDrawing: false, showGrid: false, points: [], currentPoint: null, isDefiningHeight: false });
        useAppStore.getState().setActiveTool('pointer', 'var(--text)');
    }
}));
