import { FastifyInstance } from 'fastify';
import { prisma } from '../../lib/prisma.ts';
import { MonthlyBudget } from '@prisma/client';

export default async function (app: FastifyInstance) {
  app.post<{
    Body: MonthlyBudget;
  }>('/', async (request, reply) => {
    const { budget, expenses, bills, cashflow, month, year } = request.body;
    const data = {
      budget,
      expenses,
      bills,
      cashflow,
      month,
      year,
    };
    const monthlyBudget = await prisma.monthlyBudget.create({
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
