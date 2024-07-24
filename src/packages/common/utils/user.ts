import { MAX_NAME_LENGTH } from "../constants/user";

function removeSpecialCharacters(str: string) {
  // Regular expression to match unwanted characters, including specific Unicode characters
  // U+E0021 (Private Use Area), U+FFFD (Replacement Character)
  const regex =
    /[^a-zA-Z0-9\sæøåÆØÅ\u0370-\u03FF\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u0900-\u097F\u1F600-\u1F64F\u1F300-\u1F5FF]+/g;

  let cleanedStr = str
    .normalize("NFD")
    .replace(regex, "")
    .replace(/[\u0300-\u036f]/g, "");
  cleanedStr = cleanedStr.replace(/\uE0021|\uFFFD/g, "");
  cleanedStr = cleanedStr.replace(/(^ +| +$|(?<= ) +)/g, "");
  cleanedStr = cleanedStr.replace(/ /g, "");

  // If the cleaned string is empty, set it to "Unknown"
  if (cleanedStr.trim() === "") {
    cleanedStr = "Unknown";
  }

  return cleanedStr;
}

// Cap username to specific length and clean
export function capName(name: string) {
  return removeSpecialCharacters(name.slice(0, MAX_NAME_LENGTH));
}
