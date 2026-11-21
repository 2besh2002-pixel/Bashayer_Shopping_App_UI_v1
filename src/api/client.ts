/**
 * Centralized API client.
 *
 * No backend is connected at this stage. This module exists so that when a real
 * Middleware API is introduced, every network call flows through one place with
 * consistent base URL, headers, timeout and error normalisation. The mock
 * repositories in src/repositories do NOT use this client today.
 *
 * SECURITY: never place Salla / Middleware secret keys here. Only a public
 * base URL and per-request user access token belong on the device.
 */

export interface ApiConfig {
  /** Public base URL supplied by the store backend. Empty until configured. */
  baseUrl: string;
  timeoutMs?: number;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  /** Short-lived user access token (kept in SecureStore, never hardcoded). */
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined>;
}

const DEFAULT_CONFIG: ApiConfig = { baseUrl: "", timeoutMs: 15000 };

let config: ApiConfig = DEFAULT_CONFIG;

export function configureApi(next: Partial<ApiConfig>): void {
  config = { ...config, ...next };
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const base = config.baseUrl.replace(/\/$/, "");
  const url = `${base}${path}`;
  if (!query) return url;
  const usp = Object.entries(query)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return usp ? `${url}?${usp}` : url;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, query } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const res = await fetch(buildUrl(path, query), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new ApiError(`Request failed with status ${res.status}`, res.status);
    }
    const text = await res.text();
    return (text ? JSON.parse(text) : undefined) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(err instanceof Error ? err.message : "Network error");
  } finally {
    clearTimeout(timer);
  }
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "POST", body }),
};