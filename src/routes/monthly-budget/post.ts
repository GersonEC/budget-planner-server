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
    console.log({ data });
    prisma.monthlyBudget.create({
      data,
    });
    reply.status(201);
    return data;
  });
}
