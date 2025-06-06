import { TCourseText } from "./content-maker";

export default function CourseText({ content }: { content: TCourseText }) {
  return (
    <div>
      <textarea
        placeholder={content.placeholder}
        defaultValue={content.value}
      ></textarea>
    </div>
  );
}
