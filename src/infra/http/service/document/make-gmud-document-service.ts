import {
  HttpClient,
  GenerateDocumentService as Protocol
} from '@/data/protocols/http';

type ResponseBody = {
  message: string;
  payload: {
    link: string;
  };
};
export class GenerateDocumentService implements Protocol {
  constructor(private readonly httpClient: HttpClient) {}
  async generate(body: Protocol.Params): Protocol.Result {
    const response = await this.httpClient.request({
      url: `https://script.google.com/macros/s/AKfycbxkwbvmyAJa7jqNzeMCGXOVLxxu53zc0B56K919pcSU3pjW4aqpWJ7kVH8dBmuDg_Wlhw/exec`,
      method: 'POST',
      body
    });

    const responseBody = <ResponseBody>response.body;

    return { link: responseBody.payload.link };
  }
}
