import { DoctorRepository } from '@/core/domain/doctor/repository/DoctorRepository';
import getPrismaInstance from '../../prisma/singletonPrisma';
import { Doctor } from '@/core/domain/doctor/entity/Entity';
import { DoctorPrismaMapper } from '../../prisma/mappers/DoctorMapper';

export class DoctorPrismaRepository implements DoctorRepository {
  private readonly prisma = getPrismaInstance();

  async create(entity: Doctor): Promise<Doctor> {
    const data = DoctorPrismaMapper.toDatabase(entity);
    const result = await this.prisma.doctor.create({ data });
    return DoctorPrismaMapper.toDomain(result);
  }

  async findAll(): Promise<Doctor[]> {
    const result = await this.prisma.doctor.findMany();
    return result.map(DoctorPrismaMapper.toDomain);
  }

  async findByDocNumber(docNumber: string): Promise<Doctor | null> {
    const result = await this.prisma.doctor.findFirst({ where: { docNumber } });
    return result ? DoctorPrismaMapper.toDomain(result) : null;
  }

  async findByEmail(email: string): Promise<Doctor | null> {
    const result = await this.prisma.doctor.findFirst({ where: { email } });
    return result ? DoctorPrismaMapper.toDomain(result) : null;
  }

  async findById(id: string): Promise<Doctor | null> {
    const result = await this.prisma.doctor.findFirst({ where: { id } });
    return result ? DoctorPrismaMapper.toDomain(result) : null;
  }
}
