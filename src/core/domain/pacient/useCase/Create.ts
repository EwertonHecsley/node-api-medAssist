import { BadRequest } from '@/shared/errors/BadRequest';
import { Either, left, right } from '@/shared/utils/Either';
import { Pacient } from '../entity/Pacient';
import { PacientRepository } from '../repository/PacientRepository';
import { PacientFactory } from '../helper/PacientFactory';

export type RequestPacient = {
  name: string;
  susNumber: string;
  cpf: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  createdAt?: string;
};

type ResponsePacient = Either<BadRequest, Pacient>;

export class CreatePacientUseCase {
  constructor(private readonly pacientRepository: PacientRepository) {}

  async execute(data: RequestPacient): Promise<ResponsePacient> {
    const { cpf, email } = data;

    const cpfExists = await this.pacientRepository.findByCPF(cpf);
    if (cpfExists) return left(new BadRequest('CPF is alredy.'));

    const emailExists = await this.pacientRepository.findByEmail(email);
    if (emailExists) return left(new BadRequest('Email is alredy.'));

    const susNumberExists = await this.pacientRepository.findBySusNumber(data.susNumber);
    if (susNumberExists) return left(new BadRequest('SUS Number is alredy.'));

    const result = PacientFactory.fromRequest(data);
    if (!result.valid) return left(result.errors!);

    const pacient = Pacient.create(result.value!);
    const salved = await this.pacientRepository.create(pacient);

    return right(salved);
  }
}
