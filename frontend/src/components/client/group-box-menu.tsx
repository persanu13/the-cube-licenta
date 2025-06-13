"use client";
import DeleteModal from "@/components/common/modal";
import { deleteGroup } from "@/lib/actions/groups";
import { State } from "@/lib/models/types";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

export default function BoxMenu({
  groupId,
  visibility,
}: {
  groupId: string;
  visibility: boolean;
}) {
  const router = useRouter();
  const [modalVisibility, setModalVisibility] = useState(false);
  const initialState: State = {};
  const deleteGroupWithId = deleteGroup.bind(null, groupId);
  const [state, formAction, isPending] = useActionState(
    deleteGroupWithId,
    initialState
  );

  const menuItems = [
    {
      name: "Edit group",
      onClick: () => {
        router.push(`/teacher/groups/${groupId}/edit`);
      },
    },
    {
      name: "View courses",
      onClick: () => {
        router.push(`/teacher/groups/${groupId}/courses`);
      },
    },
    {
      name: "View students",
      onClick: () => {
        router.push(`/teacher/groups/${groupId}/students`);
      },
    },
    {
      name: "Delete group",
      onClick: () => {
        setModalVisibility(true);
      },
    },
  ];

  return (
    <>
      <p>{state.message}</p>
      {modalVisibility && (
        <DeleteModal
          message={`Are sure you want  to delete this group ?`}
          onClose={() => {
            setModalVisibility(false);
          }}
          action={formAction}
        />
      )}

      {visibility && (
        <div className="absolute flex flex-col items-start py-1 bg-spring-white top-0 right-0 -translate-y-full rounded  shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          {menuItems.map((item) => {
            return (
              <button
                key={item.name}
                className="text-nowrap w-full text-start text-tuatura-900 text-[14px] font-inter font-medium cursor-pointer px-2 py-[2px] hover:bg-carnation-400 hover:text-bej-50 "
                onMouseUp={() => {
                  item.onClick();
                }}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
