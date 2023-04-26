export class UserAlreadyExistsException extends Error {}

export class IncorrectLoginException extends Error {}

export class ForbiddenException extends Error {}

export class NotFoundException extends Error {}

export class BusinessRuleViolationException extends Error {
  constructor(message: string) {
    super(message);
  }
}
