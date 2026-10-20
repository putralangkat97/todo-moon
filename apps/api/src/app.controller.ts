import { Controller, Get } from '@nestjs/common';
import type { GreetingResponse } from '@anggit-mono/types';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHelloWorld(): GreetingResponse {
    return 'Hello, you!';
  }

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
