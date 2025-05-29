import { SERVER_URL } from "../secrets";

export async function signOut() {
  try {
    console.log("1");
    const res = await fetch(`${SERVER_URL}/api/auth/signout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) throw new Error("Undefined errror.");
  } catch (e) {
    console.error(e);
  }
}
