import {
  Middleware,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols';
import { serverError } from '@/presentation/utils/http-response';
import { ExtractJsonFromDiscussion } from '@/domain/usecases/discussion';
import { ErrorHandler } from '@/domain/usecases';

export class ExtractJsonFromDiscussionMiddleware implements Middleware {
  constructor(
    private readonly extractJsonFromDiscussion: ExtractJsonFromDiscussion,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    _httpRequest: HttpRequest,
    [state, setState]: Middleware.State,
    next: Middleware.Next
  ): Promise<HttpResponse> {
    try {
      const object = this.extractJsonFromDiscussion.extract(
        state.formatDiscussion.body
      );

      setState({ extractJsonFromDiscussion: object });
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
