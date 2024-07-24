import { addPositionsToUsers } from "@/leaderboard";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ user: undefined });
  }

  const user = await prisma.user.findUnique({
    where: {
      steamID: id,
    },
    include: {
      userStats: true,
      team: true,
    },
  });

  const users = await prisma.user.findMany({
    select: {
      steamID: true,
      rating: true,
    },
  });

  const withPosition = addPositionsToUsers(users);

  return Response.json({
    user: { ...withPosition.find((u) => u.steamID === id), ...user },
  });
}
