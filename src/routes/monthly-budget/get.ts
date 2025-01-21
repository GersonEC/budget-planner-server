import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.ts';

export default async function (app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const data = await prisma.monthlyBudget.findMany();
    console.log({ data });
    return data;
  });
}
