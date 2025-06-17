import { FastifyInstance } from 'fastify';
import { PacientController } from '../../controllers/pacient/PacientController';
import { validateBody } from '../../middleware/validateBody';
import { schemaCreatePacientDto } from '../../controllers/pacient/dto/schemaPacientDto';

export class PacientRoutes {
  constructor(private readonly controller: PacientController) {}

  async register(app: FastifyInstance) {
    app.post('/v1/pacient', {
      preHandler: validateBody(schemaCreatePacientDto),
      handler: this.controller.store.bind(this.controller),
    });
    app.get('/v1/pacient', {
      handler: this.controller.list.bind(this.controller),
    });
  }
}
