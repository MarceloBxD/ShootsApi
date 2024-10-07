// tests/manualTest.ts
import { createApplicant, generateSdkToken } from '../src/services/onfidoService';

const testManual = async () => {
  try {
    const applicant = await createApplicant('Jane', 'Doe', '+5511999999999', 'jane.doe@example.com', [
      {
        state_code: 'SP',
        type: 'driving_licence',
        value: '12345678909'
      }
    ]);
    console.log('Applicant Created:', applicant);

    const sdkToken = await generateSdkToken(applicant.id);
    console.log('SDK Token:', sdkToken);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testManual();
