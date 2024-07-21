/*
  Warnings:

  - Added the required column `logo` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "logo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannedReason" TEXT,
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "display_name" TEXT NOT NULL,
    "data_name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);
