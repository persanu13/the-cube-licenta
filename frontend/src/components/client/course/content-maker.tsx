"use client";

import CourseText from "@/components/client/course/text";
import { updateCourseContent } from "@/lib/actions/courses";
import { useState } from "react";
import ButtonsMenu from "./buttons-menu";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Panel from "@/geometry_2d/components/panel";

type ContentMakerProps = {
  courseId: string;
  initialContent: any[];
};

export default function ContentMaker({
  courseId,
  initialContent,
}: ContentMakerProps) {
  const [content, setContent] = useState(initialContent);

  const moveItem = (direction: "up" | "down", index: number) => {
    const newContent = content.slice();
    if (direction == "up") {
      const aux = newContent[index - 1];
      newContent[index - 1] = newContent[index];
      newContent[index] = aux;
    }
    if (direction == "down") {
      const aux = newContent[index + 1];
      newContent[index + 1] = newContent[index];
      newContent[index] = aux;
    }
    setContent(newContent);
  };

  const deleteItem = (index: number) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-between h-screen w-screen overflow-hidden">
      <ButtonsMenu content={content} setContent={setContent} />
      <main className="flex flex-col w-full px-5 py-6 gap-6 overflow-auto hide-scrollbar">
        {content.map((item, index) => {
          return (
            <div
              key={index}
              className="flex rounded-[4px] outline-carnation-400 items-center justify-center relative py-3 px-1 outline-2 h-fit"
            >
              <button
                className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 cursor-pointer text-bej-50 bg-carnation-400"
                style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                onClick={() => deleteItem(index)}
              >
                <XCircleIcon width={24} strokeWidth={2} className="" />
              </button>
              {index != 0 && (
                <button
                  className="absolute top-0 -translate-y-1/2 cursor-pointer text-bej-50 bg-carnation-400"
                  style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                  onClick={() => moveItem("up", index)}
                >
                  <ArrowUpCircleIcon width={24} strokeWidth={2} className="" />
                </button>
              )}

              {item.type == "TEXT" ? (
                <CourseText
                  text={item}
                  onChange={(value) => {
                    const updated = [...content];
                    updated[index] = {
                      ...updated[index],
                      value,
                    };
                    setContent(updated);
                  }}
                />
              ) : (
                <Panel panel={item} />
              )}

              {index != content.length - 1 && (
                <button
                  style={{ clipPath: "circle(33.0% at 50% 50%)" }}
                  className="absolute bottom-0 translate-y-1/2 cursor-pointer text-bej-50 bg-carnation-400"
                  onClick={() => moveItem("down", index)}
                >
                  <ArrowDownCircleIcon width={24} strokeWidth={2} />
                </button>
              )}
            </div>
          );
        })}
        <div>
          <form
            action={async () => {
              updateCourseContent(courseId, content);
            }}
          >
            <button>Save</button>
          </form>
        </div>
      </main>
      <div>
        <h1>Styles</h1>
      </div>
    </div>
  );
}
