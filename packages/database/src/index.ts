import {PrismaPg} from '@prisma/adapter-pg';
import {config} from 'dotenv';
import {fileURLToPath} from 'node:url';
import {PrismaClient} from './generated/prisma/client.js';

export * from './generated/prisma/client.js';

export class DatabaseClient extends PrismaClient {
  constructor() {
    config({
      path: fileURLToPath(new URL('../.env', import.meta.url)),
      quiet: true,
    });
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is required. Set packages/database/.env or export it.');
    }
    super({adapter: new PrismaPg({connectionString})});
  }
}
