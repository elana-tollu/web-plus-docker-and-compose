import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ForbiddenExceptionFilter } from './filters/forbiddenException.filter';
import { BusinessRuleViolationExceptionFilter } from './filters/businessRuleViolationException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalFilters(
    new ForbiddenExceptionFilter(),
    new BusinessRuleViolationExceptionFilter(),
  );
  await app.listen(3000);
}
bootstrap();
