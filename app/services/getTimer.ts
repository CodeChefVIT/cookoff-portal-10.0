import api from ".";
import { handleAPIError } from "@/lib/error";
import { GetTimeResponse } from "@/api/timer/getTime/route";
import { AxiosError } from "axios";
export default async function timer() {
  try {
    const { data } = await api.get<GetTimeResponse>("/getTime");
    return data;
  } catch (e) {
    const error = e as AxiosError;

    if (e instanceof Error && error.response?.status === 409) {
      window.location.href = "/";
    }
    throw handleAPIError(e);
  }
}
