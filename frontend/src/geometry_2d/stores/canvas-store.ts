import { create } from "zustand";
import { ViewBox } from "../lib/viewbox";
import { TAction } from "../Interfaces/types";
import { IShape } from "../Interfaces/figurine";

interface ShapeDelta {
  added: IShape[];
  removed: IShape[];
  updated?: { before: IShape; after: IShape }[];
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

  letter: string;
  color: string;

  setAction: (action: TAction) => void;

  setFullscreen: (newState: boolean) => void;

  moveViewBox: (dx: number, dy: number) => void;
  zoomViewBox: (delta: number, centerX: number, centerY: number) => void;

  getLetter: () => string;
  setColor: (color: string) => void;

  setShapes: (shapes: IShape[]) => void;
  addShape: (shape: IShape) => void;
  removeShape: (shape: IShape) => void;
  updateShape: (before: IShape, after: IShape) => void;

  setSelectedShapes: (shapes: IShape[]) => void;

  undo: () => void;
  redo: () => void;
};

export const createCanvasStore = () => {
  return create<CanvasStoreState>()((set, get) => ({
    action: "move_select_fig",
    fullscreen: false,
    shapes: [],
    letter: "A",
    color: "#00b3ff",
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

    removeShape: (shape: IShape) =>
      set((state) => {
        const removed = state.shapes.filter((s) => s === shape);
        if (removed.length < 1) {
          return state;
        }
        return {
          shapes: state.shapes.filter((s) => s !== shape),
          history: [...state.history, { added: [], removed: removed }],
          future: [],
        };
      }),

    updateShape: (before, after) =>
      set((state) => {
        const updatedShapes = state.shapes.map((s) =>
          s === before ? after : s
        );
        return {
          shapes: updatedShapes,
          history: [
            ...state.history,
            { added: [], removed: [], updated: [{ before, after }] },
          ],
          future: [],
        };
      }),

    getLetter: () => {
      const current = get().letter;
      const next = String.fromCharCode(current.charCodeAt(0) + 1);

      if (current !== "Z") {
        set({ letter: next });
      } else {
        set({ letter: "A" });
      }
      return current;
    },

    setColor: (color: string) => set({ color }),

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

        const shapesWithoutAdded = state.shapes.filter(
          (s) => !lastDelta.added.includes(s)
        );
        const shapesWithRemoved = shapesWithoutAdded.concat(lastDelta.removed);

        const shapesWithUndoUpdates = lastDelta.updated
          ? shapesWithRemoved.map((s) => {
              const found = lastDelta.updated!.find((u) => u.after === s);
              return found ? found.before : s;
            })
          : shapesWithRemoved;

        return {
          shapes: shapesWithUndoUpdates,
          history: state.history.slice(0, -1),
          future: [lastDelta, ...state.future],
        };
      }),

    redo: () =>
      set((state) => {
        if (state.future.length === 0) return {};

        const nextDelta = state.future[0];

        const shapesWithoutRemoved = state.shapes.filter(
          (s) => !nextDelta.removed.includes(s)
        );
        const shapesWithAdded = shapesWithoutRemoved.concat(nextDelta.added);

        const shapesWithRedoUpdates = nextDelta.updated
          ? shapesWithAdded.map((s) => {
              const found = nextDelta.updated!.find((u) => u.before === s);
              return found ? found.after : s;
            })
          : shapesWithAdded;

        return {
          shapes: shapesWithRedoUpdates,
          history: [...state.history, nextDelta],
          future: state.future.slice(1),
        };
      }),
  }));
};
