import { Job } from '@/consumer/protocols';
import { Logger } from '@/data/protocols/utils';
import { EsCreateEvent } from '@/data/usecases/elasticsearch';
import { ErrorHandler } from '@/domain/usecases';

export class CreateEventJob implements Job {
  constructor(
    private createEvent: EsCreateEvent,
    private readonly logger: Logger,
    private readonly errorHandler: ErrorHandler
  ) {}
  async handle(
    payload: Job.Payload,
    [, setState]: Job.State,
    next: Job.Next
  ): Job.Result {
    try {
      const event = await this.createEvent.create({
        event: '',
        mvno: '',
        status: 'CREATED',
        createdAt: new Date(),
        updateAt: new Date(),
        payload: payload.body,
      });

      this.logger.log({
        level: 'debug',
        message: 'CREATE EVENT',
        payload: event,
      });

      setState({ createEven: event });

      return next();
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}