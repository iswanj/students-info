import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type User = {
  id: number;
  username: string;
  password: string;
  name: string;
};

export default prisma.user;
