import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UsersRepo {
  async addUser(user) {
    try {
      return prisma.user.create({
        data: user,
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
  async getUserByUsername(username) {
    try {
      return prisma.user.findFirst({
        where: {
          username: username,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getUserByUserId(userId) {
    try {
      return prisma.user.findFirst({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async updateUser(userId, user) {
    try {
      return prisma.user.update({
        data: user,
        where: { userId: userId },
      });
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getUsers() {
    try {
      return prisma.user.findMany();
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}

export default new UsersRepo();
