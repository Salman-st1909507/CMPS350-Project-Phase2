import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class CartItemsRepo {
  async addCartItem(cartItem) {
    try {
      return await prisma.cartItem.create({
        data: cartItem,
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getCartItem(cartItemId) {
    try {
      return await prisma.cartItem.findFirst({
        where: {
          cartItemId: cartItemId,
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

  async getCartItemByItemId(itemId) {
    try {
      return await prisma.cartItem.findFirst({
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

  async getCartItems(customerId) {
    try {
      return await prisma.cartItem.findMany({
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

  async updateCartItem(cartItemId, cartItem) {
    try {
      return await prisma.cartItem.update({
        data: cartItem,
        where: { cartItemId: cartItemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async deleteCartItem(cartItemId) {
    try {
      return await prisma.cartItem.delete({
        where: { cartItemId: cartItemId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export default new CartItemsRepo();
