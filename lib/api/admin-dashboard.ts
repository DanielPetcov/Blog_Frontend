import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AdminDashboardData } from "@/lib/types/admin-dashboard";

export async function getAdminDashboard(): Promise<AdminDashboardData> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error(
      "API_URL is required when dashboard fixture data is disabled.",
    );
  }

  const accessToken = (await cookies()).get("access_token")?.value;

  if (!accessToken) {
    redirect("/admin/login");
  }

  const response = await fetch(`${apiUrl}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/admin/login");
  }

  if (!response.ok) {
    throw new Error("Unable to load the admin dashboard.");
  }

  return response.json() as Promise<AdminDashboardData>;
}
