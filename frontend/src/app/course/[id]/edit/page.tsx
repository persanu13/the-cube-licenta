import ContentMaker from "@/components/client/course/content-maker";
import { fetchCourseContent } from "@/lib/actions/courses";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const initialContent = await fetchCourseContent(id);

  return (
    <ContentMaker
      courseId={id}
      initialContent={initialContent ? initialContent : []}
    />
  );
}
