import { FormatDiscussionMiddleware } from '@/presentation/middlewares/discussion';
import { FormatDiscussion } from '@/data/usecases/other/discussion';

export const makeFormatDiscussionMiddleware = () => {
  const formatDiscussion = new FormatDiscussion();
  return new FormatDiscussionMiddleware(formatDiscussion);
};
