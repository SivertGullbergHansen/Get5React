import { SteamProfile } from "next-auth-steam";
import { Team } from "./team";

export interface PlayerData {
  steam: SteamProfile;
  best_tournament_position: number;
  won_tournaments: number;
  num_tournaments_participated: number;
  teams: Team[];
  main_team: Team;
}
