import { FastifyInstance } from 'fastify';
import { MonthlyBudget } from '@prisma/client';
import { prisma } from '../../lib/prisma.ts';

export default async function (app: FastifyInstance) {
  app.patch<{
    Body: MonthlyBudget;
  }>('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const dataToUpdate = request.body;
    try {
      const updateBudget = await prisma.monthlyBudget.update({
        where: { id },
        data: {
          bills: dataToUpdate.bills,
          cashflow: {
            update: {
              outflow: {
                flows: dataToUpdate.cashflow.outflow.flows,
                totalFlow: dataToUpdate.cashflow.outflow.totalFlow,
              },
            },
          },
          expenses: dataToUpdate.expenses,
        },
      });
      return reply.status(200).send(updateBudget);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: 'An error occurred while updating the resource',
      });
    }
  });
}
