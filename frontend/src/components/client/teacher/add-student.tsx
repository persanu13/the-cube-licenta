"use client";

import { addStudentToGroup } from "@/lib/actions/groups";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";

export default function AddStudent({ groupId }: { groupId: string }) {
  const [state, formAction, isPending] = useActionState(addStudentToGroup, {});
  return (
    <form action={formAction}>
      <input type="hidden" value={groupId} name="groupId" />
      <div className="flex gap-5">
        <div className="flex  min-w-[160px] bg-bej-100 gap-[10px] px-2 py-1 rounded-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
          <input
            name="studentId"
            placeholder="Student ID here!"
            className="peer/input w-full flex-1 placeholder:text-tuatara-400 outline-none bg-transparent"
          ></input>
        </div>
        <button
          className="flex gap-1 items-center w-fit px-4 py-1 rounded-sm  shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          bg-carnation-400 text-spring-white font-inter text-[14px] font-semibold cursor-pointer"
        >
          <p>Add Student</p>
          <PlusIcon width={18} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
