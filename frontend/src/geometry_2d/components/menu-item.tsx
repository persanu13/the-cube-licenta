"use client";

import { useState } from "react";
import { TMenuItem } from "./toolbar-menu";
import clsx from "clsx";
import { useCanvasStore } from "../canvas-context";
import Icon from "@/components/common/icon";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Menuitem({ itemMenu }: { itemMenu: TMenuItem[] }) {
  const [selected, setSelected] = useState<TMenuItem>(itemMenu[0]);
  const [open, setOpen] = useState<boolean>(false);
  const action = useCanvasStore((s) => s.action);
  const setAction = useCanvasStore((s) => s.setAction);
  const setSelectedShapes = useCanvasStore((s) => s.setSelectedShapes);

  const onOpen = () => {
    setOpen(true);
    const onClose = () => {
      window.removeEventListener("mouseup", onClose);
      setOpen(false);
    };
    window.addEventListener("mouseup", onClose);
  };

  return (
    <div className="flex gap-1">
      <button
        key={selected.action}
        className={clsx(
          "cursor-pointer rounded p-[2px] flex items-center justify-center ",
          action === selected.action
            ? "bg-carnation-400 shadow-[2px_2px_0_var(--charade-950)]"
            : "bg-transparent hover:bg-bej-50"
        )}
        onClick={() => {
          setAction(selected.action);
          setSelectedShapes([]);
        }}
      >
        <Icon
          name={selected.icon}
          width={24}
          height={24}
          className={clsx({
            // FILL + SELECTED
            "fill-bej-50":
              selected.variant === "fill" && action === selected.action,

            // STROKE + SELECTED
            "stroke-bej-50  stroke-[1.5px] fill-none":
              selected.variant === "stroke" && action === selected.action,

            // FILL + NOT SELECTED
            "fill-tuatara-900":
              selected.variant === "fill" && action !== selected.action,

            // STROKE + NOT SELECTED
            "stroke-tuatara-900 stroke-[1.5px] fill-none":
              selected.variant === "stroke" && action !== selected.action,
          })}
        ></Icon>
      </button>
      {itemMenu.length > 1 && (
        <div className="relative">
          <button
            className="felx h-full items-center justify-center text-charade-950 cursor-pointer hover:bg-bej-50 px-[1px] rounded relative"
            onClick={onOpen}
          >
            <ChevronDownIcon width={10} strokeWidth={3} />
          </button>
          {open && (
            <div className="flex flex-col gap-1 absolute border-2 border-charade-950 rounded bg-bej-100 px-1 py-2  top-0 -translate-x-1/3 -translate-y-[calc(100%_+_10px)] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              {itemMenu.map((item) => {
                return (
                  <button
                    key={item.action}
                    className={clsx(
                      "flex items-center w-full hover:bg-carnation-400 px-1 py-[2px] cursor-pointer rounded",
                      {
                        "fill-tuatara-900 hover:fill-bej-50":
                          item.variant === "fill",
                        "stroke-tuatara-900 stroke-[1.5px] fill-none hover:stroke-bej-50":
                          item.variant === "stroke",
                      }
                    )}
                    onMouseUp={() => {
                      setSelected(item);
                      setAction(item.action);
                      setSelectedShapes([]);
                    }}
                  >
                    <Icon name={item.icon} width={20} height={20}></Icon>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
