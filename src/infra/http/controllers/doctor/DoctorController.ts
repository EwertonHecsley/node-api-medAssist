import { CreateDoctorUseCase } from '@/core/domain/doctor/useCase/Create';
import { DoctorPrismaRepository } from '@/infra/database/repository/doctor/DoctorPrismaRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateDoctorDto } from './dto/schemaDoctorDto';
import { logger } from '@/shared/utils/logger';
import { DoctorPresenter } from './presenter/DoctorPresenter';
import { ListAllDoctorsUseCase } from '@/core/domain/doctor/useCase/List';

export class DoctorController {
  private readonly createService: CreateDoctorUseCase;
  private readonly listAllService: ListAllDoctorsUseCase;

  constructor(private readonly doctorRepository: DoctorPrismaRepository) {
    this.createService = new CreateDoctorUseCase(this.doctorRepository);
    this.listAllService = new ListAllDoctorsUseCase(this.doctorRepository);
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const props = request.body as CreateDoctorDto;
    const result = await this.createService.execute({ ...props });

    if (result.isLeft()) {
      logger.error('Error create doctor.');
      const { statusCode, message } = result.value;
      reply.status(statusCode).send({ message });
      return;
    }

    reply.status(201).send({
      message: 'Created doctor sucessfully.',
      doctor: DoctorPresenter.toHTTP(result.value),
    });
    logger.info('Created Doctor sucessfully.');
  }

  async list(_request: FastifyRequest, reply: FastifyReply) {
    const result = await this.listAllService.execute();

    if (result.isLeft()) {
      logger.error('Error Listing Doctors.');
      reply.status(500).send({ message: 'Internal Error.' });
      return;
    }

    reply.status(200).send({
      message: 'Listed Doctors Sucessfully',
      doctors: result.value.map((element) => DoctorPresenter.toHTTP(element)),
    });
    logger.info('Listed Doctors Sucessfully');
  }
}
