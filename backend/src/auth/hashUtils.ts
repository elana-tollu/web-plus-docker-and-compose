import { hash, compare } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await hash(password, saltRounds);
}

export async function checkPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await compare(password, hashedPassword);
}
