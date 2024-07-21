import { UserType } from "@/types/user";

import { TextProps } from "@radix-ui/themes";

export function getPlayerColor(position: number): TextProps["color"] {
  if (position === 1) {
    return "amber";
  }

  if (position === 2) {
    return "cyan";
  }

  if (position === 3) {
    return "teal";
  }

  if (position < 11) {
    return "violet";
  }

  return undefined;
}
