import { Either, left, right } from '@/shared/utils/Either';
import { MedicalReportRepository } from '../repository/MedicalReportRepository';
import { BadRequest } from '@/shared/errors/BadRequest';
import { MedicalReport } from '../entity/MedicalReport';
import { Identity } from '@/core/generics/Identity';
import { OpenIAService } from '@/infra/service/IAService';

type RequestMedicalReport = {
  doctorId: string;
  pacientId: string;
  originalText: string;
};

type ResponseMedicalReport = Either<BadRequest, MedicalReport>;

export class CreateMedicalReportUseCase {
  constructor(
    private readonly medicalReportRepository: MedicalReportRepository,
    private readonly iaService: OpenIAService,
  ) {}

  async execute(data: RequestMedicalReport): Promise<ResponseMedicalReport> {
    if (!data.originalText || data.originalText.trim().length < 2) {
      return left(new BadRequest('Report text is realdy.'));
    }

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
