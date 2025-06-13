import SearchBar from "@/components/common/search-bar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { fetchTheachersGroups } from "@/lib/actions/groups";
import { Group } from "@/lib/models/group";
import GroupCard from "@/components/client/group-card";
import { Course } from "@/lib/models/course";
import { fetchTheachersCourses } from "@/lib/actions/courses";
import CourseCard from "@/components/client/course-card";
import CoursesContainer from "@/components/client/teacher/cards-container";

export default async function Page() {
  const groups: Group[] = await fetchTheachersGroups("");
  const courses: Course[] = await fetchTheachersCourses("", "", "");

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-12">
      <h1 className="font-hanuman text-[20px]">Home</h1>
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
        <CoursesContainer courses={courses}></CoursesContainer>
      </div>
    </main>
  );
}
