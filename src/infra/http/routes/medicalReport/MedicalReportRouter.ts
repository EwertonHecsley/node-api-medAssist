import { FastifyInstance } from 'fastify';
import { MedicalReportController } from '../../controllers/medicalReport/MedicalReportController';
import { validateBody } from '../../middleware/validateBody';
import { schemaCreateMedicalReportDto } from '../../controllers/medicalReport/dto/schemaCreateMedicalReportDto';

export class MedicalReportRoutes {
  constructor(private readonly controller: MedicalReportController) {}

  async register(app: FastifyInstance) {
    app.post('/v1/report', {
      preHandler: validateBody(schemaCreateMedicalReportDto),
      handler: this.controller.store.bind(this.controller),
    });
  }
}
