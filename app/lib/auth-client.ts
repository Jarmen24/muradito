import { signIn, signOut } from "next-auth/react";

export async function login(email: string, password: string) {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (!res) {
    return { success: false, error: "No response from server" };
  }

  if (res.error) {
    return { success: false, error: res.error };
  }

  return { success: true };
}

export async function logout() {
  await signOut({ redirect: false });
}
