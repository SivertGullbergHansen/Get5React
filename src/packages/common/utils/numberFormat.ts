export function formatNumber(number: number, separator: string = " "): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
