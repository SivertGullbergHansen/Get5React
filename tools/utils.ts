export function generateNormalDistribution(
  mean: number,
  stdDev: number,
  maxValue: number
) {
  // Box-Muller transform to generate a normal distribution
  const u1 = Math.random();
  const u2 = Math.random();
  const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  // Normalize the result to the desired mean and standard deviation
  let rating = Math.round(mean + z1 * stdDev);
  // Clamp the value to be within the range [0, maxValue]
  rating = Math.max(0, Math.min(maxValue, rating));
  return rating;
}

// Helper function to split array into chunks
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
