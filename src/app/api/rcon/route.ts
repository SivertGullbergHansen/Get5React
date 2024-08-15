import { RconClient } from "@/api/rcon";
import consola from "consola";
import { NextRequest } from "next/server";

/**
 * @swagger
 * /api/rcon:
 *   post:
 *     summary: Execute an RCON command
 *     description: This endpoint allows you to execute a command on the RCON server.
 *     tags:
 *       - RCON
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apiKey:
 *                 type: string
 *                 description: The API key for authorization
 *               command:
 *                 type: string
 *                 description: The command to execute
 *             required:
 *               - apiKey
 *               - command
 *           example:
 *             apiKey: "your-api-key"
 *             command: "status"
 *     responses:
 *       200:
 *         description: The command execution result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Response from the server
 *               example:
 *                 answer: "Command executed successfully"
 *       401:
 *         description: Unauthorized, wrong API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Error response for unauthorized access
 *               example:
 *                 answer: "wrong api key"
 *                 status: 401
 *       400:
 *         description: Bad request, no command given
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Error response when command is missing
 *               example:
 *                 answer: "no command given"
 */
export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  consola.log(reqBody);
  consola.log(process.env.RCON_API_KEY);

  const apiKey = reqBody.apiKey;
  if (apiKey !== process.env.RCON_API_KEY) {
    return Response.json({ answer: "wrong api key", status: 401 });
  }

  const client = new RconClient();

  if (!reqBody.command) return Response.json({ answer: "no command given" });

  const response = await client.execute(reqBody.command);

  console.log(response);

  return Response.json(response);
}
