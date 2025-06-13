"use client";

import { createCourse } from "@/lib/actions/courses";
import { State } from "@/lib/models/types";
import { User } from "@/lib/models/user";
import Link from "next/link";
import { useActionState } from "react";

export default function UpdateUserForm({ user }: { user: User }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);
  return (
    <form action={formAction}>
      <div className="flex flex-col  gap-3 text-charade-950  ">
        <p className="font-jost font-medium text-[16px]">
          Your ID: <span className="text-[14px] font-inter"> {user.id}</span>
        </p>

        {/* User Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-jost font-medium text-[16px]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            defaultValue={user.name}
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
        <p className="font-jost font-medium text-[16px]">
          Role: <span className="text-[14px] font-inter"> {user.role}</span>
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          type="submit"
          className="px-3 py-[6px] bg-carnation-400 cursor-pointer rounded-[4px] text-[16px] font-inter font-semibold text-bej-100 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:opacity-80"
        >
          Save
        </button>
      </div>
    </form>
  );
}
