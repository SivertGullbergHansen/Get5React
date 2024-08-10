import { Player } from "../types/calculatorTypes";
import {
  calculateExpectedScore,
  calculatePerformancePoints,
} from "./calculator";

export function updateTeamRatings(
  ratingA: number,
  ratingB: number,
  scoreA: number,
  scoreB: number,
  K: number = 32,
): [number, number] {
  const expectedA = calculateExpectedScore(ratingA, ratingB);
  const expectedB = calculateExpectedScore(ratingB, ratingA);

  const newRatingA = ratingA + K * (scoreA - expectedA);
  const newRatingB = ratingB + K * (scoreB - expectedB);

  return [newRatingA, newRatingB];
}

export function updatePlayerRatings(
  teamA: Player[],
  teamB: Player[],
  scoreA: number,
  scoreB: number,
): void {
  const teamARating =
    teamA.reduce((sum, player) => sum + player.rating, 0) / teamA.length;
  const teamBRating =
    teamB.reduce((sum, player) => sum + player.rating, 0) / teamB.length;

  const [newTeamARating, newTeamBRating] = updateTeamRatings(
    teamARating,
    teamBRating,
    scoreA,
    scoreB,
  );

  const teamARatingChange = newTeamARating - teamARating;
  const teamBRatingChange = newTeamBRating - teamBRating;

  const totalPerformanceA = teamA.reduce(
    (sum, player) => sum + calculatePerformancePoints(player.stats),
    0,
  );
  const totalPerformanceB = teamB.reduce(
    (sum, player) => sum + calculatePerformancePoints(player.stats),
    0,
  );

  teamA.forEach((player) => {
    const performanceScore = calculatePerformancePoints(player.stats);
    const performanceRatio = performanceScore / totalPerformanceA;
    player.rating += performanceRatio * teamARatingChange;
  });

  teamB.forEach((player) => {
    const performanceScore = calculatePerformancePoints(player.stats);
    const performanceRatio = performanceScore / totalPerformanceB;
    player.rating += performanceRatio * teamBRatingChange;
  });
}
