export function getTypeName(type: string) {
  switch (type) {
    case "DoubleElimination":
      return "Double Elimination";
    case "SingleElimination":
      return "Single Elimination";
    case "Swiss":
      return "Swiss";
    default:
      return type;
  }
}
