import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.ts';

export default async function (app: FastifyInstance) {
  app.get('/:userId', async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string };
      const data = await prisma.monthlyBudget.findFirst({
        where: {
          userId,
        },
      });
      console.log({ data });
      return reply.status(200).send(data);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: 'An error occurred while updating the resource',
      });
    }
  });
}
