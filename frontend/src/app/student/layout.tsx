"use server";
import AdminNav from "@/components/admin/admin-nav";
import { getAuth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuth();
  if (!auth || auth.role !== "STUDENT") {
    notFound();
  }
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <AdminNav />
      {children}
    </div>
  );
}
