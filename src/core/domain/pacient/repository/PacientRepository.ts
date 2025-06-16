import { Pacient } from '../entity/Pacient';

export abstract class PacientRepository {
  abstract create(entity: Pacient): Promise<Pacient>;
  abstract findByCPF(cpf: string): Promise<Pacient>;
  abstract findByEmail(email: string): Promise<Pacient>;
}
