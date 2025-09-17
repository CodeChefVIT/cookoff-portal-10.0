import { type loginFormSchema } from "@/schemas/forms/login";
import { type z } from "zod";
import api from ".";
import { ApiResponse } from "../schemas/api";
import { handleAPIError } from "@/lib/error";

export async function login(body: z.infer<typeof loginFormSchema>) {
  try {
    const { data } = await api.post<ApiResponse>(`login`, body);
    return data.message;
  } catch (e) {
    throw handleAPIError(e);
  }
}



