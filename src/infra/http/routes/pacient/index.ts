import { PacientPrismaRepository } from '@/infra/database/repository/Pacient/PacientPrismaRepository';
import { PacientController } from '../../controllers/pacient/PacientController';
import { PacientRoutes } from './PacientRouter';

const pacientRepository = new PacientPrismaRepository();
const pacientController = new PacientController(pacientRepository);
const pacientRouter = new PacientRoutes(pacientController);

export default pacientRouter;
