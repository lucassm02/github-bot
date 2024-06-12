import {
  Middleware,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols';
import { serverError } from '@/presentation/utils/http-response';
import { UpdateGithubDiscussion } from '@/domain/usecases/discussion';

type Body = { discussion: { nodeId: string; body: string } };
export class UpdateGithubDiscussionMiddleware implements Middleware {
  constructor(
    private readonly updateGithubDiscussion: UpdateGithubDiscussion
  ) {}

  async handle(
    httpRequest: HttpRequest,
    [state]: Middleware.State,
    next: Middleware.Next
  ): Promise<HttpResponse> {
    try {
      const {
        discussion: { body, nodeId }
      } = <Body>httpRequest.body;
      const { formattedBody, documentLink } = state;

      await this.updateGithubDiscussion.update({
        discussionId: nodeId,
        currentBody: body,
        newBody: formattedBody,
        newDocumentLink: documentLink
      });

      return next();
    } catch (error) {
      return serverError(error);
    }
  }
}
