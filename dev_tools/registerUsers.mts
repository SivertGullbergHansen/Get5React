import { PrismaClient } from "@prisma/client";
import axios from "axios";
import fs from "fs";
import { PlayerSummariesResponse } from "./types";
import { chunkArray, generateNormalDistribution } from "./utils";
import consola from "consola";
import { capName } from "../src/packages/common/utils/user";

const data = fs.readFileSync("./dev_tools/randomSteamIDs.json", "utf8"); // should be an array of strings
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

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

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
        const mean = 8000; // Mean rating value
        const stdDev = 7000; // Standard deviation
        const maxValue = 35000; // Maximum rating value
        const randomRating = generateNormalDistribution(mean, stdDev, maxValue);
        const name = capName(player.personaname);

        consola.start(`${index}: Checking ${name} (${player.steamid})`);
        await prisma.user.upsert({
          where: {
            steamID: player.steamid,
          },
          update: {
            steamID: player.steamid,
            name,
            avatar: player.avatarfull,
            rating: randomRating,
          },
          create: {
            steamID: player.steamid,
            name,
            avatar: player.avatarfull,
            rating: randomRating,
          },
        });

        consola.success(`${index}: ${player.personaname} processed`);

        // Wait 15 minutes every 1,000 steamIDs
        if (index % 1000 === 0) {
          consola.info("Waiting 15 minutes");
          await delay(930000);
        }
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
