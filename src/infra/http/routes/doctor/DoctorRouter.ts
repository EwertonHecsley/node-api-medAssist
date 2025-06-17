import { FastifyInstance } from 'fastify';
import { DoctorController } from '../../controllers/doctor/DoctorController';
import { validateBody } from '../../middleware/validateBody';
import { schemaCreateDoctortDto } from '../../controllers/doctor/dto/schemaDoctorDto';

export class DoctorRoutes {
  constructor(private readonly controller: DoctorController) {}

  async register(app: FastifyInstance) {
    app.post('/v1/doctor', {
      preHandler: validateBody(schemaCreateDoctortDto),
      handler: this.controller.store.bind(this.controller),
    });
    app.get('/v1/doctor', {
      handler: this.controller.list.bind(this.controller),
    });
  }
}
