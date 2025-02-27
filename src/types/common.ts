export enum ThemeEnum {
  dark = "dark",
  light = "light",
}

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
}

export interface ApiSuccessResponse<T> {
  isSuccess: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  isSuccess: false;
  error: ErrorResponse;
}

export type CustomApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ErrorResponse {
  message: string;
}

export interface RegisterInfoResponse {
  userName: string;
  email: string;
  accessToken: string;
}

export interface CustomSelectOptions {
  label: string;
  value: string;
}
