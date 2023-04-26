import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ForbiddenException } from 'src/errors';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter
  implements ExceptionFilter<ForbiddenException>
{
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.FORBIDDEN).send();
  }
}
