"use client";

import { signOut } from "@/lib/auth/sign-out";

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button type="submit">LogOut</button>
    </form>
  );
}
