"use client";

import { useState } from "react";
import { useCanvasStore } from "../canvas-context";
import { IShape } from "../Interfaces/figurine";
import NumberInput from "@/components/client/course/basic/number-input";

export default function RightPanel() {
  //console.log("render RigthPanel");
  const viewBox = useCanvasStore((s) => s.viewBoxState);
  const selected = useCanvasStore((s) => s.selectedShapes);
  const setSelected = useCanvasStore((s) => s.setSelectedShapes);
  const setColor = useCanvasStore((s) => s.setColor);
  const color = useCanvasStore((s) => s.color);

  return (
    <div className="flex flex-col min-w-32 w-[15%] shrink-0   bg-bej-50  border-l-2 border-charade-950 rounded-r-md px-3 py-1 ">
      <h1 className="font-hanuman text-[16px] my-2 text-charade-950">
        Settings
      </h1>
      <div className="flex flex-col  font-hanuman text-[14px] text-charade-950">
        <label>View</label>
        <p>
          x={(viewBox.x + viewBox.width / 2).toFixed(1)} y=
          {(viewBox.y - viewBox.height / 2).toFixed(1)}
        </p>
      </div>
      {selected[0] && (
        <div className="flex flex-col w-full">
          <div>
            <label className="font-hanuman text-[14px] text-charade-950">
              Shape Color:
            </label>
            <input
              onChange={(e) => {
                selected[0].color = e.target.value;
                setSelected([selected[0]]);
              }}
              value={selected[0].color}
              type="color"
              className="w-full rounded-2xl"
            ></input>
          </div>
        </div>
      )}

      <div className="flex flex-col   mt-auto">
        <label className=" font-hanuman text-[14px]  text-charade-950">
          Color:
        </label>
        <input
          onChange={(e) => {
            setColor(e.target.value);
          }}
          defaultValue={color}
          type="color"
          className="w-full rounded-2xl"
        ></input>
      </div>
    </div>
  );
}
