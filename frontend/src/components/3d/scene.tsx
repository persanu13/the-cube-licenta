import React from "react";
import { clsx } from "clsx"; // sau 'classnames'

type SceneProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Scene({ children, className }: SceneProps) {
  return (
    <div
      className={clsx(
        " flex justify-center items-center [perspective:10em] [perspective-origin:50%_calc(50%-5em)] [clip-path:fill-box]",
        className
      )}
    >
      <div className="relative transform-3d ">{children}</div>
    </div>
  );
}
