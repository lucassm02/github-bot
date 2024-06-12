import { GenerateDocument, ErrorHandler } from '@/domain/usecases';
import { Middleware } from '@/presentation/protocols';
import { serverError } from '@/presentation/utils';

export class GenerateDocumentMiddleware implements Middleware {
  constructor(
    private readonly generateDocument: GenerateDocument,
    private readonly errorHandler: ErrorHandler
  ) {}

  async handle(
    _httpRequest: Middleware.HttpRequest,
    [state, setState]: Middleware.State,
    next: Middleware.Next
  ): Middleware.Result {
    try {
      const { documentLink } = await this.generateDocument.generate(
        state.formattedJson
      );

      setState({ documentLink });
      return next();
    } catch (error) {
      await this.errorHandler.handle(error);
      switch (error.message) {
        default:
          return serverError(error);
      }
    }
  }
}
