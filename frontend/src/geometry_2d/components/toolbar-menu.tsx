"use client";
import clsx from "clsx";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";

import { TAction } from "../Interfaces/types";

import Icon, { TIcon } from "@/components/common/icon";
import { useCanvasStore } from "../canvas-context";
import MenuItem from "./menu-item";

export type TMenuItem = {
  icon: TIcon;
  action: TAction;
  variant: "fill" | "stroke";
};

const shapeMenu: TMenuItem[] = [
  { icon: "point", action: "add_point", variant: "fill" },
  { icon: "line", action: "add_line", variant: "stroke" },
  { icon: "square", action: "add_polygon", variant: "stroke" },
];

const penMenu: TMenuItem[] = [
  { icon: "pen", action: "add_path", variant: "stroke" },
  { icon: "eraser", action: "delete", variant: "fill" },
];

const MenuItems: TMenuItem[][] = [
  [{ icon: "cursor", action: "move_select_fig", variant: "fill" }],
  [{ icon: "hand", action: "move_view_box", variant: "fill" }],
  shapeMenu,
  penMenu,
];

export default function ToolBarMenu() {
  const isFullscreen = useCanvasStore((s) => s.fullscreen);
  const setFullscreen = useCanvasStore((s) => s.setFullscreen);
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);
  const history = useCanvasStore((s) => s.history);
  const future = useCanvasStore((s) => s.future);
  const handleFullScreen = () => {
    setFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="absolute top-1 left-1 flex gap-2 ">
        <button
          className="  cursor-pointer disabled:cursor-default "
          onClick={undo}
          disabled={history.length === 0}
        >
          <ArrowLeftIcon
            width={18}
            strokeWidth={2.5}
            style={
              history.length > 0
                ? { stroke: "var(--tuatara-900)" }
                : { stroke: "var(--tuatara-400)" }
            }
          />
        </button>
        <button
          className=" cursor-pointer disabled:cursor-default "
          onClick={redo}
          disabled={future.length === 0}
        >
          <ArrowRightIcon
            width={18}
            strokeWidth={2.5}
            style={
              future.length > 0
                ? { stroke: "var(--tuatara-900)" }
                : { stroke: "var(--tuatara-400)" }
            }
          />
        </button>
      </div>
      <div className="flex pt-1 pb-[6px] mb-2 absolute px-2 border-2 border-charade-950 bg-bej-100 rounded-lg gap-[6px] shadow-[2px_2px_0_var(--charade-950)] z-10">
        {MenuItems.map((item, index) => {
          return <MenuItem key={index} itemMenu={item} />;
        })}
        <button
          className="cursor-pointer rounded p-[2px] flex items-center justify-center "
          onClick={handleFullScreen}
        >
          {isFullscreen ? (
            <ArrowsPointingInIcon
              width={24}
              stroke="#383838"
              strokeWidth={1.5}
            />
          ) : (
            <ArrowsPointingOutIcon
              width={24}
              stroke="#383838"
              strokeWidth={1.5}
            />
          )}
        </button>
      </div>
    </>
  );
}
