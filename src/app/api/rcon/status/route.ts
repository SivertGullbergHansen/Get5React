import { RconClient } from "@/api/rcon";

export async function GET() {
  const client = new RconClient();

  const response = await client.getStatus();

  return Response.json(response);
}
