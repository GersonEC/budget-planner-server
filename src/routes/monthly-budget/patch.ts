import { FastifyInstance } from 'fastify';
import { MonthlyBudget } from '@prisma/client';
import { prisma } from '../../lib/prisma.ts';

export default async function (app: FastifyInstance) {
  app.patch<{
    Body: MonthlyBudget;
  }>('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const dataToUpdate = request.body;
    console.log({ dataToUpdate });
    try {
      const updateBudget = await prisma.monthlyBudget.update({
        where: { id },
        data: dataToUpdate,
      });
      return reply.status(200).send(updateBudget);
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        error: 'An error occurred while updating the resource',
      });
    }

    /*const { budget, expenses, bills, cashflow, month, year } = request.body;
    const data = {
      budget,
      expenses,
      bills,
      cashflow,
      month,
      year,
    };
    console.log({ data });
    console.log(data.cashflow);
    const updatedMonthlyBudget = await prisma.monthlyBudget.update({
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
    return updatedMonthlyBudget;*/
  });
}
