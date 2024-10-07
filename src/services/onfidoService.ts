import { DefaultApi, Configuration, Region, SdkTokenRequest } from "@onfido/api";
import { isAxiosError } from "axios";

// Configuração da API Onfido
const onfido = new DefaultApi(
  new Configuration({
    apiToken: process.env.ONFIDO_API_TOKEN,
    region: Region.EU, // Ajuste conforme a região (EU, US, CA)
    baseOptions: { timeout: 60000 } // Timeout de 60 segundos
  })
);

/**
 * Gera um token de SDK para iniciar o fluxo de verificação no frontend.
 * @param applicantId ID do candidato no Onfido
 * @returns Objeto com o token do SDK
 */

export const createApplicant = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  idNumbers: any[]
): Promise<any> => {
  try {
    const applicantRequest = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      id_numbers: idNumbers,
    };

    const applicantResponse = await onfido.createApplicant(applicantRequest);

    return applicantResponse.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error(`Erro ao criar o candidato: ${error.response?.status}`);
      const errorDetails = error.response?.data.error;
      if (errorDetails) {
        console.error(errorDetails.message);
        console.error(errorDetails.type);
      } else {
        console.error(error.message);
      }
    } else {
      console.error(error.message);
    }
    throw new Error("Falha ao criar o candidato.");
  }
};

export const generateSdkToken = async (applicantId: string): Promise<string> => {
  try {
    const sdkTokenRequest: SdkTokenRequest = {
      applicant_id: applicantId,
      referrer: "http://localhost", // Substitua pelo domínio correto em produção
    };

    const sdkTokenResponse = await onfido.generateSdkToken(sdkTokenRequest);

    return sdkTokenResponse.data.token;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error(`Erro ao gerar o token do SDK: ${error.response?.status}`);
      const errorDetails = error.response?.data.error;
      if (errorDetails) {
        console.error(errorDetails.message);
        console.error(errorDetails.type);
      } else {
        console.error(error.message);
      }
    } else {
      console.error(error.message);
    }
    throw new Error("Falha ao gerar o token do SDK.");
  }
};
