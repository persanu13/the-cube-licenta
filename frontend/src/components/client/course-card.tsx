"use client";
import { Course } from "@/lib/models/course";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function CourseCard({ course }: { course: Course }) {
  const router = useRouter();
  const grades =
    course.max_grade == course.min_grade
      ? course.max_grade
      : `${course.min_grade}-${course.max_grade}`;

  const handleClick = () => {
    router.push(`/course/${course.id}/edit`);
  };
  return (
    <div className="flex flex-col shadow-square bg-spring-white flex-[1_1_200px] max-w-[500px] m-autogrid  grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      <div
        className={clsx("h-[180px]")}
        style={{ backgroundColor: course.color }}
      ></div>
      <div className="flex flex-col px-3 pt-4 pb-3 gap-2 border-t-2 border-tuatara-900">
        <div className="flex justify-between">
          <p className="font-hanuman font-bold px-1 text-[14px] text-spring-white bg-border shadow-[0_4px_4px_rgba(0,0,0,0.25)]">{`Grades ${grades}`}</p>
          <p
            className={clsx(
              "font-hanuman font-bold px-1 text-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
              course.subject === "GEOMETRY"
                ? "text-spring-white bg-carnation-400 "
                : "text-tuatara-900  bg-broom-300  "
            )}
          >
            {course.subject}
          </p>
        </div>
        <div className="flex gap-1 items-end justify-between">
          <div className="flex flex-col gap-[1px]">
            <h1 className="font-jost text-[14px] font-bold text-wrap text-tuatara-900">
              {course.name}
            </h1>
            <p className="font-hanuman text-[14px] font-bold text-tuatara-900 ">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(course.createdAt))}
            </p>
            <p className="text-[12px] font-inter font-bold text-tuatara-400">
              {course.visibility}
            </p>
          </div>
          <button
            className=" cursor-pointer p-1 rounded-full hover:bg-bej-100"
            onClick={handleClick}
          >
            <EllipsisVerticalIcon
              width={24}
              strokeWidth={2}
              className="text-tuatara-900"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
