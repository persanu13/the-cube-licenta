"use client";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { useState } from "react";
import BoxMenu from "./group-box-menu";
import { Group } from "@/lib/models/group";

export default function GroupCard({ group }: { group: Group }) {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const handleClick = () => {
    if (menuVisibility) return;
    setMenuVisibility(true);
    const onClose = () => {
      window.removeEventListener("mouseup", onClose);
      setMenuVisibility(false);
    };
    window.addEventListener("mouseup", onClose);
  };

  return (
    <div className="flex flex-col shadow-square bg-spring-white flex-[1_1_200px] max-w-[500px] m-autogrid  grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      <div
        className={clsx("h-[180px]")}
        style={{ backgroundColor: group.color }}
      ></div>
      <div className="flex flex-col px-3 pt-4 pb-3 gap-2 border-t-2 border-tuatara-900">
        <div className="flex gap-1 items-end justify-between">
          <div className="flex flex-col gap-[1px]">
            <h1 className="font-jost text-[14px] font-bold text-wrap text-tuatara-900 truncate line-clamp-2">
              {group.name}
            </h1>
            <p className="font-hanuman text-[14px] font-bold text-tuatara-900 ">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(group.createdAt))}
            </p>
          </div>
          <div className="flex items-center justify-center relative">
            <button
              className="cursor-pointer p-1 rounded-full hover:bg-bej-100"
              onClick={handleClick}
            >
              <EllipsisVerticalIcon
                width={24}
                strokeWidth={2}
                className="text-tuatara-900"
              />
            </button>
            <BoxMenu groupId={group.id} visibility={menuVisibility} />
          </div>
        </div>
      </div>
    </div>
  );
}
