import { Either, left, right } from '@/shared/utils/Either';
import { MedicalReportRepository } from '../repository/MedicalReportRepository';
import { BadRequest } from '@/shared/errors/BadRequest';
import { MedicalReport } from '../entity/MedicalReport';
import { Identity } from '@/core/generics/Identity';
import { OpenIAService } from '@/infra/service/IAService';
import { DoctorRepository } from '../../doctor/repository/DoctorRepository';
import { PacientRepository } from '../../pacient/repository/PacientRepository';
import { NotFound } from '@/shared/errors/NotFound';

type RequestMedicalReport = {
  doctorId: string;
  pacientId: string;
  originalText: string;
};

type ResponseMedicalReport = Either<BadRequest | NotFound, MedicalReport>;

export class CreateMedicalReportUseCase {
  constructor(
    private readonly medicalReportRepository: MedicalReportRepository,
    private readonly iaService: OpenIAService,
    private readonly doctorRepository: DoctorRepository,
    private readonly pacientRepository: PacientRepository,
  ) {}

  async execute(data: RequestMedicalReport): Promise<ResponseMedicalReport> {
    if (!data.originalText || data.originalText.trim().length < 2) {
      return left(new BadRequest('Report text is realdy.'));
    }

    const doctorExist = await this.doctorRepository.findById(data.doctorId);
    if (!doctorExist) return left(new NotFound('Doctor not found.'));

    const pacientExist = await this.pacientRepository.findById(data.pacientId);
    if (!pacientExist) return left(new NotFound('Pacient not found.'));

    const improved = await this.iaService.improveText(data.originalText);

    const report = MedicalReport.create({
      doctorId: new Identity(data.doctorId),
      pacientId: new Identity(data.pacientId),
      originalText: data.originalText.trim(),
      improvedText: improved,
    });

    const created = await this.medicalReportRepository.create(report);
    return right(created);
  }
}
