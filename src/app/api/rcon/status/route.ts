import { RconClient } from "@/api/rcon";

/**
 * @swagger
 * /api/rcon/status:
 *   get:
 *     summary: Get the status of the RCON server
 *     description: This endpoint retrieves the current status of the RCON server.
 *     responses:
 *       200:
 *         description: The status of the RCON server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response containing the server status
 *               example:
 *                 status: "online"
 *                 players: 10
 *                 maxPlayers: 100
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Error response when the server status could not be retrieved
 *               example:
 *                 error: "Failed to retrieve server status"
 */
export async function GET() {
  const client = new RconClient();

  try {
    const response = await client.getStatus();
    return Response.json(response);
  } catch (error) {
    return Response.json(
      { error: "Failed to retrieve server status" },
      { status: 500 }
    );
  }
}
