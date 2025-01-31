import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.ts';
import { clerkClient, getAuth } from '@clerk/fastify';

export default async function (app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    try {
      const { userId } = getAuth(request);
      if (!userId) {
        return reply.code(401).send({ error: 'User not authenticated' });
      }

      const user = userId ? await clerkClient.users.getUser(userId) : null;

      return reply.send({
        message: 'User retrieved successfully',
        user,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        error: 'Failed to retrieve user',
      });
    }
  });
}
