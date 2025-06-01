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
  if (!auth || auth.role !== "ADMIN") {
    notFound();
  }

  return (
    <div className="flex h-screen  overflow-hidden bg-bej-100">
      <AdminNav />
      <div className="flex-grow p-12 overflow-y-auto ">{children}</div>
    </div>
  );
}
