import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.ts';
import { MonthlyBudget, User } from '@prisma/client';
import { clerkClient } from '@clerk/fastify';

export default async function (app: FastifyInstance) {
  app.post<{
    Body: User & { sessions: any[] };
  }>('/', async (request, reply) => {
    try {
      const { id, firstName, lastName, email, sessions } = request.body;
      const user = await clerkClient.users.getUser(id);
      let dbUser = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            clerkId: id,
            email,
            firstName,
            lastName,
          },
        });
      }

      const sessionId = sessions[0].id;
      console.log({ sessionId });
      await prisma.session.upsert({
        where: { sessionId },
        update: {
          expiresAt: new Date(sessions[0].expireAt),
        },
        create: {
          sessionId,
          userId: dbUser.id,
          expiresAt: new Date(sessions[0].expireAt),
        },
      });
      return reply.send({ message: 'User and session saved', user });
    } catch (error) {
      console.error(error);
      reply
        .status(500)
        .send({ error: 'Error handling authentication callback' });
    }
  });
}
