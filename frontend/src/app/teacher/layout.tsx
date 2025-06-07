"use server";
import AdminNav from "@/components/admin/admin-nav";
import UserNav, { MenuItem } from "@/components/client/user-nav";
import { getAuth } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuth();
  if (!auth || (auth.role !== "TEACHER" && auth.role !== "ADMIN")) {
    notFound();
  }

  const menuItems: MenuItem[] = [
    { name: "HOME", href: "/teacher", iconName: "HomeIcon" },
    { name: "COURSES", href: "/teacher/courses", iconName: "DocumentTextIcon" },
    { name: "GROUPS", href: "/teacher/groups", iconName: "UsersIcon" },
    { name: "SETTINGS", href: "/teacher/settings", iconName: "Cog6ToothIcon" },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <UserNav menuItems={menuItems} />
      {children}
    </div>
  );
}
