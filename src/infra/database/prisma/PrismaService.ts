import { PrismaClient } from '@/generated/prisma';
import { JsPromise } from '@/generated/prisma/runtime/library';

export default class PrismaService extends PrismaClient {
  async connect() {
    await this.$connect();
  }

  async disconnect() {
    await this.$disconnect();
  }
}
