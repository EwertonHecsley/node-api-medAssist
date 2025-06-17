import { Gender } from '@/core/domain/pacient/enum/Gender';
import { z } from 'zod';

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schemaCreatePacientDto = z.object({
  name: z.string().nonempty('Name is required.'),
  susNumber: z.string().nonempty('Sus number is required.'),
  cpf: z.string().nonempty('CPF is required.').regex(cpfRegex, 'Invalid CPF format.'),
  birthDate: z
    .string()
    .nonempty('birth date is required.')
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Date invalid, use yyyy-MM-DD.' }),
  gender: z.enum([Gender.Male, Gender.Female, Gender.Other]),
  phone: z.string().nonempty('Phone is required.'),
  email: z.string().nonempty('Email is required.').regex(emailRegex, 'Invalid email format.'),
});

export type CreatePacientDto = z.infer<typeof schemaCreatePacientDto>;
