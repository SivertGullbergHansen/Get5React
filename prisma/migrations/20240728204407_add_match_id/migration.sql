/*
  Warnings:

  - Added the required column `matchId` to the `UserStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserStats" ADD COLUMN     "matchId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
