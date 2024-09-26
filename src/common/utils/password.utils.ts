import { hash, compare } from 'bcrypt';

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  // 10 salt rounds by default, you can adjust this number for security/performance trade-offs.
  const saltRounds = 10;
  return hash(password, saltRounds);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password to be compared.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to true if the passwords match, or false otherwise.
 */
export async function validatePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}
