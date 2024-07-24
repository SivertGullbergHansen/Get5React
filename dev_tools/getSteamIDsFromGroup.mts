import readline from "readline";
import { getMembers } from "./utils";
import fs from "fs";
import consola from "consola";

// Clear the console
console.clear();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for the URL
rl.question("Please enter a Steam Group URL: ", (url) => {
  getMembers(url)
    .then((members) => {
      const allMembers = members.flat();
      consola.info(`Found ${allMembers.length} SteamIDs`);

      // Write the members array to the JSON file
      fs.writeFile(
        "./dev_tools/randomSteamIDs.json",
        JSON.stringify(allMembers, null, 2),
        (err) => {
          if (err) {
            consola.error("Error writing to file:", err);
          } else {
            consola.success("Members successfully written to members.json");
          }
          rl.close();
        }
      );
    })
    .catch((error) => {
      consola.error("Error:", error);
      rl.close();
    });
});
