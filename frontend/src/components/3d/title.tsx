"use client";
import {
  animate,
  createScope,
  createSpring,
  createDraggable,
  utils,
  stagger,
  Scope,
} from "animejs";
import { useEffect, useRef, useState } from "react";

export default function Title() {
  const root = useRef(null);
  const scope = useRef<null | Scope>(null);

  const titlu = ["T", "H", "E", "", "C", "U", "B", "E"];

  useEffect(() => {
    utils.set(".title", {
      translateX: "-22em",
    });

    scope.current = createScope({ root }).add((self) => {
      animate(".title", {
        translateX: 0,
        ease: "outElastic(1, .6)",
        duration: 1200,
      });

      animate(".title h1", {
        keyframes: [
          { scaleX: 0.5, scaleY: 1.4, duration: 200 },
          { scaleX: 1.2, scaleY: 0.8, duration: 170 },
          { scaleX: 0.7, scaleY: 1.2, duration: 130 },
          { scaleX: 1.1, scaleY: 0.9, duration: 100 },
          { scaleX: 0.9, scaleY: 1.1, duration: 70 },
          { scaleX: 1, scaleY: 1, duration: 40 },
        ],
        easing: "linear",
        delay: function (el, i) {
          return i * 100 + 600;
        },
      });
    });

    return () => scope.current!.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    animate(`.letter-${index}`, {
      keyframes: [
        { scaleX: 0.5, scaleY: 1.4, duration: 200 },
        { scaleX: 1.2, scaleY: 0.8, duration: 170 },
        { scaleX: 0.7, scaleY: 1.2, duration: 130 },
        { scaleX: 1.1, scaleY: 0.9, duration: 100 },
        { scaleX: 0.9, scaleY: 1.1, duration: 70 },
        { scaleX: 1, scaleY: 1, duration: 40 },
      ],
      easing: "linear",
    });
  };

  return (
    <div ref={root}>
      <div className="title flex gap-1 flex-wrap items-center justify-center">
        {titlu.map((letter, index) => {
          return (
            <h1
              key={index}
              className={`letter letter-${index}  leading-tight transition-all duration-50 font-jost text-[114px] font-bold text-tuatara-900 cursor-default hover:text-carnation-400`}
              style={{ textShadow: "2px 2px 4px #000000" }}
              onMouseEnter={() => {
                handleMouseEnter(index);
              }}
            >
              {letter ? letter : <span>&nbsp;</span>}
            </h1>
          );
        })}
      </div>
    </div>
  );
}
