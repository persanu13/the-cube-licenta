import Pagination from "@/components/admin/pagination";
import SearchBar from "@/components/common/search-bar";
import ShowRows from "@/components/admin/show-rows";
import Select from "@/components/common/select";
import UsersTable from "@/components/admin/users/users-table";
import { countUsers } from "@/lib/actions/user";
import StudentsTable from "@/components/client/teacher/students-table";
import { PlusIcon } from "lucide-react";
import AddStudent from "@/components/client/teacher/add-student";
import { User } from "@/lib/models/user";
import { fetchGroupStudents } from "@/lib/actions/groups";

export default async function Page(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    rows?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const groupId = params.id;
  const query = searchParams?.query || "";

  const students: User[] = await fetchGroupStudents(groupId);
  const currentPage = Number(searchParams?.page) || 1;
  const rows = Number(searchParams?.rows) || 10;

  const totalUsers = students.length || 0;
  const totalPages = Math.ceil(totalUsers / rows);

  const filteredStudents = query
    ? students.filter((student) =>
        student.name.toLowerCase().includes(query.toLowerCase())
      )
    : students;

  const startIndex = (currentPage - 1) * rows;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + rows
  );
  return (
    <main className="flex flex-col h-full w-full gap-2 bg-bej-100 px-6 pt-6 pb-8 lg:px-12">
      <h1 className="font-hanuman text-xl text-charade-950">
        Groups / Group Name / Students
      </h1>
      <div className="flex flex-col bg-spring-white px-5 pt-5 pb-6 rounded-[8px] h-full flex-1 gap-5 overflow-hidden  shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="font-inter text-[16px] font-medium text-charade-950">{`Students(${totalUsers})`}</h2>

        <AddStudent groupId={groupId} />

        <div className="flex gap-5">
          <SearchBar placeholder="Search students..." />
        </div>
        <StudentsTable
          students={paginatedStudents}
          groupId={groupId}
        ></StudentsTable>
        <div className="flex justify-between">
          <Pagination totalPages={totalPages} />
          <ShowRows />
        </div>
      </div>
    </main>
  );
}
