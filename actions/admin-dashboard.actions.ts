"use server";

import { getAdminDashboard } from "@/lib/api/admin-dashboard";
import type { AdminDashboardData } from "@/lib/types/admin-dashboard";
import type { ApiResult } from "@/lib/types/api";
import { getAccessToken, sessionExpiredResult } from "./action-auth";

export async function getAdminDashboardAction(): Promise<
  ApiResult<AdminDashboardData>
> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return sessionExpiredResult();
  }

  return getAdminDashboard(accessToken);
}
