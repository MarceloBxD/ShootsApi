// src/routes/onfidoRoutes.ts
import { Router } from "express";
import { createApplicantHandler, generateSdkTokenHandler } from "../controllers/onfidoController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rota protegida para criar um candidato
router.post("/create-applicant", authenticateToken, createApplicantHandler);

// Rota protegida para gerar um token de SDK
router.post("/generate-sdk-token", authenticateToken, generateSdkTokenHandler);

export default router;
