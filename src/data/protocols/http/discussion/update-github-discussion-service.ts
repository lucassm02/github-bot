export interface UpdateGithubDiscussionService {
  updateDiscussion(
    params: UpdateGithubDiscussionService.Params
  ): UpdateGithubDiscussionService.Result;
}

export namespace UpdateGithubDiscussionService {
  export type Params = { discussionId: string; body: string };
  export type Result = Promise<boolean>;
}
