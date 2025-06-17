import { PacientRepository } from '@/core/domain/pacient/repository/PacientRepository';
import { CreatePacientUseCase } from '@/core/domain/pacient/useCase/Create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePacientDto } from './dto/schemaPacientDto';
import { logger } from '@/shared/utils/logger';

export class PacientController {
  private readonly createService: CreatePacientUseCase;

  constructor(private readonly pacientRepository: PacientRepository) {
    this.createService = new CreatePacientUseCase(this.pacientRepository);
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const props = request.body as CreatePacientDto;
    const result = await this.createService.execute({ ...props });

    if (result.isLeft()) {
      logger.error('Error create Pacient.');
      const { statusCode, message } = result.value;
      reply.status(statusCode).send({ message });
      return;
    }

    reply.status(201).send({
      message: 'Created pacient sucessfully.',
      pacient: result.value,
    });
    logger.info('Created Sucessfully.');
  }
}
