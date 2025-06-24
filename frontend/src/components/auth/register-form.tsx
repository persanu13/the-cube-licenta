"use client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { useActionState } from "react";

import { State } from "@/lib/models/types";
import AuthInput from "@/components/common/AuthInput";
import Button from "@/components/common/Button";
import { signUp } from "@/lib/actions/user";

export default function RegisterForm() {
  const initialState: State = { message: null };
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  return (
    <form action={formAction}>
      <div className="flex flex-col mt-3">
        <div className="flex flex-col gap-2">
          <AuthInput
            name="name"
            label="Name"
            placeholder="Enter your name"
            icon="user"
            required={true}
            type="text"
            defaultValue={state.values?.name.toString()}
            errors={state.errors?.name}
          />
          <AuthInput
            name="email"
            label="Email"
            placeholder="Enter your email address"
            icon="at"
            required={true}
            type="email"
            defaultValue={state.values?.email.toString()}
            errors={state.errors?.email}
          />
          <AuthInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            icon="key"
            required={true}
            type="password"
            errors={state.errors?.password}
          />
          <AuthInput
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            icon="key"
            required={true}
            type="password"
            errors={state.errors?.confirmPassword}
          />

          {/* User role */}
          <fieldset
            className="flex flex-col gap-1 "
            aria-describedby="subject-error"
          >
            <legend className="font-hanuman text-charade-950 text-sm ">
              User role
              <span className="text-carnation-600 ml-[2px]">*</span>
            </legend>
            <div className="flex gap-3 mt-1">
              <div className="flex items-center gap-1">
                <label
                  htmlFor="teacher"
                  className="text-[14px] cursor-pointer font-hanuman text-charade-950"
                >
                  Teacher
                </label>
                <input
                  id="teacher"
                  name="role"
                  type="radio"
                  value="TEACHER"
                  className="h-4 w-4 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-1">
                <label
                  htmlFor="student"
                  className="text-[14px] cursor-pointer font-hanuman text-charade-950"
                >
                  Student
                </label>
                <input
                  id="student"
                  name="role"
                  type="radio"
                  value="STUDENT"
                  className="h-4 w-4 cursor-pointer "
                />
              </div>
            </div>
            {state.errors?.role && state.errors?.role.length > 0 && (
              <div>
                {state.errors.role.map((eroor, index) => {
                  return (
                    <p
                      key={index}
                      className="text-carnation-600 font-light font-hanuman text-[14px]"
                    >
                      {eroor}
                    </p>
                  );
                })}
              </div>
            )}
          </fieldset>
        </div>

        {state.message && (
          <div
            className="flex items-center gap-1 px-1 mt-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-carnation-600" />
            <p
              className="text-sm font-inter font-light text-carnation-600"
              key={state.message}
            >
              {state.message}
            </p>
          </div>
        )}
        <Button
          className="mt-7"
          text="CREATE ACCOUNT"
          showIcon={false}
          disabled={isPending}
          aria-disabled={isPending}
        />
      </div>
    </form>
  );
}
