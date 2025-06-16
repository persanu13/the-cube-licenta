"use client";

import { useRef, useEffect } from "react";

export default function Cube({ size }: { size: number }) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0.1, y: 0.2 });
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const MIN_VELOCITY = 0.2;
  const MAX_VELOCITY = 5;
  const DECAY = 0.995;

  const animate = () => {
    if (!isDragging.current) {
      rotation.current.x += velocity.current.x;
      rotation.current.y += velocity.current.y;
    }

    velocity.current.x *= DECAY;
    velocity.current.y *= DECAY;

    if (Math.abs(velocity.current.x) < MIN_VELOCITY) {
      velocity.current.x = Math.sign(velocity.current.x) * MIN_VELOCITY;
    }
    if (Math.abs(velocity.current.y) < MIN_VELOCITY) {
      velocity.current.y = Math.sign(velocity.current.y) * MIN_VELOCITY;
    }

    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) `;
    }

    requestAnimationFrame(animate);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    lastMouse.current = { x: e.clientX, y: e.clientY };
    velocity.current.x = MIN_VELOCITY * (velocity.current.x > 0 ? 1 : -1);
    velocity.current.y = MIN_VELOCITY * (velocity.current.y > 0 ? 1 : -1);
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    velocity.current.x =
      Math.max(
        MIN_VELOCITY,
        Math.min(Math.abs(velocity.current.x), MAX_VELOCITY)
      ) * Math.sign(velocity.current.x);

    velocity.current.y =
      Math.max(
        MIN_VELOCITY,
        Math.min(Math.abs(velocity.current.y), MAX_VELOCITY)
      ) * Math.sign(velocity.current.y);
    isDragging.current = false;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    velocity.current.y = dx;
    velocity.current.x = dy;

    rotation.current.y += dx * 0.4;
    rotation.current.x += dy * 0.4;

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const faces = [
    `translateZ(${size / 2}em)`,
    `rotateY(90deg) translateZ(${size / 2}em)`,
    `rotateY(180deg) translateZ(${size / 2}em)`,
    `rotateY(270deg) translateZ(${size / 2}em)`,
    `rotateX(90deg) translateZ(${size / 2}em)`,
    ` rotateX(-90deg) translateZ(${size / 2}em)`,
  ];

  return (
    <div
      ref={cubeRef}
      onMouseDown={handleMouseDown}
      className=" select-none  absolute top-[-3em] left-[-1em] translate-z-[] transform-3d cursor-grab active:cursor-grabbing"
      style={{ width: `${size}em`, height: `${size}em` }}
    >
      {faces.map((face, index) => (
        <div
          key={index}
          className="absolute w-full h-full bg-[#ff686899] border border-black shadow-[inset_0_0_0.2em_#000]"
          style={{ transform: face }}
        />
      ))}
    </div>
  );
}
