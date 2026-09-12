"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginForm } from "@/lib/types/auth";
import { loginRequest } from "@/lib/api/auth";

export async function loginAction(data: LoginForm) {
  const { access_token } = await loginRequest(data);

  const cookieStore = await cookies();

  cookieStore.set("access_token", access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/admin");
}
