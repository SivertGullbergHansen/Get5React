/*
  Warnings:

  - Added the required column `maxRating` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minRating` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "maxRating" INTEGER NOT NULL,
ADD COLUMN     "minRating" INTEGER NOT NULL;
