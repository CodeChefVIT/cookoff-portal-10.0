import api from ".";
import { handleAPIError } from "@/lib/error";
import { AxiosError } from "axios";

export interface GetTimeResponse {
  round_end_time: string;
  round_start_time: string;
  server_time: string;
}

export default async function timer() {
  try {
    const { data } = await api.get<GetTimeResponse>("/getTime");
    return data;
  } catch (e) {
    throw handleAPIError(e);
  }
}
