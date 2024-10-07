// src/controllers/onfidoController.ts
import { Request, Response } from "express";
import { createApplicant, generateSdkToken } from "../services/onfidoService";

// Manipulador para criar um candidato
export const createApplicantHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, phoneNumber, email, idNumbers } = req.body;
    const applicant = await createApplicant(firstName, lastName, phoneNumber, email, idNumbers);
    res.status(201).json(applicant);
  } catch (error) {
    console.error("Erro ao criar candidato:", error);
    res.status(500).json({ message: "Falha ao criar o candidato." });
  }
};

// Manipulador para gerar um token de SDK
export const generateSdkTokenHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { applicantId } = req.body; // Certifique-se de que o applicantId está no corpo da requisição
    const sdkToken = await generateSdkToken(applicantId);
    res.status(200).json(sdkToken);
  } catch (error) {
    console.error("Erro ao gerar token SDK:", error);
    res.status(500).json({ message: "Falha ao gerar o token SDK." });
  }
};
