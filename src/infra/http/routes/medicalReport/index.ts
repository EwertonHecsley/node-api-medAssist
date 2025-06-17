import { DoctorPrismaRepository } from '@/infra/database/repository/doctor/DoctorPrismaRepository';
import { MedicalReportPrismaRepository } from '@/infra/database/repository/medicalReport/MedicalReportPrismaRepository';
import { PacientPrismaRepository } from '@/infra/database/repository/Pacient/PacientPrismaRepository';
import { MedicalReportController } from '../../controllers/medicalReport/MedicalReportController';
import { OpenIAService } from '@/infra/service/IAService';
import { MedicalReportRoutes } from './MedicalReportRouter';

const medicalReportRepository = new MedicalReportPrismaRepository();
const pacientRepository = new PacientPrismaRepository();
const doctorRepository = new DoctorPrismaRepository();
const IAService = new OpenIAService();
const medicalReportController = new MedicalReportController(
  medicalReportRepository,
  doctorRepository,
  pacientRepository,
  IAService,
);
const medicalReportRouter = new MedicalReportRoutes(medicalReportController);

export default medicalReportRouter;
