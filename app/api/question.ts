import { handleAPIError } from "@/lib/error";
import { Question } from "@/schemas/api";
import api from "@/services";


interface QuestionResponse {
  question: Question;
}

export async function byRound() {
  try {
    const { data } = await api.get<QuestionResponse[]>(`/question/round`);
    return data;
  } catch (e) {
    throw handleAPIError(e);
  }
}