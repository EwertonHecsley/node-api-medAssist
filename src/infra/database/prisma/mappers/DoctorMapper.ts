import { Doctor } from '@/core/domain/doctor/entity/Entity';
import { Email } from '@/core/domain/pacient/objectValue/Email';
import { Identity } from '@/core/generics/Identity';
import { Doctor as DoctorDatabase } from '@/generated/prisma';

export class DoctorPrismaMapper {
  static toDatabase(entity: Doctor): DoctorDatabase {
    return {
      id: entity.id.valueId,
      name: entity.name,
      email: entity.email.toString(),
      specialty: entity.specialty,
      docNumber: entity.docNumber,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(entity: DoctorDatabase): Doctor {
    return Doctor.create(
      {
        name: entity.name,
        email: new Email(entity.email),
        docNumber: entity.docNumber,
        specialty: entity.specialty,
        createdAt: entity.createdAt,
      },
      new Identity(entity.id),
    );
  }
}
