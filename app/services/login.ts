import { type loginFormSchema } from "../schemas/forms/login";
import { type z } from "zod";
import api from ".";
import { ApiResponse } from "../schemas/api";
import { handleAPIError } from "@/lib/error";
interface LoginData {
  username: string;
  round: number;
  score: number;
}

export async function login(body: z.infer<typeof loginFormSchema>) {
  try {
    const { data } = await api.post<ApiResponse<LoginData>>(`login`, body);
    return data;
  } catch (e) {
    throw handleAPIError(e);
  }
}
