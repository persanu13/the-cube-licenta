"use server";
import AdminNav from "@/components/admin/admin-nav";
import UserNav from "@/components/client/user-nav";
import { getAuth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuth();
  if (!auth || (auth.role !== "TEACHER" && auth.role !== "ADMIN")) {
    notFound();
  }
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <UserNav />
      {children}
    </div>
  );
}
