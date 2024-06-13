import { UpdateGithubDiscussionMiddleware } from '@/presentation/middlewares/discussion';
import { RequestAdapter } from '@/infra/http/service/adapters/request-adapter';
import { httpGithub } from '@/infra/http/service/utils/http-github';
import { UpdateGithubDiscussion } from '@/data/usecases/other/discussion';
import { UpdateGithubDiscussionService } from '@/infra/http/service/github';

import { makeErrorHandler } from '../../usecases';

type FactoryParams = {
  context?: 'DEFAULT' | 'GENERATING_DOCUMENT';
};

export const makeUpdateGithubDiscussionMiddleware = ({
  context
}: FactoryParams = {}) => {
  const httpClient = new RequestAdapter(httpGithub);

  const updateGithubDiscussionService = new UpdateGithubDiscussionService(
    httpClient
  );

  const updateGithubDiscussion = new UpdateGithubDiscussion(
    updateGithubDiscussionService,
    context ?? 'DEFAULT'
  );
  return new UpdateGithubDiscussionMiddleware(
    updateGithubDiscussion,
    makeErrorHandler()
  );
};
