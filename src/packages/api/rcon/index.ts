import consola from "consola";
import Rcon from "ts-rcon";
import { RconCommand, Status } from "./types/get5";

export class RconClient {
  private host: string;
  private port: number;
  private password: string;

  constructor() {
    this.host = process.env.RCON_HOST || "";
    this.port = Number(process.env.RCON_PORT);
    this.password = process.env.RCON_PASSWORD || "";

    if (!this.host || !this.port || !this.password) {
      throw new Error("[RCON] Missing RCON credentials");
    }
  }

  private createRconConnection(): Rcon {
    return new Rcon(this.host, this.port, this.password, {
      tcp: true,
      challenge: false,
    });
  }

  public execute(commandString: string): Promise<any> {
    // Change the return type to any to allow for JSON parsing
    return new Promise((resolve, reject) => {
      const conn = this.createRconConnection();
      let resp = "";

      conn
        .on("auth", () => {
          conn.send(commandString);
        })
        .on("response", (str) => {
          resp = str;
          try {
            // Try to parse the response as JSON
            const jsonResponse = JSON.parse(resp);
            resolve(jsonResponse);
          } catch (e) {
            // If parsing fails, resolve the raw string response
            resolve(resp);
          }
        })
        .on("error", (error) => {
          consola.error("[RCON] Got error:", error);
          reject(new Error(`[RCON] Error: ${error.message || error}`));
        });

      conn.connect();
    });
  }

  public async getStatus(): Promise<Status> {
    const command = "get5_status";

    try {
      const result = await this.execute(command);
      consola.success("[RCON] Status retrieved successfully");
      return result;
    } catch (error) {
      consola.error(`[RCON] Failed to get status: ${error}`);
      throw new Error(`[RCON] Failed to get status: ${error}`);
    }
  }

  public async loadMatch(MatchID: string): Promise<string> {
    if (!MatchID) {
      throw new Error("MatchID is required");
    }

    const siteURL = new URL(
      `/api/matches/${MatchID}`,
      process.env.NEXTAUTH_URL
    );

    const command = `${RconCommand.GET5_LOADMATCH_URL} "${siteURL}"`;

    try {
      const result = await this.execute(command);
      consola.success(`[RCON] Match ${MatchID} loaded successfully`);
      return result;
    } catch (error) {
      consola.error(`[RCON] Failed to load match ${MatchID}: ${error}`);
      throw new Error(`[RCON] Failed to load match ${MatchID}: ${error}`);
    }
  }
}
