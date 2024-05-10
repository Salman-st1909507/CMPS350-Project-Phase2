import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class BoughtItemsRepo {
  async addBoughtItem(boughtItem) {
    try {
      return prisma.boughtItem.create({
        data: boughtItem,
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getBoughtItem(boughtItemId) {
    try {
      return prisma.boughtItem.findFirst({
        where: {
          boughtItemId: boughtItemId,
        },
        include: {
          Item: true,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getBoughtItemByItemId(itemId) {
    try {
      return await prisma.boughtItem.findFirst({
        where: {
          Item: { itemId: itemId },
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getBoughtItemsForCustomer(customerId) {
    try {
      return prisma.boughtItem.findMany({
        where: {
          customerId: customerId,
        },
        include: {
          Item: true,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getBoughtItemsForSeller(sellerId) {
    try {
      return prisma.boughtItem.findMany({
        where: {
          Item: {
            sellerId: sellerId,
          },
        },
        include: {
          Item: true,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async updateBoughtItem(boughtItemId, boughtItem) {
    try {
      return prisma.boughtItem.update({
        data: boughtItem,
        where: { boughtItemId: boughtItemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async deleteBoughtItem(boughtItemId) {
    try {
      return prisma.boughtItem.delete({
        where: { boughtItemId: boughtItemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export default new BoughtItemsRepo();
