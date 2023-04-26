import { Response } from 'express';

const AUTH_COOKIE = 'kupipodariday_auth';

export function setAuthJwtCookie(jwt: string, res: Response) {
  res.cookie(AUTH_COOKIE, jwt, { httpOnly: true, maxAge: 1000 * 60 * 60 });
}
