// src/utils/generateToken.ts
import { generateToken } from "./jtwUtils";

const user = {
  id: "12345",
  email: "user@example.com"
};

const token = generateToken(user);
console.log("JWT Token:", token);
