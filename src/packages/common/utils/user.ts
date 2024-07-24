import { MAX_NAME_LENGTH } from "../constants/user";

// Cap username to specific length
export function capName(name: string) {
  if (name.length > MAX_NAME_LENGTH) {
    return name.slice(0, MAX_NAME_LENGTH);
  }

  return name;
}
