import { MAX_NAME_LENGTH } from "../constants/user";

function removeSpecialCharacters(str: String) {
  // Regular expression to match unwanted characters, including specific Unicode characters
  // U+E0021 (Private Use Area), U+FFFD (Replacement Character)
  const regex =
    /[^a-zA-Z0-9\sæøåÆØÅ\u0370-\u03FF\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u0900-\u097F\u1F600-\u1F64F\u1F300-\u1F5FF]+/g;

  // Replace unwanted characters with '0'
  let cleanedStr = str
    .normalize("NFD")
    .replace(regex, "0")
    .replace(/[\u0300-\u036f]/g, "-");

  // Replace specific Unicode characters with '0'
  cleanedStr = cleanedStr.replace(/\uE0021|\uFFFD/g, "-");

  // Replace spaces (U+0020) with dashes
  cleanedStr = cleanedStr.replace(/\u0020/g, "-");

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
