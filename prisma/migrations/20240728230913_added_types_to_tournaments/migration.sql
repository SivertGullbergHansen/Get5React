-- CreateEnum
CREATE TYPE "TournamentType" AS ENUM ('RoundRobin', 'SingleElimination', 'DoubleElimination', 'Swiss');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "type" "TournamentType" NOT NULL DEFAULT 'SingleElimination';
