import { Team, User, UserStats } from "@prisma/client";

export type getUser = User & {
  position: number;
  userStats?: UserStats;
  team?: Team;
};

export type getUsers = User & {
  position: number;
};
