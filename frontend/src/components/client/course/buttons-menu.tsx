import { PlusIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, SetStateAction } from "react";
import { TCourseText } from "./text";
import { PanelState } from "@/geometry_2d/Interfaces/types";
import { generateRandomPoints } from "@/geometry_2d/lib/utility/generate";
import { Panel } from "@/geometry_2d/components/panel";
import { v4 as uuidv4 } from "uuid";

const BUTTONS = [
  {
    name: "Title",
    fct: (content: any[], setContent: Dispatch<SetStateAction<any[]>>) => {
      const newParagraph: TCourseText = {
        id: uuidv4(),
        value: "",
        type: "TEXT",
        placeholder: "Title her...",
        size: 24,
        font: "Inter",
        color: "#292B36",
      };
      setContent([...content, newParagraph]);
    },
  },
  {
    name: "Subtitle",
    fct: (content: any[], setContent: Dispatch<SetStateAction<any[]>>) => {
      const newParagraph: TCourseText = {
        id: uuidv4(),
        value: "",
        type: "TEXT",
        placeholder: "Subtitle her...",
        size: 18,
        font: "Inter",
        color: "#292B36",
      };
      setContent([...content, newParagraph]);
    },
  },
  {
    name: "Paragraph",
    fct: (content: any[], setContent: Dispatch<SetStateAction<any[]>>) => {
      const newParagraph: TCourseText = {
        id: uuidv4(),
        value: "",
        type: "TEXT",
        placeholder: "Text...",
        size: 14,
        font: "Inter",
        color: "#292B36",
      };
      setContent([...content, newParagraph]);
    },
  },
  {
    name: "Canvas",
    fct: (content: any[], setContent: Dispatch<SetStateAction<any[]>>) => {
      const newCanvas: PanelState = {
        id: "cadsfasddsa234",
        type: "PANEL",
        width: 300,
        height: 300,
        name: "Triangle",
        shapesData: [],
      };
      setContent([...content, newCanvas]);
    },
  },
];

export default function ButtonsMenu({
  content,
  setContent,
}: {
  content: any[];
  setContent: Dispatch<SetStateAction<any[]>>;
}) {
  return (
    <div className="flex flex-col gap-3 items-center w-fit bg-bej-50 h-full px-3 py-3 border-r-2 border-tuatara-900">
      <h1 className="font-jost text-[18px]  font-medium text-tuatara-900">
        Lesson Editor
      </h1>
      {BUTTONS.map((button, index) => {
        return (
          <button
            key={index}
            className="flex items-center justify-center gap-1 px-3 pb-[2px] bg-carnation-400 border-2  w-full
            border-bej-50 shadow-square text-spring-white font-hanuman font-medium text-[16px] 
            cursor-pointer"
            onClick={() => {
              button.fct(content, setContent);
            }}
          >
            <p className="mt-1">{button.name}</p>
            <PlusIcon width={20} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
