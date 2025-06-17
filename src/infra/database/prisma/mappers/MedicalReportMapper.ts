import { MedicalReport } from '@/core/domain/medicalReport/entity/MedicalReport';
import { Identity } from '@/core/generics/Identity';
import { Appointment as MedicalReportDatabase } from '@/generated/prisma';

export class MedicalReportMapper {
  static toDatabase(entity: MedicalReport): MedicalReportDatabase {
    return {
      id: entity.id.valueId,
      doctorId: entity.doctorId.valueId,
      pacientId: entity.pacientId.valueId,
      originalText: entity.originalText,
      improvedText: entity.improvedText,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(entity: MedicalReportDatabase): MedicalReport {
    return MedicalReport.create(
      {
        doctorId: new Identity(entity.doctorId),
        pacientId: new Identity(entity.pacientId),
        originalText: entity.originalText,
        improvedText: entity.improvedText,
        createdAt: entity.createdAt,
      },
      new Identity(entity.id),
    );
  }
}
