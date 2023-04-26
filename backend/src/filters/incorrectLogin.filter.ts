import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { IncorrectLoginException } from 'src/errors';

@Catch(IncorrectLoginException)
export class IncorrectLoginExceptionFilter
  implements ExceptionFilter<IncorrectLoginException>
{
  catch(exception: IncorrectLoginException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.CONFLICT).send();
  }
}
