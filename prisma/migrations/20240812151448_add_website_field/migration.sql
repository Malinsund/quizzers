/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dayOfWeek` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pubName` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "pubName" TEXT NOT NULL,
    "website" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Post" ("content", "dayOfWeek", "id", "pubName", "published", "time", "title") SELECT "content", "dayOfWeek", "id", "pubName", "published", "time", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
