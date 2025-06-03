"use client";

import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { generatePagination } from "@/lib/utility";
import Link from "next/link";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-[6px]">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
      {allPages.map((page, index) => {
        const href = createPageURL(page);
        return (
          <PaginationNumber
            key={index}
            page={page}
            href={href}
            isActive={page != currentPage}
          />
        );
      })}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return page !== "..." ? (
    <Link
      href={href}
      className={clsx(
        "flex min-w-[20px] h-[20px] items-center justify-center font-inter font-medium text-[14px]",
        isActive
          ? "text-charade-950 cursor-pointer"
          : "text-spring-white bg-carnation-400 rounded-full"
      )}
    >
      <p className="p-1">{page}</p>
    </Link>
  ) : (
    <div className="cursor-default flex min-w-[20px] h-[20px] items-center justify-center font-inter font-medium text-[14px] text-charade-950">
      {page}
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex items-center justify-center w-[22px] h-[22px] rounded-full border-1 border-[rgba(42,42,42,0.05)]",
    isDisabled ? "text-tuatara-400" : "text-charade-950 cursor-pointer"
  );

  const icon =
    direction === "left" ? (
      <ChevronLeftIcon width={14} strokeWidth={2} />
    ) : (
      <ChevronRightIcon width={14} strokeWidth={2} />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
