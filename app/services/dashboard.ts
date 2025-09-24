import api from "./index";
import { RoundStats } from "@/components/Dashboard/Statistics/statistics";
import { DashboardResponse } from "../schemas/api/index";

export async function getRounds(): Promise<RoundStats[]> {
  console.log("api:", api);

  const res = await api.get("/dashboard");
  const data = res.data.data;
  const rounds: RoundStats[] = [];

  for (let i = 0; i <= 3; i++) {
    const completed = (data as any)[`questionsCompleted${i}`] ?? 0;
    const incomplete = (data as any)[`questionsNotCompleted${i}`] ?? 0;
    const score = (data as any)[`round${i}Score`] ?? 0;

    let status: "Closed" | "In Progress" | "Completed" = "Closed";
    console.log("here",data.current_round);
    console.log(i);
    if (i < data.current_round) status = "Completed";
    else if (i === data.current_round) status = "In Progress";

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
      locked: i > data.currentRound,
    });
  }

  return rounds;
}
