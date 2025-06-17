import { NotFound } from '@/shared/errors/NotFound';
import { Either, left, right } from '@/shared/utils/Either';
import { Pacient } from '../entity/Pacient';
import { PacientRepository } from '../repository/PacientRepository';

type RequestPacient = {
  id: string;
};

type ResponsePacient = Either<NotFound, Pacient>;

export class FindPacientUseCase {
  constructor(private readonly pacientRepository: PacientRepository) {}

  async execute({ id }: RequestPacient): Promise<ResponsePacient> {
    const pacient = await this.pacientRepository.findById(id);
    if (!pacient) return left(new NotFound('User not found.'));

    return right(pacient);
  }
}
