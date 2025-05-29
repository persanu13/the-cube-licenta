import { LogoutButton } from "@/components/auth/logout-button";
import { getAuth } from "@/lib/auth/get-auth";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Home() {
  const auth = await getAuth();
  console.log(auth);
  return (
    <div>
      <LogoutButton />
      <Link
        href="/auth"
        className="flex w-40  items-center gap-5 self-start rounded-lg bg-slate-200 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-slate-300 md:text-base"
      >
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </div>
  );
}
