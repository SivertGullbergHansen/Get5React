export interface StatusTeam {
  name: string;
  series_score: number;
  current_map_score: number;
  connected_clients: number;
  ready: boolean;
  side: "t" | "ct";
}

export interface Status {
  plugin_version: string;
  gamestate:
    | "none"
    | "pre_veto"
    | "veto"
    | "warmup"
    | "knife"
    | "waiting_for_knife_decision"
    | "going_live"
    | "live"
    | "pending_restore"
    | "post_game";
  paused: boolean;
  loaded_config_file: string | undefined;
  matchid: string | undefined;
  map_number: number | undefined;
  round_number: number | undefined;
  round_time: number | undefined;
  team1: StatusTeam | undefined;
  team2: StatusTeam | undefined;
  maps: [string] | undefined;
}

export enum RconCommand {
  GET5_LOADMATCH = "get5_loadmatch",
  GET5_LOADBACKUP = "get5_loadbackup",
  GET5_LOADBACKUP_URL = "get5_loadbackup_url",
  GET5_LAST_BACKUP_FILE = "get5_last_backup_file",
  GET5_LOADTEAM = "get5_loadteam",
  GET5_LOADMATCH_URL = "get5_loadmatch_url",
  GET5_ENDMATCH = "get5_endmatch",
  GET5_CREATEMATCH = "get5_creatematch",
  GET5_SCRIM = "get5_scrim",
  GET5_ADDPLAYER = "get5_addplayer",
  GET5_ADDCOACH = "get5_addcoach",
  GET5_REMOVEPLAYER = "get5_removeplayer",
  GET5_ADDKICKEDPLAYER = "get5_addkickedplayer",
  GET5_STATUS = "get5_status",
  GET5_WEB_AVAILABLE = "get5_web_available",
  GET5_WEB_API_KEY = "get5_web_api_key",
  STATUS = "status",
  VERSION = "version",
  SM_PAUSE = "sm_pause",
  SM_UNPAUSE = "sm_unpause",
  GET5_LISTBACKUPS = "get5_listbackups",
}
