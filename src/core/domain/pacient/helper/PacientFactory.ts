import { BadRequest } from '@/shared/errors/BadRequest';
import { CPF } from '../objectValue/CPF';
import { Email } from '../objectValue/Email';
import { Gender } from '../enum/Gender';
import { RequestPacient } from '../useCase/Create';

export class PacientFactory {
  static fromRequest(data: RequestPacient): {
    valid: boolean;
    errors?: BadRequest;
    value?: Omit<RequestPacient, 'cpf' | 'email' | 'birthDate' | 'createdAt' | 'gender'> & {
      cpf: CPF;
      email: Email;
      birthDate: Date;
      createdAt: Date;
      gender: Gender;
    };
  } {
    try {
      const cpf = new CPF(data.cpf);
      const email = new Email(data.email);

      const birthDate = new Date(data.birthDate);
      if (isNaN(birthDate.getTime())) {
        throw new BadRequest('Invalid birthDate format.');
      }

      const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
      if (isNaN(createdAt.getTime())) {
        throw new BadRequest('Invalid createdAt format.');
      }

      const genderInput = data.gender.toUpperCase();
      let gender: Gender;

      switch (genderInput) {
        case 'M':
          gender = Gender.Male;
          break;
        case 'F':
          gender = Gender.Female;
          break;
        case 'O':
          gender = Gender.Other;
          break;
        default:
          throw new BadRequest("Gender must be 'M', 'F' or 'O'");
      }

      return {
        valid: true,
        value: {
          ...data,
          cpf,
          email,
          birthDate,
          createdAt,
          gender,
        },
      };
    } catch (err: any) {
      return {
        valid: false,
        errors: new BadRequest(err?.message || 'Unknown error during patient creation.'),
      };
    }
  }
}
