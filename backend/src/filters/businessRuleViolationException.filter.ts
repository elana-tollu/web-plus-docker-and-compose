import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BusinessRuleViolationException } from 'src/errors';

@Catch(BusinessRuleViolationException)
export class BusinessRuleViolationExceptionFilter
  implements ExceptionFilter<BusinessRuleViolationException>
{
  catch(exception: BusinessRuleViolationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response
      .status(HttpStatus.CONFLICT)
      .json({ businessRuleViolation: exception.message });
  }
}
