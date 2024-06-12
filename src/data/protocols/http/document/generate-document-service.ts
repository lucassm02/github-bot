export interface GenerateDocumentService {
  generate(
    params: GenerateDocumentService.Params
  ): GenerateDocumentService.Result;
}

export namespace GenerateDocumentService {
  export type Params = {
    client: string;
    renderMarkdown: boolean;
    variables: Record<string, unknown>;
  };
  export type Result = Promise<{ link: string }>;
}
