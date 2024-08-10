import { parseTicks, parseEvent } from "@laihoe/demoparser2";

export function getCrosshairs(filePath: string = "path/to/demo.dem") {
  let gameEndTick = Math.max(
    ...parseEvent(filePath, "round_end").map((x: { tick: any }) => x.tick),
  );
  let players = parseTicks(filePath, ["crosshair_code"], [gameEndTick]);

  return { players };
}

export function getAllEvents(filePath: string = "path/to/demo.dem") {
  return parseEvent(filePath, "all");
}
