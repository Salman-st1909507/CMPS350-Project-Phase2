-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "cartItemId" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL,
    "addedOnDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CartItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("cartItemId", "checked", "customerId", "itemId", "quantity") SELECT "cartItemId", "checked", "customerId", "itemId", "quantity" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
CREATE TABLE "new_BoughtItem" (
    "boughtItemId" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "boughtOnDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BoughtItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "BoughtItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_BoughtItem" ("boughtItemId", "customerId", "itemId", "quantity") SELECT "boughtItemId", "customerId", "itemId", "quantity" FROM "BoughtItem";
DROP TABLE "BoughtItem";
ALTER TABLE "new_BoughtItem" RENAME TO "BoughtItem";
CREATE TABLE "new_Item" (
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "uploadedOnDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("category", "details", "itemId", "name", "picture", "price", "quantity", "sellerId") SELECT "category", "details", "itemId", "name", "picture", "price", "quantity", "sellerId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
