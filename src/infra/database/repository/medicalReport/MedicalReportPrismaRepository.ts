import { MedicalReportRepository } from '@/core/domain/medicalReport/repository/MedicalReportRepository';
import getPrismaInstance from '../../prisma/singletonPrisma';
import { MedicalReport } from '@/core/domain/medicalReport/entity/MedicalReport';
import { MedicalReportMapper } from '../../prisma/mappers/MedicalReportMapper';

export class MedicalReportPrismaRepository implements MedicalReportRepository {
  private readonly prisma = getPrismaInstance();

  async create(entity: MedicalReport): Promise<MedicalReport> {
    const data = MedicalReportMapper.toDatabase(entity);
    const result = await this.prisma.appointment.create({ data });
    return MedicalReportMapper.toDomain(result);
  }

  async findAll(): Promise<MedicalReport[]> {
    const result = await this.prisma.appointment.findMany();
    return result.map(MedicalReportMapper.toDomain);
  }
}
