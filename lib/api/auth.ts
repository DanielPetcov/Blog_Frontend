import "server-only";

import type {
  AuthSession,
  LoginInput,
} from "@/lib/types/auth";
import type { ApiResult } from "@/lib/types/api";
import { serverApiRequest } from "./server-api-request";

export function login(data: LoginInput): Promise<ApiResult<AuthSession>> {
  return serverApiRequest({
    path: "auth/login",
    method: "POST",
    body: data,
    fallbackError: "Unable to sign in. Please try again later.",
    statusErrors: { 401: "Invalid email or password" },
  });
}
