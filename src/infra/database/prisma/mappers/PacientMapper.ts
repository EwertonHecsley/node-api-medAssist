import { Pacient } from '@/core/domain/pacient/entity/Pacient';
import { Gender as DomainGender } from '@/core/domain/pacient/enum/Gender';
import { CPF } from '@/core/domain/pacient/objectValue/CPF';
import { Email } from '@/core/domain/pacient/objectValue/Email';
import { Identity } from '@/core/generics/Identity';
import { Pacient as PacientDatabase } from '@/generated/prisma';

export class PacientPrismaMapper {
  static toDatabase(entity: Pacient): PacientDatabase {
    return {
      id: entity.id.valueId,
      name: entity.name,
      susNumber: entity.susNumber,
      cpf: entity.cpf.toString(),
      email: entity.email.toString(),
      phone: entity.phone,
      gender: entity.gender,
      birthDate: entity.birthDate,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(database: PacientDatabase): Pacient {
    const gender = database.gender as DomainGender;
    return Pacient.create(
      {
        name: database.name,
        susNumber: database.susNumber,
        cpf: new CPF(database.cpf),
        email: new Email(database.email),
        gender,
        phone: database.phone,
        birthDate: database.birthDate,
        createdAt: database.createdAt,
      },
      new Identity(database.id),
    );
  }
}
