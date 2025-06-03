"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex w-[220px] bg-bej-100 gap-[10px] px-2 py-1 rounded-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      <input
        className="peer/input w-full flex-1 placeholder:text-tuatara-400 outline-none bg-transparent"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon
        width={18}
        className="text-tuatara-400 transition-colors duration-200 peer-focus/input:text-charade-950"
      />
    </div>
  );
}
