import { PacientRepository } from '@/core/domain/pacient/repository/PacientRepository';
import getPrismaInstance from '../../prisma/singletonPrisma';
import { Pacient } from '@/core/domain/pacient/entity/Pacient';
import { PacientPrismaMapper } from '../../prisma/mappers/PacientMapper';

export class PacientPrismaRepository implements PacientRepository {
  private readonly prisma = getPrismaInstance();

  async create(entity: Pacient): Promise<Pacient> {
    const data = PacientPrismaMapper.toDatabase(entity);
    const result = await this.prisma.pacient.create({ data });
    return PacientPrismaMapper.toDomain(result);
  }

  async findAll(): Promise<Pacient[]> {
    const result = await this.prisma.pacient.findMany();
    return result.map(PacientPrismaMapper.toDomain);
  }

  async findById(id: string): Promise<Pacient | null> {
    const result = await this.prisma.pacient.findFirst({ where: { id } });
    return result ? PacientPrismaMapper.toDomain(result) : null;
  }

  async findByCPF(cpf: string): Promise<Pacient | null> {
    const result = await this.prisma.pacient.findFirst({ where: { cpf } });
    return result ? PacientPrismaMapper.toDomain(result) : null;
  }

  async findByEmail(email: string): Promise<Pacient | null> {
    const result = await this.prisma.pacient.findFirst({ where: { email } });
    return result ? PacientPrismaMapper.toDomain(result) : null;
  }
}
