"use client";

import { useRef, useEffect, CSSProperties } from "react";

export default function Pedestal({ size }: { size: number }) {
  const rotateX = 32;
  const faces1: CSSProperties[] = [
    {
      transform: `translateZ(${size / 2}em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(90deg)  translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(180deg) translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(270deg) translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateX(90deg)  translateZ(${size / 2}em) scale(0.5)`,
      width: `${size}em`,
      height: `${size}em`,
      top: `${0.15}em`,
    },
    {
      transform: ` rotateX(-90deg) translateZ(${size / 2}em) `,
      width: `${size}em`,
      height: `${size}em`,
      bottom: `${0}em`,
      boxShadow: `15px -20px 10px #00000099`,
    },
  ];

  const faces2: CSSProperties[] = [
    {
      transform: `translateZ(${size / 2}em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",

      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(90deg)  translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",

      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(180deg) translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",

      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(270deg) translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",

      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateX(90deg)  translateZ(${size / 2}em) scale(0.5)`,
      width: `${size}em`,
      height: `${size}em`,
      top: `${0.15}em`,
    },
    {
      transform: ` rotateX(-90deg) translateZ(${size / 2}em) `,
      width: `${size}em`,
      height: `${size}em`,
      bottom: `${0}em`,
      boxShadow: `15px -20px 10px #00000099`,
    },
  ];

  const faces3: CSSProperties[] = [
    {
      transform: `translateZ(${size / 2}em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(90deg)  translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(180deg) translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateY(270deg) translateZ(${
        size / 2
      }em) rotateX(${rotateX}deg)`,
      transformOrigin: "bottom",
      clipPath: " polygon(25% 0, 75% 0, 100% 100%, 0% 100%)",
      width: `${size}em`,
      height: `${size / 2}em`,
    },
    {
      transform: `rotateX(90deg)  translateZ(${size / 2}em) scale(0.5)`,
      width: `${size}em`,
      height: `${size}em`,
      top: `${0.15}em`,
    },
    {
      transform: ` rotateX(-90deg) translateZ(${size / 2}em) `,
      width: `${size}em`,
      height: `${size}em`,
      bottom: `${0}em`,
      boxShadow: `15px -20px 10px #00000099`,
    },
  ];

  return (
    <>
      <div
        className=" select-none  absolute top-[-3em] left-[-1em] translate-z-20 transform-3d rotate-x-180 cursor-grab rotate-y-35 active:cursor-grabbing"
        style={{ height: `${size / 2}em`, width: `${size}em` }}
      >
        {faces1.map((face, index) => (
          <div
            key={index}
            className="absolute  bg-bej-100 border  shadow-[inset_0_0_0.5em_#000] "
            style={face}
          />
        ))}
      </div>
      <div
        className=" select-none  absolute top-[-1.5em] left-[-1em] translate-z-20 transform-3d rotate-x-180 cursor-grab rotate-y-35 active:cursor-grabbing"
        style={{ height: `${size / 2}em`, width: `${size}em` }}
      >
        {faces2.map((face, index) => (
          <div
            key={index}
            className="absolute  bg-bej-100 border  shadow-[inset_0_0_0.5em_#000] "
            style={face}
          />
        ))}
      </div>
      <div
        className=" select-none  absolute top-[-1.5em] left-[-1em] translate-z-20 transform-3d cursor-grab rotate-y-35 active:cursor-grabbing"
        style={{ height: `${size / 2}em`, width: `${size}em` }}
      >
        {faces3.map((face, index) => (
          <div
            key={index}
            className="absolute  bg-bej-100 border  shadow-[inset_0_0_0.5em_#000] "
            style={face}
          />
        ))}
      </div>
    </>
  );
}
