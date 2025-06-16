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
import Link from "next/link";
import Scene3D, { Scene3DState } from "@/components/threejs/scene3d";

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

  const renderItem = (item: ContentTypes) => {
    switch (item.type) {
      case "TEXT":
        return <CourseText text={item as TCourseText} />;
      case "PANEL":
        return <Panel panel={item as PanelState} />;
      case "3DSHAPE":
        return <Scene3D scene={item as Scene3DState} />;
      default:
        return null;
    }
  };

  return (
    <div
      onMouseUp={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === "MAIN") {
          setSelectedIndex(-1);
        }
      }}
      className="flex justify-between h-screen w-screen overflow-hidden"
    >
      <ButtonsMenu content={content} setContent={setContent} />

      <main className="flex flex-col relative h-full  w-full px-5 pb-12 py-6 overflow-auto scrollbar ">
        {content.map((item, index) => {
          return (
            <div
              key={index}
              className="flex w-full rounded-[4px] outline-carnation-400 items-center justify-center relative  h-fit"
              style={
                selectedIndex == index
                  ? {
                      outline: "2px solid var(--carnation-400)",
                      padding: "4px 2px ",
                    }
                  : {}
              }
            >
              {selectedIndex == index && (
                <>
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
                  {index !== content.length - 1 && (
                    <button
                      className="absolute bottom-0 translate-y-1/2 cursor-pointer text-bej-50 bg-carnation-400"
                      style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                      onClick={() => moveItem("down", index)}
                    >
                      <ArrowDownCircleIcon width={24} strokeWidth={2} />
                    </button>
                  )}
                </>
              )}

              <div
                className="w-full"
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                {renderItem(item)}
              </div>
            </div>
          );
        })}

        <div className="sticky bottom-0 flex gap-3 justify-end mt-auto">
          <form
            action={async () => {
              await updateCourseContent(courseId, content);
            }}
          >
            <button
              type="submit"
              className="px-3 py-[6px] bg-carnation-400 cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
            >
              Save Course
            </button>
          </form>
          <Link
            className="px-3 py-[6px] bg-border rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
            href="/teacher/courses"
          >
            Back
          </Link>
        </div>
      </main>

      <StyleMenu selected={content[selectedIndex]} onChange={onChange} />
    </div>
  );
}
