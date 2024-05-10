import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class ItemsRepo {
  async addItem(item) {
    try {
      return prisma.item.create({
        data: item,
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getItem(itemId) {
    try {
      return prisma.item.findFirst({
        where: { itemId: itemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getItems(searchText) {
    try {
      if (!searchText) {
        return prisma.item.findMany({
          where: {
            outOfStock: false,
          },
        });
      } else {
        return prisma.item.findMany({
          where: {
            AND: [
              {
                name: {
                  contains: searchText,
                },
              },
              { outOfStock: false },
            ],
          },
        });
      }
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getUploadedItems(sellerId) {
    try {
      return prisma.item.findMany({
        where: {
          sellerId: sellerId,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async updateItem(itemId, item) {
    try {
      return prisma.item.update({
        data: item,
        where: { itemId: itemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async deleteItem(itemId) {
    try {
      return prisma.item.delete({
        where: { itemId: itemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export default new ItemsRepo();
