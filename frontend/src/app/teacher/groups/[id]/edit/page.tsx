import EditForm from "@/components/client/teacher/edit-group";
import { fetchGroup } from "@/lib/actions/groups";
import { Group } from "@/lib/models/group";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const groupId = params.id;
  const group: Group = await fetchGroup(groupId);

  if (!group) {
    notFound();
  }
  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12">
      <h1 className="text-charade-950  text-[20px] font-hanuman">
        My Groups / Edit
      </h1>
      <EditForm group={group} />
    </main>
  );
}
