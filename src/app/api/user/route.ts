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
    select: {
      steamID: true,
      name: true,
      avatar: true,
      teamId: true,
    },
  });

  return Response.json({ user: user });
}
