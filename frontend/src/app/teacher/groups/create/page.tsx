import CreateGroup from "@/components/client/teacher/create-group";

export default async function Page() {
  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12">
      <h1 className="text-charade-950  text-[20px] font-hanuman">
        My Groups / Create
      </h1>
      <CreateGroup />
    </main>
  );
}
