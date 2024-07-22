import { TextProps } from "@radix-ui/themes";

export function getPlayerColor(rating: number): TextProps["color"] {
  if (rating < 4999) return "gray";

  if (rating < 9999) return "cyan";

  if (rating < 14999) return "blue";

  if (rating < 19999) return "plum";

  if (rating < 24999) return "violet";

  if (rating < 29999) return "crimson";

  return "amber";
}
