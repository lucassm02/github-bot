import {
  Middleware,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols';
import { serverError } from '@/presentation/utils/http-response';
import { FormatDiscussion } from '@/domain/usecases/discussion';

export class FormatDiscussionMiddleware implements Middleware {
  constructor(private readonly formatDiscussion: FormatDiscussion) {}

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

      setState({ formattedBody });
      return next();
    } catch (error) {
      return serverError(error);
    }
  }
}
