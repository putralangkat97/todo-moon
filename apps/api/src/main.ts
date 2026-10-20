import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { getCorsOrigins } from './cors.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const corsOrigins = getCorsOrigins();
  app.enableCors({ origin: corsOrigins.length > 0 ? corsOrigins : false });
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();
