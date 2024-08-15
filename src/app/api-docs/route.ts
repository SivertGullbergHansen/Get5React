import { ApiReference } from "@scalar/nextjs-api-reference";
import { ReferenceConfiguration } from "@scalar/api-reference";

const config: ReferenceConfiguration = {
  spec: {
    url: "/openapi.json",
  },
  baseServerURL: new URL("api", process.env.NEXTAUTH_URL).href,
  theme: "deepSpace",
  darkMode: true,
  hideDarkModeToggle: true,
  hideDownloadButton: true,
  defaultHttpClient: {
    targetKey: "javascript",
    clientKey: "fetch",
  },
  forceDarkModeState: "dark",
  layout: "modern",
};

export const GET = ApiReference(config);
