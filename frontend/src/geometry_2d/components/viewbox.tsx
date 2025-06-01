"use client";

import { useCanvasStore } from "../canvas-context";

export default function ViewBox() {
  console.log("render ViewBox");
  const viewBox = useCanvasStore((s) => s.viewBoxState);

  return (
    <div className="w-40">
      <p>
        poz x:{viewBox.x + viewBox.width / 2}, y:{" "}
        {viewBox.y - viewBox.height / 2}
      </p>
    </div>
  );
}
