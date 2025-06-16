"use client";
import { TContentType } from "@/lib/models/types";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export type TCourseText = {
  id: string;
  type: TContentType;
  value?: string;
  placeholder?: string;
  size?: number;
  font?: string;
  color?: string;
};
export default function CourseText({
  text,
  readonly,
}: {
  text: TCourseText;
  readonly?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(text.value);

  const resize = () => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [text.size]);

  return (
    <textarea
      ref={ref}
      readOnly={readonly}
      rows={1}
      className="w-full outline-0 resize-none overflow-hidden"
      style={{
        fontSize: `${text.size}px`,
        color: text.color,
        fontFamily: text.font,
      }}
      placeholder={text.placeholder}
      value={text.value ?? ""}
      onChange={(e) => {
        text.value = e.target.value;
        setValue(text.value);
        resize();
      }}
    />
  );
}
