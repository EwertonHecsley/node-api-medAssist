import { MedicalReport } from '../entity/MedicalReport';

export abstract class MedicalReportRepository {
  abstract create(entity: MedicalReport): Promise<MedicalReport>;
  abstract findAll(): Promise<MedicalReport[]>;
}
