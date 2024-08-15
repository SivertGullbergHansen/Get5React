import { ApiReference } from "@scalar/nextjs-api-reference";
import { ReferenceConfiguration } from "@scalar/api-reference";

const config: ReferenceConfiguration = {
  spec: {
    url: "/openapi.json",
  },
  baseServerURL: new URL("api", process.env.NEXTAUTH_URL).href,
  theme: "saturn",
  darkMode: true,
  hideDarkModeToggle: true,
  hideDownloadButton: true,
  defaultHttpClient: {
    targetKey: "javascript",
    clientKey: "fetch",
  },
  defaultOpenAllTags: true,
  metaData: {
    title: "Get5React API Reference",
    description: "API Reference for Get5React",
  },
  forceDarkModeState: "dark",
  layout: "modern",
};

export const GET = ApiReference(config);
