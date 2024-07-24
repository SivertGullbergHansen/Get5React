import { MAX_NAME_LENGTH } from "../constants/user";

function removeSpecialCharacters(str: string) {
  return str.replace(/[^\w\s]/gi, "");
}

// Cap username to specific length
export function capName(name: string) {
  if (name.length > MAX_NAME_LENGTH) {
    return removeSpecialCharacters(name).slice(0, MAX_NAME_LENGTH);
  }

  return name;
}
