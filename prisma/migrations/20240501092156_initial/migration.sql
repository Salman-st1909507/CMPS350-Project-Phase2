-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "shippingAddress" TEXT,
    "moneyBalance" REAL,
    "companyName" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Item" (
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "picture" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CartItem" (
    "cartItemId" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL,
    CONSTRAINT "CartItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BoughtItem" (
    "boughtItemId" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "BoughtItem_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BoughtItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
