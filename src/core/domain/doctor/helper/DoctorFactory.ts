import { BadRequest } from '@/shared/errors/BadRequest';
import { RequestDoctor } from '../useCase/Create';
import { Email } from '../../pacient/objectValue/Email';

export class DoctorFactory {
  static fromRequest(data: RequestDoctor): {
    valid: boolean;
    errors?: BadRequest;
    value?: Omit<RequestDoctor, 'email' | 'createdAt'> & {
      email: Email;
      createdAt: Date;
    };
  } {
    try {
      const email = new Email(data.email);
      const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
      if (isNaN(createdAt.getTime())) {
        throw new BadRequest('Invalid createdAt format.');
      }

      return {
        valid: true,
        value: {
          ...data,
          email,
          createdAt,
        },
      };
    } catch (err: any) {
      return {
        valid: false,
        errors: new BadRequest(err.message || 'Unknown error during patient creation.'),
      };
    }
  }
}
