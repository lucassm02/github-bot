import {
  Middleware,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols';
import { serverError } from '@/presentation/utils/http-response';
import { ExtractJsonFromDiscussion } from '@/domain/usecases/discussion';

export class ExtractJsonFromDiscussionMiddleware implements Middleware {
  constructor(
    private readonly extractJsonFromDiscussion: ExtractJsonFromDiscussion
  ) {}

  async handle(
    _httpRequest: HttpRequest,
    [state, setState]: Middleware.State,
    next: Middleware.Next
  ): Promise<HttpResponse> {
    try {
      const { formattedBody } = state;

      const formattedJson =
        this.extractJsonFromDiscussion.extract(formattedBody);

      setState({ formattedJson });
      return next();
    } catch (error) {
      return serverError(error);
    }
  }
}
