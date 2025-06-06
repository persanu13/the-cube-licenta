"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type SelectProps = {
  name: string;
  options: string[];
  className?: string;
};

export default function Select({ name, options, className }: SelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selected = useMemo(() => {
    return searchParams.get(name)?.toString();
  }, [searchParams]);

  const onChange = (selected: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set(name, selected);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={clsx(
        "flex items-center relative w-fit  bg-bej-100 rounded-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      <select
        className="border-0 w-full outline-0 text-[14px] font-medium font-inter text-charade-950 appearance-none bg-transparent cursor-pointer pr-5 pl-2 py-1 "
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="cursor-pointer">
            {opt}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute w-[8px] h-[5px] right-2 top-1/2 -translate-y-1/2"
        viewBox="0 0 6 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.72058 4.25115C3.32718 4.65999 2.67282 4.65999 2.27942 4.25115L0.299325 2.19338C-0.311997 1.55807 0.13824 0.5 1.0199 0.5L4.9801 0.5C5.86176 0.5 6.312 1.55807 5.70068 2.19338L3.72058 4.25115Z"
          fill="#292B36"
        />
      </svg>
    </div>
  );
}
