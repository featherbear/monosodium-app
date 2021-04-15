export type Response<T = any> =
  | { status: true; data?: T }
  | { status: false; error?: string };

export default Response;

export function createResponse<T>(status: true, data?: T): Response<T>;
export function createResponse(status: false, error?: string): Response;
export function createResponse<T>(
  status: boolean,
  data_or_error?: T
): Response<T> {
  if (status) {
    return {
      status: true,
      data: data_or_error,
    };
  } else {
    return {
      status: false,
      error: String(data_or_error),
    };
  }
}
