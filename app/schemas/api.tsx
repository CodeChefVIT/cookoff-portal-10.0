export interface ApiResponse<T=unknown> {
  status: string;
  message: string;
  data?: unknown;
  error?:string;
}
