import { Gender } from '@/core/domain/pacient/enum/Gender';
import { z } from 'zod';

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schemaCreateDoctortDto = z.object({
  name: z.string().nonempty('Name is required.'),
  specialty: z.string().nonempty('Specialty is required.'),
  docNumber: z.string().nonempty('Document is required.'),
  email: z.string().nonempty('Email is required.').regex(emailRegex, 'Invalid email format.'),
});

export type CreateDoctorDto = z.infer<typeof schemaCreateDoctortDto>;
