import { Either, right } from '@/shared/utils/Either';
import { Doctor } from '../entity/Entity';
import { DoctorRepository } from '../repository/DoctorRepository';

type ResponseDoctor = Either<null, Doctor[]>;

export class ListAllDoctorsUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(): Promise<ResponseDoctor> {
    const doctors = await this.doctorRepository.findAll();

    return right(doctors);
  }
}
