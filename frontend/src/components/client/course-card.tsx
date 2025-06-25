"use client";
import { Course } from "@/lib/models/course";
import { EllipsisVerticalIcon, EyeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

import { useState } from "react";

type MenuItem = {
  name: string;
  onClick: (course: Course) => void;
};

type CourseCardProps = {
  course: Course;
  menuItems?: MenuItem[];
  teacher?: boolean;
};

export default function CourseCard({
  course,
  menuItems = [],
  teacher,
}: CourseCardProps) {
  const [menuVisibility, setMenuVisibility] = useState(false);

  const grades =
    course.max_grade == course.min_grade
      ? course.max_grade
      : `${course.min_grade}-${course.max_grade}`;

  const handleClick = () => {
    if (menuVisibility) return;
    setMenuVisibility(true);
    const onClose = () => {
      window.removeEventListener("mouseup", onClose);
      setMenuVisibility(false);
    };
    window.addEventListener("mouseup", onClose);
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
            <h1 className="font-jost text-[14px] font-bold text-wrap text-tuatara-900 truncate line-clamp-2">
              {course.name}
            </h1>
            <p className="font-hanuman text-[14px] font-bold text-tuatara-900 ">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(course.createdAt))}
            </p>
            {course.autorName ? (
              <p className="text-[12px] font-inter font-bold text-tuatara-400">
                {course.autorName}
              </p>
            ) : (
              <p className="text-[12px] font-inter font-bold text-tuatara-400">
                {course.visibility}
              </p>
            )}
          </div>

          {menuItems.length > 0 ? (
            <div className="flex items-center justify-center relative">
              <button
                className="cursor-pointer p-1 rounded-full hover:bg-bej-100"
                onClick={handleClick}
              >
                <EllipsisVerticalIcon
                  width={24}
                  strokeWidth={2}
                  className="text-tuatara-900"
                />
              </button>

              {menuVisibility && (
                <div className="absolute flex flex-col items-start py-1 bg-spring-white top-0 right-0 -translate-y-full rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      className="text-nowrap w-full text-start text-tuatura-900 text-[14px] font-inter font-medium cursor-pointer px-2 py-[2px] hover:bg-carnation-400 hover:text-bej-50"
                      onMouseUp={() => item.onClick(course)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Link
                href={
                  teacher
                    ? `/teacher/courses/${course.id}/view`
                    : `/student/courses/${course.id}/`
                }
              >
                <EyeIcon
                  width={24}
                  strokeWidth={2}
                  className="text-tuatara-900 hover:text-charade-950"
                ></EyeIcon>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
