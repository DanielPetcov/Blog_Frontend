import "server-only";

import { cookies } from "next/headers";
import type { ApiResult } from "@/lib/types/api";

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get("access_token")?.value ?? null;
}

export function sessionExpiredResult(): ApiResult<never> {
  return {
    success: false,
    error: "Your session has expired. Please sign in again.",
  };
}
