import axios, { AxiosError } from "axios";
import { API_BASE_URL, API_KEY, MEMBER_ID } from "./constants.js";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

if (MEMBER_ID) {
  headers["X-Member-Id"] = MEMBER_ID;
}

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers,
});

export interface ApiResponse<T = unknown> {
  data: T;
  links?: { first: string; last: string; prev: string | null; next: string | null };
  meta?: { current_page: number; last_page: number; per_page: number; total: number };
}

export async function apiGet<T = unknown>(
  path: string,
  params?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  const res = await client.get<ApiResponse<T>>(path, { params });
  return res.data;
}

export async function apiPost<T = unknown>(
  path: string,
  data?: Record<string, unknown>
): Promise<{ data: T }> {
  const res = await client.post<{ data: T }>(path, data);
  return res.data;
}

export async function apiPut<T = unknown>(
  path: string,
  data?: Record<string, unknown>
): Promise<{ data: T }> {
  const res = await client.put<{ data: T }>(path, data);
  return res.data;
}

export async function apiDelete(path: string): Promise<void> {
  await client.delete(path);
}

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const body = error.response?.data as Record<string, unknown> | undefined;
    const apiError = body?.error as Record<string, unknown> | undefined;

    if (apiError?.message) {
      return `Error (${status}): ${apiError.message}`;
    }

    switch (status) {
      case 401:
        return "Error: Invalid API key. Check XCANNY_API_KEY environment variable.";
      case 403:
        return "Error: Permission denied for this resource.";
      case 404:
        return "Error: Resource not found. Check the ID is correct.";
      case 422:
        return `Error: Validation failed. ${JSON.stringify(apiError?.errors || body)}`;
      case 429:
        return "Error: Rate limit exceeded (60 req/min). Wait before retrying.";
      default:
        return `Error: API request failed with status ${status}.`;
    }
  }
  return `Error: ${error instanceof Error ? error.message : String(error)}`;
}
