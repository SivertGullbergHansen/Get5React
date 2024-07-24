import { User } from "@prisma/client";

export function addPositionsToUsers(players: any[]) {
  const sortedLeaderboardUsers: (User & { position: number })[] = [];

  players
    .sort((a, b) => b.rating - a.rating)
    .forEach((user, i) => {
      sortedLeaderboardUsers.push({ ...user, position: i + 1 });
    });

  return sortedLeaderboardUsers;
}
