"use client";
import clsx from "clsx";

import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
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
  { icon: "square", action: "add_point", variant: "stroke" },
  { icon: "square", action: "add_line", variant: "stroke" },
];

const MenuItems: TMenuItem[][] = [
  [{ icon: "cursor", action: "move_select_fig", variant: "fill" }],
  [{ icon: "hand", action: "move_view_box", variant: "fill" }],
  shapeMenu,
  [{ icon: "pen", action: "use_pen", variant: "stroke" }],
];

export default function ToolBarMenu() {
  const action = useCanvasStore((s) => s.action);
  const setAction = useCanvasStore((s) => s.setAction);
  const isFullscreen = useCanvasStore((s) => s.fullscreen);
  const setFullscreen = useCanvasStore((s) => s.setFullscreen);

  const handleClick = (action: TAction) => {
    setAction(action);
  };

  const handleFullScreen = () => {
    setFullscreen(!isFullscreen);
  };

  return (
    <div className="flex pt-1 pb-[6px] mb-2 absolute px-2 border-2 border-charade-950 bg-bej-100 rounded-lg gap-[6px] shadow-[2px_2px_0_var(--charade-950)] z-10">
      {MenuItems.map((item, index) => {
        return <MenuItem key={index} itemMenu={item} />;
      })}
      <button
        className="cursor-pointer rounded p-[2px] flex items-center justify-center "
        onClick={handleFullScreen}
      >
        {isFullscreen ? (
          <ArrowsPointingInIcon width={24} stroke="#383838" strokeWidth={1.5} />
        ) : (
          <ArrowsPointingOutIcon
            width={24}
            stroke="#383838"
            strokeWidth={1.5}
          />
        )}
      </button>
    </div>
  );
}
