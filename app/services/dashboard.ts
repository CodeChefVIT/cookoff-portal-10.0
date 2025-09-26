import { DashboardResponse } from "@/schemas/api/index";
import { RoundStats } from "@/components/Dashboard/Statistics/statistics";

export function getRounds({ data }: { data: DashboardResponse }): RoundStats[] {
  const rounds: RoundStats[] = [];
  for (let i = 0; i <= 3; i++) {
    const completed = data.questions_completed[i] ?? 0;
    const incomplete = data.questions_not_completed[i] ?? 0;
    const score = data.round_scores[i] ?? 0;

    let status: "Closed" | "In Progress" | "Completed" = "Closed";
    if (data.current_round != null) {
      if (i < data.current_round) status = "Completed";
      else if (i === data.current_round) status = "In Progress";
    }
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
      locked: data.current_round !== null ? i > data.current_round : true,
    });
  }

  return rounds;
}
