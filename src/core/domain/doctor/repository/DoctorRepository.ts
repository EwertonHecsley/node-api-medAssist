import { Doctor } from '../entity/Entity';

export abstract class DoctorRepository {
  abstract create(entity: Doctor): Promise<Doctor>;
  abstract findByEmail(email: string): Promise<Doctor | null>;
  abstract findByDocNumber(docNumber: string): Promise<Doctor | null>;
  abstract findById(id: string): Promise<Doctor | null>;
  abstract findAll(): Promise<Doctor[]>;
}
