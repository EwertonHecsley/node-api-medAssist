import { Identity } from '@/core/generics/Identity';
import { BadRequest } from '@/shared/errors/BadRequest';

type MedicalReportRequest = {
  doctorId: string;
  pacientId: string;
  originalText: string;
  improvedText: string;
  createdAt?: string;
};

type MedicalReportProps = {
  doctorId: Identity;
  pacientId: Identity;
  originalText: string;
  improvedText: string;
  createdAt?: Date;
};

export class MedicalReportFactory {
  static fromRequest(data: MedicalReportRequest): {
    valid: boolean;
    value?: MedicalReportProps;
    error?: BadRequest;
  } {
    try {
      if (!data.originalText || data.originalText.trim().length < 2) {
        throw new BadRequest('Original text must have at least 2 characters.');
      }

      if (!data.improvedText || data.improvedText.trim().length < 2) {
        throw new BadRequest('Improved text must have at least 2 characters.');
      }

      if (!data.doctorId || !data.pacientId) {
        throw new BadRequest('Doctor ID and Pacient ID are required.');
      }

      const doctorId = new Identity(data.doctorId);
      const pacientId = new Identity(data.pacientId);

      const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();

      return {
        valid: true,
        value: {
          doctorId,
          pacientId,
          originalText: data.originalText.trim(),
          improvedText: data.improvedText.trim(),
          createdAt,
        },
      };
    } catch (err: any) {
      return {
        valid: false,
        error: new BadRequest(err.message),
      };
    }
  }
}
