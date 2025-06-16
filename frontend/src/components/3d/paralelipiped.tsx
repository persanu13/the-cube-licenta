"use client";

export default function Paralelipiped({
  width,
  heigth,
  color,
  pos,
}: {
  width: number;
  heigth: number;
  color: string;
  pos: { x: number; y: number; z: number };
}) {
  const faces = ["front", "left", "back", "rigth", "top", "bottom"];

  return (
    <div
      className="select-none absolute transform-3d translate-z-[5em]  rotate-y-35"
      style={{ height: `${heigth}px`, width: `${heigth}px` }}
    >
      {faces.map((face, index) => (
        <div
          key={index}
          className="absolute letter-${index}  bg-bej-100  border-2 shadow-[inset_0_0_0.5em_#000]"
          style={{ width: width }}
        />
      ))}
    </div>
  );
}
