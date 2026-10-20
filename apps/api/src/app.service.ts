import { Injectable } from '@nestjs/common';
import { sum } from '@anggit-mono/domain';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello, sum: 1 + 2 = ${sum(1, 2)}`;
  }
}
