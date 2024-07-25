import humanizeDuration from "humanize-duration";

export function generateNormalDistribution(
  mean: number,
  stdDev: number,
  maxValue: number
) {
  // Box-Muller transform to generate a normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  // Normalize the result to the desired mean and standard deviation
  let rating = Math.round(mean + z1 * stdDev);
  // Clamp the value to be within the range [0, maxValue]
  rating = Math.max(0, Math.min(maxValue, rating));
  return rating;
}

// Helper function to split array into chunks
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

import consola from "consola";
import https from "https";
import { parseString } from "xml2js";

const getPageMembers = (url: string, page = 1): Promise<any> =>
  new Promise((resolve, reject) => {
    if (!url.includes("/memberslistxml/?xml=1")) {
      url += "/memberslistxml/?xml=1&p=" + page;
    }

    https
      .get(url, (res: any) => {
        let xml = "";

        if (res.statusCode >= 200 && res.statusCode < 400) {
          res.on("data", (data: any) => (xml += data.toString()));
          res.on("end", () => {
            parseString(xml, (err, result) => {
              if (err === null) {
                result = result.memberList;

                resolve({
                  members: result.members.map(
                    (member: any) => member.steamID64
                  ),
                  meta: {
                    totalPages: parseInt(result.totalPages[0]),
                    currentPage: parseInt(result.currentPage[0]),
                  },
                });
              } else {
                reject(err);
              }
            });
          });
        } else {
          reject(
            new Error(`Request failed with status code ${res.statusCode}`)
          );
        }
      })
      .on("error", reject);
  });

const waitTime = 930000; // 15 minutes and 30 seconds

export const getMembers = (url: string): Promise<any[]> =>
  new Promise(async (resolve, reject) => {
    try {
      let response = await getPageMembers(url, 1);
      let members = response.members;

      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      if (response.meta.totalPages >= 2) {
        for (let i = 2; i <= response.meta.totalPages; i++) {
          consola.info(
            `#${i}, ${Math.floor((i / response.meta.totalPages) * 1000) / 10}%`
          );

          // Wait 15 minutes every 60 requests
          if (i % 60 === 0) {
            consola.warn(
              `Rate limit exceeded, waiting for ${humanizeDuration(waitTime)}`
            );
            await delay(waitTime);
          }

          response = await getPageMembers(url, i);
          members = [...members, ...response.members];
        }
      }

      resolve(members);
    } catch (error) {
      reject(error);
    }
  });
