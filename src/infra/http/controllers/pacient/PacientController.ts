import { PacientRepository } from '@/core/domain/pacient/repository/PacientRepository';
import { CreatePacientUseCase } from '@/core/domain/pacient/useCase/Create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePacientDto } from './dto/schemaPacientDto';
import { logger } from '@/shared/utils/logger';
import { PacientPresenter } from './presenter/PacientPresenter';
import { ListAllPacientsUseCase } from '@/core/domain/pacient/useCase/List';

export class PacientController {
  private readonly createService: CreatePacientUseCase;
  private readonly listService: ListAllPacientsUseCase;

  constructor(private readonly pacientRepository: PacientRepository) {
    this.createService = new CreatePacientUseCase(this.pacientRepository);
    this.listService = new ListAllPacientsUseCase(this.pacientRepository);
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const props = request.body as CreatePacientDto;
    const result = await this.createService.execute({ ...props });

    if (result.isLeft()) {
      logger.error('Error create pacient.');
      const { statusCode, message } = result.value;
      reply.status(statusCode).send({ message });
      return;
    }

    reply.status(201).send({
      message: 'Created pacient sucessfully.',
      pacient: PacientPresenter.toHTTP(result.value),
    });
    logger.info('Created Sucessfully.');
  }

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.listService.execute();
    if (result.isLeft()) {
      logger.error('Error list pacients.');
      reply.status(500).send({ message: 'Internal Error.' });
      return;
    }

    reply.status(200).send({
      message: 'Listed pacients sucessfully.',
      pacients: result.value.map((element) => PacientPresenter.toHTTP(element)),
    });
    logger.info('Listed pacients sucessfully.');
  }
}
