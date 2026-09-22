import "server-only";

import type {
  LoginForm,
  LoginResponse,
  LoginResponseData,
} from "@/lib/types/auth";

export async function loginRequest(data: LoginForm): Promise<LoginResponse> {
  const apiUrl = process.env.API_URL;

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: "Server error. Please try again later.",
      };
    }

    const result: LoginResponseData = await response.json();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Backend unavailable:", error);

    return {
      success: false,
      error: "Unable to connect to the server.",
    };
  }
}
