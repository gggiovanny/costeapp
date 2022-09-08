/*
  Warnings:

  - You are about to alter the column `montlyCost` on the `FixedCost` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FixedCost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "costName" TEXT NOT NULL,
    "montlyCost" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FixedCost" ("costName", "createdAt", "id", "montlyCost", "updatedAt") SELECT "costName", "createdAt", "id", "montlyCost", "updatedAt" FROM "FixedCost";
DROP TABLE "FixedCost";
ALTER TABLE "new_FixedCost" RENAME TO "FixedCost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
