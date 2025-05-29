import clsx from "clsx";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg"; // Definim dimensiunile disponibile
  type?: "full" | "mini"; // Tipul logo-ului
}

export default function Logo({ size = "md", type = "full" }: LogoProps) {
  const sizes = {
    sm: { width: 36, height: 34 },
    md: { width: 48, height: 50 },
    lg: { width: 64, height: 68 },
  };
  return (
    <div
      className={clsx("flex flex-row  items-end leading-tight", {
        "text-[20px] gap-[3px]": size === "sm",
        "text-[28px] gap-1": size === "md",
        "text-[32px] gap-[5px]": size === "lg",
      })}
    >
      <Image
        src="/favicon.svg"
        alt="logo"
        width={sizes[size].width}
        height={sizes[size].height}
      />
      {type === "full" && (
        <span className=" font-jost font-medium text-charade-950">
          THE CUBE
        </span>
      )}
    </div>
  );
}
