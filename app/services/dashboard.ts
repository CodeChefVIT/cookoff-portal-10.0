import api from "./index";
import { RoundStats } from "@/components/Dashboard/Statistics/statistics";
import { DashboardResponse } from "../schemas/api/index";

export async function getRounds(): Promise<RoundStats[]> {
  const { data: resData } = await api.get<DashboardResponse>("/dashboard");

  const rounds: RoundStats[] = [];

  for (let i = 0; i <= 3; i++) {
    const completed = (resData.data as any)[`questionsCompleted${i}`] ?? 0;
    const incomplete = (resData.data as any)[`questionsNotCompleted${i}`] ?? 0;
    const score = (resData.data as any)[`round${i}Score`] ?? 0;

    let status: "Closed" | "In Progress" | "Completed" = "Closed";
    if (i < resData.data.currentRound) status = "Completed";
    else if (i === resData.data.currentRound) status = "In Progress";

    rounds.push({
      round: i,
      status,
      completed,
      incomplete,
      score,
      progress:
        completed + incomplete > 0
          ? Math.round((completed / (completed + incomplete)) * 100)
          : 0,
      locked: i > resData.data.currentRound,
    });
  }

  return rounds;
}
