import {
  HttpClient,
  GenerateDocumentService as Protocol
} from '@/data/protocols/http';

export class GenerateDocumentService implements Protocol {
  constructor(private readonly httpClient: HttpClient) {}
  async generate(body: Protocol.Params): Protocol.Result {
    const response = await this.httpClient.request({
      url: `https://script.google.com/macros/s/AKfycbzXn3nSd3d5tAdKSaS_E1VmRMsjkcpw97kNhuBNh7vw7Q0Gn3fnA9p80Nl8N5F_EEgPGQ/exec`,
      method: 'POST',
      body
    });

    const link = String(response.body.message).split(' link: ')[1];

    return { link };
  }
}
