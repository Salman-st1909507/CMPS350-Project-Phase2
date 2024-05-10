/*
  Warnings:

  - You are about to drop the column `soldOut` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "outOfStock" BOOLEAN NOT NULL DEFAULT false,
    "uploadedOnDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("category", "details", "itemId", "name", "picture", "price", "quantity", "sellerId", "uploadedOnDate") SELECT "category", "details", "itemId", "name", "picture", "price", "quantity", "sellerId", "uploadedOnDate" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
