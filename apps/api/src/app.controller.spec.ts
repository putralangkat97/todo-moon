import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the sum greeting', () => {
      expect(appController.getHello()).toBe('Hello, sum: 1 + 2 = 3');
    });
  });

  describe('health', () => {
    it('reports that the API is ready', () => {
      expect(appController.getHealth()).toEqual({ status: 'ok' });
    });
  });

  describe('hello', () => {
    it('returns the shared greeting response', () => {
      expect(appController.getHelloWorld()).toBe('Hello, you!');
    });
  });
});
