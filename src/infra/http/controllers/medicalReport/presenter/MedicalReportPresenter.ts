import { MedicalReport } from '@/core/domain/medicalReport/entity/MedicalReport';

export class MedicalReportPresenter {
  static toHTTP(entity: MedicalReport) {
    return {
      id: entity.id.valueId,
      doctorId: entity.doctorId.valueId,
      pacientId: entity.pacientId.valueId,
      report: entity.improvedText,
      createdAt: entity.createdAt,
    };
  }
}
