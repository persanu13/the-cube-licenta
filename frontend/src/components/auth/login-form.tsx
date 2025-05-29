"use client";

import { signIn } from "@/lib/auth/signin";
import { State } from "@/lib/models/types";
import AuthInput from "@/ui/AuthInput";
import Button from "@/ui/Button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { useActionState } from "react";

export default function LoginForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <AuthInput
            name="email"
            label="Email"
            placeholder="Enter your email address"
            icon="at"
            defaultValue={state.values?.email}
            required={true}
            type="email"
          />
          <AuthInput
            name="password"
            label="Password"
            placeholder="Enter password"
            icon="key"
            required={true}
            type="password"
          />
        </div>
        {state.message && (
          <div
            className="flex items-center gap-1 px-1 mt-1"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5 text-carnation-600" />
            <p className="text-sm font-inter font-light text-carnation-600">
              {state.message}
            </p>
          </div>
        )}
        <Button
          className="mt-7"
          text="LOG IN"
          showIcon={false}
          disabled={isPending}
          aria-disabled={isPending}
        />
      </div>
    </form>
  );
}
