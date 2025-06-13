"use client";

import { Course } from "@/lib/models/course";
import CourseCard from "../course-card";
import { useRouter } from "next/navigation";
import { State } from "@/lib/models/types";
import { deleteCourse } from "@/lib/actions/courses";
import { useActionState, useState } from "react";
import DeleteModal from "@/components/common/modal";
import { removeCourseFromGroup } from "@/lib/actions/groups";

export default function CoursesContainer({
  groupId,
  courses,
}: {
  groupId: string;
  courses?: Course[];
}) {
  const router = useRouter();
  const [courseId, setCourseId] = useState<string>("");
  const initialState: State = {};
  const removeCourseWithId = removeCourseFromGroup.bind(
    null,
    groupId,
    courseId
  );
  const [state, formAction, isPending] = useActionState(
    removeCourseWithId,
    initialState
  );

  const menuItems = [
    {
      name: "View course",
      onClick: (course: Course) => {
        console.log(course.id);
        router.push(`/teacher/courses/${course.id}/view`);
      },
    },
    {
      name: "Remove course",
      onClick: (course: Course) => {
        setCourseId(course.id);
      },
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {courseId && (
        <DeleteModal
          message={`Are sure you want  to remove this course ?`}
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
