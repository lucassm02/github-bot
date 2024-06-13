import { GenerateDocumentService } from '@/data/protocols/http';
import { GenerateDocument } from '@/domain/usecases';

export class HttpGenerateDocument implements GenerateDocument {
  constructor(
    private readonly generateDocumentService: GenerateDocumentService
  ) {}

  async generate(object: GenerateDocument.Params): GenerateDocument.Result {
    if (object.documento || object['gerando link...']) {
      return null;
    }

    const client = <'SURF' | 'DATORA'>String(object.cliente).toUpperCase();

    const variableMakers = {
      SURF: this.makeSurfVariables,
      DATORA: this.makeDatoraVariables
    };

    const variables = variableMakers[client](object);

    const { link } = await this.generateDocumentService.generate({
      client,
      variables,
      renderMarkdown: client === 'DATORA'
    });

    return { documentLink: link };
  }

  private makeSurfVariables(object: Record<string, unknown>) {
    return {
      date: object.data,
      startTime: object['início'],
      deployTime: object.deploy,
      testTime: object.teste,
      rollbackTime: object.rollback,
      requester: object.solicitante,
      systems: object.sistemas,
      executorName: object['nome do executor'],
      executorPhone: object['telefone do executor'],
      executorEmail: object['e-mail do executor'],
      executorPosition: object['função do executor'],
      executor: object.executor,
      title: object.titulo,
      impact: object['impacto da gmud'],
      description: String(object['descrição'])
        .replaceAll('> ', '')
        .replaceAll('\r', '\n')
    };
  }

  private makeDatoraVariables(object: Record<string, unknown>) {
    return {
      date: object.data,
      startTime: object['início'],
      deployTime: object.deploy,
      testTime: object.teste,
      rollbackTime: object.rollback,
      requester: object.solicitante,
      systems: object.sistemas,
      executorName: object['nome do executor'],
      description: String(object['descrição'])
        .replaceAll('> ', '')
        .replaceAll('\r', '\n')
    };
  }
}
