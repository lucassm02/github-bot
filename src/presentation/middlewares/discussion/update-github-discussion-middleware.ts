import {
  Middleware,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols';
import { serverError } from '@/presentation/utils/http-response';
import { UpdateGithubDiscussion } from '@/domain/usecases/discussion';
import { ErrorHandler } from '@/domain/usecases';

type Body = { discussion: { nodeId: string; body: string } };
export class UpdateGithubDiscussionMiddleware implements Middleware {
  constructor(
    private readonly updateGithubDiscussion: UpdateGithubDiscussion,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    httpRequest: HttpRequest,
    [state]: Middleware.State,
    next: Middleware.Next
  ): Promise<HttpResponse> {
    try {
      const {
        discussion: { nodeId }
      } = <Body>httpRequest.body;

      await this.updateGithubDiscussion.update({
        discussionId: nodeId,
        variables: state.extractJsonFromDiscussion,
        newBody: state.formatDiscussion.body,
        documentLink: state.generateDocument?.documentLink
      });

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
