import SearchBar from "@/components/common/search-bar";
import CourseCard from "@/components/client/course-card";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Select from "@/components/common/select";
import { fetchTheachersCourses } from "@/lib/actions/courses";
import { Course } from "@/lib/models/course";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    subject?: string;
    visibility?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const subject = searchParams?.subject || "";
  const visibility = searchParams?.visibility || "";
  const courses: Course[] = await fetchTheachersCourses(
    query,
    subject,
    visibility
  );

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-8">
      <div className="flex flex-col gap-5  w-full mx-auto">
        <h1 className="font-hanuman text-[20px]">My Courses</h1>
        <Link
          href={"/teacher/courses/create"}
          className="flex gap-1 items-center w-fit px-4 py-2 rounded-sm  shadow-[0_2px_4px_rgba(0,0,0,0.25)]
          bg-carnation-400 text-spring-white font-inter text-[14px] font-semibold cursor-pointer"
        >
          <p>Create</p>
          <PlusIcon width={18} strokeWidth={2} />
        </Link>
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
            <Select
              name="visibility"
              options={["Visibility", "Public", "Private"]}
              className="bg-spring-white px-2 py-[6px]  min-w-[100px]  flex-1"
            />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
}
