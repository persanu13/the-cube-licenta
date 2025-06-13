import UpdateUserForm from "@/components/settings/form";
import { me } from "@/lib/auth/auth";
import { User } from "@/lib/models/user";

export default async function Page() {
  const user: User = await me();

  return (
    <main className="flex flex-col gap-5 h-full w-full bg-bej-100 px-6 pt-6 lg:px-12 overflow-auto pb-8">
      <div className="flex flex-col gap-5  w-full mx-auto">
        <h1 className="font-hanuman text-[20px]">Settings</h1>
        <div className="flex flex-col px-5 py-2 gap-4 bg-spring-white rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <h2 className="font-hanuman text-[18px]">Personal Information </h2>
          <UpdateUserForm user={user} />
          <div>
            <button
              type="submit"
              className="px-3 py-[6px] bg-border cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
            >
              Get Teacher Role
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
