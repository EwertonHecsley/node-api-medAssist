import { DoctorPrismaRepository } from '@/infra/database/repository/doctor/DoctorPrismaRepository';
import { DoctorController } from '../../controllers/doctor/DoctorController';
import { DoctorRoutes } from './DoctorRouter';

const doctorRepository = new DoctorPrismaRepository();
const doctorController = new DoctorController(doctorRepository);
const doctorRouter = new DoctorRoutes(doctorController);

export default doctorRouter;
