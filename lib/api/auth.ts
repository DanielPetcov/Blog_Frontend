import { LoginForm, LoginResponse } from "../types/auth";

const API_URL = process.env.API_URL;

export async function loginRequest(data: LoginForm): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}
