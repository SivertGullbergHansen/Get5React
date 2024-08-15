import { NextRequest } from "next/server";
import { Map, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @swagger
 * /api/map:
 *   get:
 *     summary: Retrieve a map by ID
 *     description: Returns a map object based on the ID provided as a query parameter.
 *     tags:
 *       - Map
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the map to retrieve
 *     responses:
 *       200:
 *         description: A map object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 map:
 *                   type: object
 *                   nullable: true
 *                   description: The map object or null if not found
 *               example:
 *                 map: {
 *                   id: 1,
 *                   data_name: "example-map",
 *                   createdAt: "2023-08-15T12:00:00.000Z"
 *                 }
 *       400:
 *         description: Bad request, missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid ID parameter"
 */
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

/**
 * @swagger
 * /api/map:
 *   post:
 *     summary: Create a new map
 *     description: Creates a new map object and stores it in the database.
 *     tags:
 *       - Map
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data_name:
 *                 type: string
 *                 description: The name of the map
 *             required:
 *               - data_name
 *             example:
 *               data_name: "example-map"
 *     responses:
 *       200:
 *         description: The created map object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 map:
 *                   type: object
 *                   nullable: true
 *                   description: The created map object or null if creation failed
 *               example:
 *                 map: {
 *                   id: 1,
 *                   data_name: "example-map",
 *                   createdAt: "2023-08-15T12:00:00.000Z"
 *                 }
 *       400:
 *         description: Bad request, invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Invalid map data"
 */
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
