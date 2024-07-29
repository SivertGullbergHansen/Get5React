/*
  Warnings:

  - Added the required column `banner` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "banner" TEXT NOT NULL;
