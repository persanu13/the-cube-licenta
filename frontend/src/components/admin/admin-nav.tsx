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
import NavLinks from "./admin-links";
import { signOut } from "@/lib/auth/auth";

const generalLinks = [
  { name: "Dashboard", href: "/admin", icon: Squares2X2Icon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Lessons", href: "/admin/lessons", icon: ClipboardDocumentIcon },
  { name: "Statistics", href: "/admin/statistics", icon: ChartPieIcon },
];

const toolsLinks = [
  { name: "User view", href: "/client", icon: EyeIcon },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export default function AdminNav() {
  return (
    <div className="flex flex-col h-full w-60 bg-charade-950 px-6 py-8">
      <div className="flex items-center gap-2">
        <LockClosedIcon className="text-spring-white w-8 h-8 stroke-3" />
        <h1 className="text-spring-white text-4xl font-medium font-jost tracking-tight">
          the cube
        </h1>
      </div>
      <h3 className="text-tuatara-400 font-inter text-base mt-10">General</h3>
      <NavLinks links={generalLinks} />
      <h3 className="text-tuatara-400 font-inter text-base mt-10">Tools</h3>
      <NavLinks links={toolsLinks} />
      <form className="mt-10" action={signOut}>
        <button
          type="submit"
          className="flex gap-3 py-[2px] items-center text-spring-white cursor-pointer font-inter text-base w-fit transition-[padding] duration-500 hover:text-carnation-300 hover:pl-2 hover:border-l-2"
        >
          <ArrowRightStartOnRectangleIcon className="w-7" />
          <p>Log out</p>
        </button>
      </form>
    </div>
  );
}
