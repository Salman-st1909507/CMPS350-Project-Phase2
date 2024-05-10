import fs from "fs-extra";
import path from "path";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const usersPath = path.join(process.cwd(), "app/data/users.json");
const itemsPath = path.join(process.cwd(), "app/data/items.json");
const cartItemsPath = path.join(process.cwd(), "app/data/cart-items.json");
const boughtItemsPath = path.join(process.cwd(), "app/data/bought-items.json");

async function main() {
  try {
    const users = await fs.readJSON(usersPath);
    const items = await fs.readJSON(itemsPath);
    const cartItems = await fs.readJSON(cartItemsPath);
    const boughtItems = await fs.readJSON(boughtItemsPath);

    for (const user of users) await prisma.user.create({ data: user });

    for (const item of items) await prisma.item.create({ data: item });

    // for (const cartItem of cartItems)
    //   await prisma.cartItem.create({ data: cartItem });

    // for (const boughtItem of boughtItems)
    //   await prisma.boughtItem.create({ data: boughtItem });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
