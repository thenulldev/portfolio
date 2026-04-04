import { NextResponse } from 'next/server';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

interface ApiRouteHandlerOptions {
  endpoint: string;
  errorMessage: string;
  timeout?: number;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = 15000
  } = options;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const requestOptions: RequestInit = {
      method,
      headers: {
        'content-type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ...headers,
      },
      signal: controller.signal,
    };

    if (body && method !== 'GET') {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, requestOptions);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);

    return {
      data: null as T,
      error: error instanceof Error ? error.message : 'An error occurred',
      status: 500,
    };
  }
}

export async function getApiData<T>(endpoint: string, timeout?: number): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, { timeout });
}

/**
 * Creates a standardized Next.js API route handler for proxying external APIs.
 * Eliminates duplicate boilerplate code across API routes.
 * 
 * @param options - Configuration options for the API route
 * @returns A Next.js route handler function
 * 
 * @example
 * // In your route.ts file:
 * import { createApiRouteHandler } from '@/lib/api';
 * 
 * export const GET = createApiRouteHandler({
 *   endpoint: 'https://api.example.com/data',
 *   errorMessage: 'Failed to fetch data from example API'
 * });
 */
export function createApiRouteHandler<T>(options: ApiRouteHandlerOptions) {
  const { endpoint, errorMessage, timeout = 15000 } = options;

  return async function GET(): Promise<NextResponse> {
    try {
      const response = await getApiData<T>(endpoint, timeout);

      if (response.error) {
        console.error(`Error in API route: ${errorMessage}`, response.error);
        return NextResponse.json(
          { error: errorMessage },
          { status: response.status || 500 }
        );
      }

      return NextResponse.json(response.data);
    } catch (error) {
      console.error(`Unexpected error in API route:`, error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}
