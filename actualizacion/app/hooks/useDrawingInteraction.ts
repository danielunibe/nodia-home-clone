import { useCallback, ReactNode } from "react";
import { useRoomStore } from "@/app/store/useRoomStore";

export const useDrawingInteraction = (
  toWorld: (clientX: number, clientY: number) => { x: number; y: number },
  zoom: number
) => {
  const handleDrawingPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const state = useRoomStore.getState();
      if (!state.isDrawing || state.isDefiningHeight) return;

      let worldPos = toWorld(e.clientX, e.clientY);

      if (state.mode === "assisted") {
        worldPos.x = Math.round(worldPos.x / Math.max(state.gridSize, 1)) * Math.max(state.gridSize, 1);
        worldPos.y = Math.round(worldPos.y / Math.max(state.gridSize, 1)) * Math.max(state.gridSize, 1);
      }

      // Check if closing shape
      if (state.points.length >= 3) {
        const first = state.points[0];
        const dist = Math.sqrt(Math.pow(worldPos.x - first.x, 2) + Math.pow(worldPos.y - first.y, 2));
        const screenDist = dist * zoom;

        // If we clicked very close to first point (snapping distance)
        if (screenDist < 20) {
          state.startDefiningHeight();
          return;
        }
      }

      state.addPoint(worldPos);
    },
    [toWorld, zoom],
  );

  const handleDrawingPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const state = useRoomStore.getState();
      if (!state.isDrawing) return;

      if (state.isDefiningHeight) {
        // Adjust height based on movement Y (scaled for better sensitivity across zoom levels)
        const increment = e.movementY * (-4 / Math.max(zoom, 0.1));
        state.setRoomHeight(state.roomHeight + increment);
        return;
      }

      let worldPos = toWorld(e.clientX, e.clientY);

      if (state.mode === "assisted") {
        worldPos.x = Math.round(worldPos.x / Math.max(state.gridSize, 1)) * Math.max(state.gridSize, 1);
        worldPos.y = Math.round(worldPos.y / Math.max(state.gridSize, 1)) * Math.max(state.gridSize, 1);
      }

      // Snapping to first point to close shape easily
      const currentPoints = state.points;
      if (currentPoints.length >= 3) {
        const first = currentPoints[0];
        const dist = Math.sqrt(Math.pow(worldPos.x - first.x, 2) + Math.pow(worldPos.y - first.y, 2));
        const screenDist = dist * zoom;
        if (screenDist < 20) { // 20px snap radius
          worldPos = { ...first };
        }
      }

      // Free drawing behavior (acts like a pencil when button is held down)
      if (state.mode === "free" && e.buttons === 1) {
        const lastPoint = currentPoints[currentPoints.length - 1];
        if (lastPoint) {
          const distFromLast = Math.sqrt(Math.pow(worldPos.x - lastPoint.x, 2) + Math.pow(worldPos.y - lastPoint.y, 2));
          // Allow adding points continuously over distance
          if (distFromLast * zoom > 10) {
            // If we snapped to first, close it and start defining height.
            if (currentPoints.length >= 10 && Math.sqrt(Math.pow(worldPos.x - currentPoints[0].x, 2) + Math.pow(worldPos.y - currentPoints[0].y, 2)) * zoom < 20) {
              state.addPoint({ ...currentPoints[0] });
              state.startDefiningHeight();
              return;
            }
            state.addPoint(worldPos);
          }
        }
      }

      state.updateCurrentPoint(worldPos);
    },
    [toWorld, zoom],
  );

  return { handleDrawingPointerDown, handleDrawingPointerMove };
};
