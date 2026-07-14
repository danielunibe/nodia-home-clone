import { create } from 'zustand';

export type ViewMode = 'canvas' | '2d' | '3d' | 'top_2d' | 'orto';
export type GridType = 'grid' | 'dots' | 'thick_dots' | 'none';
export type WorkspaceMode = 'dev' | 'poe' | 'nodos' | 'arco' | 'desarrollo' | 'home';

export interface GridConfig {
    gap: number;
    hue: number;
    opacity: number;
}

interface AppState {
    workspaceMode: WorkspaceMode;
    activeToolId: string;
    activeColor: string;
    viewMode: ViewMode;
    gridType: GridType;
    showOutlineOnly: boolean;
    gridConfig: GridConfig;
    setWorkspaceMode: (mode: WorkspaceMode) => void;
    setActiveTool: (id: string, color: string) => void;
    setViewMode: (mode: ViewMode) => void;
    setGridType: (type: GridType) => void;
    setShowOutlineOnly: (show: boolean) => void;
    setGridConfig: (config: Partial<GridConfig>) => void;
}

export const useAppStore = create<AppState>((set) => ({
    workspaceMode: 'home',
    activeToolId: 'pointer',
    activeColor: 'var(--lime)',
    viewMode: '2d',
    gridType: 'dots',
    showOutlineOnly: false,
    gridConfig: { gap: 12, hue: 220, opacity: 0.10 },
    setWorkspaceMode: (mode) => set({ workspaceMode: mode }),
    setActiveTool: (id, color) => set({ activeToolId: id, activeColor: color }),
    setViewMode: (mode) => set({ viewMode: mode }),
    setGridType: (type) => set({ gridType: type }),
    setShowOutlineOnly: (show) => set({ showOutlineOnly: show }),
    setGridConfig: (config) => set((state) => ({ gridConfig: { ...state.gridConfig, ...config } }))
}));
