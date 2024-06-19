import { promises as fs } from "fs";
import { Settings } from "@/types/settings";
import { getDefaultSettings } from "@/utils/settings";

// Function to handle GET requests
export const handleGetRequest = async () => {
  try {
    const data = await fs.readFile("./settings.json", "utf-8");
    const settings: Settings = JSON.parse(data);
    return Response.json({ message: "Succeeded in reading", data: settings }, {status: 200});
  } catch (error: any) {
    // Return default settings if file doesn't exist or reading failed
    if (error.code === "ENOENT") {
      return Response.json({
        message: "Returning default settings",
        data: getDefaultSettings(),
      }, {status: 200});
    } else {
      return Response.json({
        message: "Failed to read settings",
      }, {status: 500});
    }
  }
};
