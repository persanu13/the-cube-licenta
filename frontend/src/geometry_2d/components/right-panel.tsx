"use client";

import { useCanvasStore } from "../canvas-context";

export default function RightPanel() {
  console.log("render RigthPanel");
  const viewBox = useCanvasStore((s) => s.viewBoxState);

  return (
    <div className="min-w-36 w-[15%]  bg-bej-100  border-l-2 border-charade-950 rounded-r-md">
      <p></p>
    </div>
  );
}
