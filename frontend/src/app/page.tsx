import { LogoutButton } from "@/components/auth/logout-button";
import Panel from "@/geometry_2d/components/panel";
import { PanelState } from "@/geometry_2d/Interfaces/types";
import {
  generateRandomPoint,
  generateRandomPoints,
} from "@/geometry_2d/lib/utility/generate";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const PANEL: PanelState = {
  id: "cadsfasddsa234",
  width: 300,
  height: 300,
  name: "Triangle",
  shapesData: generateRandomPoints(1000),
};

export default async function Home() {
  return (
    <div>
      <LogoutButton />
      <Link
        href="/auth"
        className="flex w-40  items-center gap-5 self-start rounded-lg bg-slate-200 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-slate-300 md:text-base"
      >
        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
      <Panel panel={PANEL} />
    </div>
  );
}
