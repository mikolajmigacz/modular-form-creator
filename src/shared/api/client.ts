import { apiBaseUrl } from './config'
import { ApiError } from './errors'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, headers, ...rest } = options
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const payload: unknown = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof (payload as { message: unknown }).message === 'string'
        ? (payload as { message: string }).message
        : `Request failed (${response.status})`
    const details =
      typeof payload === 'object' && payload !== null && 'details' in payload
        ? (payload as { details: unknown }).details
        : undefined
    throw new ApiError(response.status, message, details)
  }

  return payload as T
}
