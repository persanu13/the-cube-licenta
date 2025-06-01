"use client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { useActionState } from "react";

import { State } from "@/lib/models/types";
import AuthInput from "@/components/common/AuthInput";
import Button from "@/components/common/Button";
import signUp from "@/lib/actions/user";

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
            defaultValue={state.values?.name}
            errors={state.errors?.name}
          />
          <AuthInput
            name="email"
            label="Email"
            placeholder="Enter your email address"
            icon="at"
            required={true}
            type="email"
            defaultValue={state.values?.email}
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
