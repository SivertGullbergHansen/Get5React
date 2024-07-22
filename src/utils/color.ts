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

  if (position < 21) {
    return "blue";
  }

  if (position < 31) {
    return "green";
  }

  if (position < 41) {
    return "yellow";
  }

  if (position < 51) {
    return "orange";
  }

  return "gray";
}
