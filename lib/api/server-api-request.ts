// lib/api/server-api-request.ts

import "server-only";

type QueryValue = string | number | boolean | null | undefined;

type ApiRequestOptions = {
  path: string;
  accessToken?: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  query?: Record<string, QueryValue>;
  body?: unknown;
  fallbackError: string;
  statusErrors?: Partial<Record<number, string>>;
};

type ApiRequestResult<T> =
  | {
      success: true;
      data: T;
      error?: never;
    }
  | {
      success: false;
      error: string;
      data?: never;
    };

const defaultStatusErrors: Partial<Record<number, string>> = {
  400: "The request contains invalid data.",
  401: "Your session has expired. Please sign in again.",
  403: "You don’t have permission to perform this action.",
  404: "The requested resource was not found.",
  409: "The request conflicts with existing data.",
  422: "The submitted data could not be processed.",
  429: "Too many requests. Please try again later.",
  500: "The server encountered an error. Please try again.",
  502: "The server is temporarily unavailable.",
  503: "The service is temporarily unavailable.",
};

function addQueryParameters(url: URL, query?: Record<string, QueryValue>) {
  if (!query) {
    return;
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    const normalizedValue =
      typeof value === "string" ? value.trim() : String(value);

    if (!normalizedValue) {
      return;
    }

    url.searchParams.set(key, normalizedValue);
  });
}

export async function serverApiRequest<T>({
  path,
  accessToken,
  method = "GET",
  query,
  body,
  fallbackError,
  statusErrors = {},
}: ApiRequestOptions): Promise<ApiRequestResult<T>> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return {
      success: false,
      error: "The server API is not configured.",
    };
  }

  try {
    const baseUrl = apiUrl.endsWith("/") ? apiUrl : `${apiUrl}/`;
    const url = new URL(path.replace(/^\//, ""), baseUrl);

    addQueryParameters(url, query);

    const headers = new Headers({
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    });

    if (body !== undefined) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        error:
          statusErrors[response.status] ??
          defaultStatusErrors[response.status] ??
          fallbackError,
      };
    }

    if (response.status === 204) {
      return {
        success: true,
        data: undefined as T,
      };
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return {
        success: true,
        data: undefined as T,
      };
    }

    const data = (await response.json()) as T;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API request failed: ${method} ${path}`, error);

    return {
      success: false,
      error: "We couldn’t reach the server. Please try again.",
    };
  }
}
