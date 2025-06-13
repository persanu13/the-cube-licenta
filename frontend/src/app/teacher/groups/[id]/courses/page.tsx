import CourseCard from "@/components/client/course-card";
import AddCourse from "@/components/client/teacher/add-course";
import CoursesContainer from "@/components/client/teacher/group-courses-container";
import SearchBar from "@/components/common/search-bar";
import { fetchTheachersCourses } from "@/lib/actions/courses";
import { fetchGroup, fetchGroupCourses } from "@/lib/actions/groups";
import { Course } from "@/lib/models/course";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const groupId = params.id;
  const group = await fetchGroup(groupId);
  const teacherCourses: Course[] = await fetchTheachersCourses("", "", "");
  const courses: Course[] = await fetchGroupCourses(groupId);

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-8">
      <div className="flex flex-col gap-5  w-full mx-auto">
        <h1 className="font-hanuman text-[20px]">
          My Groups / {group.name} / Courses
        </h1>
        <AddCourse
          courses={teacherCourses.filter(
            (course) => !courses.some((c) => c.id === course.id)
          )}
          groupId={groupId}
        />
        <div className="flex flex-wrap gap-4 justify-start w-fit">
          <SearchBar
            className="bg-spring-white px-4 py-2 flex-1"
            placeholder="Search group..."
          />
        </div>
        <CoursesContainer courses={courses} groupId={groupId} />
      </div>
    </main>
  );
}
