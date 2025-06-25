import SearchBar from "@/components/common/search-bar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { fetchTheachersGroups } from "@/lib/actions/groups";
import { Group } from "@/lib/models/group";
import GroupCard from "@/components/client/group-card";
import { Course } from "@/lib/models/course";
import {
  countPublicCourses,
  fetchPublicCourses,
  fetchTheachersCourses,
} from "@/lib/actions/courses";
import CourseCard from "@/components/client/course-card";
import Select from "@/components/common/select";
import Pagination from "@/components/admin/pagination";
import CoursesContainerStudent from "@/components/client/student/courses-container";
import CoursesContainerTeacher from "@/components/client/teacher/cards-container";

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
  const groups: Group[] = await fetchTheachersGroups("");
  const myCourses: Course[] = await fetchTheachersCourses("", "", "");

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
        <CoursesContainerStudent courses={courses} teacher={true} />
        <Pagination totalPages={Math.ceil(totalCourses / 10)} />
      </div>
      <div className="flex flex-col gap-5  w-full pnpmx-auto bg-spring-white px-5 py-6 rounded shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <h1 className="font-hanuman text-[20px]">My Groups</h1>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {groups &&
            groups
              .slice(0, 5)
              .map((group) => <GroupCard key={group.id} group={group} />)}
        </div>
      </div>
      <div className="flex flex-col gap-5  w-full mx-auto bg-spring-white px-5 py-6 rounded shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <h1 className="font-hanuman text-[20px]">My Courses</h1>
        <CoursesContainerTeacher courses={myCourses}></CoursesContainerTeacher>
      </div>
    </main>
  );
}
