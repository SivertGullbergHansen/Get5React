/*
  Warnings:

  - A unique constraint covering the columns `[display_name]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[data_name]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerID]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UserStats" (
    "id" SERIAL NOT NULL,
    "steamID" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "headshots" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL,
    "mvps" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_steamID_mapId_key" ON "UserStats"("steamID", "mapId");

-- CreateIndex
CREATE UNIQUE INDEX "Map_display_name_key" ON "Map"("display_name");

-- CreateIndex
CREATE UNIQUE INDEX "Map_data_name_key" ON "Map"("data_name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_ownerID_key" ON "Team"("ownerID");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStats" ADD CONSTRAINT "UserStats_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
