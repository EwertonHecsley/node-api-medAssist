import { Doctor } from '@/core/domain/doctor/entity/Entity';

export class DoctorPresenter {
  static toHTTP(entity: Doctor) {
    return {
      id: entity.id.valueId,
      name: entity.name,
      specialty: entity.specialty,
      createdAt: entity.createdAt,
    };
  }
}
