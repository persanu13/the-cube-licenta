"use client";

import DeleteModal from "@/components/common/modal";
import { removeStudentFromGroup } from "@/lib/actions/groups";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useActionState, useState } from "react";

export default function DeleteStudentButton({
  groupId,
  studentId,
}: {
  groupId: string;
  studentId: string;
}) {
  const [visibility, setVisibility] = useState<boolean>(false);
  const removeCourseWithId = removeStudentFromGroup.bind(
    null,
    groupId,
    studentId
  );
  const [state, formAction, isPending] = useActionState(removeCourseWithId, {});
  return (
    <>
      {visibility && (
        <DeleteModal
          message={`Are sure you want  to remove this student ?`}
          onClose={() => {
            setVisibility(false);
          }}
          action={formAction}
        />
      )}
      <button onClick={() => setVisibility(true)}>
        <TrashIcon
          className="text-charade-950 cursor-pointer"
          width={20}
          strokeWidth={1.5}
        />
      </button>
    </>
  );
}
