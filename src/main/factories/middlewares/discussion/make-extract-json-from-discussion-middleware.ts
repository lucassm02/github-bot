import { ExtractJsonFromDiscussionMiddleware } from '@/presentation/middlewares/discussion';
import { ExtractJsonFromDiscussion } from '@/data/usecases/other/discussion';

import { makeErrorHandler } from '../../usecases';

export const makeExtractJsonFromDiscussionMiddleware = () => {
  const extractJsonFromDiscussion = new ExtractJsonFromDiscussion();
  return new ExtractJsonFromDiscussionMiddleware(
    extractJsonFromDiscussion,
    makeErrorHandler()
  );
};
