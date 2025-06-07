"use client";

import {
  UsersIcon,
  Cog6ToothIcon,
  HomeIcon,
  DocumentTextIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

import { signOut } from "@/lib/auth/auth";
import { ForwardRefExoticComponent, SVGProps, useActionState } from "react";
import Logo from "../common/logo";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import path from "path";

type IconName = "HomeIcon" | "DocumentTextIcon" | "UsersIcon" | "Cog6ToothIcon";

export type MenuItem = {
  name: string;
  href: string;
  iconName: IconName;
};

const iconMap = {
  HomeIcon: HomeIcon,
  DocumentTextIcon: DocumentTextIcon,
  UsersIcon,
  Cog6ToothIcon,
};

export default function UserNav({ menuItems }: { menuItems: MenuItem[] }) {
  const [state, action, isPending] = useActionState(signOut, null);
  const pathname = usePathname();
  return (
    <nav className="flex flex-col items-center justify-between h-full w-[160px] lg:w-[180px] bg-spring-white  pt-[24px] pb-[40px] flex-shrink-0 shadow-[2px_4px_4px_rgba(0,0,0,0.25)] z-10">
      <Logo />
      <div className="flex flex-col gap-[8px] w-full h-fit">
        {menuItems.map((item, index) => {
          const Icon = iconMap[item.iconName];
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center w-full gap-2 py-2 pl-5 pr-4 h-[40px] ",
                (index != 0 && pathname.startsWith(item.href)) ||
                  pathname == item.href
                  ? "bg-carnation-400 text-spring-white"
                  : "text-tuatara-900 transition-[padding] duration-500 hover:pl-6"
              )}
            >
              <Icon width={24} strokeWidth={2} />
              <p className=" text-[16px] font-[450]  font-jost">{item.name}</p>
            </Link>
          );
        })}
      </div>
      <form action={action} className="w-full">
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            "flex items-center w-full gap-2 py-2 pl-4 pr-3 h-[40px] bg-bej-50 text-tuatara-900 transition-[padding] duration-500 hover:pl-6",
            isPending ? "opacity-60 cursor-default " : "cursor-pointer"
          )}
        >
          <ArrowRightStartOnRectangleIcon width={24} strokeWidth={2} />
          <p className=" text-[16px] font-[450]  font-jost">LOGOUT</p>
        </button>
      </form>
    </nav>
  );
}
