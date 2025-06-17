import { z } from 'zod';

export const schemaCreateMedicalReportDto = z.object({
  doctorId: z.string().nonempty('Doctor ID is required.').uuid('Invalid format UUID.'),
  pacientId: z.string().nonempty('Pacient ID is required.').uuid('Invalid format UUID.'),
  originalText: z.string().nonempty('Medical Report is required.'),
});

export type CreateMedicalReportDto = z.infer<typeof schemaCreateMedicalReportDto>;
