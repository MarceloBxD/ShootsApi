// src/utils/jwtUtils.ts
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

/**
 * Gera um token JWT para um usuário.
 * @param user Objeto do usuário
 * @returns Token JWT
 */
export const generateToken = (user: UserPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};
