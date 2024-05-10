import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class StatisticsRepo {
  async getCustomersPerLocation() {
    return prisma.user.groupBy({
      by: ["shippingAddress"],
      where: {
        type: "customer",
      },
      _count: true,
    });
  }

  async getMostPurchasedProductsThisMonth() {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return prisma.boughtItem.groupBy({
      by: ["itemId"],
      where: {
        boughtOnDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: { quantity: true },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 3,
    });
  }

  async getOutOfStockItems() {
    return prisma.item.findMany({
      where: { outOfStock: true },
    });
  }

  async getUploadedItemsThisMonth() {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return prisma.item.findMany({
      where: {
        uploadedOnDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
  }

  async getTotalBoughtItemsQuantity() {
    return prisma.boughtItem.aggregate({
      _sum: {
        quantity: true,
      },
    });
  }

  async getTotalUploadedItemsCount() {
    return prisma.item.count();
  }

  async getCustomersCount() {
    return prisma.user.count({
      where: {
        type: "customer",
      },
    });
  }

  async getSellersCount() {
    return prisma.user.count({
      where: {
        type: "seller",
      },
    });
  }
}

export default new StatisticsRepo();
