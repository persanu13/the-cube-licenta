"use client";

import { Course } from "@/lib/models/course";
import CourseCard from "../course-card";

export default function CoursesContainer({
  courses,
  teacher,
}: {
  courses?: Course[];
  teacher?: boolean;
}) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {courses &&
        courses.map((course) => (
          <CourseCard key={course.id} course={course} teacher={teacher} />
        ))}
    </div>
  );
}
