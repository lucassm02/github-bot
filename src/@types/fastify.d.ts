import type { STATE_KEY } from '@/infra/http/utils/http-server/types';
import type { SharedState } from '@/presentation/protocols/shared-state';

declare module 'fastify' {
  interface FastifyRequest {
    [STATE_KEY]: Partial<SharedState>;
  }
}
