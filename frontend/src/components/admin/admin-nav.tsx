"use client";

import {
  LockClosedIcon,
  ArrowRightStartOnRectangleIcon,
  Squares2X2Icon,
  UsersIcon,
  ClipboardDocumentIcon,
  ChartPieIcon,
  EyeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import { signOut } from "@/lib/auth/auth";
import MenuCategory from "./menu-category";
import { useActionState } from "react";

const generalItems = [
  { name: "Dashboard", href: "/admin", icon: Squares2X2Icon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Lessons", href: "/admin/lessons", icon: ClipboardDocumentIcon },
  { name: "Statistics", href: "/admin/statistics", icon: ChartPieIcon },
];

const toolsItems = [
  { name: "User view", href: "/client", icon: EyeIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export default function AdminNav() {
  const [state, action, isPending] = useActionState(signOut, null);
  return (
    <div className="flex flex-col h-full w-[180px] bg-spring-white gap-7.5 px-3 py-5 flex-shrink-0 shadow-[2px_4px_4px_rgba(0,0,0,0.25)] z-10">
      <div className="flex items-center gap-2">
        <LockClosedIcon className="text-tuatara-900 w-6 h-6 stroke-[2.5px]" />
        <h1 className="text-tuatara-900 text-2xl font-medium font-jost tracking-tight">
          the cube
        </h1>
      </div>
      <MenuCategory title="General" items={generalItems} />
      <MenuCategory title="Tools" items={toolsItems} />
      <form className="mt-auto" action={action}>
        <button
          type="submit"
          disabled={isPending}
          className={`flex gap-2 py-[2px]  items-center font-medium font-inter text-[14px] w-fit transition-[padding] duration-500 hover:pl-2 ${
            isPending ? "opacity-60 cursor-default " : "cursor-pointer"
          }`}
        >
          <ArrowRightStartOnRectangleIcon className="w-6" />
          <p>Log out</p>
        </button>
      </form>
    </div>
  );
}
