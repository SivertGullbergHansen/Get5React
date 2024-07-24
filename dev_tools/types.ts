import { SteamProfile } from "next-auth-steam";

// Define a type for the response containing the players
export interface PlayerSummariesResponse {
  response: {
    players: SteamProfile[];
  };
}
