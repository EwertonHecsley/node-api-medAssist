import { Pacient } from '../entity/Pacient';

export abstract class PacientRepository {
  abstract create(entity: Pacient): Promise<Pacient>;
  abstract findByCPF(cpf: string): Promise<Pacient | null>;
  abstract findByEmail(email: string): Promise<Pacient | null>;
  abstract findById(id: string): Promise<Pacient | null>;
  abstract findAll(): Promise<Pacient[]>;
  abstract findBySusNumber(susNumber: string): Promise<Pacient | null>;
}
