"use server";
import UserNav, { MenuItem } from "@/components/client/user-nav";
import { getAuth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";

import {
  UsersIcon,
  Cog6ToothIcon,
  HomeIcon,
  DocumentTextIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems: MenuItem[] = [
    { name: "HOME", href: "/student", iconName: "HomeIcon" },
    {
      name: "COURSES",
      href: "/student/courses",
      iconName: "DocumentTextIcon",
    },
    { name: "SETTINGS", href: "/student/settings", iconName: "Cog6ToothIcon" },
  ];

  const auth = await getAuth();
  if (!auth || (auth.role !== "STUDENT" && auth.role !== "ADMIN")) {
    notFound();
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bej-100">
      <UserNav menuItems={menuItems} />
      {children}
    </div>
  );
}
