export type ApiSuccess<T> = {
  success: true;
  data: T;
  error?: never;
};

export type ApiFailure = {
  success: false;
  error: string;
  data?: never;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
