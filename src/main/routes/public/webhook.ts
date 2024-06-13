import { Route } from '@/infra/http/utils/http-server';
import flowManager, { httpAdapter } from '@/main/adapters/flow-manager';
import { requestValidationAdapter } from '@/main/adapters/request-validation-adapter';
import { makeWebhookController } from '@/main/factories/controllers';
import { makeGenerateDocumentMiddleware } from '@/main/factories/middlewares';
import {
  makeExtractJsonFromDiscussionMiddleware,
  makeFormatDiscussionMiddleware,
  makeUpdateGithubDiscussionMiddleware
} from '@/main/factories/middlewares/discussion';
import { discussionWebhookSchema } from '@/validation/usecases';

export default (route: Route): void => {
  route.post(
    '/webhooks',
    flowManager(
      {
        when: ({ body }) => {
          const ALLOWED_ACTIONS = ['created', 'edited'];
          return ALLOWED_ACTIONS.includes(body?.action) && !!body?.discussion;
        },
        handler: httpAdapter(
          requestValidationAdapter(discussionWebhookSchema),
          makeFormatDiscussionMiddleware(),
          makeExtractJsonFromDiscussionMiddleware(),
          makeUpdateGithubDiscussionMiddleware({
            context: 'GENERATING_DOCUMENT'
          }),
          makeGenerateDocumentMiddleware(),
          makeUpdateGithubDiscussionMiddleware()
        )
      },
      { handler: (...[, , next]: Function[]) => next() }
    ),
    makeWebhookController()
  );
};
