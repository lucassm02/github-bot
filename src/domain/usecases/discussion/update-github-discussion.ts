export interface UpdateGithubDiscussion {
  update(data: UpdateGithubDiscussion.Params): UpdateGithubDiscussion.Result;
}

export namespace UpdateGithubDiscussion {
  export type Params = {
    newBody: string;
    variables: Record<string, unknown>;
    documentLink: string | undefined;
    discussionId: string;
  };
  export type Result = Promise<void>;
  export enum Exceptions {}
}
