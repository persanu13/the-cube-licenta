"use client";
import { ChangeEvent, KeyboardEvent, useRef } from "react";

type NumberInputProps = {
  id: string;
  label: string;
  defaultValue: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export default function NumberInput({
  id,
  label,
  defaultValue,
  min,
  max,
  onChange,
}: NumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (min && max) {
      const clamped = Math.min(max, Math.max(min, value));
      e.target.value = clamped.toString();
      onChange(clamped);
    } else {
      onChange(Number(e.target.value));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <div className="flex w-full gap-1 items-center">
      <label
        htmlFor={id}
        className="whitespace-nowrap text-[14px] font-jost font-medium text-charade-950"
      >
        {label}:
      </label>
      <input
        ref={inputRef}
        id={id}
        type="number"
        defaultValue={defaultValue}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full min-w-0 px-1 py-0.5 border rounded text-[14px] font-inter font-medium text-charade-950 
        outline-tuatara-400 focus:outline-1 focus:outline-carnation-400 focus:border-carnation-400 focus:shadow-glow-carnation"
      />
    </div>
  );
}
