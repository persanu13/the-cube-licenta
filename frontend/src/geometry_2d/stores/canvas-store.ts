import { create } from "zustand";
import { ViewBox } from "../lib/viewbox";
import { TAction } from "../Interfaces/types";
import { IShape } from "../Interfaces/figurine";

interface ShapeDelta {
  added: IShape[];
  removed: string[];
}

type ViewBoxState = {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
};

export type CanvasStoreState = {
  action: TAction;
  fullscreen: boolean;

  shapes: IShape[];
  selectedShapes: IShape[];
  viewBox: ViewBox;
  viewBoxState: ViewBoxState;
  history: ShapeDelta[];
  future: ShapeDelta[];

  setAction: (action: TAction) => void;

  setFullscreen: (newState: boolean) => void;

  moveViewBox: (dx: number, dy: number) => void;
  zoomViewBox: (delta: number, centerX: number, centerY: number) => void;

  setShapes: (shapes: IShape[]) => void;

  addShape: (shape: IShape) => void;
  removeShape: (id: string) => void;

  setSelectedShapes: (shapes: IShape[]) => void;

  undo: () => void;
  redo: () => void;
};

export const createCanvasStore = () => {
  return create<CanvasStoreState>()((set, get) => ({
    action: "move_select_fig",
    fullscreen: false,
    shapes: [],
    selectedShapes: [],
    viewBox: new ViewBox(),
    viewBoxState: { x: 0, y: 0, width: 0, height: 0, scale: 1 },
    history: [],
    future: [],

    setAction: (action: TAction) => set({ action }),

    setFullscreen: (newState: boolean) => set({ fullscreen: newState }),

    moveViewBox: (dx, dy) =>
      set((state) => {
        state.viewBox.move(dx, dy);
        return {
          viewBoxState: {
            x: state.viewBox.x,
            y: state.viewBox.y,
            width: state.viewBox.width,
            height: state.viewBox.height,
            scale: state.viewBox.scale,
          },
        };
      }),

    zoomViewBox: (delta: number, centerX: number, centerY: number) =>
      set((state) => {
        state.viewBox.zoom(delta, centerX, centerY);
        return {
          viewBoxState: {
            x: state.viewBox.x,
            y: state.viewBox.y,
            width: state.viewBox.width,
            height: state.viewBox.height,
            scale: state.viewBox.scale,
          },
        };
      }),

    setShapes: (shapes: IShape[]) => set({ shapes }),

    addShape: (shape: IShape) =>
      set((state) => ({
        shapes: [...state.shapes, shape],
        history: [...state.history, { added: [shape], removed: [] }],
        future: [],
      })),

    removeShape: (id: string) =>
      set((state) => {
        const removed = state.shapes.filter((s) => s.id === id);
        return {
          shapes: state.shapes.filter((s) => s.id !== id),
          history: [
            ...state.history,
            { added: [], removed: removed.map((s) => s.id) },
          ],
          future: [],
        };
      }),

    setSelectedShapes: (shapes: IShape[]) =>
      set((state) => {
        for (const shape of state.selectedShapes) {
          shape.isSelected = false;
        }

        for (const shape of shapes) {
          shape.isSelected = true;
        }

        return { selectedShapes: shapes };
      }),

    undo: () =>
      set((state) => {
        if (state.history.length === 0) return {};
        const lastDelta = state.history[state.history.length - 1];
        const newShapes = [
          ...state.shapes.filter((s) => !lastDelta.added.includes(s)),
          ...lastDelta.removed.map((id) => ({ id } as IShape)),
        ];
        return {
          shapes: newShapes,
          history: state.history.slice(0, -1),
          future: [lastDelta, ...state.future],
        };
      }),

    redo: () =>
      set((state) => {
        if (state.future.length === 0) return {};
        const nextDelta = state.future[0];
        const newShapes = [...state.shapes, ...nextDelta.added].filter(
          (s) => !nextDelta.removed.includes(s.id)
        );
        return {
          shapes: newShapes,
          history: [...state.history, nextDelta],
          future: state.future.slice(1),
        };
      }),
  }));
};
