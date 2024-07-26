import { UserStats } from "@prisma/client";

export interface Player {
  rating: number;
  stats: UserStats;
}
