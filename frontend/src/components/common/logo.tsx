import clsx from "clsx";
import Image from "next/image";

interface LogoProps {
  type?: "full" | "mini";
}

export default function Logo({ type = "full" }: LogoProps) {
  return (
    <div className="flex gap-1 items-end">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="13.5"
          y="13.5"
          width="19.5"
          height="19.5"
          rx="1"
          stroke="#FF6868"
          strokeWidth="3"
        />
        <circle
          cx="12.75"
          cy="12.75"
          r="9.75"
          stroke="#FEED2F"
          strokeWidth="3"
        />
      </svg>
      {type === "full" && (
        <h1 className="text-[24px] font-jost font-medium text-charade-950 leading-[26px]">
          THE CUBE
        </h1>
      )}
    </div>
  );
}
