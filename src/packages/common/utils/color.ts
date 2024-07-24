import { TextProps } from "@radix-ui/themes";

export function getPlayerColor(rating: number): TextProps["color"] {
  if (rating < 4999) return "gray";

  if (rating < 9999) return "bronze";

  if (rating < 14999) return "iris";

  if (rating < 19999) return "purple";

  if (rating < 24999) return "pink";

  if (rating < 29999) return "red";

  return "amber";
}
