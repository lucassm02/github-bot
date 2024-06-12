import { GenerateDocumentService } from '@/data/protocols/http';
import { GenerateDocument } from '@/domain/usecases';

export class HttpGenerateDocument implements GenerateDocument {
  constructor(
    private readonly generateDocumentService: GenerateDocumentService
  ) {}

  async generate(object: GenerateDocument.Params): GenerateDocument.Result {
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
      executorName: 'Henrique Almeida',
      executorPhone: '(11) 96974-0521',
      executorEmail: 'henrique.almeida@pagtel.com.br',
      executorsPosition: 'Front-end Engineer',
      executor: object.executor,
      impact: 'Nenhum impacto',
      title: 'Adequação de parcelamento no site Correios',
      description: object['descrição']
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
      executor: object.executor,
      description: object['descrição']
    };
  }
}
