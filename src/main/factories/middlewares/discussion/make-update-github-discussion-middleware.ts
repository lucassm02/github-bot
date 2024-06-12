import { UpdateGithubDiscussionMiddleware } from '@/presentation/middlewares/discussion';
import { RequestAdapter } from '@/infra/http/service/adapters/request-adapter';
import { httpGithub } from '@/infra/http/service/utils/http-github';
import { UpdateGithubDiscussion } from '@/data/usecases/other/discussion';
import { UpdateGithubDiscussionService } from '@/infra/http/service/github';

export const makeUpdateGithubDiscussionMiddleware = () => {
  const httpClient = new RequestAdapter(httpGithub);

  const updateGithubDiscussionService = new UpdateGithubDiscussionService(
    httpClient
  );

  const updateGithubDiscussion = new UpdateGithubDiscussion(
    updateGithubDiscussionService
  );
  return new UpdateGithubDiscussionMiddleware(updateGithubDiscussion);
};
