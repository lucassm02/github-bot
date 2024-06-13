import { UpdateGithubDiscussion as Protocol } from '@/domain/usecases/discussion';
import { UpdateGithubDiscussionService } from '@/infra/http/service/github';

export class UpdateGithubDiscussion implements Protocol {
  constructor(
    private readonly githubHttpService: UpdateGithubDiscussionService,
    private readonly context: 'DEFAULT' | 'GENERATING_DOCUMENT'
  ) {}

  async update({
    newBody,
    discussionId,
    documentLink,
    variables
  }: Protocol.Params): Protocol.Result {
    if (this.context === 'DEFAULT' && !documentLink) return;

    if (variables['gerando link...'] || variables.documento) {
      return;
    }

    const mdLink =
      this.context === 'DEFAULT'
        ? `[Documento](${documentLink})`
        : '[Gerando link...](https://github.com/orgs/pagtel/discussions)';

    const bodyWithLink = `${newBody}\n${mdLink}`;

    await this.githubHttpService.updateDiscussion({
      discussionId,
      body: bodyWithLink
    });
  }
}
