import { promises as fs } from "fs";
import { isValidSettings } from "@/utils/settings";

// Function to handle POST requests
export const handlePostRequest = async (
  req: Request,
) => {
  const body = await req.json()

  if (!isValidSettings(body)) {
    return Response.json({ message: "Invalid settings data" }, {status: 400});
  }

  try {
    await fs.writeFile("./settings.json", JSON.stringify(body, null, 2), {flag: 'w'});
    return Response.json({ message: "Succeeded in saving" }, {status: 200});
  } catch (error) {
    console.error("Failed to save settings:", error);
    return Response.json({ message: "Failed to save" }, {status: 500});
  }
};
