import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
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
 *         example: 1
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
 *       404:
 *         description: Map not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "Map not found"
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Invalid ID parameter" },
      { status: 400 }
    );
  }

  const map = await prisma.map.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  if (!map) {
    return NextResponse.json({ error: "Map not found" }, { status: 404 });
  }

  return NextResponse.json({ map });
}

/**
 * Verifies that the map data is valid.
 * @param {object} mapData - The map data object to verify.
 * @returns {boolean} - Returns true if valid, false otherwise.
 */
function verifyMapData(mapData: { data_name: string }) {
  return (
    typeof mapData.data_name === "string" && mapData.data_name.trim().length > 0
  );
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
  try {
    const mapData = await req.json();

    if (!verifyMapData(mapData)) {
      return NextResponse.json({ error: "Invalid map data" }, { status: 400 });
    }

    const map = await prisma.map.create({
      data: mapData,
    });

    return NextResponse.json({ map });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the map" },
      { status: 500 }
    );
  }
}
