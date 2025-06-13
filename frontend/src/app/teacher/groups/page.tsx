import SearchBar from "@/components/common/search-bar";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { fetchTheachersGroups } from "@/lib/actions/groups";
import { Group } from "@/lib/models/group";
import GroupCard from "@/components/client/group-card";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    subject?: string;
    visibility?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const groups: Group[] = await fetchTheachersGroups(query);

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-8">
      <div className="flex flex-col gap-5  w-full mx-auto">
        <h1 className="font-hanuman text-[20px]">My Groups</h1>
        <Link
          href={"/teacher/groups/create"}
          className="flex gap-1 items-center w-fit px-4 py-2 rounded-sm  shadow-[0_2px_4px_rgba(0,0,0,0.25)]
          bg-carnation-400 text-spring-white font-inter text-[14px] font-semibold cursor-pointer"
        >
          <p>Create</p>
          <PlusIcon width={18} strokeWidth={2} />
        </Link>
        <div className="flex flex-wrap gap-4 justify-start w-fit">
          <SearchBar
            className="bg-spring-white px-4 py-2 flex-1"
            placeholder="Search group..."
          />
        </div>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {groups &&
            groups.map((group) => <GroupCard key={group.id} group={group} />)}
        </div>
      </div>
    </main>
  );
}
