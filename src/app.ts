// src/app.ts
import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import onfidoRoutes from "./routes/onfidoRoutes";
import { errorHandler } from "./middlewares/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import rateLimit from "express-rate-limit";

dotenv.config();

const app: Application = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 requisições por windowMs
    message: "Muitas requisições do mesmo IP, por favor, tente novamente mais tarde."
  });

// Middlewares
app.use(helmet()); // Segurança de headers HTTP
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parse de JSON
app.use(limiter); // Limitador de requisições
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use("/api/onfido", onfidoRoutes);

// Middleware de Tratamento de Erros
app.use(errorHandler);

export default app;
