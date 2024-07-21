import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let count = 0;

export async function GET() {
  const usersCount = count || (await prisma.user.count());

  // prevent multiple calls to the database
  count = usersCount;

  return Response.json({ usersCount: usersCount });
}
