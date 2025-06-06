"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ForwardRefExoticComponent, SVGProps } from "react";

type LinkItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};

type MenuCategoryProps = {
  title: string;
  items: LinkItem[];
};

export default function MenuCategory({ title, items }: MenuCategoryProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 pl-1">
      <h3 className="text-tuatara-400 font-inter text-[13px] font-light">
        {title}
      </h3>
      <div className="flex flex-col gap-3 pl-1 ">
        {items.map((item) => {
          const LinkIcon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex gap-2 py-[2px] items-center font-medium  font-inter text-[14px] w-fit ",

                pathname === item.href
                  ? "text-carnation-400 pl-2 border-l-2"
                  : "text-tuatara-900 transition-[padding] duration-500  hover:pl-2"
              )}
            >
              <LinkIcon className="w-6" strokeWidth={2} />
              <p>{item.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
