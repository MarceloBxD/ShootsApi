// tests/onfidoService.test.ts
import { createApplicant, generateSdkToken } from '../src/services/onfidoService';

describe('Onfido Service Tests', () => {
  const firstName = 'John';
  const lastName = 'Doe';
  const phoneNumber = '+5511999999999';
  const email = 'teste@gmail.com';
  const idNumbers = [
    {
      state_code: 'SP',
      type: 'driving_licence',
      value: '12345678909'
    }
  ];

  it('should create a new applicant', async () => {
    const applicant = await createApplicant(firstName, lastName, phoneNumber, email, idNumbers);
    expect(applicant).toHaveProperty('id'); // Verifica se o candidato criado tem um ID
  });

  it('should generate a SDK token', async () => {
    const applicantId = 'your-applicant-id'; // Substitua pelo ID do candidato gerado no primeiro teste
    const sdkToken = await generateSdkToken(applicantId);
    expect(sdkToken).toHaveProperty('token'); // Verifica se o token gerado está presente
  });
});
