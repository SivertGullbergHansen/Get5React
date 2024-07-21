import { addPositionsToUsers } from "@/utils/leaderboard";
import { PrismaClient, User } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

let count = 0;

export async function GET(req: NextRequest) {
  const getType: "count" | null = req.nextUrl.searchParams.get("type") as any;

  switch (getType) {
    case "count":
      const usersCount = count || (await prisma.user.count());

      // prevent multiple calls to the database
      count = usersCount;

      return Response.json({ usersCount: usersCount });

    default:
      const users = await prisma.user.findMany({
        select: {
          steamID: true,
          name: true,
          avatar: true,
          teamId: true,
          rating: true,
        },
      });

      const withPosition = addPositionsToUsers(users);

      return Response.json({ users: withPosition });
  }
}
