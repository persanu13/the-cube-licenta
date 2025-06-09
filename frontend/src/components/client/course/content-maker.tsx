"use client";

import CourseText, { TCourseText } from "@/components/client/course/text";
import { updateCourseContent } from "@/lib/actions/courses";
import { useState } from "react";
import ButtonsMenu from "./buttons-menu";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Panel from "@/geometry_2d/components/panel";
import StyleMenu from "./style-menu";
import { PanelState } from "@/geometry_2d/Interfaces/types";

type ContentMakerProps = {
  courseId: string;
  initialContent: ContentTypes[];
};

export type ContentTypes = TCourseText | PanelState;

export default function ContentMaker({
  courseId,
  initialContent,
}: ContentMakerProps) {
  const [content, setContent] = useState(initialContent);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const moveItem = (direction: "up" | "down", index: number) => {
    const newContent = content.slice();
    if (direction == "up") {
      const aux = newContent[index - 1];
      newContent[index - 1] = newContent[index];
      newContent[index] = aux;
      setSelectedIndex(index - 1);
    }
    if (direction == "down") {
      const aux = newContent[index + 1];
      newContent[index + 1] = newContent[index];
      newContent[index] = aux;
      setSelectedIndex(index + 1);
    }
    setContent(newContent);
  };

  const deleteItem = (index: number) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  const onChange = (item: ContentTypes) => {
    const updated = [...content];
    updated[selectedIndex] = item;
    setContent(updated);
  };

  return (
    <div
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "DIV" || target.tagName === "MAIN") {
          setSelectedIndex(-1);
        }
      }}
      className="flex justify-between h-screen w-screen overflow-hidden"
    >
      <ButtonsMenu content={content} setContent={setContent} />

      <main className="flex flex-col w-full px-5 pb-12 py-6 gap-6 overflow-auto scrollbar">
        {content.map((item, index) =>
          selectedIndex === index ? (
            <div
              key={index}
              className="flex w-full rounded-[4px] outline-carnation-400 items-center justify-center relative py-3 px-1 outline-2 h-fit"
            >
              <button
                className="absolute top-0 right-0 -translate-y-2/5 translate-x-1/2 cursor-pointer text-bej-50 bg-carnation-400"
                style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                onClick={() => deleteItem(index)}
              >
                <XCircleIcon width={24} strokeWidth={2} />
              </button>

              {index !== 0 && (
                <button
                  className="absolute top-0 -translate-y-1/2 cursor-pointer text-bej-50 bg-carnation-400"
                  style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                  onClick={() => moveItem("up", index)}
                >
                  <ArrowUpCircleIcon width={24} strokeWidth={2} />
                </button>
              )}

              {item.type === "TEXT" ? (
                <CourseText
                  text={item as TCourseText}
                  focus={true}
                  onChange={onChange}
                />
              ) : (
                <Panel panel={item as PanelState} />
              )}

              {index !== content.length - 1 && (
                <button
                  className="absolute bottom-0 translate-y-1/2 cursor-pointer text-bej-50 bg-carnation-400"
                  style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                  onClick={() => moveItem("down", index)}
                >
                  <ArrowDownCircleIcon width={24} strokeWidth={2} />
                </button>
              )}
            </div>
          ) : (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="flex"
            >
              {item.type === "TEXT" ? (
                <CourseText focus={false} text={item as TCourseText} />
              ) : (
                <Panel panel={item as PanelState} />
              )}
            </div>
          )
        )}

        <div>
          <form
            action={async () => {
              await updateCourseContent(courseId, content);
            }}
          >
            <button>Save</button>
          </form>
        </div>
      </main>

      <StyleMenu selected={content[selectedIndex]} onChange={onChange} />
    </div>
  );
}
