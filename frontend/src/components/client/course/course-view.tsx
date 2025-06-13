import { PanelState } from "@/geometry_2d/Interfaces/types";
import CourseText, { TCourseText } from "./text";
import { Fragment } from "react";
import Panel from "@/geometry_2d/components/panel";

type CourseViewProps = {
  initialContent: ContentTypes[];
};

export type ContentTypes = TCourseText | PanelState;

export default function CourseView({ initialContent }: CourseViewProps) {
  const contentItem = (item: ContentTypes) => {
    switch (item.type) {
      case "TEXT":
        const text: TCourseText = item as TCourseText;
        return <CourseText text={text} readonly={true}></CourseText>;

      case "PANEL":
        const panel: PanelState = item as PanelState;
        return <Panel panel={panel}></Panel>;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex h-full w-full overflow-auto scrollbar px-5 pb-12 py-6 bg-bej-100">
      <main className="flex flex-col h-fit w-full">
        {initialContent &&
          initialContent.map((item, index) => {
            return <Fragment key={index}>{contentItem(item)}</Fragment>;
          })}
      </main>
    </div>
  );
}
