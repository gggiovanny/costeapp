-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unitName" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Supply" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "supplyName" TEXT NOT NULL,
    "purchaseCost" DECIMAL NOT NULL,
    "lossPercentage" DECIMAL NOT NULL,
    "preferedSupplyId" INTEGER,
    "brand" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "inputUnitId" INTEGER NOT NULL,
    "outputUnitId" INTEGER NOT NULL,
    "inputToOutputUnitMultiplier" DECIMAL NOT NULL DEFAULT 1,
    "minStock" DECIMAL NOT NULL,
    "maxStock" DECIMAL NOT NULL,
    "expiration" DATETIME,
    CONSTRAINT "Supply_preferedSupplyId_fkey" FOREIGN KEY ("preferedSupplyId") REFERENCES "Supply" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Supply_inputUnitId_fkey" FOREIGN KEY ("inputUnitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Supply_outputUnitId_fkey" FOREIGN KEY ("outputUnitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
