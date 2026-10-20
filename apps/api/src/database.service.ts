import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DatabaseClient } from '@anggit-mono/database';

@Injectable()
export class DatabaseService
  extends DatabaseClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleInit() {
    return this.$connect();
  }

  onModuleDestroy() {
    return this.$disconnect();
  }
}
