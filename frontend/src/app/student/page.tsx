import SearchBar from "@/components/common/search-bar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Group } from "@/lib/models/group";
import GroupCard from "@/components/client/group-card";
import { Course } from "@/lib/models/course";
import {
  countPublicCourses,
  fetchPublicCourses,
  fetchStudentCourses,
  fetchTheachersCourses,
} from "@/lib/actions/courses";
import { getAuth } from "@/lib/auth/auth";
import CoursesContainer from "@/components/client/student/courses-container";
import Select from "@/components/common/select";
import Pagination from "@/components/admin/pagination";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    subject?: string;
    page?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const subject = searchParams?.subject || "";
  const page = searchParams?.page || 1;

  const courses: Course[] = await fetchPublicCourses(query, subject, page);
  const totalCourses = await countPublicCourses(query, subject);

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-12">
      <h1 className="font-hanuman text-[20px]">Home</h1>
      <div className="flex flex-col gap-5  w-full pnpmx-auto bg-spring-white px-5 py-6 rounded shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <h1 className="font-hanuman text-[20px]">Public Courses</h1>
        <div className="flex flex-wrap gap-4 justify-start w-fit mb-4">
          <SearchBar
            className=" px-4 py-2 flex-1"
            placeholder="Search courses..."
          />
          <div className="flex gap-5 flex-1">
            <Select
              name="subject"
              options={["Subject", "Geometry", "Algebra"]}
              className=" px-2 py-1  min-w-[100px]  flex-1"
            />
          </div>
        </div>
        <CoursesContainer courses={courses} />
        <Pagination totalPages={Math.ceil(totalCourses / 10)} />
      </div>
    </main>
  );
}
