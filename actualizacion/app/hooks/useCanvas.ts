import { useState, useCallback } from 'react';

export const useCanvas = (initialZoom = 1, initialPan = { x: 0, y: 0 }) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [pan, setPan] = useState(initialPan);
    const [isDragging, setIsDragging] = useState(false);

    const MIN_ZOOM = 0.15;
    const MAX_ZOOM = 3.0;

    const handleWheel = useCallback((e: React.WheelEvent, container: HTMLDivElement | null) => {
        if (!container) return;
        const zoomSensitivity = 0.002;
        const delta = -e.deltaY * zoomSensitivity;
        let newZoom = zoom * (1 + delta);
        newZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
        
        const rect = container.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;

        const worldX = (cursorX - pan.x) / zoom;
        const worldY = (cursorY - pan.y) / zoom;

        const newPanX = cursorX - worldX * newZoom;
        const newPanY = cursorY - worldY * newZoom;

        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
    }, [zoom, pan]);

    const startDragging = useCallback(() => setIsDragging(true), []);
    const stopDragging = useCallback(() => setIsDragging(false), []);
    
    const onDrag = useCallback((movementX: number, movementY: number) => {
        if (isDragging) {
            setPan(prev => ({
                x: prev.x + movementX,
                y: prev.y + movementY
            }));
        }
    }, [isDragging]);

    const goToCoordinates = useCallback((targetX: number, targetY: number, container: HTMLDivElement | null) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        setPan({
            x: centerX - (targetX * zoom),
            y: centerY - (targetY * zoom)
        });
    }, [zoom]);

    return {
        zoom,
        pan,
        isDragging,
        handleWheel,
        startDragging,
        stopDragging,
        onDrag,
        goToCoordinates
    };
};
