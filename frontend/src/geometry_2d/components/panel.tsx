"use client";

import { useEffect, useRef } from "react";
import Canvas from "./canvas";
import ToolBarMenu from "./toolbar-menu";

import RightPanel from "./right-panel";
import { useScreenWheelBlock } from "@/hooks/useScreenWheelBlock";
import { PanelProvider, useCanvasStore } from "../canvas-context";
import { PanelState } from "../Interfaces/types";

export default function PanelWrapper({ panel }: { panel: PanelState }) {
  return (
    <PanelProvider shapesData={panel.shapesData}>
      <Panel width={panel.width} height={panel.height} />
    </PanelProvider>
  );
}

type PanelProps = { width?: number; height?: number };

export function Panel({ width = 600, height = 400 }: PanelProps) {
  //console.log("render Panel");
  const panelRef = useRef<HTMLDivElement>(null);
  const isFullscreen = useCanvasStore((s) => s.fullscreen);
  const setFullscreen = useCanvasStore((s) => s.setFullscreen);
  useScreenWheelBlock(panelRef);

  useEffect(() => {
    const handleChange = () => {
      setFullscreen(panelRef.current === document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      if (panelRef.current) {
        panelRef.current.requestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  return (
    <div
      ref={panelRef}
      className="flex border-2 mt-2 border-charade-950 rounded-md w-fit shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div
        className="flex flex-col relative justify-end  items-center"
        style={
          isFullscreen
            ? { width: "85%", height: "100%" }
            : { width: width, height: height }
        }
      >
        <Canvas />
        <ToolBarMenu />
      </div>
      <RightPanel />
    </div>
  );
}
