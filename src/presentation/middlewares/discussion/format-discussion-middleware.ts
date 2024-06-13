import {
  Middleware,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols';
import { serverError } from '@/presentation/utils/http-response';
import { FormatDiscussion } from '@/domain/usecases/discussion';
import { ErrorHandler } from '@/domain/usecases';

export class FormatDiscussionMiddleware implements Middleware {
  constructor(
    private readonly formatDiscussion: FormatDiscussion,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    httpRequest: HttpRequest,
    [, setState]: Middleware.State,
    next: Middleware.Next
  ): Promise<HttpResponse> {
    try {
      const {
        discussion: { body }
      } = <Record<string, Record<string, string>>>httpRequest.body;

      const formattedBody = this.formatDiscussion.format(body);

      setState({ formatDiscussion: { body: formattedBody } });
      return next();
    } catch (error) {
      await this.errorHandler.handle(error);
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
