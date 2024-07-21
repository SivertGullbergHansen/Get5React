import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

let count = 0;

export async function GET(req: NextRequest) {
  const getOnlyCount = req.nextUrl.searchParams.get("count");
  if (getOnlyCount) {
    const usersCount = count || (await prisma.user.count());

    // prevent multiple calls to the database
    count = usersCount;

    return Response.json({ usersCount: usersCount });
  } else {
    const users = await prisma.user.findMany();

    return Response.json({ users: users });
  }
}
