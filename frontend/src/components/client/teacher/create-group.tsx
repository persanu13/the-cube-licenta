"use client";

import { createGroup } from "@/lib/actions/groups";
import { State } from "@/lib/models/types";
import Link from "next/link";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = {};
  const [state, formAction] = useActionState(createGroup, initialState);
  return (
    <form action={formAction}>
      <div className="flex flex-col rounded-md bg-bej-50 px-4 py-5 gap-3 text-charade-950 shadow-[0_4px_4px_rgba(0,0,0,0.25)] ">
        {/* Course Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-jost font-medium text-[16px]">
            Chooshe group name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Group name"
            aria-describedby="name-error"
            className="px-2 py-2 text-[14px] font-inter rounded-[2px] bg-spring-white
            outline-1 outline-tuatara-400 placeholder:text-tuatara-400 "
          ></input>
          {state.errors?.name && state.errors?.name.length > 0 && (
            <div>
              {state.errors.name.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        {/* Course Color */}
        <div className="flex flex-col gap-1 w-fit">
          <label htmlFor="color" className="font-jost font-medium text-[16px]">
            Chooshe group color
          </label>
          <input
            id="color"
            name="color"
            type="color"
            defaultValue="#FF6868"
            aria-describedby="color-error"
            className="cursor-pointer w-full h-[36px]"
          ></input>
          {state.errors?.color && state.errors?.color.length > 0 && (
            <div>
              {state.errors.color.map((eroor, index) => {
                return (
                  <p
                    key={index}
                    className="text-carnation-600 font-light text-[14px]"
                  >
                    {eroor}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <Link
          className="px-3 py-[6px] bg-border rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
          href="/teacher/groups"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-3 py-[6px] bg-carnation-400 cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
        >
          Create Group
        </button>
      </div>
    </form>
  );
}
