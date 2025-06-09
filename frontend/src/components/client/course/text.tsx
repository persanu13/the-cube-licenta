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
  focus,
  onChange,
}: {
  text: TCourseText;
  focus: boolean;
  onChange?: (text: TCourseText) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

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
        if (onChange) {
          text.value = e.target.value;
          onChange(text);
        }
        resize();
      }}
    />
  );
}
