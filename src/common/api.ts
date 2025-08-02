import axios, { AxiosRequestConfig } from 'axios';

const USER_AGENT = 'trendyol-yemek-mcp/1.0.0';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export function buildUrl(baseUrl: string, params: Record<string, any>): string {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });
  return url.toString();
}

export async function trendyolRequest<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
    ...options.headers,
  };

  // TODO: Add authorization. currently it's not working.
  if (process.env.TRENDYOL_API_KEY) {
    headers['Authorization'] = `Bearer ${process.env.TRENDYOL_API_KEY}`;
  }

  const config: AxiosRequestConfig = {
    method: options.method || 'GET',
    headers,
    data: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const response = await axios(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 0;
      const responseBody = error.response?.data;
      throw new Error(
        `API request failed with status ${status}. Body: ${responseBody}`
      );
    }
    throw error;
  }
}
