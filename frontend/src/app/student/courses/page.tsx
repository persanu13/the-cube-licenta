import SearchBar from "@/components/common/search-bar";

import Select from "@/components/common/select";
import { fetchStudentCourses } from "@/lib/actions/courses";
import { Course } from "@/lib/models/course";
import { getAuth } from "@/lib/auth/auth";
import CoursesContainer from "@/components/client/student/courses-container";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    subject?: string;
    visibility?: string;
  }>;
}) {
  const auth = await getAuth();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const subject = searchParams?.subject || "";

  const courses: Course[] = await fetchStudentCourses(
    auth?.userId!,
    query,
    subject
  );

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-8">
      <div className="flex flex-col gap-5  w-full mx-auto">
        <h1 className="font-hanuman text-[20px]">My Courses</h1>

        <div className="flex flex-wrap gap-4 justify-start w-fit">
          <SearchBar
            className="bg-spring-white px-4 py-2 flex-1"
            placeholder="Search courses..."
          />
          <div className="flex gap-5 flex-1">
            <Select
              name="subject"
              options={["Subject", "Geometry", "Algebra"]}
              className="bg-spring-white px-2 py-1  min-w-[100px]  flex-1"
            />
          </div>
        </div>
        <CoursesContainer courses={courses} />
      </div>
    </main>
  );
}
