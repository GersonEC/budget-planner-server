import { FastifyInstance } from 'fastify';
import { MonthlyBudget } from '@prisma/client';
import { prisma } from '../../lib/prisma.ts';

export default async function (app: FastifyInstance) {
  app.patch<{
    Body: MonthlyBudget;
  }>('/:id', async (request, reply) => {
    const { budget, expenses, bills, cashflow, month, year } = request.body;
    const data = {
      budget,
      expenses,
      bills,
      cashflow,
      month,
      year,
    };
    const { id } = request.params as { id: string };
    const monthlyBudget = await prisma.monthlyBudget.update({
      where: {
        id,
      },
      data: {
        budget: data.budget,
        expenses: data.expenses,
        bills: data.bills,
        cashflow: {
          inflow: data.cashflow.inflow,
          outflow: data.cashflow.outflow,
          netflow: data.cashflow.netflow,
        },
        month: data.month,
        year: data.year,
      },
    });
    reply.status(201);
    return data;
  });
}
