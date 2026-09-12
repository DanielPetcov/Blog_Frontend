import { LoginForm, LoginResponse, LoginResponseData } from "../types/auth";

const API_URL = process.env.API_URL;

export async function loginRequest(data: LoginForm): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
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
