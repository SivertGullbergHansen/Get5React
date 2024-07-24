import { PrismaClient } from "@prisma/client";
import axios from "axios";
import fs from "fs";
import { PlayerSummariesResponse } from "./types";
import { chunkArray, generateNormalDistribution } from "./utils";
import consola from "consola";

const data = fs.readFileSync("./tools/randomSteamIDs.json", "utf8"); // should be an array of strings
const steamIDs: string[] = JSON.parse(data);

const prisma = new PrismaClient();

if (!process.env.STEAM_SECRET) {
  throw "STEAM_SECRET is not defined";
}

async function processSteamIDs(steamIDs: string[]) {
  consola.start("Processing steamIDs");
  let index = 0;

  try {
    const chunks = chunkArray(steamIDs, 100);

    for (const chunk of chunks) {
      const response = await axios.get(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${
          process.env.STEAM_SECRET
        }&format=json&steamids=${chunk.join(",")}`
      );

      const players = (response.data as PlayerSummariesResponse).response
        .players;

      for (const player of players) {
        index++;
        const mean = 10000; // Mean rating value
        const stdDev = 5000; // Standard deviation
        const maxValue = 35000; // Maximum rating value
        const randomRating = generateNormalDistribution(mean, stdDev, maxValue);

        await prisma.user.upsert({
          where: {
            steamID: player.steamid,
          },
          update: {
            steamID: player.steamid,
            name: player.personaname,
            avatar: player.avatarfull,
            rating: randomRating,
          },
          create: {
            steamID: player.steamid,
            name: player.personaname,
            avatar: player.avatarfull,
            rating: randomRating,
          },
        });

        consola.success(`${index}: ${player.personaname} processed`);
      }
    }
  } catch (error: any) {
    consola.error(`${index}: Error processing steamIDs: ${error.message}`);
  }
}

processSteamIDs(steamIDs).then(() => {
  consola.success("Processing complete");
  prisma.$disconnect();
});
