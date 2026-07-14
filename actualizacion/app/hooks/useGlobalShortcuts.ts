import { useEffect } from 'react';
import { useAppStore } from '@/app/store/useAppStore';
import { useRoomStore } from '@/app/store/useRoomStore';

export const useGlobalShortcuts = (setSpacePressed: (pressed: boolean) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') setSpacePressed(true);
      if (e.code === 'Enter') {
          const roomState = useRoomStore.getState();
          if (roomState.isDefiningHeight) {
              roomState.confirmRoom();
          }
      }

      if (!document.querySelector('input:focus, textarea:focus')) {
        const { setViewMode, setActiveTool } = useAppStore.getState();
        if (e.key === '1') setViewMode('canvas');
        if (e.key === '2') setViewMode('2d');
        if (e.key === '3') setViewMode('3d');
        if (e.key === '4') setViewMode('top_2d');
        if (e.key === '5') setViewMode('orto');

        // Tool Shortcuts
        const keyMap = e.key.toLowerCase();
        if (keyMap === 'v') setActiveTool('pointer', 'var(--text)');
        if (keyMap === 'm') setActiveTool('move', 'var(--lime)');
        if (keyMap === 's') setActiveTool('scale', 'var(--cyan)');
        if (keyMap === 'r') setActiveTool('rotate', 'var(--orange)');
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') setSpacePressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setSpacePressed]);
};
