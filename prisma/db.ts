import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient()



/* neonConfig.webSocketConstructor = WebSocket;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
export const db = new PrismaClient({ adapter });



// detta fick jag från prisma

import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate()) */

// detta fick jag från neon
/* postgresql://ananas%20prod:gv2qmjZd8iVa@ep-odd-smoke-a24cypbd.eu-central-1.aws.neon.tech/ananasdb?sslmode=require */