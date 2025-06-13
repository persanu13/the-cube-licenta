"use client";

import { Course } from "@/lib/models/course";
import CourseCard from "../course-card";

export default function CoursesContainer({ courses }: { courses?: Course[] }) {
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {courses &&
        courses.map((course) => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}
