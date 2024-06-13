import { FormatDiscussionMiddleware } from '@/presentation/middlewares/discussion';
import { FormatDiscussion } from '@/data/usecases/other/discussion';

import { makeErrorHandler } from '../../usecases';

export const makeFormatDiscussionMiddleware = () => {
  const formatDiscussion = new FormatDiscussion();
  return new FormatDiscussionMiddleware(formatDiscussion, makeErrorHandler());
};
