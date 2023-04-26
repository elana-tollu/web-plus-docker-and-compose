import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { UserAlreadyExistsException } from 'src/errors';

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter
  implements ExceptionFilter<UserAlreadyExistsException>
{
  catch(exception: UserAlreadyExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(HttpStatus.CONFLICT).send();
  }
}
