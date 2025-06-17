import { DoctorRepository } from '@/core/domain/doctor/repository/DoctorRepository';
import { MedicalReportRepository } from '@/core/domain/medicalReport/repository/MedicalReportRepository';
import { CreateMedicalReportUseCase } from '@/core/domain/medicalReport/useCase/Create';
import { PacientRepository } from '@/core/domain/pacient/repository/PacientRepository';
import { OpenIAService } from '@/infra/service/IAService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateMedicalReportDto } from './dto/schemaCreateMedicalReportDto';
import { logger } from '@/shared/utils/logger';
import { MedicalReportPresenter } from './presenter/MedicalReportPresenter';

export class MedicalReportController {
  private readonly createService: CreateMedicalReportUseCase;

  constructor(
    private readonly medicalReportRepository: MedicalReportRepository,
    private readonly doctorRepositoy: DoctorRepository,
    private readonly pacientRepository: PacientRepository,
    private readonly IAService: OpenIAService,
  ) {
    this.createService = new CreateMedicalReportUseCase(
      this.medicalReportRepository,
      this.IAService,
      this.doctorRepositoy,
      this.pacientRepository,
    );
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const props = request.body as CreateMedicalReportDto;
    const result = await this.createService.execute({ ...props });

    if (result.isLeft()) {
      logger.error('Error create report.');
      const { statusCode, message } = result.value;
      reply.status(statusCode).send({ message });
      return;
    }

    reply.status(201).send({
      message: 'Created Report Sucessfully',
      medicalReport: MedicalReportPresenter.toHTTP(result.value),
    });

    logger.info('Created Report Sucessfully.');
  }
}
