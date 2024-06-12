export interface GenerateDocument {
  generate(params: GenerateDocument.Params): GenerateDocument.Result;
}

export namespace GenerateDocument {
  export type Params = Record<string, unknown>;
  export type Result = Promise<{ documentLink: string }>;
  export enum Exceptions {}
}
