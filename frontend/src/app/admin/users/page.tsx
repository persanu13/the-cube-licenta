import Pagination from "@/components/admin/pagination";
import SearchBar from "@/components/admin/search-bar";
import ShowRows from "@/components/admin/show-rows";
import SelectRole from "@/components/admin/users/select-role";
import UsersTable from "@/components/admin/users/users-table";
import { countUsers } from "@/lib/actions/user";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    role?: string;
    page?: string;
    rows?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const role = searchParams?.role || "";
  const currentPage = Number(searchParams?.page) || 1;
  const rows = Number(searchParams?.rows) || 10;
  const totalUsers = await countUsers("", "");
  const filtredUsers = await countUsers(query, role);
  const totalPages = Math.ceil(filtredUsers / rows);
  return (
    <main className="flex flex-col h-full w-full gap-2 bg-bej-100 px-6 pt-6 pb-8 lg:px-12">
      <h1 className="font-hanuman text-xl text-charade-950">Users</h1>
      <div className="flex flex-col bg-spring-white px-5 pt-5 pb-6 rounded-[8px] h-full flex-1 gap-5 overflow-hidden  shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="font-inter text-[16px] font-medium text-charade-950">{`Users(${totalUsers})`}</h2>
        <div className="flex gap-5">
          <SearchBar placeholder="Search users..." />
          <SelectRole />
        </div>
        <UsersTable
          query={query}
          role={role}
          currentPage={currentPage}
          rows={rows}
        />
        <div className="flex justify-between">
          <Pagination totalPages={totalPages} />
          <ShowRows />
        </div>
      </div>
    </main>
  );
}
