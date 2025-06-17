import { BadRequest } from '@/shared/errors/BadRequest';
import { Either, left, right } from '@/shared/utils/Either';
import { Doctor } from '../entity/Entity';
import { DoctorRepository } from '../repository/DoctorRepository';
import { DoctorFactory } from '../helper/DoctorFactory';

export type RequestDoctor = {
  name: string;
  email: string;
  specialty: string;
  docNumber: string;
  createdAt?: string;
};

type ResponseDoctor = Either<BadRequest, Doctor>;

export class CreateDoctorUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(data: RequestDoctor): Promise<ResponseDoctor> {
    const { email, docNumber } = data;

    const emailExists = await this.doctorRepository.findByEmail(email);
    if (emailExists) return left(new BadRequest('Email is already in use.'));

    const docNumberExists = await this.doctorRepository.findByDocNumber(docNumber);
    if (docNumberExists) return left(new BadRequest('Doctor number is already in use.'));

    const result = DoctorFactory.fromRequest(data);
    if (!result.valid) return left(result.errors!);

    const doctor = Doctor.create(result.value!);
    const salved = await this.doctorRepository.create(doctor);

    return right(salved);
  }
}
