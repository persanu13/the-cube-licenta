"use client";

import Image from "next/image";
import { useActionState } from "react";

export default function GithubButton() {
  const [errorMsgGithub, formAction] = useActionState(githubAuth, undefined);
  return (
    <form action={formAction}>
      <button
        className="flex gap-1 justify-center items-center w-full px-1 py-2 text-xl font-jost border-[2]
       border-charade-950 rounded-sm font-medium cursor-pointer"
      >
        <Image
          src="/github-mark.svg"
          alt="github logo"
          width={20}
          height={20}
        />
        <p>Continue with GitHub</p>
      </button>
      <p className="mt-1 text-sm font-hanuman font-light text-carnation-600">
        {errorMsgGithub}
      </p>
    </form>
  );
}
