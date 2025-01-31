import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.ts';

export default async function (app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const data = await prisma.monthlyBudget.findMany();
      console.log({ data });
      return reply.status(200).send(data[data.length - 1]);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: 'An error occurred while updating the resource',
      });
    }
  });
}
