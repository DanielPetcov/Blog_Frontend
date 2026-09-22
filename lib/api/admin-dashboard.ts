import "server-only";

import type { AdminDashboardData } from "@/lib/types/admin-dashboard";
import type { ApiResult } from "@/lib/types/api";
import { serverApiRequest } from "./server-api-request";

export function getAdminDashboard(
  accessToken: string,
): Promise<ApiResult<AdminDashboardData>> {
  return serverApiRequest<AdminDashboardData>({
    path: "admin/dashboard",
    accessToken,
    fallbackError: "Unable to load the admin dashboard.",
  });
}
