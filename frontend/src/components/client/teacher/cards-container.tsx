"use client";

import { Course } from "@/lib/models/course";
import CourseCard from "../course-card";
import { useRouter } from "next/navigation";
import { State } from "@/lib/models/types";
import { deleteCourse } from "@/lib/actions/courses";
import { useActionState, useState } from "react";
import DeleteModal from "@/components/common/modal";

export default function CoursesContainer({ courses }: { courses?: Course[] }) {
  const router = useRouter();
  const [courseId, setCourseId] = useState<string>("");
  const initialState: State = {};
  const deleteCourseWithId = deleteCourse.bind(null, courseId);
  const [state, formAction, isPending] = useActionState(
    deleteCourseWithId,
    initialState
  );

  const menuItems = [
    {
      name: "Edit content",
      onClick: (course: Course) => {
        router.push(`/course/${course.id}/edit`);
      },
    },
    {
      name: "Edit course",
      onClick: (course: Course) => {
        router.push(`/teacher/courses/${course.id}/edit`);
      },
    },
    {
      name: "View course",
      onClick: (course: Course) => {
        router.push(`/teacher/courses/${course.id}/view`);
      },
    },
    {
      name: "Delete course",
      onClick: (course: Course) => {
        setCourseId(course.id);
      },
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {courseId && (
        <DeleteModal
          message={`Are sure you want  to delete this course ?`}
          onClose={() => {
            setCourseId("");
          }}
          action={formAction}
        />
      )}
      {courses &&
        courses.map((course) => (
          <CourseCard key={course.id} course={course} menuItems={menuItems} />
        ))}
    </div>
  );
}
