import { ExtractJsonFromDiscussionMiddleware } from '@/presentation/middlewares/discussion';
import { ExtractJsonFromDiscussion } from '@/data/usecases/other/discussion';

export const makeExtractJsonFromDiscussionMiddleware = () => {
  const extractJsonFromDiscussion = new ExtractJsonFromDiscussion();
  return new ExtractJsonFromDiscussionMiddleware(extractJsonFromDiscussion);
};
