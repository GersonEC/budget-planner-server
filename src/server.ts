import 'dotenv/config';
import autoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { clerkPlugin } from '@clerk/fastify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (app: FastifyInstance) {
  app.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
    forceESM: true,
  });
  app.register(cors, {
    origin: 'http://localhost:5173', // Allow your frontend's URL
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.register(clerkPlugin);

  app.ready(() => {
    app.log.info(app.printRoutes());
  });
}
