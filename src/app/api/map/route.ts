import { NextRequest } from "next/server";
import { Map, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ map: undefined });
  }

  const map = await prisma.map.findFirst({
    where: {
      data_name: id,
    },
  });

  return Response.json({ map: map });
}

function verifyMapData(mapData: Map) {
  if (!mapData) {
    return false;
  }

  return true;
}

export async function POST(req: NextRequest) {
  const mapData = await req.json();

  if (mapData && verifyMapData(mapData)) {
    const map = await prisma.map.create({
      data: mapData,
    });

    return Response.json({ map: map });
  }

  return Response.json({ map: undefined });
}
