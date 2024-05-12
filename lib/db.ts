/*import { prisma } from '@prisma/schema.prisma'


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()


if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

*/

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()


if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export const db= prisma;

