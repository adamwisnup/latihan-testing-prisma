const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  login: async (email, password) => {
    try {
      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw "email unregistered";

      if (user.password !== password) throw "invalid password";

      return user;
    } catch (error) {
      throw error;
    }
  },
};
