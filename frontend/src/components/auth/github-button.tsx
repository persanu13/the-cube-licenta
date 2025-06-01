"use client";

import { githubAuth } from "@/lib/auth/auth";
import Image from "next/image";

export default function GithubButton() {
  return (
    <form action={githubAuth}>
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
    </form>
  );
}
