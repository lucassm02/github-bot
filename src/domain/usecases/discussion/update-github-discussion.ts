export interface UpdateGithubDiscussion {
  update(data: UpdateGithubDiscussion.Params): UpdateGithubDiscussion.Result;
}

export namespace UpdateGithubDiscussion {
  export type Params = {
    currentBody: string;
    newBody: string;
    newDocumentLink: string;
    discussionId: string;
  };
  export type Result = Promise<void>;
  export enum Exceptions {}
}
