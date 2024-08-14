import { RconClient } from "@/api/rcon";
import consola from "consola";
import { NextRequest } from "next/server";

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
