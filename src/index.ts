import fastify from 'fastify';

const app = fastify();

app.get('/health', async () => {
  return { status: 'OK' };
});

export default app;
