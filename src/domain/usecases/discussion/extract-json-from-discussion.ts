export interface ExtractJsonFromDiscussion {
  extract(body: string): Record<string, unknown>;
}

export namespace ExtractJsonFromDiscussion {
  export enum Exceptions {}
}
