import { Pacient } from '@/core/domain/pacient/entity/Pacient';

export class PacientPresenter {
  static toHTTP(entity: Pacient) {
    return {
      id: entity.id.valueId,
      name: entity.name,
      gender: entity.gender,
      susNumber: entity.susNumber,
      createdAt: entity.createdAt,
    };
  }
}
