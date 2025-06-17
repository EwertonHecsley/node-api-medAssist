import fastify from 'fastify';
import pacientRouter from './infra/http/routes/pacient';
import doctorRouter from './infra/http/routes/doctor';
import medicalReportRouter from './infra/http/routes/medicalReport';

const app = fastify();

app.get('/health', async () => {
  return { status: 'OK' };
});

app.register(
  async (instance) => {
    await pacientRouter.register(instance);
    await doctorRouter.register(instance);
    await medicalReportRouter.register(instance);
  },
  { prefix: '/api' },
);

export default app;
