"use client";

import CourseText from "@/components/client/course/text";
import { updateCourseContent } from "@/lib/actions/courses";
import { useState } from "react";

export type TCourseText = {
  value: string;
  placeholder: string;
  size: number;
  font: string;
  color: string;
};

type ContentMakerProps = {
  courseId: string;
  initialContent: any[];
};

export default function ContentMaker({
  courseId,
  initialContent,
}: ContentMakerProps) {
  const [content, setContent] = useState(initialContent);

  const addParagph = () => {
    console.log(content);
    const newParagraph: TCourseText = {
      value: "",
      placeholder: "Text...",
      size: 14,
      font: "Inter",
      color: "#292B36",
    };
    setContent([...content, newParagraph]);
  };

  return (
    <div className="flex justify-between h-full w-full">
      <div>
        <h1>Course Editor</h1>
        <button onClick={addParagph}>Paragraph</button>
      </div>
      <main>
        {content.map((item, index) => {
          return <CourseText key={index} content={item} />;
        })}
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
      <div>
        <h1>Styles</h1>
      </div>
    </div>
  );
}
