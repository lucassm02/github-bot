import { UpdateGithubDiscussion as Protocol } from '@/domain/usecases/discussion';
import { UpdateGithubDiscussionService } from '@/infra/http/service/github';

export class UpdateGithubDiscussion implements Protocol {
  constructor(
    private readonly githubHttpService: UpdateGithubDiscussionService
  ) {}

  async update({
    currentBody,
    newBody,
    discussionId,
    newDocumentLink
  }: Protocol.Params): Protocol.Result {
    if (currentBody === newBody) return;

    const cleanedBody = newBody.replace(/\[.*?\]\(.*?\)/g, '').trimEnd();

    const bodyWithLink = `${cleanedBody}\n[Link do documento](${newDocumentLink})`;

    await this.githubHttpService.updateDiscussion({
      discussionId,
      body: bodyWithLink
    });
  }
}
