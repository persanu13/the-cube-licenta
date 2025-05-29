import clsx from "clsx";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "primary" | "secondary";
  showIcon?: boolean;
  className?: string;
}

export default function Button({
  variant = "primary",
  showIcon = true,
  text = "VIEW MORE",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type="submit"
      className={clsx(
        `group flex flex-row items-center justify-center text-xl px-1 py-[6px] font-jost transition duration-500
        border-[2px] border-charade-950 cursor-pointer relative  hover:translate-x-2`,
        {
          "bg-carnation-400 text-spring-white shadow-red hover:bg-carnation-500":
            variant === "primary",
          "bg-broom-300 text-charade-950 shadow-yellow hover:bg-broom-400":
            variant === "secondary",
        },
        className
      )}
    >
      <p>{text}</p>
      {showIcon && (
        <ArrowRightIcon
          width={24}
          strokeWidth={2}
          className="right-1 absolute animate-left-right group-hover:animate-none"
        />
      )}
    </button>
  );
}
