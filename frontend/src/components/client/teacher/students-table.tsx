import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { fetchUsers } from "@/lib/actions/user";
import { User } from "@/lib/models/user";
import { fetchGroupStudents } from "@/lib/actions/groups";
import DeleteStudentButton from "./delete-student-button";

export default async function StudentsTable({
  groupId,
  students,
}: {
  groupId: string;
  students: User[];
}) {
  return (
    <table className=" w-full flex flex-1 flex-col gap-[4px]  overflow-auto ">
      <thead className="sticky top-0 bg-spring-white z-10">
        <tr className=" w-full flex items-center text-[14px] d gap-1 text-charade-950 font-medium font-jost py-[3px] ">
          <th className="w-[clamp(100px,60%,300px)] text-left">Account</th>
          <th className="w-[clamp(40px,20%,50px)] text-left ml-auto ">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="flex flex-col gap-[4px]">
        {students?.map((user) => (
          <tr
            key={user.id}
            className="flex items-center  gap-1 py-[8px] border-t-[4px] border-[#FFFAFA]"
          >
            <td className="w-[clamp(100px,60%,300px)]">
              <div className="flex gap-[10px] items-center ">
                <Image
                  src={user.image || "/default-user.png"}
                  width={30}
                  height={30}
                  alt="User avatar"
                  className="rounded-full"
                ></Image>
                <div className="flex flex-col justify-center ">
                  <p className="font-inter font-medium text-charade-950 text-[14px] ">
                    {user.name}
                  </p>
                  <p className=" font-inter text-[12px] text-tuatara-900 opacity-50 ">
                    {user.email}
                  </p>
                </div>
              </div>
            </td>

            <td className="w-[clamp(40px,20%,50px)] ml-auto flex justify-center">
              <DeleteStudentButton
                groupId={groupId}
                studentId={user.id}
              ></DeleteStudentButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
