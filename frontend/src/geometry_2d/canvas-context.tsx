// CountersContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useEffect,
} from "react";
import { CanvasStoreState, createCanvasStore } from "./stores/canvas-store";
import { StoreApi, UseBoundStore } from "zustand";
import { createShapes, generateRandomPoints } from "./lib/utility/generate";
import { IShape, TShape } from "./Interfaces/figurine";

type UseStore = UseBoundStore<StoreApi<CanvasStoreState>>;

const PanelContext = createContext<UseStore | null>(null);

type PanelProviderProps = {
  children: ReactNode;
  shapesData?: TShape[];
};

export function PanelProvider({ children, shapesData }: PanelProviderProps) {
  console.log("rerender Context");
  const storeRef = useRef<UseStore>(createCanvasStore()).current;
  const setShapes = storeRef((s) => s.setShapes);
  useEffect(() => {
    if (!shapesData) return;
    const shapes = createShapes(shapesData);
    setShapes(shapes);
  }, []);

  return (
    <PanelContext.Provider value={storeRef}>{children}</PanelContext.Provider>
  );
}

export function useCanvasStore<T>(selector: (state: CanvasStoreState) => T) {
  const store = useContext(PanelContext);
  if (!store) {
    throw new Error("useCountersStore must be used inside a CountersProvider");
  }
  return store(selector);
}
