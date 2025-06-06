import CreateForm from "@/components/client/teacher/create-form";

export default async function Page() {
  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12">
      <h1 className="text-charade-950  text-[20px] font-hanuman">
        My Courses / Create
      </h1>
      <CreateForm />
    </main>
  );
}
