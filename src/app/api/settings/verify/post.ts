import { Settings } from "@/types/settings";
import { isValidSettings } from "@/utils/settings";
import axios from "axios";

const appendSubRoute = (baseURL: string, subRoute: string): string => {
  // Add http if no protocol is present
  if (!/^https?:\/\//i.test(baseURL)) {
    baseURL = "http://" + baseURL;
  }

  // Ensure the base URL ends with a slash to correctly append the sub-route
  if (!baseURL.endsWith("/")) {
    baseURL += "/";
  }

  return new URL(subRoute, baseURL).href;
};

// Function to handle POST requests
export const handlePostRequest = async (req: Request) => {
  const body: Settings = await req.json();

  if (!isValidSettings(body)) {
    return Response.json({ message: "Invalid settings data" }, { status: 400 });
  }

  const newURL = appendSubRoute(body.apiURL, "maps");

  try {
    const response = await axios.get(newURL, { timeout: 2000 });
    if (response.status === 200)
      return Response.json({ message: "Verification OK" }, { status: 200 });
    else
      return Response.json(
        { message: "Verification not OK" },
        { status: response.status }
      );
  } catch (error: any) {
    console.log(error);
    
    return Response.json(
      {
        message: error.response ?
          `${error.response.status} ${error.response.statusText}` : error.message },
      { status: 500 }
    );
  }
};
