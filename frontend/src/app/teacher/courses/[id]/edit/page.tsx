import EditForm from "@/components/client/teacher/edit-form";
import { fetchCourse } from "@/lib/actions/courses";
import { Course } from "@/lib/models/course";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const coursId = params.id;
  const course: Course = await fetchCourse(coursId);

  if (!course) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12">
      <h1 className="text-charade-950  text-[20px] font-hanuman">
        My Courses / Edit
      </h1>
      <EditForm course={course} />
    </main>
  );
}
