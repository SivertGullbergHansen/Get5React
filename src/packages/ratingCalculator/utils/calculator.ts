import { UserStats } from "@prisma/client";

export function calculateExpectedScore(
  ratingA: number,
  ratingB: number,
): number {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export function calculatePerformancePoints(stats: UserStats): number {
  const weights = {
    kills: 1,
    deaths: -0.5,
    assists: 0.5,
    headshots: 0.3,
    mvps: 0.2,
    score: 0.1,
  };

  return (
    stats.kills * weights.kills +
    stats.deaths * weights.deaths +
    stats.assists * weights.assists +
    stats.headshots * weights.headshots +
    stats.mvps * weights.mvps +
    stats.score * weights.score
  );
}
