import { RefObject, useEffect } from "react";

export function useScreenWheelBlock(
  elementRef: RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    el.addEventListener("wheel", preventWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", preventWheel);
    };
  }, [elementRef]);
}
