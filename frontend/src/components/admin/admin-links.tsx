"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ForwardRefExoticComponent, SVGProps } from "react";

interface LinkItem {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
}

export default function AdminLinks({ links }: { links: LinkItem[] }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-3 mt-5 ml-1 text-spring-white">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex gap-3 py-[2px] items-center font-inter text-base w-fit transition-[padding] duration-500 hover:text-carnation-300 hover:pl-2 hover:border-l-2",
              {
                "text-carnation-300 pl-2 border-l-2": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-7" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
