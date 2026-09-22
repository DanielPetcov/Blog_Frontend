"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginInput } from "@/lib/types/auth";
import { login } from "@/lib/api/auth";

export async function loginAction(data: LoginInput) {
  const response = await login(data);

  if (!response.success) {
    return response;
  }

  const cookieStore = await cookies();

  cookieStore.set("access_token", response.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");

  redirect("/admin/login");
}
